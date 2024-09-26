import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', "class"],
  theme: {
  	extend: {
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(100.96deg, rgba(20, 31, 31, 0.06) -1.19%, rgba(189, 248, 249, 0.06) 14.55%, rgba(20, 31, 31, 0.06) 42.01%, rgba(20, 31, 31, 0.06) 100.42%)',
  			'custom-gradient-2': 'linear-gradient(90deg, rgba(125, 249, 255, 0.46) 0%, rgba(106, 211, 216, 0.46) 38.5%, rgba(108, 162, 165, 0.4508) 100%);'
  		},
  		boxShadow: {
  			'custom-shadow': '0px 2px 15px 0px #0000001A;'
  		},
  		colors: {
  			'custom-blue': '#E3FCFD',
  			'custom-text': '#141F1F'
  		},
  		keyframes: {
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
};
export default config;