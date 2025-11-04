/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Theme-aware colors using CSS variables
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'card': 'var(--bg-card)',
        'surface': 'var(--bg-surface)',
        'elevated': 'var(--bg-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'accent-green': 'var(--accent-green)',
        'accent-red': 'var(--accent-red)',
        'border-theme': 'var(--border-color)',
        'border-theme-light': 'var(--border-color-light)',
      },
      transitionDuration: {
        'theme': 'var(--theme-transition)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--timing-smooth)',
        'bounce': 'var(--timing-bounce)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

