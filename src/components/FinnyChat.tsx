import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, Sparkle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function FinnyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hoot hoot! I am Finny, your wise financial owl companion! 🦉 Ask me any money questions you have, or select one of the ideas below! Whooo's ready to learn?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    "What is compound interest?",
    "Explain the 50/30/20 rule",
    "How do stock markets work?",
    "Why are taxes taken from paychecks?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const getLocalFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("compound") || q.includes("interest") || q.includes("money tree") || q.includes("sprout")) {
      return "Hoot hoot! Compound interest is like a magic seed! 🌰 When you put money in a savings account, the bank pays you extra money (interest). Then, next year, you earn interest on your original money AND on the interest you just earned! It grows bigger and bigger like a magical snowball! ❄️🦉";
    }
    if (q.includes("50/30/20") || q.includes("budget") || q.includes("needs") || q.includes("wants")) {
      return "Whooo wants to budget? The 50/30/20 rule is a super-smart piggy bank recipe! 🐷 50% goes to survival NEEDS (like rent and groceries), 30% goes to fun WANTS (like video games and candy), and 20% goes straight to SAVINGS for your future adventures! It keeps your budget safe and sound! 📚";
    }
    if (q.includes("stock") || q.includes("market") || q.includes("invest") || q.includes("share")) {
      return "Stocks are tiny little puzzle pieces of a real company! 📈 When you buy a share, you own a tiny sliver of that company (like Apple or Disney). If the company does well, your puzzle piece becomes more valuable! But remember, companies can have tough days too, so don't put all your acorns in one basket! 🦉";
    }
    if (q.includes("tax") || q.includes("paycheck") || q.includes("deduction") || q.includes("fcia") || q.includes("fica")) {
      return "Hoot! Taxes are small contributions taken from paychecks to fund our community! 🏫 They pay for public libraries, beautiful parks, fire trucks, schools, and roads that everyone gets to use. It's like everyone pooling their money to make our city a wonderful place to live! 🌳🚒";
    }
    if (q.includes("save") || q.includes("piggy") || q.includes("allowance")) {
      return "Saving is the ultimate financial superpower! 🦸‍♂️ Instead of spending your allowance right away, putting it in a safe bank account helps you buy bigger, cooler things later (like a new bike or a cool mascot hat!). Wise owls always save first, then spend what is left! 🦉💸";
    }
    if (q.includes("credit") || q.includes("debt") || q.includes("borrow") || q.includes("card")) {
      return "A credit card is NOT free money! 💳 It's a short-term loan from a bank. If you buy a toy with a credit card, you must pay the bank back at the end of the month. If you don't, they will charge you extra penalty coins called 'interest'! Wise owls use credit cards very carefully and pay them off fully! 🦉✨";
    }
    if (q.includes("bank") || q.includes("check") || q.includes("debit")) {
      return "Banks are high-tech safety vaults for your wealth! 🏦 A checking account lets you spend money easily with a plastic debit card, while a check is a paper promise to pay someone. Debit cards take money right out of your account, so never spend more than you actually have! 🔑";
    }
    if (q.includes("give") || q.includes("donate") || q.includes("charity") || q.includes("philanthr")) {
      return "Philanthropy is a big, fancy word that just means 'loving and helping humans'! ❤️ When you donate coins, old toys, or volunteer your time at a shelter, you are making the world happier. Sharing a little bit of your wealth is a beautiful habit that brings immense joy! 🌟";
    }
    if (q.includes("barter") || q.includes("origin") || q.includes("cash") || q.includes("history")) {
      return "Long ago, before coins or cash, people traded items directly—like trading 3 apples for 1 fish! 🍎🐟 This was called bartering. But it was hard to find people who wanted exactly what you had! So, society invented money as a standard, light, durable counter that everyone trusts! 💰";
    }
    if (q.includes("earn") || q.includes("job") || q.includes("career") || q.includes("salary")) {
      return "Earning is how you turn your talents into coins! 💼 By learning special skills (like coding, medical science, teaching, or art), you can pursue amazing careers. The more specialized your skills are, the more coins you can earn to fund your dreams! What career do you want to explore? 🦉🎨";
    }

    return "That's a spectacular financial question! 🦉 As your wise guide, my main advice is: (1) Always save a little of every coin you earn, (2) avoid expensive debt traps, and (3) keep learning! What other money secrets would you like to uncover today? ✨";
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // If running statically on GitHub Pages, directly use local response to bypass server dependency
    const isStaticHost = window.location.hostname.endsWith("github.io") || window.location.hostname.includes("localhost") === false && window.location.hostname.includes(".run") === false;

    if (isStaticHost) {
      setTimeout(() => {
        const fallbackText = getLocalFallbackResponse(textToSend);
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fallbackText,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setLoading(false);
      }, 750);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Hoot! Something went wrong on my flight. Let's try again in a second!",
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackText = getLocalFallbackResponse(textToSend);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallbackText || "Oops! My internet wings had a little trouble. But remember: saving money early is always a smart hoot! 🦉 Feel free to try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="finny-trigger"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all border border-amber-400 group"
          >
            <span className="text-2xl">🦉</span>
            <span className="font-semibold text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
              Ask Finny!
            </span>
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="finny-chatbox"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦉</span>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Finny the Wise Owl</h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-100 font-medium">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-200" />
                    AI Money Guide • Online
                  </div>
                </div>
              </div>
              <button
                id="close-finny"
                onClick={() => setIsOpen(false)}
                className="text-amber-100 hover:text-white transition-colors p-1 hover:bg-amber-600/50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-amber-500 text-white rounded-br-none font-medium shadow-sm"
                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                    <span className="text-lg animate-bounce">🦉</span>
                    <span className="text-xs text-slate-400 font-medium italic">Finny is writing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-slate-100 bg-white space-y-1.5">
                <p className="text-xs text-slate-400 font-medium px-1 flex items-center gap-1">
                  <Sparkle className="w-3 h-3 text-amber-500" /> Suggestions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      id={`suggest-${prompt.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-amber-200 transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center"
            >
              <input
                id="finny-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me a money question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-400 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
              />
              <button
                id="send-to-finny"
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 text-white p-2 rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
