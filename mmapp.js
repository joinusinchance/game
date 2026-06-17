```js
// app.js

/* =========================
   URL + Mode Detection
   ========================= */

const urlParams = new URLSearchParams(window.location.search);
const isFreeplay = urlParams.get("freeplay") === "true";

/* =========================
   Puzzle Data
   ========================= */

const puzzles = [
  {
    id: 1,
    title: "Puzzle 1 – Beginner",
    villagers: ["Miller", "Minstrel", "Squire"],
    maladies: ["Elf‑Shot", "Melancholia", "Swamp Fever"],
    remedies: ["Willow Bark", "Rune Charm", "Bloodletting"],
    clues: [
      "The Minstrel refused bloodletting.",
      "The one with Melancholia needed the willow bark.",
      "The Squire insisted on a magical remedy."
    ],
    solutionLines: [
      "Squire → Elf‑Shot → Rune Charm",
      "Minstrel → Melancholia → Willow Bark",
      "Miller → Swamp Fever → Bloodletting"
    ]
  },
  {
    id: 2,
    title: "Puzzle 2 – Beginner",
    villagers: ["Cooper", "Alewife", "Chandler"],
    maladies: ["Miasma Cough", "Humour Imbalance", "King’s Evil"],
    remedies: ["Garlic Poultice", "Pilgrimage", "Honey‑Vinegar Tonic"],
    clues: [
      "The Alewife would not leave town for any remedy.",
      "The one with King’s Evil needed a pilgrimage.",
      "The Cooper’s ailment required something strongly scented."
    ],
    solutionLines: [
      "Cooper → Miasma Cough → Garlic Poultice",
      "Alewife → Humour Imbalance → Honey‑Vinegar Tonic",
      "Chandler → King’s Evil → Pilgrimage"
    ]
  },
  {
    id: 3,
    title: "Puzzle 3 – Beginner",
    villagers: ["Baker", "Shepherd", "Minstrel"],
    maladies: ["St. Anthony’s Fire", "Melancholia", "Leech‑Fatigue"],
    remedies: ["Fresh Leeches", "Lavender Sachet", "Goose‑Fat Poultice"],
    clues: [
      "The Baker refused any remedy involving animals.",
      "The one with St. Anthony’s Fire needed the goose‑fat poultice.",
      "The Shepherd was not suffering from Leech‑Fatigue."
    ],
    solutionLines: [
      "Baker → Melancholia → Lavender Sachet",
      "Shepherd → Leech‑Fatigue → Fresh Leeches",
      "Minstrel → St. Anthony’s Fire → Goose‑Fat Poultice"
    ]
  },
  {
    id: 4,
    title: "Puzzle 4 – Intermediate",
    villagers: ["Knight", "Miller", "Apothecary’s Apprentice"],
    maladies: ["Elf‑Shot", "Swamp Fever", "Black Bile Excess"],
    remedies: ["Bloodletting", "Willow Bark", "Protective Charm"],
    clues: [
      "The Knight refused charms as “unmanly nonsense.”",
      "The one with Swamp Fever needed willow bark.",
      "The Apprentice was not suffering from Elf‑Shot."
    ],
    solutionLines: [
      "Miller → Swamp Fever → Willow Bark",
      "Knight → Black Bile Excess → Bloodletting",
      "Apothecary’s Apprentice → Elf‑Shot → Protective Charm"
    ]
  },
  {
    id: 5,
    title: "Puzzle 5 – Intermediate",
    villagers: ["Alewife", "Fletcher", "Squire"],
    maladies: ["Miasma Cough", "Melancholia", "King’s Evil"],
    remedies: ["Pilgrimage", "Honey‑Vinegar Tonic", "Garlic Poultice"],
    clues: [
      "The Squire refused anything smelly.",
      "The one with King’s Evil needed a pilgrimage.",
      "The Alewife was not melancholic."
    ],
    solutionLines: [
      "Fletcher → King’s Evil → Pilgrimage",
      "Squire → Melancholia → Honey‑Vinegar Tonic",
      "Alewife → Miasma Cough → Garlic Poultice"
    ]
  },
  {
    id: 6,
    title: "Puzzle 6 – Intermediate/Hard",
    villagers: ["Blacksmith", "Minstrel", "Miller"],
    maladies: ["St. Anthony’s Fire", "Elf‑Shot", "Humour Imbalance"],
    remedies: ["Rune Charm", "Goose‑Fat Poultice", "Bloodletting"],
    clues: [
      "The Minstrel claimed invisible arrows struck him.",
      "The one needing bloodletting did not have St. Anthony’s Fire.",
      "The Blacksmith refused charms."
    ],
    solutionLines: [
      "Minstrel → Elf‑Shot → Rune Charm",
      "Blacksmith → Humour Imbalance → Bloodletting",
      "Miller → St. Anthony’s Fire → Goose‑Fat Poultice"
    ]
  },
  {
    id: 7,
    title: "Puzzle 7 – Hard",
    villagers: ["Chandler", "Shepherd", "Knight"],
    maladies: ["Melancholia", "Miasma Cough", "Leech‑Fatigue"],
    remedies: ["Fresh Leeches", "Lavender Sachet", "Honey‑Vinegar Tonic"],
    clues: [
      "The Knight refused leeches after last time’s “incident.”",
      "The one with Miasma Cough needed something aromatic.",
      "The Shepherd was not melancholic."
    ],
    solutionLines: [
      "Chandler → Miasma Cough → Lavender Sachet",
      "Shepherd → Leech‑Fatigue → Fresh Leeches",
      "Knight → Melancholia → Honey‑Vinegar Tonic"
    ]
  },
  {
    id: 8,
    title: "Puzzle 8 – Hard",
    villagers: ["Miller", "Alewife", "Fletcher", "Minstrel"],
    maladies: ["Elf‑Shot", "Black Bile Excess", "Swamp Fever", "King’s Evil"],
    remedies: ["Pilgrimage", "Willow Bark", "Rune Charm", "Bloodletting"],
    clues: [
      "The Minstrel refused bloodletting.",
      "The one with Swamp Fever needed willow bark.",
      "The Alewife was not suffering from King’s Evil.",
      "The Fletcher insisted on a magical remedy."
    ],
    solutionLines: [
      "Fletcher → Elf‑Shot → Rune Charm",
      "Miller → Swamp Fever → Willow Bark",
      "Minstrel → King’s Evil → Pilgrimage",
      "Alewife → Black Bile Excess → Bloodletting"
    ]
  },
  {
    id: 9,
    title: "Puzzle 9 – Very Hard",
    villagers: ["Knight", "Cooper", "Chandler", "Shepherd"],
    maladies: ["Melancholia", "Miasma Cough", "St. Anthony’s Fire", "Humour Imbalance"],
    remedies: ["Lavender Sachet", "Garlic Poultice", "Goose‑Fat Poultice", "Bloodletting"],
    clues: [
      "The Knight refused anything involving goose fat.",
      "The one with St. Anthony’s Fire needed the goose‑fat poultice.",
      "The Cooper’s ailment required a strongly scented remedy.",
      "The Shepherd was not melancholic."
    ],
    solutionLines: [
      "Chandler → St. Anthony’s Fire → Goose‑Fat Poultice",
      "Cooper → Miasma Cough → Garlic Poultice",
      "Shepherd → Humour Imbalance → Bloodletting",
      "Knight → Melancholia → Lavender Sachet"
    ]
  },
  {
    id: 10,
    title: "Puzzle 10 – Expert",
    villagers: ["Alewife", "Miller", "Minstrel", "Knight", "Apothecary’s Apprentice"],
    maladies: ["Elf‑Shot", "Black Bile Excess", "Swamp Fever", "King’s Evil", "Melancholia"],
    remedies: ["Pilgrimage", "Willow Bark", "Rune Charm", "Bloodletting", "Honey‑Vinegar Tonic"],
    clues: [
      "The Knight refused charms and pilgrimages.",
      "The Minstrel insisted his ailment was caused by invisible arrows.",
      "The one with Swamp Fever needed willow bark.",
      "The Alewife refused bloodletting.",
      "The Apprentice was not suffering from King’s Evil."
    ],
    solutionLines: [
      "Minstrel → Elf‑Shot → Rune Charm",
      "Miller → Swamp Fever → Willow Bark",
      "Knight → Black Bile Excess → Bloodletting",
      "Alewife → Melancholia → Honey‑Vinegar Tonic",
      "Apothecary’s Apprentice → King’s Evil → Pilgrimage"
    ]
  }
];

/* =========================
   Daily Puzzle Logic
   ========================= */

function getTodayPuzzleId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const numeric = y * 10000 + m * 100 + d;
  return (numeric % puzzles.length) + 1;
}

/* =========================
   DOM References
   ========================= */

const puzzleSelect = document.getElementById("puzzleSelect");
const puzzleSelectorContainer = document.getElementById("puzzleSelectorContainer");
const dailyBanner = document.getElementById("dailyBanner");

const villagersList = document.getElementById("villagersList");
const maladiesList = document.getElementById("maladiesList");
const remediesList = document.getElementById("remediesList");
const cluesList = document.getElementById("cluesList");

const gridVM = document.getElementById("gridVM");
const gridVR = document.getElementById("gridVR");
const gridMR = document.getElementById("gridMR");

const resetGridBtn = document.getElementById("resetGridBtn");
const showSolutionBtn = document.getElementById("showSolutionBtn");
const solutionBox = document.getElementById("solutionBox");

const darkModeToggle = document.getElementById("darkModeToggle");
const dailyButton = document.getElementById("dailyButton");
const freeplayButton = document.getElementById("freeplayButton");

const completionModal = document.getElementById("completionModal");
const completionMessage = document.getElementById("completionMessage");
const nextPuzzleBtn = document.getElementById("nextPuzzleBtn");
const shareBtn = document.getElementById("shareBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

/* =========================
   State
   ========================= */

let currentPuzzleId = 1;
let showSolution = false;
let currentMode = isFreeplay ? "freeplay" : "daily"; // "daily" or "freeplay"

/* =========================
   LocalStorage Helpers
   ========================= */

const STORAGE_KEY = "medieval_logic_puzzles";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function getSavedForPuzzle(mode, puzzleId) {
  const state = loadState() || {};
  const key = `${mode}_${puzzleId}`;
  return state[key] || null;
}

function setSavedForPuzzle(mode, puzzleId, data) {
  const state = loadState() || {};
  const key = `${mode}_${puzzleId}`;
  state[key] = data;
  saveState(state);
}

function saveDarkModePreference(isDark) {
  const state = loadState() || {};
  state.darkMode = isDark ? true : false;
  saveState(state);
}

function loadDarkModePreference() {
  const state = loadState() || {};
  return !!state.darkMode;
}

/* =========================
   Dark Mode
   ========================= */

function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀ Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
  saveDarkModePreference(isDark);
}

/* =========================
   UI Builders
   ========================= */

function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function buildList(listEl, items) {
  clearElement(listEl);
  items.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    listEl.appendChild(li);
  });
}

function buildClues(listEl, clues) {
  clearElement(listEl);
  clues.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    listEl.appendChild(li);
  });
}

function buildGrid(tableEl, rows, cols) {
  clearElement(tableEl);
  const theadRow = document.createElement("tr");
  const corner = document.createElement("th");
  corner.textContent = "";
  theadRow.appendChild(corner);
  cols.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c;
    theadRow.appendChild(th);
  });
  tableEl.appendChild(theadRow);

  rows.forEach(r => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = r;
    tr.appendChild(th);
    cols.forEach(() => {
      const td = document.createElement("td");
      td.classList.add("cell");
      td.dataset.state = "";
      td.addEventListener("click", () => onCellClick(td, tableEl));
      tr.appendChild(td);
    });
    tableEl.appendChild(tr);
  });
}

/* =========================
   Grid Interaction + Contradictions
   ========================= */

function onCellClick(td, tableEl) {
  if (isPuzzleLocked()) return;

  const state = td.dataset.state || "";
  if (state === "") {
    td.dataset.state = "tick";
    td.textContent = "✓";
    td.classList.add("tick");
    td.classList.remove("cross");
  } else if (state === "tick") {
    td.dataset.state = "cross";
    td.textContent = "✗";
    td.classList.add("cross");
    td.classList.remove("tick");
  } else {
    td.dataset.state = "";
    td.textContent = "";
    td.classList.remove("tick", "cross", "contradiction");
  }

  checkContradictions();
  checkCompletion();
  saveCurrentGridState();
}

function clearGrids() {
  [gridVM, gridVR, gridMR].forEach(table => {
    const cells = table.querySelectorAll("td.cell");
    cells.forEach(td => {
      td.dataset.state = "";
      td.textContent = "";
      td.classList.remove("tick", "cross", "contradiction");
    });
  });
  saveCurrentGridState();
}

function getGridStates() {
  function extract(table) {
    const rows = [];
    const trs = table.querySelectorAll("tr");
    for (let i = 1; i < trs.length; i++) {
      const tds = trs[i].querySelectorAll("td.cell");
      const row = [];
      tds.forEach(td => row.push(td.dataset.state || ""));
      rows.push(row);
    }
    return rows;
  }
  return {
    vm: extract(gridVM),
    vr: extract(gridVR),
    mr: extract(gridMR)
  };
}

function applyGridStates(states) {
  function apply(table, data) {
    const trs = table.querySelectorAll("tr");
    for (let i = 1; i < trs.length; i++) {
      const tds = trs[i].querySelectorAll("td.cell");
      for (let j = 0; j < tds.length; j++) {
        const td = tds[j];
        const state = (data[i - 1] && data[i - 1][j]) || "";
        td.dataset.state = state;
        td.textContent = state === "tick" ? "✓" : state === "cross" ? "✗" : "";
        td.classList.remove("tick", "cross", "contradiction");
        if (state === "tick") td.classList.add("tick");
        if (state === "cross") td.classList.add("cross");
      }
    }
  }
  if (!states) return;
  apply(gridVM, states.vm || []);
  apply(gridVR, states.vr || []);
  apply(gridMR, states.mr || []);
}

function saveCurrentGridState() {
  const data = {
    grid: getGridStates(),
    solved: isPuzzleSolved()
  };
  setSavedForPuzzle(currentMode, currentPuzzleId, data);
}

/* Contradiction rules:
   - More than one tick in a row or column
*/

function checkContradictions() {
  [gridVM, gridVR, gridMR].forEach(table => {
    const trs = table.querySelectorAll("tr");
    // clear previous contradictions
    table.querySelectorAll("td.cell").forEach(td => td.classList.remove("contradiction"));

    // rows
    for (let i = 1; i < trs.length; i++) {
      const tds = trs[i].querySelectorAll("td.cell");
      const ticks = [];
      tds.forEach((td, idx) => {
        if (td.dataset.state === "tick") ticks.push(td);
      });
      if (ticks.length > 1) {
        ticks.forEach(td => td.classList.add("contradiction"));
      }
    }

    // columns
    const headerRow = trs[0];
    const colCount = headerRow.querySelectorAll("th").length - 1;
    for (let col = 0; col < colCount; col++) {
      const ticks = [];
      for (let row = 1; row < trs.length; row++) {
        const td = trs[row].querySelectorAll("td.cell")[col];
        if (td && td.dataset.state === "tick") ticks.push(td);
      }
      if (ticks.length > 1) {
        ticks.forEach(td => td.classList.add("contradiction"));
      }
    }
  });
}

/* =========================
   Completion Checking
   ========================= */

function isPuzzleSolved() {
  // For now, "solved" means: no contradictions and at least one tick in each row of VM and VR
  const tables = [gridVM, gridVR];
  for (const table of tables) {
    const trs = table.querySelectorAll("tr");
    for (let i = 1; i < trs.length; i++) {
      const tds = trs[i].querySelectorAll("td.cell");
      let hasTick = false;
      let hasContradiction = false;
      tds.forEach(td => {
        if (td.dataset.state === "tick") hasTick = true;
        if (td.classList.contains("contradiction")) hasContradiction = true;
      });
      if (!hasTick || hasContradiction) return false;
    }
  }
  return true;
}

function isPuzzleLocked() {
  const saved = getSavedForPuzzle(currentMode, currentPuzzleId);
  return saved && saved.solved && currentMode === "daily";
}

function checkCompletion() {
  if (!isPuzzleSolved()) return;
  showCompletionModal();
}

/* =========================
   Completion Modal
   ========================= */

function showCompletionModal() {
  completionModal.classList.remove("hidden");

  const puzzle = puzzles.find(p => p.id === currentPuzzleId);
  const modeText = currentMode === "daily" ? "today’s daily puzzle" : `Puzzle ${puzzle.id} – ${puzzle.title}`;
  completionMessage.textContent = `You have successfully solved ${modeText}.`;

  // Save solved state
  const saved = getSavedForPuzzle(currentMode, currentPuzzleId) || {};
  saved.solved = true;
  saved.grid = getGridStates();
  setSavedForPuzzle(currentMode, currentPuzzleId, saved);

  // Next puzzle only in freeplay
  nextPuzzleBtn.disabled = currentMode !== "freeplay";

  // Daily banner if daily mode
  if (currentMode === "daily") {
    dailyBanner.classList.remove("hidden");
    dailyBanner.textContent = "You’ve completed today’s puzzle. Come back tomorrow for a new one!";
  }
}

function hideCompletionModal() {
  completionModal.classList.add("hidden");
}

/* =========================
   Share Result
   ========================= */

async function shareResult() {
  const puzzle = puzzles.find(p => p.id === currentPuzzleId);
  const text = `I solved "${puzzle.title}" in the Medieval Logic Grid Puzzles game!`;

  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch {
      // ignore
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    } catch {
      alert("Could not copy to clipboard.");
    }
  } else {
    alert(text);
  }
}

/* =========================
   Puzzle Loading
   ========================= */

function populatePuzzleSelect() {
  clearElement(puzzleSelect);
  puzzles.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.id}. ${p.title}`;
    puzzleSelect.appendChild(opt);
  });
}

