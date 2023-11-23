var fs = require('fs');
var ejs = require('ejs');
var pdf = require('html-pdf');

const example = () => {
  const compiled = ejs.compile(fs.readFileSync(__dirname + '/ITI0491.html', 'utf8'));
  const html = compiled({ cribroomCode: 'EJS', cribroomName: 'Hello, World!' });

  pdf.create(html).toFile('./result.pdf', () => {
    console.log('pdf done');
  });
};
var fs = require('fs');
var ejs = require('ejs');
var pdf = require('html-pdf')


module.exports = example;
