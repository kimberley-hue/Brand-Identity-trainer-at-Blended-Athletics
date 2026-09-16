/* ==========================================================================
   BLENDED ATHLETICS — PERSONAL TRAINER BRAND DISCOVERY
   Data-driven curriculum. Edit this file to change, add, reorder or
   condition questions — the engine (app.js) renders whatever is here.
   No question content is hard-coded into the page components.
   ========================================================================== */

/* ---- Reference data reused from The Blended Way (trimmed for brand-building context) ---- */

window.BIRD_INFO = {
  eagle: {
    key: "eagle", name: "Eagle",
    tagline: "Direct, decisive and motivated by progress.",
    tendencies: ["Direct", "Decisive", "Results-focused", "Competitive", "Fast-moving", "Comfortable taking control"],
    brings: ["Momentum — often the one who pushes a stalled decision forward.", "Clarity under pressure, simplifying a messy situation into a clear next step."],
    stuck: ["May move faster than the people around them are ready for.", "Can come across as blunt when really just being efficient."],
    infoDelivery: "Direct and to the point. Leads with the bottom line, adds detail only if asked.",
    coaching: "Strong at pushing clients past a plateau — should stay mindful that not every client wants to be pushed hard in the same moment."
  },
  peacock: {
    key: "peacock", name: "Peacock",
    tagline: "Social, expressive and energized by people.",
    tendencies: ["Social", "Expressive", "Energetic", "Persuasive", "Optimistic", "Relationship-driven"],
    brings: ["Energy that lifts a room and makes people feel welcome fast.", "Natural connector, often introducing people who should know each other."],
    stuck: ["May lose track of details while focused on the bigger picture or the conversation.", "Might avoid a hard conversation to protect the relationship."],
    infoDelivery: "Prefers conversation over long written detail. Talking it through works better than a dense email.",
    coaching: "Builds fast rapport with new clients and makes a room feel welcoming — should pair energy with attention to technique detail."
  },
  dove: {
    key: "dove", name: "Dove",
    tagline: "Patient, supportive and steady under pressure.",
    tendencies: ["Patient", "Supportive", "Loyal", "Calm", "Cooperative", "Stability-focused"],
    brings: ["A calm, steady presence that helps a room feel safe.", "Strong listening skills that make clients feel heard."],
    stuck: ["May avoid conflict even when a direct conversation is needed.", "Might under-share their own opinion in a room full of louder voices."],
    infoDelivery: "Prefers a calm, one-on-one conversation over a fast group setting.",
    coaching: "Builds deep trust over time, especially with clients who are nervous or new."
  },
  owl: {
    key: "owl", name: "Owl",
    tagline: "Analytical, careful and focused on quality.",
    tendencies: ["Analytical", "Careful", "Organized", "Detail-focused", "Logical", "Quality-driven"],
    brings: ["High standards and a careful eye for getting things right.", "Strong planning and follow-through on complex or detailed work."],
    stuck: ["May take longer to decide while gathering more information.", "Might avoid speaking up until they feel fully certain."],
    infoDelivery: "Prefers detailed, accurate information delivered with time to review.",
    coaching: "Excellent at technique correction and programming detail — should remember to balance precision with encouragement."
  }
};

window.LOVE_LANG_INFO = {
  "words-of-affirmation": {
    key: "words-of-affirmation", name: "Words of Affirmation",
    tagline: "Recognition lands most when it is said or written directly.",
    examples: ["Specific praise.", "A thoughtful message.", "Recognizing effort directly."],
    reflectionQuestions: ["When has a piece of feedback or praise really stuck with you, and what made it land?", "What is one specific thing you tend to say to make someone feel seen?"]
  },
  "quality-time": {
    key: "quality-time", name: "Quality Time",
    tagline: "Being fully present matters more than being available.",
    examples: ["A focused check-in.", "Undistracted conversation.", "Being included, not just informed."],
    reflectionQuestions: ["What does a genuinely good, focused conversation look like for you?", "How do you let someone know they have your full attention?"]
  },
  "acts-of-service": {
    key: "acts-of-service", name: "Acts of Service",
    tagline: "Actions that make someone's life easier speak loudly.",
    examples: ["Solving a problem before it becomes theirs.", "Preparing something in advance.", "Quietly doing the thing that helps."],
    reflectionQuestions: ["What is one act of service someone did for you that you still remember?", "Do you notice when someone needs practical help, or only when they ask?"]
  },
  "receiving-gifts": {
    key: "receiving-gifts", name: "Receiving Gifts",
    tagline: "The thought matters more than the price.",
    examples: ["A small, thoughtful gesture tied to something personal.", "Something that shows someone was paying attention."],
    reflectionQuestions: ["Has a small, thoughtful gesture ever meant a lot to you?", "Do you tend to notice the small details that make a gesture meaningful?"]
  },
  "physical-touch": {
    key: "physical-touch", name: "Physical Touch",
    tagline: "Handled carefully, and always led by the other person's comfort.",
    examples: ["A high-five or fist bump after a hard finish.", "A handshake acknowledging a real accomplishment."],
    reflectionQuestions: ["What forms of celebration are you personally comfortable with?", "How do you read whether a client welcomes this kind of energy?"]
  }
};

