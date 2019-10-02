const fs = require("fs");
const JFile = require('jfile');
String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};
String.prototype.allIndexesOf = function(subText) {
	caseSensitive = true;
	var _find = subText;
	if (caseSensitive != true) {
		_this = _this.toLowerCase();	_find = _find.toLowerCase();
	}
	var result = [];
	for (var i = 0; i < this.length;) {
		if (this.substring(i, i + _find.length) == _find) {
			result.push(i);	i += _find.length;
		} else i += 1;
	} return result;
}
String.prototype.replaceAt = function(index, replacement, x) {
  return this.substr(0, index) + replacement + this.substr(index + x);
}
String.prototype.parse = function(substring, char, igString = false){
	if(!igString){
		let allIndexes = this.allIndexesOf('`')
		if(allIndexes.length < 1) return this.replaceAll(substring, char);
		for(j = 0; j < allIndexes.length/2; j += 2){
			const startOfSubStringIndex = this.allIndexesOf(substring);
			for(o = 0; o < startOfSubStringIndex.length; o++){
				if (allIndexes[j] < startOfSubStringIndex[o] && allIndexes[j+1] > startOfSubStringIndex[o]) {} else {
					if(startOfSubStringIndex[o] == -1) return this;
					return this.replaceAt(startOfSubStringIndex[o], char, substring.length);
				}
			}
		}
	} else return this.replace(substring, char);
	return this;
}
let program = JSON.parse(fs.readFileSync("./Program/program.json"));
let files = program.scripts;
files.unshift(program.entry);
for (let l = 0; l < files.length; l++) {
	let file = new JFile(`./Program/${files[l]}`); // <-- file to read
	let c = false;
	let newFile = file.lines;
	for(i = 0; i < newFile.length; i++){
		let line = newFile[i]; let newLine = "";
		let context = newFile[i].split("");
		let s = false;
		newFile[i] = newFile[i].replaceAll('"', "`");
		newFile[i] = newFile[i].parse("(", "@");
		newFile[i] = newFile[i].parse(")", "@");
		newFile[i] = newFile[i].parse("{", "(");
		newFile[i] = newFile[i].parse("}", ")");
		newFile[i] = newFile[i].parse("->", "{");
		newFile[i] = newFile[i].parse("@>", "}");
		newFile[i] = newFile[i].parse("[", "{");
		newFile[i] = newFile[i].parse("]", "}");
		newFile[i] = newFile[i].parse("@", "[");
		newFile[i] = newFile[i].parse("@", "]");
		newFile[i] = newFile[i].parse("<~", "extends");
		newFile[i] = newFile[i].parse("~>", "=>");
		newFile[i] = newFile[i].parse("~", "//");
		newFile[i] = newFile[i].parse("builder", "constructor");
		newFile[i] = newFile[i].parse("origin", "this");
		newFile[i] = newFile[i].parse("bind", "static");
		newFile[i] = newFile[i].parse("parent", "super");
		newFile[i] = newFile[i].parse("constant", "const");
		newFile[i] = newFile[i].parse("func", "function");
		newFile[i] = newFile[i].parse("run", "do");
		newFile[i] = newFile[i].parse("inner", "prototype");
		newFile[i] = newFile[i].parse("output.empty", "console.log('')");
		newFile[i] = newFile[i].parse("output", "console.log");
		newFile[i] = newFile[i].parse("build", "new");
		newFile[i] = newFile[i].parse("skip", "continue");
		newFile[i] = newFile[i].parse("read", "switch");
		newFile[i] = newFile[i].parse("is ", "case ");
		newFile[i] = newFile[i].parse("any:", "default:");
		newFile[i] = newFile[i].parse("basic", "default");
		newFile[i] = newFile[i].parse("builtfrom", "instanceof");
		newFile[i] = newFile[i].parse("istype", "typeof");
		newFile[i] = newFile[i].parse("error", "throw");
		newFile[i] = newFile[i].parse("use", "import");
		newFile[i] = newFile[i].parse("export", "module.exports");
		newFile[i] = newFile[i].parse("package", "export");
		newFile[i] = newFile[i].parse("implement", "require");
		newFile[i] = newFile[i].parse("loop", "setInterval");
		newFile[i] = newFile[i].parse("delay", "setTimeout");
		newFile[i] = newFile[i].parse("&", ";");
		newFile[i] = newFile[i].parse(" and ", " && ");
		newFile[i] = newFile[i].parse(" or ", " || ");
		newFile[i] = newFile[i].parse("[file]sjs", ".js", true);
		for(z = 0; z < context.length; z++){
			if(context[z] == "?"){
					if(!c){
						newFile[i] = newFile[i].parse("?", "/*");
						c = true;
					} else {
						newFile[i] = newFile[i].parse("?", "*/");
						c = false;
					}
			}
		}
	}
	fs.writeFileSync(`./Compile/${files[l].replace(".sjs", ".js")}`, newFile.join("\n"));
}
const Main = require(`./Compile/${program.entry.replace(".sjs", ".js")}`);
Main.main();
