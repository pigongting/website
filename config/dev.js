var fs = require('fs');
var path = require('path');  //引入包

var headString = fs.readFileSync('head.html').toString();
var footString = fs.readFileSync('foot.html').toString();

function buildPage(pagename) {
    var pageString = fs.readFileSync(pagename).toString();
    var page = headString + pageString + footString;
    fs.writeFileSync(`./pages/${pagename}`, page);
}

var nameArr = fs.readdirSync(__dirname);//获取当前文件夹下的文件名

for (let index = 0; index < nameArr.length; index++) {
    //筛选出合适的文件执行上面的方法
    if (nameArr[index].endsWith('.html') && nameArr[index] != 'head.html' && nameArr[index] != 'foot.html') {
        buildPage(nameArr[index])
    }
}
