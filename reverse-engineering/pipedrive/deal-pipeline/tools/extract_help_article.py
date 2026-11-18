import re,sys,html
t=open(sys.argv[1]).read()
i=t.find('Last updated');s=t[i if i>0 else 0:]
s=re.sub(r'<script.*?</script>|<style.*?</style>','',s,flags=re.S)
s=html.unescape(re.sub(r'<[^>]+>',' ',s));s=re.sub(r'[ \t]+',' ',s);s=re.sub(r'\s*\n\s*','\n',s)
e=s.find('Was this article helpful');print(s[:e if e>0 else int(sys.argv[2])][:int(sys.argv[2])])
