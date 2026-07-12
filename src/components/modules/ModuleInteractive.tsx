import React, { useState, useEffect } from "react";
import { 
  Coins, Briefcase, PiggyBank, TrendingUp, Search, Lock, ShieldAlert, Rocket, Map, Heart,
  ArrowRight, Check, Play, RefreshCw, Star, Trash2, ShoppingBag, Plus, Minus, UserCheck, Eye, Trash
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Module, StockState } from "../../types";

interface ModuleInteractiveProps {
  module: Module;
  onComplete: (awardedCoins: number, awardedXp: number) => void;
  userCoins: number;
}

export default function ModuleInteractive({ module, onComplete, userCoins }: ModuleInteractiveProps) {
  const [gameState, setGameState] = useState<any>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize Game State based on module ID
  useEffect(() => {
    setIsCompleted(false);
    if (module.id === "m1") {
      // Barter Game
      setGameState({
        inventory: ["Apples 🍎"],
        step: 1,
        logs: ["You have an Apple Orchard. Your goal is to trade for a cool Skateboard 🛹!"]
      });
    } else if (module.id === "m2") {
      // Careers
      setGameState({
        selectedJob: null,
        clicks: 0,
        earnings: 0,
        taxDeducted: 0,
        netPay: 0,
        stage: "select" // select, work, paystub
      });
    } else if (module.id === "m3") {
      // Budget
      setGameState({
        needs: 50, // percents
        wants: 30,
        savings: 20,
        stage: "setup", // setup, results
        events: [] as string[],
        finalSavings: 200,
        survived: true
      });
    } else if (module.id === "m4") {
      // Compound Interest
      setGameState({
        monthlySavings: 50,
        rate: 6,
        age: 12,
        totalSaved: 0,
        totalInterest: 0,
        totalPortfolio: 0
      });
    } else if (module.id === "m5") {
      // Comparison Shopping
      setGameState({
        chipsAnswer: null, // 'A' or 'B'
        juiceAnswer: null, // 'X' or 'Y'
        feedback: "",
        score: 0,
        stage: "chips" // chips, juice, score
      });
    } else if (module.id === "m6") {
      // Banking Basics
      setGameState({
        payee: "",
        amountNum: "",
        amountWords: "",
        signature: "",
        checkApproved: false,
        checkingBalance: 0,
        cashWallet: 0,
        atmStage: "insert" // insert, deposit, withdraw
      });
    } else if (module.id === "m7") {
      // Debt Monster
      setGameState({
        plan: null, // 'full' or 'minimum'
        months: 0,
        debt: 1000,
        totalInterestPaid: 0,
        stage: "select" // select, simulate
      });
    } else if (module.id === "m8") {
      // Rocket Stocks
      const initialStocks: StockState[] = [
        { id: "s1", name: "ChocoTech", symbol: "CHOCO", price: 100, history: [100], volatility: 0.1, trend: 1, description: "Makes digital chocolate dispensers." },
        { id: "s2", name: "DinoEnergy", symbol: "DINO", price: 50, history: [50], volatility: 0.25, trend: 0, description: "Eco-friendly energy from fossil models." },
        { id: "s3", name: "CyberRobotics", symbol: "ROBO", price: 150, history: [150], volatility: 0.4, trend: -1, description: "Builds homework-doing androids." },
        { id: "s4", name: "MemeWear", symbol: "MEME", price: 20, history: [20], volatility: 0.7, trend: 0, description: "Gamer clothing that glows in the dark." }
      ];
      setGameState({
        stocks: initialStocks,
        cash: 500,
        shares: { CHOCO: 0, DINO: 0, ROBO: 0, MEME: 0 },
        day: 1,
        news: "Welcome to Wall Street! Click Next Day to watch stock charts react to the news!",
        portfolioValue: 500
      });
    } else if (module.id === "m9") {
      // Taxes at work
      setGameState({
        allocated: { schools: 0, parks: 0, roads: 0, fire: 0 },
        remainingTax: 200,
        stage: "allocate" // allocate, success
      });
    } else if (module.id === "m10") {
      // Charity/Giving
      setGameState({
        shelterDonated: 0,
        foodBankDonated: 0,
        forestDonated: 0,
        spentCoins: 0,
        badgeEarned: false
      });
    }
  }, [module.id]);

  const completeSimulation = () => {
    setIsCompleted(true);
    onComplete(module.coinReward, module.xpReward);
  };

  // ----------------------------------------------------
  // MODULE 1: BARTER GAME
  // ----------------------------------------------------
  const handleBarterTrade = (offeredItem: string, wantedItem: string, recipient: string, rewardItem: string) => {
    setGameState((prev: any) => {
      const inv = prev.inventory.filter((item: string) => item !== offeredItem);
      const newInv = [...inv, rewardItem];
      const newLogs = [
        ...prev.logs,
        `Traded ${offeredItem} to ${recipient} for ${rewardItem}!`
      ];
      return {
        ...prev,
        inventory: newInv,
        logs: newLogs,
        step: prev.step + 1
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 2: CAREER CHOICES & INCOME
  // ----------------------------------------------------
  const selectJob = (jobName: string, wage: number) => {
    setGameState((prev: any) => ({
      ...prev,
      selectedJob: { name: jobName, wage },
      clicks: 0,
      earnings: 0,
      stage: "work"
    }));
  };

  const workShift = () => {
    setGameState((prev: any) => {
      const newClicks = prev.clicks + 1;
      const hoursWorked = newClicks * 1.6; // click makes hours tick
      const totalEarned = hoursWorked * prev.selectedJob.wage;
      const isShiftDone = newClicks >= 5;
      
      if (isShiftDone) {
        const tax = totalEarned * 0.2; // 20% tax
        return {
          ...prev,
          clicks: newClicks,
          earnings: Math.round(totalEarned),
          taxDeducted: Math.round(tax),
          netPay: Math.round(totalEarned - tax),
          stage: "paystub"
        };
      }
      return {
        ...prev,
        clicks: newClicks,
        earnings: Math.round(totalEarned)
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 3: BUDGET GAME
  // ----------------------------------------------------
  const handleBudgetChange = (category: "needs" | "wants" | "savings", delta: number) => {
    setGameState((prev: any) => {
      const currentVal = prev[category];
      const newVal = Math.max(0, Math.min(100, currentVal + delta));
      // Readjust other categories to keep total at 100% or just let user play with it.
      // To keep it clean and simple for middle school, we let them change, and they must reach exactly 100% total.
      return {
        ...prev,
        [category]: newVal
      };
    });
  };

  const simulateBudgetMonth = () => {
    const total = gameState.needs + gameState.wants + gameState.savings;
    if (total !== 100) return;

    // Simulate "Life Happens" cards
    const cards = [
      { text: "Your smartphone screen cracked! Repair costs $100.", amount: -100 },
      { text: "Sold your old comic books at a school yard sale! Earned $40.", amount: 40 },
      { text: "Monthly streaming service subscription renewed. -$15.", amount: -15 }
    ];

    const startingCash = 1000;
    const initialSaved = startingCash * (gameState.savings / 100);
    const spendingWants = startingCash * (gameState.wants / 100);
    
    let currentSaved = initialSaved;
    let survived = true;
    let logs: string[] = [];

    cards.forEach((card) => {
      currentSaved += card.amount;
      logs.push(`${card.text} (${card.amount >= 0 ? "+" : ""}$${card.amount})`);
    });

    if (currentSaved < 0) {
      survived = false;
    }

    setGameState((prev: any) => ({
      ...prev,
      stage: "results",
      events: logs,
      finalSavings: Math.max(0, currentSaved),
      survived
    }));
  };

  // ----------------------------------------------------
  // MODULE 4: COMPOUND INTEREST
  // ----------------------------------------------------
  useEffect(() => {
    if (module.id === "m4" && gameState.age !== undefined) {
      let principal = 0;
      let total = 0;
      const rateDecimal = (gameState.rate || 6) / 100 / 12;
      const months = (gameState.age - 12) * 12;
      const monthlyAdd = gameState.monthlySavings || 50;

      for (let i = 0; i < months; i++) {
        total = (total + monthlyAdd) * (1 + rateDecimal);
        principal += monthlyAdd;
      }

      setGameState((prev: any) => ({
        ...prev,
        totalSaved: Math.round(principal),
        totalInterest: Math.round(Math.max(0, total - principal)),
        totalPortfolio: Math.round(total)
      }));
    }
  }, [gameState.monthlySavings, gameState.rate, gameState.age, module.id]);

  // ----------------------------------------------------
  // MODULE 5: COMPARISON SHOPPING
  // ----------------------------------------------------
  const submitChips = (answer: "A" | "B") => {
    setGameState((prev: any) => ({
      ...prev,
      chipsAnswer: answer,
      stage: "juice"
    }));
  };

  const submitJuice = (answer: "X" | "Y") => {
    let score = 0;
    let feedback = "";
    if (gameState.chipsAnswer === "B") score += 50;
    if (answer === "Y") score += 50;

    if (score === 100) {
      feedback = "Whooo-ray! You scored 100%! You found that Brand B chips ($0.20/oz) and Brand Y juice boxes ($0.40/pack with coupon) are the smartest buys! Truly a Deal Detective!";
    } else if (score === 50) {
      feedback = "Good try! You got one deal right, but missed another. Let's look closely at the math and unlock your rewards!";
    } else {
      feedback = "Oops! Remember, always divide the Total Price by the Quantity to find the true price-per-unit. Let's learn and proceed!";
    }

    setGameState((prev: any) => ({
      ...prev,
      juiceAnswer: answer,
      score,
      feedback,
      stage: "score"
    }));
  };

  // ----------------------------------------------------
  // MODULE 6: BANKING
  // ----------------------------------------------------
  const submitCheck = () => {
    if (
      gameState.payee.toLowerCase().includes("arcade") &&
      gameState.amountNum === "150" &&
      gameState.amountWords.toLowerCase().includes("one hundred fifty") &&
      gameState.signature.trim().length > 2
    ) {
      setGameState((prev: any) => ({
        ...prev,
        checkApproved: true,
        atmStage: "insert",
        checkingBalance: 150
      }));
    } else {
      alert("Hoot! Check the details on the check. Pay to: Finny's Arcade, Amount: 150, Words: One Hundred Fifty, and sign your name!");
    }
  };

  const performATMDeposit = () => {
    setGameState((prev: any) => ({
      ...prev,
      atmStage: "withdraw",
      checkingBalance: prev.checkingBalance + 50
    }));
  };

  const performATMWithdraw = () => {
    setGameState((prev: any) => ({
      ...prev,
      atmStage: "done",
      checkingBalance: prev.checkingBalance - 20,
      cashWallet: 20
    }));
  };

  // ----------------------------------------------------
  // MODULE 7: THE DEBT TRAP
  // ----------------------------------------------------
  const chooseDebtPlan = (plan: "full" | "minimum") => {
    setGameState((prev: any) => ({
      ...prev,
      plan,
      debt: 1000,
      totalInterestPaid: 0,
      months: 0,
      stage: "simulate"
    }));
  };

  const fastForwardDebt = () => {
    setGameState((prev: any) => {
      let currentDebt = prev.debt;
      let interestPaid = prev.totalInterestPaid;
      const monthlyRate = 0.20 / 12; // 20% APR

      if (prev.plan === "full") {
        return {
          ...prev,
          debt: 0,
          months: 1,
          totalInterestPaid: 0
        };
      } else {
        // Minimum payment of $30/mo
        for (let m = 0; m < 12; m++) {
          if (currentDebt <= 0) break;
          const interest = currentDebt * monthlyRate;
          interestPaid += interest;
          currentDebt = currentDebt + interest - 30;
        }
        return {
          ...prev,
          debt: Math.max(0, Math.round(currentDebt)),
          months: prev.months + 12,
          totalInterestPaid: Math.round(interestPaid)
        };
      }
    });
  };

  // ----------------------------------------------------
  // MODULE 8: ROCKET STOCK SIMULATOR
  // ----------------------------------------------------
  const buyStock = (stockId: string, price: number) => {
    if (gameState.cash < price) return;
    setGameState((prev: any) => {
      const stock = prev.stocks.find((s: any) => s.id === stockId);
      const newShares = { ...prev.shares, [stock.symbol]: prev.shares[stock.symbol] + 1 };
      const newCash = prev.cash - price;
      
      const portfolioVal = newCash + prev.stocks.reduce((sum: number, s: any) => {
        return sum + (newShares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        cash: Math.round(newCash),
        shares: newShares,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  const sellStock = (stockId: string, price: number) => {
    setGameState((prev: any) => {
      const stock = prev.stocks.find((s: any) => s.id === stockId);
      if (prev.shares[stock.symbol] <= 0) return prev;
      
      const newShares = { ...prev.shares, [stock.symbol]: prev.shares[stock.symbol] - 1 };
      const newCash = prev.cash + price;
      
      const portfolioVal = newCash + prev.stocks.reduce((sum: number, s: any) => {
        return sum + (newShares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        cash: Math.round(newCash),
        shares: newShares,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  const advanceStockDay = () => {
    const marketNews = [
      { text: "ChocoTech launches an automated chocolate waffle maker! CHOCO shares soar!", stocks: { CHOCO: 0.25, DINO: 0.05, ROBO: 0.1, MEME: -0.05 } },
      { text: "Reports of hacker activity in CyberRobotics drops client trust. ROBO dips.", stocks: { CHOCO: -0.02, DINO: 0.02, ROBO: -0.22, MEME: 0.05 } },
      { text: "A massive solar storm powers DinoEnergy clean panels. DINO stocks boom!", stocks: { CHOCO: 0.05, DINO: 0.35, ROBO: 0.05, MEME: 0.02 } },
      { text: "MemeWear viral hoodie becomes popular on school apps! MEME shares skyrocket!", stocks: { CHOCO: 0.1, DINO: -0.1, ROBO: 0.0, MEME: 0.85 } },
      { text: "General market slowdown. Prices consolidation across sectors.", stocks: { CHOCO: -0.05, DINO: -0.04, ROBO: -0.08, MEME: -0.15 } }
    ];

    const selectedNews = marketNews[Math.floor(Math.random() * marketNews.length)];

    setGameState((prev: any) => {
      const nextDay = prev.day + 1;
      const updatedStocks = prev.stocks.map((stock: StockState) => {
        const changeFactor = selectedNews.stocks[stock.symbol as keyof typeof selectedNews.stocks] || 0;
        // Add random market noise
        const noise = (Math.random() - 0.5) * stock.volatility;
        const multiplier = 1 + changeFactor + noise;
        const newPrice = Math.max(5, Math.round(stock.price * multiplier));
        return {
          ...stock,
          price: newPrice,
          history: [...stock.history, newPrice]
        };
      });

      const portfolioVal = prev.cash + updatedStocks.reduce((sum: number, s: any) => {
        return sum + (prev.shares[s.symbol] * s.price);
      }, 0);

      return {
        ...prev,
        stocks: updatedStocks,
        day: nextDay,
        news: selectedNews.text,
        portfolioValue: Math.round(portfolioVal)
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 9: TAXES AT WORK
  // ----------------------------------------------------
  const allocateTax = (category: "schools" | "parks" | "roads" | "fire", amount: number) => {
    if (gameState.remainingTax <= 0 && amount > 0) return;
    setGameState((prev: any) => {
      const currentVal = prev.allocated[category];
      const newVal = Math.max(0, currentVal + amount);
      const diff = newVal - currentVal;
      return {
        ...prev,
        allocated: {
          ...prev.allocated,
          [category]: newVal
        },
        remainingTax: prev.remainingTax - diff
      };
    });
  };

  // ----------------------------------------------------
  // MODULE 10: PHILANTHROPY / CHARITY
  // ----------------------------------------------------
  const donateCoins = (charity: "shelter" | "foodBank" | "forest", amount: number) => {
    if (userCoins < amount) {
      alert("Hoot! You don't have enough earned Fin-Coins for this donation yet. Keep completing modules to earn more coins!");
      return;
    }
    setGameState((prev: any) => {
      const itemKey = `${charity}Donated` as const;
      return {
        ...prev,
        [itemKey]: (prev[itemKey] || 0) + amount,
        spentCoins: prev.spentCoins + amount,
        badgeEarned: true
      };
    });
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Module {module.id.replace("m", "")} Interactive Game
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">{module.title}</h2>
          <p className="text-xs text-slate-500">{module.subtitle}</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-center px-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">XP Reward</p>
            <p className="font-bold text-sm text-blue-600">+{module.xpReward} XP</p>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <div className="text-center px-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Coins Reward</p>
            <p className="font-bold text-sm text-yellow-500">+{module.coinReward} Coins</p>
          </div>
        </div>
      </div>

      {/* Game Stage Content */}
      <div className="min-h-[300px]">
        {/* MODULE 1: BARTER SYSTEM */}
        {module.id === "m1" && (
          <div className="space-y-6">
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                <strong>Bartering Goal:</strong> Trade your farm's fresh <strong>Apples 🍎</strong> through villagers who want different items until you can get the <strong>Skateboard 🛹</strong>. This demonstrates why Cash is so much simpler than trading goods directly!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Items & Trade Station */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" /> Your Current Inventory
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {gameState.inventory?.map((item: string) => (
                      <span key={item} className="bg-slate-100 text-slate-800 border border-slate-200 text-sm font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-sm font-bold text-slate-700 mb-2">Available Trades</h4>
                  <div className="space-y-2.5">
                    {gameState.step === 1 && (
                      <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Villager Albie</p>
                          <p className="text-[11px] text-slate-500">Wants: Apples 🍎 | Offers: Baseball Card ⚾</p>
                        </div>
                        <button
                          id="barter-trade-1"
                          onClick={() => handleBarterTrade("Apples 🍎", "Apples 🍎", "Albie", "Baseball Card ⚾")}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                          Trade
                        </button>
                      </div>
                    )}
                    {gameState.step === 2 && gameState.inventory?.includes("Baseball Card ⚾") && (
                      <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Villager Beatrice</p>
                          <p className="text-[11px] text-slate-500">Wants: Baseball Card ⚾ | Offers: Guitar 🎸</p>
                        </div>
                        <button
                          id="barter-trade-2"
                          onClick={() => handleBarterTrade("Baseball Card ⚾", "Baseball Card ⚾", "Beatrice", "Guitar 🎸")}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                          Trade
                        </button>
                      </div>
                    )}
                    {gameState.step === 3 && gameState.inventory?.includes("Guitar 🎸") && (
                      <div className="bg-slate-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center transition-all">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Villager Casey</p>
                          <p className="text-[11px] text-slate-500">Wants: Guitar 🎸 | Offers: Skateboard 🛹</p>
                        </div>
                        <button
                          id="barter-trade-3"
                          onClick={() => handleBarterTrade("Guitar 🎸", "Guitar 🎸", "Casey", "Skateboard 🛹")}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                          Trade
                        </button>
                      </div>
                    )}
                    {gameState.inventory?.includes("Skateboard 🛹") && (
                      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs font-medium text-center">
                        🎉 Whooo-ray! You got the Skateboard! You completed the barter chain.
                      </div>
                    )}
                  </div>
                </div>

                {gameState.inventory?.includes("Skateboard 🛹") && (
                  <button
                    id="m1-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all mt-6 flex items-center justify-center gap-2"
                  >
                    Complete Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Logs & Lessons */}
              <div className="bg-slate-900 text-slate-200 rounded-xl p-5 font-mono text-xs flex flex-col justify-between shadow-inner h-[280px]">
                <div className="space-y-2 overflow-y-auto">
                  <p className="text-amber-400 font-bold">--- TRANSACTION LOGS ---</p>
                  {gameState.logs?.map((log: string, idx: number) => (
                    <p key={idx} className="text-slate-300 border-l border-slate-700 pl-2">
                      {log}
                    </p>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 border-t border-slate-800 pt-3 italic">
                  See how many steps that took? With Cash, you could buy the Skateboard instantly!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: CAREER CHOICES & INCOME */}
        {module.id === "m2" && (
          <div className="space-y-6">
            {gameState.stage === "select" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 font-medium">Select a job pathway to see how hourly wages work:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Baker 🥐", wage: 20, desc: "Bakes warm treats and yummy pastries." },
                    { name: "Eco Scientist 🧪", wage: 30, desc: "Studies nature and protects environment." },
                    { name: "Veterinarian 🩺", wage: 35, desc: "Helps adorable animals stay healthy." },
                    { name: "Game Developer 💻", wage: 45, desc: "Codes awesome video games and apps." }
                  ].map((job) => (
                    <button
                      key={job.name}
                      id={`job-${job.name.toLowerCase().split(' ')[0]}`}
                      onClick={() => selectJob(job.name, job.wage)}
                      className="bg-white border border-slate-200 hover:border-blue-400 p-4 rounded-xl shadow-sm text-left transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      <h4 className="font-bold text-slate-800 text-sm">{job.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{job.desc}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          ${job.wage}/hr
                        </span>
                        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                          Select <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameState.stage === "work" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-md mx-auto text-center space-y-4">
                <span className="text-3xl">💼</span>
                <h3 className="font-bold text-slate-800 text-base">Workday Simulation</h3>
                <p className="text-xs text-slate-500">
                  You are working as a <strong>{gameState.selectedJob?.name}</strong> making <strong>${gameState.selectedJob?.wage}/hour</strong>. Click the button to perform tasks and finish your 8-hour shift!
                </p>

                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(gameState.clicks / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-slate-400">Shift Progress: {gameState.clicks * 20}%</p>

                <button
                  id="do-work-click"
                  onClick={workShift}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  {gameState.clicks < 4 ? "Do Work Task ⚙️" : "Complete Workday! 🎉"}
                </button>
              </div>
            )}

            {gameState.stage === "paystub" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md max-w-md mx-auto space-y-4">
                  <div className="border-b border-dashed border-slate-200 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">VIRTUAL PAYSTUB</h3>
                      <p className="text-[10px] text-slate-400">Employee: Future Wealth Builder</p>
                    </div>
                    <span className="text-lg">💰</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-medium text-slate-600">
                      <span>Job Role</span>
                      <span className="font-bold text-slate-800">{gameState.selectedJob?.name}</span>
                    </div>
                    <div className="flex justify-between font-medium text-slate-600">
                      <span>Hours Worked</span>
                      <span className="font-bold text-slate-800">8.0 hrs</span>
                    </div>
                    <div className="h-[1px] bg-slate-100" />
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Gross Pay (Earnings)</span>
                      <span>${gameState.earnings}</span>
                    </div>
                    <div className="flex justify-between font-medium text-red-500 bg-red-50 px-2.5 py-1.5 rounded-lg mt-2">
                      <span>Deduction: Taxes (20%)</span>
                      <span>-${gameState.taxDeducted}</span>
                    </div>
                    <div className="h-[1px] bg-slate-200" />
                    <div className="flex justify-between font-bold text-base text-emerald-600 bg-emerald-50 px-2.5 py-2 rounded-lg">
                      <span>Net Pay (Take-Home)</span>
                      <span>${gameState.netPay}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-[11px] text-blue-800 leading-relaxed font-medium">
                    🔍 <strong>Take-Home Lesson:</strong> See how your paycheck gets smaller? Gross pay is the total you earned. Net pay is what you keep after Taxes are deducted to pay for public libraries, roads, and fire departments!
                  </div>
                </div>

                <button
                  id="m2-complete"
                  onClick={completeSimulation}
                  className="w-full max-w-xs mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Complete Lesson <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODULE 3: BUDGET GAME */}
        {module.id === "m3" && (
          <div className="space-y-6">
            {gameState.stage === "setup" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Organize Your $1,000 Budget Stipend</h3>
                    <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
                      Total Allocation: {gameState.needs + gameState.wants + gameState.savings}%
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* Needs Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 flex items-center gap-1.5">🍕 Needs (Food, Rent, Bills)</span>
                        <span className="text-blue-600">{gameState.needs}% (${gameState.needs * 10})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button id="minus-needs" onClick={() => handleBudgetChange("needs", -5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Minus className="w-4 h-4 text-slate-600" /></button>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${gameState.needs}%` }} />
                        </div>
                        <button id="plus-needs" onClick={() => handleBudgetChange("needs", 5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Plus className="w-4 h-4 text-slate-600" /></button>
                      </div>
                    </div>

                    {/* Wants Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 flex items-center gap-1.5">🎮 Wants (Games, Concerts, Fun)</span>
                        <span className="text-pink-600">{gameState.wants}% (${gameState.wants * 10})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button id="minus-wants" onClick={() => handleBudgetChange("wants", -5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Minus className="w-4 h-4 text-slate-600" /></button>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${gameState.wants}%` }} />
                        </div>
                        <button id="plus-wants" onClick={() => handleBudgetChange("wants", 5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Plus className="w-4 h-4 text-slate-600" /></button>
                      </div>
                    </div>

                    {/* Savings Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 flex items-center gap-1.5">🐷 Savings (Emergency Fund)</span>
                        <span className="text-emerald-600">{gameState.savings}% (${gameState.savings * 10})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button id="minus-savings" onClick={() => handleBudgetChange("savings", -5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Minus className="w-4 h-4 text-slate-600" /></button>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${gameState.savings}%` }} />
                        </div>
                        <button id="plus-savings" onClick={() => handleBudgetChange("savings", 5)} className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200"><Plus className="w-4 h-4 text-slate-600" /></button>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic text-center">
                    Pro-tip: Try the standard 50% Needs, 30% Wants, and 20% Savings!
                  </p>
                </div>

                <div className="text-center">
                  <button
                    id="simulate-budget"
                    disabled={gameState.needs + gameState.wants + gameState.savings !== 100}
                    onClick={simulateBudgetMonth}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all disabled:cursor-not-allowed text-sm"
                  >
                    {gameState.needs + gameState.wants + gameState.savings === 100
                      ? "Launch 'Life Happens' Month Simulation! 🚀"
                      : `Must equal exactly 100% (Current: ${gameState.needs + gameState.wants + gameState.savings}%)`}
                  </button>
                </div>
              </div>
            )}

            {gameState.stage === "results" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event list */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Monthly News Events</h4>
                    <div className="space-y-2">
                      {gameState.events?.map((ev: string, idx: number) => (
                        <div key={idx} className="bg-slate-50 border-l-4 border-amber-500 p-2.5 rounded-r-lg text-xs font-medium text-slate-700">
                          {ev}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Financial Result</h4>
                      <div className="mt-3 text-center py-4 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-xs text-slate-500 font-semibold">Remaining Saved Balance</p>
                        <p className={`text-2xl font-black ${gameState.survived ? "text-emerald-500" : "text-rose-500"} mt-1`}>
                          ${gameState.finalSavings}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-medium leading-relaxed">
                      {gameState.survived ? (
                        <div className="text-emerald-800 bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                          🎉 <strong>Survival Success!</strong> Your savings successfully buffered your emergency events! You finished the month with positive cash reserves. Wise budgeting!
                        </div>
                      ) : (
                        <div className="text-rose-800 bg-rose-50 border border-rose-100 p-3 rounded-lg">
                          ⚠️ <strong>Uh-oh!</strong> You didn't allocate enough savings, and the emergency cost drained you to $0! Try restarting and putting at least 20% into savings.
                        </div>
                      )}
                    </div>

                    {!gameState.survived && (
                      <button
                        id="retry-budget"
                        onClick={() => setGameState((prev: any) => ({ ...prev, stage: "setup" }))}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl transition-all"
                      >
                        Adjust & Try Again
                      </button>
                    )}
                  </div>
                </div>

                {gameState.survived && (
                  <button
                    id="m3-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Complete Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 4: SAVINGS & COMPOUND INTEREST */}
        {module.id === "m4" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sliders */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-800 text-sm">Savings Garden Controls</h3>
                
                {/* Monthly Add */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Monthly Contribution</span>
                    <span className="text-emerald-600">${gameState.monthlySavings}/mo</span>
                  </div>
                  <input
                    id="slider-savings"
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={gameState.monthlySavings || 50}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, monthlySavings: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Annual Interest Rate</span>
                    <span className="text-amber-600">{gameState.rate}% APR</span>
                  </div>
                  <input
                    id="slider-rate"
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={gameState.rate || 6}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, rate: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Age (Timeline Scrubber) */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Scrub Age (Timeline)</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">Age {gameState.age}</span>
                  </div>
                  <input
                    id="slider-age"
                    type="range"
                    min="12"
                    max="50"
                    step="1"
                    value={gameState.age || 12}
                    onChange={(e) => setGameState((prev: any) => ({ ...prev, age: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Start (12)</span>
                    <span>Adult (30)</span>
                    <span>Grown-up (50)</span>
                  </div>
                </div>
              </div>

              {/* Visual Compound Interest Money Tree */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-between min-h-[250px]">
                <h4 className="text-xs font-bold text-slate-400 uppercase self-start">The Growing Money Tree</h4>
                
                {/* SVG Visual Garden */}
                <div className="relative w-full h-40 flex items-end justify-center overflow-hidden">
                  {/* Sky/Ground details */}
                  <div className="absolute inset-x-0 bottom-0 h-4 bg-emerald-700/20 rounded-full blur-sm" />
                  
                  {/* The actual tree dynamically sizing */}
                  <svg className="w-full h-full max-w-[150px]" viewBox="0 0 100 100" preserveAspectRatio="xMidYEnd meet">
                    {/* Dirt block */}
                    <path d="M 10 95 C 30 90, 70 90, 90 95 L 90 100 L 10 100 Z" fill="#8B4513" opacity="0.3" />
                    {/* Trunk sizing up based on Age and Portfolio */}
                    <rect 
                      x={50 - Math.min(10, 2 + (gameState.age - 12) * 0.2)} 
                      y={95 - (gameState.age - 12) * 1.5} 
                      width={Math.min(20, 4 + (gameState.age - 12) * 0.4)} 
                      height={(gameState.age - 12) * 1.5} 
                      fill="#5C4033" 
                      rx="2"
                    />
                    {/* Leaves sizing based on Portfolio */}
                    {gameState.age > 13 && (
                      <circle 
                        cx="50" 
                        cy={95 - (gameState.age - 12) * 1.5} 
                        r={Math.min(30, 8 + (gameState.age - 12) * 0.7)} 
                        fill="#2E7D32" 
                        opacity="0.85" 
                      />
                    )}
                    {/* Coin fruits sizing/sprouting based on Interest ratio */}
                    {gameState.totalInterest > 50 && (
                      <>
                        <circle cx="45" cy={95 - (gameState.age - 12) * 1.6} r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                        <circle cx="55" cy={95 - (gameState.age - 12) * 1.4} r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                        {gameState.totalInterest > 500 && (
                          <>
                            <circle cx="35" cy={95 - (gameState.age - 12) * 1.3} r="3.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                            <circle cx="65" cy={95 - (gameState.age - 12) * 1.5} r="3.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                            <circle cx="50" cy={95 - (gameState.age - 12) * 1.9} r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
                          </>
                        )}
                      </>
                    )}
                  </svg>

                  {/* Sparkle effects on giant portfolio */}
                  {gameState.totalInterest > 2000 && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute text-yellow-400 text-xl top-8 right-12 select-none">✨</motion.div>
                  )}
                </div>

                {/* Numeric Results */}
                <div className="w-full grid grid-cols-2 gap-2 text-center text-xs mt-3">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold">YOUR CONTRIBUTIONS</p>
                    <p className="font-bold text-slate-700">${gameState.totalSaved}</p>
                  </div>
                  <div className="bg-yellow-50/50 p-2 rounded-lg border border-yellow-100">
                    <p className="text-[10px] text-amber-500 font-bold">INTEREST EARNED</p>
                    <p className="font-bold text-amber-600">${gameState.totalInterest}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explainer / Complete */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed font-medium">
                💰 <strong>Magical Compounding Summary:</strong> You saved <strong>${gameState.totalSaved}</strong>, but because of annual interest compounding, you earned an extra <strong>${gameState.totalInterest}</strong> for a total of <strong>${gameState.totalPortfolio}</strong>! That's free money just for letting your savings grow!
              </div>
              <button
                id="m4-complete"
                onClick={completeSimulation}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                Complete Lesson <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* MODULE 5: COMPARISON SHOPPING */}
        {module.id === "m5" && (
          <div className="space-y-6">
            {gameState.stage === "chips" && (
              <div className="space-y-4">
                <div className="bg-purple-50 text-purple-900 px-4 py-3 rounded-xl border border-purple-100 text-xs font-semibold leading-relaxed">
                  🛒 <strong>Task 1: The Chip Dilemma!</strong> You need potato chips for a party. Which package represents the smartest bargain based on Unit Pricing (price-per-ounce)?
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand A */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🥔</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Super Crunch Chips (Brand A)</h4>
                      <p className="text-xs text-slate-500">12 oz bag</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$3.60 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.30 / oz</span>
                    </div>
                    <button
                      id="select-chips-a"
                      onClick={() => submitChips("A")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand A
                    </button>
                  </div>

                  {/* Brand B */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🥔🔥</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Mega Feast Crisps (Brand B)</h4>
                      <p className="text-xs text-slate-500">18 oz Giant bag</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$4.50 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.25 / oz</span>
                    </div>
                    <button
                      id="select-chips-b"
                      onClick={() => submitChips("B")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand B
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState.stage === "juice" && (
              <div className="space-y-4">
                <div className="bg-purple-50 text-purple-900 px-4 py-3 rounded-xl border border-purple-100 text-xs font-semibold leading-relaxed">
                  🛒 <strong>Task 2: Juice Boxes & Coupons!</strong> Grab beverages for the gang. One has a coupon discount. Let's find the best price-per-unit!
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand X */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🧃</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Splashtastic Juice (Brand X)</h4>
                      <p className="text-xs text-slate-500">8-Pack Carton</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-800 text-sm">$4.80 Total</span>
                      <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">$0.60 / pack</span>
                    </div>
                    <button
                      id="select-juice-x"
                      onClick={() => submitJuice("X")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand X
                    </button>
                  </div>

                  {/* Brand Y */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="bg-slate-100 h-24 rounded-lg flex items-center justify-center text-4xl shadow-inner">🧃✨</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Orchard Bliss Juice (Brand Y)</h4>
                      <p className="text-xs text-slate-500">12-Pack Family Box</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="line-through text-slate-400 text-xs">$6.00</span>
                        <span className="font-bold text-slate-800 text-sm ml-1.5">$4.80 Total</span>
                      </div>
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                        $0.40 / pack (with $1.20 coupon)
                      </span>
                    </div>
                    <button
                      id="select-juice-y"
                      onClick={() => submitJuice("Y")}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Select Brand Y (with Coupon!)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameState.stage === "score" && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center space-y-4 max-w-md mx-auto">
                <span className="text-3xl">🕵️‍♂️</span>
                <h3 className="font-black text-slate-800 text-base">Shopping Report</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {gameState.feedback}
                </p>

                <button
                  id="m5-complete"
                  onClick={completeSimulation}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Collect Deal Rewards <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODULE 6: BANKING */}
        {module.id === "m6" && (
          <div className="space-y-6">
            {!gameState.checkApproved ? (
              <div className="space-y-4">
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 text-xs font-medium text-cyan-800">
                  🖋️ <strong>Virtual Check Writer:</strong> To deposit funds into your account, you must authorize a paper check to your savings fund. Fill out the check values correctly: <strong>Pay to: Finny's Arcade</strong>, <strong>Amount $: 150</strong>, and <strong>Amount in words: One Hundred Fifty</strong>.
                </div>

                {/* Check graphic */}
                <div className="bg-amber-50/70 rounded-2xl border-2 border-amber-200/60 p-5 font-serif max-w-md mx-auto space-y-4 relative shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="text-left">
                      <p className="text-[10px] font-bold tracking-wider text-amber-900/60 font-sans">FUTURE WEALTH HOLDER</p>
                      <p className="text-[8px] text-slate-500 font-sans">123 Savings Lane</p>
                    </div>
                    <div className="text-right text-[10px] text-slate-400 font-sans font-bold">CHECK #1001</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-2">
                    <label className="text-[10px] text-slate-600 uppercase font-sans font-bold text-left">Pay To:</label>
                    <input
                      id="check-payee"
                      type="text"
                      value={gameState.payee}
                      onChange={(e) => setGameState((prev: any) => ({ ...prev, payee: e.target.value }))}
                      placeholder="Finny's Arcade"
                      className="col-span-2 bg-transparent border-b border-slate-400 focus:outline-none focus:border-cyan-500 text-xs italic text-slate-800 font-bold"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-sans font-bold">$</span>
                      <input
                        id="check-amount"
                        type="text"
                        value={gameState.amountNum}
                        onChange={(e) => setGameState((prev: any) => ({ ...prev, amountNum: e.target.value }))}
                        placeholder="150"
                        className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs text-center focus:outline-none focus:border-cyan-500 text-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-2">
                    <label className="text-[10px] text-slate-600 uppercase font-sans font-bold text-left">Dollars:</label>
                    <input
                      id="check-amount-words"
                      type="text"
                      value={gameState.amountWords}
                      onChange={(e) => setGameState((prev: any) => ({ ...prev, amountWords: e.target.value }))}
                      placeholder="One Hundred Fifty"
                      className="col-span-3 bg-transparent border-b border-slate-400 focus:outline-none focus:border-cyan-500 text-xs italic text-slate-800 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-end pt-2">
                    <div>
                      <p className="text-[8px] font-sans font-bold text-slate-400">MEMO: Arcade Tokens</p>
                    </div>
                    <div className="border-b border-slate-400">
                      <input
                        id="check-sig"
                        type="text"
                        value={gameState.signature}
                        onChange={(e) => setGameState((prev: any) => ({ ...prev, signature: e.target.value }))}
                        placeholder="Sign Your Name"
                        className="w-full bg-transparent focus:outline-none focus:border-cyan-500 text-xs text-center italic text-slate-800 font-bold font-serif"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 text-[7px] text-slate-500 font-mono mt-4 border-t border-slate-100 pt-2 tracking-wider">
                    <span>⑆ 123456789 ⑆</span>
                    <span>9876543210 ⑆</span>
                    <span>1001</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    id="submit-check-btn"
                    onClick={submitCheck}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all text-xs"
                  >
                    Submit check to teller 🏦
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ATM simulator */}
                <div className="bg-slate-800 text-white rounded-2xl p-6 border-4 border-slate-600 max-w-sm mx-auto shadow-xl font-mono text-center space-y-4">
                  <div className="bg-green-950 text-emerald-400 p-4 rounded-lg border border-green-800 min-h-[100px] flex flex-col justify-between text-left shadow-inner">
                    <p className="text-[10px] text-emerald-500 font-bold">ATM TERMINAL #808</p>
                    <div className="my-2">
                      <p className="text-xs">Checking: <span className="font-bold">${gameState.checkingBalance}</span></p>
                      <p className="text-xs">Cash Wallet: <span className="font-bold">${gameState.cashWallet}</span></p>
                    </div>
                    <p className="text-[10px] text-emerald-600 italic">
                      {gameState.atmStage === "insert" && "Check deposited! Insert Card to access."}
                      {gameState.atmStage === "withdraw" && "Cash deposit available. Select Action below."}
                      {gameState.atmStage === "done" && "Withdrawal successful! Receipt issued."}
                    </p>
                  </div>

                  {/* Dynamic buttons */}
                  <div className="space-y-3 pt-2">
                    {gameState.atmStage === "insert" && (
                      <button
                        id="atm-action-deposit"
                        onClick={performATMDeposit}
                        className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-xs font-bold py-2 rounded-lg transition-all"
                      >
                        Deposit $50 Cash Gift
                      </button>
                    )}
                    {gameState.atmStage === "withdraw" && (
                      <button
                        id="atm-action-withdraw"
                        onClick={performATMWithdraw}
                        className="w-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-xs font-bold py-2 rounded-lg transition-all"
                      >
                        Withdraw $20 for Lunch
                      </button>
                    )}
                    {gameState.atmStage === "done" && (
                      <div className="bg-green-900/30 text-emerald-400 p-3 rounded-lg border border-green-800 text-[10px] leading-relaxed text-left">
                        🎉 Perfect! You successfully deposited a check, deposited cash, and made an ATM withdrawal. You understand standard banking transactions!
                      </div>
                    )}
                  </div>
                </div>

                {gameState.atmStage === "done" && (
                  <button
                    id="m6-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Complete Banking Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 7: THE DEBT TRAP */}
        {module.id === "m7" && (
          <div className="space-y-6">
            {gameState.stage === "select" && (
              <div className="space-y-4">
                <div className="bg-rose-50 text-rose-950 p-4 rounded-xl border border-rose-100 text-xs font-semibold leading-relaxed">
                  😈 <strong>The Debt Challenge:</strong> You want to buy a high-performance $1,000 Gaming PC on your brand new credit card. Choose your payoff strategy to see how interest rates work:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Plan A */}
                  <button
                    id="select-debt-plan-full"
                    onClick={() => chooseDebtPlan("full")}
                    className="bg-white border border-slate-200 hover:border-emerald-400 p-5 rounded-xl text-left shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">🛡️</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2">Plan A: Full Balance Paid</h4>
                    <p className="text-xs text-slate-500 mt-1">Pay the full $1,000 when the first bill arrives.</p>
                    <div className="mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-block">
                      0% Interest Paid • Safe!
                    </div>
                  </button>

                  {/* Plan B */}
                  <button
                    id="select-debt-plan-min"
                    onClick={() => chooseDebtPlan("minimum")}
                    className="bg-white border border-slate-200 hover:border-rose-400 p-5 rounded-xl text-left shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-2xl">🐉</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2">Plan B: Minimum Payment</h4>
                    <p className="text-xs text-slate-500 mt-1">Pay only the minimum $30 a month at 20% annual interest rate.</p>
                    <div className="mt-4 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md inline-block">
                      20% APR Interest • Dangerous!
                    </div>
                  </button>
                </div>
              </div>
            )}

            {gameState.stage === "simulate" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Simulation status */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      {gameState.plan === "full" ? "Strategy: Paid Full" : "Strategy: Minimum payments"}
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Original Purchase Price</span>
                        <span className="font-bold text-slate-800">$1,000</span>
                      </div>
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Time Elapsed</span>
                        <span className="font-bold text-slate-800">{gameState.months} months</span>
                      </div>
                      <div className="flex justify-between font-medium text-slate-600">
                        <span>Total Interest Paid</span>
                        <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">${gameState.totalInterestPaid}</span>
                      </div>
                      <div className="h-[1px] bg-slate-100" />
                      <div className="flex justify-between font-bold text-sm text-slate-800">
                        <span>Remaining Credit Card Debt</span>
                        <span className={gameState.debt > 0 ? "text-rose-600" : "text-emerald-600"}>${gameState.debt}</span>
                      </div>
                    </div>

                    {gameState.debt > 0 && (
                      <button
                        id="debt-fast-forward"
                        onClick={fastForwardDebt}
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 rounded-lg transition-all text-xs"
                      >
                        Fast-Forward 12 Months ⏩
                      </button>
                    )}
                  </div>

                  {/* Debt Monster Graphic */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-between min-h-[220px]">
                    <h4 className="text-xs font-bold text-slate-400 uppercase self-start">The Debt Monster</h4>
                    
                    <div className="text-center space-y-2 py-4">
                      {gameState.plan === "full" ? (
                        <>
                          <span className="text-5xl animate-bounce inline-block">🦎</span>
                          <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                            Cute Lizard: Your debt is $0! You tamed the credit danger immediately.
                          </p>
                        </>
                      ) : (
                        <>
                          <span 
                            className="text-5xl inline-block transition-all duration-500"
                            style={{ transform: `scale(${gameState.months > 0 ? 1.5 : 1.0})` }}
                          >
                            🐉
                          </span>
                          <p className="text-xs text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 leading-relaxed">
                            {gameState.months > 0 
                              ? `Giant Coin Dragon: Oh no! The Debt Monster grew! You paid $${gameState.totalInterestPaid} in interest and STILL owe $${gameState.debt}!`
                              : "Sleeping Dragon: It starts small, but interest compounding makes it grow fast!"
                            }
                          </p>
                        </>
                      )}
                    </div>

                    <button
                      id="reset-debt-sim"
                      onClick={() => setGameState((prev: any) => ({ ...prev, stage: "select" }))}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Restart comparison
                    </button>
                  </div>
                </div>

                {(gameState.plan === "full" || gameState.months >= 24) && (
                  <button
                    id="m7-complete"
                    onClick={completeSimulation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Finish Debt Lesson <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 8: ROCKET STOCKS */}
        {module.id === "m8" && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs font-medium text-indigo-800 flex justify-between items-center gap-4">
              <div>
                <strong>🚀 Stock Market Sim:</strong> Trade company shares, read the news events, and try to make a profit! Spreading your money across different companies is called <strong>Diversification</strong>.
              </div>
              <div className="bg-white border border-indigo-200 px-3 py-2 rounded-lg text-center shrink-0">
                <p className="text-[9px] text-slate-400 uppercase font-black">YOUR CAPITAL</p>
                <p className="text-sm font-black text-indigo-600">${gameState.portfolioValue}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trading desk */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-3 text-xs">
                    <span className="font-bold text-slate-500">Day: {gameState.day}/5</span>
                    <span className="font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border">Cash Wallet: ${gameState.cash}</span>
                  </div>

                  <div className="space-y-3">
                    {gameState.stocks?.map((stock: StockState) => {
                      const shareCount = gameState.shares[stock.symbol] || 0;
                      return (
                        <div key={stock.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 hover:bg-slate-100/50 p-3 rounded-xl border border-slate-100 gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-800 text-xs">{stock.name} ({stock.symbol})</span>
                              <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">Owned: {shareCount}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{stock.description}</p>
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center">
                            <span className="font-black text-sm text-indigo-600">${stock.price}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                id={`buy-${stock.symbol.toLowerCase()}`}
                                disabled={gameState.cash < stock.price}
                                onClick={() => buyStock(stock.id, stock.price)}
                                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white font-bold p-1 rounded-lg text-[10px] transition-all flex items-center justify-center w-6 h-6"
                              >
                                +
                              </button>
                              <button
                                id={`sell-${stock.symbol.toLowerCase()}`}
                                disabled={shareCount <= 0}
                                onClick={() => sellStock(stock.id, stock.price)}
                                className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 text-white font-bold p-1 rounded-lg text-[10px] transition-all flex items-center justify-center w-6 h-6"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* News / Sim progress */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Live Market Feed</h4>
                  <div className="bg-indigo-950 text-indigo-200 rounded-lg p-3 text-xs font-mono min-h-[90px] border border-indigo-900 leading-relaxed shadow-inner">
                    ⚡ {gameState.news}
                  </div>
                </div>

                {gameState.day < 5 ? (
                  <button
                    id="stock-next-day"
                    onClick={advanceStockDay}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    Next Trading Day <ArrowRight className="w-4 h-4 animate-pulse" />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-100 text-xs font-medium">
                      🏁 5-Day Simulation Complete! You completed your stock market experience!
                    </div>
                    <button
                      id="m8-complete"
                      onClick={completeSimulation}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 text-xs"
                    >
                      Finish Trading Lesson <Check className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 9: TAXES AT WORK */}
        {module.id === "m9" && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs font-medium text-indigo-800">
              🏗️ <strong>Taxes at Work:</strong> You have <strong>$200 of paycheck tax dollars</strong> in your fund. Allocate them to essential city departments below, and watch your virtual town blossom with color and activity!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Allocation Desk */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-slate-800 text-sm">City Finance Desk</h4>
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                    Remaining Tax: ${gameState.remainingTax}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Public Schools */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">📚 Public Schools</p>
                      <p className="text-[10px] text-slate-400">Funds textbooks, desks, and schools ($100)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-schools"
                        disabled={gameState.allocated?.schools <= 0}
                        onClick={() => allocateTax("schools", -100)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.schools}</span>
                      <button
                        id="tax-plus-schools"
                        disabled={gameState.remainingTax < 100}
                        onClick={() => allocateTax("schools", 100)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Public Parks */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🌲 City Parks & Trees</p>
                      <p className="text-[10px] text-slate-400">Plants local trees and playgrounds ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-parks"
                        disabled={gameState.allocated?.parks <= 0}
                        onClick={() => allocateTax("parks", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.parks}</span>
                      <button
                        id="tax-plus-parks"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("parks", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Roads & Bridges */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🛣️ Roads & Bridges</p>
                      <p className="text-[10px] text-slate-400">Repairs potholes and city highways ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-roads"
                        disabled={gameState.allocated?.roads <= 0}
                        onClick={() => allocateTax("roads", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.roads}</span>
                      <button
                        id="tax-plus-roads"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("roads", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Firefighters */}
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700">🚒 Fire & Safety</p>
                      <p className="text-[10px] text-slate-400">Supports engines and fire protection ($50)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        id="tax-minus-fire"
                        disabled={gameState.allocated?.fire <= 0}
                        onClick={() => allocateTax("fire", -50)}
                        className="bg-slate-200 hover:bg-slate-300 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-12 text-center">${gameState.allocated?.fire}</span>
                      <button
                        id="tax-plus-fire"
                        disabled={gameState.remainingTax < 50}
                        onClick={() => allocateTax("fire", 50)}
                        className="bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-40 p-1.5 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual City sandbox */}
              <div className="bg-slate-900 border-2 border-slate-800 rounded-xl p-5 shadow-inner flex flex-col items-center justify-center text-center space-y-4 text-white min-h-[250px] relative">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase absolute top-4 left-4">City Grid</span>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
                  <div className={`p-4 rounded-xl border border-slate-800/80 transition-all ${gameState.allocated?.schools > 0 ? "bg-blue-900/40 border-blue-500 text-2xl" : "bg-slate-800/20 text-slate-600 text-xl"}`}>
                    🏫 {gameState.allocated?.schools > 0 ? "School Active!" : "Locked"}
                  </div>
                  <div className={`p-4 rounded-xl border border-slate-800/80 transition-all ${gameState.allocated?.parks > 0 ? "bg-emerald-900/40 border-emerald-500 text-2xl" : "bg-slate-800/20 text-slate-600 text-xl"}`}>
                    🌲 {gameState.allocated?.parks > 0 ? "Park Planted!" : "Locked"}
                  </div>
                  <div className={`p-4 rounded-xl border border-slate-800/80 transition-all ${gameState.allocated?.roads > 0 ? "bg-amber-900/40 border-amber-500 text-2xl" : "bg-slate-800/20 text-slate-600 text-xl"}`}>
                    🛣️ {gameState.allocated?.roads > 0 ? "Road Paved!" : "Locked"}
                  </div>
                  <div className={`p-4 rounded-xl border border-slate-800/80 transition-all ${gameState.allocated?.fire > 0 ? "bg-rose-900/40 border-rose-500 text-2xl" : "bg-slate-800/20 text-slate-600 text-xl"}`}>
                    🚒 {gameState.allocated?.fire > 0 ? "Fire Station!" : "Locked"}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  {gameState.remainingTax === 0 
                    ? "🎉 Fantastic! All tax dollars invested! The city is fully funded and prosperous!"
                    : `Please allocate the remaining $${gameState.remainingTax} tax dollars.`}
                </p>
              </div>
            </div>

            {gameState.remainingTax === 0 && (
              <button
                id="m9-complete"
                onClick={completeSimulation}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                Complete Lesson <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* MODULE 10: GIVING & CHARITY */}
        {module.id === "m10" && (
          <div className="space-y-6">
            <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-xs font-medium text-pink-800">
              💖 <strong>The Community Spark:</strong> Give back! Choose a worthy local charity to donate your real accumulated virtual Fin-Coins to. Each donation helps upgrade our local neighborhood assets!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Charity A */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🐶</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Animal Shelter</h4>
                  <p className="text-[11px] text-slate-500">Rescues puppies and kitties.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.shelterDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-shelter-20"
                    onClick={() => donateCoins("shelter", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-shelter-50"
                    onClick={() => donateCoins("shelter", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>

              {/* Charity B */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🍎</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Community Food Bank</h4>
                  <p className="text-[11px] text-slate-500">Feeds families in need.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.foodBankDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-food-20"
                    onClick={() => donateCoins("foodBank", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-food-50"
                    onClick={() => donateCoins("foodBank", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>

              {/* Charity C */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between text-center space-y-3">
                <span className="text-4xl">🌲</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Eco Conservation</h4>
                  <p className="text-[11px] text-slate-500">Plants trees and saves wildlife.</p>
                  <p className="text-xs font-bold text-pink-600 mt-2">Donated: {gameState.forestDonated || 0} Coins</p>
                </div>
                <div className="flex gap-1">
                  <button
                    id="donate-eco-20"
                    onClick={() => donateCoins("forest", 20)}
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 20 🪙
                  </button>
                  <button
                    id="donate-eco-50"
                    onClick={() => donateCoins("forest", 50)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-bold py-1.5 rounded-lg transition-all"
                  >
                    Give 50 🪙
                  </button>
                </div>
              </div>
            </div>

            {gameState.badgeEarned && (
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-xs font-medium text-center">
                  🌟 <strong>Generosity Unleashed!</strong> You've donated a total of <strong>{gameState.spentCoins} Fin-Coins</strong> to critical civic sectors! You make our community a better place.
                </div>
                <button
                  id="m10-complete"
                  onClick={completeSimulation}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Complete Giving Lesson <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
