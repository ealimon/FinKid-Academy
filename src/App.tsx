import React, { useState, useEffect } from "react";
import { 
  Coins, Award, BookOpen, Star, RefreshCw, Sparkles, ChevronRight, CheckCircle,
  GraduationCap, Play, Lock, AlertCircle, Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { MODULES } from "./data";
import { UserProgress } from "./types";
import ModuleInteractive from "./components/modules/ModuleInteractive";
import ModuleQuiz from "./components/ModuleQuiz";
import AvatarCustomizer from "./components/AvatarCustomizer";
import FinnyChat from "./components/FinnyChat";
import ModuleWorksheet from "./components/ModuleWorksheet";
import StreakModal from "./components/StreakModal";
import { 
  evaluateUserStreakOnLoad, 
  recordActivityForToday, 
  getCurrentWeekDays 
} from "./utils/streakUtils";

const STORAGE_KEY = "finance_quest_academy_progress";

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  coins: 100, // Start with a 100 coin sign-up bonus!
  level: 1,
  completedModules: [],
  badges: [],
  unlockedAvatarItems: [],
  equippedAvatarItems: {},
  streakCount: 0,
  longestStreak: 0,
  streakFreezes: 1,
  streakCalendar: [],
  activityDates: []
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<"modules" | "badges" | "avatar">("modules");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>("m1");
  const [workspaceTab, setWorkspaceTab] = useState<"game" | "worksheet">("game");
  const [moduleStage, setModuleStage] = useState<"intro" | "game" | "quiz" | "complete">("intro");
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  // Load progress from LocalStorage on mount & evaluate streak
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let loadedProgress = DEFAULT_PROGRESS;

    if (saved) {
      try {
        loadedProgress = { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to load user progress:", e);
      }
    }

    // Run real daily date streak evaluation
    const { updatedProgress, notificationMessage } = evaluateUserStreakOnLoad(loadedProgress);
    setProgress(updatedProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));

    if (notificationMessage) {
      console.log("Streak status update:", notificationMessage);
    }
  }, []);

  // Save progress changes
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const handleUpdateProgress = (updates: Partial<UserProgress>) => {
    const updated = { ...progress, ...updates };
    saveProgress(updated);
  };

  const handleResetProgress = () => {
    if (window.confirm("Hoot! Are you sure you want to reset your academy learning history, unlocked coins, and accessories? This cannot be undone!")) {
      saveProgress(DEFAULT_PROGRESS);
      setSelectedModuleId("m1");
      setWorkspaceTab("game");
      setModuleStage("intro");
      setActiveTab("modules");
    }
  };

  // Helper to calculate next level threshold
  const getXpThreshold = (lvl: number) => lvl * 200;

  const handleEarnRewards = (earnedCoins: number, earnedXp: number) => {
    let newXp = progress.xp + earnedXp;
    let newCoins = progress.coins + earnedCoins;
    let newLevel = progress.level;

    while (newXp >= getXpThreshold(newLevel)) {
      newXp -= getXpThreshold(newLevel);
      newLevel += 1;
    }

    handleUpdateProgress({
      xp: newXp,
      coins: newCoins,
      level: newLevel
    });
  };

  const activeModule = MODULES.find(m => m.id === selectedModuleId);

  const handleModuleStageTransition = (stage: "intro" | "game" | "quiz" | "complete") => {
    setModuleStage(stage);
  };

  const handleFinishQuiz = () => {
    if (!activeModule) return;

    const isAlreadyCompleted = progress.completedModules.includes(activeModule.id);
    const updatedCompleted = isAlreadyCompleted 
      ? progress.completedModules 
      : [...progress.completedModules, activeModule.id];

    const isBadgeAlreadyOwned = progress.badges.includes(activeModule.badge.id);
    const updatedBadges = isBadgeAlreadyOwned 
      ? progress.badges 
      : [...progress.badges, activeModule.badge.id];

    // Record today's activity in streak engine
    const { updatedProgress: streakProgress, milestoneCoinsBonus } = recordActivityForToday(progress);

    // Accumulate rewards
    let newXp = streakProgress.xp + activeModule.xpReward;
    let newCoins = streakProgress.coins + activeModule.coinReward + milestoneCoinsBonus;
    let newLevel = streakProgress.level;

    while (newXp >= getXpThreshold(newLevel)) {
      newXp -= getXpThreshold(newLevel);
      newLevel += 1;
    }
    
    saveProgress({
      ...streakProgress,
      xp: newXp,
      coins: newCoins,
      level: newLevel,
      completedModules: updatedCompleted,
      badges: updatedBadges
    });

    setModuleStage("complete");
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-yellow-200">
      
      {/* HEADER SECTION */}
      <header className="bg-white rounded-3xl p-4 shadow-[0_8px_0_0_#e0f2fe] border-2 border-sky-100 mb-8 sticky top-0 z-40 max-w-7xl mx-auto w-full mt-4">
        <div className="px-4 py-1 flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-inner text-2xl">
              <span>🦉</span>
            </div>
            <div className="text-left">
              <h1 className="font-black text-2xl text-sky-900 tracking-tight leading-none font-display flex items-center gap-1.5">
                FINKID ACADEMY
                <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              </h1>
              <p className="text-sm font-black text-sky-400 uppercase tracking-widest font-display">Adventure Mode</p>
            </div>
          </div>

          {/* Gamified Stat Meters */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Level & XP */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-sky-800 uppercase font-display">Lvl {progress.level}</span>
                <div className="w-48 h-3 bg-sky-100 rounded-full overflow-hidden border-2 border-sky-50">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500" 
                    style={{ width: `${(progress.xp / getXpThreshold(progress.level)) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-xs font-bold text-sky-400 font-mono">{progress.xp} / {getXpThreshold(progress.level)} XP</p>
            </div>

            {/* Coins Balance */}
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200 shadow-sm">
              <span className="text-lg">🪙</span>
              <span className="font-black text-yellow-700 font-display text-base">{progress.coins} Coins</span>
            </div>

            {/* Streak count 🔥 */}
            <button
              id="streak-header-btn"
              onClick={() => setIsStreakModalOpen(true)}
              className="flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-2xl border-2 border-rose-200 shadow-sm hover:bg-rose-200/80 active:scale-95 transition-all cursor-pointer relative group"
            >
              <span className="text-lg animate-pulse">🔥</span>
              <span className="font-black text-rose-700 font-display text-base">
                {progress.streakCount ?? 3} Days
              </span>
              <span className="absolute -bottom-8 right-0 bg-rose-800 text-white text-[10px] font-black py-0.5 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                View Streak Calendar! 📅
              </span>
            </button>

            {/* Profile Avatar */}
            <div className="w-12 h-12 rounded-full border-4 border-white shadow-md bg-indigo-400 overflow-hidden flex items-center justify-center text-white font-black font-display text-sm select-none">
              FK
            </div>

            {/* Reset Stats */}
            <button
              id="reset-stats-btn"
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-500 p-2 rounded-xl hover:bg-slate-100 transition-colors"
              title="Reset All Progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-8">
        
        {/* APP TABS BAR */}
        <div className="flex bg-sky-100/80 p-1.5 rounded-2xl border-2 border-sky-200/50 max-w-md mx-auto shadow-sm">
          <button
            id="tab-modules"
            onClick={() => { setSelectedModuleId("m1"); setWorkspaceTab("game"); setActiveTab("modules"); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all font-display ${activeTab === "modules" ? "bg-white text-sky-900 shadow-md border-b-4 border-sky-400" : "text-sky-500 hover:text-sky-800"}`}
          >
            LESSONS 📚
          </button>
          <button
            id="tab-badges"
            onClick={() => { setActiveTab("badges"); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all font-display ${activeTab === "badges" ? "bg-white text-sky-900 shadow-md border-b-4 border-sky-400" : "text-sky-500 hover:text-sky-800"}`}
          >
            BADGES RACK 🏅
          </button>
          <button
            id="tab-avatar"
            onClick={() => { setActiveTab("avatar"); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black tracking-wider transition-all font-display ${activeTab === "avatar" ? "bg-white text-sky-900 shadow-md border-b-4 border-sky-400" : "text-sky-500 hover:text-sky-800"}`}
          >
            MASCOT SHOP 👕
          </button>
        </div>

        {/* TAB 1: CURRICULUM MODULES */}
        {activeTab === "modules" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Sidebar list of 10 modules */}
            <div className="lg:col-span-4 bg-white rounded-[2rem] p-5 border-2 border-sky-100 shadow-[0_8px_0_0_#e0f2fe] space-y-4">
              <div className="border-b-2 border-dashed border-sky-100 pb-3">
                <h3 className="font-black text-sky-900 text-lg font-display flex items-center justify-between">
                  <span>Interactive Learning</span>
                  <span className="text-sm bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full font-mono">
                    {progress.completedModules.length}/10 Done
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Select any module below to start playing or solving worksheets immediately!</p>
              </div>

              {/* Daily Streak Challenge Card */}
              <div 
                onClick={() => setIsStreakModalOpen(true)}
                className="bg-gradient-to-r from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 border-2 border-rose-100 hover:border-rose-200 rounded-3xl p-4 shadow-sm cursor-pointer transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl filter drop-shadow animate-pulse">🔥</span>
                    <div className="text-left">
                      <p className="text-xs font-black text-rose-500 uppercase tracking-widest leading-none">DAILY STREAK</p>
                      <h4 className="font-black text-rose-900 text-base font-display mt-0.5">
                        {progress.streakCount ?? 0} Day{(progress.streakCount ?? 0) === 1 ? "" : "s"} Hot!
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-rose-500 hover:bg-rose-600 text-white px-2.5 py-1 rounded-xl uppercase tracking-wider group-hover:scale-105 transition-all shadow-sm">
                    View 📅
                  </span>
                </div>
                <div className="mt-3 flex gap-1 justify-between text-center">
                  {getCurrentWeekDays().map(({ dayName, dateStr, isToday }) => {
                    const active = (progress.activityDates ?? []).includes(dateStr) || (progress.streakCalendar ?? []).includes(dayName);
                    return (
                      <div key={dateStr} className="flex-1">
                        <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                          active 
                            ? "bg-rose-500 text-white shadow-sm" 
                            : isToday 
                            ? "bg-amber-200 text-amber-900 border border-amber-400 font-bold" 
                            : "bg-slate-100 text-slate-400 border border-slate-200/60"
                        }`}>
                          {active ? "🔥" : dayName[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                {MODULES.map((mod, idx) => {
                  const isCompleted = progress.completedModules.includes(mod.id);
                  const isSelected = mod.id === selectedModuleId;

                  // Category color mappings
                  let catIcon = "🏦";
                  if (mod.category === "earning") {
                    catIcon = "💼";
                  } else if (mod.category === "spending") {
                    catIcon = "🛒";
                  } else if (mod.category === "saving") {
                    catIcon = "🐷";
                  } else if (mod.category === "investing") {
                    catIcon = "📈";
                  }

                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setSelectedModuleId(mod.id);
                        setModuleStage("intro");
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-sky-500 border-sky-600 text-white shadow-[0_4px_0_0_#0284c7] -translate-y-0.5"
                          : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                          isSelected ? "bg-white text-sky-600" : "bg-white border border-slate-200 shadow-sm"
                        }`}>
                          <span>{catIcon}</span>
                        </div>
                        <div className="min-w-0 text-left">
                          <p className={`text-xs font-black uppercase tracking-wider ${isSelected ? "text-sky-100" : "text-slate-400"}`}>
                            Module {idx + 1}
                          </p>
                          <p className="text-sm font-black truncate leading-tight font-display">
                            {mod.title}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isCompleted ? (
                          <span className={`text-xs font-black uppercase tracking-wider px-2 py-1 rounded-lg flex items-center gap-1 ${
                            isSelected ? "bg-white text-emerald-600" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            Done
                          </span>
                        ) : (
                          <span className={`text-xs font-black uppercase tracking-wider px-2 py-1 rounded-lg flex items-center gap-1 ${
                            isSelected ? "bg-sky-400 text-white border border-sky-300" : "bg-yellow-400 text-yellow-950"
                          }`}>
                            Play
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Active workspace area */}
            <div className="lg:col-span-8 space-y-6">
              {activeModule ? (
                <div className="space-y-6">
                  
                  {/* WORKSPACE HEADER CARD */}
                  <div className="bg-white border-2 border-sky-100 rounded-[2rem] p-5 shadow-[0_8px_0_0_#e0f2fe] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5 text-left">
                      <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner border border-sky-50">
                        <span>
                          {activeModule.category === "basics" ? "🏦" :
                           activeModule.category === "earning" ? "💼" :
                           activeModule.category === "spending" ? "🛒" :
                           activeModule.category === "saving" ? "🐷" : "📈"}
                        </span>
                      </div>
                      <div>
                        <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                          activeModule.category === "basics" ? "bg-cyan-50 text-cyan-700 border border-cyan-100" :
                          activeModule.category === "earning" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                          activeModule.category === "spending" ? "bg-pink-50 text-pink-700 border border-pink-100" :
                          activeModule.category === "saving" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          "bg-violet-50 text-violet-700 border border-violet-100"
                        }`}>
                          {activeModule.category}
                        </span>
                        <h2 className="text-xl font-black text-sky-900 mt-1 font-display leading-tight">{activeModule.title}</h2>
                        <p className="text-sm text-slate-500 font-semibold font-display leading-relaxed">{activeModule.subtitle}</p>
                      </div>
                    </div>

                    {/* TABS SELECTOR (Play Game vs Topic Worksheet) */}
                    <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
                      <button
                        onClick={() => setWorkspaceTab("game")}
                        className={`px-4 py-2 rounded-lg text-sm font-black flex items-center gap-1.5 transition-all font-display ${
                          workspaceTab === "game"
                            ? "bg-white text-sky-900 shadow-sm border-b-2 border-sky-400"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Play Game 🎮
                      </button>
                      <button
                        onClick={() => setWorkspaceTab("worksheet")}
                        className={`px-4 py-2 rounded-lg text-sm font-black flex items-center gap-1.5 transition-all font-display ${
                          workspaceTab === "worksheet"
                            ? "bg-sky-500 text-white shadow-sm border-b-2 border-sky-700"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Topic Worksheet 📝
                      </button>
                    </div>
                  </div>

                  {/* MAIN CONTENT CONTAINER */}
                  <div className="transition-all duration-300">
                    {workspaceTab === "worksheet" ? (
                      <ModuleWorksheet
                        moduleId={activeModule.id}
                        moduleTitle={activeModule.title}
                        moduleSubtitle={activeModule.subtitle}
                        moduleCategory={activeModule.category}
                      />
                    ) : (
                      /* PLAY GAME SUB-STAGES FLOW */
                      <div className="space-y-6">
                        
                        {/* MODULE SUB-STAGES CHIPS */}
                        <div className="bg-white border-2 border-sky-100 rounded-2xl p-2.5 shadow-[0_4px_0_0_#e0f2fe] flex flex-col sm:flex-row items-center justify-between gap-1.5">
                          {[
                            { id: "intro", label: "1. Tutorial Book 📖" },
                            { id: "game", label: "2. Interactive Game 🎮" },
                            { id: "quiz", label: "3. Evaluation 🧠" },
                            { id: "complete", label: "4. Claim Badges 🎉" }
                          ].map((stg) => {
                            const isActive = moduleStage === stg.id;
                            const isPassed = 
                              (moduleStage === "game" && stg.id === "intro") ||
                              (moduleStage === "quiz" && ["intro", "game"].includes(stg.id)) ||
                              (moduleStage === "complete" && ["intro", "game", "quiz"].includes(stg.id));

                            return (
                              <div
                                key={stg.id}
                                className={`flex-1 py-1.5 px-3 rounded-xl text-xs md:text-sm font-black text-center transition-all w-full sm:w-auto font-display ${
                                  isActive 
                                    ? "bg-sky-500 text-white shadow-[0_3px_0_0_#0284c7] border border-sky-400" 
                                    : isPassed 
                                    ? "bg-green-100 text-green-700 border border-green-200" 
                                    : "text-sky-300 bg-sky-50/50 border border-transparent"
                                }`}
                              >
                                {stg.label}
                              </div>
                            );
                          })}
                        </div>

                        {/* ACTIVE SCREEN STAGE */}
                        <div className="min-h-[400px]">
                          {moduleStage === "intro" && (
                            <div className="bg-white border-2 border-sky-100 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_0_0_#e0f2fe] space-y-6 text-left max-w-2xl mx-auto">
                              <div className="space-y-1 pb-4 border-b border-sky-100">
                                <span className="text-xs sm:text-sm font-black text-sky-700 bg-sky-100 border border-sky-200 px-3.5 py-1 rounded-full uppercase font-display">Interactive Guide Tutorial</span>
                                <h2 className="text-2xl sm:text-3xl font-black text-sky-900 mt-3 font-display">{activeModule?.title}</h2>
                                <p className="text-sm sm:text-base text-sky-500 font-bold uppercase font-display">{activeModule?.subtitle}</p>
                              </div>

                              <div className="space-y-4">
                                <div className="bg-sky-50/50 p-5 sm:p-6 rounded-2xl border border-sky-100 text-sm sm:text-base text-slate-800 leading-relaxed space-y-3.5 font-medium">
                                  <p className="font-bold text-sky-900 flex items-center gap-2 font-display text-base sm:text-lg">
                                    <GraduationCap className="w-5 h-5 text-yellow-500 shrink-0" /> Learning Core Concepts:
                                  </p>
                                  <p>
                                    Wealth is a master tool that makes society prosper. Understanding how to Earn, Budget, Save, Invest, and Donate prepares you for the ultimate financial quests in life!
                                  </p>
                                  <p>
                                    In this lesson, you will play a customized simulation. Tap the button below to start the game and get hands-on experience!
                                  </p>
                                </div>
                              </div>

                              <button
                                id="launch-interactive-game"
                                onClick={() => handleModuleStageTransition("game")}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black py-4 rounded-2xl shadow-lg border-b-4 border-yellow-600 active:translate-y-0.5 transition-all text-sm sm:text-base flex items-center justify-center gap-2 font-display uppercase tracking-wide"
                              >
                                Start Interactive Game! <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          )}

                          {moduleStage === "game" && activeModule && (
                            <ModuleInteractive
                              module={activeModule}
                              userCoins={progress.coins}
                              onComplete={() => handleModuleStageTransition("quiz")}
                            />
                          )}

                          {moduleStage === "quiz" && activeModule && (
                            <ModuleQuiz
                              module={activeModule}
                              onComplete={handleFinishQuiz}
                            />
                          )}

                          {moduleStage === "complete" && activeModule && (
                            <div className="bg-white border-2 border-emerald-300 rounded-[2rem] p-8 shadow-[0_8px_0_0_#a7f3d0] text-center space-y-6 max-w-md mx-auto">
                              <div className="relative inline-block">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-35 animate-bounce" />
                                <span className="text-7xl relative z-10">🦉🏅</span>
                              </div>

                              <div className="space-y-2">
                                <h2 className="text-2xl font-black text-sky-900 tracking-tight font-display">Lesson Mastered!</h2>
                                <p className="text-xs text-slate-500 font-medium">
                                  Congratulations! You've claimed the <strong>{activeModule.badge.title}</strong> badge! Keep up this amazing learning momentum!
                                </p>
                              </div>

                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-3 px-4 text-xs font-bold text-emerald-800 inline-block font-display">
                                +{activeModule.coinReward} Coins • +{activeModule.xpReward} XP Awarded!
                              </div>

                              <div className="flex gap-3">
                                <button
                                  id="dress-up-shop-btn"
                                  onClick={() => { setActiveTab("avatar"); }}
                                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black py-3.5 rounded-2xl shadow-md border-b-4 border-yellow-600 active:translate-y-0.5 transition-all text-xs font-display"
                                >
                                  Shop Mascot Closet 👕
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-sky-100 rounded-[2rem] p-12 text-center shadow-[0_8px_0_0_#e0f2fe] space-y-3">
                  <span className="text-5xl">🦉</span>
                  <h3 className="font-black text-sky-900 text-lg">No Active Lesson</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">Select a module from the Interactive Learning list on the left to start your wealth adventure!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: COLLECTIBLE BADGES GALLERY */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h2 className="text-2xl font-black text-sky-900 font-display">Your Badge Accomplishments</h2>
              <p className="text-xs text-sky-400 font-bold uppercase tracking-widest font-display">
                Unlocked {progress.badges.length} of {MODULES.length} Collectibles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {MODULES.map((mod) => {
                const isEarned = progress.badges.includes(mod.badge.id);
                return (
                  <div 
                    key={mod.badge.id}
                    className={`border-2 rounded-[2rem] p-5 text-center space-y-3 transition-all flex flex-col justify-between ${
                      isEarned 
                        ? "bg-white border-yellow-300 shadow-[0_8px_0_0_#fef08a] hover:shadow-[0_12px_0_0_#fef08a] hover:-translate-y-1 relative" 
                        : "bg-gray-100/40 border-dashed border-gray-300 opacity-60 select-none"
                    }`}
                  >
                    <div className="relative inline-block mx-auto">
                      {isEarned && (
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-25 animate-pulse" />
                      )}
                      <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl mx-auto shadow-sm ${
                        isEarned ? mod.badge.color : "bg-slate-200 border-slate-300 text-slate-400"
                      }`}>
                        {isEarned ? "🏅" : "🔒"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-slate-800 text-xs leading-tight font-display">{mod.badge.title}</h4>
                      <p className="text-[10px] text-sky-400 font-bold uppercase tracking-wide font-display">{mod.title.replace(/\d+\.\s+/, "")}</p>
                    </div>

                    <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 italic font-medium">
                      {isEarned ? mod.badge.description : "Locked. Pass this module evaluation to claim!"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MASCOT & AVATAR SHOP/WARDROBE */}
        {activeTab === "avatar" && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h2 className="text-2xl font-black text-sky-900 font-display">Customize Your Mascot</h2>
              <p className="text-xs text-sky-400 font-bold uppercase tracking-widest font-display">
                Fin-Coin Fashion Boutique
              </p>
            </div>

            <AvatarCustomizer 
              progress={progress} 
              onUpdateProgress={handleUpdateProgress} 
            />
          </div>
        )}

      </main>

      {/* STREAK CALENDAR MODAL */}
      <StreakModal 
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        progress={progress}
        onUpdateProgress={handleUpdateProgress}
      />

      {/* FLOATING CHAT COMPONENT */}
      <FinnyChat />

      {/* FOOTER */}
      <footer className="bg-white border-t-2 border-sky-100 py-6 mt-12 rounded-t-[2.5rem] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs text-sky-500 font-bold font-display gap-3">
          <p>© 2026 FINKID ACADEMY. Designed for future financial champions.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-yellow-500" /> FUN LEARNING</span>
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-indigo-500" /> PLAY GAMES</span>
            <span className="flex items-center gap-1"><Sparkle className="w-3.5 h-3.5 text-emerald-500" /> MASCOT REWARDS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
