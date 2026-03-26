// ============================================
// DEUTSCHMEISTER - LESSONS DATA (A1 to C2)
// ============================================

const LESSONS_DATA = {
  A1: {
    topics: [
      { emoji: "👋", name: "Greetings", xp: 10 },
      { emoji: "🔢", name: "Numbers", xp: 10 },
      { emoji: "🎨", name: "Colors", xp: 10 },
      { emoji: "👨‍👩‍👧", name: "Family", xp: 15 },
      { emoji: "📅", name: "Days & Months", xp: 15 },
    ],
    lessons: [
      {
        id: "a1_l1",
        icon: "👋",
        title: "Hallo! Greetings & Intro",
        desc: "German mein hello kaise bolte hain",
        tag: "easy",
        xp: 15,
        content: {
          intro: "German mein greetings bahut important hain! Ye seekhlo aur din ki shuruaat karo 🌟",
          sections: [
            {
              heading: "Basic Greetings",
              vocab: [
                { de: "Hallo!", hi: "Hello! (Informal)" },
                { de: "Guten Morgen!", hi: "Good Morning! (Subah)" },
                { de: "Guten Tag!", hi: "Good Day! (Dopahar)" },
                { de: "Guten Abend!", hi: "Good Evening! (Shaam)" },
                { de: "Gute Nacht!", hi: "Good Night! (Raat)" },
                { de: "Tschüss! / Auf Wiedersehen!", hi: "Goodbye! (Alvida)" },
              ]
            },
            {
              heading: "Apna Introduction",
              vocab: [
                { de: "Ich heiße [Name].", hi: "Mera naam [Name] hai." },
                { de: "Ich bin [Name].", hi: "Main [Name] hoon." },
                { de: "Wie heißen Sie?", hi: "Aapka naam kya hai? (Formal)" },
                { de: "Wie heißt du?", hi: "Tera naam kya hai? (Informal)" },
                { de: "Woher kommen Sie?", hi: "Aap kahan se hain? (Formal)" },
                { de: "Ich komme aus Indien.", hi: "Main India se hoon." },
              ]
            },
            {
              heading: "Haal-chaal poochna",
              vocab: [
                { de: "Wie geht es Ihnen?", hi: "Aap kaise hain? (Formal)" },
                { de: "Wie geht's?", hi: "Kaisa hai? (Informal)" },
                { de: "Mir geht es gut.", hi: "Main theek hoon." },
                { de: "Mir geht es nicht so gut.", hi: "Main itna theek nahi hoon." },
                { de: "Danke!", hi: "Shukriya / Thank you!" },
                { de: "Bitte!", hi: "Please / You're welcome!" },
              ]
            }
          ],
          tip: "💡 German mein 'Sie' (capital S) formal 'aap' hai, aur 'du' informal 'tu/tum' hai. Naye logon se hamesha 'Sie' use karo!",
          examples: [
            "Hallo! Ich heiße Rahul. Wie heißen Sie?",
            "Guten Morgen! Wie geht es Ihnen? — Mir geht es gut, danke!"
          ],
          practice: "Meister Klaus ko apna naam aur city batao German mein!"
        }
      },
      {
        id: "a1_l2",
        icon: "🔢",
        title: "Zahlen 1-100 — Numbers",
        desc: "1 se 100 tak German mein ginana seekho",
        tag: "easy",
        xp: 15,
        content: {
          intro: "Numbers har jagah kaam aate hain — phone number, age, shopping sab mein! 🔢",
          sections: [
            {
              heading: "1 se 20 tak",
              vocab: [
                { de: "eins, zwei, drei", hi: "1, 2, 3" },
                { de: "vier, fünf, sechs", hi: "4, 5, 6" },
                { de: "sieben, acht, neun", hi: "7, 8, 9" },
                { de: "zehn, elf, zwölf", hi: "10, 11, 12" },
                { de: "dreizehn...neunzehn", hi: "13...19 (teen lagao)" },
                { de: "zwanzig", hi: "20" },
              ]
            },
            {
              heading: "Dahe wale (Tens)",
              vocab: [
                { de: "dreißig", hi: "30" },
                { de: "vierzig", hi: "40" },
                { de: "fünfzig", hi: "50" },
                { de: "sechzig", hi: "60" },
                { de: "siebzig", hi: "70" },
                { de: "achtzig, neunzig", hi: "80, 90" },
                { de: "hundert", hi: "100" },
              ]
            }
          ],
          tip: "💡 21 = einundzwanzig (ek aur bees) — German mein pehle ones phir tens bolte hain! Jaise 45 = fünfundvierzig (5-aur-40).",
          examples: [
            "Ich bin siebenundzwanzig Jahre alt. (Main 27 saal ka hoon.)",
            "Das kostet dreißig Euro. (Ye 30 Euro ka hai.)"
          ],
          practice: "Meister Klaus ko apni age German mein batao!"
        }
      },
      {
        id: "a1_l3",
        icon: "🎨",
        title: "Farben — Colors",
        desc: "German mein rang seekho",
        tag: "easy",
        xp: 10,
        content: {
          intro: "Colors describe karna seekho! Ye adjectives hain jo German mein change hote hain.",
          sections: [
            {
              heading: "Basic Colors",
              vocab: [
                { de: "rot", hi: "laal (red)" },
                { de: "blau", hi: "neela (blue)" },
                { de: "grün", hi: "hara (green)" },
                { de: "gelb", hi: "peela (yellow)" },
                { de: "schwarz", hi: "kaala (black)" },
                { de: "weiß", hi: "safed (white)" },
                { de: "grau", hi: "grey" },
                { de: "braun", hi: "bhoora (brown)" },
                { de: "orange", hi: "orange" },
                { de: "lila / violett", hi: "baingani (purple)" },
              ]
            }
          ],
          tip: "💡 German mein colors adjective ke roop mein noun ke saath change hote hain! Lekin filhaal simple use karo: 'Das Auto ist rot' (gaadi laal hai).",
          examples: [
            "Mein Auto ist blau. (Meri gaadi neeli hai.)",
            "Die Katze ist schwarz und weiß. (Billi kaali aur safed hai.)"
          ],
          practice: "Apne favorite rang ke baare mein ek sentence banao!"
        }
      },
      {
        id: "a1_l4",
        icon: "👨‍👩‍👧",
        title: "Die Familie — Family",
        desc: "Parivaar ke members German mein",
        tag: "easy",
        xp: 15,
        content: {
          intro: "Family ke baare mein baat karna German conversation ka important hissa hai! 👨‍👩‍👧",
          sections: [
            {
              heading: "Family Members",
              vocab: [
                { de: "die Mutter / Mama", hi: "Maa" },
                { de: "der Vater / Papa", hi: "Papa" },
                { de: "die Eltern", hi: "Maa-baap (Parents)" },
                { de: "der Bruder", hi: "Bhai" },
                { de: "die Schwester", hi: "Behen" },
                { de: "der Sohn", hi: "Beta" },
                { de: "die Tochter", hi: "Beti" },
                { de: "der Großvater / Opa", hi: "Dada/Nana" },
                { de: "die Großmutter / Oma", hi: "Dadi/Nani" },
                { de: "der Mann", hi: "Pati (Husband)" },
                { de: "die Frau", hi: "Patni (Wife)" },
              ]
            }
          ],
          tip: "💡 German mein har noun ka ek gender hota hai — der (masculine), die (feminine), das (neuter). Family members mein mostly gender natural hai!",
          examples: [
            "Meine Mutter heißt Priya. (Meri maa ka naam Priya hai.)",
            "Ich habe einen Bruder und eine Schwester. (Mere ek bhai aur ek behen hai.)"
          ],
          practice: "Apne family ke 3 members ke baare mein Meister Klaus ko batao!"
        }
      },
      {
        id: "a1_l5",
        icon: "📅",
        title: "Wochentage & Monate",
        desc: "Days of week aur Months",
        tag: "easy",
        xp: 15,
        content: {
          intro: "Din aur mahine — schedule aur dates ke liye zaroori! 📅",
          sections: [
            {
              heading: "Days of Week",
              vocab: [
                { de: "Montag", hi: "Somvaar (Monday)" },
                { de: "Dienstag", hi: "Mangalvaar (Tuesday)" },
                { de: "Mittwoch", hi: "Budhvaar (Wednesday)" },
                { de: "Donnerstag", hi: "Guruvaar (Thursday)" },
                { de: "Freitag", hi: "Shukravaar (Friday)" },
                { de: "Samstag", hi: "Shanivaar (Saturday)" },
                { de: "Sonntag", hi: "Ravivaar (Sunday)" },
              ]
            },
            {
              heading: "Months",
              vocab: [
                { de: "Januar, Februar, März", hi: "January, February, March" },
                { de: "April, Mai, Juni", hi: "April, May, June" },
                { de: "Juli, August, September", hi: "July, August, September" },
                { de: "Oktober, November, Dezember", hi: "October, November, December" },
              ]
            }
          ],
          tip: "💡 German mein days aur months capitalize hote hain! 'Heute ist Montag' (Aaj Somvaar hai).",
          examples: [
            "Heute ist Freitag. (Aaj Shukravaar hai.)",
            "Mein Geburtstag ist im März. (Mera birthday March mein hai.)"
          ],
          practice: "Aaj kaun sa din hai German mein batao! Aur apna birthday month bhi!"
        }
      },
      {
        id: "a1_l6",
        icon: "🏠",
        title: "Der, Die, Das — Articles",
        desc: "German ka sabse important grammar rule!",
        tag: "medium",
        xp: 20,
        content: {
          intro: "German grammar ka sabse important aur tricky topic — Articles! Ye samajh liya toh bahut kuch samajh aa jayega! 🎯",
          sections: [
            {
              heading: "Teen Articles hain German mein",
              vocab: [
                { de: "der", hi: "masculine (mard jaise) nouns ke liye" },
                { de: "die", hi: "feminine (aurat jaise) nouns ke liye" },
                { de: "das", hi: "neuter (na masculine na feminine) ke liye" },
                { de: "die (plural)", hi: "SAARE plural nouns ke liye die use hota hai!" },
              ]
            },
            {
              heading: "Examples",
              vocab: [
                { de: "der Mann", hi: "the man (mard)" },
                { de: "die Frau", hi: "the woman (aurat)" },
                { de: "das Kind", hi: "the child (baccha)" },
                { de: "der Hund", hi: "the dog (kutta)" },
                { de: "die Katze", hi: "the cat (billi)" },
                { de: "das Haus", hi: "the house (ghar)" },
                { de: "der Tisch", hi: "the table (mez)" },
                { de: "die Tür", hi: "the door (darwaza)" },
              ]
            }
          ],
          tip: "💡 SECRET TIP: Har naya German word seekhne ke saath uska article bhi yaad karo! Sirf 'Haus' mat socho, 'das Haus' socho. Ye ek habit banao!",
          examples: [
            "Der Mann ist groß. (Mard lamba hai.)",
            "Die Frau ist nett. (Aurat achhi hai.)",
            "Das Kind spielt. (Baccha khel raha hai.)"
          ],
          practice: "Meister Klaus in 5 cheezein ke article poochhe ga — try karo!"
        }
      },
      {
        id: "a1_l7",
        icon: "🗣️",
        title: "Grundsätze — Basic Sentences",
        desc: "Pehle German sentences banana seekho",
        tag: "medium",
        xp: 20,
        content: {
          intro: "Ab hum asli sentences banana seekhenge! German word order English se thoda different hai. 🗣️",
          sections: [
            {
              heading: "German Sentence Structure",
              vocab: [
                { de: "Ich bin Student.", hi: "Main student hoon." },
                { de: "Du bist nett.", hi: "Tum achhe ho." },
                { de: "Er/Sie ist Arzt.", hi: "Woh (m/f) doctor hai." },
                { de: "Wir sind Freunde.", hi: "Hum dost hain." },
                { de: "Das ist mein Buch.", hi: "Ye meri kitaab hai." },
                { de: "Ich habe einen Hund.", hi: "Mere paas ek kutta hai." },
              ]
            },
            {
              heading: "Verb 'sein' (to be)",
              vocab: [
                { de: "ich bin", hi: "main hoon" },
                { de: "du bist", hi: "tu hai" },
                { de: "er/sie/es ist", hi: "woh hai" },
                { de: "wir sind", hi: "hum hain" },
                { de: "ihr seid", hi: "tum sab ho" },
                { de: "sie/Sie sind", hi: "woh sab / aap hain" },
              ]
            }
          ],
          tip: "💡 German mein verb HAMESHA second position pe aata hai! 'Ich bin müde' (Main thaka hoon) — 'bin' second position pe hai.",
          examples: [
            "Ich bin 25 Jahre alt und komme aus Delhi.",
            "Mein Vater ist Ingenieur. Er ist sehr klug."
          ],
          practice: "Apne baare mein 3 sentences banao German mein!"
        }
      },
      {
        id: "a1_l8",
        icon: "🛒",
        title: "Einkaufen — Shopping",
        desc: "Dukaan mein German mein baat karna",
        tag: "medium",
        xp: 20,
        content: {
          intro: "Germany mein kuch khareedna ho toh ye phrases kaam aayenge! 🛒",
          sections: [
            {
              heading: "Shopping Phrases",
              vocab: [
                { de: "Was kostet das?", hi: "Ye kitne ka hai?" },
                { de: "Ich möchte... kaufen.", hi: "Main... khareedna chahta hoon." },
                { de: "Haben Sie...?", hi: "Kya aapke paas... hai?" },
                { de: "Das ist zu teuer.", hi: "Ye bahut mehenga hai." },
                { de: "Das ist günstig.", hi: "Ye sasta hai." },
                { de: "Ich nehme das.", hi: "Main ye le raha hoon." },
                { de: "Wo ist die Kasse?", hi: "Counter/Cash kahan hai?" },
                { de: "Die Quittung, bitte.", hi: "Receipt, please." },
              ]
            }
          ],
          tip: "💡 'Ich möchte' (I would like) bahut polite way hai maangne ka — 'ich will' (I want) se better hai formal situations mein!",
          examples: [
            "Entschuldigung, was kostet dieses T-Shirt?",
            "Ich möchte zwei Kilo Äpfel kaufen, bitte."
          ],
          practice: "Ek shopping conversation karo Meister Klaus ke saath!"
        }
      }
    ]
  },
  A2: {
    topics: [
      { emoji: "🍕", name: "Food & Drinks", xp: 15 },
      { emoji: "🏥", name: "Health", xp: 15 },
      { emoji: "🚌", name: "Transport", xp: 15 },
      { emoji: "⏰", name: "Daily Routine", xp: 20 },
      { emoji: "📝", name: "Past Tense", xp: 25 },
    ],
    lessons: [
      {
        id: "a2_l1", icon: "🍕", title: "Essen & Trinken — Food",
        desc: "Khaane peene ki vocabulary", tag: "easy", xp: 20,
        content: {
          intro: "German food culture bahut rich hai! Ye vocabulary seekhke restaurant mein order karo! 🍽️",
          sections: [{
            heading: "Common Food & Drink",
            vocab: [
              { de: "das Brot", hi: "roti/bread" }, { de: "die Suppe", hi: "soup" },
              { de: "das Fleisch", hi: "gosht/meat" }, { de: "das Gemüse", hi: "sabzi/vegetables" },
              { de: "das Wasser", hi: "paani/water" }, { de: "der Kaffee", hi: "coffee" },
              { de: "das Bier", hi: "beer" }, { de: "der Wein", hi: "wine" },
              { de: "Ich hätte gerne...", hi: "Mujhe... chahiye (ordering)" },
              { de: "Die Speisekarte, bitte.", hi: "Menu please." },
              { de: "Zahlen, bitte!", hi: "Bill please!" },
            ]
          }],
          tip: "💡 Restaurant mein 'Ich hätte gerne...' use karo — ye bahut polite hai!",
          examples: ["Ich hätte gerne eine Suppe und ein Bier, bitte.", "Was empfehlen Sie? (Aap kya suggest karte hain?)"],
          practice: "Meister Klaus ke saath restaurant scene practice karo!"
        }
      },
      {
        id: "a2_l2", icon: "⏰", title: "Tagesablauf — Daily Routine",
        desc: "Roz ka routine German mein batao", tag: "medium", xp: 20,
        content: {
          intro: "Apna roz ka din German mein describe karna seekho! ⏰",
          sections: [{
            heading: "Daily Activities",
            vocab: [
              { de: "aufstehen", hi: "uthna (get up)" }, { de: "frühstücken", hi: "naashta karna" },
              { de: "zur Arbeit gehen", hi: "kaam pe jaana" }, { de: "arbeiten", hi: "kaam karna" },
              { de: "zu Mittag essen", hi: "dopahar ka khaana" }, { de: "nach Hause kommen", hi: "ghar aana" },
              { de: "fernsehen", hi: "TV dekhna" }, { de: "schlafen gehen", hi: "sona" },
              { de: "Um wieviel Uhr?", hi: "Kitne baje?" }, { de: "Um 7 Uhr morgens", hi: "Subah 7 baje" },
            ]
          }],
          tip: "💡 Time batane ke liye: 'Um + time + Uhr' — Um acht Uhr = 8 baje",
          examples: ["Ich stehe um 7 Uhr auf und frühstücke um halb acht.", "Abends schaue ich fern oder lese ein Buch."],
          practice: "Apna kal ka din German mein describe karo Meister ko!"
        }
      },
      {
        id: "a2_l3", icon: "📝", title: "Perfekt — Past Tense",
        desc: "German mein past tense banana seekho", tag: "hard", xp: 30,
        content: {
          intro: "Ab past ki baatein karna seekhte hain! German mein spoken past = Perfekt tense. 📝",
          sections: [{
            heading: "Perfekt Formula",
            vocab: [
              { de: "haben/sein + Partizip II", hi: "Formula: have/be + past participle" },
              { de: "Ich habe gegessen.", hi: "Maine khaaya. (I ate.)" },
              { de: "Ich habe gespielt.", hi: "Maine khela. (I played.)" },
              { de: "Ich bin gegangen.", hi: "Main gaya. (I went.)" },
              { de: "Ich bin aufgestanden.", hi: "Main utha. (I got up.)" },
              { de: "ge___t (regular verbs)", hi: "spielen → gespielt" },
              { de: "ge___en (irregular)", hi: "gehen → gegangen" },
            ]
          }],
          tip: "💡 Movement verbs (jaana, aana, uthna) ke saath SEIN use hota hai. Baaki sab ke saath HABEN!",
          examples: ["Gestern habe ich einen Film gesehen. (Kal maine ek film dekhi.)", "Wir sind nach Berlin gefahren. (Hum Berlin gaye.)"],
          practice: "Kal kya kiya? Meister Klaus ko 3 sentences mein batao!"
        }
      }
    ]
  },
  B1: {
    topics: [
      { emoji: "✈️", name: "Travel", xp: 25 },
      { emoji: "💼", name: "Work & Jobs", xp: 25 },
      { emoji: "💭", name: "Opinions", xp: 25 },
      { emoji: "🏥", name: "Health & Body", xp: 25 },
      { emoji: "🔮", name: "Future Plans", xp: 30 },
    ],
    lessons: [
      {
        id: "b1_l1", icon: "✈️", title: "Reisen — Travel",
        desc: "Travel related German seekho", tag: "medium", xp: 30,
        content: {
          intro: "German-speaking countries mein travel ke liye ye phrases must-know hain! ✈️",
          sections: [{
            heading: "Travel Vocabulary",
            vocab: [
              { de: "der Flughafen", hi: "airport" }, { de: "der Bahnhof", hi: "railway station" },
              { de: "das Ticket / die Fahrkarte", hi: "ticket" }, { de: "der Zug / das Flugzeug", hi: "train / airplane" },
              { de: "Wo ist...?", hi: "... kahan hai?" }, { de: "Wie komme ich zu...?", hi: "Main... kaise pahunchu?" },
              { de: "Einmal nach Berlin, bitte.", hi: "Ek ticket Berlin ke liye please." },
              { de: "Wann fährt der nächste Zug?", hi: "Agla train kab hai?" },
            ]
          }],
          tip: "💡 German trains bahut punctual hain! 'Der Zug hat Verspätung' = Train late hai (rare!)",
          examples: ["Wie komme ich zum Hauptbahnhof? Nehmen Sie die U-Bahn Linie 3.", "Ich möchte ein Ticket nach München kaufen."],
          practice: "Ek travel scenario karo — aap airport pe ho, help maango!"
        }
      },
      {
        id: "b1_l2", icon: "💭", title: "Meinungen — Opinions",
        desc: "German mein apni raay express karo", tag: "medium", xp: 25,
        content: {
          intro: "Apni opinions express karna conversation ko interesting banata hai! 💭",
          sections: [{
            heading: "Opinion Phrases",
            vocab: [
              { de: "Ich denke / meine, dass...", hi: "Mujhe lagta hai ki..." },
              { de: "Meiner Meinung nach...", hi: "Mere khayal mein..." },
              { de: "Ich bin dafür / dagegen.", hi: "Main iske pक्ष/विरोध mein hoon." },
              { de: "Ich stimme zu / nicht zu.", hi: "Main sahamat / asahamat hoon." },
              { de: "Das finde ich gut / schlecht.", hi: "Ye mujhe achha / bura lagta hai." },
              { de: "Einerseits... andererseits...", hi: "Ek taraf... doosri taraf..." },
            ]
          }],
          tip: "💡 'dass' ke baad verb sentence ke end mein jaata hai! 'Ich denke, dass das gut IST.' (verb end pe!)",
          examples: ["Ich finde, dass Sport sehr wichtig für die Gesundheit ist.", "Meiner Meinung nach sollte man täglich Deutsch üben."],
          practice: "Social media ke baare mein apni opinion de German mein!"
        }
      }
    ]
  },
  B2: {
    topics: [
      { emoji: "📰", name: "News & Media", xp: 35 },
      { emoji: "🌍", name: "Environment", xp: 35 },
      { emoji: "🤝", name: "Relationships", xp: 35 },
      { emoji: "📝", name: "Konjunktiv II", xp: 40 },
      { emoji: "✍️", name: "Formal Writing", xp: 40 },
    ],
    lessons: [
      {
        id: "b2_l1", icon: "📝", title: "Konjunktiv II — Subjunctive",
        desc: "Wishes, hypotheticals, polite requests", tag: "hard", xp: 40,
        content: {
          intro: "Konjunktiv II German ka advanced feature hai — wishes, polite requests aur hypotheticals ke liye! 🎯",
          sections: [{
            heading: "Konjunktiv II Forms",
            vocab: [
              { de: "würde + Infinitiv", hi: "would (general formula)" },
              { de: "Ich würde gerne... (I would like to...)", hi: "Polite wish" },
              { de: "Wenn ich reich wäre...", hi: "Agar main ameer hota..." },
              { de: "Könnten Sie mir helfen?", hi: "Kya aap meri madad kar sakte hain? (very polite)" },
              { de: "Das wäre schön.", hi: "Ye achha hota." },
              { de: "Ich hätte gerne...", hi: "Mujhe... hona chahiye tha / chahiye" },
            ]
          }],
          tip: "💡 Konjunktiv II se aap bahut polite lagte ho! 'Könnten Sie...' is 10x more polite than 'Können Sie...'",
          examples: ["Wenn ich Zeit hätte, würde ich mehr reisen.", "Könnten Sie mir bitte das Salz reichen?"],
          practice: "3 wishes banao German mein 'Wenn ich... wäre/hätte...' use karke!"
        }
      }
    ]
  },
  C1: {
    topics: [
      { emoji: "📚", name: "Literature", xp: 50 },
      { emoji: "💼", name: "Business German", xp: 50 },
      { emoji: "🗣️", name: "Idioms", xp: 45 },
      { emoji: "✍️", name: "Academic Writing", xp: 55 },
      { emoji: "🎭", name: "Debates", xp: 55 },
    ],
    lessons: [
      {
        id: "c1_l1", icon: "🗣️", title: "Redewendungen — Idioms",
        desc: "German idioms aur fixed expressions", tag: "hard", xp: 50,
        content: {
          intro: "Native speakers ki tarah bolna chahte ho? Idioms seekho! 🗣️",
          sections: [{
            heading: "Common German Idioms",
            vocab: [
              { de: "Das ist nicht mein Bier.", hi: "Ye mera kaam nahi. (It's not my beer/business)" },
              { de: "Tomaten auf den Augen haben", hi: "Aankhon pe parda hona (blind to obvious)" },
              { de: "Den Nagel auf den Kopf treffen", hi: "Nishane pe laagna (hit the nail on head)" },
              { de: "Ich drücke dir die Daumen!", hi: "All the best! (I press my thumbs for you!)" },
              { de: "Das ist mir Wurst.", hi: "Mujhe koi farq nahi. (That's sausage to me!)" },
              { de: "Auf dem Holzweg sein", hi: "Galat raste pe hona (on the wrong track)" },
            ]
          }],
          tip: "💡 German idioms literally translate karo — bahut funny hote hain! 'Das ist mir Wurst' = That is sausage to me = I don't care! 😂",
          examples: ["Keine Angst! Ich drücke dir die Daumen beim Vorstellungsgespräch!", "Er hat absolut Recht — damit hat er den Nagel auf den Kopf getroffen."],
          practice: "In idioms ko conversation mein use karo Meister ke saath!"
        }
      }
    ]
  },
  C2: {
    topics: [
      { emoji: "🎭", name: "Native Fluency", xp: 60 },
      { emoji: "📜", name: "Complex Grammar", xp: 60 },
      { emoji: "🗺️", name: "Dialects", xp: 55 },
      { emoji: "📖", name: "Philosophy", xp: 65 },
      { emoji: "🎨", name: "Poetry & Culture", xp: 65 },
    ],
    lessons: [
      {
        id: "c2_l1", icon: "🎭", title: "Muttersprachliches Niveau",
        desc: "Native-level German — the final goal!", tag: "hard", xp: 60,
        content: {
          intro: "C2 means aap German ko native speaker ki tarah samjhte aur bol sakte ho! 🏆",
          sections: [{
            heading: "C2 Skills",
            vocab: [
              { de: "Spontan und fließend sprechen", hi: "Bina rukke bolna" },
              { de: "Komplexe Texte verstehen", hi: "Complex texts samajhna" },
              { de: "Präzise ausdrücken", hi: "Exactly jo sochna woh bolna" },
              { de: "Regionale Dialekte", hi: "Bavaria, Bavarian dialect etc." },
              { de: "Fachsprache", hi: "Technical/professional language" },
              { de: "Kulturelle Nuancen", hi: "Cultural references samajhna" },
            ]
          }],
          tip: "💡 C2 tak pahunche ho? Ye ek major achievement hai! Ab German media, books aur native speakers se continue karo!",
          examples: ["Die Komplexität der deutschen Sprache liegt nicht nur in der Grammatik, sondern auch in ihren kulturellen Tiefenschichten.", "Mundart und Hochdeutsch — das Spannungsfeld zwischen Dialekt und Standardsprache."],
          practice: "Ek complex philosophical topic pe discuss karo Meister ke saath!"
        }
      }
    ]
  }
};

