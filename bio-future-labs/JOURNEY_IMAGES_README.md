# Journey Timeline Images

## Overview
The Journey Timeline component now supports alternating images that display opposite to each card on desktop and above each card on mobile.

## Image Requirements

### File Location
Place your images in: `src/assets/`

### File Naming
Images must be named sequentially from top to bottom:
- `1.jpg` - First visible item (2023, first item)
- `2.jpg` - Second visible item (2023, second item)
- `3.jpg` - Third visible item (2023, third item)
- `4.jpg` - Fourth visible item (2024, first item)
- `5.jpg` - Fifth visible item (2024, second item)
- `6.jpg` - Sixth visible item (2024, third item)
- `7.jpg` - Seventh visible item (2025, first item)
- `8.jpg` - Eighth visible item (2025, second item)
- `9.jpg` - Ninth visible item (2025, third item)

### Image Specifications
- **Format**: JPG (recommended) or PNG
- **Aspect Ratio**: 16:9 (960x540px base)
- **Max Width**: 480px (responsive)
- **Quality**: High quality, optimized for web

### Display Order Mapping
The images are mapped to items in this exact order:

1. **2023 - Item 1**: National Recognition and Early Momentum — Ocean Climate Challenge (National Winner 2023) → `1.jpg`
2. **2023 - Item 2**: NRC Canada — IRAP Funding Phase I & II → `2.jpg`
3. **2023 - Item 3**: Foresight Canada — National CleanTech Accelerator → `3.jpg`
4. **2024 - Item 1**: econext — CleanTech Innovation Award → `4.jpg`
5. **2024 - Item 2**: RBC Spring Program — Top 15 of 75+ → `5.jpg`
6. **2024 - Item 3**: Springboard Atlantic — Strategic IP Funding & Implementation (3rd of 50+) → `6.jpg`
7. **2025 - Item 1**: Innovation NL — Presentations & Pilot Collaborations → `7.jpg`
8. **2025 - Item 2**: Blue BioValue — International Blue-Tech Accelerator → `8.jpg`
9. **2025 - Item 3**: Parliament of Canada — Standing Committee on Science & Research (SRSR) → `9.jpg`

## Layout Behavior

### Desktop (md+ screens)
- **Left cards**: Images appear on the right side
- **Right cards**: Images appear on the left side
- **3-column grid**: [Image | Timeline | Card] or [Card | Timeline | Image]

### Mobile (sm screens)
- **Stacked layout**: Image appears above the card
- **Single column**: Image → Timeline dot → Card

## Fallback Handling
- If an image file is missing, a neutral placeholder will be displayed
- Placeholder shows "Image placeholder" text
- Graceful error handling prevents broken image icons

## Performance Features
- **Lazy loading**: Images load as they come into view
- **Responsive sizing**: Optimized for different screen sizes
- **Object-cover**: Images maintain aspect ratio while filling container

## Adding Images
1. Prepare your 9 images with the correct naming convention
2. Place them in `src/assets/`
3. Ensure they follow the aspect ratio and quality guidelines
4. The component will automatically map them to the correct timeline items

## Example Image Content Suggestions
- **1.jpg**: Award ceremony or trophy image
- **2.jpg**: Laboratory or research facility
- **3.jpg**: Rocket or acceleration imagery
- **4.jpg**: Innovation or sustainability concept
- **5.jpg**: Business or strategy meeting
- **6.jpg**: IP or commercialization concept
- **7.jpg**: Team collaboration or customer meeting
- **8.jpg**: Global or international concept
- **9.jpg**: Parliament or policy-related imagery





















