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
  `;
}
