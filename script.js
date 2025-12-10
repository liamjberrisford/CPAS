const SCALE_OPTIONS = [
  { value: 0, label: "Never true" },
  { value: 1, label: "Seldom true" },
  { value: 2, label: "Sometimes true" },
  { value: 3, label: "Often true" },
  { value: 4, label: "Always true" }
];

const BAND_LABELS = ["Not at all", "A fair amount", "Much", "Intense"];
const BAND_CLASSES = ["band-not-at-all", "band-fair", "band-much", "band-intense"];
const BAND_THRESHOLDS = [0.75, 1.75, 2.75];

const subscales = {
  confidence: {
    label: "Confidence",
    items: [1, 4, 5, 8, 11, 13, 16, 19],
    bands: [
      "The students within this band are familiar or \"at-home\" with computers, probably have prior programming experience and feel comfortable tackling most tasks.",
      "These students seldom feel nervous with computers, yet complicated programme lines and technical vocabulary can trigger some anxiety.",
      "Students here often doubt their ability to handle programming challenges and feel mentally blocked whenever errors appear.",
      "Students are nervous and uncomfortable with computers, tend to avoid them, and feel they will never understand programming concepts."
    ]
  },
  errors: {
    label: "Errors",
    items: [2, 6, 9, 12, 17],
    bands: [
      "Students seldom worry about debugging and remain calm even if programme lines need repeated corrections.",
      "Bugs can be annoying and there is noticeable worry when programmes fail to run or must be fixed several times.",
      "Students feel quite troubled by recurring bugs and experience high anxiety when they have to keep correcting work.",
      "Errors trigger intense tension. Students are very anxious every time programmes fail and expect to rework lines repeatedly."
    ]
  },
  significantOthers: {
    label: "Significant Others",
    items: [3, 7, 10, 14, 15, 18],
    bands: [
      "Students are not worried about teachers picking on them, nor are they threatened by more capable peers.",
      "Peer comparisons and teacher opinions occasionally trouble these students, especially when concepts feel unfamiliar.",
      "Students are often worried about being called out for mistakes and feel a great deal of peer pressure.",
      "Students constantly worry that teachers and peers will expose their weaknesses; the classroom feels intimidating."
    ]
  }
};

const questions = [
  { number: 1, text: "Computers make me feel nervous and uncomfortable.", subscale: "confidence" },
  { number: 2, text: "Debugging of programmes is a great worry to me.", subscale: "errors" },
  { number: 3, text: "I worry about making a fool of myself in front of my friends when I cannot write programmes.", subscale: "significantOthers" },
  { number: 4, text: "My mind seems to be confused with so many computer terms.", subscale: "confidence" },
  { number: 5, text: "I think I would not be able to understand programming.", subscale: "confidence" },
  { number: 6, text: "I am troubled by the number of bugs in my programme.", subscale: "errors" },
  { number: 7, text: "I worry about being picked by my teachers when I make mistakes in programming.", subscale: "significantOthers" },
  { number: 8, text: "If my programme cannot run I do not know what to do next.", subscale: "confidence" },
  { number: 9, text: "I get worried when my programmes cannot run.", subscale: "errors" },
  { number: 10, text: "It worries me that my teacher knows I cannot programme well.", subscale: "significantOthers" },
  { number: 11, text: "I cannot think properly when there is an error in my programme lines.", subscale: "confidence" },
  { number: 12, text: "I feel tense when I have to correct my programme lines over and over again.", subscale: "errors" },
  { number: 13, text: "As the programme lines become more complicated I feel that I cannot concentrate.", subscale: "confidence" },
  { number: 14, text: "I feel nervous in the presence of more capable computer science students.", subscale: "significantOthers" },
  { number: 15, text: "I feel troubled when my friends could programme and I could not.", subscale: "significantOthers" },
  { number: 16, text: "My mind seems to go blank when I cannot solve a computer problem.", subscale: "confidence" },
  { number: 17, text: "I feel tense whenever there are errors in my computer programme.", subscale: "errors" },
  { number: 18, text: "I am troubled when friends discuss programming concepts that I do not understand.", subscale: "significantOthers" },
  { number: 19, text: "I do not feel confident whenever I work on the computer.", subscale: "confidence" }
];