function loadPuzzle(id) {
  const puzzle = puzzles.find(p => p.id === Number(id));
  if (!puzzle) return;

  currentPuzzleId = puzzle.id;
  showSolution = false;
  solutionBox.classList.add("hidden");
  showSolutionBtn.textContent = "Show Solution";

  buildList(villagersList, puzzle.villagers);
  buildList(maladiesList, puzzle.maladies);
  buildList(remediesList, puzzle.remedies);
  buildClues(cluesList, puzzle.clues);

  buildGrid(gridVM, puzzle.villagers, puzzle.maladies);
  buildGrid(gridVR, puzzle.villagers, puzzle.remedies);
  buildGrid(gridMR, puzzle.maladies, puzzle.remedies);

  solutionBox.textContent = puzzle.solutionLines.join("\n");

  // Load saved grid state if any
  const saved = getSavedForPuzzle(currentMode, currentPuzzleId);
  if (saved && saved.grid) {
    applyGridStates(saved.grid);
    checkContradictions();
  } else {
    clearGrids();
  }

  // Daily banner text
  if (currentMode === "daily") {
    const todayId = getTodayPuzzleId();
    dailyBanner.classList.remove("hidden");
    dailyBanner.textContent = `Today’s puzzle is #${todayId}: ${puzzle.title}.`;
  } else {
    dailyBanner.classList.add("hidden");
  }
}

