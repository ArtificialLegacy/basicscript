const fs = require("fs");
const JFile = require('jfile');
let file = new JFile("./example/script.sjs"); // <-- file to read
let c = false;
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
String.prototype.allIndexesOf = function(subText) {
	caseSensitive = true;
	var _source = this;
	var _find = subText;
	if (caseSensitive != true) {
		_source = _source.toLowerCase();
		_find = _find.toLowerCase();
	}
	var result = [];
	for (var i = 0; i < _source.length;) {
		if (_source.substring(i, i + _find.length) == _find) {
			result.push(i);
			i += _find.length;
		} else {
			i += 1;
		}
	}
	return result;
}
String.prototype.replaceAt = function(index, replacement, x) {
  return this.substr(0, index) + replacement + this.substr(index + x);
}
String.prototype.parse = function(substring, char, igString = false){
	if(!igString){
		let allIndexes = this.allIndexesOf('`')
		if(allIndexes.length < 1){
			return this.replace(substring, char);
		}
		for(j = 0; j < allIndexes.length/2; j += 2){
			const startOfSubStringIndex = this.allIndexesOf(substring);
			for(o = 0; o < startOfSubStringIndex.length; o++){
				if (allIndexes[j] < startOfSubStringIndex[o] && allIndexes[j+1] > startOfSubStringIndex[o]) {} else {
					if(startOfSubStringIndex[o] == -1) return this;
					return this.replaceAt(startOfSubStringIndex[o], char, substring.length);
				}
			}
		}
	} else {
		return this.replace(substring, char);
	}
	return this;
}
let newFile = file.lines;
for(i = 0; i < newFile.length; i++){
	let line = newFile[i];
	let newLine = "";
	let context = newFile[i].split("");
	let s = false;
	newFile[i] = newFile[i].replaceAll('"', "`");
	newFile[i] = newFile[i].parse("(", "@");
	newFile[i] = newFile[i].parse(")", "@");
	newFile[i] = newFile[i].parse("{", "(");
	newFile[i] = newFile[i].parse("}", ")");
	newFile[i] = newFile[i].parse("then", "{");
	newFile[i] = newFile[i].parse("exit", "}");
	newFile[i] = newFile[i].parse("[", "{");
	newFile[i] = newFile[i].parse("]", "}");
	newFile[i] = newFile[i].parse("@", "[");
	newFile[i] = newFile[i].parse("@", "]");
	newFile[i] = newFile[i].parse("~", "//");
	newFile[i] = newFile[i].parse("->", "=>");
	newFile[i] = newFile[i].parse("builder", "constructor");
	newFile[i] = newFile[i].parse("origin", "this");
	newFile[i] = newFile[i].parse("bind", "static");
	newFile[i] = newFile[i].parse("childs", "extends");
	newFile[i] = newFile[i].parse("parent", "super");
	newFile[i] = newFile[i].parse("constant", "const");
	newFile[i] = newFile[i].parse("func", "function");
	newFile[i] = newFile[i].parse("run", "do");
	newFile[i] = newFile[i].parse("inner", "prototype");
	newFile[i] = newFile[i].parse("output", "console.log");
	newFile[i] = newFile[i].parse("build", "new");
	newFile[i] = newFile[i].parse("structure", "class");
	newFile[i] = newFile[i].parse("skip", "continue");
	newFile[i] = newFile[i].parse("read", "switch");
	newFile[i] = newFile[i].parse("is ", "case ");
	newFile[i] = newFile[i].parse("any:", "default:");
	newFile[i] = newFile[i].parse("basic", "default");
	newFile[i] = newFile[i].parse("builtfrom", "instanceof");
	newFile[i] = newFile[i].parse("istype", "typeof");
	newFile[i] = newFile[i].parse("error", "throw");
	newFile[i] = newFile[i].parse("use", "import");
	newFile[i] = newFile[i].parse("package", "export");
	newFile[i] = newFile[i].parse("implement", "require");
	newFile[i] = newFile[i].parse("|", ";");
	newFile[i] = newFile[i].parse("|", ";");
	newFile[i] = newFile[i].parse(" and ", " && ");
	newFile[i] = newFile[i].parse(" or ", " || ");
	newFile[i] = newFile[i].parse("[file]sjs", ".js", true);
	for(z = 0; z < context.length; z++){
		switch(context[z]){
			case "?":
				if(!c){
					newFile[i] = newFile[i].parse("?", "/*");
					c = true;
				} else {
					newFile[i] = newFile[i].parse("?", "*/");
					c = false;
				}
				break;
		}
	}
}
fs.writeFileSync("./script.js", newFile.join("\n"), (err) => {
	if(err) throw err;
});
