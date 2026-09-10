"""Build the comparison sheet, ICO and manifest after render_favicon.cjs."""
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[2];p=root/'docs/brand/proposals/favicon-v01'
out=Image.new('RGB',(1200,700),'#F7F3EA');d=ImageDraw.Draw(out)
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
for i,bg in enumerate(['#F7F3EA','#123D47']):
 x=i*600;d.rectangle((x,0,x+600,700),fill=bg);c='#123D47' if i==0 else '#F7F3EA'
 d.text((x+30,25),'SteamHarbor / favicon v01 / proposta',font=f,fill=c)
 im=Image.open(p/'favicon-256.png');out.paste(im,(x+172,85),im)
 d.text((x+30,380),'Tamanhos reais:',font=f,fill=c);xx=x+32
 for s in [16,24,32,48,64,128]:
  im=Image.open(p/f'favicon-{s}.png');out.paste(im,(xx,425),im);d.text((xx,570),str(s),font=f,fill=c);xx+=s+26
 d.text((x+30,620),'16 px: desenho ajustado à grade',font=f,fill=c)
out.save(p/'review.png')
ims=[Image.open(p/f'favicon-{s}.png') for s in [16,32,48,64]]
ims[-1].save(p/'favicon-candidate.ico',sizes=[(s,s) for s in [16,32,48,64]],append_images=ims[:-1])
ico=Image.open(p/'favicon-candidate.ico')
assert ico.ico.sizes()=={(16,16),(32,32),(48,48),(64,64)}
for s in [16,32,48,64]:
 assert ico.ico.getimage((s,s)).tobytes()==Image.open(p/f'favicon-{s}.png').tobytes()
for s in [16,24,32,48,64,128,256]:
 im=Image.open(p/f'favicon-{s}.png'); assert im.size==(s,s) and im.mode=='RGBA'
 assert im.getchannel('A').getextrema()==(0,255)
manifest={'status':'proposed-not-approved','source':'authored SVG micro-icon derived conceptually from approved v02, not a trace or full-logo vector','files':[]}
for file in sorted(p.iterdir()):
 if file.suffix in ['.svg','.png','.ico']:
  manifest['files'].append({'file':file.name,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
(p/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('PNG dimensions/alpha and all four ICO frames verified.')
