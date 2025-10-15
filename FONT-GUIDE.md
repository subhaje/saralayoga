# Font Configuration Guide

## ✅ Fonts Successfully Configured!

Your Tailwind CSS setup now uses the following typography:

### 🎨 Font Families

1. **Playfair Display** - Elegant serif font for headings
2. **Quicksand** - Clean, modern sans-serif for body text

---

## 📝 Automatic Application

### Default Behavior

The fonts are **automatically applied** to all elements:

```css
/* Body Text (Quicksand) */
body {
  font-family: Quicksand, sans-serif;
}

/* All Headings (Playfair Display) */
h1, h2, h3, h4, h5, h6 {
  font-family: Playfair Display, serif;
}
```

**This means you don't need to add any classes** - the fonts work automatically!

---

## 🎯 Usage Examples

### 1. Automatic Font Application

Simply use standard HTML elements:

```html
<!-- Headings automatically use Playfair Display -->
<h1>Welcome to Sarala Yoga</h1>
<h2>Our Services</h2>
<h3>Class Schedule</h3>

<!-- Body text automatically uses Quicksand -->
<p>Transform your life through professional yoga training...</p>
<div>All body content uses Quicksand by default</div>
```

### 2. Using Utility Classes

You can also explicitly set fonts using Tailwind classes:

```html
<!-- Use Playfair Display (serif) -->
<div class="font-serif">Elegant serif text</div>
<div class="font-heading">Same as font-serif</div>

<!-- Use Quicksand (sans-serif) -->
<div class="font-sans">Clean sans-serif text</div>
<div class="font-body">Same as font-sans</div>
```

### 3. Pre-built Heading Classes

Use our custom heading classes (already include Playfair Display):

```html
<h1 class="heading-1">
  Large Display Heading
</h1>
<!-- Result: 4xl-6xl size, bold, Playfair Display -->

<h2 class="heading-2">
  Section Heading
</h2>
<!-- Result: 3xl-5xl size, bold, Playfair Display -->

<h3 class="heading-3">
  Subsection Heading
</h3>
<!-- Result: 2xl-3xl size, semibold, Playfair Display -->

<h4 class="heading-4">
  Card Heading
</h4>
<!-- Result: xl-2xl size, semibold, Playfair Display -->
```

### 4. Body Text Classes

Use our custom text classes (already include Quicksand):

```html
<p class="text-lead">
  Large introductory paragraph
</p>
<!-- Result: lg-xl size, Quicksand, gray-600 -->

<p class="text-muted">
  Muted secondary text
</p>
<!-- Result: gray-500, Quicksand -->
```

---

## 🎨 Font Class Reference

### Available Font Utility Classes

| Class | Font Family | Usage |
|-------|-------------|-------|
| `font-sans` | Quicksand | Default body font |
| `font-serif` | Playfair Display | Headings |
| `font-heading` | Playfair Display | Same as serif |
| `font-body` | Quicksand | Same as sans |

### Font Weight Classes

Combine with weight classes for variations:

```html
<!-- Quicksand weights -->
<p class="font-normal">Normal - 400</p>
<p class="font-medium">Medium - 500</p>
<p class="font-semibold">Semibold - 600</p>
<p class="font-bold">Bold - 700</p>

<!-- Playfair Display weights -->
<h1 class="font-normal">Normal - 400</h1>
<h1 class="font-semibold">Semibold - 600</h1>
<h1 class="font-bold">Bold - 700</h1>
```

---

## 📦 Complete Component Examples

### Hero Section

```html
<section class="bg-gradient-primary text-white py-20">
  <div class="container mx-auto px-4">
    <!-- Heading uses Playfair Display automatically -->
    <h1 class="heading-1 mb-4">
      Transform Your Life
    </h1>
    
    <!-- Body text uses Quicksand automatically -->
    <p class="text-lead mb-8">
      Professional yoga training in Bangalore with certified instructor Sarala.
    </p>
    
    <button class="btn btn-primary">
      Get Started
    </button>
  </div>
</section>
```

### Card Component

```html
<div class="card">
  <!-- Heading uses Playfair Display -->
  <h3 class="heading-3 mb-4">
    Online Classes
  </h3>
  
  <!-- Body text uses Quicksand -->
  <p class="text-gray-600 mb-4">
    Live virtual yoga sessions from the comfort of your home.
  </p>
  
  <a href="#" class="btn btn-outline">
    Learn More
  </a>
</div>
```

