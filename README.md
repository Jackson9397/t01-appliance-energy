# T01 (a): Appliance Energy Consumption Website

A tiny interactive SPA demonstrating HTML, CSS, and JavaScript, hosted from a GitHub repository and deployable on Vercel.

## Features
- Three “pages”: **Home**, **Televisions**, **About Us** (client-side routing)
- Top navigation with logo (click → Home), hover feedback, and active page indicator
- Palette and styling inspired by the provided power icon
- Footer with dynamic year, author name, and GenAI acknowledgement
- Placeholder content focused on appliance energy consumption in the Australian market
- A simple TV energy **cost estimator** (kWh/day and $/year)

## Run Locally
```bash
# clone
- git clone https://github.com/<your-username>/t01-appliance-energy.git
- cd t01-appliance-energy

# open in VS Code and use the Live Server extension or any static server:
# e.g. npx serve
- npx serve

# Notes on GenAI (GitHub Copilot)
- What I used it for: brainstorming color tokens, writing the hash-router skeleton, and suggesting accessible UI patterns (focus management after navigation).

- What I did myself: structured the content, verified calculations, and edited CSS for the active nav “pill” indicator.

- Reflection: Copilot sped up repetitive markup/JS, but I reviewed each suggestion, renamed variables for clarity, and removed unnecessary complexity. The final code is small, readable, and easy to explain or modify in the sign-off demo.

#Acknowledgements
- Power icon provided in the brief (PowerIcon.png).
- This site is for COS30045 Task T01 demonstration purposes only.
