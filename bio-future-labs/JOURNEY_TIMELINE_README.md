# Journey Timeline Component

A modern, interactive timeline component for displaying BioLabMate's journey from 2023 to 2025.

## Features

- **Interactive Year Filter**: Sticky year pills (2023, 2024, 2025) that smoothly scroll to each year
- **Responsive Design**: Alternating cards on desktop, single column on mobile
- **Smooth Animations**: Framer Motion animations with reduced motion support
- **Expandable Content**: "Read more / Show less" functionality for descriptions
- **Accessibility**: Full keyboard navigation and ARIA labels
- **Modern Styling**: Tailwind CSS with backdrop blur and gradient effects

## Files Created

1. **`src/content/journeyData.ts`** - Journey data with TypeScript types
2. **`src/components/JourneyTimeline.tsx`** - Main timeline component
3. **Updated `src/pages/About.tsx`** - Integrated the timeline component

## Usage

```tsx
import JourneyTimeline from '@/components/JourneyTimeline';

// Basic usage
<JourneyTimeline />

// With custom ID and className
<JourneyTimeline id="journey" className="mt-16" />
```

## Props

- `id?: string` - Section ID (default: "journey")
- `className?: string` - Additional CSS classes

## Data Structure

The timeline uses the following data structure:

```typescript
export type JourneyItem = {
  title: string;
  description: string;
  tags?: string[];
  icon?: string; // lucide icon name
};

export type JourneyYear = {
  year: number;
  items: JourneyItem[];
};
```

## Icons Used

- Trophy - Awards and recognition
- FlaskConical - Research and development
- Rocket - Acceleration and growth
- ShieldCheck - Programs and achievements
- Users - Collaborations and partnerships
- Globe - International programs
- Landmark - Government and policy

## Accessibility Features

- Keyboard navigation for year pills (Enter/Space to activate)
- ARIA labels for expandable content
- Reduced motion support
- Semantic HTML structure
- Sufficient color contrast

## Responsive Behavior

- **Desktop**: Alternating left/right cards with center timeline
- **Mobile**: Single column layout with side timeline
- **Tablet**: Responsive grid that adapts to screen size

## Dependencies

- React 18+
- Framer Motion
- Lucide React
- Tailwind CSS

## Installation

The component requires Framer Motion to be installed:

```bash
npm install framer-motion
```

## Customization

You can customize the timeline by:

1. Modifying the data in `src/content/journeyData.ts`
2. Adjusting colors in the Tailwind classes
3. Changing animation parameters in the Framer Motion variants
4. Adding new icons to the `iconMap` object

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Reduced motion preferences respected
- Progressive enhancement for older browsers





















