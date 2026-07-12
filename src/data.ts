import { Module, AvatarItem } from "./types";

export const MODULES: Module[] = [
  {
    id: "m1",
    title: "The Origin of Money",
    subtitle: "From Bartering to Cash",
    description: "Discover why trading apples for a skateboard is so hard, and how cash, coins, and currency solved this ancient puzzle!",
    category: "basics",
    estimatedMinutes: 5,
    xpReward: 100,
    coinReward: 50,
    badge: {
      id: "b1",
      title: "Barter King",
      description: "Understood the double coincidence of wants and the power of currency.",
      icon: "Coins",
      color: "text-amber-500 bg-amber-50 border-amber-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the main problem with bartering (trading items directly)?",
        options: [
          "Items are always too clean to trade.",
          "You must find someone who has what you want AND wants what you have.",
          "Everyone only wants to trade for pet lizards."
        ],
        correctAnswerIndex: 1,
        explanation: "This is called the 'double coincidence of wants'. If you have apples and want a book, you have to find someone with a book who wants apples!"
      },
      {
        id: 2,
        question: "Why did societies start using metal coins instead of heavy items like cows or giant stones?",
        options: [
          "Coins are durable, easy to carry, and can be divided into smaller values.",
          "Coins can be eaten in an emergency.",
          "Cows were too quiet and boring to trade."
        ],
        correctAnswerIndex: 0,
        explanation: "Coins are lightweight, last forever, and have standard values, making trade extremely simple and efficient!"
      },
      {
        id: 3,
        question: "If you trade a pencil directly for an eraser, what is this exchange called?",
        options: [
          "Taxation",
          "Bartering",
          "Compounding"
        ],
        correctAnswerIndex: 1,
        explanation: "Trading goods or services directly without using money is called bartering."
      }
    ]
  },
  {
    id: "m2",
    title: "Careers & Income",
    subtitle: "Choose Your Path",
    description: "Explore different jobs, learn how salaries work, and understand the mystery of why your virtual paycheck gets smaller before you spend it!",
    category: "earning",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b2",
      title: "Career Architect",
      description: "Mastered career planning, paychecks, and gross vs. net income.",
      icon: "Briefcase",
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the difference between Gross Pay and Net Pay?",
        options: [
          "Gross Pay is your take-home cash; Net Pay is eaten by spiders.",
          "Gross Pay is what you earn before taxes; Net Pay is what you actually take home.",
          "Gross Pay is money earned on weekends; Net Pay is for weekdays."
        ],
        correctAnswerIndex: 1,
        explanation: "Gross Pay is the total money you earned. Net Pay is your actual take-home pay after taxes and other deductions are subtracted!"
      },
      {
        id: 2,
        question: "If you get paid an hourly wage, how do you earn more money on your paycheck?",
        options: [
          "Ask to work fewer hours.",
          "Work more hours or earn a higher rate per hour.",
          "Keep your fingers crossed and hope for the best."
        ],
        correctAnswerIndex: 1,
        explanation: "Hourly wages are calculated by multiplying your hourly rate by the number of hours you work. More hours = more money!"
      },
      {
        id: 3,
        question: "Why do some careers have higher average salaries than others?",
        options: [
          "Because those workers have longer names.",
          "They require specialized skills, higher levels of education, or are in very high demand.",
          "It is completely random."
        ],
        correctAnswerIndex: 1,
        explanation: "Jobs that require years of training, college degrees, or rare skills (like doctors or software engineers) tend to pay more to attract qualified people."
      }
    ]
  },
  {
    id: "m3",
    title: "Needs vs. Wants Budgeting",
    subtitle: "The Piggy Bank Challenge",
    description: "Learn the legendary 50/30/20 rule to divide your money so you can afford what you need, get what you want, and save for the future!",
    category: "spending",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b3",
      title: "Budget Boss",
      description: "Balanced a budget and survived the unexpected 'Life Happens' simulator.",
      icon: "PiggyBank",
      color: "text-green-500 bg-green-50 border-green-200"
    },
    quizzes: [
      {
        id: 1,
        question: "Which of these is a true 'Need'?",
        options: [
          "A brand new gaming console.",
          "Basic food, water, and safe shelter.",
          "Concert tickets to see your favorite band."
        ],
        correctAnswerIndex: 1,
        explanation: "Needs are things you absolutely require to survive. While games and concert tickets are fun, you don't need them to stay alive and healthy!"
      },
      {
        id: 2,
        question: "According to the popular 50/30/20 rule, where does the 30% of your budget go?",
        options: [
          "Wants (fun things, hobbies, and entertainment).",
          "Savings (future goals and emergencies).",
          "Needs (rent, groceries, utilities)."
        ],
        correctAnswerIndex: 0,
        explanation: "The 50/30/20 rule splits your money: 50% for Needs, 30% for Wants (fun items), and 20% for Savings!"
      },
      {
        id: 3,
        question: "If your bicycle tire pops and costs $25 to replace, what should you do?",
        options: [
          "Never ride a bike again.",
          "Use money from your Savings or Emergency Fund category.",
          "Buy 5 more bikes using a credit card."
        ],
        correctAnswerIndex: 1,
        explanation: "Unexpected expenses (like repairs) are exactly why we keep a Savings/Emergency fund, so we don't have to panic or go into debt!"
      }
    ]
  },
  {
    id: "m4",
    title: "Compound Interest Magic",
    subtitle: "Grow Your Money Tree",
    description: "Watch how a single dollar can snowball and multiply over time through compound interest. The ultimate financial superpower!",
    category: "saving",
    estimatedMinutes: 5,
    xpReward: 110,
    coinReward: 55,
    badge: {
      id: "b4",
      title: "Savings Botanist",
      description: "Cultivated a massive savings tree using the power of compounding.",
      icon: "TrendingUp",
      color: "text-emerald-500 bg-emerald-50 border-emerald-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is compound interest?",
        options: [
          "Interest that is extremely complicated to calculate.",
          "Earning interest on your original savings PLUS on the interest you've already earned.",
          "A fee you pay the bank for keeping your money."
        ],
        correctAnswerIndex: 1,
        explanation: "Compounding means you earn interest on your interest. It makes your money grow faster and faster like a snowball rolling downhill!"
      },
      {
        id: 2,
        question: "Why does starting to save at age 12 give you a massive advantage over starting at age 35?",
        options: [
          "Because kids are naturally luckier.",
          "Your savings have many more years to compound and grow.",
          "Older people are forbidden from having savings accounts."
        ],
        correctAnswerIndex: 1,
        explanation: "Time is the secret ingredient of compounding. The more years your money has to grow, the more dramatic the snowball effect becomes!"
      },
      {
        id: 3,
        question: "What is the safest place to deposit your savings to let them grow?",
        options: [
          "Underneath your mattress.",
          "A federally insured savings account at a bank.",
          "In a piggy bank hidden in your backyard."
        ],
        correctAnswerIndex: 1,
        explanation: "A bank savings account is safe, insured against loss, and pays you interest over time!"
      }
    ]
  },
  {
    id: "m5",
    title: "Smart Shopping Sweep",
    subtitle: "Beating the Supermarket",
    description: "Learn how to calculate cost-per-ounce, decode confusing coupons, and dodge sneaky store tricks designed to empty your wallet!",
    category: "spending",
    estimatedMinutes: 6,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b5",
      title: "Deal Detective",
      description: "Cracked unit prices and unlocked the smartest shopping choices.",
      icon: "Search",
      color: "text-purple-500 bg-purple-50 border-purple-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is 'unit pricing'?",
        options: [
          "The color of the box.",
          "The cost per unit of measure (like ounce, gram, or sheet) to easily compare values.",
          "The price of buying exactly one truckload of items."
        ],
        correctAnswerIndex: 1,
        explanation: "Unit pricing shows you how much an item costs per ounce or gram. It helps you see if a giant box is actually a better deal than a small one!"
      },
      {
        id: 2,
        question: "If Brand A costs $4.00 for 16oz ($0.25/oz) and Brand B costs $6.00 for 30oz ($0.20/oz), which is the better bargain?",
        options: [
          "Brand A, because $4.00 is a smaller number.",
          "Brand B, because it has a lower cost per ounce ($0.20/oz).",
          "They are exactly the same."
        ],
        correctAnswerIndex: 1,
        explanation: "Brand B gives you more food for every dollar spent. It costs less per ounce, making it the smarter buy!"
      },
      {
        id: 3,
        question: "What is an 'impulse buy'?",
        options: [
          "Buying something you planned to purchase for weeks.",
          "Buying an item on a sudden whim, often near the checkout counter, without planning.",
          "Trading items in a barter market."
        ],
        correctAnswerIndex: 1,
        explanation: "Stores place candies and fun trinkets right at the cash register to trigger 'impulse buys'—unplanned items they hope you'll grab without thinking!"
      }
    ]
  },
  {
    id: "m6",
    title: "Banking & Checks",
    subtitle: "Unlock the Vault",
    description: "Crack the code of how checking and savings accounts work, write your very first virtual paper check, and run the ATM!",
    category: "basics",
    estimatedMinutes: 6,
    xpReward: 130,
    coinReward: 65,
    badge: {
      id: "b6",
      title: "Vault Master",
      description: "Successfully authorized a check and managed checking accounts.",
      icon: "Lock",
      color: "text-cyan-500 bg-cyan-50 border-cyan-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is the primary purpose of a checking account?",
        options: [
          "To lock up money until you turn 65.",
          "To easily access your money for daily spending, debit card swipes, and checks.",
          "To hide your gold bars from pirates."
        ],
        correctAnswerIndex: 1,
        explanation: "A checking account is designed for everyday transactions. You can deposit money and immediately spend it using cards, mobile apps, or checks!"
      },
      {
        id: 2,
        question: "Why must you sign your name on the bottom right corner of a check?",
        options: [
          "To prove you know how to write in cursive.",
          "To officially authorize and approve the bank to transfer those funds.",
          "Because checks look pretty with scribble drawings."
        ],
        correctAnswerIndex: 1,
        explanation: "Your unique signature is your security seal. It lets the bank know that YOU are the account owner approving the payment."
      },
      {
        id: 3,
        question: "What is a 9-digit routing number on a check?",
        options: [
          "The phone number of the store.",
          "A special bank ID code that tells where your bank is located in the country.",
          "Your private bank password."
        ],
        correctAnswerIndex: 1,
        explanation: "The routing number tells banking computers exactly which bank in the country holds your account, ensuring money routes to the correct destination."
      }
    ]
  },
  {
    id: "m7",
    title: "The Borrowing Beast",
    subtitle: "Credit & Debt Danger",
    description: "Credit cards let you buy today, but can invite a greedy 'Interest Monster' to double your bills! Master credit safety.",
    category: "spending",
    estimatedMinutes: 7,
    xpReward: 140,
    coinReward: 70,
    badge: {
      id: "b7",
      title: "Monster Tamer",
      description: "Defeated the Credit Monster and mastered credit scores.",
      icon: "ShieldAlert",
      color: "text-rose-500 bg-rose-50 border-rose-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is a credit card?",
        options: [
          "A card that gives you free unlimited money from the government.",
          "A card that lets you borrow money from a bank to buy things, which you must pay back.",
          "An identity card for arcade centers."
        ],
        correctAnswerIndex: 1,
        explanation: "Credit cards are NOT free money! You are borrowing money from the card issuer to buy things, and you must pay them back when the bill arrives."
      },
      {
        id: 2,
        question: "What happens if you only pay the tiny 'Minimum Payment' on a credit card bill?",
        options: [
          "The bank rewards you with free cupcakes.",
          "You pay high interest on the remaining balance, and your debt grows and lasts for years!",
          "Absolutely nothing; you saved money."
        ],
        correctAnswerIndex: 1,
        explanation: "If you don't pay the full bill, high-interest charges are added to what you owe. Your balance grows, and you end up paying double or triple the original price!"
      },
      {
        id: 3,
        question: "What is a Credit Score?",
        options: [
          "A grade showing how reliable you are at paying back borrowed money.",
          "Your high score in a banking video game.",
          "The amount of physical money in your wallet."
        ],
        correctAnswerIndex: 0,
        explanation: "A credit score is like a financial GPA. It tells lenders how reliable you are at paying back debt. High scores make borrowing cheaper and easier!"
      }
    ]
  },
  {
    id: "m8",
    title: "The Rocket Market",
    subtitle: "Stock Market Simulator",
    description: "Buy shares of tomorrow's companies! Trade virtual stocks, react to crazy breaking news, and watch your portfolio blast off!",
    category: "investing",
    estimatedMinutes: 7,
    xpReward: 150,
    coinReward: 75,
    badge: {
      id: "b8",
      title: "Stock Scientist",
      description: "Successfully built and traded a diversified virtual stock portfolio.",
      icon: "Rocket",
      color: "text-violet-500 bg-violet-50 border-violet-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What is a share of stock?",
        options: [
          "A ticket to watch a movie about finance.",
          "A tiny, real piece of ownership in a public company.",
          "A loan you make to a small local charity."
        ],
        correctAnswerIndex: 1,
        explanation: "When you buy a stock, you become a 'shareholder'—which means you own a micro-fraction of that company!"
      },
      {
        id: 2,
        question: "Why do stock prices fluctuate (go up and down)?",
        options: [
          "They change based on company performance, news, and buyer/seller demand.",
          "They change depending on the weather in Antarctica.",
          "They only go up, never down."
        ],
        correctAnswerIndex: 0,
        explanation: "Stock prices are determined by supply and demand. Good news makes more people want to buy, which drives the price up. Bad news does the opposite!"
      },
      {
        id: 3,
        question: "What is 'Diversification' in investing?",
        options: [
          "Putting all of your money into one single trendy stock.",
          "Spreading your money across many different investments to lower risk.",
          "Withdrawing all your cash to hide in a tree."
        ],
        correctAnswerIndex: 1,
        explanation: "Diversification is the golden rule of investing: 'Don't put all your eggs in one basket!' If one company fails, your other investments protect you."
      }
    ]
  },
  {
    id: "m9",
    title: "Paychecks & Taxes",
    subtitle: "The Shrinking Paystub",
    description: "Crack open a real paycheck stub! Discover where your tax money goes (like parks, schools, and roads) and see taxes at work.",
    category: "earning",
    estimatedMinutes: 6,
    xpReward: 130,
    coinReward: 65,
    badge: {
      id: "b9",
      title: "Civic Champion",
      description: "Decoded a pay stub and funded essential public community projects.",
      icon: "Map",
      color: "text-indigo-500 bg-indigo-50 border-indigo-200"
    },
    quizzes: [
      {
        id: 1,
        question: "Where do taxes deducted from your paycheck actually go?",
        options: [
          "They are destroyed and thrown away.",
          "To the government to pay for public goods like schools, parks, and roads.",
          "Directly to the bank's secret prize vault."
        ],
        correctAnswerIndex: 1,
        explanation: "Taxes are pooled together to pay for shared public services that benefit everyone, such as police, libraries, highways, and national parks."
      },
      {
        id: 2,
        question: "Which of these is typically funded by local sales or property taxes?",
        options: [
          "Private vacation tickets for city officials.",
          "Public fire departments, public schools, and community playgrounds.",
          "Sweets and snacks at local grocery stores."
        ],
        correctAnswerIndex: 1,
        explanation: "Local property and sales taxes are used directly in your community to fund schools, maintain city roads, and pay our local heroes like firefighters!"
      },
      {
        id: 3,
        question: "What is FICA on a paycheck stub?",
        options: [
          "A tax that funds Social Security (retirement) and Medicare (healthcare for seniors).",
          "A bonus coupon for arcade games.",
          "The name of the company owner."
        ],
        correctAnswerIndex: 0,
        explanation: "FICA is the Federal Insurance Contributions Act. It's a special tax that is put away to help pay for retirement and medical care for seniors and people with disabilities!"
      }
    ]
  },
  {
    id: "m10",
    title: "Giving Back",
    subtitle: "The Power of Philanthropy",
    description: "Learn how to use your wealth to make a difference. Donate your accumulated virtual coins to rebuild and upgrade your community!",
    category: "saving",
    estimatedMinutes: 5,
    xpReward: 120,
    coinReward: 60,
    badge: {
      id: "b10",
      title: "Philanthropist",
      description: "Shared wealth to support charities and improve the local community.",
      icon: "Heart",
      color: "text-pink-500 bg-pink-50 border-pink-200"
    },
    quizzes: [
      {
        id: 1,
        question: "What does the word 'Philanthropy' mean?",
        options: [
          "The study of ancient giant dinosaurs.",
          "Giving money, items, time, or skills to help others and do good in the world.",
          "Printing paper money at high speeds."
        ],
        correctAnswerIndex: 1,
        explanation: "Philanthropy is about generosity. It's the active desire to help others, whether through money, donating toys, or volunteering your hours!"
      },
      {
        id: 2,
        question: "Why do people and businesses choose to donate to charity?",
        options: [
          "To make the community stronger, healthier, and support causes they care about.",
          "Because they are forced to do so by local banks.",
          "Simply to get rid of heavy paper bills."
        ],
        correctAnswerIndex: 0,
        explanation: "Donating helps charities feed the hungry, rescue stray animals, heal patients, and protect nature, creating a safer and happier world for all."
      },
      {
        id: 3,
        question: "How can a middle school student practice philanthropy if they don't have any money to give?",
        options: [
          "They cannot participate at all.",
          "Volunteer time at a local shelter, donate old books/toys, or help a neighbor.",
          "Borrow massive sums of credit card debt to donate."
        ],
        correctAnswerIndex: 1,
        explanation: "Philanthropy is about your heart! Donating gently used clothes, books, toys, or volunteering your time to help clean a park are all incredible ways to give back!"
      }
    ]
  }
];

