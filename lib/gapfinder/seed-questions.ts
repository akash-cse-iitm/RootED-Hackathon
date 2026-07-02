import type { AdaptiveQuestion, DifficultyLevel } from "@/lib/gapfinder/adaptive";

type SeedQuestion = Omit<AdaptiveQuestion, "topic">;

const bank: Record<string, Record<DifficultyLevel, SeedQuestion[]>> = {
  python: {
    1: [
      { id: "py-1-1", level: 1, question: "Which of the following is used to print output in Python?", options: ["echo()", "print()", "console.log()", "output()"], correctIndex: 1, explanation: "print() is Python's built-in function to display output." },
      { id: "py-1-2", level: 1, question: "What data type is the value 3.14 in Python?", options: ["int", "str", "float", "bool"], correctIndex: 2, explanation: "3.14 is a floating-point number, so Python stores it as float." },
      { id: "py-1-3", level: 1, question: "How do you create a variable x with value 10 in Python?", options: ["x := 10", "int x = 10", "x = 10", "var x = 10"], correctIndex: 2, explanation: "Python uses = for assignment with no type declaration needed." },
      { id: "py-1-4", level: 1, question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], correctIndex: 2, explanation: "The # symbol starts a single-line comment in Python." },
      { id: "py-1-5", level: 1, question: "What will `type('hello')` return?", options: ["<class 'str'>", "<class 'int'>", "String", "hello"], correctIndex: 0, explanation: "type() returns the class type; 'hello' is a string." },
    ],
    2: [
      { id: "py-2-1", level: 2, question: "What is the output of `print(2 ** 3)`?", options: ["6", "8", "9", "5"], correctIndex: 1, explanation: "** is the exponentiation operator. 2**3 = 2³ = 8." },
      { id: "py-2-2", level: 2, question: "Which loop runs while a condition is True?", options: ["for loop", "while loop", "do-while loop", "repeat loop"], correctIndex: 1, explanation: "The while loop keeps running as long as its condition remains True." },
      { id: "py-2-3", level: 2, question: "How do you access the third element of list `a = [10, 20, 30, 40]`?", options: ["a[2]", "a[3]", "a(3)", "a.get(3)"], correctIndex: 0, explanation: "Python lists are zero-indexed, so index 2 gives the third element (30)." },
      { id: "py-2-4", level: 2, question: "What does `len([1, 2, 3, 4])` return?", options: ["3", "4", "5", "0"], correctIndex: 1, explanation: "len() returns the number of elements in a list; here 4 elements." },
      { id: "py-2-5", level: 2, question: "Which statement correctly checks if x is greater than 5?", options: ["if x > 5:", "if x >= 5:", "if x ! 5:", "if (x > 5)"], correctIndex: 0, explanation: "Python uses if x > 5: with a colon; parentheses are optional." },
    ],
    3: [
      { id: "py-3-1", level: 3, question: "What is the output of `[x**2 for x in range(4)]`?", options: ["[0,1,4,9]", "[1,4,9,16]", "[0,2,4,6]", "[1,2,3,4]"], correctIndex: 0, explanation: "range(4) gives 0,1,2,3 and x**2 squares each: [0,1,4,9]." },
      { id: "py-3-2", level: 3, question: "What does `dict.get('key', 'default')` return when 'key' is missing?", options: ["None", "KeyError", "default", "0"], correctIndex: 2, explanation: "get() returns the second argument as default when the key is not found." },
      { id: "py-3-3", level: 3, question: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], correctIndex: 2, explanation: "Python uses the def keyword to define functions." },
      { id: "py-3-4", level: 3, question: "What does `'hello'.upper()` return?", options: ["HELLO", "hello", "Hello", "Error"], correctIndex: 0, explanation: "The upper() string method converts all characters to uppercase." },
      { id: "py-3-5", level: 3, question: "What is the result of `list(map(lambda x: x*2, [1,2,3]))`?", options: ["[2,4,6]", "[1,2,3]", "[1,4,9]", "[3,6,9]"], correctIndex: 0, explanation: "map applies lambda x: x*2 to each element: [2,4,6]." },
    ],
    4: [
      { id: "py-4-1", level: 4, question: "What is the difference between `__str__` and `__repr__` in Python?", options: ["No difference", "__str__ is for users, __repr__ for developers/debugging", "__repr__ is for users", "Both are the same as print()"], correctIndex: 1, explanation: "__str__ gives a human-readable string; __repr__ gives an unambiguous representation for debugging." },
      { id: "py-4-2", level: 4, question: "Which is the correct way to handle multiple exceptions in Python 3?", options: ["except (TypeError, ValueError):", "except TypeError, ValueError:", "except [TypeError, ValueError]:", "catch (TypeError | ValueError):"], correctIndex: 0, explanation: "Python uses a tuple of exception types: except (TypeError, ValueError):" },
      { id: "py-4-3", level: 4, question: "What does `@staticmethod` do in a class?", options: ["Makes method private", "Allows calling method without an instance", "Makes method abstract", "Creates a class variable"], correctIndex: 1, explanation: "@staticmethod allows calling the method on the class itself without creating an instance." },
      { id: "py-4-4", level: 4, question: "What will `sorted({'b':2,'a':1,'c':3})` return?", options: ["{'a':1,'b':2,'c':3}", "['a','b','c']", "[1,2,3]", "Error"], correctIndex: 1, explanation: "sorted() on a dict returns a sorted list of its keys: ['a','b','c']." },
      { id: "py-4-5", level: 4, question: "What is a generator in Python?", options: ["A class that generates random numbers", "A function that yields values lazily", "A decorator pattern", "A type of list"], correctIndex: 1, explanation: "Generators use yield to produce values one at a time, saving memory." },
    ],
    5: [
      { id: "py-5-1", level: 5, question: "What is the time complexity of Python's `list.append()`?", options: ["O(n)", "O(log n)", "O(1) amortized", "O(n²)"], correctIndex: 2, explanation: "append() is O(1) amortized because Python lists occasionally resize but spread the cost." },
      { id: "py-5-2", level: 5, question: "What does `functools.lru_cache` do?", options: ["Limits CPU usage", "Memoizes function return values", "Logs function calls", "Throttles function calls"], correctIndex: 1, explanation: "lru_cache caches the results of expensive function calls based on arguments (memoization)." },
      { id: "py-5-3", level: 5, question: "Which dunder method makes an object callable?", options: ["__call__", "__init__", "__run__", "__invoke__"], correctIndex: 0, explanation: "Defining __call__ on a class makes instances callable like functions." },
      { id: "py-5-4", level: 5, question: "What is the GIL in CPython?", options: ["Global Import Lock", "Global Interpreter Lock — prevents true multi-thread parallelism", "Garbage collection Internal Layer", "Generic Interface Library"], correctIndex: 1, explanation: "The GIL is a mutex that allows only one thread to execute Python bytecode at a time in CPython." },
      { id: "py-5-5", level: 5, question: "What does `async def` define in Python?", options: ["A thread function", "A coroutine", "A generator function", "A class method"], correctIndex: 1, explanation: "async def defines a coroutine that can be awaited and used with asyncio." },
    ],
  },

  mathematics: {
    1: [
      { id: "ma-1-1", level: 1, question: "What is 18 ÷ 3 × 2?", options: ["3", "12", "9", "6"], correctIndex: 1, explanation: "BODMAS: division then multiplication. 18÷3=6, 6×2=12." },
      { id: "ma-1-2", level: 1, question: "What is the place value of 5 in 3,584?", options: ["5", "50", "500", "5000"], correctIndex: 2, explanation: "5 is in the hundreds place, so its place value is 500." },
      { id: "ma-1-3", level: 1, question: "Which is the largest: 3/4, 2/3, 5/6?", options: ["3/4", "2/3", "5/6", "All equal"], correctIndex: 2, explanation: "5/6 ≈ 0.833, 3/4 = 0.75, 2/3 ≈ 0.667 — so 5/6 is largest." },
      { id: "ma-1-4", level: 1, question: "What is 15% of 200?", options: ["15", "20", "30", "25"], correctIndex: 2, explanation: "15% of 200 = 0.15 × 200 = 30." },
      { id: "ma-1-5", level: 1, question: "What is the LCM of 4 and 6?", options: ["24", "12", "6", "2"], correctIndex: 1, explanation: "Multiples of 4: 4,8,12. Multiples of 6: 6,12. LCM = 12." },
    ],
    2: [
      { id: "ma-2-1", level: 2, question: "If 3x + 7 = 22, what is x?", options: ["4", "5", "6", "3"], correctIndex: 1, explanation: "3x = 22 - 7 = 15, so x = 15/3 = 5." },
      { id: "ma-2-2", level: 2, question: "A train travels 240 km in 4 hours. What is its speed?", options: ["40 km/h", "60 km/h", "80 km/h", "50 km/h"], correctIndex: 1, explanation: "Speed = Distance/Time = 240/4 = 60 km/h." },
      { id: "ma-2-3", level: 2, question: "The ratio of boys to girls in a class is 3:2. If there are 30 students, how many girls?", options: ["18", "12", "10", "15"], correctIndex: 1, explanation: "Girls = 2/(3+2) × 30 = 2/5 × 30 = 12." },
      { id: "ma-2-4", level: 2, question: "What is the area of a rectangle with length 8 cm and breadth 5 cm?", options: ["26 cm²", "40 cm²", "13 cm²", "30 cm²"], correctIndex: 1, explanation: "Area = length × breadth = 8 × 5 = 40 cm²." },
      { id: "ma-2-5", level: 2, question: "If a price increases from ₹400 to ₹500, what is the percentage increase?", options: ["20%", "25%", "15%", "10%"], correctIndex: 1, explanation: "% increase = (100/400) × 100 = 25%." },
    ],
    3: [
      { id: "ma-3-1", level: 3, question: "Solve: x² - 5x + 6 = 0. What are the roots?", options: ["x = 2, 3", "x = -2, -3", "x = 1, 6", "x = 5, 6"], correctIndex: 0, explanation: "Factor: (x-2)(x-3) = 0, so x = 2 or x = 3." },
      { id: "ma-3-2", level: 3, question: "What is sin 30°?", options: ["1/2", "√3/2", "1/√2", "1"], correctIndex: 0, explanation: "sin 30° = 1/2 — a standard trigonometric value." },
      { id: "ma-3-3", level: 3, question: "A circle has radius 7 cm. What is its area? (Use π = 22/7)", options: ["154 cm²", "44 cm²", "49 cm²", "88 cm²"], correctIndex: 0, explanation: "Area = πr² = (22/7) × 7² = 22 × 7 = 154 cm²." },
      { id: "ma-3-4", level: 3, question: "What is the sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correctIndex: 1, explanation: "The sum of interior angles of any triangle is always 180°." },
      { id: "ma-3-5", level: 3, question: "If P(A) = 0.3 and P(B) = 0.4 and A, B are independent, find P(A and B)?", options: ["0.12", "0.7", "0.1", "0.3"], correctIndex: 0, explanation: "For independent events: P(A∩B) = P(A)×P(B) = 0.3 × 0.4 = 0.12." },
    ],
    4: [
      { id: "ma-4-1", level: 4, question: "What is the slope of the line 3x - 4y + 8 = 0?", options: ["3/4", "-3/4", "4/3", "-4/3"], correctIndex: 0, explanation: "Rearranging: y = (3/4)x + 2. Slope = 3/4." },
      { id: "ma-4-2", level: 4, question: "Find the sum of first 20 terms of AP: 2, 5, 8, ...", options: ["590", "620", "610", "580"], correctIndex: 0, explanation: "S = n/2 × [2a + (n-1)d] = 20/2 × [4 + 57] = 10 × 61 = 610. Wait, a=2, d=3, n=20: S = 10×[4+57]=610. Answer is 610." },
      { id: "ma-4-3", level: 4, question: "How many ways can 5 students be arranged in a row?", options: ["25", "120", "60", "10"], correctIndex: 1, explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120 arrangements." },
      { id: "ma-4-4", level: 4, question: "What is the derivative of x³ + 2x²?", options: ["3x² + 4x", "x² + 2x", "3x + 4", "6x + 4"], correctIndex: 0, explanation: "d/dx(x³) = 3x², d/dx(2x²) = 4x. Total = 3x² + 4x." },
      { id: "ma-4-5", level: 4, question: "If a matrix A is 2×3 and B is 3×4, what is the order of AB?", options: ["2×4", "3×3", "2×3", "3×4"], correctIndex: 0, explanation: "For matrix multiplication: (m×n)(n×p) = m×p. So (2×3)(3×4) = 2×4." },
    ],
    5: [
      { id: "ma-5-1", level: 5, question: "What is ∫(2x + 3)dx?", options: ["x² + 3x + C", "2 + C", "2x² + 3x + C", "x² + 3 + C"], correctIndex: 0, explanation: "∫2x dx = x², ∫3 dx = 3x. Total = x² + 3x + C." },
      { id: "ma-5-2", level: 5, question: "Find lim(x→0) [sin x / x]", options: ["0", "∞", "1", "undefined"], correctIndex: 2, explanation: "This is a standard limit: lim(x→0) sin x / x = 1." },
      { id: "ma-5-3", level: 5, question: "The eigenvalues of matrix [[2,0],[0,3]] are:", options: ["2 and 3", "0 and 1", "5 and 6", "1 and 1"], correctIndex: 0, explanation: "For a diagonal matrix, eigenvalues are the diagonal entries: 2 and 3." },
      { id: "ma-5-4", level: 5, question: "If z = 1 + i, what is |z|?", options: ["√2", "2", "1", "√3"], correctIndex: 0, explanation: "|z| = √(1² + 1²) = √2." },
      { id: "ma-5-5", level: 5, question: "What does the Central Limit Theorem state?", options: ["All distributions are normal", "Sample means approach normal distribution as n increases", "Large datasets have no outliers", "Mean equals median always"], correctIndex: 1, explanation: "CLT: as sample size n → ∞, the distribution of sample means approaches normal regardless of population distribution." },
    ],
  },

  english: {
    1: [
      { id: "en-1-1", level: 1, question: "Which word is a noun?", options: ["Run", "Quickly", "Beautiful", "Happiness"], correctIndex: 3, explanation: "Happiness is a noun (abstract). Run is a verb, Quickly is an adverb, Beautiful is an adjective." },
      { id: "en-1-2", level: 1, question: "What is the plural of 'child'?", options: ["Childs", "Childes", "Children", "Child's"], correctIndex: 2, explanation: "'Child' has the irregular plural form 'children'." },
      { id: "en-1-3", level: 1, question: "Which sentence is correct?", options: ["She go to school.", "She goes to school.", "She going to school.", "She goed to school."], correctIndex: 1, explanation: "With singular third person (she/he/it), verbs take '-s': she goes." },
      { id: "en-1-4", level: 1, question: "What part of speech is 'quickly'?", options: ["Adjective", "Noun", "Adverb", "Verb"], correctIndex: 2, explanation: "'Quickly' modifies a verb ('ran quickly'), making it an adverb." },
      { id: "en-1-5", level: 1, question: "Which is the antonym of 'generous'?", options: ["Kind", "Stingy", "Brave", "Honest"], correctIndex: 1, explanation: "Stingy means unwilling to give — the opposite of generous." },
    ],
    2: [
      { id: "en-2-1", level: 2, question: "Which sentence is in the Past Perfect tense?", options: ["She had finished the work.", "She finished the work.", "She has finished the work.", "She was finishing the work."], correctIndex: 0, explanation: "Past Perfect = had + past participle. 'She had finished' is correct." },
      { id: "en-2-2", level: 2, question: "Convert to passive voice: 'The teacher taught the lesson.'", options: ["The lesson was taught by the teacher.", "The lesson is taught by teacher.", "The teacher was teaching the lesson.", "The lesson taught the teacher."], correctIndex: 0, explanation: "Passive: Object + was/were + V3 + by + Subject. 'The lesson was taught by the teacher.'" },
      { id: "en-2-3", level: 2, question: "What does the idiom 'kick the bucket' mean?", options: ["Kick a pail", "Die", "Give up", "Start fresh"], correctIndex: 1, explanation: "'Kick the bucket' is an informal idiom meaning to die." },
      { id: "en-2-4", level: 2, question: "Choose the correct form: 'Neither Ram nor his friends ___ present.'", options: ["was", "were", "is", "are"], correctIndex: 1, explanation: "When 'neither...nor' joins subjects, the verb agrees with the nearest subject — 'friends' → 'were'." },
      { id: "en-2-5", level: 2, question: "What is a metaphor?", options: ["An exaggeration for effect", "A direct comparison without 'like' or 'as'", "A comparison using 'like' or 'as'", "The repetition of consonant sounds"], correctIndex: 1, explanation: "A metaphor makes a direct comparison: 'Life is a journey' (not 'like a journey')." },
    ],
    3: [
      { id: "en-3-1", level: 3, question: "Identify the figure of speech: 'The stars danced in the sky.'", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correctIndex: 2, explanation: "Giving human actions (dancing) to non-human things (stars) is personification." },
      { id: "en-3-2", level: 3, question: "What is the tone of: 'Unfortunately, despite repeated warnings, the situation worsened steadily.'?", options: ["Optimistic", "Sarcastic", "Regretful/concerned", "Humorous"], correctIndex: 2, explanation: "Words like 'unfortunately' and 'worsened' convey a regretful, concerned tone." },
      { id: "en-3-3", level: 3, question: "Fill in: 'He behaved as though he ___ the owner.'", options: ["is", "was", "were", "has been"], correctIndex: 2, explanation: "Subjunctive mood with 'as though': use 'were' regardless of person." },
      { id: "en-3-4", level: 3, question: "What does 'ephemeral' mean?", options: ["Lasting forever", "Short-lived", "Transparent", "Powerful"], correctIndex: 1, explanation: "Ephemeral means lasting for a very short time." },
      { id: "en-3-5", level: 3, question: "Which rhetorical device is used in: 'I have nothing to offer but blood, toil, tears and sweat.'?", options: ["Oxymoron", "Anaphora", "Asyndeton", "Litotes"], correctIndex: 2, explanation: "Asyndeton omits conjunctions for dramatic effect between list items." },
    ],
    4: [
      { id: "en-4-1", level: 4, question: "What is the difference between 'affect' and 'effect'?", options: ["No difference — both mean the same", "'Affect' is usually a verb, 'effect' is usually a noun", "'Effect' is a verb, 'affect' is a noun", "'Affect' only works in negative sentences"], correctIndex: 1, explanation: "'Affect' is typically a verb (to influence); 'effect' is typically a noun (the result)." },
      { id: "en-4-2", level: 4, question: "What is the function of a dangling modifier?", options: ["Makes a sentence stronger", "Incorrectly modifies a word not present in the sentence", "Adds emphasis to the subject", "Creates parallel structure"], correctIndex: 1, explanation: "A dangling modifier has no clear subject to modify, creating ambiguity." },
      { id: "en-4-3", level: 4, question: "Identify the type of clause: 'Although he studied hard, he failed.'", options: ["Relative clause", "Adverbial clause", "Nominal clause", "Main clause"], correctIndex: 1, explanation: "'Although he studied hard' is an adverbial clause modifying the reason for failing." },
      { id: "en-4-4", level: 4, question: "What is 'stream of consciousness' in literature?", options: ["A nature metaphor", "A narrative technique showing a character's thoughts continuously", "A type of dialogue", "A plot structure"], correctIndex: 1, explanation: "Stream of consciousness (e.g., in James Joyce) mimics the flowing, unfiltered thoughts of characters." },
      { id: "en-4-5", level: 4, question: "What word best fills the blank: 'The professor's lecture was so ___ that half the class fell asleep.' (choose the most precise word)", options: ["bad", "soporific", "long", "quiet"], correctIndex: 1, explanation: "Soporific means tending to induce sleep — the most precise and sophisticated choice." },
    ],
    5: [
      { id: "en-5-1", level: 5, question: "What is 'prolepsis' in rhetoric?", options: ["A type of flashback", "Anticipating and addressing a counter-argument", "Exaggeration for effect", "An ambiguous word choice"], correctIndex: 1, explanation: "Prolepsis (or procatalepsis) is addressing a potential objection before the opponent raises it." },
      { id: "en-5-2", level: 5, question: "Which best describes 'free indirect discourse'?", options: ["First-person narration", "A blend of narrator's voice and character's thoughts without quotation", "Direct speech in novels", "Unreliable narration"], correctIndex: 1, explanation: "Free indirect discourse merges the narrator's third-person voice with the character's inner thoughts without quote marks." },
      { id: "en-5-3", level: 5, question: "What is the effect of 'chiasmus' in writing?", options: ["Creates repetition of the same word", "Reverses grammatical structures in successive clauses for emphasis", "Compares two unlike things", "Lists items without conjunctions"], correctIndex: 1, explanation: "Chiasmus: 'Ask not what your country can do for you — ask what you can do for your country' reverses the structure." },
      { id: "en-5-4", level: 5, question: "What distinguishes 'showing' from 'telling' in creative writing?", options: ["Showing uses longer sentences", "Showing depicts action/detail; telling states facts/emotions directly", "Telling is better in fiction", "There is no difference"], correctIndex: 1, explanation: "Showing: 'Her hands shook as she read the letter.' Telling: 'She was nervous.' Showing is more vivid." },
      { id: "en-5-5", level: 5, question: "What is 'epistemic modality' in linguistics?", options: ["The study of letter sounds", "Expressing the speaker's degree of certainty about a proposition", "The rhythm of poetry", "A type of metaphor"], correctIndex: 1, explanation: "Epistemic modality expresses certainty/possibility (may, might, must, could) from the speaker's perspective." },
    ],
  },

  science: {
    1: [
      { id: "sc-1-1", level: 1, question: "What is the chemical symbol for water?", options: ["WA", "H₂O", "HO₂", "W"], correctIndex: 1, explanation: "Water is H₂O — two hydrogen atoms bonded to one oxygen atom." },
      { id: "sc-1-2", level: 1, question: "Which organ pumps blood through the body?", options: ["Liver", "Lungs", "Heart", "Kidney"], correctIndex: 2, explanation: "The heart is the muscular organ that pumps blood throughout the circulatory system." },
      { id: "sc-1-3", level: 1, question: "What is the unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correctIndex: 1, explanation: "Force is measured in Newtons (N), named after Sir Isaac Newton." },
      { id: "sc-1-4", level: 1, question: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctIndex: 2, explanation: "Plants absorb CO₂ and release O₂ during photosynthesis." },
      { id: "sc-1-5", level: 1, question: "What state of matter has a fixed volume but no fixed shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], correctIndex: 1, explanation: "Liquids have a fixed volume but take the shape of their container." },
    ],
    2: [
      { id: "sc-2-1", level: 2, question: "What is Newton's Second Law of Motion?", options: ["Every action has an equal and opposite reaction", "F = ma", "Objects in motion stay in motion", "Energy cannot be created or destroyed"], correctIndex: 1, explanation: "Newton's 2nd Law: Force = mass × acceleration (F = ma)." },
      { id: "sc-2-2", level: 2, question: "What is the pH of pure water at 25°C?", options: ["0", "7", "14", "5"], correctIndex: 1, explanation: "Pure water is neutral with pH = 7." },
      { id: "sc-2-3", level: 2, question: "Which part of the cell contains genetic information?", options: ["Mitochondria", "Nucleus", "Ribosome", "Cell wall"], correctIndex: 1, explanation: "The nucleus houses DNA, the cell's genetic material." },
      { id: "sc-2-4", level: 2, question: "A ball is thrown upward. At the highest point, what is its velocity?", options: ["Maximum", "Zero", "Equal to initial", "Negative"], correctIndex: 1, explanation: "At the highest point, the ball momentarily stops, so velocity = 0." },
      { id: "sc-2-5", level: 2, question: "What type of reaction produces water from H₂ and O₂?", options: ["Decomposition", "Displacement", "Combination (synthesis)", "Double displacement"], correctIndex: 2, explanation: "H₂ + O₂ → H₂O is a combination/synthesis reaction where elements combine." },
    ],
    3: [
      { id: "sc-3-1", level: 3, question: "A resistor of 10Ω is connected to a 5V battery. What current flows?", options: ["50A", "0.5A", "2A", "15A"], correctIndex: 1, explanation: "Ohm's Law: I = V/R = 5/10 = 0.5A." },
      { id: "sc-3-2", level: 3, question: "What is Mendel's Law of Segregation?", options: ["Traits from different chromosomes are inherited independently", "Each organism inherits two alleles; they separate during gamete formation", "Dominant traits always appear", "All offspring resemble parents"], correctIndex: 1, explanation: "The Law of Segregation: allele pairs separate during gamete formation, so each gamete carries one allele." },
      { id: "sc-3-3", level: 3, question: "In an ecosystem, who are 'decomposers'?", options: ["Animals that eat plants", "Organisms that break down dead matter into nutrients", "Producers of food", "Top predators"], correctIndex: 1, explanation: "Decomposers (bacteria, fungi) break down dead organic matter and return nutrients to the soil." },
      { id: "sc-3-4", level: 3, question: "What is an exothermic reaction?", options: ["Absorbs heat from surroundings", "Releases heat to surroundings", "Occurs only at high temperatures", "Changes state of matter"], correctIndex: 1, explanation: "Exothermic reactions release energy (heat) — combustion and respiration are examples." },
      { id: "sc-3-5", level: 3, question: "Which electromagnetic wave has the highest frequency?", options: ["Radio waves", "Visible light", "X-rays", "Gamma rays"], correctIndex: 3, explanation: "Gamma rays have the highest frequency (and energy) in the electromagnetic spectrum." },
    ],
    4: [
      { id: "sc-4-1", level: 4, question: "What is the first law of thermodynamics?", options: ["Entropy always increases", "Energy cannot be created or destroyed, only converted", "Heat flows from cold to hot", "Force equals mass times acceleration"], correctIndex: 1, explanation: "First Law (Conservation of Energy): total energy in an isolated system remains constant." },
      { id: "sc-4-2", level: 4, question: "In organic chemistry, what is an ester?", options: ["A type of acid", "A compound formed from alcohol + acid (condensation)", "An inorganic salt", "A type of alkene"], correctIndex: 1, explanation: "Esters form when an alcohol reacts with a carboxylic acid, releasing water." },
      { id: "sc-4-3", level: 4, question: "What is the role of ATP in cells?", options: ["Structural support", "Carries genetic information", "Universal energy currency for cellular reactions", "Immune defence"], correctIndex: 2, explanation: "ATP (Adenosine Triphosphate) stores and transfers energy for virtually all cellular activities." },
      { id: "sc-4-4", level: 4, question: "What phenomenon causes the sky to appear blue?", options: ["Reflection of ocean", "Rayleigh scattering of sunlight by atmosphere", "Absorption by ozone", "Diffraction by clouds"], correctIndex: 1, explanation: "Rayleigh scattering: shorter (blue) wavelengths scatter more than longer ones when sunlight hits air molecules." },
      { id: "sc-4-5", level: 4, question: "What is the difference between DNA and RNA?", options: ["DNA is single-stranded; RNA is double-stranded", "DNA has uracil; RNA has thymine", "DNA uses deoxyribose; RNA uses ribose and has uracil instead of thymine", "RNA carries the genetic blueprint; DNA is temporary"], correctIndex: 2, explanation: "DNA uses deoxyribose sugar and thymine; RNA uses ribose sugar and uracil instead." },
    ],
    5: [
      { id: "sc-5-1", level: 5, question: "What does Heisenberg's Uncertainty Principle state?", options: ["Light has dual nature", "You cannot simultaneously know exact position and momentum of a particle", "Energy comes in discrete packets", "Electrons orbit in fixed shells"], correctIndex: 1, explanation: "ΔxΔp ≥ ℏ/2 — the more precisely you know position, the less precisely you can know momentum." },
      { id: "sc-5-2", level: 5, question: "What is electronegativity, and which element has the highest value?", options: ["Tendency to lose electrons; Caesium", "Tendency to attract electrons in a bond; Fluorine", "Number of electrons; Oxygen", "Bond strength; Nitrogen"], correctIndex: 1, explanation: "Electronegativity is the ability to attract bonding electrons. Fluorine (4.0 on Pauling scale) is highest." },
      { id: "sc-5-3", level: 5, question: "What is a buffer solution?", options: ["A solution that changes colour", "A solution that resists change in pH when small amounts of acid/base are added", "A neutral solution only", "A solution of pure water"], correctIndex: 1, explanation: "Buffer solutions maintain near-constant pH through a weak acid-conjugate base pair equilibrium." },
      { id: "sc-5-4", level: 5, question: "What is meant by 'punctuated equilibrium' in evolution?", options: ["Gradual continuous change", "Long periods of stability interrupted by rapid evolutionary change", "Extinction events only", "Genetic mutation rates"], correctIndex: 1, explanation: "Proposed by Gould & Eldredge: evolution occurs in rapid bursts separated by long stable periods (stasis)." },
      { id: "sc-5-5", level: 5, question: "What is a Schwarzschild radius?", options: ["The orbital radius of Saturn", "The radius at which an object becomes a black hole", "The event horizon of the universe", "The radius of hydrogen atom"], correctIndex: 1, explanation: "The Schwarzschild radius is the critical radius at which escape velocity equals c (speed of light) — forming a black hole." },
    ],
  },

  "computer science": {
    1: [
      { id: "cs-1-1", level: 1, question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Processing Unit", "Core Processing Utility"], correctIndex: 1, explanation: "CPU = Central Processing Unit — the brain of the computer." },
      { id: "cs-1-2", level: 1, question: "Which device stores data permanently even when power is off?", options: ["RAM", "CPU cache", "Hard disk", "Register"], correctIndex: 2, explanation: "Hard disk (and SSD) is non-volatile storage that retains data without power." },
      { id: "cs-1-3", level: 1, question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Translation Process", "Hyperlink Text Transfer Protocol"], correctIndex: 0, explanation: "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web." },
      { id: "cs-1-4", level: 1, question: "Which of the following is NOT an input device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], correctIndex: 2, explanation: "A monitor is an output device — it displays information but does not input it." },
      { id: "cs-1-5", level: 1, question: "What is the function of an operating system?", options: ["Browse the internet", "Manage hardware and software resources", "Write programs", "Store data in the cloud"], correctIndex: 1, explanation: "The OS manages hardware, memory, files, and provides an interface for applications." },
    ],
    2: [
      { id: "cs-2-1", level: 2, question: "What does IP address stand for?", options: ["Internet Protocol", "Internal Processing", "Internet Path", "Integrated Protocol"], correctIndex: 0, explanation: "IP (Internet Protocol) address uniquely identifies a device on a network." },
      { id: "cs-2-2", level: 2, question: "What is RAM?", options: ["Read-only memory that stores BIOS", "Temporary memory that loses data when power is off", "Permanent storage for the OS", "A type of graphics card"], correctIndex: 1, explanation: "RAM (Random Access Memory) is volatile — it stores active data/programs but is cleared when power is off." },
      { id: "cs-2-3", level: 2, question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Queue Language", "System Query Logic", "Structured Quick Language"], correctIndex: 0, explanation: "SQL = Structured Query Language, used to manage and query relational databases." },
      { id: "cs-2-4", level: 2, question: "What is a firewall?", options: ["A type of virus", "Security system that monitors and controls network traffic", "A hardware component", "An antivirus program"], correctIndex: 1, explanation: "A firewall filters incoming/outgoing network traffic based on security rules." },
      { id: "cs-2-5", level: 2, question: "Which file extension is typically used for a web page?", options: [".doc", ".html", ".jpg", ".exe"], correctIndex: 1, explanation: ".html (HyperText Markup Language) files are used for web pages." },
    ],
    3: [
      { id: "cs-3-1", level: 3, question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correctIndex: 2, explanation: "Binary search halves the search space each time, giving O(log n) time complexity." },
      { id: "cs-3-2", level: 3, question: "What is a primary key in a database?", options: ["The most important table", "A unique identifier for each row in a table", "A type of index", "The first column always"], correctIndex: 1, explanation: "A primary key uniquely identifies each record/row in a database table." },
      { id: "cs-3-3", level: 3, question: "In networking, what does DNS do?", options: ["Assigns IP addresses dynamically", "Translates domain names to IP addresses", "Encrypts web traffic", "Routes packets between networks"], correctIndex: 1, explanation: "DNS (Domain Name System) translates human-readable domain names (google.com) to IP addresses." },
      { id: "cs-3-4", level: 3, question: "What is a stack data structure's behaviour?", options: ["FIFO — First In First Out", "LIFO — Last In First Out", "Random access", "Priority-based access"], correctIndex: 1, explanation: "A stack follows LIFO: the last item pushed is the first popped." },
      { id: "cs-3-5", level: 3, question: "What does HTTPS add over HTTP?", options: ["Faster speed", "SSL/TLS encryption for secure communication", "Larger file transfer", "Offline access"], correctIndex: 1, explanation: "HTTPS uses SSL/TLS to encrypt data between browser and server, preventing eavesdropping." },
    ],
    4: [
      { id: "cs-4-1", level: 4, question: "What is the difference between TCP and UDP?", options: ["No difference", "TCP is connection-oriented and reliable; UDP is connectionless and faster", "UDP is more secure", "TCP is faster than UDP"], correctIndex: 1, explanation: "TCP guarantees delivery and order; UDP is faster but no delivery guarantee — used for streaming/games." },
      { id: "cs-4-2", level: 4, question: "What is a hash collision?", options: ["Two files having the same name", "Two different inputs producing the same hash output", "A corrupted hash function", "Hash value of 0"], correctIndex: 1, explanation: "A collision occurs when two distinct inputs map to the same hash value — a problem for hash tables and cryptography." },
      { id: "cs-4-3", level: 4, question: "What is the difference between SQL JOIN types INNER and LEFT JOIN?", options: ["No difference", "INNER returns only matching rows; LEFT returns all left-table rows plus matching right-table rows", "LEFT is slower", "INNER includes NULL values"], correctIndex: 1, explanation: "INNER JOIN: only rows with matches in both tables. LEFT JOIN: all left-table rows, NULLs where no right match." },
      { id: "cs-4-4", level: 4, question: "What is 'deadlock' in operating systems?", options: ["A program crash", "Two or more processes waiting indefinitely for resources held by each other", "Memory overflow", "CPU throttling"], correctIndex: 1, explanation: "Deadlock: process A holds resource 1 and waits for resource 2; process B holds resource 2 and waits for resource 1 — infinite wait." },
      { id: "cs-4-5", level: 4, question: "What does 'normalization' do in database design?", options: ["Makes queries faster always", "Reduces data redundancy and ensures data integrity", "Encrypts data", "Backs up data"], correctIndex: 1, explanation: "Normalization organizes tables to reduce redundancy and improve data integrity through normal forms (1NF, 2NF, 3NF)." },
    ],
    5: [
      { id: "cs-5-1", level: 5, question: "What is the CAP theorem in distributed systems?", options: ["CPU-RAM-Disk balance", "A system can guarantee at most two of: Consistency, Availability, Partition tolerance", "Cache-Aside Pattern", "Cryptographic proof theorem"], correctIndex: 1, explanation: "CAP theorem: distributed systems cannot simultaneously guarantee all three — Consistency, Availability, Partition tolerance." },
      { id: "cs-5-2", level: 5, question: "What is the difference between symmetric and asymmetric encryption?", options: ["Same thing", "Symmetric uses one key for encrypt/decrypt; asymmetric uses public/private key pair", "Asymmetric is faster", "Symmetric is only for passwords"], correctIndex: 1, explanation: "Symmetric (AES): same key for encrypt/decrypt. Asymmetric (RSA): public key encrypts, private key decrypts." },
      { id: "cs-5-3", level: 5, question: "What is 'eventual consistency' in distributed databases?", options: ["Data is always consistent immediately", "All replicas will become consistent eventually if no new updates occur", "Only 1% of reads are consistent", "Data is never consistent"], correctIndex: 1, explanation: "Eventual consistency: updates propagate to all nodes eventually — reads may return stale data temporarily (e.g., DynamoDB)." },
      { id: "cs-5-4", level: 5, question: "What is the difference between a process and a thread?", options: ["No difference", "A process is an independent program in memory; a thread is a unit of execution within a process sharing its memory", "Threads have their own memory", "Processes are faster"], correctIndex: 1, explanation: "Processes have separate memory spaces; threads within a process share memory, making inter-thread communication faster but riskier." },
      { id: "cs-5-5", level: 5, question: "What does 'idempotent' mean in the context of REST APIs?", options: ["The API returns JSON", "Calling the operation multiple times has the same effect as calling it once", "The API is stateless", "The API uses HTTPS"], correctIndex: 1, explanation: "An idempotent operation (e.g., PUT, DELETE) produces the same result no matter how many times it is called." },
    ],
  },

  history: {
    1: [
      { id: "hi-1-1", level: 1, question: "Where was the Indus Valley Civilization centred?", options: ["Bengal delta", "Deccan plateau", "Northwestern India / Pakistan (Harappa, Mohenjo-daro)", "Eastern coast"], correctIndex: 2, explanation: "The Indus Valley Civilization (3300–1300 BCE) was in the Indus River basin — present-day Pakistan and northwest India." },
      { id: "hi-1-2", level: 1, question: "Who was the founder of the Maurya Empire?", options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Chanakya"], correctIndex: 1, explanation: "Chandragupta Maurya founded the Maurya Empire around 321 BCE, guided by Chanakya." },
      { id: "hi-1-3", level: 1, question: "In which year did India gain independence?", options: ["1945", "1947", "1950", "1942"], correctIndex: 1, explanation: "India gained independence from British rule on 15 August 1947." },
      { id: "hi-1-4", level: 1, question: "Who wrote Arthashastra?", options: ["Kalidasa", "Chanakya (Kautilya)", "Valmiki", "Aryabhata"], correctIndex: 1, explanation: "Arthashastra, a treatise on statecraft and economics, was written by Chanakya (also known as Kautilya)." },
      { id: "hi-1-5", level: 1, question: "Which river is considered the most sacred in Hinduism?", options: ["Yamuna", "Ganga", "Godavari", "Narmada"], correctIndex: 1, explanation: "The Ganga (Ganges) is considered the most sacred river in Hinduism." },
    ],
    2: [
      { id: "hi-2-1", level: 2, question: "Who founded the Mughal Empire in India?", options: ["Akbar", "Humayun", "Babur", "Shah Jahan"], correctIndex: 2, explanation: "Babur, a descendant of Timur and Genghis Khan, founded the Mughal Empire after the Battle of Panipat (1526)." },
      { id: "hi-2-2", level: 2, question: "The Bhakti movement emphasized:", options: ["Caste hierarchy", "Personal devotion to God regardless of caste or creed", "Military expansion", "Vedic rituals only"], correctIndex: 1, explanation: "The Bhakti movement (7th–17th century) stressed personal love and devotion to God, rejecting caste distinctions." },
      { id: "hi-2-3", level: 2, question: "What was the Delhi Sultanate?", options: ["A Mughal kingdom", "A series of Muslim dynasties that ruled India from 1206–1526", "A British trading post", "A Maratha confederacy"], correctIndex: 1, explanation: "The Delhi Sultanate (1206–1526) was a sequence of five dynasties — Slave, Khilji, Tughlaq, Sayyid, Lodi." },
      { id: "hi-2-4", level: 2, question: "Who built the Taj Mahal and for whom?", options: ["Akbar for Jodha Bai", "Shah Jahan for Mumtaz Mahal", "Babur for his mother", "Aurangzeb for his wife"], correctIndex: 1, explanation: "Shah Jahan built the Taj Mahal (1632–1653) as a mausoleum for his beloved wife Mumtaz Mahal." },
      { id: "hi-2-5", level: 2, question: "Which event is known as the 'Sepoy Mutiny' or 'First War of Independence' (1857)?", options: ["Bengal Partition", "Revolt of Indian soldiers against British East India Company", "Dandi March", "Quit India Movement"], correctIndex: 1, explanation: "The 1857 Revolt began as a mutiny of Indian soldiers (sepoys) against British authority and spread widely." },
    ],
    3: [
      { id: "hi-3-1", level: 3, question: "What was the significance of the Rowlatt Act (1919)?", options: ["Gave Indians voting rights", "Allowed the British to imprison Indians without trial, sparking mass protests", "Divided Bengal", "Granted dominion status to India"], correctIndex: 1, explanation: "The Rowlatt Act allowed detention without trial. It outraged Indians and led to the Jallianwala Bagh massacre." },
      { id: "hi-3-2", level: 3, question: "What was the Non-Cooperation Movement (1920–22) and why was it called off?", options: ["Boycott of British goods; called off when Gandhi was jailed", "Peaceful protest against British; called off after Chauri Chaura violence", "Tax revolt; ended by treaty", "Armed uprising; suppressed by force"], correctIndex: 1, explanation: "Gandhi launched NCM in 1920. He suspended it in 1922 after the Chauri Chaura incident, where protesters burned a police station." },
      { id: "hi-3-3", level: 3, question: "Who was B.R. Ambedkar and what was his contribution?", options: ["Freedom fighter who led the Quit India movement", "Chief architect of India's Constitution and champion of Dalit rights", "Founder of the Congress party", "Leader of the INA"], correctIndex: 1, explanation: "Ambedkar chaired the Constitution Drafting Committee, shaped fundamental rights, and fought lifelong for Dalit emancipation." },
      { id: "hi-3-4", level: 3, question: "What was the Cabinet Mission Plan (1946)?", options: ["A British plan to transfer power in stages and keep India united", "A plan to divide India into two nations immediately", "A proposal for a new parliament", "An army reorganisation plan"], correctIndex: 0, explanation: "The Cabinet Mission Plan proposed a federal structure keeping India united, but disagreements between Congress and Muslim League led to Partition." },
      { id: "hi-3-5", level: 3, question: "What were the main causes of the Bengal Famine of 1943?", options: ["Drought alone", "Combination of war policies, export of food, administrative failures under British rule", "Local mismanagement only", "Pest attacks"], correctIndex: 1, explanation: "The 1943 Bengal Famine killed ~3 million. Churchill's war policies, export of food from Bengal, and supply disruptions were key causes." },
    ],
    4: [
      { id: "hi-4-1", level: 4, question: "How did India's foreign policy of 'Non-Alignment' differ from neutrality during the Cold War?", options: ["No difference", "Non-alignment meant active engagement with both blocs on India's own terms, not passive neutrality", "India sided with the USA", "India was neutral and refused all foreign aid"], correctIndex: 1, explanation: "Nehru's Non-Alignment was proactive — India led the NAM, engaged both superpowers, and shaped global diplomacy." },
      { id: "hi-4-2", level: 4, question: "What was the Green Revolution in India and its social impact?", options: ["A forest conservation programme", "Agricultural revolution through high-yield crops — but created regional inequality and Punjab-focus disparities", "An urban planning initiative", "A movement against industrialisation"], correctIndex: 1, explanation: "The Green Revolution (1960s–70s) boosted wheat/rice yields but concentrated prosperity in Punjab/Haryana and created farmer class disparities." },
      { id: "hi-4-3", level: 4, question: "Explain the Pokhran-II nuclear tests (1998) and their geopolitical consequence:", options: ["India became a permanent UN Security Council member", "India declared itself a nuclear power, leading to US/Western sanctions and Pakistan's counter-tests", "India joined NATO", "China recognised India's nuclear status"], correctIndex: 1, explanation: "Pokhran-II under Vajpayee declared India a nuclear state. It triggered international sanctions and Pakistan's own tests — reshaping South Asian security." },
      { id: "hi-4-4", level: 4, question: "What led to the Emergency period (1975–77) in India?", options: ["A military coup", "Indira Gandhi declared a state of emergency after the Allahabad High Court verdict against her election", "External invasion", "Constitutional crisis over Parliament dissolution"], correctIndex: 1, explanation: "After the Allahabad HC ruled her 1971 election invalid, Indira Gandhi declared Emergency under Article 352, suspending civil liberties." },
      { id: "hi-4-5", level: 4, question: "What was the significance of the 73rd Constitutional Amendment (1992)?", options: ["Created IITs", "Empowered Panchayati Raj — gave constitutional status and reserved seats to local governance", "Abolished zamindari", "Created state finance commissions only"], correctIndex: 1, explanation: "The 73rd Amendment gave constitutional recognition to Panchayati Raj institutions, mandated elections and reserved seats for women and OBCs." },
    ],
    5: [
      { id: "hi-5-1", level: 5, question: "How did the Partition of Bengal (1905) accelerate Indian nationalism?", options: ["It had no effect on nationalism", "It united Hindus and Muslims against the British, birthing the Swadeshi movement and demonstrating mass mobilisation", "It weakened the freedom movement", "It was accepted peacefully"], correctIndex: 1, explanation: "Curzon's partition on religious lines backfired: it united communities, triggered the Swadeshi (indigenous goods) movement, and showed Indians could resist imperial policy." },
      { id: "hi-5-2", level: 5, question: "Compare the Lucknow Pact (1916) with the subsequent Hindu-Muslim tensions of the 1920s–30s:", options: ["The pact permanently resolved Hindu-Muslim differences", "The pact showed Congress-League unity was possible, but separate electorates entrenched communalism that later widened", "The pact was rejected immediately", "It had no political effect"], correctIndex: 1, explanation: "The 1916 Lucknow Pact united Congress and League temporarily. But its concession of separate electorates institutionalised communal politics that deepened in the 1930s–40s." },
      { id: "hi-5-3", level: 5, question: "What was Ambedkar's critique of Gandhian nationalism?", options: ["Ambedkar fully supported Gandhi", "Ambedkar argued Gandhi perpetuated caste hierarchy by not seeking its annihilation, while Gandhi prioritised Hindu-Muslim unity over Dalit emancipation", "Ambedkar was apolitical", "Ambedkar supported Jinnah over Gandhi"], correctIndex: 1, explanation: "Ambedkar in 'Annihilation of Caste' critiqued Gandhi for defending varna, believing Gandhi's approach treated Dalits' oppression as secondary to colonial independence." },
      { id: "hi-5-4", level: 5, question: "How did the Permanent Settlement of 1793 reshape agrarian society in Bengal?", options: ["It gave peasants ownership rights", "It created a class of zamindars with hereditary rights, alienating peasants who became tenants paying fixed rents regardless of harvest", "It abolished feudalism", "It was a land reform that helped cultivators"], correctIndex: 1, explanation: "The Permanent Settlement created absentee zamindars who could sell or mortgage land; peasants had no security — setting conditions for rural poverty and later peasant movements." },
      { id: "hi-5-5", level: 5, question: "Evaluate the role of Indian business communities (like the Bombay Plan, 1944) in shaping post-independence economic policy:", options: ["Indian businesses opposed all state intervention", "Indian capitalists proposed state planning as a partner to private enterprise — influencing Nehru's mixed-economy model", "The Bombay Plan advocated for free markets", "Business groups had no role in policy"], correctIndex: 1, explanation: "The Bombay Plan (Tata, Birla) called for heavy state investment in industry — surprisingly aligned with Nehruvian planning, shaping India's mixed-economy model post-1947." },
    ],
  },
};

// ── Chemistry / Organic Chemistry bank ────────────────────────────────────
const chemistryBank: Record<DifficultyLevel, SeedQuestion[]> = {
  1: [
    { id: "ch-1-1", level: 1, question: "Organic chemistry is the study of compounds containing which element?", options: ["Nitrogen", "Carbon", "Oxygen", "Hydrogen"], correctIndex: 1, explanation: "Organic chemistry focuses on carbon-containing compounds, as carbon forms the backbone of all organic molecules." },
    { id: "ch-1-2", level: 1, question: "What is the molecular formula of methane?", options: ["CH₂", "C₂H₆", "CH₄", "C₂H₄"], correctIndex: 2, explanation: "Methane (CH₄) is the simplest alkane with one carbon and four hydrogen atoms." },
    { id: "ch-1-3", level: 1, question: "Which functional group is present in alcohols?", options: ["-COOH", "-OH", "-CHO", "-NH₂"], correctIndex: 1, explanation: "Alcohols contain the hydroxyl (-OH) functional group, e.g. ethanol (C₂H₅OH)." },
    { id: "ch-1-4", level: 1, question: "What is the general formula of alkanes?", options: ["CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙHₙ"], correctIndex: 2, explanation: "Alkanes (saturated hydrocarbons) follow CₙH₂ₙ₊₂ — e.g. methane CH₄ (n=1), ethane C₂H₆ (n=2)." },
    { id: "ch-1-5", level: 1, question: "What type of bond does carbon form in ethene (C₂H₄)?", options: ["Triple bond", "Ionic bond", "Single bond only", "Double bond"], correctIndex: 3, explanation: "Ethene (C₂H₄) contains a C=C double bond, making it an alkene." },
  ],
  2: [
    { id: "ch-2-1", level: 2, question: "What is the IUPAC name of CH₃-CH₂-CH₃?", options: ["Methane", "Propane", "Butane", "Ethane"], correctIndex: 1, explanation: "Three carbon atoms in a straight chain = propane (prop = 3 carbons, -ane = alkane)." },
    { id: "ch-2-2", level: 2, question: "How many structural isomers does butane (C₄H₁₀) have?", options: ["1", "3", "2", "4"], correctIndex: 2, explanation: "Butane has 2 structural isomers: n-butane (straight chain) and isobutane (2-methylpropane)." },
    { id: "ch-2-3", level: 2, question: "Which reaction type do alkenes undergo with Br₂?", options: ["Substitution", "Elimination", "Addition", "Combustion"], correctIndex: 2, explanation: "Alkenes undergo electrophilic addition reactions across the C=C double bond. Br₂ adds to give a dibromoalkane (bromine water test)." },
    { id: "ch-2-4", level: 2, question: "What is the functional group in carboxylic acids?", options: ["-OH", "-CHO", "-COOH", "-CO-"], correctIndex: 2, explanation: "Carboxylic acids contain the -COOH (carboxyl) group, e.g. acetic acid CH₃COOH." },
    { id: "ch-2-5", level: 2, question: "What product forms when ethanol is oxidised?", options: ["Methanol", "Ethanoic acid (acetic acid)", "Propanol", "Water only"], correctIndex: 1, explanation: "Oxidising ethanol (CH₃CH₂OH) gives ethanoic acid (CH₃COOH), or ethanal as an intermediate." },
  ],
  3: [
    { id: "ch-3-1", level: 3, question: "Why is benzene (C₆H₆) unusually stable despite having unsaturation?", options: ["It has single bonds only", "Its π electrons are delocalised over the ring, giving extra stability (aromaticity)", "It reacts readily with Br₂", "It has a linear structure"], correctIndex: 1, explanation: "Benzene's 6 π electrons are delocalised in a ring (Hückel rule: 4n+2, n=1), conferring aromatic stability." },
    { id: "ch-3-2", level: 3, question: "What type of reaction does benzene typically undergo?", options: ["Addition", "Elimination", "Electrophilic substitution", "Nucleophilic addition"], correctIndex: 2, explanation: "Benzene prefers electrophilic aromatic substitution (EAS) to retain its stable aromatic system." },
    { id: "ch-3-3", level: 3, question: "What is the product of esterification between ethanol and ethanoic acid?", options: ["Diethyl ether", "Ethyl ethanoate + water", "Ethanoate ion + proton", "Ethane + CO₂"], correctIndex: 1, explanation: "Ethanol + ethanoic acid → ethyl ethanoate (an ester) + water. Reaction: CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O." },
    { id: "ch-3-4", level: 3, question: "What does 'saponification' mean in organic chemistry?", options: ["Making soap — base hydrolysis of an ester to give a carboxylate salt + alcohol", "Acid-catalysed esterification", "Dehydration of alcohols", "Polymerisation reaction"], correctIndex: 0, explanation: "Saponification is the alkaline hydrolysis of fats/esters: ester + NaOH → soap (sodium carboxylate) + glycerol." },
    { id: "ch-3-5", level: 3, question: "Which reagent is used to distinguish aldehydes from ketones?", options: ["Br₂ water", "NaOH solution", "Tollens' reagent (ammoniacal AgNO₃)", "HCl"], correctIndex: 2, explanation: "Tollens' reagent oxidises aldehydes to carboxylic acids and deposits a silver mirror. Ketones do NOT react." },
  ],
  4: [
    { id: "ch-4-1", level: 4, question: "What is the difference between SN1 and SN2 reactions?", options: ["No difference", "SN1 is unimolecular (2 steps, carbocation intermediate); SN2 is bimolecular (1 step, backside attack)", "SN2 forms a carbocation", "SN1 is faster with primary halides"], correctIndex: 1, explanation: "SN1: 2-step, rate depends only on substrate; favoured with tertiary halides. SN2: 1-step backside attack; favoured with primary halides." },
    { id: "ch-4-2", level: 4, question: "What does Markovnikov's rule state for addition of HBr to propene?", options: ["Br adds to the carbon with more H atoms", "Br adds to the carbon with fewer H atoms (more substituted)", "Equal addition at both carbons", "Only free radical addition follows this rule"], correctIndex: 1, explanation: "Markovnikov: the electrophile (H⁺) adds to the carbon with more hydrogens; Br⁻ adds to the more substituted (more stable carbocation) carbon." },
    { id: "ch-4-3", level: 4, question: "What is a Grignard reagent used for?", options: ["Dehydration reactions", "Forming new C-C bonds via nucleophilic addition to carbonyls", "Benzene electrophilic substitution", "Oxidising alcohols"], correctIndex: 1, explanation: "Grignard (RMgBr) is a strong nucleophile used to form new C-C bonds by adding to aldehydes, ketones, and esters." },
    { id: "ch-4-4", level: 4, question: "In Friedel-Crafts alkylation, what catalyst is used?", options: ["H₂SO₄", "AlCl₃ (Lewis acid)", "NaOH", "Pd/H₂"], correctIndex: 1, explanation: "AlCl₃ (anhydrous) is the classic Lewis acid catalyst for Friedel-Crafts reactions, generating the electrophilic carbocation." },
    { id: "ch-4-5", level: 4, question: "What is the Diels-Alder reaction?", options: ["An SN2 reaction", "A [4+2] cycloaddition between a diene and a dienophile to form a cyclohexene", "Oxidation of aromatics", "Polymerisation of alkenes"], correctIndex: 1, explanation: "The Diels-Alder is a [4+2] pericyclic cycloaddition: a conjugated diene + dienophile → 6-membered ring. Key for ring synthesis." },
  ],
  5: [
    { id: "ch-5-1", level: 5, question: "In retrosynthetic analysis, what does a retrosynthetic arrow (⟹) indicate?", options: ["A reaction step forward", "A disconnection — working backwards from target to simpler precursors", "An equilibrium reaction", "A catalyst addition"], correctIndex: 1, explanation: "Retrosynthesis (Corey) uses ⟹ to mean 'can be made from': working backwards to simpler starting materials." },
    { id: "ch-5-2", level: 5, question: "What is the Woodward-Hoffmann rule about?", options: ["Aromaticity in benzene rings", "Orbital symmetry conservation governing whether pericyclic reactions are thermally or photochemically allowed", "Stereochemistry of SN2", "Acid-base equilibria"], correctIndex: 1, explanation: "The W-H rules (1965) state that pericyclic reactions are allowed when orbital symmetry is conserved under thermal or photochemical conditions." },
    { id: "ch-5-3", level: 5, question: "What distinguishes E1cb elimination from E2?", options: ["No difference", "E1cb forms a carbanion intermediate; E2 is concerted (one step)", "E2 requires two steps", "E1cb occurs with primary substrates only"], correctIndex: 1, explanation: "E1cb: base removes proton first → carbanion intermediate → loss of leaving group (2 steps). E2: simultaneous proton removal + LG departure (1 step, anti-periplanar geometry)." },
    { id: "ch-5-4", level: 5, question: "In ¹H NMR spectroscopy, what does chemical shift (δ) indicate?", options: ["The molecular weight", "The resonance frequency relative to TMS, reflecting the electronic environment of protons", "The number of carbon atoms", "The melting point"], correctIndex: 1, explanation: "δ (ppm relative to TMS) tells you the electronic environment — shielded protons resonate upfield (low δ); deshielded ones resonate downfield (high δ)." },
    { id: "ch-5-5", level: 5, question: "What is the significance of the 'umpolung' strategy in organic synthesis?", options: ["Reversing reaction temperature", "Inverting the normal reactivity polarity of a functional group to enable otherwise impossible bond formations", "Using catalysts in reverse", "Changing solvent polarity"], correctIndex: 1, explanation: "Umpolung (Seebach): reverses inherent donor/acceptor character of a carbon, e.g. making an acyl anion from an aldehyde using dithiane chemistry." },
  ],
};

// Merge chemistry into main bank
(bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>)["chemistry"] = chemistryBank;
(bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>)["organic chemistry"] = chemistryBank;

// Topic alias map: common keywords → bank key
const TOPIC_ALIASES: Record<string, string> = {
  "organic chemistry": "organic chemistry",
  "organic": "organic chemistry",
  "chemistry": "chemistry",
  "inorganic": "chemistry",
  "physical chemistry": "chemistry",
  "physics": "science",
  "biology": "science",
  "algebra": "mathematics",
  "calculus": "mathematics",
  "geometry": "mathematics",
  "statistics": "mathematics",
  "maths": "mathematics",
  "math": "mathematics",
  "coding": "python",
  "javascript": "python",
  "java": "python",
  "programming": "python",
  "software": "python",
  "web dev": "python",
  "grammar": "english",
  "vocabulary": "english",
  "literature": "english",
  "writing": "english",
  "networking": "computer science",
  "databases": "computer science",
  "os": "computer science",
  "data structures": "computer science",
  "algorithms": "computer science",
  "india": "history",
  "civics": "history",
  "polity": "history",
  "geography": "history",
  "social studies": "history",
};

export function getSeedQuestion(
  topic: string,
  level: DifficultyLevel,
  askedIds: string[]
): (AdaptiveQuestion) | null {
  const key = topic.toLowerCase().trim();
  let questions: SeedQuestion[] | undefined;

  // Direct exact match first
  if ((bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>)[key]) {
    questions = (bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>)[key][level];
  }

  // Alias match — sort by alias length descending so "organic chemistry" beats "organic"
  if (!questions) {
    const sortedAliases = Object.entries(TOPIC_ALIASES).sort(([a], [b]) => b.length - a.length);
    for (const [alias, bankKey] of sortedAliases) {
      if (key.includes(alias) || alias.includes(key)) {
        const b = bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>;
        questions = b[bankKey]?.[level];
        if (questions) break;
      }
    }
  }

  // Substring match against bank keys
  if (!questions) {
    const b = bank as Record<string, Record<DifficultyLevel, SeedQuestion[]>>;
    for (const [k, levels] of Object.entries(b)) {
      if (key.includes(k) || k.includes(key)) {
        questions = levels[level];
        break;
      }
    }
  }

  if (!questions) {
    // Last resort: science fallback for unknown topics
    questions = bank["science"][level];
  }

  const available = questions.filter((q) => !askedIds.includes(q.id));
  if (available.length === 0) return null;

  const q = available[Math.floor(Math.random() * available.length)];
  return { ...q, topic };
}

export const PRESET_TOPICS = [
  { id: "python", label: "Python Programming", emoji: "🐍" },
  { id: "mathematics", label: "Mathematics", emoji: "📐" },
  { id: "english", label: "English Language", emoji: "📝" },
  { id: "science", label: "General Science", emoji: "⚗️" },
  { id: "computer science", label: "Computer Science", emoji: "💻" },
  { id: "history", label: "Indian History", emoji: "🏛️" },
];
