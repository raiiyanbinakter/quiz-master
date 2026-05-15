const fs = require('fs');
let content = fs.readFileSync('src/data/questions_phy1_chap2.ts', 'utf8');
content = content.replace(/\u20D7/g, '→');
fs.writeFileSync('src/data/questions_phy1_chap2.ts', content);
console.log('Reverted vectors to →');
