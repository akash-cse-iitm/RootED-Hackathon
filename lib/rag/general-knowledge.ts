import type { SupportedLocale } from "@/lib/rag/retrieve";

type GKEntry = {
  keywords: string[];
  en: string;
  hi: string;
  te: string;
  hinglish?: string;
};

const generalKnowledge: GKEntry[] = [
  {
    keywords: [
      "cybersecurity", "cyber security", "ethical hacking", "hacking", "network security",
      "information security", "pentesting", "bug bounty",
      // Hinglish
      "cyber sikho", "hacking sikho", "hacking kaise", "cyber security kaise",
      // Hindi / Telugu
      "साइबर सिक्योरिटी", "साइबर", "హ్యాకింగ్", "సైబర్"
    ],
    en: [
      "✅ Here is a roadmap to learn Cybersecurity in India:",
      "",
      "**Free courses to start:**",
      "• NPTEL – 'Introduction to Cyber Security' (free, IIT-certified): nptel.ac.in",
      "• NASSCOM FutureSkills Prime – free cybersecurity courses: futureskillsprime.in",
      "• Cisco NetAcad – free 'Introduction to Cybersecurity': netacad.com",
      "• Google Cybersecurity Certificate on Coursera (financial aid available)",
      "",
      "**Certifications to aim for:**",
      "• CompTIA Security+ (industry recognised, beginner-friendly)",
      "• CEH (Certified Ethical Hacker) — EC-Council",
      "• PMKVY Cybersecurity courses — free govt-funded training at pmkvyofficial.org",
      "",
      "**Practice platforms (free):**",
      "• TryHackMe (tryhackme.com) — guided labs for beginners",
      "• HackTheBox (hackthebox.com) — intermediate challenges",
      "• PortSwigger Web Security Academy — free web security labs",
      "",
      "**Government programme:**",
      "• Skill India / PMKVY has cybersecurity as a listed skill sector.",
      "Visit pmkvyofficial.org or skillindiadigital.gov.in to find a centre near you.",
      "",
      "Start with NPTEL or NASSCOM FutureSkills — both are free and recognised by Indian employers."
    ].join("\n"),
    hi: [
      "✅ साइबर सिक्योरिटी सीखने के लिए यह रोडमैप देखें:",
      "",
      "**मुफ्त कोर्स:**",
      "• NPTEL – 'Introduction to Cyber Security' (IIT द्वारा, निःशुल्क): nptel.ac.in",
      "• NASSCOM FutureSkills Prime – साइबर सिक्योरिटी कोर्स: futureskillsprime.in",
      "• Cisco NetAcad – 'Introduction to Cybersecurity' (निःशुल्क): netacad.com",
      "• Coursera पर Google Cybersecurity Certificate (फाइनेंशियल एड उपलब्ध)",
      "",
      "**सरकारी योजना:**",
      "• PMKVY – साइबर सिक्योरिटी एक Skill India सेक्टर है।",
      "• pmkvyofficial.org या skillindiadigital.gov.in पर अपने नज़दीकी सेंटर खोजें।",
      "",
      "**प्रैक्टिस के लिए:**",
      "• TryHackMe (tryhackme.com) – शुरुआती के लिए गाइडेड लैब्स",
      "• PortSwigger Web Security Academy – वेब सिक्योरिटी लैब्स (निःशुल्क)",
      "",
      "NPTEL या NASSCOM FutureSkills से शुरुआत करें — दोनों मुफ्त हैं।"
    ].join("\n"),
    te: [
      "✅ సైబర్ సెక్యూరిటీ నేర్చుకోవడానికి రోడ్‌మ్యాప్:",
      "",
      "**ఉచిత కోర్సులు:**",
      "• NPTEL – 'Introduction to Cyber Security' (IIT, ఉచిత): nptel.ac.in",
      "• NASSCOM FutureSkills Prime – సైబర్ సెక్యూరిటీ కోర్సులు: futureskillsprime.in",
      "• Cisco NetAcad – 'Introduction to Cybersecurity': netacad.com",
      "",
      "**ప్రభుత్వ పథకం:**",
      "• PMKVY – సైబర్ సెక్యూరిటీ Skill India సెక్టార్‌లో ఉంది.",
      "• pmkvyofficial.org లో మీ దగ్గర కేంద్రం వెతకండి.",
      "",
      "**ప్రాక్టీస్ కోసం:**",
      "• TryHackMe (tryhackme.com) – మొదలుపెట్టేవారికి",
      "• PortSwigger Web Security Academy – ఉచిత వెబ్ సెక్యూరిటీ ల్యాబ్స్"
    ].join("\n"),
    hinglish: [
      "Cybersecurity seekhna hai? Ekdum sahi choice yaar! 🔐",
      "",
      "Free courses se shuru karo:",
      "• NPTEL – 'Intro to Cyber Security' (IIT level, free hai): nptel.ac.in",
      "• NASSCOM FutureSkills – free courses: futureskillsprime.in",
      "• Cisco NetAcad – 'Intro to Cybersecurity' (bilkul free): netacad.com",
      "",
      "Certification chahiye toh:",
      "• CompTIA Security+ — beginner friendly hai",
      "• CEH (Certified Ethical Hacker) — thoda advanced",
      "• PMKVY ke through free training mil sakti hai: pmkvyofficial.org",
      "",
      "Practice ke liye:",
      "• TryHackMe.com — guided labs, shuruaat ke liye perfect",
      "• PortSwigger Web Security Academy — free web security labs",
      "",
      "NPTEL se start karo — free hai aur employers respect karte hain!"
    ].join("\n")
  },

  {
    keywords: [
      "programming", "coding", "software", "python", "java", "web development",
      "app development", "data science", "machine learning", "ai", "artificial intelligence",
      // Hinglish
      "coding kaise", "coding sikho", "coding seekhna", "programming kaise", "python sikho",
      "python seekhna", "web dev kaise", "software kaise", "app banana", "padhai kaise",
      // Hindi / Telugu
      "कोडिंग", "प्रोग्रामिंग", "సాఫ్ట్‌వేర్", "కోడింగ్"
    ],
    en: [
      "✅ How to start learning programming / software development in India:",
      "",
      "**Free platforms:**",
      "• NPTEL – Python, Data Science, AI courses (IIT faculty, free): nptel.ac.in",
      "• SWAYAM – government MOOC platform with CS courses: swayam.gov.in",
      "• DIKSHA – digital learning resources: diksha.gov.in",
      "• freeCodeCamp.org – web development (completely free)",
      "• CS50 by Harvard on edX (free to audit)",
      "",
      "**Skill India / PMKVY options:**",
      "• IT-ITES sector skill council runs free software coding courses",
      "• Visit pmkvyofficial.org or skillindiadigital.gov.in",
      "",
      "**Beginner path:**",
      "1. Start with Python (NPTEL 'Introduction to Python' or freeCodeCamp)",
      "2. Build 2–3 small projects (calculator, quiz app, to-do list)",
      "3. Learn Git and put projects on GitHub",
      "4. Apply to internships via LinkedIn, Internshala, or ncs.gov.in"
    ].join("\n"),
    hi: [
      "✅ प्रोग्रामिंग / कोडिंग कैसे सीखें:",
      "",
      "**मुफ्त प्लेटफॉर्म:**",
      "• NPTEL – Python, Data Science, AI (IIT, निःशुल्क): nptel.ac.in",
      "• SWAYAM – सरकारी MOOC प्लेटफॉर्म: swayam.gov.in",
      "• freeCodeCamp.org – वेब डेवलपमेंट (पूरी तरह मुफ्त)",
      "",
      "**शुरुआत के लिए:**",
      "1. Python से शुरू करें (NPTEL या freeCodeCamp से)",
      "2. 2-3 छोटे प्रोजेक्ट बनाएं",
      "3. GitHub पर प्रोजेक्ट डालें",
      "4. Internshala या ncs.gov.in पर इंटर्नशिप खोजें"
    ].join("\n"),
    te: [
      "✅ ప్రోగ్రామింగ్ / కోడింగ్ ఎలా నేర్చుకోవాలి:",
      "",
      "**ఉచిత వేదికలు:**",
      "• NPTEL – Python, AI కోర్సులు (ఉచిత): nptel.ac.in",
      "• SWAYAM – ప్రభుత్వ MOOC వేదిక: swayam.gov.in",
      "• freeCodeCamp.org – వెబ్ డెవలప్‌మెంట్ (పూర్తిగా ఉచిత)",
      "",
      "**మొదలుపెట్టే క్రమం:**",
      "1. Python తో మొదలుపెట్టండి (NPTEL లేదా freeCodeCamp)",
      "2. 2-3 చిన్న ప్రాజెక్ట్‌లు చేయండి",
      "3. ncs.gov.in లో ఇంటర్న్‌షిప్ వెతకండి"
    ].join("\n"),
    hinglish: [
      "Coding seekhna hai? Let's go! 💻",
      "",
      "Free platforms se shuru karo:",
      "• NPTEL – Python, AI, Data Science (IIT faculty, free): nptel.ac.in",
      "• freeCodeCamp.org – web development, bilkul free",
      "• SWAYAM – govt MOOC platform: swayam.gov.in",
      "• CS50 by Harvard (free audit): edx.org",
      "",
      "Step-by-step path:",
      "1. Python se start karo (NPTEL ya freeCodeCamp se)",
      "2. 2-3 chhote projects banao (calculator, quiz app)",
      "3. GitHub pe daalo — employers dekhte hain",
      "4. Internshala ya ncs.gov.in pe internship ke liye apply karo",
      "",
      "PMKVY ke through free software coding training bhi mil sakti hai: pmkvyofficial.org"
    ].join("\n")
  },

  {
    keywords: [
      "career", "job", "employment", "work", "internship", "placement",
      // Hinglish
      "naukri chahiye", "job chahiye", "naukri kaise", "job kaise", "career kaise",
      "career guidance", "internship chahiye", "kaam chahiye", "rozgar",
      // Hindi / Telugu
      "करियर", "नौकरी", "जॉब", "కెరీర్", "ఉద్యోగం"
    ],
    en: [
      "✅ Career & job resources for learners in India:",
      "",
      "• National Career Service (NCS): ncs.gov.in — official job portal, free registration",
      "• Internshala: internshala.com — internships and fresher jobs",
      "• LinkedIn: linkedin.com — professional networking and job listings",
      "• PMKVY: pmkvyofficial.org — free government-funded skill training linked to job placement",
      "• Skill India Digital: skillindiadigital.gov.in — courses + job opportunities",
      "",
      "**Steps:**",
      "1. Register on ncs.gov.in with your educational details",
      "2. Explore PMKVY training near your location",
      "3. Build a simple LinkedIn profile after your first skill certificate",
      "4. Apply to internships on Internshala to get experience"
    ].join("\n"),
    hi: [
      "✅ करियर और नौकरी के लिए संसाधन:",
      "",
      "• नेशनल करियर सर्विस: ncs.gov.in – सरकारी जॉब पोर्टल, निःशुल्क",
      "• Internshala: internshala.com – इंटर्नशिप और फ्रेशर जॉब्स",
      "• PMKVY: pmkvyofficial.org – सरकारी स्किल ट्रेनिंग जो नौकरी से जुड़ी है",
      "",
      "**कदम:**",
      "1. ncs.gov.in पर रजिस्ट्रेशन करें",
      "2. PMKVY पर अपने नज़दीकी ट्रेनिंग सेंटर खोजें",
      "3. Internshala पर इंटर्नशिप के लिए अप्लाई करें"
    ].join("\n"),
    te: [
      "✅ కెరీర్ మరియు ఉద్యోగ వనరులు:",
      "",
      "• National Career Service: ncs.gov.in – అధికారిక ఉద్యోగ పోర్టల్",
      "• Internshala: internshala.com – ఇంటర్న్‌షిప్‌లు",
      "• PMKVY: pmkvyofficial.org – ఉచిత నైపుణ్య శిక్షణ"
    ].join("\n"),
    hinglish: [
      "Naukri dhundh rahe ho? Sahi jagah aaye ho! 💼",
      "",
      "Yeh sites pe register karo:",
      "• NCS (National Career Service): ncs.gov.in — govt job portal, free hai",
      "• Internshala: internshala.com — internships aur fresher jobs ke liye best",
      "• LinkedIn: linkedin.com — professional networking + job listings",
      "• PMKVY: pmkvyofficial.org — free govt skill training, placement bhi milta hai",
      "",
      "Step-by-step:",
      "1. ncs.gov.in pe apni details daal ke register karo",
      "2. Apne area mein PMKVY training centre dhundho",
      "3. Pehla skill certificate milne ke baad LinkedIn profile banao",
      "4. Internshala se internship ke liye apply karo — experience milega"
    ].join("\n")
  },

  {
    keywords: [
      "data science", "data analytics", "machine learning", "deep learning", "nlp",
      // Hinglish
      "data science kaise", "ml kaise", "machine learning sikho", "data analyst kaise",
      // Hindi / Telugu
      "डेटा साइंस", "మెషీన్ లెర్నింగ్"
    ],
    en: [
      "✅ Learning Data Science / Machine Learning in India (free paths):",
      "",
      "• NPTEL – 'Introduction to Machine Learning' by IIT Madras: nptel.ac.in",
      "• NPTEL – 'Deep Learning' by Prof. Mitesh Khapra (IIT Madras)",
      "• Kaggle – free ML micro-courses + real datasets: kaggle.com",
      "• Google ML Crash Course: developers.google.com/machine-learning/crash-course",
      "• fast.ai – practical deep learning (free): fast.ai",
      "",
      "**Certifications:**",
      "• IBM Data Science Professional Certificate on Coursera (financial aid available)",
      "• Google Data Analytics Certificate on Coursera",
      "",
      "Start with NPTEL + Kaggle — both are free and highly respected by Indian companies."
    ].join("\n"),
    hi: [
      "✅ डेटा साइंस / ML सीखने के लिए (मुफ्त):",
      "",
      "• NPTEL – 'Introduction to Machine Learning' (IIT मद्रास): nptel.ac.in",
      "• Kaggle – मुफ्त ML कोर्स + रियल डेटासेट: kaggle.com",
      "• Google ML Crash Course: developers.google.com/machine-learning/crash-course",
      "",
      "NPTEL से शुरुआत करें — IIT द्वारा, पूरी तरह मुफ्त।"
    ].join("\n"),
    te: [
      "✅ డేటా సైన్స్ / ML నేర్చుకోవడానికి (ఉచిత):",
      "",
      "• NPTEL – 'Introduction to Machine Learning' (IIT మద్రాస్): nptel.ac.in",
      "• Kaggle – ఉచిత ML కోర్సులు: kaggle.com",
      "• Google ML Crash Course (ఉచిత)"
    ].join("\n"),
    hinglish: [
      "Data Science / Machine Learning seekhna hai? Super field hai! 📊",
      "",
      "Yeh free resources use karo:",
      "• NPTEL – 'Introduction to ML' by IIT Madras (free, certified): nptel.ac.in",
      "• Kaggle – free ML micro-courses + real datasets: kaggle.com",
      "• Google ML Crash Course (bilkul free): developers.google.com/machine-learning/crash-course",
      "• fast.ai – practical deep learning: fast.ai",
      "",
      "Certifications ke liye:",
      "• IBM Data Science Certificate on Coursera (financial aid milti hai)",
      "• Google Data Analytics Certificate on Coursera",
      "",
      "NPTEL + Kaggle se shuru karo — dono free hain aur Indian companies inhe respect karti hain."
    ].join("\n")
  },

  {
    keywords: [
      "design", "graphic design", "ui design", "ux design", "ui/ux", "figma", "photoshop",
      "user interface", "user experience",
      // Hinglish
      "design kaise", "design sikho", "design seekhna", "graphic design kaise",
      // Hindi / Telugu
      "डिज़ाइन", "డిజైన్"
    ],
    en: [
      "✅ Learning Graphic Design / UI-UX in India:",
      "",
      "**Free resources:**",
      "• Canva Design School: designschool.canva.com (free, beginner-friendly)",
      "• Figma UI/UX: figma.com — free for students and small teams",
      "• Google UX Design Certificate on Coursera (financial aid available)",
      "• NPTEL – 'Human Computer Interaction': nptel.ac.in",
      "",
      "**PMKVY / Skill India:**",
      "• Graphic Design is a listed skill sector under PMKVY.",
      "• Find a training centre at pmkvyofficial.org",
      "",
      "Build a portfolio on Behance (behance.net) to show your work to employers."
    ].join("\n"),
    hi: [
      "✅ ग्राफिक डिज़ाइन / UI-UX कैसे सीखें:",
      "",
      "• Canva Design School: designschool.canva.com (निःशुल्क)",
      "• Google UX Design Certificate (Coursera, फाइनेंशियल एड उपलब्ध)",
      "• PMKVY में Graphic Design एक स्किल सेक्टर है: pmkvyofficial.org",
      "",
      "Behance पर अपना पोर्टफोलियो बनाएं।"
    ].join("\n"),
    te: [
      "✅ గ్రాఫిక్ డిజైన్ / UI-UX నేర్చుకోవడానికి:",
      "",
      "• Canva Design School (ఉచిత): designschool.canva.com",
      "• Google UX Design Certificate (Coursera, ఆర్థిక సహాయం అందుబాటులో ఉంది)",
      "• PMKVY లో గ్రాఫిక్ డిజైన్ ఒక నైపుణ్య రంగం: pmkvyofficial.org"
    ].join("\n"),
    hinglish: [
      "Design seekhna hai? Great career option hai yaar! 🎨",
      "",
      "Free se shuru karo:",
      "• Canva Design School: designschool.canva.com — beginner friendly, free",
      "• Figma: figma.com — students ke liye free, industry standard tool",
      "• Google UX Design Certificate on Coursera (financial aid ke liye apply kar sakte ho)",
      "• NPTEL – 'Human Computer Interaction': nptel.ac.in",
      "",
      "Govt se support:",
      "• PMKVY mein Graphic Design ek skill sector hai — free training milti hai",
      "• pmkvyofficial.org pe apne area ka centre dhundho",
      "",
      "Portfolio banao Behance pe (behance.net) — employers wahan hi dekhte hain!"
    ].join("\n")
  },

  {
    keywords: [
      "english", "speak english", "english speaking", "communication", "ielts", "toefl",
      // Hinglish
      "english bolna", "english kaise", "english sikho", "english seekhna",
      "english improve", "baat karna", "communication skills",
      // Hindi / Telugu
      "अंग्रेजी", "ఇంగ్లీష్"
    ],
    en: [
      "✅ How to improve English speaking and communication:",
      "",
      "**Free resources:**",
      "• British Council LearnEnglish app: learnenglish.britishcouncil.org",
      "• BBC Learning English: bbc.co.uk/learningenglish",
      "• Duolingo: duolingo.com — gamified daily practice",
      "• NPTEL – 'Developing Soft Skills and Personality': nptel.ac.in",
      "",
      "**Practice tips:**",
      "1. Listen to English news (BBC Hindi has bilingual content to bridge)",
      "2. Speak for 5 minutes a day, record yourself",
      "3. Join a local or online English speaking group",
      "",
      "SWAYAM also has English communication courses — check swayam.gov.in"
    ].join("\n"),
    hi: [
      "✅ अंग्रेजी सीखने के लिए:",
      "",
      "• British Council LearnEnglish: learnenglish.britishcouncil.org (निःशुल्क)",
      "• BBC Learning English: bbc.co.uk/learningenglish",
      "• Duolingo: duolingo.com – रोज 10 मिनट",
      "• SWAYAM पर English Communication के कोर्स: swayam.gov.in",
      "",
      "रोज 5 मिनट अंग्रेजी में बोलें, खुद को रिकॉर्ड करें।"
    ].join("\n"),
    te: [
      "✅ ఇంగ్లీష్ నేర్చుకోవడానికి:",
      "",
      "• British Council LearnEnglish: learnenglish.britishcouncil.org (ఉచిత)",
      "• BBC Learning English: bbc.co.uk/learningenglish",
      "• Duolingo: duolingo.com",
      "• SWAYAM లో English కోర్సులు: swayam.gov.in"
    ].join("\n"),
    hinglish: [
      "English improve karna chahte ho? Bilkul ho sakta hai! 🗣️",
      "",
      "Free resources jo actually kaam karte hain:",
      "• British Council LearnEnglish app: learnenglish.britishcouncil.org — free, best app hai",
      "• BBC Learning English: bbc.co.uk/learningenglish — daily practice ke liye",
      "• Duolingo: duolingo.com — gamified, roz 10 min karo",
      "• SWAYAM pe English communication courses bhi hain: swayam.gov.in",
      "",
      "Practice tips:",
      "1. Roz 5 min English mein bolo — khud ko record karo phone pe",
      "2. BBC Hindi sunne ke baad English news bhi suno",
      "3. Online English speaking group join karo — free milte hain",
      "",
      "NPTEL ka 'Developing Soft Skills and Personality' bhi try karo: nptel.ac.in"
    ].join("\n")
  },

  {
    keywords: [
      "finance", "banking", "accounting", "tally", "gst", "tax", "chartered accountant",
      "ca",
      // Hinglish
      "finance kaise", "banking kaise", "banking exam", "tally sikho", "account kaise",
      "paise ka hisaab", "paisa management",
      // Hindi / Telugu
      "फाइनेंस", "बैंकिंग", "ఫైనాన్స్", "బ్యాంకింగ్"
    ],
    en: [
      "✅ Learning Finance / Banking / Accounting in India:",
      "",
      "**Free resources:**",
      "• NPTEL – 'Financial Institutions and Markets': nptel.ac.in",
      "• NSE Academy courses (some free): nseindia.com/education",
      "• Tally Education — free Tally ERP courses: tallysolutions.com",
      "• GST learning portal: gst.gov.in/category/gst-learning",
      "",
      "**PMKVY / Skill India:**",
      "• BFSI (Banking, Financial Services & Insurance) is a major Skill India sector.",
      "• Find a BFSI training centre at pmkvyofficial.org or skillindiadigital.gov.in",
      "",
      "**Certifications:**",
      "• NISM certifications for stock market and mutual funds: nism.ac.in",
      "• IIBF courses for banking: iibf.org.in"
    ].join("\n"),
    hi: [
      "✅ फाइनेंस / बैंकिंग / अकाउंटिंग कैसे सीखें:",
      "",
      "• NPTEL – Financial Institutions and Markets: nptel.ac.in",
      "• Tally ERP मुफ्त कोर्स: tallysolutions.com",
      "• PMKVY में BFSI सेक्टर – pmkvyofficial.org",
      "• NISM सर्टिफिकेशन (शेयर मार्केट): nism.ac.in"
    ].join("\n"),
    te: [
      "✅ ఫైనాన్స్ / బ్యాంకింగ్ నేర్చుకోవడానికి:",
      "",
      "• NPTEL – Financial Institutions: nptel.ac.in",
      "• PMKVY లో BFSI రంగం: pmkvyofficial.org",
      "• NISM సర్టిఫికేషన్: nism.ac.in"
    ].join("\n"),
    hinglish: [
      "Finance / Banking seekhna hai? Smart choice! 💰",
      "",
      "Free resources yahan se lo:",
      "• NPTEL – 'Financial Institutions and Markets': nptel.ac.in",
      "• Tally ERP – free courses: tallysolutions.com (accounting jobs ke liye zaroori)",
      "• GST learning portal: gst.gov.in/category/gst-learning",
      "• NSE Academy – kuch courses free hain: nseindia.com/education",
      "",
      "Govt support:",
      "• PMKVY mein BFSI (Banking, Finance, Insurance) ek bada sector hai",
      "• Free training + placement support milta hai: pmkvyofficial.org",
      "",
      "Certifications:",
      "• NISM – stock market ke liye (agar trading/investing mein jaana hai): nism.ac.in",
      "• IIBF – banking exams ke liye: iibf.org.in"
    ].join("\n")
  },

  {
    keywords: [
      "study abroad", "university", "college admission", "entrance exam", "jee", "neet",
      "upsc", "ssc", "government job",
      // Hinglish
      "sarkari naukri", "government job kaise", "upsc kaise", "ssc kaise", "jee kaise",
      "neet kaise", "competitive exam", "exam ki taiyari", "taiyari kaise",
      // Hindi / Telugu
      "सरकारी नौकरी", "ప్రభుత్వ ఉద్యోగం"
    ],
    en: [
      "✅ Competitive exam and government job preparation resources:",
      "",
      "**Free prep resources:**",
      "• NPTEL + SWAYAM: free courses for technical subjects (JEE Maths, Science)",
      "• Unacademy / Khan Academy — free video lessons for JEE, NEET, UPSC",
      "• YouTube channels: Physics Wallah, Unacademy, UPSC Pathshala",
      "",
      "**Government job portals:**",
      "• SSC: ssc.nic.in — staff selection commission",
      "• IBPS: ibps.in — bank exams",
      "• National Career Service: ncs.gov.in — job listings from government to private",
      "• PM Yuva 2.0 — mentorship programme for entrepreneurship",
      "",
      "**Scholarships for exam prep:**",
      "• National Scholarship Portal (NSP) has post-matric scholarships that cover coaching fees.",
      "• Visit scholarships.gov.in and search 'coaching scholarship'."
    ].join("\n"),
    hi: [
      "✅ सरकारी नौकरी / प्रतियोगी परीक्षा तैयारी:",
      "",
      "• SWAYAM – तकनीकी विषयों के लिए मुफ्त कोर्स: swayam.gov.in",
      "• SSC: ssc.nic.in | IBPS: ibps.in | NCS: ncs.gov.in",
      "• YouTube: Physics Wallah, Unacademy (UPSC, SSC के लिए)",
      "• NSP पर कोचिंग स्कॉलरशिप: scholarships.gov.in"
    ].join("\n"),
    te: [
      "✅ ప్రతియోగిత పరీక్షలు / ప్రభుత్వ ఉద్యోగం:",
      "",
      "• SWAYAM – ఉచిత సాంకేతిక కోర్సులు: swayam.gov.in",
      "• SSC: ssc.nic.in | IBPS: ibps.in | NCS: ncs.gov.in",
      "• NSP లో కోచింగ్ స్కాలర్‌షిప్: scholarships.gov.in"
    ].join("\n"),
    hinglish: [
      "Sarkari naukri / competitive exam ki taiyari? Bilkul sahi! 🏛️",
      "",
      "Free prep ke liye:",
      "• SWAYAM – Maths, Science ke free courses: swayam.gov.in",
      "• Khan Academy – JEE, NEET ke liye (free): khanacademy.org",
      "• YouTube: Physics Wallah (JEE/NEET), UPSC Pathshala, Unacademy (free videos)",
      "",
      "Sarkari job portals:",
      "• SSC: ssc.nic.in — 10th/12th ke baad apply kar sakte ho",
      "• IBPS: ibps.in — bank exams",
      "• NCS: ncs.gov.in — sab jagah ki govt + private jobs",
      "",
      "Coaching scholarship bhi milti hai:",
      "• NSP (National Scholarship Portal) pe 'coaching scholarship' search karo: scholarships.gov.in"
    ].join("\n")
  },

  // ── Scholarship entry — catches Hinglish/Hindi scholarship queries before KB ──
  {
    keywords: [
      "scholarship", "scholarships", "financial aid", "fee waiver", "bursary", "stipend",
      // Hinglish
      "scholarship chahiye", "scholarship kaise milegi", "scholarship kaise", "scholarship ke liye",
      "paisa chahiye padhai", "fees ke liye paise",
      // Hindi / Telugu
      "छात्रवृत्ति", "स्कॉलरशिप", "వేతనం", "స్కాలర్‌షిప్"
    ],
    en: [
      "✅ How to find and apply for scholarships in India:",
      "",
      "**National Scholarship Portal (NSP) — most important:**",
      "• Visit scholarships.gov.in and register with your Aadhaar",
      "• Pre-matric scholarships: Class 1–10 (SC/ST/OBC/minority students)",
      "• Post-matric scholarships: Class 11 and above",
      "• Deadline is usually September–November each year — apply early!",
      "",
      "**Other major scholarships:**",
      "• PM Scholarship Scheme — for children of ex-servicemen / para-military",
      "• Inspire Scholarship (DST) — for science students with 80%+",
      "• Pragati / Saksham — AICTE scholarship for girl students in engineering",
      "• State govt scholarships — check your state's e-district portal",
      "",
      "**Steps to apply:**",
      "1. Register on scholarships.gov.in with Aadhaar + bank account",
      "2. Choose your scholarship category (pre/post matric, caste, state)",
      "3. Upload income certificate, caste certificate, marksheet",
      "4. Track status on the same portal"
    ].join("\n"),
    hi: [
      "✅ छात्रवृत्ति (Scholarship) के लिए कैसे आवेदन करें:",
      "",
      "**नेशनल स्कॉलरशिप पोर्टल (NSP) — सबसे ज़रूरी:**",
      "• scholarships.gov.in पर जाएं और आधार से रजिस्टर करें",
      "• प्री-मैट्रिक: कक्षा 1–10 (SC/ST/OBC/अल्पसंख्यक छात्रों के लिए)",
      "• पोस्ट-मैट्रिक: कक्षा 11 और उससे ऊपर",
      "• आवेदन की आखिरी तारीख आमतौर पर सितंबर–नवंबर होती है",
      "",
      "**अन्य महत्वपूर्ण छात्रवृत्तियाँ:**",
      "• PM स्कॉलरशिप — पूर्व सैनिकों के बच्चों के लिए",
      "• Inspire (DST) — 80%+ विज्ञान छात्रों के लिए",
      "• राज्य सरकार की छात्रवृत्ति — अपने राज्य का e-district पोर्टल देखें",
      "",
      "**आवेदन के कदम:**",
      "1. scholarships.gov.in पर आधार + बैंक अकाउंट से रजिस्टर करें",
      "2. अपनी कैटेगरी चुनें (प्री/पोस्ट मैट्रिक, जाति, राज्य)",
      "3. आय प्रमाण पत्र, जाति प्रमाण पत्र, मार्कशीट अपलोड करें"
    ].join("\n"),
    te: [
      "✅ స్కాలర్‌షిప్ ఎలా పొందాలి:",
      "",
      "**National Scholarship Portal (NSP) — అన్నిటికంటే ముఖ్యమైనది:**",
      "• scholarships.gov.in లో ఆధార్ తో రిజిస్టర్ చేయండి",
      "• Pre-matric: Class 1–10 (SC/ST/OBC/మైనారిటీ విద్యార్థులకు)",
      "• Post-matric: Class 11 తర్వాత",
      "• దరఖాస్తు గడువు సాధారణంగా సెప్టెంబర్–నవంబర్",
      "",
      "**దశలు:**",
      "1. scholarships.gov.in లో ఆధార్ + బ్యాంక్ అకౌంట్ తో నమోదు చేయండి",
      "2. మీ కేటగిరీ ఎంచుకోండి",
      "3. ఆదాయ ధృవీకరణ పత్రం, కుల ధృవీకరణ పత్రం, మార్క్‌షీట్ అప్‌లోడ్ చేయండి"
    ].join("\n"),
    hinglish: [
      "Scholarship chahiye? Bilkul sahi socha! Yahan se apply karo 🎓",
      "",
      "Sabse pehle yahan jao:",
      "• NSP (National Scholarship Portal): scholarships.gov.in",
      "  — Aadhaar aur bank account se register karo",
      "  — Pre-matric: Class 1–10 ke liye (SC/ST/OBC/minority students)",
      "  — Post-matric: Class 11 ke baad ke liye",
      "  — Deadline usually September–November hoti hai — jaldi apply karo!",
      "",
      "Aur bhi options hain:",
      "• PM Scholarship — ex-servicemen ke bachon ke liye",
      "• Inspire Scholarship (DST) — science mein 80%+ hai toh apply karo",
      "• Pragati / Saksham — engineering mein padhne wali girls ke liye (AICTE)",
      "• State scholarship — apne state ka e-district portal dekho",
      "",
      "Apply kaise karein:",
      "1. scholarships.gov.in pe jaao aur register karo",
      "2. Apni category choose karo (caste, state, pre ya post matric)",
      "3. Documents upload karo: income certificate, caste certificate, marksheet",
      "4. Status track karo usi portal pe"
    ].join("\n")
  }
];

function matchesKeyword(query: string, keyword: string): boolean {
  const kw = keyword.toLowerCase();
  const idx = query.indexOf(kw);
  if (idx === -1) return false;

  // For short keywords (≤3 chars like "ui", "ux", "ca") require word boundaries
  // to avoid "guidance".includes("ui") false positives
  if (kw.length <= 3) {
    const before = idx === 0 ? " " : query[idx - 1];
    const after = idx + kw.length >= query.length ? " " : query[idx + kw.length];
    const isBoundary = (c: string) => /[\s,.\-\/()\[\]!?:;]/.test(c);
    return isBoundary(before) && isBoundary(after);
  }

  return true;
}

export function generalKnowledgeAnswer(
  query: string,
  lang: SupportedLocale,
  isHinglish = false
): string | null {
  const q = query.toLowerCase();

  for (const entry of generalKnowledge) {
    const matches = entry.keywords.some((kw) => matchesKeyword(q, kw));
    if (matches) {
      if (lang === "hi") return entry.hi;
      if (lang === "te") return entry.te;
      if (isHinglish && entry.hinglish) return entry.hinglish;
      return entry.en;
    }
  }

  return null;
}
