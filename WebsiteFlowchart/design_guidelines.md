# Design Guidelines: LOQUOAIT AI Lead Qualification System

## Design Approach
**Reference-Based Implementation** - Exact replication of provided screenshot with dark, premium CRM aesthetic. This is a data-dense dashboard application requiring precision and consistency.

## Color System
- **Background**: Pure black (#000000) for main canvas
- **Surface/Cards**: Dark gray (#1a1a1a to #2a2a2a) with subtle elevation
- **Primary Accent**: Purple-to-pink gradient (#8B5CF6 to #EC4899) for key actions and highlights
- **Secondary Accent**: Teal/cyan (#14B8A6, #06B6D4) for widgets and data visualization
- **Text Primary**: White (#FFFFFF)
- **Text Secondary**: Gray (#9CA3AF, #6B7280)
- **Success**: Green (#10B981)
- **Warning/Alert**: Amber (#F59E0B)

## Typography
- **Primary Font**: Inter or DM Sans from Google Fonts
- **Headings**: 
  - Section titles: 18-20px, font-semibold
  - Widget titles: 14-16px, font-medium
  - Stat numbers: 24-32px, font-bold
- **Body Text**: 14px, font-normal for descriptions
- **Small Text**: 12px for labels and metadata
- **Letter Spacing**: Tight (-0.02em) for headings, normal for body

## Layout System
**Spacing**: Use Tailwind units of 2, 4, 6, 8, 12, 16 consistently
- Component padding: p-4 to p-6
- Section gaps: gap-6 to gap-8
- Page margins: 24px (p-6) on desktop, 16px (p-4) on mobile

**Grid Structure**:
- Sidebar: Fixed 240px width on desktop, collapsible on mobile
- Main content: Responsive grid using `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for widgets
- Top nav: Fixed height 64px (h-16)

## Core Components

### Top Navigation Bar
- Dark background with subtle border-bottom
- Left: Logo "LOQUOAIT" with "Powered by Aqora" subtitle
- Center: Action buttons (Update, Create, Search, Hin-Jpn, XyroAi) - pill-shaped with subtle backgrounds
- Right: User profile (avatar + name "Suyoshi R.") in rounded container

### Left Sidebar
- Fixed position, full height
- Navigation items with icons + labels
- Active state: Purple gradient background with glow effect
- Hover: Subtle gray background (#2a2a2a)
- Bottom: "GET PRIME" button with gradient background
- Icon size: 20px, spacing between items: gap-1

### Widget Cards
**Standard Card Structure**:
- Background: #1a1a1a with rounded-xl borders (rounded-2xl)
- Padding: p-6
- Border: 1px solid rgba(255,255,255,0.1)
- Hover: Subtle lift with shadow-lg and border glow

**AI Based Summary Card**:
- Full-width at top of main content
- Contains multiple stat badges in horizontal layout
- Stats display: Large number + small label below
- Gradient backgrounds on individual stat containers

**Actual Details & Pie Chart**:
- Split layout: Chart on left, icon grid on right
- Icons: Calendar, Meet, Gamify, CRM - each with teal circular backgrounds
- Pie chart: Vibrant gradients (purple, pink, teal, orange)

**Lead SCORE Widget**:
- Circular progress indicator (stroke-width: 8)
- Large percentage in center (73%)
- Gradient stroke from purple to pink
- Label below with small text

### Bottom Action Bar
- Fixed to bottom or within container
- Three distinct sections: UPI (BHIM), Access & Controls, WhatsApp Business
- Each section: Icon + label in rounded containers with borders
- Background: Slightly lighter than main (#2a2a2a)

## Interactive Elements

### Buttons
- **Primary**: Gradient background (purple-to-pink), white text, rounded-lg, px-6 py-3
- **Secondary**: Transparent with border, hover fills with subtle gradient
- **Icon Buttons**: Circular, 40px diameter, centered icon
- All buttons: transition-all duration-200, hover:scale-105

### Dropdowns & Selects
- Dark background matching cards
- Border: 1px solid rgba(255,255,255,0.1)
- Dropdown menu: Elevated with shadow-xl, same dark theme

### Progress Indicators
- Circular: Gradient stroke, animated
- Linear: Gradient fill, rounded ends
- Always show percentage or completion state

## Data Visualization
- **Pie Charts**: Vibrant gradients, no traditional colors
- **Progress Rings**: Large stroke width, gradient fills
- **Icon Grids**: Consistent sizing (32-40px), teal circular backgrounds
- **Stats Display**: Large numbers with small labels, gradient containers

## Gamification Elements
- Badge indicators: Small circular icons with glow effects
- Progress bars: Animated fills with gradient
- Achievement notifications: Slide-in from right with gradient borders
- Point indicators: Bold numbers with sparkle effects

## Images
**No hero image required** - This is a dashboard application. Use:
- User avatars: 40px circular in nav, 32px in lists
- Company logos: 24px in integration sections
- Icon illustrations: For empty states and onboarding

## Responsive Behavior
- **Desktop (>1024px)**: Full sidebar + 3-column widget grid
- **Tablet (768-1024px)**: Collapsible sidebar + 2-column grid
- **Mobile (<768px)**: Hidden sidebar (hamburger menu) + single column

## Animations
- Page transitions: Fade + slight slide (100ms)
- Widget hover: Scale 1.02 + shadow enhancement
- Progress rings: Smooth fill animation (500ms)
- Button interactions: Scale on hover (duration-200)
- Keep animations subtle and performance-optimized

## Accessibility
- All interactive elements: min-height 44px for touch targets
- Color contrast: Ensure text meets WCAG AA standards against dark backgrounds
- Focus states: Visible purple ring (ring-2 ring-purple-500)
- Screen reader labels for all icon-only buttons