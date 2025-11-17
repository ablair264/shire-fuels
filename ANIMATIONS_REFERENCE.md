# Shire Fuels - Animation & Component Reference

## Animations Used

### 1. Hero Slider Transitions

**Slide Content Animation**:
```jsx
// Each slide animates in from right with opacity fade
className={`transition-all duration-700 ${
  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
}`}
```

**Text Stagger Effect**:
- Title: No delay
- Subtitle: 100ms delay
- Description: 200ms delay
- CTA Button: 300ms delay

### 2. Scroll-Triggered Animations

Using Intersection Observer:
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    },
    { threshold: 0.1 }
  );
  // ...
}, []);
```

Sections with scroll animations:
- Services Grid (#animate-services)
- Delivery Info (#animate-delivery)
- Emergency Section (#animate-emergency)
- About Section (#animate-about)

### 3. Hover Animations

**Service Cards**:
- Lift effect: `-translate-y-2`
- Icon rotation: `rotate-3`
- Icon scale: `scale-110`
- Shadow enhancement

**Buttons**:
- Scale: `hover:scale-105`
- Arrow translation: `group-hover:translate-x-1`

### 4. Background Animations

**Grid Pattern Movement**:
```css
@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}
```

**Service Area Badge Fade-In**:
```jsx
style={{
  animation: `fadeIn 0.5s ease-out ${index * 50}ms both`
}}
```

### 5. Pulsing Effects

Emergency service icon:
```jsx
className="animate-pulse"
```

## DaisyUI Components Used

### Navigation Components

**1. Navbar**
```jsx
<div className="navbar bg-slate-900/95 backdrop-blur-md">
  <div className="navbar-start">...</div>
  <div className="navbar-center">...</div>
  <div className="navbar-end">...</div>
</div>
```

**2. Dropdown Menu**
```jsx
<div className="dropdown">
  <button className="btn btn-ghost">...</button>
  <ul className="menu menu-sm dropdown-content">...</ul>
</div>
```

### Data Display Components

**3. Cards**
```jsx
<div className="card bg-slate-800/50">
  <div className="card-body">
    <h3 className="card-title">...</h3>
    <p>...</p>
    <div className="card-actions">...</div>
  </div>
</div>
```

**4. Badge**
```jsx
<div className="badge badge-lg bg-gradient-to-r from-amber-500 to-orange-500">
  24/7 EMERGENCY
</div>
```

**5. Stats**
```jsx
<div className="stats stats-vertical lg:stats-horizontal">
  <div className="stat">
    <div className="stat-title">Service</div>
    <div className="stat-value">24/7</div>
    <div className="stat-desc">Always Available</div>
  </div>
</div>
```

### Form Components

**6. Input**
```jsx
<input 
  type="text" 
  className="input input-bordered bg-slate-700/50"
  placeholder="Name"
/>
```

**7. Select**
```jsx
<select className="select select-bordered">
  <option>Please Select</option>
  <option>Gas Oil</option>
</select>
```

**8. Join (Input Group)**
```jsx
<div className="join w-full">
  <input className="input join-item" />
  <button className="btn join-item">Check</button>
</div>
```

### Action Components

**9. Button Variants**
```jsx
// Gradient button
<button className="btn bg-gradient-to-r from-emerald-500 to-cyan-500">

// Ghost button
<button className="btn btn-ghost">

// Circle button
<button className="btn btn-circle">
```

## Custom Tailwind Classes

### Gradient Backgrounds
```jsx
// Primary service gradient
bg-gradient-to-br from-emerald-500 to-cyan-500

// Warning/emergency gradient
bg-gradient-to-r from-amber-500 to-orange-500

// Dark background gradients
bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
```

### Glassmorphism Effects
```jsx
className="bg-slate-800/80 backdrop-blur-sm border border-emerald-500/30"
```

### Shadow Effects
```jsx
// Colored shadows for glow effect
shadow-2xl shadow-emerald-500/50

// Hover shadow enhancement
hover:shadow-emerald-500/70
```

### Border Gradients
```jsx
border-2 border-amber-500/50
```

## Responsive Breakpoints

All responsive classes follow Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Common patterns:
```jsx
// Mobile first, then desktop
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Hide/show based on screen size
<div className="hidden lg:block">
<div className="lg:hidden">
```

## Animation Timing Functions

- **Slide transitions**: `duration-700` (700ms)
- **Hover effects**: `duration-300` (300ms)
- **Scroll animations**: `duration-1000` (1000ms)
- **Stagger delays**: 50-300ms increments

## Color Opacity Modifiers

Using Tailwind's opacity syntax:
```jsx
bg-slate-900/95  // 95% opacity
border-emerald-500/30  // 30% opacity
text-gray-300  // Fixed opacity from palette
```

## Z-Index Layers

- Navigation: `z-50`
- Quote form: `z-20`
- Hero controls: `z-10`
- Background patterns: No z-index (natural stacking)

## Performance Considerations

### CSS-Only Animations
Most animations use CSS transitions and transforms for 60fps performance:
```jsx
transition-all duration-300 hover:scale-105
```

### JavaScript Animations
Only used where necessary:
- Slider auto-advance
- Intersection Observer for scroll triggers
- State-based content reveals

### Optimization Tips
1. Use `transition-transform` instead of `transition-all` when only transforming
2. Prefer `opacity` and `transform` for animations (GPU accelerated)
3. Use `will-change` sparingly and only on elements being animated
4. Intersection Observer with `threshold: 0.1` prevents excessive checks

## Accessibility Features

### Focus States
All interactive elements have visible focus states:
```jsx
focus:border-emerald-500
focus:ring-2 focus:ring-emerald-500
```

### Keyboard Navigation
- Tab through navigation links
- Enter/Space to activate buttons
- Arrow keys in dropdown menus

### ARIA Labels
```jsx
<button aria-label="Previous slide">
<input aria-required="true">
```

### Semantic HTML
- `<nav>` for navigation
- `<button>` for interactions
- `<form>` for input collection
- Proper heading hierarchy (h1 → h2 → h3)

## Browser Compatibility

### Modern Features Used
- CSS Grid
- Flexbox
- CSS Custom Properties (via Tailwind)
- Intersection Observer API
- CSS Backdrop Filter

### Fallbacks
DaisyUI provides automatic fallbacks for:
- Gradient backgrounds → solid colors
- Backdrop blur → solid background
- Grid → flexbox where appropriate

## Customization Quick Reference

### Change Primary Color
```javascript
// tailwind.config.js
'primary': '#YOUR_COLOR',
'primary-content': '#TEXT_COLOR',
```

### Change Animation Speed
```jsx
// Faster
duration-300

// Slower
duration-1000
```

### Add New Service
```javascript
{
  icon: YourIcon,
  title: "Service Name",
  description: "Description",
  link: "#link",
  color: "from-color-600 to-color-600"
}
```

### Modify Slide Timing
```javascript
// Change auto-advance interval (milliseconds)
setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
}, 5000); // Change this number
```
