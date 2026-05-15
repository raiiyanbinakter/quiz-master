const fs = require('fs');
let content = fs.readFileSync('src/data/questions_phy1_chap2.ts', 'utf8');

// Replace rightwards arrow (U+2192) with combining right arrow above (U+20D7)
content = content.replace(/→/g, '\u20D7');

// Fix n hat in question 1
content = content.replace('n = 0', 'n̂ = 0');

fs.writeFileSync('src/data/questions_phy1_chap2.ts', content);
console.log('Fixed vectors');
