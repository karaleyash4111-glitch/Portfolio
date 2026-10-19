# Yash Karale — Crimson Cyber Portfolio

A responsive, crimson cyberpunk portfolio built with React, Vite, Three.js (React Three Fiber), GSAP ScrollTrigger, and custom CSS.

## Personal details included
- Name: Yash Karale
- Role: Student & Front-End Developer
- Education: BBA CA, 5th Semester
- Skills: Java, Python, HTML, CSS, JavaScript
- Email: karaleyash4111@gmail.com
- Interests: Cricket, football, and volleyball
- Projects: MoodMate, PetSafe, and Campus Connect

## Features
- Interactive 3D crimson orb, wireframe shell, orbital rings, stars, and particles
- Cursor-reactive 3D scene and custom crimson cursor on desktop
- Smooth scrolling and GSAP entrance/scroll reveal animations
- Responsive mobile navigation and animated project cards
- About, education, projects, skills, and contact sections
- Resume download button and included starter resume PDF
- Profile-photo slot with a cyberpunk placeholder graphic
- Reduced-motion support and responsive layouts

## Run locally
1. Install Node.js 18 or newer from https://nodejs.org/.
2. Extract the ZIP and open the `crimson-cyber-portfolio` folder in VS Code.
3. Open a terminal in the folder that contains `package.json`.
4. Run `npm install` (on Windows PowerShell, if script policy blocks npm, run `npm.cmd install`).
5. Run `npm run dev` (or `npm.cmd run dev` in PowerShell).
6. Open the local URL shown in the terminal, usually `http://localhost:5173`.

If you get `ENOENT package.json`, you are in the wrong folder. Use `dir` and change into the inner project folder until you can see `package.json`, `index.html`, and `src`.

## Personalize your photo
The current profile image is a designed placeholder at `public/profile-placeholder.svg`.

To use your own photo:
1. Copy a square photo into the `public` folder, for example `profile.jpg`.
2. In `src/App.jsx`, find `<img src="/profile-placeholder.svg" ... />` and change it to `<img src="/profile.jpg" ... />`.
3. Save the file; Vite refreshes the page automatically.

## Update your resume
The included `public/Yash-Karale-Resume.pdf` is a starter resume made only from the details supplied so far. Add your college name, dates, project links, achievements, and relevant experience before using it for applications. Replace this PDF with your final resume while keeping the same filename so the download button continues to work.

## Social links
- Email is connected to `karaleyash4111@gmail.com`.
- The LinkedIn link currently uses the profile URL you supplied (`https://linkedin.com/in/`). Replace it in `src/App.jsx` with your complete LinkedIn profile URL when you have it.
- GitHub is omitted until you provide your profile URL.

## Build for deployment
Run `npm run build` (or `npm.cmd run build` in Windows PowerShell). The production site is generated in `dist/`.

Project descriptions are written as concepts; update them to accurately reflect each project's actual status and capabilities before publishing.
