# 🎯 Getting Started with Sarala Yoga Website

**Welcome!** This is a simple, pure HTML/CSS/JS website - no build tools, no npm, no complexity!

## 🚀 Quick Start (5 Minutes)

### Step 1: View the Website Locally

**Option A: Direct Browser (Simplest)**
```bash
# Just double-click index.html in your file explorer
# Or open it directly in any browser
```

**Option B: Simple HTTP Server (Better)**
```bash
# Using Python (comes with Mac/Linux)
cd /path/to/saralayoga
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Step 2: Make Your First Edit

1. Open `index.html` in any text editor (VS Code, Sublime, even Notepad!)
2. Find the phone number: `+91 9945400870`
3. Change it if needed
4. Save the file
5. Refresh your browser - see the change instantly! ✨

**That's it!** No build, no compilation, just edit and refresh.

---

## 📁 What's in This Project?

```
saralayoga/
│
├── index.html              👈 Homepage - START HERE
├── about.html              👤 About Sarala
├── services.html           💼 Yoga services
├── pricing.html            💰 Pricing info
├── gallery.html            📸 Photo gallery
├── contact.html            📧 Contact form
├── blog.html               ✍️ Blog/articles
├── privacy.html            🔒 Privacy policy
├── terms.html              📜 Terms of service
│
├── README.md               📖 Full documentation
├── DEPLOYMENT.md           🚀 How to deploy online
├── GETTING-STARTED.md      ⭐ This file
│
├── src/                    📁 Assets folder
│   ├── css/
│   │   └── styles.css      🎨 ALL styles (pure CSS)
│   │
│   ├── js/
│   │   ├── main.js         ⚙️ Core functionality
│   │   ├── gallery.js      🖼️ Gallery features
│   │   └── contact-form.js 📝 Form validation
│   │
│   └── assets/
│       ├── images/         🖼️ Add your photos here
│       └── icons/          🎯 Icons and favicon
│
└── public/                 🌐 SEO and PWA files
    ├── manifest.json       📱 PWA config
    ├── sitemap.xml         🗺️ For Google
    └── robots.txt          🤖 Search engine rules
```

---

## ✏️ Common Edits You'll Want to Make

### 1. Update Contact Information

**Search and replace in ALL HTML files:**

```html
<!-- Find: -->
+91 9945400870
yogasarala@gmail.com
137, 8th Cross, Puttenahalli Rd

<!-- Replace with your actual info -->
```

**Quick way to do this:**
- VS Code: Ctrl+Shift+F (Windows) or Cmd+Shift+F (Mac)
- Search across all files
- Replace all at once

### 2. Add Your Photos

**Required images:**
```
src/assets/images/
├── logo.png               (Your logo - 120x40px)
├── hero-yoga.jpg          (Homepage hero - 800x1000px)
├── sarala-profile.jpg     (About page - 400x400px)
│
├── gallery/               (Gallery photos)
│   ├── studio-main.jpg
│   ├── group-class.jpg
│   └── ... (add more)
│
└── blog/                  (Blog featured images)
    ├── featured-post.jpg
    └── ... (add more)
```

**Where to get free photos:**
- 🌅 Unsplash.com - High quality yoga photos
- 📸 Pexels.com - Free stock photos
- 🎨 Pixabay.com - Free images

### 3. Customize Colors

Open `src/css/styles.css` and change these variables:

```css
:root {
  /* Main brand color - change this! */
  --color-primary-600: #0284c7;   /* Sky blue */
  
  /* Accent color - optional */
  --color-accent-600: #c026d3;    /* Purple */
  
  /* That's it! All buttons, links, etc. update automatically */
}
```

**Popular color choices:**
- Calming Blue: `#0284c7`
- Natural Green: `#10b981`
- Peaceful Purple: `#8b5cf6`
- Warm Orange: `#f59e0b`

### 4. Update Service Prices

Edit any HTML file (e.g., `index.html`, `pricing.html`):

```html
<!-- Find: -->
<div class="text-2xl font-bold text-gray-900 mb-2">
  ₹800/session
</div>

<!-- Change to your actual price -->
```

### 5. Add Blog Posts

Open `src/blog.html` and copy this structure:

```html
<article class="blog-card">
  <div class="aspect-video">
    <img src="/src/assets/images/blog/your-image.jpg" 
         alt="Your blog post title" 
         loading="lazy">
  </div>
  <div class="p-6">
    <div class="mb-3">
      <span class="tag tag-primary">Category</span>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-3">
      <a href="#your-post">Your Blog Post Title</a>
    </h3>
    <p class="text-gray-600 mb-4">
      Your post description here...
    </p>
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500">Jan 15, 2024</span>
      <span class="text-sm text-gray-500">5 min read</span>
    </div>
  </div>
</article>
```

