import json,sys
spec=json.load(open(sys.argv[1])); paths=sys.argv[2].split(',')
def res(o,d=0,seen=()):
    if d>14: return '...'
    if isinstance(o,dict):
        if '$ref' in o:
            r=o['$ref']
            if r in seen: return {'$ref':r}
            n=spec
            for k in r.lstrip('#/').split('/'): n=n[k]
            return res(n,d+1,seen+(r,))
        if 'allOf' in o:
            m={'type':'object','properties':{}}
            for s in o['allOf']:
                s=res(s,d+1,seen)
                if isinstance(s,dict): m['properties'].update(s.get('properties',{}))
            return m
        return {k:res(v,d+1,seen) for k,v in o.items() if k not in('example','examples','x-pd-deprecated')}
    if isinstance(o,list): return [res(x,d+1,seen) for x in o]
    return o
def flat(s,pre=''):
    out=[]
    if not isinstance(s,dict): return out
    if s.get('type')=='array' and isinstance(s.get('items'),dict): return flat(s['items'],pre+'[]')
    pr=s.get('properties'); pr=pr if isinstance(pr,dict) else {}
    for k,v in pr.items():
        if not isinstance(v,dict): continue
        t=v.get('type','');e=v.get('enum');desc=(v.get('description') or '').replace('\n',' ')[:220]
        out.append(f"  {pre}{k}: {t}{' enum='+str(e) if e else ''}{' nullable' if v.get('nullable') else ''} — {desc}")
        if pre.count('.')<2: out+=flat(v,pre+k+'.')
    return out
for p in paths:
    for m,op in spec['paths'].get(p,{}).items():
        if m not in('get','post','put','patch','delete'): continue
        print(f"\n### {m.upper()} {p} — {op.get('summary')}\n{(op.get('description') or '')[:500]}")
        for prm in op.get('parameters',[]):
            prm=res(prm); s=prm.get('schema',{})
            print(f"  param {prm['in']}:{prm['name']} {s.get('type')} {s.get('enum') or ''} {'req' if prm.get('required') else ''} — {(prm.get('description') or '')[:200]}")
        rb=op.get('requestBody')
        if rb:
            sch=res(rb)['content'].get('application/json',{}).get('schema',{})
            print('  BODY:');print('\n'.join(flat(sch)))
        if m=='get' or '--resp' in sys.argv:
            r=op.get('responses',{}).get('200')
            if r:
                sch=res(r).get('content',{}).get('application/json',{}).get('schema',{})
                d=sch.get('properties',{}).get('data',{})
                print('  RESPONSE data:');print('\n'.join(flat(d)[:120]))
