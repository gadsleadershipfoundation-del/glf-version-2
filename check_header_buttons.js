const fs = require('fs');
const path = require('path');

const filePath = "c:/Users/DELL/Downloads/_public_html (5)/header.html";
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
console.log("Searching for links or buttons in header.html...");
lines.forEach((line, idx) => {
  if ((line.includes('<a ') || line.includes('<button')) && (line.includes('class=') && (line.includes('btn') || line.includes('cta')))) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
