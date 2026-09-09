from pathlib import Path
from PIL import Image
import numpy as np,json,hashlib
R=Path(__file__).resolve().parents[2];A=R/'docs/brand/production/v02-r01';O=R/'docs/brand/production/v02-r02'
# Use existing intact alpha. Only the lettering region changes to the approved ivory.
for name,cut,axis in [('vertical',558,0),('horizontal-candidate',308,1)]:
 p=A/f'steamharbor-{name}.png'; im=Image.open(p).convert('RGBA');a=np.array(im); region=a[cut:,:,:] if axis==0 else a[:,cut:,:]
 region[:,:,:3]=[247,243,234];a[a[:,:,3]==0,:3]=0
 out=O/f'steamharbor-{name.replace("-candidate","")}-reverse.png';Image.fromarray(a).save(out)
 check=np.array(Image.open(out));assert np.array_equal(check[:,:,3],np.array(im)[:,:,3])
 if axis==0:assert np.array_equal(check[:cut],np.array(im)[:cut])
 else:assert np.array_equal(check[:,:cut],np.array(im)[:,:cut])
(O/'manifest.json').write_text(json.dumps({'status':'technical repair and consistent horizontal reverse derivative','method':'preserve source alpha and emblem pixels; set lettering RGB to approved ivory','files':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in O.glob('*.png')]},indent=2)+'\n')
