from nltk.corpus import cmudict

d = cmudict.dict()
res = d.get("")
print(res)