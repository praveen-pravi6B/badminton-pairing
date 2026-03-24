// ============================================================
//  BADMINTON PAIRING APP — app.js
//  Logic: shuffle players, pair them, track history to avoid
//  repeating the same pair in back-to-back rounds.
// ============================================================

// --- Default player names (pre-filled for convenience) ---
const DEFAULT_ADVANCED = [
  "Alice", "Bob", "Charlie", "Diana",
  "Ethan", "Fiona", "George", "Hannah"
];

const DEFAULT_INTERMEDIATE = [
  "Ivan", "Julia", "Kevin", "Laura",
  "Mike", "Nina", "Oscar", "Priya"
];

// --- App state ---
let roundNumber = 0;                // Tracks current round count
let lastPairs = [];                 // Stores pairs from the previous round
                                    // Format: [{ advanced: "Alice", intermediate: "Ivan" }, ...]

// ============================================================
//  ON PAGE LOAD — build the input fields dynamically
// ============================================================
window.onload = function () {
  buildInputFields("advanced-inputs", DEFAULT_ADVANCED, "adv");
  buildInputFields("intermediate-inputs", DEFAULT_INTERMEDIATE, "int");
};

/**
 * Creates 8 labeled input fields inside a given container.
 * @param {string} containerId - The id of the div to fill
 * @param {string[]} defaults  - Default player names to pre-fill
 * @param {string} prefix      - Prefix for input ids ("adv" or "int")
 */
function buildInputFields(containerId, defaults, prefix) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear before building

  for (let i = 0; i < 8; i++) {
    const wrap = document.createElement("div");
    wrap.className = "player-input-wrap";

    // Number label (1-8)
    const numLabel = document.createElement("span");
    numLabel.className = "player-number";
    numLabel.textContent = (i + 1) + ".";

    // Text input
    const input = document.createElement("input");
    input.type = "text";
    input.id = `${prefix}-${i}`;
    input.placeholder = `Player ${i + 1}`;
    input.value = defaults[i];          // Pre-fill with default name
    input.maxLength = 30;

    wrap.appendChild(numLabel);
    wrap.appendChild(input);
    container.appendChild(wrap);
  }
}

// ============================================================
//  READ PLAYER NAMES from input fields
// ============================================================

/**
 * Reads all 8 values from input fields with the given prefix.
 * Returns an array of trimmed strings.
 */
function readPlayers(prefix) {
  const players = [];
  for (let i = 0; i < 8; i++) {
    const val = document.getElementById(`${prefix}-${i}`).value.trim();
    players.push(val);
  }
  return players;
}

/**
 * Validates that all 8 names are filled in.
 * Highlights empty fields in red.
 * @returns {boolean} true if valid, false if any field is empty
 */
function validatePlayers(prefix) {
  let valid = true;
  for (let i = 0; i < 8; i++) {
    const input = document.getElementById(`${prefix}-${i}`);
    if (input.value.trim() === "") {
      input.classList.add("error");       // Red border highlight
      valid = false;
    } else {
      input.classList.remove("error");    // Remove red if now filled
    }
  }
  return valid;
}

// ============================================================
//  SHUFFLE ALGORITHM — Fisher-Yates shuffle
// ============================================================

/**
 * Randomly shuffles an array in place.
 * Uses the Fisher-Yates algorithm — true random shuffle.
 * @param {Array} array - Any array to shuffle
 * @returns {Array} The same array, shuffled
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ============================================================
//  PAIRING LOGIC — avoid repeating last round's pairs
// ============================================================

/**
 * Generates 8 pairs by shuffling both player lists.
 * Tries up to 20 times to avoid repeating all 8 pairs from
 * the previous round (consecutive repeat prevention).
 *
 * @param {string[]} advanced      - List of 8 advanced players
 * @param {string[]} intermediate  - List of 8 intermediate players
 * @returns {Object[]} Array of { advanced, intermediate } pair objects
 */
function createPairs(advanced, intermediate) {
  let bestPairs = null;
  let bestOverlapCount = Infinity;  // Fewer overlaps with lastPairs = better

  // Try up to 20 shuffles and pick the one with fewest repeat pairs
  for (let attempt = 0; attempt < 20; attempt++) {
    // Shuffle copies so originals are untouched
    const advShuffled  = shuffle([...advanced]);
    const intShuffled  = shuffle([...intermediate]);

    // Zip them together into pairs
    const pairs = advShuffled.map((player, idx) => ({
      advanced:     player,
      intermediate: intShuffled[idx]
    }));

    // Count how many pairs were also in the previous round
    const overlapCount = countOverlap(pairs, lastPairs);

    if (overlapCount < bestOverlapCount) {
      bestOverlapCount = overlapCount;
      bestPairs = pairs;
    }

    // If zero overlaps found early, stop trying
    if (overlapCount === 0) break;
  }

  return bestPairs;
}

/**
 * Counts how many pairs from `newPairs` also appear in `oldPairs`.
 * A pair matches if both advanced AND intermediate names are the same.
 */
