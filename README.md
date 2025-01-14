# Interactive Travel Map

An interactive world map visualization that displays IShowSpeed's travel history, upcoming visits, and related content for each country. The map features a dynamic visualization system with both standard and chronological viewing modes. Built with Next.js, TypeScript, React, Tailwind.

## Features

### Interactive Map
- **Country Highlighting**: Countries are color-coded based on their status:
  - 🔵 Blue: Home country (United States)
  - 🟢 Green: Visited countries
  - 🟠 Orange: Confirmed future visits
  - ⚪ Gray: Unvisited countries

### View Modes
- **Standard View**: Shows countries based on visit status
- **Chronological View**: Color codes countries by year of visit:
  - 2022: #FF6B6B
  - 2023: #4ECDC4
  - 2024: #FFD166
  - 2025: #6A4C93

### Interactive Features
- **Hover Tooltips**: Display country information on hover
- **Click Interaction**: Click on a country to pin the tooltip
- **Video Links**: Direct links to IShowSpeed's live stream for visited countries
- **Visit Dates**: Shows both past visit dates and scheduled future visits
- **Statistics Overlay**: Shows total number of countries visited
- **Zoomable Interface**: Pan and zoom functionality for detailed exploration

## Technical Stack

- **Framework**: React
- **Map Library**: react-simple-maps
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Types**: TypeScript

## Project Structure

```
src/
├── components/
│   ├── interactive-map.tsx    # Main map component
│   ├── tooltip.tsx           # Country information tooltip
│   ├── legend.tsx           # Map legend component
│   ├── loading.tsx          # Loading state component
│   ├── stats-overlay.tsx    # Statistics display
│   └── view-toggle.tsx      # View mode toggle
├── types/
│   └── map-types.ts        # TypeScript interfaces
└── data/
    └── countries.ts        # Country data configuration
```

## Component Details

### InteractiveMap
The main component that renders the world map and manages interactions. Features:
- Zoom and pan controls
- Country selection
- View mode switching
- Tooltip state management

### Tooltip
Displays country information with:
- Visit status
- Country name
- Visit date
- Video link (for visited countries)
- Interactive close button

### Legend
Shows color coding information for:
- Standard view: visit status colors
- Chronological view: year-based colors

## Data Structure

Countries are defined using the following interface:

```typescript
interface CountryData {
  id: string;          // Country code (e.g., "US")
  name: string;        // Country name
  visited: boolean;    // Visit status
  confirmedVisit?: boolean; // Future visit status
  videoUrl?: string;   // Travel video URL
  visitDate?: string;  // Visit/planned visit date
  views?: number;      // Video view count
}
```

## Setup and Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Required Dependencies

- react
- react-simple-maps
- framer-motion
- lucide-react
- tailwindcss
- date-fns

## Browser Support

The application is compatible with modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- SVG manipulation
- Modern DOM APIs

## Performance Considerations

- SVG-based rendering for smooth scaling
- Optimized hover and click handlers
- Efficient state management for tooltips
- Responsive design for all screen sizes

## Accessibility

The map includes various accessibility features:
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color schemes
- Screen reader friendly structure
