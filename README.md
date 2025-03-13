# CipherHack - Hacking Text Effect

A cyberpunk-themed text encryption simulator built with Next.js and Tailwind CSS that simulates the classic "hacking" effect where letters randomly cycle until they match the target text.

![CipherHack Demo](https://github.com/nishanthgandhe/WordOuputNextJs/)

## Features

- Realistic letter-by-letter "hacking" text animation
- Cyberpunk terminal-style user interface
- Adjustable animation speed
- Configurable glitch intensity
- Responsive design
- Retro CRT screen effects (scanlines, flicker, vignette)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) - Space Mono font for terminal aesthetic

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hacking-text-effect.git
cd hacking-text-effect
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter your text in the "TARGET MESSAGE" field
2. Adjust the processing speed slider to change how fast the letters cycle
3. Set the glitch intensity to control random character glitches
4. Click "EXECUTE" to start the animation
5. Click "ABORT" to stop the animation if needed

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with animations and effects
│   ├── layout.tsx           # App layout with font configuration
│   └── page.tsx             # Main application page
├── components/
│   └── HackingText.tsx      # Core animation component
├── public/
│   └── ...                  # Static assets
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## How It Works

The application uses a custom React hook to manage the text animation state:

1. Starts with an empty string and builds the target text character by character
2. For each position, it cycles through random characters before settling on the correct one
3. Adds occasional glitches to already rendered text for visual effect
4. Uses CSS to create terminal and CRT screen effects

## Customization

### Changing Colors

The primary colors can be modified in the component's Tailwind CSS classes:

- Primary text: `text-green-400`
- Background: `bg-black`
- Accents: `border-green-500/30`

### Fonts

The application uses Google's Space Mono for a terminal-like appearance. To change fonts, modify the `layout.tsx` file.

### Adding Features

The modular design makes it easy to add features like:
- Saving animations
- Additional visual effects
- Sound effects
- More animation patterns

## Common Issues

### Hydration Errors

If you encounter React hydration errors, ensure that any random values or date functions are only executed on the client side using `useEffect` hooks.