/* ---- Small builder helpers ---- */
function q(obj) { return Object.assign({ kind: "question" }, obj); }
function screen(kind, obj) { return Object.assign({ kind }, obj); }

/* Generates the three repeated "YOUR PEOPLE" avatar question blocks so the
   curriculum stays data-driven rather than tripled by hand. */
function avatarQuestions(i) {
  const n = ["first", "second", "third"][i - 1];
  return [
    screen("static", {
      id: `s03_a${i}_intro`,
      heading: i === 1 ? "LET'S TALK ABOUT YOUR PEOPLE" : `CLIENT GROUP ${i === 2 ? "TWO" : "THREE"}`,
      body: i === 1
        ? [
            "You can describe up to three client groups you're genuinely drawn to — most trainers land on one or two. We'll build a short profile for each: nothing fancy, just who they are and why you connect with them.",
            "Group one is required. After that, add a second or third only if someone real actually comes to mind — you can skip ahead any time."
          ]
        : [
            `Now the ${n} group, if you have one. Same questions, a different person in mind.`,
            "Nobody coming to mind? That's completely fine — skip ahead and we'll work with what you've got."
          ],
      cta: i === 1 ? "LET'S GO" : "CONTINUE",
      skipTo: i === 2 ? "s03_a3_intro" : i === 3 ? "s03_compare_intro" : undefined,
      skipLabel: i > 1 ? `SKIP — I DON'T HAVE A ${i === 2 ? "SECOND" : "THIRD"} GROUP` : undefined
    }),
    q({ id: `s03_a${i}_who`, section: "03", prompt: `Client group ${i}: who are they?`, helper: "A sentence or two is plenty — describe the kind of person, not a demographic label.", type: "textarea", required: i === 1 }),
    q({ id: `s03_a${i}_stage`, section: "03", prompt: "What stage of life are they in?", type: "textarea", required: i === 1, conditional: { questionId: `s03_a${i}_who`, op: "filled" } }),
    q({ id: `s03_a${i}_accomplish`, section: "03", prompt: "What are they trying to accomplish?", type: "textarea", required: i === 1, conditional: { questionId: `s03_a${i}_who`, op: "filled" } }),
    q({ id: `s03_a${i}_struggle`, section: "03", prompt: "What are they struggling with?", type: "textarea", required: i === 1, conditional: { questionId: `s03_a${i}_who`, op: "filled" } }),
    q({ id: `s03_a${i}_why_enjoy`, section: "03", prompt: "Why do you enjoy working with them?", type: "textarea", required: i === 1, conditional: { questionId: `s03_a${i}_who`, op: "filled" } }),
    q({ id: `s03_a${i}_why_good`, section: "03", prompt: "Why do you believe you're particularly good at helping them?", type: "textarea", required: i === 1, conditional: { questionId: `s03_a${i}_who`, op: "filled" } }),
    q({ id: `s03_a${i}_sessions`, section: "03", prompt: "What kinds of sessions or conversations do you enjoy having with them?", type: "textarea", required: false, conditional: { questionId: `s03_a${i}_who`, op: "filled" } })
  ];
}

