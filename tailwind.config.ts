import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}", // Add this line to include the correct path for Index.tsx
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom colors for Hack-O-Hire
        hackohire: {
          bg: '#F8F7FF',
          purple: '#5D3FD3',
          blue: '#21D4FD',
          pink: '#FF3CAC',
          black: '#151515',
          gold: '#FFD700'
        },
        navy: {
          DEFAULT: "#1A1F36",
          50: "#E6E7EB",
          100: "#CED0D8",
          200: "#9DA3B2",
          300: "#6B758C",
          400: "#3A4865",
          500: "#1A1F36",
          600: "#16192D",
          700: "#121524",
          800: "#0E111B",
          900: "#0A0C12",
        },
        purple: {
          DEFAULT: "#635BFF",
          50: "#EEEDFF",
          100: "#DEDCFF",
          200: "#BEB9FF",
          300: "#9E97FF",
          400: "#7E74FF",
          500: "#635BFF",
          600: "#352BFF",
          700: "#0700F8",
          800: "#0500C5",
          900: "#040092",
        },
        gold: {
          DEFAULT: "#F0B67F",
          50: "#FEF9F5",
          100: "#FDEFE2",
          200: "#FADFBB",
          300: "#F7CF94",
          400: "#F3C089",
          500: "#F0B67F",
          600: "#EBA256",
          700: "#E78D2D",
          800: "#C97316",
          900: "#965411",
        },
        slate: {
          DEFAULT: "#8892B0",
          50: "#F8F9FB",
          100: "#EBEEF3",
          200: "#D0D5E2",
          300: "#B5BCD0",
          400: "#9AA4BF",
          500: "#8892B0",
          600: "#68749A",
          700: "#51597A",
          800: "#3B415A",
          900: "#262939",
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        // Existing keyframes
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        // Custom keyframes for Hack-O-Hire
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(93, 63, 211, 0.3), 0 0 15px rgba(93, 63, 211, 0.2)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(93, 63, 211, 0.5), 0 0 30px rgba(93, 63, 211, 0.3)'
          }
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        },
        'flip-back': {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 8px 2px rgba(99, 91, 255, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 18px 4px rgba(99, 91, 255, 0.4)",
          },
        },
        "rotate-orbit": {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(100px) rotate(-360deg)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-40rem 0",
          },
          "100%": {
            backgroundPosition: "40rem 0",
          },
        },
      },
      animation: {
        // Existing animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Custom animations for Hack-O-Hire
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.8s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'glow-pulse': 'glow-pulse 3s infinite',
        'slide-left': 'slide-left 0.5s ease-out',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 30s linear infinite reverse',
        'float': 'float 5s ease-in-out infinite',
        "fade-out": "fade-out 0.5s ease-out",
        "scale-out": "scale-out 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "rotate-orbit": "rotate-orbit 20s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "shimmer": "shimmer 2s infinite linear",
      },
      fontSize: {
        '2xs': '0.65rem', // Extra small size for badges
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple-blue': 'linear-gradient(90deg, #5D3FD3, #21D4FD)',
        'gradient-blue-pink': 'linear-gradient(90deg, #21D4FD, #FF3CAC)',
        'gradient-purple-pink': 'linear-gradient(90deg, #5D3FD3, #FF3CAC)',
        'gradient-full': 'linear-gradient(90deg, #5D3FD3, #21D4FD, #FF3CAC)',
        "blue-purple-gradient":
          "linear-gradient(90deg, #3A4865 0%, #635BFF 100%)",
        "gold-navy-gradient":
          "linear-gradient(90deg, #F0B67F 0%, #1A1F36 100%)",
        "shimmer-gradient":
          "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))",
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        "neon-purple": "0 0 5px rgba(99, 91, 255, 0.5), 0 0 20px rgba(99, 91, 255, 0.3)",
        "neon-gold": "0 0 5px rgba(240, 182, 127, 0.5), 0 0 20px rgba(240, 182, 127, 0.3)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "neo": "12px 12px 24px #121524, -12px -12px 24px #1e213c",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "SF Pro", "system-ui", "sans-serif"],
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;