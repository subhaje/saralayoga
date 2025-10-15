const fs = require('fs');
const path = require('path');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');

// Configuration
const config = {
  html: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  },
};

// Directories
const distDir = path.join(__dirname, 'dist');
const srcJsDir = path.join(__dirname, 'src', 'js');
const distJsDir = path.join(distDir, 'js');

// Create dist directories
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(distJsDir)) {
  fs.mkdirSync(distJsDir, { recursive: true });
}

// Minify HTML files
console.log('📦 Minifying HTML files...');
const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const inputPath = path.join(__dirname, file);
  const outputPath = path.join(distDir, file);
  
  try {
    const html = fs.readFileSync(inputPath, 'utf8');
    
    // Replace CDN Tailwind with local build
    const updatedHTML = html.replace(
      /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/,
      ''
    ).replace(
      '<link rel="stylesheet" href="/src/css/styles.css">',
      '<link rel="stylesheet" href="/dist/styles.css">'
    );
    
    const minified = minifyHTML(updatedHTML, config.html);
    fs.writeFileSync(outputPath, minified);
    console.log(`  ✓ ${file}`);
  } catch (error) {
    console.error(`  ✗ Error minifying ${file}:`, error.message);
  }
});

// Minify JavaScript files
console.log('\n📦 Minifying JavaScript files...');
const jsFiles = ['main.js', 'gallery.js', 'contact-form.js'];

jsFiles.forEach(file => {
  const inputPath = path.join(srcJsDir, file);
  const outputPath = path.join(distJsDir, file);
  
  if (fs.existsSync(inputPath)) {
    try {
      const code = fs.readFileSync(inputPath, 'utf8');
      minifyJS(code, { compress: true, mangle: true }).then(result => {
        fs.writeFileSync(outputPath, result.code);
        console.log(`  ✓ ${file}`);
      }).catch(error => {
        console.error(`  ✗ Error minifying ${file}:`, error.message);
      });
    } catch (error) {
      console.error(`  ✗ Error reading ${file}:`, error.message);
    }
  }
});

// Copy assets
console.log('\n📦 Copying assets...');
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Copy public directory
if (fs.existsSync(path.join(__dirname, 'public'))) {
  copyDir(path.join(__dirname, 'public'), path.join(distDir, 'public'));
  console.log('  ✓ public/');
}

// Copy images
if (fs.existsSync(path.join(__dirname, 'src', 'assets'))) {
  copyDir(
    path.join(__dirname, 'src', 'assets'),
    path.join(distDir, 'assets')
  );
  console.log('  ✓ src/assets/');
}

console.log('\n✅ Build complete! Production files are in the /dist directory.\n');