/* =========================
   Mode Switching
   ========================= */

function setMode(mode) {
  currentMode = mode;

  if (mode === "daily") {
    puzzleSelectorContainer.classList.add("hidden");
    freeplayButton.classList.add("hidden");
    dailyButton.disabled = true;

    const todayId = getTodayPuzzleId();
    loadPuzzle(todayId);
  } else {
    puzzleSelectorContainer.classList.remove("hidden");
    freeplayButton.classList.remove("hidden");
    dailyButton.disabled = false;

    populatePuzzleSelect();
    puzzleSelect.value = currentPuzzleId.toString();
    loadPuzzle(currentPuzzleId);
  }
}

/* =========================
   Event Listeners
   ========================= */

puzzleSelect.addEventListener("change", () => {
  if (currentMode !== "freeplay") return;
  loadPuzzle(puzzleSelect.value);
});

resetGridBtn.addEventListener("click", () => {
  if (isPuzzleLocked()) return;
  clearGrids();
});

showSolutionBtn.addEventListener("click", () => {
  showSolution = !showSolution;
  solutionBox.classList.toggle("hidden", !showSolution);
  showSolutionBtn.textContent = showSolution ? "Hide Solution" : "Show Solution";
});

darkModeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  applyDarkMode(isDark);
});

dailyButton.addEventListener("click", () => {
  setMode("daily");
});

freeplayButton.addEventListener("click", () => {
  if (!isFreeplay) {
    alert("Freeplay mode is disabled. Add ?freeplay=true to the URL to enable it.");
    return;
  }
  setMode("freeplay");
});

nextPuzzleBtn.addEventListener("click", () => {
  if (currentMode !== "freeplay") return;
  const idx = puzzles.findIndex(p => p.id === currentPuzzleId);
  const nextIdx = (idx + 1) % puzzles.length;
  const nextId = puzzles[nextIdx].id;
  puzzleSelect.value = nextId.toString();
  loadPuzzle(nextId);
  hideCompletionModal();
});

shareBtn.addEventListener("click", () => {
  shareResult();
});

closeModalBtn.addEventListener("click", () => {
  hideCompletionModal();
});

/* =========================
   Init
   ========================= */

(function init() {
  // Dark mode
  applyDarkMode(loadDarkModePreference());

  // Mode
  if (isFreeplay) {
    freeplayButton.classList.remove("hidden");
    setMode("freeplay");
  } else {
    freeplayButton.classList.add("hidden");
    setMode("daily");
  }
})();
