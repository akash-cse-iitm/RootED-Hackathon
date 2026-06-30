import type { RoadmapStep } from "@/lib/gapfinder/types";
import type { GapFinderMode } from "@/lib/gapfinder/types";

type ConceptLesson = {
  current: RoadmapStep[];
  returnee: RoadmapStep[];
};

const lessons: Record<string, ConceptLesson> = {
  "number-sense": {
    current: [
      {
        id: "number-sense-read",
        title: "Read and write numbers with confidence",
        explanation:
          "Every number is built from place values: ones, tens, hundreds, thousands. When you see 3,472 — it means 3 thousands, 4 hundreds, 7 tens, 2 ones. Reading numbers aloud as you write them builds the habit fast. This is the foundation for every arithmetic operation you will ever do.",
        workedExample:
          "Write 5,308 in words: 'five thousand three hundred and eight'. Then reverse it — 'two thousand and forty-six' becomes 2,046. Check by reading it back digit by digit using place-value positions.",
        practiceQuestions: [
          "What is the value of the digit 7 in 4,725?",
          "Write 'nine thousand and sixty-two' as a number."
        ]
      },
      {
        id: "number-sense-compare",
        title: "Compare numbers: which is bigger?",
        explanation:
          "Compare digits from left to right. The number with more digits is always larger. If digit counts match, compare the leftmost digit: 7,200 > 5,900 because 7 > 5 in the thousands place. Stop the moment you find a difference — that decides it.",
        workedExample:
          "Compare 4,083 and 4,308. Same thousands (4). Move to hundreds: 0 vs 3. Since 3 > 0, we get 4,308 > 4,083. The comparison ends at hundreds — we don't need to check tens or ones.",
        practiceQuestions: [
          "Which is greater: 2,560 or 2,506?",
          "Order from smallest to largest: 810, 801, 81, 8,100."
        ]
      },
      {
        id: "number-sense-round",
        title: "Round numbers to estimate quickly",
        explanation:
          "Rounding makes numbers easier to work with. Round to the nearest ten: look at the ones digit. If it's 5 or more, round up. If it's less than 5, round down. The rounded number is an estimate — close enough to be useful, simple enough to calculate in your head.",
        workedExample:
          "Round 347 to the nearest ten: ones digit is 7 (≥ 5), so round up → 350. Round 342: ones digit is 2 (< 5), round down → 340. Quick check: does the tens digit change? Only when ones ≥ 5.",
        practiceQuestions: [
          "Round 486 to the nearest hundred.",
          "A shop has 763 items. Round to the nearest ten to estimate stock."
        ]
      }
    ],
    returnee: [
      {
        id: "number-sense-bridge",
        title: "Reconnect with numbers — it all starts here",
        explanation:
          "If you've been away from maths, numbers are the safest place to restart. Everything in algebra, finance, and daily life comes back to place value. Spend a few minutes just reading numbers out loud — hundreds, thousands, lakhs. Your brain will reconnect faster than you think.",
        workedExample:
          "Pick any number from a newspaper or bill — say ₹12,450. Say it out loud: 'twelve thousand four hundred and fifty'. Count the digits: 5 digits means it's in the ten-thousands. That simple habit rebuilds number intuition.",
        practiceQuestions: [
          "List one place in daily life where you see a 4-digit number.",
          "Write 'thirty-five thousand and eight' as a number."
        ]
      },
      {
        id: "number-sense-read",
        title: "Read and write numbers with confidence",
        explanation:
          "Every number is built from place values: ones, tens, hundreds, thousands. When you see 3,472 — it means 3 thousands, 4 hundreds, 7 tens, 2 ones. Reading numbers aloud as you write them builds the habit fast. This is the foundation for every arithmetic operation you will ever do.",
        workedExample:
          "Write 5,308 in words: 'five thousand three hundred and eight'. Then reverse it — 'two thousand and forty-six' becomes 2,046. Check by reading it back digit by digit using place-value positions.",
        practiceQuestions: [
          "What is the value of the digit 7 in 4,725?",
          "Write 'nine thousand and sixty-two' as a number."
        ]
      },
      {
        id: "number-sense-compare",
        title: "Compare numbers: which is bigger?",
        explanation:
          "Compare digits from left to right. The number with more digits is always larger. If digit counts match, compare the leftmost digit: 7,200 > 5,900 because 7 > 5 in the thousands place. Stop the moment you find a difference — that decides it.",
        workedExample:
          "Compare 4,083 and 4,308. Same thousands (4). Move to hundreds: 0 vs 3. Since 3 > 0, we get 4,308 > 4,083. The comparison ends at hundreds — we don't need to check tens or ones.",
        practiceQuestions: [
          "Which is greater: 2,560 or 2,506?",
          "Order from smallest to largest: 810, 801, 81, 8,100."
        ]
      }
    ]
  },

  "addition-subtraction": {
    current: [
      {
        id: "addsub-inverse",
        title: "Addition and subtraction are opposites",
        explanation:
          "Addition puts amounts together; subtraction takes one away. They undo each other — this is called the inverse relationship. If 14 + 28 = 42, then 42 − 28 = 14 and 42 − 14 = 28. Knowing one fact gives you three for free. This inverse idea reappears when solving equations.",
        workedExample:
          "Check 73 − 29: instead of subtracting, ask 'what adds to 29 to reach 73?' Count up: 29 → 30 (1 step) → 73 (43 steps). So 73 − 29 = 44. Verify: 29 + 44 = 73. ✓",
        practiceQuestions: [
          "If 56 + 37 = 93, write the two subtraction facts.",
          "Solve 124 − 58 by counting up from 58 to 124."
        ]
      },
      {
        id: "addsub-column",
        title: "Column addition with regrouping",
        explanation:
          "Line up digits by place value: ones under ones, tens under tens. Add from right to left. If a column totals 10 or more, write the ones digit and carry the tens digit to the next column. Carrying is just moving ten ones into one ten — nothing magical.",
        workedExample:
          "Add 347 + 286. Ones: 7+6=13, write 3 carry 1. Tens: 4+8+1(carry)=13, write 3 carry 1. Hundreds: 3+2+1=6. Answer: 633. Check by estimating: 350+290=640 ≈ 633. ✓",
        practiceQuestions: [
          "Add 568 + 374 using column method.",
          "A bus had 248 passengers. 167 more boarded. How many in total?"
        ]
      },
      {
        id: "addsub-climb",
        title: "Use addition/subtraction inside equations",
        explanation:
          "When you see x + 8 = 15, the + 8 is just addition. To undo it, subtract 8 from both sides. The inverse relationship you practised here is exactly the tool you need. Every equation-solving step uses this idea.",
        workedExample:
          "Solve x + 8 = 15. Subtract 8 from both sides: x = 15 − 8 = 7. Check: 7 + 8 = 15. ✓ You just used the same inverse principle from this lesson inside algebra.",
        practiceQuestions: [
          "Solve: x − 12 = 25.",
          "Solve: 40 − y = 17."
        ]
      }
    ],
    returnee: [
      {
        id: "addsub-bridge",
        title: "Warm up: addition and subtraction feel familiar",
        explanation:
          "Even after a long gap, addition and subtraction come back quickly because you use them every day — change, shopping totals, phone data. Let those real-world moments be your warm-up. The formal skills will feel familiar once you tie them to things you already know.",
        workedExample:
          "You have ₹500. You spend ₹237. Change = 500 − 237. Count up: 237 → 250 (13) → 300 (50) → 500 (200). Total change = 13+50+200 = ₹263. Real maths, real application.",
        practiceQuestions: [
          "You scored 78 in one test and 64 in another. What is the total?",
          "A tank holds 350 litres; 127 litres are used. How much remains?"
        ]
      },
      {
        id: "addsub-inverse",
        title: "Addition and subtraction are opposites",
        explanation:
          "Addition puts amounts together; subtraction takes one away. They undo each other — this is called the inverse relationship. If 14 + 28 = 42, then 42 − 28 = 14 and 42 − 14 = 28. Knowing one fact gives you three for free. This inverse idea reappears when solving equations.",
        workedExample:
          "Check 73 − 29: instead of subtracting, ask 'what adds to 29 to reach 73?' Count up: 29 → 30 (1 step) → 73 (43 steps). So 73 − 29 = 44. Verify: 29 + 44 = 73. ✓",
        practiceQuestions: [
          "If 56 + 37 = 93, write the two subtraction facts.",
          "Solve 124 − 58 by counting up from 58 to 124."
        ]
      },
      {
        id: "addsub-column",
        title: "Column method with regrouping",
        explanation:
          "Line up digits by place value: ones under ones, tens under tens. Add from right to left. If a column totals 10 or more, write the ones digit and carry the tens digit to the next column. Carrying is just moving ten ones into one ten — nothing magical.",
        workedExample:
          "Add 347 + 286. Ones: 7+6=13, write 3 carry 1. Tens: 4+8+1=13, write 3 carry 1. Hundreds: 3+2+1=6. Answer: 633. Estimate check: 350+290=640 ≈ 633. ✓",
        practiceQuestions: [
          "Add 568 + 374 using column method.",
          "A bus had 248 passengers, 167 boarded. How many total?"
        ]
      }
    ]
  },

  "multiplication-division": {
    current: [
      {
        id: "muldiv-groups",
        title: "Multiplication is repeated addition",
        explanation:
          "6 × 4 means 'six groups of four' = 4+4+4+4+4+4 = 24. Division reverses it: 24 ÷ 4 asks 'how many groups of 4 fit in 24?' The answer is 6. Seeing multiplication as equal groups makes every times-table fact visual and memorable.",
        workedExample:
          "A classroom has 6 rows, each with 8 desks. Total desks = 6 × 8 = 48. If 48 desks are shared into 8 equal groups: 48 ÷ 8 = 6 groups. The relationship is always the same: groups × size = total.",
        practiceQuestions: [
          "A carton holds 12 eggs. How many eggs in 7 cartons?",
          "72 students are split into 9 equal teams. How large is each team?"
        ]
      },
      {
        id: "muldiv-tables",
        title: "Times tables: the 3 tricks that cover most of them",
        explanation:
          "1. Double and halve (e.g. 6×8 = 3×16 = 48). 2. Use nearby easy facts (7×8 = 7×7+7 = 49+7 = 56). 3. Fingers for 9×: hold up 10 fingers, fold down the nth finger for 9×n — left side counts tens, right side counts ones. These tricks remove the need to memorise every fact.",
        workedExample:
          "9 × 7: fold down 7th finger. Left = 6 fingers, right = 3 fingers → 63. Check: 7×9 = 7×10−7 = 70−7 = 63. ✓ Two methods, same answer — that's how you know it's right.",
        practiceQuestions: [
          "Use the 'nearby fact' trick to calculate 8 × 7.",
          "What is 9 × 8? Use the finger method and verify with subtraction."
        ]
      },
      {
        id: "muldiv-climb",
        title: "Division inside algebraic expressions",
        explanation:
          "When you see x/3 = 5 in an equation, division is the operation to undo — and the way to undo division is multiplication. This is the same inverse relationship you just practised. Understanding this now means two-step equations will feel natural.",
        workedExample:
          "Solve x/3 = 5. Multiply both sides by 3: x = 5 × 3 = 15. Check: 15 ÷ 3 = 5. ✓ The inverse of dividing by 3 is multiplying by 3 — exactly what you'd do sharing groups in reverse.",
        practiceQuestions: [
          "Solve: x/4 = 7.",
          "Solve: 3y = 24."
        ]
      }
    ],
    returnee: [
      {
        id: "muldiv-bridge",
        title: "Real-life maths: you already multiply every day",
        explanation:
          "Buying 4 items at ₹25 each, splitting a bill, doubling a recipe — all multiplication and division. You've been doing this without calling it maths. The formal version is just putting that thinking on paper. Start from the real-world version you already know.",
        workedExample:
          "4 items at ₹25: 4 × 25. Use doubling: 2 × 25 = 50, then 2 × 50 = 100. So 4 × 25 = ₹100. Now reverse: ₹100 split 4 ways = 100 ÷ 4 = ₹25 each. Same situation, two directions.",
        practiceQuestions: [
          "You buy 6 notebooks at ₹35 each. What is the total cost?",
          "₹180 is shared equally among 9 friends. How much each?"
        ]
      },
      {
        id: "muldiv-groups",
        title: "Multiplication is repeated addition",
        explanation:
          "6 × 4 means 'six groups of four' = 4+4+4+4+4+4 = 24. Division reverses it: 24 ÷ 4 asks 'how many groups of 4 fit in 24?' The answer is 6. Seeing multiplication as equal groups makes every times-table fact visual and memorable.",
        workedExample:
          "A classroom has 6 rows, each with 8 desks. Total = 6 × 8 = 48. If 48 desks are split into 8 equal groups: 48 ÷ 8 = 6 groups. Groups × size = total — always.",
        practiceQuestions: [
          "A carton holds 12 eggs. How many in 7 cartons?",
          "72 students split into 9 teams. How large is each team?"
        ]
      },
      {
        id: "muldiv-tables",
        title: "Times tables: shortcuts for gaps",
        explanation:
          "If specific tables feel rusty, use nearby facts. 8×7: start from 8×8=64, subtract 8 → 56. Or use doubling: 8×7 = 4×14 = 2×28 = 56. These tricks work even when you can't recall the direct fact.",
        workedExample:
          "6×9: use 6×10−6 = 60−6 = 54. Or fingers: fold 9th finger → 8 on left, 1 on right → 81. Wait — that's 9×9. For 6×9: rearrange as 9×6: fold 6th finger → 5 left, 4 right → 54. ✓",
        practiceQuestions: [
          "Use a shortcut to calculate 7 × 8.",
          "What is 9 × 6? Try two different methods."
        ]
      }
    ]
  },

  fractions: {
    current: [
      {
        id: "fractions-read",
        title: "What a fraction actually means",
        explanation:
          "A fraction shows a part of a whole. The bottom number (denominator) says how many equal parts the whole is cut into. The top number (numerator) says how many of those parts you have. 3/4 means 'a whole cut into 4 equal parts, and you have 3 of them.' Visualise it as a pizza or a paper fold.",
        workedExample:
          "Fold a paper into 4 equal parts. Shade 3 parts. That shaded region = 3/4. Now fold into 8 equal parts — the same shaded area is now 6/8. Both fractions look different but cover the same space: they are equivalent fractions.",
        practiceQuestions: [
          "Shade 5/8 of a rectangle. How many parts are unshaded?",
          "Are 2/3 and 4/6 equivalent? Show why."
        ]
      },
      {
        id: "fractions-compare",
        title: "Comparing and ordering fractions",
        explanation:
          "Same denominator: compare numerators (3/7 > 2/7). Different denominators: find a common denominator first. 1/2 vs 1/3 — common denominator is 6: 1/2 = 3/6, 1/3 = 2/6. Now 3/6 > 2/6, so 1/2 > 1/3. The denominator tells you how fine the slices are — smaller slices with same count means less total.",
        workedExample:
          "Order 3/4, 2/3, 5/6. Common denominator = 12. Convert: 9/12, 8/12, 10/12. Order: 8/12 < 9/12 < 10/12, so 2/3 < 3/4 < 5/6.",
        practiceQuestions: [
          "Which is greater: 3/5 or 5/8?",
          "Order from least to greatest: 1/2, 1/3, 1/4."
        ]
      },
      {
        id: "fractions-ops",
        title: "Adding fractions — same and different denominators",
        explanation:
          "Same denominator: just add numerators, keep the denominator. 2/7 + 3/7 = 5/7. Different denominators: find LCM, convert, then add. Always simplify the result. This skill directly underpins working with fractional coefficients in linear equations.",
        workedExample:
          "1/4 + 1/6. LCM of 4 and 6 = 12. Convert: 3/12 + 2/12 = 5/12. Check: 5/12 is already in lowest terms (no common factor). ✓",
        practiceQuestions: [
          "Add 2/5 + 3/10.",
          "Subtract 3/4 − 1/3."
        ]
      }
    ],
    returnee: [
      {
        id: "fractions-bridge",
        title: "Fractions in real life — you know more than you think",
        explanation:
          "Half a roti, a quarter hour, 3/4 filled water bottle — you've used fractions your whole life. Formal fraction maths just writes these ideas precisely. Start from real objects: cut a paper into equal parts. The number of cuts you make is the denominator. The parts you keep are the numerator.",
        workedExample:
          "Imagine sharing one pizza among 4 people. Each person gets 1/4. Two people together get 2/4 = 1/2. Now share the same pizza among 8 people — each gets 1/8, same two people get 2/8 = 1/4. Smaller slices, same total amount.",
        practiceQuestions: [
          "You ate 3 pieces of a pizza cut into 8 slices. What fraction did you eat?",
          "A 1-hour class runs for 45 minutes. What fraction of the hour is that?"
        ]
      },
      {
        id: "fractions-read",
        title: "What a fraction means — and equivalent fractions",
        explanation:
          "The denominator says how many equal parts the whole is cut into. The numerator says how many you have. 3/4 means 3 out of 4 equal parts. Multiplying or dividing both numbers by the same value makes an equivalent fraction — same amount, different appearance.",
        workedExample:
          "3/4 × (2/2) = 6/8. Same value, different look. To check: shade 3 out of 4 parts, then shade 6 out of 8 parts on an identical shape — the shaded areas are identical.",
        practiceQuestions: [
          "Write three fractions equivalent to 2/5.",
          "Simplify 12/18 to its lowest terms."
        ]
      },
      {
        id: "fractions-compare",
        title: "Comparing fractions across different denominators",
        explanation:
          "Find a common denominator — the LCM of both denominators. Convert each fraction, then compare numerators. This is the same skill you'll need when working with fractions inside equations later.",
        workedExample:
          "Compare 3/4 and 2/3. LCM = 12. Convert: 9/12 vs 8/12. So 3/4 > 2/3.",
        practiceQuestions: [
          "Which is greater: 5/6 or 7/9?",
          "Order: 1/2, 2/5, 3/7 from smallest to largest."
        ]
      }
    ]
  },

  "decimals-percentages": {
    current: [
      {
        id: "dec-read",
        title: "Decimals: fractions in a different coat",
        explanation:
          "0.1 = 1/10, 0.01 = 1/100, 0.25 = 25/100 = 1/4. The decimal point separates the whole from the parts. Every decimal is really a fraction with a denominator that's a power of ten. Seeing this connection makes converting between decimals and fractions straightforward.",
        workedExample:
          "0.75 = 75/100 = 3/4 (divide both by 25). Reverse: 3/4 → divide 3 by 4 → 0.75. Check: 0.7 + 0.05 = 0.75 = 7 tenths + 5 hundredths. Both readings confirm the same value.",
        practiceQuestions: [
          "Write 0.6 as a fraction in simplest form.",
          "Convert 7/20 to a decimal."
        ]
      },
      {
        id: "dec-percent",
        title: "Percentages: fractions out of 100",
        explanation:
          "Per cent means 'per hundred'. 35% = 35/100 = 0.35. To find a percentage of an amount: convert to decimal and multiply. 20% of 450 = 0.20 × 450 = 90. To find what percentage one number is of another: divide and multiply by 100.",
        workedExample:
          "A shirt costs ₹600. A 15% discount is applied. Discount = 15% × 600 = 0.15 × 600 = ₹90. Sale price = 600 − 90 = ₹510. Check: 90/600 × 100 = 15%. ✓",
        practiceQuestions: [
          "What is 30% of 250?",
          "A student scored 78 out of 120. What percentage is that?"
        ]
      },
      {
        id: "dec-move",
        title: "Multiply and divide decimals by powers of 10",
        explanation:
          "Multiplying by 10: move decimal right one place. Multiplying by 100: move it two places right. Dividing reverses the direction. 3.7 × 10 = 37; 37 ÷ 100 = 0.37. This is the fastest mental-arithmetic skill for estimates and percentages.",
        workedExample:
          "Convert 4.5 km to metres: 4.5 × 1000 = 4,500 m (move decimal 3 right). Convert back: 4,500 ÷ 1000 = 4.5 km (move 3 left). Unit conversion is just powers-of-10 shifting.",
        practiceQuestions: [
          "Calculate 0.8 × 1000.",
          "A 250 ml bottle costs ₹25. What does 1 litre cost?"
        ]
      }
    ],
    returnee: [
      {
        id: "dec-bridge",
        title: "Decimals are everywhere: price tags and percentages",
        explanation:
          "₹45.50, 3.5 kg of rice, 12.5% interest — decimals and percentages are daily life. If you can read a price tag, you already understand decimals. The formal skill is just organising that understanding with place-value language.",
        workedExample:
          "Price tag: ₹128.75. Whole rupees = 128. Paise = 75 (because 100 paise = 1 rupee, so 75 paise = 75/100 rupees = 0.75). So ₹128.75 = 128 whole + 75 hundredths.",
        practiceQuestions: [
          "A 2.5 kg bag of rice costs ₹80. What does 1 kg cost?",
          "A 10% discount on ₹450: what is the new price?"
        ]
      },
      {
        id: "dec-read",
        title: "Decimals as fractions — the connection",
        explanation:
          "0.1 = 1/10, 0.01 = 1/100, 0.25 = 25/100 = 1/4. Every decimal is a fraction with a power-of-ten denominator. This connection means if you know fractions, you already know decimals — just a different notation.",
        workedExample:
          "0.75 = 75/100 = 3/4 (simplify by dividing by 25). Reverse: 3/4 = 3 ÷ 4 = 0.75. Two ways of writing the same amount.",
        practiceQuestions: [
          "Write 0.4 as a fraction.",
          "Convert 3/5 to a decimal."
        ]
      },
      {
        id: "dec-percent",
        title: "Percentages — fractions of 100",
        explanation:
          "Per cent means per hundred. 25% = 25/100 = 0.25. To find a percentage of an amount: convert to decimal and multiply. This is the skill behind interest rates, exam marks, discounts, and tax.",
        workedExample:
          "GST of 18% on ₹500: 18% × 500 = 0.18 × 500 = ₹90. Total = ₹590. Check: 90 ÷ 500 = 0.18 = 18%. ✓",
        practiceQuestions: [
          "Find 25% of 360.",
          "You scored 42 out of 60. What percentage did you get?"
        ]
      }
    ]
  },

  "ratio-proportion": {
    current: [
      {
        id: "ratio-read",
        title: "Ratios: comparing two quantities",
        explanation:
          "A ratio compares two amounts of the same unit. 2:3 means 'for every 2 of one thing, there are 3 of another.' You can scale a ratio up or down by multiplying or dividing both parts by the same number — just like equivalent fractions. Ratios appear in recipes, maps, and mixing problems.",
        workedExample:
          "Cement:sand = 1:3. For 5 kg of cement, how much sand? Scale the ratio: 1×5 : 3×5 = 5:15. You need 15 kg of sand. Check: 5/15 = 1/3, the same as the original ratio. ✓",
        practiceQuestions: [
          "Boys:girls in a class = 3:5. If there are 15 boys, how many girls?",
          "Simplify the ratio 24:36."
        ]
      },
      {
        id: "ratio-prop",
        title: "Direct proportion: as one grows, so does the other",
        explanation:
          "Two quantities are in direct proportion when their ratio stays constant. If 1 pen costs ₹8, then 5 pens cost ₹40 — the ratio cost/pens = 8 always. The cross-multiplication method solves any direct-proportion problem: a/b = c/d → a×d = b×c.",
        workedExample:
          "3 kg of apples costs ₹90. How much do 7 kg cost? 3/90 = 7/x → 3x = 630 → x = 210. 7 kg costs ₹210. Check: 210/7 = 30 = 90/3. Same unit rate ₹30/kg. ✓",
        practiceQuestions: [
          "A car travels 240 km in 4 hours. How far in 7 hours?",
          "5 workers build a wall in 12 days. How long for 3 workers?"
        ]
      },
      {
        id: "ratio-unitary",
        title: "The unitary method: find one, then scale",
        explanation:
          "Find the value for 1 unit first, then multiply to get the value for any number of units. This is the most reliable method for proportion problems — it breaks the problem into two simple steps and makes checking easy.",
        workedExample:
          "12 chocolates cost ₹60. Cost of 7 chocolates? Step 1: 1 chocolate = 60÷12 = ₹5. Step 2: 7 chocolates = 7×5 = ₹35. Check: 35/7 = 5 = 60/12. ✓",
        practiceQuestions: [
          "8 metres of cloth costs ₹360. Cost of 5 metres?",
          "A recipe uses 3 cups of flour for 12 cookies. How much for 20 cookies?"
        ]
      }
    ],
    returnee: [
      {
        id: "ratio-bridge",
        title: "Ratios in real life: cooking, mixing, sharing",
        explanation:
          "Mixing cement, cooking daal, splitting money — all involve ratios. 'Twice as much water as rice' is a ratio of 2:1. If you've ever scaled a recipe or mixed something in right proportions, you already understand ratios intuitively. The formal version just writes it more precisely.",
        workedExample:
          "A chutney recipe: 2 parts tamarind, 1 part jaggery. For 300 g total: 3 parts total → 300÷3 = 100 g each part. Tamarind = 200 g, jaggery = 100 g. Check: 200+100 = 300. ✓",
        practiceQuestions: [
          "You share ₹240 between two siblings in a ratio of 3:5. How much does each get?",
          "A fruit punch needs juice and water in ratio 1:4. For 2.5 litres total, how much juice?"
        ]
      },
      {
        id: "ratio-read",
        title: "Ratios: scaling up and down",
        explanation:
          "A ratio compares two amounts. 2:3 means 'for every 2 of one, there are 3 of the other.' Multiply or divide both parts by the same number to scale. This is identical to equivalent fractions — a skill you already have.",
        workedExample:
          "Cement:sand = 1:3. For 5 kg cement → scale by 5 → 5:15. Need 15 kg sand. Reverse: if you have 9 kg sand, how much cement? 9÷3 = 3 → 3 kg cement.",
        practiceQuestions: [
          "Simplify 18:24.",
          "Boys:girls = 2:3, total class = 35. How many boys?"
        ]
      },
      {
        id: "ratio-prop",
        title: "Direct proportion and the unitary method",
        explanation:
          "When quantities grow together at the same rate, they're in direct proportion. Find the unit value first, then scale. This underpins percentage calculations, exchange rates, and most daily calculations.",
        workedExample:
          "3 kg rice costs ₹90. For 5 kg: unit rate = 90÷3 = ₹30/kg. 5 kg = 5×30 = ₹150.",
        practiceQuestions: [
          "4 litres of petrol costs ₹400. Cost of 7 litres?",
          "A worker earns ₹1,500 in 5 days. What in 8 days?"
        ]
      }
    ]
  },

  "signed-numbers": {
    current: [
      {
        id: "signed-line",
        title: "The number line: positive and negative",
        explanation:
          "Think of the number line as a street. Zero is your home. Positive numbers are steps to the right; negative numbers are steps to the left. −5 is 5 steps left of home. This visual makes addition and subtraction of signed numbers completely physical — you're just walking the street.",
        workedExample:
          "−3 + 7: start at −3, walk 7 steps right → land on 4. So −3 + 7 = 4. Check: 7 − 3 = 4. ✓. Now −3 − 4: start at −3, walk 4 steps left → land on −7. So −3 − 4 = −7.",
        practiceQuestions: [
          "Solve: −8 + 5.",
          "A temperature drops from 3°C to −4°C. How many degrees did it drop?"
        ]
      },
      {
        id: "signed-rules",
        title: "Multiplying and dividing signed numbers",
        explanation:
          "Same signs → positive result. Different signs → negative result. (+) × (+) = +, (−) × (−) = +, (+) × (−) = −, (−) × (+) = −. One useful way to remember: 'same direction, positive; opposite directions, negative.' This is the rule used in algebra when expanding brackets.",
        workedExample:
          "(−4) × (−3) = +12. (same signs → positive). (−4) × 3 = −12. (different signs → negative). Check with grouping: −4 groups of 3 = −12. Or: opposite direction 3 times from −4 would go positive.",
        practiceQuestions: [
          "Solve: (−6) × (−5).",
          "Solve: 24 ÷ (−6)."
        ]
      },
      {
        id: "signed-algebra",
        title: "Signed numbers inside algebraic expressions",
        explanation:
          "When you see −x, it means the opposite of x. When you expand −2(x − 3), each term picks up the negative sign: −2x + 6. Signed-number mistakes are the most common source of algebra errors — lock in the rules now.",
        workedExample:
          "Expand −3(x + 4): −3 × x = −3x, −3 × 4 = −12. Result: −3x − 12. Check by substituting x = 1: −3(1+4) = −3×5 = −15. −3(1)−12 = −3−12 = −15. ✓",
        practiceQuestions: [
          "Expand: −2(y − 5).",
          "If x = −3, find 4x + 7."
        ]
      }
    ],
    returnee: [
      {
        id: "signed-bridge",
        title: "Negative numbers in everyday life",
        explanation:
          "Temperature below zero, debt, basement floors, bank overdraft — all use negative numbers. −₹200 in your account means you owe ₹200. If you earn ₹500, your balance becomes −200 + 500 = ₹300. You've been thinking in signed numbers for years without calling it algebra.",
        workedExample:
          "Bank balance: −₹150 (overdrawn). Deposit ₹400. New balance: −150 + 400 = ₹250. Withdraw ₹80: 250 − 80 = ₹170. The number line is your account history.",
        practiceQuestions: [
          "Temperature was −3°C, then rose by 8°C. What is the new temperature?",
          "You owe a friend ₹250 and earn ₹600. What is your net position?"
        ]
      },
      {
        id: "signed-line",
        title: "The number line: positive and negative",
        explanation:
          "Positive = steps right, negative = steps left, zero = starting point. −3 + 7 means 'start 3 left of zero, walk 7 right.' This model handles every signed-number operation without memorising rules.",
        workedExample:
          "−5 + 8: start at −5, walk 8 right → land on 3. Verify: the distance from −5 to 0 is 5, plus 3 more right gives 3. ✓",
        practiceQuestions: [
          "Solve: −4 + 9.",
          "Solve: −2 − 6."
        ]
      },
      {
        id: "signed-rules",
        title: "Multiplication and division with signs",
        explanation:
          "Same signs → positive. Different signs → negative. (−) × (−) = +. This might feel surprising but it's consistent: if losing a debt (−) is removed (−), you gain (+). Lock in the rule with that one example.",
        workedExample:
          "(−3) × (−4) = +12. (−3) × 4 = −12. 12 ÷ (−4) = −3.",
        practiceQuestions: [
          "Solve: (−7) × (−2).",
          "Solve: −18 ÷ 3."
        ]
      }
    ]
  },

  "algebraic-expressions": {
    current: [
      {
        id: "alg-variables",
        title: "Variables: a letter that holds a number",
        explanation:
          "A variable like x or n is just a placeholder for a number you don't know yet. 'A number plus 5' becomes x + 5. 'Three times a number' becomes 3x (the multiplication sign is dropped next to letters). Reading expressions aloud in plain words and back to algebra is the fastest way to build fluency.",
        workedExample:
          "'The cost of n pens at ₹12 each, plus ₹5 for a bag' = 12n + 5. When n = 4: 12(4) + 5 = 48 + 5 = ₹53. The expression is a general formula; substituting a specific n gives a specific answer.",
        practiceQuestions: [
          "Write an expression for 'twice a number decreased by 7'.",
          "If y = 5, evaluate 4y − 3."
        ]
      },
      {
        id: "alg-evaluate",
        title: "Substituting values into expressions",
        explanation:
          "To evaluate an expression: replace each variable with its given value, then follow the order of operations (BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction). Always write each substitution step before calculating — this prevents sign errors.",
        workedExample:
          "Evaluate 3a² − 2b when a = 2, b = 3. Substitute: 3(2²) − 2(3) = 3(4) − 6 = 12 − 6 = 6. Write each step. Never skip from problem to answer in one jump.",
        practiceQuestions: [
          "Evaluate 2x + 5y when x = 3, y = −1.",
          "Find the value of m² − 4m + 3 when m = 5."
        ]
      },
      {
        id: "alg-translate",
        title: "Translate between words and expressions",
        explanation:
          "This is the bridge from real problems to algebra. 'More than' → add. 'Less than' → subtract. 'Times' or 'product' → multiply. 'Divided equally' → divide. Watch out for order in subtraction: 'x less than 10' is 10 − x, not x − 10.",
        workedExample:
          "'A plumber charges ₹200 per hour plus ₹500 call-out fee.' Expression: 200h + 500 where h = hours. For 3 hours: 200(3) + 500 = ₹1,100. The expression lets you calculate any number of hours.",
        practiceQuestions: [
          "Write an expression: 'A shopkeeper's profit is ₹15 per item sold, minus ₹300 fixed costs.'",
          "Translate to words: 4x − 7."
        ]
      }
    ],
    returnee: [
      {
        id: "alg-bridge",
        title: "Algebra starts with patterns you already know",
        explanation:
          "A mobile plan: ₹99 base + ₹1 per extra SMS. Total = 99 + n (where n = extra SMSs). You've been thinking like this all along. Algebra just gives the pattern a formal name. A variable is simply the 'whatever number you plug in here' slot.",
        workedExample:
          "Auto fare: ₹30 base + ₹8 per km. Expression: 30 + 8d where d = km. For 5 km: 30 + 8(5) = 30 + 40 = ₹70. For 12 km: 30 + 96 = ₹126. One expression, any distance.",
        practiceQuestions: [
          "Write an expression for 'daily wage of ₹250 minus ₹30 transport cost'.",
          "If n = 6, find 3n + 7."
        ]
      },
      {
        id: "alg-variables",
        title: "Variables and expressions",
        explanation:
          "A variable is a letter holding a number. Expressions combine variables with operations. Reading each expression as a sentence and back helps build fluency: '3x − 5' = 'three times a number, take away five.'",
        workedExample:
          "Expression: 12n + 5 (12 per pen, ₹5 bag). n = 4: 12(4)+5 = 53. n = 0: 5 (just the bag). The same expression handles every case.",
        practiceQuestions: [
          "Write 'five more than twice y' as an expression.",
          "Evaluate 6a − 2 when a = 4."
        ]
      },
      {
        id: "alg-evaluate",
        title: "Substituting and evaluating",
        explanation:
          "Replace each variable with its value, then apply BODMAS. Write every step. The slowest way to evaluate expressions is also the safest — rushing creates sign errors.",
        workedExample:
          "Evaluate 2x² − 3 when x = 3: 2(3²) − 3 = 2(9) − 3 = 18 − 3 = 15.",
        practiceQuestions: [
          "Evaluate 5m − 4 when m = 7.",
          "Find 3a + 2b when a = 2, b = −3."
        ]
      }
    ]
  },

  "like-terms": {
    current: [
      {
        id: "like-identify",
        title: "Identify like terms: same variable, same power",
        explanation:
          "Like terms have exactly the same variable part: 3x and 7x are like terms (both have x). 3x and 3x² are NOT like terms (different powers). Constants (plain numbers) are always like terms with each other. You can only combine like terms — think of it as the 'same units' rule.",
        workedExample:
          "Group like terms in 5x + 3y − 2x + 4 + y. x-terms: 5x − 2x = 3x. y-terms: 3y + y = 4y. Constants: 4. Result: 3x + 4y + 4. Constants don't mix with variable terms.",
        practiceQuestions: [
          "Simplify: 7a + 3b − 2a + 5b.",
          "Simplify: 4x² − 3x + 2x² + 7x − 1."
        ]
      },
      {
        id: "like-combine",
        title: "Collecting like terms to simplify",
        explanation:
          "Collecting means grouping and combining. Rearrange so like terms sit next to each other, then add or subtract their coefficients. The variable part never changes — only the coefficient changes. This is the skill that lets you clean up both sides of an equation before solving.",
        workedExample:
          "Simplify 2x + 5 − 3x + 8. Rearrange: (2x − 3x) + (5 + 8) = −x + 13. Note: 2x − 3x = −1x = −x. The coefficient of x changed from +2 to −1.",
        practiceQuestions: [
          "Simplify: 9 + 4n − 2n − 3.",
          "Simplify: 3(x + 2) + 4x − 1 (expand first, then collect)."
        ]
      },
      {
        id: "like-equations",
        title: "Use simplification to prepare equations for solving",
        explanation:
          "Before you can solve an equation, you often need to simplify one or both sides by collecting like terms. Getting this step right determines whether the rest of the solution works. Practise simplifying expressions until it feels mechanical.",
        workedExample:
          "Simplify the left side: 3x + 2x − 4 = 21. Collect: 5x − 4 = 21. Now solve: 5x = 25, x = 5. Check: 3(5)+2(5)−4 = 15+10−4 = 21. ✓",
        practiceQuestions: [
          "Simplify then solve: 4y + 3y − 5 = 16.",
          "Simplify then solve: 6x − 2x + 3 = 19."
        ]
      }
    ],
    returnee: [
      {
        id: "like-bridge",
        title: "Combining like items: the unit rule",
        explanation:
          "3 apples + 5 apples = 8 apples. 3 apples + 5 oranges = still separate — you can't mix different fruits. Like terms work exactly the same way: 3x + 5x = 8x (same 'fruit'), but 3x + 5y stays separate. The 'unit rule' is all you need to understand combining like terms.",
        workedExample:
          "3 kg rice + 5 kg rice = 8 kg rice. In algebra: 3r + 5r = 8r. 3 kg rice + 5 kg flour = 3r + 5f (different units, can't combine). This is all 'like terms' means.",
        practiceQuestions: [
          "Simplify: 4x + 6 + 2x − 3.",
          "Is 3x² + 2x a simplified expression? Why or why not?"
        ]
      },
      {
        id: "like-identify",
        title: "Identifying and grouping like terms",
        explanation:
          "Same variable AND same power = like terms. x and x² are not like. 5x and −3x are like (both just x). Group before you compute — rearranging to put matching terms side by side prevents mistakes.",
        workedExample:
          "5x + 3y − 2x + 4 + y. Group: (5x − 2x) + (3y + y) + 4 = 3x + 4y + 4.",
        practiceQuestions: [
          "Simplify: 8m + 5 − 3m + 2.",
          "Simplify: 4p + 3q − p − 2q + 7."
        ]
      },
      {
        id: "like-combine",
        title: "Collecting like terms",
        explanation:
          "Rearrange, then combine. Only the coefficient changes — the variable part stays the same. This skill cleans up equations before solving and appears in every algebra problem.",
        workedExample:
          "2x + 5 − 3x + 8. Rearrange: (2x − 3x) + (5 + 8) = −x + 13.",
        practiceQuestions: [
          "Simplify: 6n − 2n + 4n − 7.",
          "Solve after simplifying: 5x + 2x − 6 = 15."
        ]
      }
    ]
  },

  "one-step-equations": {
    current: [
      {
        id: "one-undo",
        title: "One move to undo: the balance principle",
        explanation:
          "An equation is a balance. Whatever you do to one side, you must do to the other. To solve x + 7 = 12: undo the +7 by subtracting 7 from both sides → x = 5. To solve 3x = 18: undo the ×3 by dividing both sides by 3 → x = 6. One inverse operation — done.",
        workedExample:
          "Solve x − 9 = 4. The operation is −9. Inverse: +9. Add 9 to both sides: x − 9 + 9 = 4 + 9 → x = 13. Check: 13 − 9 = 4. ✓ Always verify by substituting your answer back in.",
        practiceQuestions: [
          "Solve: x + 14 = 31.",
          "Solve: 5x = 45."
        ]
      },
      {
        id: "one-divide",
        title: "Solving equations with division and fractions",
        explanation:
          "When x is divided (x/4 = 3), undo by multiplying both sides by the denominator: x = 12. When a fraction coefficient appears (x/5 = 7), multiply by 5. The fraction is just a division — reverse it. Always isolate x on one side.",
        workedExample:
          "Solve x/6 = 8. Multiply both sides by 6: (x/6) × 6 = 8 × 6 → x = 48. Check: 48/6 = 8. ✓. Solve 2x/3 = 10: multiply by 3/2 (the reciprocal) → x = 15. Check: 2(15)/3 = 30/3 = 10. ✓",
        practiceQuestions: [
          "Solve: x/7 = 9.",
          "Solve: 3x/4 = 12."
        ]
      },
      {
        id: "one-apply",
        title: "One-step equations in real problems",
        explanation:
          "Setting up the equation from a word problem is as important as solving it. Read the problem once for meaning, once for quantities, once for the unknown. Then translate, solve, and check that the answer fits the original situation.",
        workedExample:
          "A mango costs ₹n. 8 mangoes cost ₹56. Equation: 8n = 56. Solve: n = 56÷8 = ₹7. Check: 8 × 7 = 56. ✓. The equation made the arithmetic organised — that's its value.",
        practiceQuestions: [
          "A train runs at constant speed and covers 180 km in 3 hours. Write and solve an equation to find the speed.",
          "After giving away ₹45, Priya has ₹120 left. How much did she start with?"
        ]
      }
    ],
    returnee: [
      {
        id: "one-bridge",
        title: "Equations: questions that solve themselves if set up right",
        explanation:
          "An equation is just a question with a balance sign. '5 plus what equals 12?' is the equation 5 + x = 12. You solve it the moment you write 'x = 12 − 5 = 7.' The formal process is just writing out the steps so anyone can check your work.",
        workedExample:
          "'I bought a pen for some amount and it cost ₹35. I have ₹100 left. How much did I start with?' Let x = starting amount. x − 35 = 100 → x = 135. Check: 135 − 35 = 100. ✓",
        practiceQuestions: [
          "Solve: n + 23 = 50.",
          "Solve: 4n = 36."
        ]
      },
      {
        id: "one-undo",
        title: "The balance principle — one operation at a time",
        explanation:
          "Whatever you do to one side, do to the other. Identify the operation on x, apply the inverse to both sides, and x is isolated. Always verify the answer by substituting back.",
        workedExample:
          "x + 7 = 12. Inverse of +7 is −7. Subtract 7 from both sides: x = 5. Check: 5 + 7 = 12. ✓",
        practiceQuestions: [
          "Solve: x − 16 = 9.",
          "Solve: 7x = 63."
        ]
      },
      {
        id: "one-apply",
        title: "Real-word one-step equations",
        explanation:
          "Set up the equation first, then solve. Reading for 'what is unknown' and 'what relationship exists' is the skill. The maths after that is mechanical.",
        workedExample:
          "8 mangoes cost ₹56. Cost per mango = n. Equation: 8n = 56. n = 7. Verify: 8×7 = 56. ✓",
        practiceQuestions: [
          "A class of 30 students is divided equally into groups of n. There are 6 groups. Find n.",
          "After depositing ₹500, your bank balance is ₹1,200. What was it before?"
        ]
      }
    ]
  },

  "two-step-equations": {
    current: [
      {
        id: "two-order",
        title: "Reverse BODMAS: undo operations in reverse order",
        explanation:
          "In the expression 2x + 3, BODMAS says multiply first, then add. To solve 2x + 3 = 11, reverse the order: undo the add first (subtract 3), then undo the multiply (divide by 2). This 'reverse BODMAS' rule is the key to all multi-step equations.",
        workedExample:
          "Solve 3x − 7 = 11. Step 1: undo −7 by adding 7 → 3x = 18. Step 2: undo ×3 by dividing by 3 → x = 6. Check: 3(6) − 7 = 18 − 7 = 11. ✓ Two steps, reverse order from how the expression was built.",
        practiceQuestions: [
          "Solve: 4x + 5 = 29.",
          "Solve: 5x − 3 = 22."
        ]
      },
      {
        id: "two-fraction",
        title: "Two-step equations with fractions and negatives",
        explanation:
          "When the equation involves a fraction like x/3 + 4 = 9: undo +4 first (subtract 4), then undo ÷3 (multiply by 3). With negatives: −2x + 5 = −3 → subtract 5 → −2x = −8 → divide by −2 → x = 4. Keep the sign with the coefficient.",
        workedExample:
          "Solve x/4 − 2 = 5. Step 1: add 2 → x/4 = 7. Step 2: multiply by 4 → x = 28. Check: 28/4 − 2 = 7 − 2 = 5. ✓",
        practiceQuestions: [
          "Solve: x/3 + 6 = 10.",
          "Solve: −3x + 8 = −1."
        ]
      },
      {
        id: "two-apply",
        title: "Real problems with two-step equations",
        explanation:
          "Most real problems need two steps: a rate/unit, and a fixed amount. A plumber charges a call-out fee plus an hourly rate. A taxi has a base fare plus per-km charge. Setting up the equation correctly is more than half the work.",
        workedExample:
          "A taxi charges ₹50 base + ₹15 per km. Total fare is ₹140. Equation: 15d + 50 = 140. Subtract 50: 15d = 90. Divide by 15: d = 6 km. Check: 15(6)+50 = 90+50 = 140. ✓",
        practiceQuestions: [
          "An electrician charges ₹200 call-out + ₹80/hour. Total bill = ₹520. Find hours worked.",
          "I think of a number, double it, and subtract 5. The result is 19. Find the number."
        ]
      }
    ],
    returnee: [
      {
        id: "two-bridge",
        title: "Two steps: one for the rate, one for the fixed part",
        explanation:
          "Most bills have two parts: a fixed charge and a usage charge. Solving a two-step equation handles exactly this structure. The key is: undo the fixed part first, then undo the rate. Same as settling a bill in two steps.",
        workedExample:
          "Phone bill: ₹99 fixed + ₹0.50 per call. Total = ₹149. Let n = calls. 0.50n + 99 = 149. Subtract 99: 0.50n = 50. Divide by 0.50: n = 100 calls. Check: 100×0.50 + 99 = 149. ✓",
        practiceQuestions: [
          "Solve: 2x + 7 = 19.",
          "Solve: 3x − 4 = 14."
        ]
      },
      {
        id: "two-order",
        title: "Reverse BODMAS: undo in reverse",
        explanation:
          "Expression 2x + 3 was built by multiplying first, then adding. Undo in reverse: subtract first, then divide. This single rule covers all two-step equations.",
        workedExample:
          "3x − 7 = 11. Add 7: 3x = 18. Divide by 3: x = 6. Check: 3(6)−7 = 11. ✓",
        practiceQuestions: [
          "Solve: 5x + 8 = 33.",
          "Solve: x/2 − 3 = 5."
        ]
      },
      {
        id: "two-apply",
        title: "Two-step equations from real problems",
        explanation:
          "Set up, then solve. Look for the rate (coefficient of x) and the fixed value (constant term). Write the equation before calculating anything.",
        workedExample:
          "Plumber: ₹200 call-out + ₹100/hour. Bill = ₹600. 100h + 200 = 600 → h = 4 hours.",
        practiceQuestions: [
          "A worker earns ₹350/day plus ₹50 allowance. Total earned = ₹1,450. How many days worked?",
          "Think of a number; multiply by 3 and add 8 to get 29. Find the number."
        ]
      }
    ]
  },

  "linear-equations": {
    current: [
      {
        id: "linear-setup",
        title: "What makes an equation linear?",
        explanation:
          "A linear equation has variables raised only to the power of 1 (no x², no √x). It graphs as a straight line. Standard form is ax + b = c where a, b, c are constants. The goal is always to isolate x by undoing operations in reverse order. Every technique you've built — inverse operations, like terms — comes together here.",
        workedExample:
          "Identify linear vs non-linear: 3x − 5 = 10 ✓ (linear). x² + 2 = 11 ✗ (quadratic). 2x + 3y = 8 ✓ (linear in two variables). The power of every variable must be exactly 1.",
        practiceQuestions: [
          "Which are linear equations: x + 7 = 3, 2x² = 8, 4y − 1 = 7?",
          "Write a linear equation that has x = 5 as its solution."
        ]
      },
      {
        id: "linear-solve",
        title: "Solving linear equations step-by-step",
        explanation:
          "Standard approach: 1. Expand any brackets. 2. Collect like terms on each side. 3. Move variable terms to one side. 4. Move constant terms to the other side. 5. Divide by the coefficient of x. 6. Check by substituting back. Do not skip steps under time pressure — that is when errors happen.",
        workedExample:
          "Solve 3(x + 2) = 2x + 11. Expand: 3x + 6 = 2x + 11. Subtract 2x: x + 6 = 11. Subtract 6: x = 5. Check: 3(5+2) = 3×7 = 21. 2(5)+11 = 10+11 = 21. ✓",
        practiceQuestions: [
          "Solve: 2(x − 3) = x + 4.",
          "Solve: 5x − 7 = 3x + 9."
        ]
      },
      {
        id: "linear-word",
        title: "Translate and solve real-world linear problems",
        explanation:
          "Real problems are the payoff for all this work. Read: understand the situation. Assign: choose a variable for the unknown. Translate: write the equation. Solve: use the six-step method. Interpret: does the answer make sense in context?",
        workedExample:
          "Riya is 3 years older than Sam. Sum of their ages is 35. Let Sam = x, Riya = x+3. Equation: x + (x+3) = 35 → 2x + 3 = 35 → 2x = 32 → x = 16. Sam is 16, Riya is 19. Check: 16+19 = 35. ✓",
        practiceQuestions: [
          "Two numbers have a sum of 50; one is 8 more than the other. Find both numbers.",
          "A rectangle's length is twice its width. Its perimeter is 60 cm. Find both dimensions."
        ]
      }
    ],
    returnee: [
      {
        id: "linear-bridge",
        title: "You've reached the target: linear equations",
        explanation:
          "Every skill you rebuilt in this roadmap — number sense, operations, fractions, signed numbers, expressions, like terms, one and two-step equations — flows into linear equations. This is the destination. Take a moment to see how far you've come from the first concept.",
        workedExample:
          "Think of a real daily situation that's now an equation you can solve: 'After 3 months of saving ₹500/month and spending ₹200 once, I have ₹1,100. How much did I have to start?' x + 3(500) − 200 = 1100 → x = −200. Hmm — means I started at −₹200 (debt). That makes sense!",
        practiceQuestions: [
          "Solve: 4x − 3 = 2x + 9.",
          "In your own words, describe what a linear equation is."
        ]
      },
      {
        id: "linear-solve",
        title: "The complete six-step method",
        explanation:
          "1. Expand brackets. 2. Collect like terms each side. 3. Move x-terms left. 4. Move constants right. 5. Divide by coefficient of x. 6. Check. This process handles every linear equation. Never skip the check — it catches sign errors instantly.",
        workedExample:
          "3(x + 2) = 2x + 11. Expand: 3x + 6 = 2x + 11. Subtract 2x: x + 6 = 11. Subtract 6: x = 5. Check: 3(7) = 21 = 2(5)+11. ✓",
        practiceQuestions: [
          "Solve: 2(x + 4) = x + 13.",
          "Solve: 6x − 5 = 4x + 7."
        ]
      },
      {
        id: "linear-word",
        title: "Real-world problems — the reason you came back",
        explanation:
          "Setting up equations from real situations is a life skill: loan repayments, profit calculations, distance problems. The algebra you've rebuilt now puts these within reach. Read → Assign → Translate → Solve → Interpret.",
        workedExample:
          "Seema is 5 years older than Raj. Together they are 47. Raj = x, Seema = x+5. x + x+5 = 47 → 2x = 42 → x = 21. Seema = 26. Check: 21+26 = 47. ✓",
        practiceQuestions: [
          "Two numbers sum to 60; one is 4 more than the other. Find them.",
          "A rectangle's perimeter is 72 cm; the length is 3× the width. Find dimensions."
        ]
      }
    ]
  }
};

export function getSeedLesson(
  conceptId: string,
  mode: GapFinderMode,
  stepIndex: number
): RoadmapStep | null {
  const lesson = lessons[conceptId];
  if (!lesson) return null;
  const steps = mode === "returnee" ? lesson.returnee : lesson.current;
  return steps[stepIndex] ?? steps[steps.length - 1] ?? null;
}

export function getSeedLessonsForConcept(conceptId: string, mode: GapFinderMode): RoadmapStep[] {
  const lesson = lessons[conceptId];
  if (!lesson) return [];
  return mode === "returnee" ? lesson.returnee : lesson.current;
}
