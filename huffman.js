//Input string as command line argument

function frequency(str){
	var freqs={};
	for (var i in str){
		if (freqs[str[i]]==undefined){
			freqs[str[i]]=1;
		}
		else{
			freqs[str[i]]+=1;
		}
	}
	return freqs;
}
function sort(freq){
	chars=[];
	for (i in freq){
		chars.push([freq[i],i]);
	}
	return (chars.sort());
}
function buildTree(list){
	while ((list.length)>1){
		var firstTwo=list.slice(0,2);
		var rest=list.slice(2);
		var add=firstTwo[0][0]+firstTwo[1][0];
		list=rest;
		var addedList=[add,firstTwo];
		list.push(addedList);
		list.sort();
	}
	return list[0];
}
function trimTree(tree){
	var p=tree[1];
	if (typeof(p)==typeof("")){
		return p;
	}
	else{
		return (Array(trimTree(p[0]),trimTree(p[1])));
}
}
var codes={};
function assignCodes(node,pat){
	pat=pat || "";
	if (typeof(node)==typeof("")){
		codes[node]=pat;
	}
	else{
		assignCodes(node[0],pat+"0");
		assignCodes(node[1],pat+"1");
	}
}
function encode(str){
	output="";
	for (var letter in str){
		output+=codes[str[letter]];
	}
	return output;
}
function decode(treee,bitstr){
	var out="";
	var tree=treee;
	for (var bit in bitstr){
		if (bitstr[bit]=="0"){
			tree=tree[0];
		}
		else{
			tree=tree[1];
		}
		if (type(tree)==type("")){
			out+=tree;
			tree=treee
		}
	}
	return out;
}
assignCodes(trimTree(buildTree(sort(frequency(process.argv[2])))));
console.log("To encode: "+process.argv[2]);
console.log("Tree: ",trimTree(buildTree(sort(frequency(process.argv[2])))));
console.log("Binary Codes for each character: "+codes);
console.log("Encoded: "+encode(process.argv[2]));
console.log("Decoded: "+decode(trimTree(buildTree(sort(frequency(process.argv[2]))))),process.argv[2]);
console.log("Here "+process.argv[2]+" need only "+encode(process.argv[2]).length+" bits");
