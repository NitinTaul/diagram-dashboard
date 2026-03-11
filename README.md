# DiagramOS — Circuit Analysis Dashboard

A React-based dashboard for uploading P&ID / circuit diagrams and viewing detected components.

## Features
- **Upload** — Drag & drop or click to upload PNG/JPG/WEBP diagram images
- **Diagram Viewer** — Zoom In / Out / Reset with live CSS transform
- **Component List** — Color-coded sidebar with detected components (mock API)
- **Selection Highlight** — Click any component to highlight it in the viewer with a gold glow
- **Responsive** — Two-column on desktop/tablet, stacked on mobile

## Tech Stack
- React 18 (functional components + hooks)
- Vite
- CSS Modules
- react-dropzone
- lucide-react

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```

## Folder Structure
```
src/
├── components/
│   ├── UploadBox/
│   │   ├── UploadBox.jsx
│   │   └── UploadBox.module.css
│   ├── DiagramViewer/
│   │   ├── DiagramViewer.jsx
│   │   └── DiagramViewer.module.css
│   └── ComponentList/
│       ├── ComponentList.jsx
│       └── ComponentList.module.css
├── pages/
│   └── Dashboard/
│       ├── Dashboard.jsx
│       └── Dashboard.module.css
├── services/
│   └── api.js
├── index.css
└── main.jsx
```

## Mock API
Components are loaded from `src/services/api.js` with a simulated 400ms delay.
Replace `fetchComponents()` with a real API call when ready.