export const AVATAR_ITEMS: AvatarItem[] = [
  // Hats
  { id: "h1", name: "Party Cone", category: "hat", cost: 50, asset: "🥳", color: "from-pink-400 to-rose-400" },
  { id: "h2", name: "Chef's Toque", category: "hat", cost: 80, asset: "👨‍🍳", color: "from-slate-200 to-gray-300" },
  { id: "h3", name: "Detective Fedora", category: "hat", cost: 150, asset: "🕵️‍♂️", color: "from-amber-700 to-amber-900" },
  { id: "h4", name: "Space Helmet", category: "hat", cost: 300, asset: "🧑‍🚀", color: "from-cyan-100 to-blue-200" },
  
  // Glasses
  { id: "g1", name: "Classic Specs", category: "glasses", cost: 40, asset: "👓", color: "from-blue-500 to-indigo-600" },
  { id: "g2", name: "Cool Shades", category: "glasses", cost: 75, asset: "🕶️", color: "from-slate-800 to-slate-950" },
  { id: "g3", name: "Cyber Goggles", category: "glasses", cost: 200, asset: "🥽", color: "from-lime-400 to-emerald-500" },

  // Clothing
  { id: "c1", name: "Tie-Dye Shirt", category: "clothing", cost: 90, asset: "👕", color: "from-teal-300 to-purple-400" },
  { id: "c2", name: "Hero Cape", category: "clothing", cost: 180, asset: "🦸‍♂️", color: "from-red-500 to-orange-600" },
  { id: "c3", name: "Golden Bling", category: "clothing", cost: 250, asset: "🪙", color: "from-yellow-400 to-amber-500" },

  // Companions
  { id: "p1", name: "Golden Pup", category: "companion", cost: 250, asset: "🐶", color: "from-orange-200 to-yellow-300" },
  { id: "p2", name: "Baby Dragon", category: "companion", cost: 500, asset: "🐉", color: "from-emerald-400 to-teal-500" },
  { id: "p3", name: "Micro Drone", category: "companion", cost: 350, asset: "🤖", color: "from-cyan-300 to-blue-500" }
];