### Service Card

```html
<div class="bg-white rounded-lg shadow-lg p-6">
  <!-- Uses Playfair Display automatically -->
  <h4 class="text-2xl font-bold mb-3 text-primary-600">
    Personal Training
  </h4>
  
  <!-- Uses Quicksand automatically -->
  <p class="text-gray-600 mb-4">
    One-on-one personalized yoga sessions tailored to your needs.
  </p>
  
  <ul class="space-y-2 mb-6">
    <li class="flex items-center text-gray-700">
      <span>✓ Customized programs</span>
    </li>
    <li class="flex items-center text-gray-700">
      <span>✓ Flexible scheduling</span>
    </li>
  </ul>
</div>
```

---

## 🔧 Mixing Fonts (Advanced)

### Override Default Fonts

```html
<!-- Make body text use Playfair Display -->
<p class="font-serif">
  This paragraph uses the heading font (Playfair Display)
</p>

<!-- Make heading use Quicksand -->
<h2 class="font-sans">
  This heading uses the body font (Quicksand)
</h2>
```

### Responsive Font Styles

```html
<!-- Change font on different screen sizes -->
<div class="font-sans md:font-serif lg:font-sans">
  Responsive font switching
</div>
```

---

## 📊 Font Loading

The fonts are loaded from Google Fonts in all HTML files:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Available Font Weights

**Playfair Display (Headings):**
- 400 (Normal)
- 600 (Semibold)
- 700 (Bold)

**Quicksand (Body):**
- 400 (Normal)
- 500 (Medium)
- 600 (Semibold)
- 700 (Bold)

---

## ✨ Best Practices

### ✅ Do's

1. **Let it work automatically** - Just use `<h1>`, `<p>`, etc.
2. **Use semantic HTML** - Proper heading hierarchy
3. **Use pre-built classes** - `heading-1`, `heading-2`, `text-lead`
4. **Combine with colors** - `text-primary-600`, `text-gray-900`
5. **Mix with utilities** - `text-center`, `uppercase`, etc.

### ❌ Don'ts

1. Don't override fonts unless necessary
2. Don't skip heading levels (h1 → h3)
3. Don't use too many font weight variations
4. Don't mix serif/sans arbitrarily

---

## 🎨 Typography Hierarchy Example

```html
<!-- Main Page Title -->
<h1 class="heading-1 text-center mb-6">
  Sarala Yoga
</h1>

<!-- Section Heading -->
<h2 class="heading-2 mb-4">
  Our Services
</h2>

<!-- Subsection -->
<h3 class="heading-3 mb-3">
  Online Classes
</h3>

<!-- Lead Paragraph -->
<p class="text-lead mb-4">
  Transform your life through professional yoga training.
</p>

<!-- Regular Paragraph -->
<p class="text-base mb-4">
  We offer a wide range of yoga classes suitable for all levels.
</p>

<!-- Small Text -->
<p class="text-sm text-muted">
  *All classes conducted by certified instructor
</p>
```

---

## 🚀 Quick Reference

### Most Common Usage

```html
<!-- Just write normal HTML -->
<h1>Heading 1</h1>          → Playfair Display, bold
<h2>Heading 2</h2>          → Playfair Display, bold
<h3>Heading 3</h3>          → Playfair Display, bold
<p>Paragraph</p>            → Quicksand, normal
<div>Any content</div>      → Quicksand, normal
<span>Inline text</span>    → Quicksand, normal
```

### With Custom Classes

```html
<h1 class="heading-1">      → Playfair, 4xl-6xl, bold
<h2 class="heading-2">      → Playfair, 3xl-5xl, bold
<h3 class="heading-3">      → Playfair, 2xl-3xl, semibold
<p class="text-lead">       → Quicksand, lg-xl, gray-600
```

---

## 📝 Summary

✅ **Playfair Display** → All headings (h1-h6) automatically  
✅ **Quicksand** → All body text automatically  
✅ **No classes needed** → Works out of the box  
✅ **Override when needed** → Use `font-serif` or `font-sans`  
✅ **Pre-built components** → `heading-1`, `text-lead`, etc.

**Your fonts are ready to use! Just write HTML and they'll work perfectly.** 🎉

---

**Last Updated**: October 16, 2025  
**Tailwind Version**: 3.3.5