const RESOURCE_MAP = {
  1: {
    title: "My learning history narrative worksheet",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Unpack where discomfort with computers comes from and start rewriting that story.",
    examples: [
      { title: "Early memories", text: "The first time I remember using a computer was…" },
      { title: "Alternative narrative", text: "If I told my story as 'I'm learning to code' instead of 'I'm bad at code', it would sound like…" }
    ]
  },
  2: {
    title: "Post-session reflection prompts",
    cluster: "Evaluation and implementation supports",
    type: "Session reflection",
    summary: "Review what you tried while debugging and what happened to build debugging self-efficacy.",
    examples: [
      { title: "What I tried", text: "Today I worked on…" },
      { title: "Next tweak", text: "Next time I'll change one thing in how I work, which is…" }
    ]
  },
  3: {
    title: "Group agreements for supportive labs",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Classroom culture tool",
    summary: "Co-created norms that reduce fear of embarrassment when asking for help.",
    examples: [
      { title: "Normalize errors", text: "We treat bugs and errors as normal, not as signs someone doesn't belong." },
      { title: "Ask for help fast", text: "It's OK to say 'I'm stuck' within 5 minutes of trying on your own." }
    ]
  },
  4: {
    title: "Question-asking scripts",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Sentence stems for clarifying jargon and lowering shame when terms are confusing.",
    examples: [
      { title: "Context first", text: "I'm working on [brief task] in [language/tool]. I expected it to… but instead it…" },
      { title: "What I want from you", text: "Right now I'd like: a small hint / a bigger explanation / a code example." }
    ]
  },
  5: {
    title: "Self-compassion and inner-critic dialogue sheet",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Balances the \"I cannot do this\" belief with kinder counter-statements.",
    examples: [
      { title: "Inner critic line", text: "You're terrible at this. Everyone else gets it." },
      { title: "Compassionate reply", text: "Tests are supposed to catch issues. You're learning like everyone else. What's one tiny piece to improve first?" }
    ]
  },
  6: {
    title: "Micro-practices cheat sheet for instructors",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Instructor micro-practices",
    summary: "Low-effort phrases and moves that normalise bugs and make errors feel safe.",
    examples: [
      { title: "Normalize errors aloud", text: "If you have zero error messages today, you're either a genius or you didn't run your code." },
      { title: "3-second pause", text: "After asking a question, silently count to 3 before jumping in; say 'I'll give folks a few seconds to think.'" }
    ]
  },
  7: {
    title: "Peer-observation rubric",
    cluster: "Evaluation and implementation supports",
    type: "Peer observation",
    summary: "Prompts instructor practices that avoid shaming or cold-calling around mistakes.",
    examples: [
      { title: "Normalising struggle", text: "Instructor explicitly frames errors/bugs as normal parts of learning." },
      { title: "Help-seeking norms", text: "Structures like 'Ask 3 then me' or a buddy system are visible and encouraged." }
    ]
  },
  8: {
    title: "When I'm Stuck flowchart",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Step-by-step plan for the first 5–10 minutes when code will not run.",
    examples: [
      { title: "Check usual suspects", text: "Typos, missing imports/packages, wrong file saved/run, mismatched brackets/indent." },
      { title: "Make one small experiment", text: "Add a print/log or run just a tiny part of the code to see what changes." }
    ]
  },
  9: {
    title: "Pre-session check-in cards",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Name worries about programs failing before you start, and plan how to respond.",
    examples: [
      { title: "Today I feel", text: "Worried / Curious / Tired / Excited (circle one)." },
      { title: "What would help", text: "A slower pace / more examples / a buddy / reassurance it's OK to ask 'basic' questions." }
    ]
  },
  10: {
    title: "Feedback practices guide",
    cluster: "Programme-level Programming Companion",
    type: "Instructor guidance",
    summary: "Helps teachers give strategy-focused feedback instead of reinforcing labels.",
    examples: [
      { title: "Process-focused stem", text: "I can see you're trying X strategy here – that's a strong choice because…" },
      { title: "Wise feedback", text: "I'm giving you these comments because I have high expectations and I'm confident you can reach them." }
    ]
  },
  11: {
    title: "When I'm Stuck flowchart",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Structured sequence for moments when errors make it hard to think.",
    examples: [
      { title: "Read the error slowly", text: "Underline the file, line number, and key words before guessing." },
      { title: "Make one small experiment", text: "Add a print/log or run just a tiny part of the code to see what changes." }
    ]
  },
  12: {
    title: "Self-compassion and inner-critic dialogue sheet",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Eases the self-criticism and frustration that flare during repeated corrections.",
    examples: [
      { title: "Inner critic line", text: "You're terrible at this. Everyone else gets it." },
      { title: "Compassionate reply", text: "Tests are supposed to catch issues. You're learning like everyone else. What's one tiny piece to improve first?" }
    ]
  },
  13: {
    title: "Personal anxiety-pattern map",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Maps the pattern from rising complexity to overload so it can be recognised and managed.",
    examples: [
      { title: "Situation and thought", text: "Pair programming starts -> 'Everyone will see I don't belong here.'" },
      { title: "Alternative thought and action", text: "Most people focus on their own code; ask one clarification question and run the code anyway." }
    ]
  },
  14: {
    title: "Trait-aware learning journals template",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Regular prompts to track progress and reduce social comparison anxiety.",
    examples: [
      { title: "Noticing comparison", text: "A moment I compared myself to others was… The story I told myself was… A more realistic story is…" },
      { title: "Next week's experiment", text: "One tiny change I'll test in how I study or practice is…" }
    ]
  },
  15: {
    title: "Self-compassion and inner-critic dialogue sheet",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Counters the \"everyone else can do this but me\" narrative.",
    examples: [
      { title: "Inner critic line", text: "You're terrible at this. Everyone else gets it." },
      { title: "Compassionate reply", text: "Tests are supposed to catch issues. You're learning like everyone else. What's one tiny piece to improve first?" }
    ]
  },
  16: {
    title: "When I'm Stuck flowchart",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Designed for blank-mind moments to offer immediate next steps.",
    examples: [
      { title: "Stop and describe", text: "Write one sentence each: what I expected vs what actually happened." },
      { title: "Check usual suspects", text: "Typos, missing imports/packages, wrong file saved/run, mismatched brackets/indent." }
    ]
  },
  17: {
    title: "Pre-session check-in cards",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Plan in advance how to respond when errors appear so tension does not spike.",
    examples: [
      { title: "One thing I'm nervous about", text: "Making a mistake in front of others / breaking something / not keeping up / other: ____" },
      { title: "If I get stuck, I will…", text: "Try my 'When I'm Stuck' steps, then ask X person." }
    ]
  },
  18: {
    title: "Question-asking scripts",
    cluster: "Session-level Programming Anxiety Toolkit",
    type: "Learner-facing support",
    summary: "Concrete stems for joining conversations and asking for explanations without shame.",
    examples: [
      { title: "Context first", text: "I'm working on [brief task] in [language/tool]. I expected it to… but instead it…" },
      { title: "What I want from you", text: "Right now I'd like: a small hint / a bigger explanation / a code example." }
    ]
  },
  19: {
    title: "Values and motivation sheet",
    cluster: "Programme-level Programming Companion",
    type: "Reflective learner tool",
    summary: "Anchors low confidence to personally meaningful reasons for learning to code.",
    examples: [
      { title: "Curiosity row", text: "Coding lets me take things apart and rebuild them; tiny action: explore one 'what if' for 10 minutes." },
      { title: "Helping others row", text: "Coding can make others' jobs easier; tiny action: ask a peer what small tool might help them." }
    ]
  }
};

