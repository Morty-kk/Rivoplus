const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const logoComponent = path.join('src', 'components', 'Logo'); // no extension
const exts = ['.tsx', '.ts', '.jsx', '.js'];

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

const files = walk(projectRoot).filter(f => exts.includes(path.extname(f)));
const svgRegex = /<svg[\s\S]*?<\/svg>/gi;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!svgRegex.test(content)) return;

  // create backup
  fs.copyFileSync(file, file + '.bak');

  // replace all svg blocks
  content = content.replace(svgRegex, '<Logo className="h-8" />');

  // compute import path
  const rel = path.relative(path.dirname(file), path.join(projectRoot, logoComponent)).replace(/\\/g, '/');
  const importPath = rel.startsWith('.') ? rel : './' + rel;
  const importStmt = `import Logo from '${importPath}';`;

  if (!/import\s+Logo\s+from/.test(content)) {
    // insert import after last existing import or at top
    const imports = content.match(/^(?:import[\s\S]*?;[\r\n]+)/gm);
    if (imports && imports.length) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, lastImport + '\n' + importStmt + '\n');
    } else {
      content = importStmt + '\n' + content;
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated:', path.relative(projectRoot, file));
});

console.log('Done. Backups: *.bak');