// Quiz questions database
const QUIZ_DATA = {
  A1: [
    { q: "German mein 'Good Morning' kya hota hai?", opts: ["Guten Tag", "Guten Morgen", "Gute Nacht", "Guten Abend"], ans: 1, exp: "Guten Morgen = Good Morning! (Subah ke liye)" },
    { q: "Blank bharo: 'Ich ___ Student.' (I am a student)", opts: ["bin", "bist", "ist", "sind"], ans: 0, exp: "'Ich' ke saath 'bin' use hota hai — sein verb ka form!" },
    { q: "'Das ist mein ___.' — Dog ka German word?", opts: ["Katze", "Hund", "Vogel", "Fisch"], ans: 1, exp: "Hund = Dog! Katze = Cat, Vogel = Bird, Fisch = Fish" },
    { q: "5 + 7 = ? (German mein batao)", opts: ["dreizehn", "zwölf", "vierzehn", "elf"], ans: 1, exp: "5 (fünf) + 7 (sieben) = 12 = zwölf!" },
    { q: "'Wie geht es Ihnen?' ka matlab kya hai?", opts: ["Kahan se ho?", "Kya naam hai?", "Kaise hain aap?", "Kya chahiye?"], ans: 2, exp: "'Wie geht es Ihnen?' = How are you? (Formal)" },
    { q: "Red ka German mein kya hoga?", opts: ["blau", "grün", "rot", "gelb"], ans: 2, exp: "rot = red! blau = blue, grün = green, gelb = yellow" },
    { q: "'Auf Wiedersehen' ka matlab?", opts: ["Hello", "Goodbye", "Thank you", "Please"], ans: 1, exp: "Auf Wiedersehen = Goodbye! (Formal farewell)" },
    { q: "Wednesday ka German?", opts: ["Montag", "Freitag", "Mittwoch", "Donnerstag"], ans: 2, exp: "Mittwoch = Wednesday! (Mitte = middle, Woche = week)" },
  ],
  A2: [
    { q: "'Ich habe gegessen' ka matlab kya hai?", opts: ["Main kha raha hoon", "Maine khaaya", "Main khaunga", "Main khaata hoon"], ans: 1, exp: "Perfekt tense! 'habe + gegessen' = have eaten = past tense!" },
    { q: "Restaurant mein bill maangna ho toh?", opts: ["Die Speisekarte, bitte", "Zahlen, bitte!", "Was kostet das?", "Ich möchte bestellen"], ans: 1, exp: "'Zahlen, bitte!' = Pay/Bill please! Zahlen = to pay" },
    { q: "Movement verbs ke saath kaun sa auxiliary use hota hai?", opts: ["haben", "sein", "werden", "wollen"], ans: 1, exp: "Sein! 'Ich BIN gegangen' (gone), 'Ich BIN gefahren' (drove)" },
    { q: "'Um wieviel Uhr?' ka matlab?", opts: ["Kahan?", "Kab?", "Kitne baje?", "Kaise?"], ans: 2, exp: "Um wieviel Uhr = At what time? Uhr = clock/time" },
    { q: "Daily routine: 'aufstehen' ka matlab?", opts: ["Sona", "Uthna", "Khaana", "Padhna"], ans: 1, exp: "aufstehen = to get up / stand up! auf = up, stehen = stand" },
  ],
  B1: [
    { q: "'Meiner Meinung nach...' use hota hai jab?", opts: ["Question poochna", "Apni opinion dena", "Permission maangna", "Direction dena"], ans: 1, exp: "Meiner Meinung nach = In my opinion — opinions ke liye!" },
    { q: "'Wenn ich Zeit hätte...' mein kaunsa tense hai?", opts: ["Present", "Past", "Future", "Konjunktiv II"], ans: 3, exp: "Konjunktiv II — hypothetical situation! hätte = would have" },
    { q: "Bahnhof ka matlab?", opts: ["Airport", "Bus stop", "Railway station", "Metro station"], ans: 2, exp: "Bahnhof = Railway station! Bahn = train/track, Hof = yard/court" },
    { q: "'Einerseits... andererseits...' matlab?", opts: ["Pehle...phir", "Ek taraf...doosri taraf", "Kyunki...isliye", "Halaanki...phir bhi"], ans: 1, exp: "Einerseits...andererseits = On one hand...on the other hand" },
  ],
  B2: [
    { q: "'Könnten Sie mir helfen?' mein kya khaas hai?", opts: ["Simple request", "Very polite request", "Command", "Question about ability"], ans: 1, exp: "Konjunktiv II (könnten) se bahut polite request ban jaati hai!" },
    { q: "dass-clause mein verb kahan jaata hai?", opts: ["Shuroo mein", "Dusri jagah", "End mein", "Koi rule nahi"], ans: 2, exp: "dass ke baad verb ALWAYS end pe jaata hai! 'Ich denke, dass du Recht HAST.'" },
  ],
  C1: [
    { q: "'Das ist mir Wurst' ka matlab?", opts: ["Mujhe sausage chahiye", "Mujhe bilkul parwah nahi", "Ye bahut achha hai", "Main nahin jaanta"], ans: 1, exp: "German idiom! 'Das ist mir Wurst' = I don't care at all (sausage = doesn't matter!)" },
    { q: "'Den Nagel auf den Kopf treffen' matlab?", opts: ["Chot lagana", "Exactly sahi kehna", "Galat hona", "Kuch bhool jaana"], ans: 1, exp: "= To hit the nail on the head = to be exactly right!" },
  ],
  C2: [
    { q: "German mein 'Schadenfreude' ka matlab?", opts: ["Khushi ka gam", "Doosron ki takleef mein khushi", "Nostalgia", "Akela mahsoos karna"], ans: 1, exp: "Schadenfreude = Joy from others' misfortune. Schaden = damage, Freude = joy" },
    { q: "'Weltschmerz' kya hai?", opts: ["Global warming", "Duniya ke dard ka ahsaas", "World peace", "International news"], ans: 1, exp: "Weltschmerz = World-weariness / pain about the state of the world. Welt = world, Schmerz = pain" },
  ]
};
