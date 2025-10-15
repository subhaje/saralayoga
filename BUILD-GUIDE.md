# Build Guide - Sarala Yoga Website

This guide explains how to work with the website in development mode and build it for production.

## 🚀 Quick Start

### First Time Setup

```bash
# Install dependencies
npm install
```

## 💻 Development Mode

In development mode, files are **NOT minified** for easier debugging:

```bash
# Start development mode with auto-rebuild on file changes
npm run dev

# In another terminal, serve the website locally
npm run serve
```

Then open your browser to `http://localhost:8000`

### What Happens in Dev Mode:
- ✅ Tailwind CSS compiles and watches for changes
- ✅ CSS is readable and formatted
- ✅ Source maps are included
- ✅ Files update automatically when you save

## 🏭 Production Build

For production, all files are **minified** for optimal performance:

```bash
# Build for production
npm run build
```

### What Happens in Production Build:
- ✅ HTML files are minified (whitespace removed, comments removed)
- ✅ CSS is minified and purged (unused styles removed)
- ✅ JavaScript is minified and compressed
- ✅ All files are optimized for fast loading
- ✅ CDN Tailwind is replaced with local compiled CSS
- ✅ Output goes to `/dist` directory

## 📁 Directory Structure

```
saralayoga/
├── src/                  # Source files (development)
│   ├── css/
│   │   └── styles.css   # Your custom styles
│   ├── js/              # JavaScript files
│   └── assets/          # Images, icons, etc.
│
├── dist/                # Production build output (minified)
│   ├── *.html          # Minified HTML files
│   ├── styles.css      # Minified CSS (Tailwind + custom)
│   ├── js/             # Minified JavaScript
│   └── assets/         # Copied assets
│
├── *.html              # HTML source files
├── build.js            # Build script
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development mode with CSS watching |
| `npm run build` | Build for production (minified) |
| `npm run serve` | Start local development server |

## 🔧 Configuration Files

### `tailwind.config.js`
- Configures Tailwind CSS
- Defines custom colors (primary, accent, secondary)
- Sets up container and font families

### `build.js`
- Minifies HTML files
- Minifies JavaScript files
- Copies assets to `/dist`
- Replaces CDN Tailwind with local build

### `package.json`
- Lists all dependencies
- Defines build scripts

## 🚢 Deployment

### For Production:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `/dist` directory:**
   - Upload all files from `/dist` to your web server
   - Or use services like Netlify, Vercel, GitHub Pages

3. **Update paths if needed:**
   - The build script automatically updates CSS paths
   - Verify all asset paths work on your production server

### Important Notes:
- ⚠️ **Always deploy from `/dist`**, not root directory
- ⚠️ Don't commit `/dist` to git (it's in `.gitignore`)
- ⚠️ Rebuild before each deployment

## 🐛 Troubleshooting

### "Command not found: tailwindcss"
```bash
npm install
```

### CSS not updating in development
- Make sure `npm run dev` is running
- Try restarting the dev server
- Clear browser cache

### Production build size too large
- Check if all images are optimized
- Verify Tailwind is purging unused styles
- Consider using WebP format for images

## 📊 Performance Benefits

### Development (Unminified):
- **HTML:** ~15-20 KB per page
- **CSS:** ~50-60 KB (Tailwind + custom)
- **JS:** ~10-15 KB

### Production (Minified):
- **HTML:** ~8-10 KB per page (50% reduction)
- **CSS:** ~10-15 KB (75% reduction, purged)
- **JS:** ~5-7 KB (50% reduction)

## 🔄 Workflow

### Daily Development:
```bash
# 1. Start dev mode
npm run dev

# 2. In another terminal, serve locally
npm run serve

# 3. Make your changes
# Files will auto-rebuild!

# 4. Test in browser at localhost:8000
```

### Before Deployment:
```bash
# 1. Build for production
npm run build

# 2. Test the production build
cd dist
python3 -m http.server 8000

# 3. Verify everything works

# 4. Deploy the /dist folder
```

## 🎯 Best Practices

1. **Always work in development mode** when coding
2. **Test the production build** before deploying
3. **Don't edit files in /dist** (they get overwritten)
4. **Keep dependencies updated** regularly
5. **Optimize images** before adding them
6. **Test on multiple browsers** after building

## 📝 Notes

- The build process removes the Tailwind CDN link and uses local compiled CSS
- Source maps are not included in production for security
- All custom CSS variables from `styles.css` are preserved
- Images are copied but not optimized (do this manually if needed)

---

**Need help?** Check the main README.md or contact the development team.

