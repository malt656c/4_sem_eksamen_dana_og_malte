/** @type {import('tailwindcss').Config} */
export default {
   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
   theme: {
      screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1440px',
      },

      extend: {
         colors: {
            fs_yellow: 'var(--fs_yellow)',
            fs_orange: 'var(--fs_orange)',
            fs_red: 'var(--fs_red)',
            fs_purple: 'var(--fs_purple)',
            fs_blue: 'var(--fs_blue)',
            fs_green: 'var(--fs_green)',
            fs_dark: 'var(--fs_dark)',
            fs_light: 'var(--fs_light)',
            fs_gray: 'var(--fs_gray)',
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            accent: 'var(--accent)',
         },
         fontFamily: {
            display: ['Chelsea Market', 'system-ui'],
            sans: ["Montserrat", 'serif'],
         },

		 
      },
   },
   plugins: [],
};
