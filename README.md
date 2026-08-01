# IIWC - International Indian Welfare Council

**Empowering Lives. Transforming Society.**

A modern, responsive NGO website built with React, Vite, and Tailwind CSS.

---

## 🎨 Design System

- **Primary Color**: `#0B3D91` (Deep Blue)
- **Accent Color**: `#F4A300` (Saffron)
- **Background**: `#F9FAFB` (Light Gray)
- **Design**: Clean, modern layout with rounded corners and soft shadows
- **Responsive**: Mobile-first design for all device sizes

---

## 📁 Project Structure

```
NgoWebsite/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky navigation with mobile menu
│   │   ├── Footer.jsx       # Site footer with links
│   │   ├── Card.jsx         # Content card wrapper
│   │   ├── Button.jsx       # Styled button variants
│   │   └── SectionWrapper.jsx # Page section container
│   │
│   ├── pages/               # Route pages
│   │   ├── HomePage.jsx     # Landing page with hero & stats
│   │   ├── AboutPage.jsx    # Mission, vision, objectives
│   │   ├── WhatWeDoPage.jsx # Five focus areas
│   │   ├── ProgramsPage.jsx # Program showcase grid
│   │   ├── GalleryPage.jsx  # Image gallery layout
│   │   ├── DonatePage.jsx   # Donation form UI
│   │   ├── VolunteerPage.jsx # Volunteer registration
│   │   ├── ContactPage.jsx  # Contact form & info
│   │   ├── LoginPage.jsx    # Split-screen login
│   │   ├── SignupPage.jsx   # User registration
│   │   └── AdminDashboardPage.jsx # Admin panel UI
│   │
│   ├── App.jsx              # Router configuration
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Global Tailwind styles
│
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind theme & colors
├── postcss.config.js        # PostCSS config
└── package.json             # Dependencies & scripts
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## 📄 Pages

### Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero section, focus areas, impact stats, testimonials |
| `/about` | **About** | Mission, vision, objectives |
| `/what-we-do` | **What We Do** | Education, Healthcare, Agriculture, Legal, Women Empowerment |
| `/programs` | **Programs** | Program cards grid |
| `/gallery` | **Gallery** | Image gallery layout |
| `/donate` | **Donate** | Donation amount selection & form |
| `/volunteer` | **Volunteer** | Volunteer registration form |
| `/contact` | **Contact** | Contact form with address & map placeholder |

### Auth Pages

| Route | Page | Description |
|-------|------|-------------|
| `/login` | **Login** | Professional split-screen login |
| `/signup` | **Signup** | Full registration form with role selection |
| `/admin` | **Admin Dashboard** | Sidebar layout with stats, user table, chart placeholder |

---

## 🎯 Five Focus Areas

1. **Education** - Scholarships, literacy, and digital learning
2. **Healthcare** - Health camps, preventive care, awareness
3. **Agriculture** - Farmer training, sustainable practices
4. **Legal Advisory** - Guidance and legal aid
5. **Women Empowerment** - Skill development, self-reliance

---

## 🧩 Reusable Components

### `<Button />`
```jsx
<Button variant="primary">Click Me</Button>
<Button variant="accent">Donate</Button>
<Button variant="outline">Learn More</Button>
```

### `<Card />`
```jsx
<Card className="custom-class">
  Content goes here
</Card>
```

### `<SectionWrapper />`
```jsx
<SectionWrapper title="Section Title" subtitle="Optional subtitle">
  <div>Your content</div>
</SectionWrapper>
```

### `<Navbar />` & `<Footer />`
Automatically included in public layout via `App.jsx`

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, `xl:`).

---

## 🎨 Theme Customization

Edit `tailwind.config.js` to customize colors, shadows, and spacing:

```js
theme: {
  extend: {
    colors: {
      primary: "#0B3D91",   // Deep Blue
      accent: "#F4A300",    // Saffron
      surface: "#F9FAFB",   // Light Gray
    },
  },
}
```

---

## 📌 Notes

- **No Backend**: All forms are UI-only (no submission logic)
- **Static Content**: Testimonials, stats, and programs are hardcoded
- **Placeholder Images**: Gallery uses placeholder boxes
- **Chart Placeholder**: Admin dashboard chart is a placeholder div

---

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication & authorization
- [ ] Payment gateway for donations
- [ ] Image upload for gallery
- [ ] Dynamic content management
- [ ] Email notifications
- [ ] Analytics dashboard with real charts
- [ ] Multi-language support

---

## 📝 License

This project is created for the International Indian Welfare Council (IIWC).

---

## 👥 Contributing

Want to contribute to IIWC's digital presence? Reach out to us at **support@iiwc.org**

---

**Built with ❤️ for social impact**

