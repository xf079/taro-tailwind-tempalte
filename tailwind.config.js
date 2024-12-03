import * as tailwindcssAnimate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('tailwindcss-rem2px-preset').createPreset({
      // 32 意味着 1rem = 32rpx
      fontSize: 32,
      // 转化的单位,可以变成 px / rpx
      unit: 'rpx'
    })
  ],
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
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
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      transitionDuration: {
        base: 'var(--duration,300ms)'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-sans)']
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        'slide-up-enter': {
          from: { transform: 'translateY(100%)' }
        },
        'slide-up-exit': {
          to: { transform: 'translateY(100%)' }
        },
        'slide-down-enter': {
          from: { transform: 'translateY(-100%)' }
        },
        'slide-down-exit': {
          to: { transform: 'translateY(-100%)' }
        },
        'slide-left-enter': {
          from: { transform: 'translateX(-100%)' }
        },
        'slide-left-exit': {
          to: { transform: 'translateX(-100%)' }
        },
        'slide-right-enter': {
          from: { transform: 'translateX(100%)' }
        },
        'slide-right-exit': {
          to: { transform: 'translateX(100%)' }
        },
        'scale-enter': {
          from: { transform: 'scale(0.5)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 }
        },
        'scale-exit': {
          from: { transform: 'scale(1)', opacity: 1 },
          to: { transform: 'scale(0.5)', opacity: 0 }
        }
      },
      animation: {
        'fade-in': 'fade-in var(--duration, 300ms)',
        'fade-out': 'fade-out var(--duration, 300ms)',
        'slide-up-enter': 'slide-up-enter var(--duration, 300ms)',
        'slide-up-exit': 'slide-up-exit var(--duration, 300ms)',
        'slide-down-enter': 'slide-down-enter var(--duration, 300ms)',
        'slide-down-exit': 'slide-down-exit var(--duration, 300ms)',
        'slide-left-enter': 'slide-left-enter var(--duration, 300ms)',
        'slide-left-exit': 'slide-left-exit var(--duration, 300ms)',
        'slide-right-enter': 'slide-right-enter var(--duration, 300ms)',
        'slide-right-exit': 'slide-right-exit var(--duration, 300ms)',
        'scale-enter': 'scale-enter var(--duration, 300ms)',
        'scale-exit': 'scale-exit var(--duration, 300ms)'
      }
    }
  },
  plugins: [tailwindcssAnimate],
  // 其他配置项
  // ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: process.env.TARO_ENV === 'h5'
  }
};
