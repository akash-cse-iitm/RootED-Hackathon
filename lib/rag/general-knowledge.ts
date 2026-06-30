import type { SupportedLocale } from "@/lib/rag/retrieve";

type GKEntry = {
  keywords: string[];
  en: string;
  hi: string;
  te: string;
};

const generalKnowledge: GKEntry[] = [
  {
    keywords: [
      "cybersecurity", "cyber security", "ethical hacking", "hacking", "network security",
      "information security", "pentesting", "bug bounty", "साइबर सिक्योरिटी", "साइबर",
      "హ్యాకింగ్", "సైబర్"
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
    ].join("\n")
  },

  {
    keywords: [
      "programming", "coding", "software", "python", "java", "web development",
      "app development", "data science", "machine learning", "ai", "artificial intelligence",
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
    ].join("\n")
  },

  {
    keywords: [
      "career", "job", "employment", "work", "internship", "placement",
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
    ].join("\n")
  },

  {
    keywords: [
      "data science", "data analytics", "machine learning", "deep learning", "nlp",
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
    ].join("\n")
  },

  {
    keywords: [
      "design", "graphic design", "ui", "ux", "figma", "photoshop",
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
    ].join("\n")
  },

  {
    keywords: [
      "english", "speak english", "english speaking", "communication", "ielts", "toefl",
      "अंग्रेजी", "english bolna", "ఇంగ్లీష్"
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
    ].join("\n")
  },

  {
    keywords: [
      "finance", "banking", "accounting", "tally", "gst", "tax", "chartered accountant",
      "ca", "फाइनेंस", "बैंकिंग", "ఫైనాన్స్", "బ్యాంకింగ్"
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
    ].join("\n")
  },

  {
    keywords: [
      "study abroad", "university", "college admission", "entrance exam", "jee", "neet",
      "upsc", "ssc", "government job", "सरकारी नौकरी", "ప్రభుత్వ ఉద్యోగం"
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
    ].join("\n")
  }
];

export function generalKnowledgeAnswer(
  query: string,
  lang: SupportedLocale
): string | null {
  const q = query.toLowerCase();

  for (const entry of generalKnowledge) {
    const matches = entry.keywords.some((kw) => q.includes(kw.toLowerCase()));
    if (matches) {
      if (lang === "hi") return entry.hi;
      if (lang === "te") return entry.te;
      return entry.en;
    }
  }

  return null;
}
