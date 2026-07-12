# 🦉 Financial Literacy Academy

An interactive, gamified financial literacy learning platform designed specifically for middle school students (ages 11–14). The application features 10 comprehensive educational modules, dynamic simulations (including compound interest calculators, simulated stock markets, and budget sliders), progress tracking, badge collections, a customizable mascot closet, and **Finny the Wise Owl**—a helpful AI financial advisor powered by Gemini.

---

## 🚀 One-Click Deployments

Teachers, students, and educators can launch their own live instance of the Financial Literacy Academy with a single click. 

Since this application uses a full-stack architecture (Express + React) to securely query the Gemini API, choose one of the platforms below to deploy:

### Option 1: Deploy to Render (Recommended)
Render natively builds and deploys Node.js and React applications. It will auto-detect the `package.json` scripts.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=YOUR_GITHUB_REPO_URL)

*Note: Replace `YOUR_GITHUB_REPO_URL` in the link with your actual GitHub repository link (e.g., `https://github.com/username/repo-name`).*

### Option 2: Deploy to Railway
Railway is a stellar cloud platform that boots Node.js applications instantly.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=YOUR_GITHUB_REPO_URL)

*Note: Replace `YOUR_GITHUB_REPO_URL` in the link with your actual GitHub repository link.*

---

## 🔑 AI Assistant Configuration (Optional)
This application includes **Finny the Wise Owl**, an AI advisor.
- **Without an API Key**: The app runs in **High-Fidelity Fallback Mode**, providing robust, educational pre-programmed answers to common questions about savings, taxes, budgets, credit, and stocks. This is safe and free for school environments.
- **With an API Key**: To enable real-time, dynamic AI conversations, add the `GEMINI_API_KEY` environment variable in your Render or Railway dashboard during or after deployment.

---

## 🏫 Features

- **10 Interactive Modules**: Covering Earning, Budgeting (50/30/20 Rule), Saving (Compound Interest), Investing (Stocks & Diversification), Debt/Credit, Taxes, Consumer Smarts, Financial Goals, Career Pathways, and Charity/Donations.
- **Gamified Progression**: Earn Fin-Coins and XP as modules are completed.
- **Interactive Playgrounds**: High-fidelity simulators for compound interest compound growth, budgeting sliders, active stock trading, and real-world tax paychecks.
- **Collectible Badges**: Unlock 10 unique, stylized academy badges for master level performance.
- **Mascot Boutique Closet**: Spend earned Fin-Coins to purchase and equip hats, glasses, shirts, and twin companion accessories on your companion mascot owl.
- **Classroom Safe**: Beautifully styled using high-contrast typography, playful elements, and an eye-safe theme.

---

## 🛠️ Local Development

If you'd like to run or test the academy locally on your computer:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Setup
Clone the repository and install all dependencies:
```bash
git clone YOUR_GITHUB_REPO_URL
cd Financial-Literacy-Academy
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build
To generate a production-ready optimized build:
```bash
npm run build
npm run start
```
