
var fs = require('fs');
var exec = require('child_process').exec

var imgs = fs.readdirSync('assets');
imgs.forEach(function (value) {
    console.log('processing', value, '...');
    exec(`inkscape --export-png=img/${value.replace('.svg', '.png')} --export-width=128 --export-height=128 assets/${value}`, function (err) { if (err) {console.log(err);} });
});

