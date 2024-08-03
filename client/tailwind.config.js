const windmill = require("@windmill/react-ui/config");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
   ],
   theme: {
      extend: {
         backgroundColor: {
            'half-transparent': 'rgba(0, 0, 0, 0.5)',
         },
         colors: {
            primary: "#3C4242",
            secondary: "#807D7E",
            blueBar: "#8A33FD",
            orangeText: "#FBD103",
            star: "#EDD146",
            grayBG: "#F6F6F6",
            border: "#BEBCBD",
         },
         fontFamily: {
            caustenblack: ["caustenblack"],
            caustenbold: ["caustenbold"],
            caustenextra_bold: ["caustenextra_bold"],
            caustenextra_light: ["caustenextra_light"],
            caustenlight: ["caustenlight"],
            caustenmedium: ["caustenmedium"],
            caustenregular: ["caustenregular"],
            caustensemi_bold: ["caustensemi_bold"],
            caustenthin: ["caustenthin"],
            mintaka: ["Mintaka Regular"],
            core_sans_thin: ["core_sans_thin"],
            core_sans_extralight: ["core_sans_extralight"],
            core_sans_light: ["core_sans_light"],
            core_sans_regular: ["core_sans_regular"],
            core_sans_medium: ["core_sans_medium"],
            core_sans_bold: ["core_sans_bold"],
            core_sans_extrabold: ["core_sans_extrabold"],
            core_sans_heavy: ["core_sans_heavy"],
            core_sans_black: ["core_sans_black"],
         },
         fontSize: {
            sm: "14px",
            base: "16px",
            lg: "22px",
            xl: "24px",
            "2xl": "32px",
            "3xl": "34px",
            "4xl": "50px",
            "5xl": "78px",
         },
         boxShadow: {
            bottom:
               "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
         },
      },
      screens: {
         sm: "480px",
         md: "768px",
         lg: "978px",
         xl: "1240px",
      },
   },
   plugins: [],
}

