# Shire Fuels Landing Page - Quick Start Guide

Get your landing page running in 3 minutes!

## ⚡ Fast Setup

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

This installs React, Vite, Tailwind CSS, and DaisyUI.

### Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 3: Build for Production (1 min)

```bash
npm run build
```

Your production-ready site will be in the `dist/` folder.

## 🎨 Quick Customization

### Change Main Headline

**File:** `src/components/Hero.jsx`

```jsx
<h1 className="...">
  Delivering Where <br />Others Can't  {/* ← Edit this */}
</h1>
```

### Update Phone Number

**File:** `src/components/Header.jsx` and `Footer.jsx`

Search for `01594 738139` and replace with your number.

### Modify Services

**File:** `src/components/Services.jsx`

Edit the `services` array:

```jsx
const services = [
  {
    title: "Your Service",
    description: "Your description",
    image: "https://...",
    features: ["Feature 1", "Feature 2"]
  }
]
```

### Add Customer Reviews

**File:** `src/components/Testimonials.jsx`

Add to the `testimonials` array:

```jsx
{
  name: "John Smith",
  location: "Gloucester",
  rating: 5,
  text: "Great service!",
  date: "1 week ago"
}
```

## 🎯 Brand Colors Reference

```javascript
Green:      #4D973C  (Logo, accents)
Light Blue: #3082B4  (CTA buttons)
Dark Blue:  #264B8C  (Section backgrounds)
Cream:      #F3F1BB  (Subtle accents)
White:      #FFFFFF  (Main background)
```

## 📱 Test Responsive Design

- Desktop: Default view
- Tablet: Resize browser to 768px
- Mobile: Resize browser to 375px

Or use browser DevTools (F12 → Toggle Device Toolbar)

## 🚀 Deploy Instantly

### Netlify (Easiest)

1. Drag `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Done! Your site is live.

### Vercel

```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Push code to GitHub
2. Enable Pages in repo settings
3. Set source to `gh-pages` branch

## ✅ Quick Checklist

Before going live:

- [ ] Updated phone number in Header and Footer
- [ ] Changed email address to info@shirefuels.co.uk
- [ ] Added real customer testimonials
- [ ] Updated service area postcodes
- [ ] Replaced placeholder images (if any)
- [ ] Tested all contact forms
- [ ] Verified mobile responsiveness
- [ ] Checked all links work
- [ ] Added Google Analytics (optional)
- [ ] Set up contact form backend (optional)

## 🆘 Common Issues

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill

# Or use different port
npm run dev -- --port 3000
```

### Tailwind Classes Not Working

1. Check `tailwind.config.js` content paths
2. Restart dev server
3. Clear browser cache

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Need More Help?

- **Full Documentation:** README.md
- **Component Details:** See `/src/components/` folder
- **Design System:** Check DaisyUI docs at daisyui.com

## 🎉 You're Ready!

Your landing page includes:

✅ SEO-optimized structure  
✅ Mobile-responsive design  
✅ Conversion-focused CTAs  
✅ Professional aesthetics  
✅ Accessible components  
✅ Fast performance  

**Now make it yours and start converting visitors into customers!**
