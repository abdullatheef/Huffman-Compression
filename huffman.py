# Input string as command line argument

import sys

codes={}
def frequency(strin):
	freq={}
	for i in strin:
		freq[i]=freq.get(i,0)+1
	return sort(freq)
def sort(freq):
	tuples=[]
	for i in freq.keys():
		tuples.append((freq[i],i))
		tuples.sort()
	return buildtree(tuples)
def buildtree(tuples):
	while len(tuples)>1:
		first_two=tuple(tuples[:2])
		rest=tuples[2:]
		add=first_two[0][0]+first_two[1][0]
		tuples=rest+[(add,first_two)]
		tuples.sort()
	return trimtree(tuples[0])
def trimtree(tree):
	p=tree[1]
	if type(p)==type(""):
		return p
	else:
		return (trimtree(p[0]),trimtree(p[1]))
def assigncode(node,pattern=""):
	global codes
	if type(node)==type(""):
		codes[node]=pattern
	else:
		assigncode(node[0],pattern+"0")
		assigncode(node[1],pattern+"1")
def encode(string):
	global codes
	output=""
	for i in string:
		output +=codes[i]
	return output
def decode(treee,bitstr):
	out=""
	tree=treee
	for bit in bitstr:
		if bit=="0":tree=tree[0]
		else:tree=tree[1]
		if type(tree)==type(""):
			out+=tree
			tree=treee
	return out
	
assigncode(frequency(sys.argv[1]))
print "To encode:",sys.argv[1]
print "character bits:",codes
print "encoded bits:",encode(sys.argv[1])
print "tree=",frequency(sys.argv[1])
print "decoded:",decode(frequency(sys.argv[1]),encode(sys.argv[1]))
print "Here \"%s\" need only %d bits where generally needs %d bits"%(sys.argv[1],len(encode(sys.argv[1])),8*len(sys.argv[1]))
