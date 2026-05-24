# 🥋 Karate Techniques App

A modern, lightweight web application for exploring and learning karate techniques. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **14 Categories** of karate techniques (Stances, Blocks, Punches, Kicks, etc.)
- **265+ Techniques** with detailed organization
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
│   └── techniques.json      # All technique data
├── types/
│   └── technique.ts         # TypeScript definitions
└── lib/
    └── utils.ts            # Utility functions
```

## 🎯 Current Status

✅ **Phase 1 Complete** - Basic Framework
- Project structure set up
- CSV data converted to JSON
- Home page with category grid
- Dynamic category pages
- Dynamic technique detail pages
- Responsive design
- Performance optimized

📋 **Next Steps**
- [ ] Add search functionality
- [ ] Implement image/video uploads
- [ ] Add technique descriptions
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

Technique data is sourced from `Secret Project - Sheet1.csv` with:
- 14 categories
- 265+ techniques
- Primary/Secondary/Tertiary classification

## 🎨 Customization

- Update `src/data/techniques.json` to modify technique data
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

Built with ❤️ for karate practitioners and martial arts enthusiasts.