window.DISCOVERY = {
  meta: { estimatedMinutes: "45–60", brand: "Blended Athletics" },

  /* ===================== OPENING ===================== */
  opening: [
    screen("welcome", {
      id: "welcome",
      eyebrow: "BLENDED ATHLETICS",
      heading: "PERSONAL TRAINER\nBRAND DISCOVERY",
      sub: "BUILD A BRAND THAT'S ACTUALLY YOURS.",
      body: [
        "The strongest personal training brands don't try to speak to everyone. They become incredibly relevant to the right person.",
        "This process will help you uncover who you do your best work with, what makes your coaching different, and what you want your name to become associated with.",
        "This isn't about inventing a persona. It's about discovering what's already there."
      ],
      cta: "START YOUR BRAND DISCOVERY",
      footnote: "Approximately 45 to 60 minutes. Your progress is saved automatically."
    }),
    screen("identify", {
      id: "identify",
      heading: "FIRST, WHO'S BUILDING THIS?",
      body: ["We'll save your progress under your name so you can leave and come back without losing anything. We'll also ask for your email and whether you're currently on the Blended Athletics team, so this lands in the right place when you're done."]
    }),
    screen("static", {
      id: "before_we_begin",
      heading: "SPECIFIC BEATS IMPRESSIVE.\nHONEST BEATS POLISHED.",
      body: [
        "Don't write what you think sounds good. This isn't a marketing exercise yet, and there are no right answers.",
        "We want to understand who you actually are as a coach, who you naturally do your best work with, what you believe, and what you want to become known for.",
        "Take your time. The better your answers are here, the stronger your brand will eventually become."
      ],
      cta: "I'M READY"
    })
  ],

  sections: [
    /* ===================== 00 HOW YOU'RE WIRED ===================== */
    {
      id: "s00", number: "00", title: "HOW YOU'RE WIRED",
      kicker: "This section gives useful context. It doesn't define you.",
      screens: [
        screen("intro", { id: "s00_intro", number: "00", title: "HOW YOU'RE WIRED", body: ["Before we talk about clients or positioning, let's talk about you: how you communicate, connect and show up. This is context, not a label."] }),

        q({ id: "s00_bird_done", section: "00", prompt: "Have you completed the BIRD Personality Assessment?", type: "select", required: true, options: ["YES", "NO", "I'M NOT SURE"] }),
        q({ id: "s00_bird_primary", section: "00", prompt: "What is your primary BIRD type?", type: "select", required: true, options: ["DOVE", "OWL", "PEACOCK", "EAGLE"], conditional: { questionId: "s00_bird_done", op: "equals", value: "YES" } }),
        q({ id: "s00_bird_secondary", section: "00", prompt: "Do you know your secondary type?", helper: "Skip this if you only know your primary type.", type: "select", required: false, options: ["DOVE", "OWL", "PEACOCK", "EAGLE", "I DON'T KNOW"], conditional: { questionId: "s00_bird_done", op: "equals", value: "YES" } }),
        q({ id: "s00_bird_strength", section: "00", prompt: "How strongly do you feel this describes you?", type: "scale", min: 1, max: 10, leftLabel: "NOT REALLY ME", rightLabel: "VERY MUCH ME", required: true, conditional: { questionId: "s00_bird_done", op: "equals", value: "YES" } }),
        q({ id: "s00_bird_accurate", section: "00", prompt: "What parts of this personality description feel most accurate to you?", type: "textarea", required: true, conditional: { questionId: "s00_bird_done", op: "equals", value: "YES" } }),
        q({ id: "s00_bird_inaccurate", section: "00", prompt: "What parts don't feel like you?", type: "textarea", required: false, conditional: { questionId: "s00_bird_done", op: "equals", value: "YES" } }),

        q({ id: "s00_love_done", section: "00", prompt: "Have you completed the Five Love Languages assessment?", type: "select", required: true, options: ["YES", "NO", "I'M NOT SURE"] }),
        q({ id: "s00_love_primary", section: "00", prompt: "What is your primary love language?", type: "select", required: true, options: ["WORDS OF AFFIRMATION", "QUALITY TIME", "ACTS OF SERVICE", "RECEIVING GIFTS", "PHYSICAL TOUCH"], conditional: { questionId: "s00_love_done", op: "equals", value: "YES" } }),
        q({ id: "s00_love_secondary", section: "00", prompt: "What is your secondary love language?", type: "select", required: false, options: ["WORDS OF AFFIRMATION", "QUALITY TIME", "ACTS OF SERVICE", "RECEIVING GIFTS", "PHYSICAL TOUCH", "I DON'T KNOW"], conditional: { questionId: "s00_love_done", op: "equals", value: "YES" } }),
        q({ id: "s00_love_accurate", section: "00", prompt: "What about this feels accurate to you?", type: "textarea", required: true, conditional: { questionId: "s00_love_done", op: "equals", value: "YES" } }),
        q({ id: "s00_love_shows_up", section: "00", prompt: "How do you think this shows up in the way you connect with other people?", type: "textarea", required: false, conditional: { questionId: "s00_love_done", op: "equals", value: "YES" } }),

        screen("static", { id: "s00_deeper_intro", heading: "GO DEEPER THAN THE TESTS", body: ["Assessments are a starting point. These next questions matter more."] }),
        q({ id: "s00_best_described", section: "00", prompt: "When you're at your best, how would people describe you?", type: "textarea", required: true }),
        q({ id: "s00_stressed_change", section: "00", prompt: "When you're stressed or overwhelmed, how does your communication tend to change?", type: "textarea", required: true }),
        q({ id: "s00_show_you_care", section: "00", prompt: "How do you naturally show someone that you care about their success?", type: "textarea", required: true }),
        q({ id: "s00_receive_feedback", section: "00", prompt: "How do you prefer someone to communicate with you when something needs to improve?", type: "textarea", required: true }),
        q({ id: "s00_feel_appreciated", section: "00", prompt: "What makes you feel appreciated?", type: "textarea", required: true }),
        q({ id: "s00_feel_misunderstood", section: "00", prompt: "What makes you feel misunderstood?", type: "textarea", required: false }),
        q({ id: "s00_meeting_new", section: "00", prompt: "When meeting someone new, do you tend to lead the conversation or let them open up first?", type: "select", options: ["I LEAD THE CONVERSATION", "I LET THEM OPEN UP FIRST", "IT DEPENDS ON THE PERSON"], required: true }),
        q({ id: "s00_build_connection", section: "00", prompt: "How do you naturally build connection?", helper: "Select all that feel true.", type: "multiselect", options: ["CONVERSATION", "HUMOUR", "TEACHING", "ENCOURAGEMENT", "CHALLENGE", "LISTENING", "SHARED EXPERIENCES"], allowOther: true, required: true }),

        screen("reflection", {
          id: "s00_reflection", heading: "THIS IS YOUR STARTING POINT.",
          intro: "We're not drawing brand conclusions yet — just laying out what you've told us so far.",
          birdFrom: "s00_bird_primary", birdDoneFrom: "s00_bird_done",
          loveFrom: "s00_love_primary", loveDoneFrom: "s00_love_done",
          phraseSources: ["s00_best_described", "s00_show_you_care", "s00_feel_appreciated", "s00_stressed_change", "s00_build_connection"],
          cta: "NOW LET'S DISCOVER YOUR BRAND"
        })
      ]
    },

    /* ===================== 01 YOU ===================== */
    {
      id: "s01", number: "01", title: "YOU",
      screens: [
        screen("intro", { id: "s01_intro", number: "01", title: "YOU", body: ["Who you are before we ever ask you to build a brand."] }),
        q({ id: "s01_why_coach", section: "01", prompt: "Why do you coach?", helper: "Go deeper than “I like helping people.” What part of helping someone actually matters to you?", type: "textarea", required: true }),
        q({ id: "s01_most_energy", section: "01", prompt: "What part of coaching gives you the most energy?", type: "textarea", required: true }),
        q({ id: "s01_enjoy_conversations", section: "01", prompt: "What kinds of conversations with clients do you genuinely enjoy having?", type: "textarea", required: true }),
        q({ id: "s01_talk_for_hours", section: "01", prompt: "What areas of fitness, health or performance could you talk about for hours?", type: "textarea", required: true }),
        q({ id: "s01_industry_frustration", section: "01", prompt: "What frustrates you about the fitness industry?", type: "textarea", required: false }),
        q({ id: "s01_great_coaching", section: "01", prompt: "What do you believe great coaching should actually accomplish?", type: "textarea", required: true }),
        q({ id: "s01_favourite_clients", section: "01", prompt: "Think about your three favourite clients you've ever coached. Who comes to mind?", helper: "First names or descriptions are fine — this stays with you.", type: "textarea", required: true }),
        q({ id: "s01_favourite_why", section: "01", prompt: "What specifically made you enjoy coaching those people?", type: "textarea", required: true }),
        q({ id: "s01_favourite_common", section: "01", prompt: "What did those clients have in common?", type: "textarea", required: true }),
        q({ id: "s01_energized_by", section: "01", prompt: "Which clients tend to leave you feeling energized after a session?", type: "textarea", required: true }),
        q({ id: "s01_drained_by", section: "01", prompt: "Which types of clients tend to drain you, even if they're perfectly nice people?", type: "textarea", required: true }),
        screen("static", { id: "s01_money_intro", heading: "IF MONEY AND LEAD AVAILABILITY DIDN'T MATTER...", body: ["Answer honestly. This is the closest thing to a straight read on where your energy actually wants to go."] }),
        q({ id: "s01_money_who", section: "01", prompt: "Who would you spend most of your coaching hours working with?", type: "textarea", required: true }),
        q({ id: "s01_money_why", section: "01", prompt: "Why?", type: "textarea", required: true })
      ]
    },

    /* ===================== 02 YOUR STORY ===================== */
    {
      id: "s02", number: "02", title: "YOUR STORY",
      screens: [
        screen("intro", { id: "s02_intro", number: "02", title: "YOUR STORY", body: ["The experiences that shaped how you coach today."] }),
        q({ id: "s02_brought_you_in", section: "02", prompt: "What originally brought you into fitness?", type: "textarea", required: true }),
        q({ id: "s02_want_to_coach", section: "02", prompt: "What made you want to become a coach?", type: "textarea", required: true }),
        q({ id: "s02_shaped_coaching", section: "02", prompt: "What experiences have most shaped how you coach today?", type: "textarea", required: true }),
        q({ id: "s02_turning_point", section: "02", prompt: "Have you experienced a significant transformation, setback, injury, failure, challenge or turning point that changed how you think about training?", type: "textarea", required: true }),
        q({ id: "s02_turning_point_taught", section: "02", prompt: "What did it teach you?", type: "textarea", required: true, conditional: { questionId: "s02_turning_point", op: "filled" } }),
        q({ id: "s02_no_longer_believe", section: "02", prompt: "What did you once believe about fitness, health or performance that you no longer believe?", type: "textarea", required: false }),
        q({ id: "s02_hard_lesson", section: "02", prompt: "What lesson did you have to learn the hard way?", type: "textarea", required: false }),
        q({ id: "s02_understand_differently", section: "02", prompt: "What have you personally experienced that allows you to understand a client differently than another trainer might?", type: "textarea", required: true }),
        screen("static", { id: "s02_gets_it_intro", heading: "WHAT PART OF YOUR STORY WOULD MAKE THE RIGHT CLIENT THINK:\n“THEY GET IT.”", body: [] }),
        q({ id: "s02_gets_it", section: "02", prompt: "Tell us.", type: "textarea", required: true }),
        q({ id: "s02_background", section: "02", prompt: "Anything else worth connecting to your professional brand?", helper: "Athletic background, previous careers, education, hobbies, life experiences, communities you belong to, things you're currently learning — only what you'd actually want connected to your brand.", type: "textarea", required: false })
      ]
    },

    /* ===================== 03 YOUR PEOPLE ===================== */
    {
      id: "s03", number: "03", title: "YOUR PEOPLE",
      screens: [
        screen("intro", { id: "s03_intro", number: "03", title: "YOUR PEOPLE", body: ["Choosing an ideal client does not mean refusing to train everyone else. It means becoming exceptionally relevant to someone."] }),
        ...avatarQuestions(1),
        ...avatarQuestions(2),
        ...avatarQuestions(3),
        screen("static", { id: "s03_compare_intro", heading: "LOOKING AT YOUR GROUP(S)", body: ["Here's what you told us about each."] , showAvatars: true }),
        q({ id: "s03_choice", section: "03", prompt: "If you could build most of your client roster around one of these groups for the next two years, which would you choose?", type: "select_dynamic", optionsFrom: ["s03_a1_who", "s03_a2_who", "s03_a3_who"], required: true }),
        q({ id: "s03_choice_why", section: "03", prompt: "Why them?", type: "textarea", required: true })
      ]
    },

    /* ===================== 04 THEIR WORLD ===================== */
    {
      id: "s04", number: "04", title: "THEIR WORLD",
      screens: [
        screen("intro", { id: "s04_intro", number: "04", title: "THEIR WORLD", body: ["Let's get inside your ideal client's life before they ever contact Blended. This is the deepest section — take your time."] }),
        q({ id: "s04_ordinary_day", section: "04", prompt: "Describe an ordinary day in this person's life.", type: "textarea", required: true }),
        q({ id: "s04_problem_now", section: "04", prompt: "What's the problem they're dealing with right now?", type: "textarea", required: true }),
        q({ id: "s04_bothers_most", section: "04", prompt: "When does this problem bother them most?", type: "textarea", required: true }),
        q({ id: "s04_frustrated_by", section: "04", prompt: "What are they frustrated by?", type: "textarea", required: true }),
        q({ id: "s04_already_tried", section: "04", prompt: "What have they already tried?", type: "textarea", required: true }),
        q({ id: "s04_why_not_solved", section: "04", prompt: "Why hasn't it completely solved the problem?", type: "textarea", required: true }),
        q({ id: "s04_where_else", section: "04", prompt: "Where else might they go for help?", type: "textarea", required: false }),
        q({ id: "s04_googling", section: "04", prompt: "What are they Googling?", type: "textarea", required: false }),
        q({ id: "s04_watching_reading", section: "04", prompt: "What are they watching or reading online?", type: "textarea", required: false }),
        q({ id: "s04_complaining", section: "04", prompt: "What are they complaining about to their spouse, partner, friends or family?", type: "textarea", required: true }),
        q({ id: "s04_tired_of_hearing", section: "04", prompt: "What are they tired of hearing?", type: "textarea", required: false }),
        q({ id: "s04_afraid_might_happen", section: "04", prompt: "What are they afraid might happen if nothing changes?", type: "textarea", required: true }),
        q({ id: "s04_embarrassed", section: "04", prompt: "What might they be embarrassed or uncomfortable admitting?", type: "textarea", required: true }),
        q({ id: "s04_miss_doing", section: "04", prompt: "What do they miss being able to do?", type: "textarea", required: false }),
        q({ id: "s04_started_avoiding", section: "04", prompt: "What have they started avoiding?", type: "textarea", required: false }),
        q({ id: "s04_enough_moment", section: "04", prompt: "What makes them finally say: “Enough. I need help.”", type: "textarea", required: true }),
        q({ id: "s04_stop_hiring", section: "04", prompt: "What might stop them from hiring a trainer?", type: "textarea", required: true }),
        q({ id: "s04_skeptical", section: "04", prompt: "What are they skeptical about?", type: "textarea", required: false }),
        q({ id: "s04_trust_issue", section: "04", prompt: "What previous experience might make it difficult for them to trust a coach?", type: "textarea", required: false }),
        q({ id: "s04_need_before_start", section: "04", prompt: "What would they need to hear or experience before they felt comfortable starting?", type: "textarea", required: true }),
        q({ id: "s04_think_need", section: "04", prompt: "WHAT DOES YOUR CLIENT THINK THEY NEED?", type: "textarea", required: true, emphasis: true }),
        q({ id: "s04_actually_need", section: "04", prompt: "WHAT DO YOU BELIEVE THEY ACTUALLY NEED?", type: "textarea", required: true, emphasis: true }),
        screen("reflection", {
          id: "s04_reflection", heading: "LOOK AT WHAT YOU JUST TOLD US.",
          template: [
            { label: "They want", ref: "s04_enough_moment" },
            { label: "They're frustrated by", ref: "s04_frustrated_by" },
            { label: "They've already tried", ref: "s04_already_tried" },
            { label: "They're afraid of", ref: "s04_afraid_might_happen" },
            { label: "What they think they need", ref: "s04_think_need" },
            { label: "What you believe they need", ref: "s04_actually_need" }
          ],
          followupId: "s04_real_problem", followupPrompt: "WHAT'S THE REAL PROBLEM HERE?"
        })
      ]
    },

    /* ===================== 05 THE TRANSFORMATION ===================== */
    {
      id: "s05", number: "05", title: "THE TRANSFORMATION",
      screens: [
        screen("intro", { id: "s05_intro", number: "05", title: "THE TRANSFORMATION", body: ["Moving from problem to outcome."] }),
        q({ id: "s05_changes_physically", section: "05", prompt: "If your coaching works exactly as you hope, what changes physically for this person?", type: "textarea", required: true }),
        q({ id: "s05_can_do_now", section: "05", prompt: "What can they do that they couldn't do before?", type: "textarea", required: true }),
        q({ id: "s05_no_longer_avoiding", section: "05", prompt: "What are they no longer avoiding?", type: "textarea", required: false }),
        q({ id: "s05_becomes_easier", section: "05", prompt: "What becomes easier?", type: "textarea", required: false }),
        screen("static", { id: "s05_beyond_physical", heading: "NOW GO BEYOND THE PHYSICAL OUTCOMES", body: [] }),
        q({ id: "s05_feel_differently", section: "05", prompt: "How do they feel differently?", type: "textarea", required: true }),
        q({ id: "s05_believe_now", section: "05", prompt: "What do they believe about themselves now?", type: "textarea", required: true }),
        q({ id: "s05_no_longer_afraid", section: "05", prompt: "What are they no longer afraid of?", type: "textarea", required: false }),
        q({ id: "s05_becomes_possible", section: "05", prompt: "What becomes possible in their life?", type: "textarea", required: true }),
        q({ id: "s05_life_changes", section: "05", prompt: "How do their relationships, recreation, work, sport or everyday life change?", type: "textarea", required: false }),
        q({ id: "s05_dream_sentence", section: "05", prompt: "IF ONE SENTENCE FROM A CLIENT WOULD MAKE YOU THINK “THIS IS EXACTLY WHY I BECAME A COACH,” what would you want them to say?", type: "textarea", required: true, emphasis: true }),
        screen("reflection", {
          id: "s05_visual", heading: "BEFORE → YOUR COACHING → AFTER",
          beforeFrom: "s04_problem_now", middleFrom: "s01_great_coaching", afterFrom: "s05_becomes_possible"
        })
      ]
    },

    /* ===================== 06 YOUR DIFFERENCE ===================== */
    {
      id: "s06", number: "06", title: "YOUR DIFFERENCE",
      screens: [
        screen("intro", { id: "s06_intro", number: "06", title: "YOUR DIFFERENCE", body: ["Methodology and differentiation."] }),
        q({ id: "s06_notice_overlooked", section: "06", prompt: "When you meet a new client, what do you notice that another trainer might overlook?", type: "textarea", required: true }),
        q({ id: "s06_questions_matter", section: "06", prompt: "What questions do you tend to ask that matter to you?", type: "textarea", required: true }),
        q({ id: "s06_do_differently", section: "06", prompt: "What do you do differently?", type: "textarea", required: true }),
        q({ id: "s06_refuse_to_do", section: "06", prompt: "What do you refuse to do, even if it's common in the fitness industry?", type: "textarea", required: false }),
        q({ id: "s06_underestimated", section: "06", prompt: "What do you believe produces results that other coaches underestimate?", type: "textarea", required: false }),
        q({ id: "s06_industry_wrong", section: "06", prompt: "What do you believe the industry gets wrong about your ideal client's problem?", type: "textarea", required: false }),
        q({ id: "s06_clients_say_different", section: "06", prompt: "What do clients frequently say is different about working with you?", type: "textarea", required: true }),
        q({ id: "s06_influences", section: "06", prompt: "What methods, systems, education or areas of expertise influence your coaching?", type: "textarea", required: true }),
        q({ id: "s06_currently_improving", section: "06", prompt: "What are you currently trying to become better at?", type: "textarea", required: false }),
        screen("static", {
          id: "s06_teach", heading: "YOUR PROBLEM IS NOT YOUR METHOD.",
          body: ["The problem you own is what your client wants help solving. The method you use is how you help solve it."]
        }),
        q({ id: "s06_problem_own", section: "06", prompt: "WHAT PROBLEM DO YOU WANT YOUR NAME ASSOCIATED WITH?", type: "textarea", required: true, emphasis: true }),
        q({ id: "s06_how_solve", section: "06", prompt: "HOW DO YOU APPROACH SOLVING THAT PROBLEM?", type: "textarea", required: true, emphasis: true })
      ]
    },

    /* ===================== 07 YOUR COACHING STYLE ===================== */
    {
      id: "s07", number: "07", title: "YOUR COACHING STYLE",
      screens: [
        screen("intro", { id: "s07_intro", number: "07", title: "YOUR COACHING STYLE", body: ["Drag each slider to where you actually land, not where you think you should."] }),
        screen("spectrumset", {
          id: "s07_spectrums", heading: "WHERE DO YOU LAND?",
          items: [
            { id: "s07_spec_energy", left: "HIGH ENERGY", right: "CALM" },
            { id: "s07_spec_direct", left: "DIRECT", right: "GENTLE" },
            { id: "s07_spec_technical", left: "HIGHLY TECHNICAL", right: "KEEP IT SIMPLE" },
            { id: "s07_spec_structure", left: "HIGHLY STRUCTURED", right: "FLEXIBLE" },
            { id: "s07_spec_push", left: "PUSH ME", right: "REASSURE ME" },
            { id: "s07_spec_compete", left: "COMPETITIVE", right: "COLLABORATIVE" },
            { id: "s07_spec_serious", left: "SERIOUS", right: "PLAYFUL" }
          ]
        }),
        q({ id: "s07_who_responds", section: "07", prompt: "What kind of person tends to respond incredibly well to your personality?", type: "textarea", required: true }),
        q({ id: "s07_who_different", section: "07", prompt: "What kind of person might need a different coaching style?", type: "textarea", required: false }),
        q({ id: "s07_give_feedback", section: "07", prompt: "How do you give feedback?", type: "textarea", required: true }),
        q({ id: "s07_celebrate", section: "07", prompt: "How do you celebrate success?", type: "textarea", required: true }),
        q({ id: "s07_not_following_through", section: "07", prompt: "How do you handle someone who isn't following through?", type: "textarea", required: true }),
        q({ id: "s07_lacks_confidence", section: "07", prompt: "How do you respond when someone lacks confidence?", type: "textarea", required: true }),
        q({ id: "s07_wants_pushed", section: "07", prompt: "How do you respond when someone wants to be pushed harder?", type: "textarea", required: false }),
        q({ id: "s07_feels_like", section: "07", prompt: "What do you want a client to say it FEELS like to train with you?", type: "textarea", required: true, emphasis: true })
      ]
    },

    /* ===================== 08 YOUR BRAND ===================== */
    {
      id: "s08", number: "08", title: "YOUR BRAND",
      screens: [
        screen("intro", { id: "s08_intro", number: "08", title: "YOUR BRAND", body: ["You now have enough on the table to answer these meaningfully."] }),
        q({ id: "s08_who_help", section: "08", prompt: "WHO DO YOU HELP?", type: "textarea", required: true }),
        q({ id: "s08_problem_known", section: "08", prompt: "WHAT PROBLEM DO YOU WANT TO BECOME KNOWN FOR SOLVING?", type: "textarea", required: true }),
        q({ id: "s08_transformation", section: "08", prompt: "WHAT TRANSFORMATION DO YOU WANT TO CREATE?", type: "textarea", required: true }),
        q({ id: "s08_makes_different", section: "08", prompt: "WHAT MAKES YOUR APPROACH DIFFERENT?", type: "textarea", required: true }),
        q({ id: "s08_believe_coaching", section: "08", prompt: "WHAT DO YOU BELIEVE ABOUT COACHING?", type: "textarea", required: true }),
        q({ id: "s08_principles", section: "08", prompt: "WHAT 3 TO 5 PRINCIPLES SHOULD DEFINE HOW YOU COACH?", type: "textarea", required: true }),
        q({ id: "s08_not_in_room", section: "08", prompt: "WHAT DO YOU WANT SOMEONE TO SAY ABOUT YOU WHEN YOU'RE NOT IN THE ROOM?", type: "textarea", required: true }),
        q({ id: "s08_three_years", section: "08", prompt: "What do you want your coaching practice to look like three years from now?", type: "textarea", required: false }),
        q({ id: "s08_more_clients", section: "08", prompt: "What types of clients do you want more of?", type: "textarea", required: false }),
        q({ id: "s08_want_learn", section: "08", prompt: "What do you want to learn?", type: "textarea", required: false }),
        q({ id: "s08_skills_develop", section: "08", prompt: "What skills do you want to develop?", type: "textarea", required: false }),
        q({ id: "s08_future_offers", section: "08", prompt: "Are there services, programs, workshops or specialties you'd eventually like to build?", type: "textarea", required: false })
      ]
    },

    /* ===================== 09 THE BRAND YOU'RE BUILDING ===================== */
    {
      id: "s09", number: "09", title: "THE BRAND YOU'RE BUILDING",
      screens: [
        screen("static", { id: "s09_intro", heading: "A BRAND ISN'T JUST WHAT YOU SAY.\nIT'S WHAT PEOPLE LEARN TO EXPECT FROM YOU.", body: [] }),
        q({ id: "s09_known_for", section: "09", prompt: "What do you want to be known for?", type: "textarea", required: true }),
        q({ id: "s09_committing_to", section: "09", prompt: "What are you committing to becoming exceptionally good at?", type: "textarea", required: true }),
        q({ id: "s09_consistently_teach", section: "09", prompt: "What will you consistently teach and talk about?", type: "textarea", required: true }),
        q({ id: "s09_need_to_learn", section: "09", prompt: "What do you need to learn or improve to earn this position?", type: "textarea", required: false }),
        q({ id: "s09_behaviours", section: "09", prompt: "What behaviours need to consistently reinforce your brand?", type: "textarea", required: true }),
        q({ id: "s09_undermine", section: "09", prompt: "What would undermine the brand you're trying to build?", type: "textarea", required: true }),
        q({ id: "s09_next_12_months", section: "09", prompt: "What actions over the next 12 months would prove you're actually building this brand?", type: "textarea", required: true }),
        screen("sentence", {
          id: "s09_sentence", heading: "COMPLETE THIS SENTENCE.",
          body: ["Don't worry about making this sound like marketing copy. We will refine the language later."],
          blanks: [
            { id: "s09_sentence_who", label: "I help", placeholder: "who" },
            { id: "s09_sentence_problem", label: "who are struggling with", placeholder: "the problem" },
            { id: "s09_sentence_transformation", label: "so they can", placeholder: "the transformation" },
            { id: "s09_sentence_approach", label: "through", placeholder: "your approach" }
          ]
        })
      ]
    }
  ],

  /* ===================== CHECKPOINT + SYNTHESIS ===================== */
  checkpoint: screen("checkpoint", {
    id: "brand_checkpoint",
    heading: "HERE'S WHAT WE'RE HEARING.",
    fields: [
      { key: "yourPeople", label: "YOUR PEOPLE SEEM TO BE" },
      { key: "problemEnergized", label: "THE PROBLEM YOU SEEM MOST ENERGIZED BY" },
      { key: "reallyWant", label: "WHAT THEY REALLY WANT" },
      { key: "differentiator", label: "YOUR STRONGEST DIFFERENTIATOR APPEARS TO BE" },
      { key: "transformation", label: "THE TRANSFORMATION THAT KEEPS APPEARING" },
      { key: "coachingStyle", label: "YOUR NATURAL COACHING STYLE" },
      { key: "spaceToOwn", label: "THE SPACE YOU COULD BECOME KNOWN FOR" }
    ],
    question: "DOES THIS FEEL LIKE YOU?",
    options: ["YES. KEEP GOING.", "MOSTLY. I WANT TO REFINE SOMETHING.", "NO. LET ME RETHINK THIS."]
  }),

  synthesisIntro: screen("static", {
    id: "synthesis_intro",
    heading: "YOU DID THE HARD PART.\nNOW LET'S CONNECT THE DOTS.",
    body: [
      "You've spent time thinking about who you are, who you want to help, what you believe, and the kind of coach you want to become.",
      "Now we'll look across your answers for patterns and turn what you've discovered into a clear Brand Blueprint."
    ],
    cta: "BUILD MY BRAND BLUEPRINT"
  })
};
