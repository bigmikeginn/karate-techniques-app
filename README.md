# Karate & BJJ Techniques App

A modern, lightweight web application for exploring Karate and Brazilian Jiu-Jitsu techniques. Built with Next.js, TypeScript, and Tailwind CSS as a student resource for the Jitsu-Do club.

## ✨ Features

- **Separate Karate and BJJ libraries** selected by a top-level toggle
- **14 Karate categories** sourced from the existing CSV workflow
- **9 BJJ categories** focused on widespread fundamentals and common classroom/competition techniques
- **Modern UI** with dark/light theme support
- **Fast Loading** optimized for performance
- **Responsive Design** works on all devices

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform (recommended)

## 📁 Project Structure

```
src/
├── app/
│   ├── category/[slug]/      # Dynamic category pages
│   ├── technique/[slug]/     # Dynamic technique pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── data/
│   ├── techniques.json      # Karate technique data
│   ├── bjj-techniques.json  # BJJ technique data
│   └── disciplines.ts       # Karate/BJJ registry
├── types/
│   └── technique.ts         # TypeScript definitions
└── lib/
    └── utils.ts            # Utility functions
```

## 🎯 Current Status

✅ **Phase 1 Complete** - Basic Framework
- Project structure set up
- CSV data converted to JSON
- Home page with shared Karate/BJJ browsing UI
- Dynamic category pages
- Dynamic technique detail pages
- Responsive design
- Performance optimized

✅ **Phase 2 Started** - Karate/BJJ split
- Karate and BJJ are separate libraries
- Discipline toggle added to the main screen
- BJJ starter library added with mainstream categories and techniques

📋 **Next Steps**
- [ ] Implement image/video uploads
- [ ] Expand technique descriptions
- [ ] User authentication
- [ ] Favorites/bookmarks
- [ ] Progress tracking
- [ ] Mobile app version

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to http://localhost:3000

## 📊 Data Source

Karate technique data is sourced from `Secret Project - Sheet1.csv` with:
- 14 categories
- 265+ techniques
- Primary/Secondary/Tertiary classification

BJJ starter data lives in `src/data/bjj-techniques.json`. It uses the same category and technique shape as Karate, so both sections operate through the same layout, search, category filters, cards, and detail modal.

## 🎨 Customization

- Update `src/data/techniques.json` to modify Karate data
- Update `src/data/bjj-techniques.json` to modify BJJ data
- Add images to `public/images/` directory
- Customize styles in Tailwind configuration
- Modify components in `src/app/`

## 📱 Performance

- Static generation for fast loading
- Image optimization with Next.js
- Code splitting for optimal bundles
- Minimal JavaScript runtime

## 🔧 Development

To add new techniques, update the CSV file and run:
```bash
node scripts/convert-csv-to-json.js
```

---

Built for Karate and BJJ students.
