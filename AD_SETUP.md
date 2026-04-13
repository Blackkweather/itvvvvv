# AdCash Ad Integration Guide

## Overview

Your StreamPro site is now set up for AdCash monetization with Site ID **1596388** and Zone ID **zusoe0fva9**.

## Setup Completed ✅

### 1. **Environment Variables**

- Added AdCash credentials to `.env.local`
- Zone ID will be `NEXT_PUBLIC_ADCASH_ZONE_ID` (accessible on client-side)

### 2. **Components Created**

- **AdCashSlot**: Core ad component for programmatic ad placement
- **AdCashInArticleAd**: Styled for blog content (in-article placement)
- **AdCashSidebarAd**: Styled for sidebar placement

### 3. **Integration Points**

#### Blog Posts (`src/app/blog/[slug]/page.tsx`)

✅ **Already integrated:**
- In-article ad after hero image
- Use: `<AdCashInArticleAd zoneId={zoneId} />`

#### Recommended Additional Placements

**Homepage** (`src/app/page.tsx`)

- Between hero section and features
- In CTASection
- Between content sections

**Installation Guides** (e.g., `/iptv-firestick`, `/iptv-android`)

- After header image
- Between instruction sections
- Before related links

**Pricing Page** (`src/app/pricing/page.tsx`)

- Between comparison table and CTA

## Usage Examples

### In-Article Ad (Blog)

```tsx
import { AdCashInArticleAd } from '@/components/ads/AdCashSlot';

<AdCashInArticleAd zoneId={process.env.NEXT_PUBLIC_ADCASH_ZONE_ID || ''} />
```

### Sidebar Ad

```tsx
import { AdCashSidebarAd } from '@/components/ads/AdCashSlot';

<AdCashSidebarAd zoneId={process.env.NEXT_PUBLIC_ADCASH_ZONE_ID || ''} />
```

### Generic Ad Slot (Custom styling)

```tsx
import { AdCashSlot } from '@/components/ads/AdCashSlot';

<AdCashSlot
  zoneId={process.env.NEXT_PUBLIC_ADCASH_ZONE_ID || ''}
  className="my-8"
  label="Advertisement"
/>
```

## File Locations

- **Components**: `src/components/ads/AdCashSlot.tsx`
- **ads.txt**: `public/ads.txt`
- **Config**: `.env.local`

## Next Steps

1. **Add ads to more pages** (see recommended placements above)
2. **Monitor performance** in your AdCash dashboard
3. **Optimize placement** based on user engagement
4. **Consider multiple zones** for different page types:
   - Zone 1: Blog articles
   - Zone 2: Sidebar/widget
   - Zone 3: Homepage

## Troubleshooting

### Ads not showing?

- Check that Zone ID is correctly loaded in environment
- Verify domains is whitelisted in AdCash dashboard
- Check browser console for errors
- Ensure page is publicly accessible (AdCash checks for localhost)

### Build issues?

- Run `npm run build` to verify no TypeScript errors
- Check `.env.local` exists with correct values

## Performance Tips

- Lazy load ads below-the-fold to improve page speed
- Use responsive ad sizes to minimize layout shift
- Place ads in natural content breaks, not mid-sentence
- Monitor Core Web Vitals impact with ads enabled

