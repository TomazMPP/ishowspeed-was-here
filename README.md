# IShowSpeed World Tour Map

An advanced interactive world map visualization tracking IShowSpeed's global travels with comprehensive visit data, multiple viewing modes, and rich statistical insights. Built with Next.js, TypeScript, React, and Tailwind CSS.

## 🌍 Features

### **Multiple View Modes**
The map offers three distinct viewing perspectives:

- **🕒 Standard View**: Traditional status-based visualization
  - 🔵 Blue: Home country (United States)
  - 🟢 Green: Visited countries
  - 🟠 Orange: Confirmed future visits
  - ⚪ Gray: Unvisited countries
  - 🟢/🟠 Striped: Visited countries with planned micro-state visits

- **📅 Chronological View**: Time-based color coding by visit year
  - 2022: #FF6B6B (Red)
  - 2023: #4ECDC4 (Teal)
  - 2024: #FFD166 (Yellow)
  - 2025: #6A4C93 (Purple)

- **👥 Multiple Visits View**: Visit frequency visualization
  - 🟢 Green: Single visit
  - 🟡 Yellow: Two visits
  - 🔴 Red: Three or more visits

### **Advanced Micro-States Support**
Sophisticated handling of micro-states and special territories:
- **Pattern Recognition**: Visited countries with planned micro-state visits display diagonal orange stripes
- **Supported Combinations**:
  - 🇪🇸 Spain → 🇦🇩 Andorra & 🇬🇮 Gibraltar
  - 🇮🇹 Italy → 🇻🇦 Vatican & 🇸🇲 San Marino
  - 🇫🇷 France → 🇲🇨 Monaco
  - 🇩🇪 Germany → 🇱🇮 Liechtenstein
  - 🇬🇧 United Kingdom → 🇫🇴 Faroe Islands

### **Interactive Features**
- **Dynamic Tooltips**: Hover and click interactions with visit details
- **Video Integration**: Direct links to IShowSpeed's travel videos
- **Statistics Overlay**: Real-time visit statistics by year and frequency
- **Help System**: Comprehensive built-in user guide
- **Zoom & Pan**: Full map navigation with zoom controls (max 5x)
- **Responsive Design**: Optimized for all screen sizes

### **Rich Data Structure**
- **Multiple Visits**: Support for countries visited multiple times
- **Video Collections**: Arrays of video URLs for multiple visits
- **Visit Tracking**: Detailed visit dates and view counts
- **Custom Labels**: Special annotations for specific visits

## 🛠 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS with custom animations
- **Map Rendering**: react-simple-maps with SVG optimization
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Date Handling**: date-fns

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx               # Main application page
│   ├── globals.css            # Global styles and Tailwind
│   └── [favicons & images]    # App icons and branding
├── components/
│   ├── interactive-map.tsx    # Core map component (462 lines)
│   ├── tooltip.tsx           # Advanced tooltip system (722 lines)
│   ├── help-modal.tsx        # User guide modal (165 lines)
│   ├── stats-overlay.tsx     # Statistics display (123 lines)
│   ├── view-toggle.tsx       # View mode switcher (39 lines)
│   ├── help-button.tsx       # Help trigger button (31 lines)
│   ├── legend.tsx           # Map legend component (114 lines)
│   └── loading.tsx          # Loading state (12 lines)
├── types/
│   └── map-types.ts         # TypeScript interfaces
├── data/
│   └── countries.ts         # Country data (605 lines)
├── lib/
│   └── country-utils.ts     # Utility functions
└── Configuration files
```

## 🎯 Core Components

### **InteractiveMap** (462 lines)
The heart of the application featuring:
- Three view mode implementations with sophisticated color logic
- Country name mapping for GeoJSON compatibility
- Advanced event handling for hover, click, and navigation
- Pattern definitions for micro-state visualization
- Comprehensive stroke and interaction styling

### **Tooltip System** (722 lines)
Advanced tooltip implementation with:
- Hover and pinned tooltip states
- Video embedding and playback
- Visit history and statistics
- Responsive positioning
- Rich content formatting

### **Help Modal** (165 lines)
Comprehensive user guide covering:
- View mode explanations with visual examples
- Micro-state handling documentation
- Interaction instructions
- Important notes about visit tracking criteria
- Territorial dispute acknowledgments

### **Statistics Overlay** (123 lines)
Real-time statistics display showing:
- Total countries visited
- Year-by-year visit breakdowns (2022-2025)
- Visit frequency statistics
- Multiple visit tracking

## 📊 Data Architecture

```typescript
interface CountryData {
  id: string;                    // ISO Alpha-2 code
  name: string;                  // Display name
  visited: boolean;              // Visit status
  confirmedVisit?: boolean;      // Future visit confirmation
  videoUrl?: string | string[]; // Video link(s)
  visitDate?: string | string[]; // Visit date(s)
  views?: number | number[];     // Video view counts
  visitCount?: number;           // Manual visit count override
  customLabels?: string[];       // Special annotations
}
```

## 🚀 Development

### **Installation**
```bash
npm install
# or
yarn install
```

### **Development Server**
```bash
npm run dev
# or
yarn dev
```

### **Build & Deploy**
```bash
npm run build
npm run start
```

## 🌐 Browser Support

Optimized for modern browsers supporting:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- SVG manipulation and patterns
- Modern DOM APIs
- Touch events for mobile interaction

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Color schemes optimized for visibility
- **Focus Management**: Proper focus handling for interactions
- **Semantic HTML**: Structured markup for assistive technologies

## 🎨 Performance Optimizations

- **SVG Rendering**: Vector-based graphics for infinite scalability
- **Event Optimization**: Efficient hover and click handlers
- **State Management**: Optimized React state for smooth interactions
- **Lazy Loading**: Efficient component and data loading
- **Memory Management**: Proper cleanup of event listeners

## 📝 Data Accuracy & Methodology

### **Visit Tracking Criteria**
- Only streams/videos where the **primary objective was country exploration**
- Excludes visits for events, collaborations, or non-exploration purposes
- Based on publicly available video content and stream archives

### **Territorial Considerations**
- Follows internationally recognized borders and naming conventions
- Handles disputed territories according to GeoJSON standards
- Special provisions for micro-states within larger countries

## 🎯 Recent Updates
#### **📅 25+ Scheduled Countries Added**
- All countries Speed has confirmed for future visits (official dates TBA)
#### 🎨 Visual Micro-States System
- Visited countries now display diagonal orange stripes when they contain planned micro-state visits
#### 🔍 Enhanced Special Tooltips 
- Click on striped countries to see detailed breakdowns of main country + planned micro-territories
#### ✈️ New Visit Amounts Mode
- Easily track how many times each country has been visited
#### 🗺️ Updated Visited Countries
- All recent trips added and map fully refreshed
#### 🔍 Improved Tooltips
- Cleaner, clearer info when hovering over countries
#### ❓ New Help Button
- Quick guide explaining how the site and features work

## 👨‍💻 Created by [Tomaz](https://www.tomazpont.es)

