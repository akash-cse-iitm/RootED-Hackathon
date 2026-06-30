import type { CounselingTopic } from "./store";

type GuidanceEntry = {
  en: { heading: string; tips: string[]; resources: string[] };
  hi: { heading: string; tips: string[]; resources: string[] };
  te: { heading: string; tips: string[]; resources: string[] };
};

export const TOPIC_LABELS: Record<CounselingTopic, string> = {
  "dropout-pressure": "Child being pressured to drop out",
  "child-marriage": "Early / child marriage concern",
  "financial": "Financial difficulty affecting school",
  "mental-health": "Student mental health or stress",
  "peer-conflict": "Bullying or peer conflict",
  "domestic-violence": "Domestic violence or unsafe home",
  "attendance": "Poor attendance or school refusal",
  "other": "Other / general family concern"
};

export const guidance: Record<CounselingTopic, GuidanceEntry> = {
  "dropout-pressure": {
    en: {
      heading: "How to help a child who is being pressured to leave school",
      tips: [
        "Have a calm, private conversation with your child. Ask them how they are feeling — listen without interrupting.",
        "Explain the long-term impact: every year of secondary school increases lifetime earnings by 8–10% on average.",
        "Contact the school counselor or head teacher. They can initiate a family meeting and discuss flexible options.",
        "If economic pressure is the reason, apply for PMKVY stipend or NSP scholarship immediately — the income can reduce pressure.",
        "Reach out to your local Anganwadi worker or ASHA — they can connect your family to welfare schemes.",
        "Do not blame the child. Reassure them that their education is the family's priority."
      ],
      resources: [
        "National Scholarship Portal: scholarships.gov.in",
        "PMKVY stipend information: pmkvyofficial.org",
        "Samagra Shiksha district helpline: your state education department",
        "CHILDLINE (free, 24/7): Call or WhatsApp 1098"
      ]
    },
    hi: {
      heading: "स्कूल छोड़ने का दबाव झेल रहे बच्चे की मदद कैसे करें",
      tips: [
        "बच्चे से शांत और अकेले में बात करें। उनकी भावनाओं को बिना टोके सुनें।",
        "दीर्घकालिक प्रभाव समझाएं: माध्यमिक शिक्षा का हर साल जीवन भर की कमाई 8–10% बढ़ाता है।",
        "स्कूल काउंसलर या प्रधानाध्यापक से मिलें — वे परिवार की बैठक बुला सकते हैं।",
        "अगर आर्थिक दबाव है, तो तुरंत NSP छात्रवृत्ति या PMKVY स्टाइपेंड के लिए आवेदन करें।",
        "आंगनवाड़ी कार्यकर्ता या ASHA से संपर्क करें — वे कल्याण योजनाओं से जोड़ सकती हैं।",
        "बच्चे को दोष न दें। उन्हें आश्वस्त करें कि परिवार उनकी शिक्षा को प्राथमिकता देता है।"
      ],
      resources: [
        "नेशनल स्कॉलरशिप पोर्टल: scholarships.gov.in",
        "PMKVY स्टाइपेंड: pmkvyofficial.org",
        "समग्र शिक्षा हेल्पलाइन: अपने राज्य के शिक्षा विभाग से संपर्क करें",
        "चाइल्डलाइन (निःशुल्क, 24×7): 1098"
      ]
    },
    te: {
      heading: "పాఠశాల వదిలిపెట్టాలని ఒత్తిడికి గురవుతున్న పిల్లలకు ఎలా సహాయం చేయాలి",
      tips: [
        "పిల్లాడితో ప్రశాంతంగా, ఒంటరిగా మాట్లాడండి. వారి మాటలు అడ్డుకోకుండా వినండి.",
        "దీర్ఘకాలిక ప్రభావం చెప్పండి: మాధ్యమిక విద్య ప్రతి సంవత్సరం జీవితకాలపు ఆదాయాన్ని 8–10% పెంచుతుంది.",
        "పాఠశాల కౌన్సెలర్ లేదా ప్రధానాధ్యాపకుని కలవండి — వారు కుటుంబ సమావేశం ఏర్పాటు చేయవచ్చు.",
        "ఆర్థిక ఒత్తిడి కారణమైతే, NSP స్కాలర్‌షిప్ లేదా PMKVY స్టైపెండ్‌కు వెంటనే దరఖాస్తు చేయండి.",
        "అంగన్‌వాడీ వర్కర్ లేదా ASHA ని సంప్రదించండి — వారు సంక్షేమ పథకాలతో అనుసంధానం చేయగలరు.",
        "పిల్లాడిని దోషిగా చూడకండి. వారి చదువు కుటుంబ ప్రాధాన్యత అని భరోసా ఇవ్వండి."
      ],
      resources: [
        "నేషనల్ స్కాలర్‌షిప్ పోర్టల్: scholarships.gov.in",
        "PMKVY స్టైపెండ్: pmkvyofficial.org",
        "చైల్డ్‌లైన్ (ఉచిత, 24×7): 1098"
      ]
    }
  },

  "child-marriage": {
    en: {
      heading: "Addressing early / child marriage and keeping the child in school",
      tips: [
        "Child marriage is illegal in India under the Prohibition of Child Marriage Act, 2006 (girls under 18, boys under 21).",
        "Talk to the child privately, away from family pressure. Ask about their feelings and wishes.",
        "Contact the Child Marriage Prohibition Officer (CMPO) in your district — every district has one by law.",
        "The school principal can also notify the district collector's office immediately.",
        "CHILDLINE 1098 can intervene and provide legal protection within hours.",
        "The child has the right to education. Samagra Shiksha provides re-enrollment support even after a gap."
      ],
      resources: [
        "CHILDLINE (free, 24/7): Call 1098",
        "POCSO & child marriage helpline: wcd.nic.in",
        "National Commission for Protection of Child Rights: ncpcr.gov.in",
        "Re-enrollment support: Samagra Shiksha district office"
      ]
    },
    hi: {
      heading: "बाल विवाह और बच्चे को स्कूल में बनाए रखना",
      tips: [
        "बाल विवाह भारत में कानूनी रूप से अपराध है (लड़कियाँ 18 से कम, लड़के 21 से कम)।",
        "बच्चे से परिवार के दबाव से दूर, अकेले में बात करें।",
        "जिले के बाल विवाह निषेध अधिकारी (CMPO) से संपर्क करें — हर जिले में यह होता है।",
        "स्कूल प्रिंसिपल जिला कलेक्टर को तुरंत सूचित कर सकते हैं।",
        "CHILDLINE 1098 कुछ घंटों में हस्तक्षेप और कानूनी सुरक्षा दे सकता है।",
        "समग्र शिक्षा गैप के बाद भी पुनः प्रवेश में सहायता करती है।"
      ],
      resources: [
        "चाइल्डलाइन (निःशुल्क, 24×7): 1098",
        "महिला एवं बाल विकास हेल्पलाइन: wcd.nic.in",
        "राष्ट्रीय बाल अधिकार संरक्षण आयोग: ncpcr.gov.in"
      ]
    },
    te: {
      heading: "బాల్య వివాహం మరియు పిల్లాడిని పాఠశాలలో ఉంచడం",
      tips: [
        "భారతదేశంలో బాల్య వివాహం చట్టవిరుద్ధం (అమ్మాయిలు 18 లోపు, అబ్బాయిలు 21 లోపు).",
        "పిల్లాడితో కుటుంబ ఒత్తిడికి దూరంగా, ఒంటరిగా మాట్లాడండి.",
        "మీ జిల్లా బాల్య వివాహ నిషేధ అధికారిని (CMPO) సంప్రదించండి.",
        "చైల్డ్‌లైన్ 1098 కొన్ని గంటల్లో చట్టపరమైన రక్షణ అందిస్తుంది.",
        "సమగ్ర శిక్ష విద్యా విరామం తర్వాత కూడా తిరిగి నమోదు చేయడానికి సహాయం చేస్తుంది."
      ],
      resources: [
        "చైల్డ్‌లైన్ (ఉచిత, 24×7): 1098",
        "NCPCR: ncpcr.gov.in"
      ]
    }
  },

  "financial": {
    en: {
      heading: "Managing financial difficulty to keep children in school",
      tips: [
        "Apply immediately to the National Scholarship Portal (NSP) for pre-matric and post-matric scholarships: scholarships.gov.in",
        "PM POSHAN (mid-day meal) is available to all government school students — ensure your child is enrolled.",
        "PMKVY offers free vocational training with a daily stipend for youth 15–45: pmkvyofficial.org",
        "PM Jan Dhan Yojana bank account is needed to receive scholarship payments — open one at any bank.",
        "Samagra Shiksha district offices can provide free textbooks and uniforms — contact the school.",
        "NIOS (National Institute of Open Schooling) offers exams at reduced cost for out-of-school youth: nios.ac.in"
      ],
      resources: [
        "National Scholarship Portal: scholarships.gov.in",
        "PMKVY: pmkvyofficial.org",
        "PM POSHAN: pmposhan.education.gov.in",
        "NIOS: nios.ac.in"
      ]
    },
    hi: {
      heading: "आर्थिक कठिनाई में बच्चों को स्कूल में बनाए रखना",
      tips: [
        "तुरंत NSP पर प्री-मैट्रिक और पोस्ट-मैट्रिक छात्रवृत्ति के लिए आवेदन करें: scholarships.gov.in",
        "PM पोषण (मिड-डे मील) सभी सरकारी स्कूल छात्रों के लिए है — सुनिश्चित करें कि बच्चा नामांकित है।",
        "PMKVY दैनिक स्टाइपेंड के साथ मुफ्त व्यावसायिक प्रशिक्षण देता है: pmkvyofficial.org",
        "छात्रवृत्ति प्राप्त करने के लिए PM जन धन खाता आवश्यक है — किसी भी बैंक में खोलें।",
        "NIOS स्कूल से बाहर बच्चों के लिए कम लागत में परीक्षा देने का मौका देता है: nios.ac.in"
      ],
      resources: [
        "राष्ट्रीय छात्रवृत्ति पोर्टल: scholarships.gov.in",
        "PMKVY: pmkvyofficial.org",
        "NIOS: nios.ac.in"
      ]
    },
    te: {
      heading: "ఆర్థిక కష్టాల మధ్య పిల్లలను పాఠశాలలో ఉంచడం",
      tips: [
        "NSP లో ప్రీ-మెట్రిక్ మరియు పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్‌లకు వెంటనే దరఖాస్తు చేయండి: scholarships.gov.in",
        "PM పోషణ్ (మధ్యాహ్న భోజనం) అన్ని ప్రభుత్వ పాఠశాల విద్యార్థులకు అందుబాటులో ఉంది.",
        "PMKVY రోజువారీ స్టైపెండ్‌తో ఉచిత వృత్తి శిక్షణ అందిస్తుంది: pmkvyofficial.org",
        "NIOS పాఠశాల వెలుపల పిల్లలకు తక్కువ ఖర్చుతో పరీక్షలు రాయించే అవకాశం కల్పిస్తుంది: nios.ac.in"
      ],
      resources: [
        "నేషనల్ స్కాలర్‌షిప్ పోర్టల్: scholarships.gov.in",
        "PMKVY: pmkvyofficial.org",
        "NIOS: nios.ac.in"
      ]
    }
  },

  "mental-health": {
    en: {
      heading: "Supporting a child's mental health and managing school stress",
      tips: [
        "Listen first. Let the child talk about what is bothering them before offering solutions.",
        "Create a safe routine: fixed sleep time, short study breaks every 45 minutes, and at least 30 min of outdoor play.",
        "Do not compare the child to siblings or other students — this increases anxiety and shame.",
        "iCall (TISS) offers free, confidential counseling in Hindi and English: icallhelpline.org or call 9152987821.",
        "Vandrevala Foundation helpline is free and available 24/7 in multiple Indian languages: 1860-2662-345.",
        "If the child shows signs of self-harm, contact CHILDLINE 1098 or take them to a government hospital immediately.",
        "Talk to the class teacher. Most teachers can make informal adjustments like seating, shorter assignments, or check-ins."
      ],
      resources: [
        "iCall free counseling: icallhelpline.org | 9152987821",
        "Vandrevala Foundation: 1860-2662-345 (24/7)",
        "CHILDLINE (crisis): 1098",
        "NIMHANS tele-mental health: TELE-MANAS 14416"
      ]
    },
    hi: {
      heading: "बच्चे के मानसिक स्वास्थ्य में मदद और पढ़ाई के तनाव को कम करना",
      tips: [
        "पहले सुनें। समाधान देने से पहले बच्चे को अपनी परेशानी बताने दें।",
        "सुरक्षित दिनचर्या बनाएं: निश्चित सोने का समय, 45 मिनट पर छोटा ब्रेक, और कम से कम 30 मिनट बाहर खेलना।",
        "बच्चे की दूसरों से तुलना न करें — इससे चिंता और शर्म बढ़ती है।",
        "iCall (TISS) — हिंदी और अंग्रेजी में मुफ्त, गोपनीय परामर्श: 9152987821",
        "Vandrevala Foundation हेल्पलाइन — 24×7 मुफ्त: 1860-2662-345",
        "आत्म-हानि के संकेत मिलें तो तुरंत CHILDLINE 1098 से संपर्क करें।",
        "क्लास टीचर से बात करें — वे बैठने की जगह या कम असाइनमेंट जैसी मदद कर सकते हैं।"
      ],
      resources: [
        "iCall: 9152987821 | icallhelpline.org",
        "Vandrevala Foundation: 1860-2662-345 (24×7)",
        "CHILDLINE: 1098",
        "TELE-MANAS (NIMHANS): 14416"
      ]
    },
    te: {
      heading: "పిల్లల మానసిక ఆరోగ్యానికి మద్దతు ఇవ్వడం",
      tips: [
        "ముందు వినండి. పరిష్కారాలు చెప్పే ముందు పిల్లాడి బాధ అర్థం చేసుకోండి.",
        "సురక్షితమైన దినచర్య రూపొందించండి: నిర్ణీత నిద్రావేళ, 45 నిమిషాలకు చిన్న విరామం, 30 నిమిషాల ఆటలు.",
        "పిల్లాడిని ఇతరులతో పోల్చకండి — ఇది ఆందోళన పెంచుతుంది.",
        "iCall — హిందీ మరియు ఇంగ్లీష్‌లో ఉచిత, రహస్య కౌన్సెలింగ్: 9152987821",
        "Vandrevala Foundation: 1860-2662-345 (24×7, ఉచిత)"
      ],
      resources: [
        "iCall: 9152987821",
        "Vandrevala Foundation: 1860-2662-345",
        "CHILDLINE: 1098",
        "TELE-MANAS: 14416"
      ]
    }
  },

  "peer-conflict": {
    en: {
      heading: "Dealing with bullying or peer conflict at school",
      tips: [
        "Take the child's account seriously. Do not dismiss it as 'kids being kids'.",
        "Document incidents with dates, names, and what happened. Keep a record.",
        "Meet the class teacher first, then the principal if the issue continues.",
        "All schools receiving central funds must have a Student Grievance Redressal Committee — ask the principal.",
        "If there is physical violence, file a complaint at the school in writing. Keep a copy.",
        "Teach the child assertive (not aggressive) responses: 'Stop', walking away, telling a trusted adult.",
        "Online bullying (cyberbullying) can be reported to the Cyber Crime portal: cybercrime.gov.in"
      ],
      resources: [
        "Cyber Crime portal: cybercrime.gov.in",
        "CHILDLINE: 1098",
        "iCall: 9152987821"
      ]
    },
    hi: {
      heading: "स्कूल में बुलींग या साथियों के साथ संघर्ष से निपटना",
      tips: [
        "बच्चे की बात को गंभीरता से लें। इसे 'बच्चों की बात' कहकर नजरअंदाज न करें।",
        "तारीख, नाम और घटनाओं के साथ घटनाओं को लिख कर रखें।",
        "पहले क्लास टीचर से मिलें, फिर जरूरत पड़ने पर प्रिंसिपल से।",
        "अगर शारीरिक हिंसा हो तो स्कूल में लिखित शिकायत दर्ज करें।",
        "बच्चे को दृढ़ता से (आक्रामकता नहीं) जवाब देना सिखाएं: 'रुको', चले जाना, किसी विश्वसनीय वयस्क को बताना।",
        "साइबरबुलिंग की रिपोर्ट: cybercrime.gov.in"
      ],
      resources: [
        "साइबर क्राइम पोर्टल: cybercrime.gov.in",
        "चाइल्डलाइन: 1098",
        "iCall: 9152987821"
      ]
    },
    te: {
      heading: "పాఠశాలలో బుల్లీయింగ్ లేదా తోటి విద్యార్థుల వివాదాలతో వ్యవహరించడం",
      tips: [
        "పిల్లాడి మాటలు తీవ్రంగా తీసుకోండి. 'పిల్లలు అలాంటివారే' అని నిర్లక్ష్యం చేయకండి.",
        "తేదీలు, పేర్లు మరియు సంఘటనలతో రికార్డ్ ఉంచండి.",
        "ముందు క్లాస్ టీచర్‌ని కలవండి, అవసరమైతే ప్రిన్సిపాల్‌ని కలవండి.",
        "సైబర్‌బుల్లీయింగ్ నివేదించండి: cybercrime.gov.in"
      ],
      resources: [
        "Cyber Crime: cybercrime.gov.in",
        "CHILDLINE: 1098"
      ]
    }
  },

  "domestic-violence": {
    en: {
      heading: "Supporting a child in an unsafe or violent home environment",
      tips: [
        "The child's immediate safety comes first. If they are in danger right now, call CHILDLINE 1098 immediately.",
        "iCall (TISS) offers free, confidential counseling — the child or any adult can call: 9152987821.",
        "Women's helpline: 181 (connects to One-Stop Crisis Centres in every state).",
        "The Protection of Women from Domestic Violence Act, 2005 allows women to apply for a protection order at any Magistrate's court.",
        "Encourage the child to identify one trusted adult at school (teacher, counselor) they can speak to.",
        "Do not put the child in a position of mediator between parents — this causes long-term psychological harm."
      ],
      resources: [
        "CHILDLINE (crisis, children): 1098",
        "Women's helpline: 181",
        "iCall free counseling: 9152987821",
        "One-Stop Crisis Centre: your district hospital"
      ]
    },
    hi: {
      heading: "असुरक्षित या हिंसक घर के माहौल में बच्चे की मदद करना",
      tips: [
        "बच्चे की तत्काल सुरक्षा सबसे पहले है। अभी खतरे में हों तो CHILDLINE 1098 पर तुरंत कॉल करें।",
        "iCall (TISS) — मुफ्त, गोपनीय परामर्श: 9152987821",
        "महिला हेल्पलाइन: 181 (वन-स्टॉप क्राइसिस सेंटर से जोड़ती है)",
        "बच्चे को स्कूल में एक भरोसेमंद वयस्क पहचानने के लिए प्रोत्साहित करें।",
        "बच्चे को माता-पिता के बीच मध्यस्थ की भूमिका में मत डालें।"
      ],
      resources: [
        "चाइल्डलाइन: 1098",
        "महिला हेल्पलाइन: 181",
        "iCall: 9152987821"
      ]
    },
    te: {
      heading: "అసురక్షిత లేదా హింసాత్మక ఇంటి వాతావరణంలో పిల్లాడికి సహాయం చేయడం",
      tips: [
        "పిల్లాడి తక్షణ భద్రత మొదటి అవసరం. ప్రమాదంలో ఉంటే వెంటనే CHILDLINE 1098 కు కాల్ చేయండి.",
        "iCall — ఉచిత, రహస్య కౌన్సెలింగ్: 9152987821",
        "మహిళా హెల్ప్‌లైన్: 181",
        "పాఠశాలలో ఒక విశ్వసనీయ పెద్దవారిని పిల్లాడికి గుర్తించమని ప్రోత్సహించండి."
      ],
      resources: [
        "CHILDLINE: 1098",
        "మహిళా హెల్ప్‌లైన్: 181",
        "iCall: 9152987821"
      ]
    }
  },

  "attendance": {
    en: {
      heading: "Improving school attendance and tackling school refusal",
      tips: [
        "Find the root cause first — ask the child privately: Is it fear? Bullying? Boredom? Health? Embarrassment about uniform or supplies?",
        "School refusal is often anxiety, not laziness. Do not punish; instead, problem-solve together.",
        "Start small: agree on attending just the morning or one subject. Build up gradually.",
        "Ensure the child has a nutritious breakfast before school — hunger significantly affects focus and motivation.",
        "Talk to the class teacher. Small accommodations (sitting near a friend, taking a brief walk when anxious) can make a big difference.",
        "If attendance drops below the required threshold, contact the school before they issue a TC (Transfer Certificate).",
        "NIOS allows flexible examination without a fixed school for students who cannot attend regularly: nios.ac.in"
      ],
      resources: [
        "NIOS flexible schooling: nios.ac.in",
        "DIKSHA learning resources: diksha.gov.in",
        "iCall counseling: 9152987821"
      ]
    },
    hi: {
      heading: "स्कूल में उपस्थिति सुधारना और स्कूल न जाने की समस्या से निपटना",
      tips: [
        "पहले कारण जानें — बच्चे से अकेले में पूछें: डर? बुलींग? ऊब? स्वास्थ्य? वर्दी या किताबों की शर्म?",
        "स्कूल न जाना अक्सर आलस नहीं, चिंता होती है। सजा न दें, मिलकर समाधान खोजें।",
        "छोटे कदम से शुरू करें: सिर्फ सुबह या एक विषय के लिए जाना तय करें।",
        "सुनिश्चित करें कि बच्चा नाश्ता करके जाए — भूख फोकस और प्रेरणा पर असर डालती है।",
        "NIOS नियमित स्कूल न जा पाने वाले बच्चों के लिए लचीली परीक्षा प्रणाली देता है: nios.ac.in"
      ],
      resources: [
        "NIOS: nios.ac.in",
        "DIKSHA: diksha.gov.in",
        "iCall: 9152987821"
      ]
    },
    te: {
      heading: "పాఠశాలకు హాజరు మెరుగుపరచడం మరియు పాఠశాల నిరాకరణ సమస్యను పరిష్కరించడం",
      tips: [
        "ముందు కారణం తెలుసుకోండి — పిల్లాడిని ఒంటరిగా అడగండి: భయం? బుల్లీయింగ్? విసుగు? ఆరోగ్యం?",
        "పాఠశాలకు రాకపోవడం సోమరితనం కాదు, తరచుగా ఆందోళన. శిక్షించకండి; కలిసి పరిష్కారం వెతకండి.",
        "చిన్న అడుగుతో మొదలుపెట్టండి: మొదట్లో సగం రోజు లేదా ఒక సబ్జెక్ట్ మాత్రమే.",
        "NIOS నిరంతరం హాజరు కాలేని విద్యార్థులకు వశ్యమైన పరీక్ష అవకాశం అందిస్తుంది: nios.ac.in"
      ],
      resources: [
        "NIOS: nios.ac.in",
        "iCall: 9152987821"
      ]
    }
  },

  "other": {
    en: {
      heading: "General family support resources",
      tips: [
        "Share what is happening in as much detail as you are comfortable with — a counselor will follow up with you.",
        "You are not alone. Many families in India face these challenges; support is available.",
        "CHILDLINE 1098 is free, confidential, and available 24/7 for any child welfare concern.",
        "Your school's parent-teacher association (PTA) can also be a source of community support."
      ],
      resources: [
        "CHILDLINE: 1098",
        "iCall: 9152987821",
        "Vandrevala Foundation: 1860-2662-345"
      ]
    },
    hi: {
      heading: "सामान्य पारिवारिक सहायता संसाधन",
      tips: [
        "जितना आरामदायक हो उतना विवरण साझा करें — एक काउंसलर आपसे संपर्क करेगा।",
        "आप अकेले नहीं हैं। भारत में कई परिवारों का यही अनुभव है; सहायता उपलब्ध है।",
        "CHILDLINE 1098 — मुफ्त, गोपनीय, 24×7"
      ],
      resources: [
        "चाइल्डलाइन: 1098",
        "iCall: 9152987821",
        "Vandrevala Foundation: 1860-2662-345"
      ]
    },
    te: {
      heading: "సాధారణ కుటుంబ మద్దతు వనరులు",
      tips: [
        "మీకు సౌకర్యంగా ఉన్నంత సమాచారం పంచుకోండి — ఒక కౌన్సెలర్ మీతో సంప్రదిస్తారు.",
        "మీరు ఒంటరిగా లేరు. భారతదేశంలో చాలా కుటుంబాలు ఇటువంటి సవాళ్లను ఎదుర్కొంటున్నాయి.",
        "CHILDLINE 1098 — ఉచిత, రహస్య, 24×7"
      ],
      resources: [
        "CHILDLINE: 1098",
        "iCall: 9152987821"
      ]
    }
  }
};

export function getGuidance(
  topic: CounselingTopic,
  lang: "en" | "hi" | "te"
): GuidanceEntry["en"] {
  return guidance[topic][lang] ?? guidance[topic].en;
}