---

## 🎨 Styling Guide

### How to Use CSS Classes

The website uses simple, descriptive class names:

**Buttons:**
```html
<a href="#" class="btn btn-primary">Primary Button</a>
<a href="#" class="btn btn-outline">Outlined Button</a>
```

**Cards:**
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

<div class="card card-hover p-6">
  <!-- Adds hover effect -->
</div>
```

**Grid Layout:**
```html
<div class="grid grid-cols-1 grid-cols-md-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Text Colors:**
```html
<p class="text-primary-600">Primary color text</p>
<p class="text-gray-600">Gray text</p>
<p class="text-white">White text</p>
```

**Spacing:**
```html
<div class="mb-4">Margin bottom</div>
<div class="p-6">Padding all sides</div>
<div class="py-12">Padding top and bottom</div>
```

---

## 🧪 Testing Your Changes

### 1. Visual Check
- Open in browser
- Check all pages
- Test on mobile (resize browser)
- Verify images load
- Test all links

### 2. Accessibility Check
- Tab through the entire site (keyboard only)
- Zoom in to 200% (Ctrl/Cmd + +)
- Test with screen reader (optional)

### 3. Performance Check
- Open Chrome DevTools (F12)
- Go to "Lighthouse" tab
- Run audit
- Aim for 90+ scores

---

## 🚀 Ready to Deploy?

When your website looks good locally:

1. **Read DEPLOYMENT.md** for detailed deployment instructions
2. **Choose a hosting option:**
   - GitHub Pages (Free, recommended)
   - Netlify (Free, easiest)
   - Your own hosting
3. **Upload files** using Git or FTP
4. **Configure domain** (www.saralayoga.in)
5. **Set up email** (Zoho Mail)

**Estimated time:** 30-60 minutes for first-time deployment

---

## ❓ FAQ

### Do I need to install anything?
**No!** Just a text editor and a browser. That's it.

### Can I use this without knowing code?
**Yes!** Just edit the text in HTML files. The structure is already there.

### What if I break something?
**No worries!** Just:
1. Ctrl+Z to undo, or
2. Re-download the original files from GitHub

### How do I add more pages?
1. Copy an existing HTML file (e.g., `services.html`)
2. Rename it (e.g., `workshops.html`)
3. Update the content
4. Add link in navigation of all pages
5. Update `sitemap.xml`

### Can I add a contact form that sends emails?
The current form has validation but doesn't send emails (needs backend).

**Easy solutions:**
- Use **FormSpree** (free): https://formspree.io
- Use **Netlify Forms** (if hosted on Netlify)
- Just display contact info (phone/email) - current approach

### Where do I get a logo?
- **Hire on Fiverr** ($5-50): https://fiverr.com
- **Use Canva** (free): https://canva.com
- **AI Generator** (free): https://looka.com

---

## 🆘 Getting Help

### Something not working?

1. **Check browser console:**
   - Press F12
   - Look for red errors
   - Most issues show up here

2. **Common issues:**
   - **Images not showing:** Check file path and name (case-sensitive)
   - **Styles not working:** Check `styles.css` is linked
   - **Page not found:** Check file name matches link

3. **Need human help?**
   - Email: yogasarala@gmail.com
   - Phone: +91 9945400870

---

## 📚 Learn More

Want to understand and customize more?

**HTML/CSS Basics:**
- https://www.w3schools.com/html/
- https://www.w3schools.com/css/

**Specific Tasks:**
- Change colors → Edit `src/css/styles.css` (lines 8-30)
- Update text → Edit any `.html` file
- Add images → Save to `src/assets/images/` folder
- Change layout → Modify grid classes in HTML

---

## ✅ Quick Checklist

Before going live:

- [ ] All contact info updated
- [ ] Real photos added
- [ ] Prices verified
- [ ] All links tested
- [ ] Mobile responsive checked
- [ ] Tested in multiple browsers
- [ ] Grammar/spelling checked
- [ ] Loading speed is good
- [ ] Looks professional

---

## 🎉 You're All Set!

Your website is:
- ✅ SEO optimized
- ✅ Accessibility compliant
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ Easy to maintain
- ✅ Ready to deploy

**Next step:** Open `index.html` and start exploring! 🚀

---

**Made with ❤️ for Sarala Yoga**

*Transform lives through yoga, one student at a time.* 🧘‍♀️✨
