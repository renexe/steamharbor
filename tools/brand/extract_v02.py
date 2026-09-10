"""Deterministic extraction from the immutable v02 board; no generated pixels."""
from pathlib import Path
import hashlib, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'docs/brand/production/v02-r01'
SOURCE=ROOT/'docs/brand/approved/v02/steamharbor-v02-approved-board.png'
EXPECTED='a07c9adffc8da2b9f2e6b57181c48ee9ee8b24bdd40ae55e56013bcaf3331711'
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==EXPECTED
im=Image.open(SOURCE).convert('RGB'); rgb=np.array(im).astype(float)
# Coarse outer contour in source coordinates, used only to constrain background classification.
points=[(382,195),(390,166),(409,143),(437,138),(465,150),(481,173),(477,191),(503,195),(524,215),(523,239),(532,254),(522,274),(535,280),(659,290),(654,216),(699,205),(796,230),(795,262),(807,268),(812,341),(854,362),(888,405),(909,454),(912,494),(900,546),(871,589),(827,624),(776,649),(715,668),(651,672),(555,668),(461,666),(372,661),(282,676),(232,670),(188,648),(153,620),(130,583),(114,537),(113,489),(119,443),(137,407),(165,374),(204,347),(249,325),(301,309),(353,298),(411,289),(473,285),(471,268),(455,263),(437,249),(428,230),(405,224),(390,211)]
maskim=Image.new('1',im.size); ImageDraw.Draw(maskim).polygon(points,fill=1)
rough=np.array(maskim)
zone=ndi.binary_dilation(rough,iterations=12)
# Estimate the opaque paper field from a ring outside the subject.
ring=ndi.binary_dilation(rough,iterations=38)&~ndi.binary_dilation(rough,iterations=16)
y,x=np.indices(rough.shape); X=np.stack([np.ones_like(x),x/1536,y/1024,(x/1536)**2,(y/1024)**2,x*y/(1536*1024)],-1)
ring &= (rgb[:,:,0]>245)&(rgb[:,:,1]>244)&(rgb[:,:,2]>234)
coef=np.linalg.lstsq(X[ring],rgb[ring],rcond=None)[0]; bg=X@coef
color_distance=np.linalg.norm(rgb-bg,axis=2)
subject=zone & (color_distance>9) & ((rgb[:,:,2]<234)|(rgb[:,:,1]<240))
subject=ndi.binary_fill_holes(ndi.binary_opening(subject))
labels,n=ndi.label(subject); counts=np.bincount(labels.ravel()); counts[0]=0
subject=labels==counts.argmax()
# Edge alpha only; fully opaque interior retains the source RGB byte-for-byte.
inside=ndi.binary_erosion(subject,iterations=2)
nearest=ndi.distance_transform_edt(~inside,return_distances=False,return_indices=True)
fg=rgb[tuple(nearest)]
v=fg-bg; alpha=np.clip(np.sum((rgb-bg)*v,axis=2)/np.maximum(np.sum(v*v,axis=2),1),0,1)
band=ndi.binary_dilation(subject,iterations=1)&~inside
alpha=np.where(inside,1,np.where(band,alpha,0))
alpha[alpha<0.08]=0
alpha[(rgb[:,:,2]>=237)&(rgb[:,:,1]>=244)&~inside]=0
# Decontaminate only partially covered boundary pixels against estimated original paper.
clean=rgb.copy(); partial=(alpha>0)&(alpha<1)
clean[partial]=np.clip((rgb[partial]-(1-alpha[partial,None])*bg[partial])/alpha[partial,None],0,255)
rgba=np.dstack([np.rint(clean).astype('uint8'),np.rint(alpha*255).astype('uint8')]); rgba[rgba[:,:,3]==0,:3]=0
symbol_full=Image.fromarray(rgba)
# Lettering has very high separation from paper. Mask only its existing pixels.
box=(64,685,963,832); wrgb=rgb[box[1]:box[3],box[0]:box[2]]; wbg=bg[box[1]:box[3],box[0]:box[2]]
wm=wrgb[:,:,0]<150
wi=ndi.binary_erosion(wm)
wn=ndi.distance_transform_edt(~wi,return_distances=False,return_indices=True)
wf=wrgb[tuple(wn)]; wv=wf-wbg
wa=np.clip(np.sum((wrgb-wbg)*wv,axis=2)/np.maximum(np.sum(wv*wv,axis=2),1),0,1)
a=np.where(wi,1,np.where(ndi.binary_dilation(wm),wa,0)); a[a<0.08]=0
wclean=wrgb.copy(); partial=(a>0)&(a<1)
wclean[partial]=np.clip((wrgb[partial]-(1-a[partial,None])*wbg[partial])/a[partial,None],0,255)
warr=np.dstack([np.rint(wclean).astype('uint8'),np.rint(a*255).astype('uint8')]); warr[warr[:,:,3]==0,:3]=0
w=Image.fromarray(warr)
OUT.mkdir(parents=True,exist_ok=True)
def trim(image,pad=12):
 b=image.getbbox(); core=image.crop(b); out=Image.new('RGBA',(core.width+2*pad,core.height+2*pad)); out.paste(core,(pad,pad)); return out,b
