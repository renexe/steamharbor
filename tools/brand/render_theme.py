"""Static design proofs using exact approved images. No application code changes."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,hashlib
R=Path(__file__).resolve().parents[2]; O=R/'docs/brand/proposals/theme-v01'; A=R/'docs/brand/production/v02-r01'
F='/usr/share/fonts/truetype/dejavu/'
def font(size,bold=False,serif=False):
 return ImageFont.truetype(F+('DejaVuSerif' if serif else 'DejaVuSans')+('-Bold' if bold else '')+'.ttf',size)
def build(dark=False,mobile=False):
 W,H=(390,1140) if mobile else (1440,1080); pad=22 if mobile else 100
 bg='#102F38' if dark else '#F7F3EA'; surface='#173F49' if dark else '#FFFDF8'; ink='#F7F3EA' if dark else '#123D47'; muted='#C0D1D2' if dark else '#53666B'; line='#46626A' if dark else '#D0D6CE'; accent='#F0B45A' if dark else '#B64F2B'
 im=Image.new('RGB',(W,H),bg);d=ImageDraw.Draw(im)
 def text(x,y,s,size=16,color=None,bold=False,serif=False):d.text((x,y),s,font=font(size,bold,serif),fill=color or ink)
 def rule(y):d.line((pad,y,W-pad,y),fill=line,width=1)
 def logo(name,x,y,w):
  a=Image.open((R/'docs/brand/production/v02-r02'/name) if name=='steamharbor-horizontal-reverse.png' else (A/name)).convert('RGBA'); a.thumbnail((w,250),Image.Resampling.LANCZOS);im.paste(a,(x,y),a)
 def box(x,y,w,h,fill=surface):d.rounded_rectangle((x,y,x+w,y+h),radius=8,fill=fill,outline=line,width=1)
 if mobile:
  # Exact rich signature; no proposed favicon is used.
  if dark:logo('steamharbor-horizontal-reverse.png',pad,26,248)
  else:logo('steamharbor-horizontal-candidate.png',pad,26,248)
  text(320,34,'Menu',14)
  if dark: nav=105
  else:nav=105
  text(pad,nav,'Explore    Charts    Deals    Releases',14);rule(nav+36)
  y=nav+63;text(pad,y,'Find your next game.',26,serif=True,bold=True)
  text(pad,y+45,'Activity, reviews and useful context.',15,color=muted)
  box(pad,y+85,346,52);text(pad+16,y+100,'Search games or AppID',15,color=muted)
  text(pad,y+156,'DEMO DATA · 2 sample games',12,color=accent,bold=True)
  text(pad,y+181,'Preview values, not live Steam statistics.',12,color=muted)
  y+=243;text(pad,y,'Player activity',24,serif=True,bold=True)
  text(pad,y+39,'Sample ranking · 2 games',14,color=muted)
  for i,(name,tag,count,peak) in enumerate([('Counter-Strike 2','FPS · Competitive','473,263','1,244,579'),('Dota 2','MOBA · Strategy','365,950','823,285')]):
   yy=y+86+i*135;rule(yy-12);text(pad,yy,name,18,bold=True);text(pad,yy+30,tag,13,color=muted)
   text(pad,yy+61,count,22,bold=True);text(220,yy+64,peak,18,color=muted)
   text(pad,yy+91,'Players · sample',12,color=muted);text(220,yy+91,'24h peak · sample',12,color=muted)
  yy=y+370;box(pad,yy,346,145);text(pad+18,yy+19,'Price history',20,serif=True,bold=True)
  text(pad+18,yy+55,'Not connected',14,color=accent,bold=True)
  text(pad+18,yy+86,'No price history in this preview.',13,color=muted)
  text(pad,H-52,'Independent. Not affiliated with Valve or Steam.',11,color=muted)
 else:
  if dark:
   # Reverse lettering and isolated symbol maintain exact image content.
   logo('steamharbor-horizontal-reverse.png',pad,27,320)
  else:logo('steamharbor-horizontal-candidate.png',pad,27,320)
  for x,s in [(560,'Explore'),(675,'Charts'),(775,'Deals'),(870,'Releases'),(1000,'Updates')]:text(x,58,s,16,color=accent if s=='Explore' else ink,bold=s=='Explore')
  box(1232,44,108,42);text(1252,54,'Search',15)
  rule(124)
  y=186;text(pad,y,'YOUR INDEPENDENT GAME GUIDE',12,color=accent,bold=True)
  text(pad,y+31,'Find your next game.',44,serif=True,bold=True)
  text(pad,y+101,'Understand activity, reviews and the context behind each game.',18,color=muted)
  box(pad,y+150,765,60);text(pad+20,y+168,'Search games or AppID',17,color=muted)
  logo('steamharbor-symbol.png',1045,y-6,245)
  yy=445;d.rounded_rectangle((pad,yy,1340,yy+52),radius=6,fill='#243F42' if dark else '#F0E6D5')
  text(pad+18,yy+16,'DEMO DATA',12,color=accent,bold=True);text(pad+132,yy+14,'2 sample games. Preview values, not live Steam statistics.',15,color=ink)
  text(pad,545,'Player activity',28,serif=True,bold=True);text(pad,589,'Sample ranking · 2 games, not the full Steam catalog.',14,color=muted)
  text(1110,555,'About these numbers',14,color=accent)
  d.rectangle((pad,630,1340,676),fill=surface)
  for x,s in [(120,'RANK'),(200,'GAME'),(925,'PLAYERS · SAMPLE'),(1168,'24H PEAK · SAMPLE')]:text(x,646,s,11,color=muted,bold=True)
  for i,(name,tag,count,peak) in enumerate([('Counter-Strike 2','FPS · Competitive','473,263','1,244,579'),('Dota 2','MOBA · Strategy','365,950','823,285')]):
   yy=698+i*85;text(120,yy+4,'0'+str(i+1),17,color=muted);text(200,yy,name,20,bold=True);text(200,yy+32,tag,13,color=muted)
   for right,s in [(1060,count),(1320,peak)]:
    f=font(23,right==1060);d.text((right-d.textlength(s,font=f),yy+10),s,font=f,fill=ink if right==1060 else muted)
   rule(yy+65)
  for x,title,copy in [(100,'Price history','No price source is connected in this preview.'),(740,'Release calendar','No verified upcoming releases are connected.')]:
   box(x,900,600,105);text(x+22,919,title,20,serif=True,bold=True);text(x+22,955,copy,14,color=muted)
  text(pad,1040,'SteamHarbor is independent and is not affiliated with Valve or Steam.',12,color=muted)
 name=f'{"mobile" if mobile else "desktop"}-{"dark" if dark else "light"}.png';im.save(O/name)
for dark in [False,True]:
 for mobile in [False,True]:build(dark,mobile)
(O/'manifest.json').write_text(json.dumps({'status':'proposed-not-approved','renderer':'tools/brand/render_theme.py','data_source':'src/fixtures/games.ts','assets':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(O.glob('*.png'))]},indent=2)+'\n')
