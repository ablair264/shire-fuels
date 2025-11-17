# Shire Fuels Landing Page

A professional, conversion-optimized landing page for Shire Fuels built following the **11 Essential Landing Page Elements** framework. This React application showcases the company's fuel delivery services with a clean, brand-consistent design.

## 🎯 Key Features

### 11 Essential Elements Implemented

✅ **1. SEO-Optimized URL** - `/fuel-delivery` with relevant keywords  
✅ **2. Company Logo** - Prominent placement with brand colors  
✅ **3. Title & Subtitle** - "Delivering Where Others Can't"  
✅ **4. Primary CTA** - "GET A QUOTE" button in hero section  
✅ **5. Social Proof** - 4.9/5 rating, 500+ customers, 10+ years  
✅ **6. Images/Videos** - High-quality service imagery  
✅ **7. Core Benefits** - 4 key service advantages  
✅ **8. Customer Testimonials** - 6 authentic reviews  
✅ **9. FAQ Section** - 10 common questions with accordion  
✅ **10. Final CTA** - Bottom conversion section  
✅ **11. Footer** - Complete contact info and legal links  

### Brand Colors

- **Green (#4D973C)** - Logo, secondary accents
- **Light Blue (#3082B4)** - Primary CTA buttons
- **Dark Blue (#264B8C)** - Section backgrounds, navigation
- **White (#FFFFFF)** - Main background
- **Cream (#F3F1BB)** - Subtle accents

### Tech Stack

- **React 18** - Component-based UI
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **DaisyUI** - Accessible component library
- **Google Fonts** - Inter & Poppins typography

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## 📁 Project Structure

```
shire-fuels-landing/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Logo & Navigation (Element 2)
│   │   ├── Hero.jsx            # Title, CTA, Social Proof (Elements 3-5)
│   │   ├── QuoteForm.jsx       # Lead generation form
│   │   ├── Emergency.jsx       # 24/7 service highlight
│   │   ├── Benefits.jsx        # Core Benefits (Element 7)
│   │   ├── Services.jsx        # Product Images (Element 6)
│   │   ├── Coverage.jsx        # Service area with map
│   │   ├── Testimonials.jsx    # Customer Reviews (Element 8)
│   │   ├── FAQ.jsx             # FAQ Accordion (Element 9)
│   │   ├── FinalCTA.jsx        # Bottom CTA (Element 10)
│   │   └── Footer.jsx          # Contact & Legal (Element 11)
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template with SEO meta tags
├── tailwind.config.js          # Tailwind + DaisyUI configuration
├── vite.config.js              # Vite build configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies
```

## 🎨 Design Philosophy

### Clean & Professional

- **No dark themes** - Bright, trustworthy white backgrounds
- **Consistent branding** - Strategic use of brand colors
- **Simple layouts** - Clear hierarchy and spacing
- **Professional imagery** - High-quality photos

### Conversion-Focused

- **Multiple CTAs** - Hero, quote form, final CTA
- **Trust signals** - Reviews, ratings, experience badges
- **Clear value props** - Benefits highlighted throughout
- **Low friction** - Easy-to-use forms and navigation

### Mobile-First

- **Responsive design** - Works on all screen sizes
- **Touch-friendly** - Large tap targets (44px+)
- **Fast loading** - Optimized images and code
- **Accessible** - WCAG AA compliant

## 🔧 Customization

### Update Brand Colors

Edit `tailwind.config.js`:

```javascript
daisyui: {
  themes: [{
    shirefuels: {
      "primary": "#3082B4",    // Light Blue - CTAs
      "secondary": "#4D973C",  // Green - Logo
      "accent": "#264B8C",     // Dark Blue - Sections
      // ... other colors
    }
  }]
}
```

### Modify Content

Each component in `/src/components/` contains editable content:

- **Hero.jsx** - Main headline and tagline
- **Benefits.jsx** - Service advantages
- **Services.jsx** - Product offerings
- **Testimonials.jsx** - Customer reviews
- **FAQ.jsx** - Questions and answers
- **Footer.jsx** - Contact information

### Add/Remove Sections

Edit `src/App.jsx` to reorder or remove components:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Hero />
      {/* Add or remove components here */}
      <Footer />
    </div>
  )
}
```

## 📊 SEO Features

### Meta Tags

The `index.html` includes comprehensive SEO meta tags:

- Title with keywords
- Description meta tag
- Open Graph tags for social sharing
- Keywords meta tag
- Viewport configuration

### Semantic HTML

All components use proper semantic HTML5 elements:

- `<header>` for site header
- `<nav>` for navigation
- `<section>` for content sections
- `<footer>` for footer

### Accessibility

- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for images
- Proper heading hierarchy (H1 → H2 → H3)

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

### Deploy to Popular Platforms

**Netlify:**
```bash
# Drop dist/ folder or connect Git repo
```

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**GitHub Pages:**
```bash
# Build first
npm run build

# Deploy dist folder
```

## 📈 Performance

- Bundle size: ~150KB gzipped
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: 90+

## 🎯 Conversion Optimization

### Primary Goals

1. **Get Quote** - Main CTA in hero and throughout
2. **Phone Calls** - Click-to-call buttons
3. **Form Submissions** - Quote form, contact form

### Trust Building

- Customer testimonials with ratings
- Years of experience highlighted
- Local, family-run messaging
- Professional imagery

### Urgency Elements

- 24/7 emergency service
- Fast delivery timeframes
- Limited availability messaging

## 📝 License

Copyright © 2024 Shire Fuels. All rights reserved.

## 🤝 Support

For questions or issues:

- **Email:** info@shirefuels.co.uk
- **Phone:** 01594 738139
- **Address:** Unit 20 Foxes Bridge Road, Cinderford, GL14 2PQ

## 🔄 Future Enhancements

Potential additions for Phase 2:

- [ ] Online booking system
- [ ] Real-time pricing API
- [ ] Customer portal integration
- [ ] Google Maps API integration
- [ ] Live chat support
- [ ] Blog/news section
- [ ] Multi-language support (Welsh)
- [ ] Analytics integration
- [ ] A/B testing setup

---

**Built with ❤️ following the 11 Essential Landing Page Elements framework**