symbol,sbox=trim(symbol_full)
wordmark,wbox=trim(w)
vertical=Image.new('RGBA',im.size); vertical.alpha_composite(symbol_full); vertical.alpha_composite(w,(box[0],box[1])); vertical,vbox=trim(vertical)
def recolor(image,color):
 out=Image.new('RGBA',image.size,color); out.putalpha(image.getchannel('A'))
 arr=np.array(out); arr[arr[:,:,3]==0,:3]=0
 return Image.fromarray(arr)
reverse_w=recolor(w,'#F7F3EA')
reverse_full=Image.new('RGBA',im.size); reverse_full.alpha_composite(symbol_full); reverse_full.alpha_composite(reverse_w,(box[0],box[1])); reverse,_=trim(reverse_full)
# New horizontal composition uses the same extracted symbol and lettering.
small_symbol=symbol.copy(); small_symbol.thumbnail((280,220),Image.Resampling.LANCZOS)
small_word=wordmark.copy(); small_word.thumbnail((480,100),Image.Resampling.LANCZOS)
horizontal=Image.new('RGBA',(small_symbol.width+28+small_word.width,max(small_symbol.height,small_word.height)+24))
horizontal.alpha_composite(small_symbol,(0,12)); horizontal.alpha_composite(small_word,(small_symbol.width+28,(horizontal.height-small_word.height)//2))
assets={'symbol':symbol,'wordmark':wordmark,'vertical':vertical,'vertical-reverse-candidate':reverse,'horizontal-candidate':horizontal}
for name,asset in assets.items(): asset.save(OUT/f'steamharbor-{name}.png')
# Real-size reduction proof, not an approved micro-logo.
sizes=[16,24,32,48,64,128,256,512]
for size in sizes:
 thumb=symbol.copy(); thumb.thumbnail((size,size),Image.Resampling.LANCZOS)
 canvas=Image.new('RGBA',(size,size)); canvas.alpha_composite(thumb,((size-thumb.width)//2,(size-thumb.height)//2))
 canvas.save(OUT/f'symbol-test-{size}.png')
# Review sheet: use dark lettering on light and a labeled reverse candidate on dark.
sheet=Image.new('RGB',(1400,900),'#f7f3ea'); d=ImageDraw.Draw(sheet)
for i,bgcolor in enumerate(['#f7f3ea','#123d47']):
 d.rectangle((i*700,0,(i+1)*700,900),fill=bgcolor)
 p=[vertical,reverse][i].copy(); p.thumbnail((640,600),Image.Resampling.LANCZOS)
 sheet.paste(p,(i*700+(700-p.width)//2,65),p)
 color='#123d47' if i==0 else '#f7f3ea'
 d.text((i*700+24,24),['V02 / extracted original','V02 / reverse lettering candidate'][i],fill=color)
 dx=i*700+32
 for size in sizes[:6]:
  p=Image.open(OUT/f'symbol-test-{size}.png'); sheet.paste(p,(dx,710),p); d.text((dx,855),str(size)+' px',fill=color); dx+=size+24
sheet.save(OUT/'extraction-review.png')
# QA zooms for extraction boundaries on a dark surface.
qa=Image.new('RGB',(1500,550),'#123d47')
for i,b in enumerate([(370,130,545,290),(290,635,750,690),(640,198,817,355)]):
 p=symbol_full.crop(b); p.thumbnail((480,480)); p=p.resize((p.width*min(3,480//p.width),p.height*min(3,480//p.width)),Image.Resampling.NEAREST)
 qa.paste(p,(i*500,30),p)
qa.save(OUT/'edge-review.png')
manifest={'source':str(SOURCE.relative_to(ROOT)),'source_sha256':EXPECTED,'method':'deterministic paper-field fit, constrained mask, edge-alpha decontamination; no image generation','status':'technical derivatives, not a new visual approval','source_boxes':{'symbol':sbox,'vertical':vbox,'wordmark_region':box},'assets':[]}
for p in sorted(OUT.glob('*.png')):
 img=Image.open(p)
 manifest['assets'].append({'file':p.name,'size':list(img.size),'mode':img.mode,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'status':'review-only' if 'test' in p.name or 'candidate' in p.name or 'review' in p.name else 'extracted-derivative'})
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Wrote',OUT)
