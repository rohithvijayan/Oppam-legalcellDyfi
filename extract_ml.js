const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'supabase') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getFiles(__dirname);
const malayalamRegex = /[\u0D00-\u0D7F]/;
const allTexts = new Set();

for (const file of allFiles) {
  if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.md')) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      if (malayalamRegex.test(line)) {
        let text = line.trim();
        // try to extract from quotes if it's code
        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const matches = line.match(/(["'`])(.*?[\u0D00-\u0D7F]+.*?)\1/g);
            if (matches) {
                for (const m of matches) {
                    allTexts.add(m.slice(1, -1));
                }
                continue;
            }
        }
        
        // try to extract from html tags
        if (file.endsWith('.html') || file.endsWith('.tsx')) {
            const matches = line.match(/>([^<]*[\u0D00-\u0D7F]+[^<]*)</g);
            if (matches) {
                for (const m of matches) {
                    allTexts.add(m.slice(1, -1).trim());
                }
                continue;
            }
        }
        
        // if no specific exact match, add the whole cleaned line
        text = text.replace(/^[-*#\s]+/, '');
        allTexts.add(text);
      }
    }
  }
}

fs.writeFileSync('malayalam_texts.json', JSON.stringify(Array.from(allTexts), null, 2));
console.log('Done!');