function countOverlap(newPairs, oldPairs) {
  if (oldPairs.length === 0) return 0;

  let count = 0;
  for (const np of newPairs) {
    const matched = oldPairs.some(
      op => op.advanced === np.advanced && op.intermediate === np.intermediate
    );
    if (matched) count++;
  }
  return count;
}

// ============================================================
//  GENERATE PAIRS — called by the "Generate Pairs" button
// ============================================================
function generatePairs() {
  clearError();

  // Validate inputs
  const advValid = validatePlayers("adv");
  const intValid = validatePlayers("int");
  if (!advValid || !intValid) {
    showError("Please fill in all 8 player names before generating pairs.");
    return;
  }

  // Read names
  const advanced     = readPlayers("adv");
  const intermediate = readPlayers("int");

  // Check for duplicate names within a group
  if (hasDuplicates(advanced)) {
    showError("Advanced players list has duplicate names. Please use unique names.");
    return;
  }
  if (hasDuplicates(intermediate)) {
    showError("Intermediate players list has duplicate names. Please use unique names.");
    return;
  }

  // Generate the pairs
  roundNumber++;
  const pairs = createPairs(advanced, intermediate);

  // Save for next round's overlap check
  lastPairs = pairs;

  // Render
  renderPairs(pairs);

  // Enable Reshuffle button now that we have a valid round
  document.getElementById("reshuffle-btn").disabled = false;
}

// ============================================================
//  RESHUFFLE — called by the "Reshuffle" button
// ============================================================
function reshufflePairs() {
  clearError();

  const advValid = validatePlayers("adv");
  const intValid = validatePlayers("int");
  if (!advValid || !intValid) {
    showError("Please fill in all player names first.");
    return;
  }

  const advanced     = readPlayers("adv");
  const intermediate = readPlayers("int");

  // Increment round and regenerate
  roundNumber++;
  const pairs = createPairs(advanced, intermediate);
  lastPairs = pairs;

  renderPairs(pairs);
}

// ============================================================
//  RESET — called by the "Reset" button
// ============================================================
function resetAll() {
  // Clear state
  roundNumber = 0;
  lastPairs   = [];

  // Re-build input fields with defaults
  buildInputFields("advanced-inputs",     DEFAULT_ADVANCED,     "adv");
  buildInputFields("intermediate-inputs", DEFAULT_INTERMEDIATE, "int");

  // Hide results
  document.getElementById("results").classList.add("hidden");
  document.getElementById("round-info").classList.add("hidden");

  // Disable reshuffle
  document.getElementById("reshuffle-btn").disabled = true;

  clearError();
}

// ============================================================
//  RENDER PAIRS — build the UI cards
// ============================================================

/**
 * Renders the pair cards and round info bar into the DOM.
 * @param {Object[]} pairs - Array of { advanced, intermediate }
 */
function renderPairs(pairs) {
  const container = document.getElementById("pairs-container");
  container.innerHTML = ""; // Clear previous

  pairs.forEach((pair, index) => {
    // --- Create card ---
    const card = document.createElement("div");
    card.className = "pair-card";

    // Court badge (e.g., "Court 1")
    const badge = document.createElement("div");
    badge.className = "court-badge";
    badge.innerHTML = `Court<br>${index + 1}`;

    // Names section
    const names = document.createElement("div");
    names.className = "pair-names";

    const advTag = document.createElement("div");
    advTag.className = "player-tag advanced";
    advTag.textContent = `${pair.advanced}`;

    const vsDivider = document.createElement("div");
    vsDivider.className = "vs";
    vsDivider.textContent = "with";

    const intTag = document.createElement("div");
    intTag.className = "player-tag intermediate";
    intTag.textContent = `${pair.intermediate}`;

    names.appendChild(advTag);
    names.appendChild(vsDivider);
    names.appendChild(intTag);

    card.appendChild(badge);
    card.appendChild(names);
    container.appendChild(card);
  });

  // --- Show results section ---
  document.getElementById("results").classList.remove("hidden");

  // --- Show round info bar ---
  const roundInfo = document.getElementById("round-info");
  roundInfo.classList.remove("hidden");
  document.getElementById("round-label").textContent = `Round ${roundNumber}`;

  // Show overlap note if this isn't the first round
  const histNote = document.getElementById("history-note");
  if (roundNumber > 1) {
    histNote.textContent = "Pairs shuffled — avoiding last round repeats where possible.";
  } else {
    histNote.textContent = "First round — fully random!";
  }
}

// ============================================================
//  HELPERS
// ============================================================

/** Shows a red error banner above the pairs area */
function showError(message) {
  // Remove existing error if any
  clearError();

  const el = document.createElement("div");
  el.className = "error-msg";
  el.id = "error-banner";
  el.textContent = message;

  // Insert before the results section
  const results = document.getElementById("results");
  results.parentNode.insertBefore(el, results);
}

/** Removes the error banner if present */
function clearError() {
  const existing = document.getElementById("error-banner");
  if (existing) existing.remove();
}

/** Checks if an array of strings has any duplicate values */
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
