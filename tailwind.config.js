const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      screens: {
        // small phones get two columns before 640px
        xs: "420px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        lantern: {
          DEFAULT: "hsl(var(--lantern))",
          foreground: "hsl(var(--lantern-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // scene-only tokens, consumed by the ocean fallback
        sky: {
          high: "hsl(var(--sky-high))",
          low: "hsl(var(--sky-low))",
        },
        sea: {
          far: "hsl(var(--sea-far))",
          near: "hsl(var(--sea-near))",
        },
        sun: "hsl(var(--sun))",
        curtain: {
          from: "hsl(var(--curtain-from))",
          to: "hsl(var(--curtain-to))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Hull rising and falling on the swell. Two frequencies so the
        // ship never looks like it's on a metronome — it should read as
        // alive even when the page is completely still.
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(-1.9deg)" },
          "30%": { transform: "translateY(-9px) rotate(0.7deg)" },
          "55%": { transform: "translateY(-15px) rotate(2.1deg)" },
          "78%": { transform: "translateY(-6px) rotate(0.2deg)" },
        },
        // wings pivot around the bird's body — shallow, so it reads as
        // soaring with the odd beat rather than frantic flapping
        "flap-l": {
          "0%, 100%": { transform: "rotate(-19deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        "flap-r": {
          "0%, 100%": { transform: "rotate(19deg)" },
          "50%": { transform: "rotate(-15deg)" },
        },
        /* Wheeling flight. soar-x and soar-y are a cosine and a sine of the
           same period, so composed on nested elements they trace an
           ellipse — gulls circle, they don't track in a straight line.
           Sampled every 45° so linear timing still comes out smooth. */
        "soar-x": {
          "0%, 100%": { transform: "translateX(var(--ax))" },
          "12.5%": { transform: "translateX(calc(var(--ax) * 0.707))" },
          "25%": { transform: "translateX(0)" },
          "37.5%": { transform: "translateX(calc(var(--ax) * -0.707))" },
          "50%": { transform: "translateX(calc(var(--ax) * -1))" },
          "62.5%": { transform: "translateX(calc(var(--ax) * -0.707))" },
          "75%": { transform: "translateX(0)" },
          "87.5%": { transform: "translateX(calc(var(--ax) * 0.707))" },
        },
        "soar-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "12.5%": { transform: "translateY(calc(var(--ay) * 0.707))" },
          "25%": { transform: "translateY(var(--ay))" },
          "37.5%": { transform: "translateY(calc(var(--ay) * 0.707))" },
          "50%": { transform: "translateY(0)" },
          "62.5%": { transform: "translateY(calc(var(--ay) * -0.707))" },
          "75%": { transform: "translateY(calc(var(--ay) * -1))" },
          "87.5%": { transform: "translateY(calc(var(--ay) * -0.707))" },
        },
        // seamless because the layer is duplicated end-to-end
        drift: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        bob: "bob 6s ease-in-out infinite",
        "flap-l": "flap-l 0.85s ease-in-out infinite",
        "flap-r": "flap-r 0.85s ease-in-out infinite",
        "soar-x": "soar-x 26s linear infinite",
        "soar-y": "soar-y 26s linear infinite",
        "drift-slow": "drift 90s linear infinite",
        "drift-mid": "drift 55s linear infinite",
        "drift-fast": "drift 32s linear infinite",
        marquee: "marquee 42s linear infinite",
        shimmer: "shimmer 5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      // `motion-safe:` reads the OS media query directly, so it can't be
      // overridden in-app. These key off the resolved preference instead,
      // which is the OS setting unless the visitor has chosen otherwise.
      addVariant("anim", ':where(html[data-motion="full"]) &');
      addVariant("still", ':where(html[data-motion="reduced"]) &');
    }),
  ],
};