renderQuestions();
setUpHandlers();

function renderQuestions() {
  const container = document.getElementById("questionContainer");
  const list = document.createElement("ol");
  list.className = "question-list";

  questions.forEach((question) => {
    const listItem = document.createElement("li");
    listItem.className = "question";
    listItem.dataset.question = question.number;
    listItem.dataset.subscale = question.subscale;

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const textSpan = document.createElement("span");
    textSpan.textContent = `${question.number}. ${question.text}`;
    const tag = document.createElement("span");
    tag.className = "subscale-tag";
    tag.textContent = `${subscales[question.subscale].label} subscale`;

    legend.append(textSpan, tag);
    fieldset.appendChild(legend);

    const optionsWrapper = document.createElement("div");
    optionsWrapper.className = "options";

    SCALE_OPTIONS.forEach((option, idx) => {
      const optionId = `q${question.number}-${option.value}`;
      const label = document.createElement("label");
      label.className = "option";
      label.setAttribute("for", optionId);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${question.number}`;
      input.id = optionId;
      input.value = option.value;
      if (idx === 0) {
        input.required = true; // one required radio per group for native validation support
      }

      const text = document.createElement("span");
      text.textContent = `${option.value} – ${option.label}`;

      label.append(input, text);
      optionsWrapper.appendChild(label);
    });

    fieldset.appendChild(optionsWrapper);
    listItem.appendChild(fieldset);
    list.appendChild(listItem);
  });

  container.appendChild(list);
}

function setUpHandlers() {
  const form = document.getElementById("quizForm");
  const resultsSection = document.getElementById("results");
  const resetButton = document.getElementById("resetBtn");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const answers = {};
    const missing = [];

    questions.forEach(({ number }) => {
      const key = `q${number}`;
      const rawValue = formData.get(key);
      if (rawValue === null) {
        missing.push(number);
      } else {
        answers[number] = Number(rawValue);
      }
    });

    highlightMissing(missing);

    if (missing.length) {
      const list = missing.join(", ");
      resultsSection.classList.remove("hidden");
      resultsSection.innerHTML = `<p>Please answer statement(s) ${list} before scoring the instrument.</p>`;
      return;
    }

    const breakdown = calculateSubscaleScores(answers);
    renderResults(breakdown, answers, resultsSection);
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    highlightMissing([]);
    resultsSection.classList.add("hidden");
    resultsSection.innerHTML = "";
  });
}

function highlightMissing(missingNumbers) {
  document.querySelectorAll(".question").forEach((node) => {
    node.classList.remove("unanswered");
  });

  missingNumbers.forEach((num) => {
    const questionNode = document.querySelector(`.question[data-question="${num}"]`);
    if (questionNode) {
      questionNode.classList.add("unanswered");
    }
  });
}

function calculateSubscaleScores(answers) {
  const summary = {};
  Object.entries(subscales).forEach(([key, meta]) => {
    const total = meta.items.reduce((sum, itemNumber) => sum + answers[itemNumber], 0);
    const max = meta.items.length * 4;
    const average = total / meta.items.length;
    const bandIndex = determineBand(average);

    summary[key] = {
      label: meta.label,
      total,
      max,
      average,
      bandIndex,
      bandLabel: BAND_LABELS[bandIndex],
      bandClass: BAND_CLASSES[bandIndex],
      description: meta.bands[bandIndex],
      items: meta.items
    };
  });
  return summary;
}

function determineBand(average) {
  if (average < BAND_THRESHOLDS[0]) return 0;
  if (average < BAND_THRESHOLDS[1]) return 1;
  if (average < BAND_THRESHOLDS[2]) return 2;
  return 3;
}

function findResourceRecommendations(answers) {
  const entries = Object.entries(answers)
    .map(([number, score]) => ({ number: Number(number), score }))
    .sort((a, b) => b.score - a.score);

  const strongSignals = entries.filter(({ score }) => score >= 3);
  const orderedPool = strongSignals.length ? strongSignals.concat(entries.filter(({ score }) => score < 3)) : entries;
  const recMap = new Map();

  for (const { number, score } of orderedPool) {
    const resource = RESOURCE_MAP[number];
    if (!resource) continue;

    if (!recMap.has(resource.title)) {
      recMap.set(resource.title, {
        ...resource,
        triggers: [number],
        score
      });
    } else {
      const existing = recMap.get(resource.title);
      existing.triggers.push(number);
      existing.score = Math.max(existing.score, score);
    }
    if (recMap.size >= 4) break;
  }

  return Array.from(recMap.values()).map((item) => {
    const linkedQuestions = item.triggers
      .map((num) => questions.find((q) => q.number === num))
      .filter(Boolean);

    return { ...item, questions: linkedQuestions };
  });
}

function renderResourceRecommendations(answers) {
  const recommendations = findResourceRecommendations(answers);
  if (!recommendations.length) {
    return "";
  }

  const highAnxiety = Object.values(answers).some((value) => value >= 3);
  const descriptor = highAnxiety ? "items rated Often or Always true" : "your highest-scoring items";

  const itemsMarkup = recommendations
    .map((rec) => {
      const mainQuestion = rec.questions[0];
      const extraCount = rec.questions.length > 1 ? ` + ${rec.questions.length - 1} related item(s)` : "";
      const triggerText = mainQuestion
        ? `Triggered by Q${mainQuestion.number}${extraCount}: ${mainQuestion.text}`
        : "Triggered by your highest-scoring items.";
      const examplesMarkup = rec.examples && rec.examples.length
        ? `
          <div class="resource-extract">
            <p class="extract-label">Sample snippet:</p>
            <ul>
              ${rec.examples
                .slice(0, 2)
                .map((ex) => `<li><strong>${ex.title}:</strong> ${ex.text}</li>`)
                .join("")}
            </ul>
          </div>
        `
        : "";

      return `
        <li class="resource-card">
          <div class="resource-meta">
            <span class="resource-chip">${rec.cluster}</span>
            <span class="resource-chip ghost">${rec.type}</span>
            <span class="resource-chip muted">Score ${rec.score}</span>
          </div>
          <h4>${rec.title}</h4>
          <p class="resource-summary">${rec.summary}</p>
          ${examplesMarkup}
          <p class="resource-trigger">${triggerText}</p>
        </li>
      `;
    })
    .join("");

  return `
    <div class="resource-recs">
      <h3>Resource roadmap</h3>
      <p>Based on ${descriptor}, start with these co-created supports:</p>
      <ol class="resource-list">
        ${itemsMarkup}
      </ol>
    </div>
  `;
}

function renderResults(summary, answers, target) {
  const totalItems = questions.length;
  const grandTotal = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const overallAverage = grandTotal / totalItems;
  const overallBandIndex = determineBand(overallAverage);

  const rows = Object.values(summary)
    .map(
      (entry) => `
        <tr>
          <td>
            <strong>${entry.label}</strong>
            <div class="interpretation">Items ${entry.items.join(", ")}</div>
          </td>
          <td>${entry.total} / ${entry.max}</td>
          <td>${entry.average.toFixed(2)}</td>
          <td><span class="band-chip ${entry.bandClass}">${entry.bandLabel}</span></td>
          <td>${entry.description}</td>
        </tr>
      `
    )
    .join("");

  const recommendations = renderResourceRecommendations(answers);

  target.classList.remove("hidden");
  target.innerHTML = `
    <h2>Your CPAS profile</h2>
    <div class="overall-card">
      <p><strong>Overall mean anxiety: ${overallAverage.toFixed(2)} (${BAND_LABELS[overallBandIndex]})</strong></p>
      <p class="interpretation">Average of all 19 statements (0–4 scale). Use the subscale breakdown below for diagnostic guidance.</p>
    </div>
    <table class="summary-table">
      <thead>
        <tr>
          <th>Subscale</th>
          <th>Total score</th>
          <th>Average per item</th>
          <th>Band</th>
          <th>Interpretation</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p class="interpretation">Band narratives are reproduced and paraphrased from Table&nbsp;1 (Choo &amp; Cheung, 1991). Percentile and logit conversions in the paper should be used when norm-referenced reporting is required.</p>
    ${recommendations}
  `;
}
