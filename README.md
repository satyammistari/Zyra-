# Product Search Engine

A modern, AI-powered product search engine built with Next.js and Bun that finds the best products across all major e-commerce platforms with intelligent recommendations.

## Features

- 🤖 **AI-Powered Search**: Advanced search interface similar to ChatGPT
- 🛒 **Multi-Platform Search**: Search across Amazon, eBay, Walmart, Best Buy, and Target
- 💰 **Price Comparison**: Compare prices and find the best deals
- ⭐ **Smart Reviews**: Aggregated reviews and ratings
- 🎨 **Modern UI**: Beautiful particle background and smooth animations
- 🌙 **Dark Mode**: Full dark/light theme support
- 📱 **Responsive**: Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-search-engine
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── animated-ai-input.tsx
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── particles.tsx
│   │   ├── textarea.tsx
│   │   └── tubelight-navbar.tsx
│   ├── product-card.tsx
│   ├── search-results.tsx
│   └── theme-provider.tsx
└── lib/
    └── utils.ts
```

## Components

### AI Search Input
- ChatGPT-like interface with model selection
- Auto-resizing textarea
- File attachment support
- Smooth animations

### Particles Background
- Interactive particle system
- Mouse-responsive animations
- Theme-aware colors

### Navigation Bar
- Tubelight effect on active items
- Responsive design
- Smooth transitions

### Product Cards
- Platform badges
- Rating system
- Price comparison
- Discount indicators

## Customization

### Adding New Platforms
To add support for new e-commerce platforms, update the `platformColors` object in `product-card.tsx`:

```typescript
const platformColors = {
  Amazon: "bg-orange-500",
  eBay: "bg-blue-500",
  // Add new platforms here
  NewPlatform: "bg-purple-500",
}
```

### Modifying Search Models
Update the AI models in `animated-ai-input.tsx`:

```typescript
const AI_MODELS = [
  "Product Search AI",
  "Amazon Search",
  // Add new models here
]
```

## API Integration

Currently uses mock data for demonstration. To integrate with real APIs:

1. Create API routes in `app/api/`
2. Update the `handleSearch` function in `page.tsx`
3. Replace mock data with actual API calls

## Deployment

### Vercel (Recommended)
```bash
bun run build
```

Deploy to Vercel or any other platform that supports Next.js.

### Docker
```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.
