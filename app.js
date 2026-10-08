/**
 * MOD & DIV in Programming - Interactive Application Engine
 * Demonstrates Integer Division (DIV //) and Modulo Remainder (MOD %)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation tabs setup
  initNavigation();

  // Header concept hint toggle
  initHeaderHint();

  // Initialize all 5 programs
  initProgram1();
  initProgram2();
  initProgram3();
  initProgram4();
  initProgram5();
});

// ============================================================================
// Hint Toggle System
// ============================================================================
function initHeaderHint() {
  const btn = document.getElementById('header-hint-toggle');
  const panel = document.getElementById('header-concept-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const isHidden = panel.classList.contains('hidden');
    if (isHidden) {
      panel.classList.remove('hidden');
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      panel.classList.add('hidden');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Global function to toggle program calculation hints
 */
window.toggleHint = function(button) {
  const container = button.closest('.hint-accordion');
  if (!container) return;
  const body = container.querySelector('.hint-body');
  const label = button.querySelector('.hint-btn-text');
  const isHidden = body.classList.contains('hidden');
  const hintType = button.getAttribute('data-hint-type') || 'How DIV & MOD Work';

  if (isHidden) {
    body.classList.remove('hidden');
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = `Hide Hint: ${hintType}`;
  } else {
    body.classList.add('hidden');
    button.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = `Show Hint: ${hintType}`;
  }
};

/**
 * Helper to construct the hint accordion HTML wrapper
 */
function renderHintAccordion(hintType, mathBreakdownHTML, isOpen = false) {
  return `
    <div class="hint-accordion">
      <button 
        type="button" 
        class="btn-hint ${isOpen ? 'active' : ''}" 
        aria-expanded="${isOpen ? 'true' : 'false'}" 
        data-hint-type="${hintType}"
        onclick="toggleHint(this)"
      >
        <span class="hint-btn-label">
          <span class="hint-icon">💡</span>
          <span class="hint-btn-text">${isOpen ? `Hide Hint: ${hintType}` : `Show Hint: ${hintType}`}</span>
        </span>
        <span class="hint-chevron">▼</span>
      </button>
      <div class="hint-body ${isOpen ? '' : 'hidden'}">
        ${mathBreakdownHTML}
      </div>
    </div>
  `;
}

// ============================================================================
// Navigation Management
// ============================================================================
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const views = document.querySelectorAll('.program-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-program');

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update views
      views.forEach(v => {
        v.classList.remove('active');
      });
      const activeView = document.getElementById(`view-${targetId}`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });
}

// ============================================================================
// Program 1: Even or Odd Number (MOD %)
// ============================================================================
function initProgram1() {
  const inputNum = document.getElementById('p1-number');
  const submitBtn = document.getElementById('p1-submit');
  const resetBtn = document.getElementById('p1-reset');
  const resultBox = document.getElementById('p1-result');

  function calculate() {
    const val = inputNum.value.trim();
    if (val === '') {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Error</div>
          <div class="banner-headline">Please enter a number</div>
          <div class="banner-sub">Enter any whole number to determine if it is even or odd.</div>
        </div>
      `;
      return;
    }

    const num = parseInt(val, 10);
    if (isNaN(num)) {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Invalid Input</div>
          <div class="banner-headline">Whole numbers only</div>
          <div class="banner-sub">Please enter a valid integer without decimal points.</div>
        </div>
      `;
      return;
    }

    // Preserve hint expansion state if user re-runs calculation
    const wasHintOpen = resultBox.querySelector('.btn-hint.active') !== null;

    // In programming: num % 2
    // If num % 2 === 0, it's even, otherwise odd
    const remainder = Math.abs(num % 2);
    const isEven = remainder === 0;

    const mathBreakdownHTML = `
      <div class="math-breakdown">
        <div class="math-title">How MOD (%) Solved This</div>
        <div class="math-steps">
          <div class="math-step-row step-row-mod">
            <span class="step-formula">${num} % 2 = ${remainder}</span>
            <span class="step-meaning">Modulo operator calculates remainder after division by 2</span>
          </div>
          <div class="math-step-row">
            <span class="step-formula">Condition: remainder === 0</span>
            <span class="step-meaning">${isEven ? 'True &rarr; Divides evenly, number is Even' : 'False &rarr; Remainder is 1, number is Odd'}</span>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = `
      <div class="result-banner ${isEven ? 'even' : 'odd'}">
        <div class="banner-label">Classification Result</div>
        <div class="banner-headline">${num} is ${isEven ? 'EVEN' : 'ODD'}</div>
        <div class="banner-sub">
          ${isEven 
            ? 'Divisible by 2 with no remainder left over.' 
            : 'Leaves a remainder of 1 when divided by 2.'}
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Input Number</span>
          <span class="stat-value">${num}</span>
          <span class="stat-note">Evaluated value</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Divisor</span>
          <span class="stat-value">2</span>
          <span class="stat-note">Testing parity</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">MOD Result (Remainder)</span>
          <span class="stat-value highlight-mod">${remainder}</span>
          <span class="stat-note">${remainder === 0 ? 'Zero remainder = Even' : 'Remainder 1 = Odd'}</span>
        </div>
      </div>

      ${renderHintAccordion('How MOD (%) Works', mathBreakdownHTML, wasHintOpen)}
    `;
  }

  submitBtn.addEventListener('click', calculate);
  inputNum.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
  });

  resetBtn.addEventListener('click', () => {
    inputNum.value = '';
    resultBox.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔢</div>
        <p>Enter a whole number and click <strong>Check Even or Odd</strong></p>
      </div>
    `;
    inputNum.focus();
  });

  // Presets
  document.querySelectorAll('.preset-btn[data-target="p1"]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputNum.value = btn.getAttribute('data-val');
      calculate();
    });
  });

  // Initial run (hint closed by default)
  calculate();
}

// ============================================================================
// Program 2: Sharing Sweets (DIV // & MOD %)
// ============================================================================
function initProgram2() {
  const inputSweets = document.getElementById('p2-sweets');
  const inputStudents = document.getElementById('p2-students');
  const submitBtn = document.getElementById('p2-submit');
  const resetBtn = document.getElementById('p2-reset');
  const resultBox = document.getElementById('p2-result');

  function calculate() {
    const sweetsVal = inputSweets.value.trim();
    const studentsVal = inputStudents.value.trim();

    if (sweetsVal === '' || studentsVal === '') {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Missing Input</div>
          <div class="banner-headline">Enter sweets and students</div>
          <div class="banner-sub">Both fields are required to calculate sharing.</div>
        </div>
      `;
      return;
    }

    const sweets = parseInt(sweetsVal, 10);
    const students = parseInt(studentsVal, 10);

    if (isNaN(sweets) || isNaN(students) || sweets < 0 || students <= 0) {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Invalid Values</div>
          <div class="banner-headline">Please check numbers</div>
          <div class="banner-sub">Sweets must be 0 or more, and students must be at least 1 (cannot divide by zero).</div>
        </div>
      `;
      return;
    }

    const wasHintOpen = resultBox.querySelector('.btn-hint.active') !== null;

    // DIV: Sweets per student (Integer quotient)
    const perStudent = Math.floor(sweets / students);
    // MOD: Remaining sweets
    const leftover = sweets % students;
    const totalShared = perStudent * students;

    // Build visual sample cards of students (up to 6 previews)
    const previewCount = Math.min(students, 6);
    let studentPreviewHTML = '';
    for (let i = 1; i <= previewCount; i++) {
      studentPreviewHTML += `
        <div class="student-card">
          <div class="student-icon">🎓</div>
          <div class="student-title">Student ${i}</div>
          <div class="student-sweet-count">${perStudent} 🍬</div>
        </div>
      `;
    }
    if (students > 6) {
      studentPreviewHTML += `
        <div class="student-card">
          <div class="student-icon">👥</div>
          <div class="student-title">+ ${students - 6} more</div>
          <div class="student-sweet-count">${perStudent} 🍬 each</div>
        </div>
      `;
    }

    const mathBreakdownHTML = `
      <div class="math-breakdown">
        <div class="math-title">How DIV and MOD Work Together</div>
        <div class="math-steps">
          <div class="math-step-row step-row-div">
            <span class="step-formula">DIV (//): ${sweets} // ${students} = ${perStudent}</span>
            <span class="step-meaning">Whole number quotient: sweets per student</span>
          </div>
          <div class="math-step-row step-row-mod">
            <span class="step-formula">MOD (%): ${sweets} % ${students} = ${leftover}</span>
            <span class="step-meaning">Remainder: sweets left over after fair sharing</span>
          </div>
          <div class="math-step-row">
            <span class="step-formula">Verification: (${perStudent} &times; ${students}) + ${leftover} = ${sweets}</span>
            <span class="step-meaning">(Quotient &times; Divisor) + Remainder = Total Sweets</span>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = `
      <div class="result-banner primary">
        <div class="banner-label">Sharing Solution</div>
        <div class="banner-headline">${perStudent} sweet${perStudent === 1 ? '' : 's'} per student</div>
        <div class="banner-sub">
          ${leftover} sweet${leftover === 1 ? '' : 's'} remain left over for the teacher.
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Each Student Receives (DIV)</span>
          <span class="stat-value highlight-div">${perStudent}</span>
          <span class="stat-note">${sweets} // ${students}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Remaining Sweets (MOD)</span>
          <span class="stat-value highlight-mod">${leftover}</span>
          <span class="stat-note">${sweets} % ${students}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Shared</span>
          <span class="stat-value">${totalShared}</span>
          <span class="stat-note">${perStudent} &times; ${students} students</span>
        </div>
      </div>

      <div class="sweets-visual">
        <div class="math-title">Distribution Overview (${students} students total)</div>
        <div class="students-container">
          ${studentPreviewHTML}
        </div>
        <div class="leftover-box">
          <span>Teacher's Remainder Tray:</span>
          <strong>${leftover} sweet${leftover === 1 ? '' : 's'} remaining 🍬</strong>
        </div>
      </div>

      ${renderHintAccordion('How DIV & MOD Work', mathBreakdownHTML, wasHintOpen)}
    `;
  }

  submitBtn.addEventListener('click', calculate);
  inputSweets.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculate(); });
  inputStudents.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculate(); });

  resetBtn.addEventListener('click', () => {
    inputSweets.value = '25';
    inputStudents.value = '4';
    calculate();
  });

  // Presets
  document.querySelectorAll('.preset-btn[data-target="p2"]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputSweets.value = btn.getAttribute('data-sweets');
      inputStudents.value = btn.getAttribute('data-students');
      calculate();
    });
  });

  // Initial run (hint closed by default)
  calculate();
}

// ============================================================================
// Program 3: Car Park Charges (DIV // & MOD %)
// ============================================================================
function initProgram3() {
  const inputMinutes = document.getElementById('p3-minutes');
  const submitBtn = document.getElementById('p3-submit');
  const resetBtn = document.getElementById('p3-reset');
  const resultBox = document.getElementById('p3-result');

  function calculate() {
    const val = inputMinutes.value.trim();
    if (val === '') {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Missing Input</div>
          <div class="banner-headline">Enter parking minutes</div>
          <div class="banner-sub">Please enter how many minutes the vehicle was parked.</div>
        </div>
      `;
      return;
    }

    const minutes = parseInt(val, 10);
    if (isNaN(minutes) || minutes < 0) {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Invalid Duration</div>
          <div class="banner-headline">Please enter a valid time</div>
          <div class="banner-sub">Parking minutes must be 0 or a positive whole number.</div>
        </div>
      `;
      return;
    }

    const wasHintOpen = resultBox.querySelector('.btn-hint.active') !== null;

    // Rules:
    // Rate: £2 per hour or part of an hour
    // 0 minutes = £0
    // 1-60 minutes = £2 (1 hour)
    // 61-120 minutes = £4 (2 hours)
    // Extra part of hour charged as full hour
    let fullHours = 0;
    let extraMinutes = 0;
    let chargeableHours = 0;
    let totalCharge = 0;

    if (minutes > 0) {
      fullHours = Math.floor(minutes / 60); // DIV
      extraMinutes = minutes % 60;          // MOD
      chargeableHours = fullHours + (extraMinutes > 0 ? 1 : 0);
      totalCharge = chargeableHours * 2;
    }

    const mathBreakdownHTML = `
      <div class="math-breakdown">
        <div class="math-title">How DIV &amp; MOD Applied The Parking Rules</div>
        <div class="math-steps">
          <div class="math-step-row step-row-div">
            <span class="step-formula">DIV (//): ${minutes} // 60 = ${fullHours} full hour${fullHours === 1 ? '' : 's'}</span>
            <span class="step-meaning">Integer division isolates completed 60-minute blocks</span>
          </div>
          <div class="math-step-row step-row-mod">
            <span class="step-formula">MOD (%): ${minutes} % 60 = ${extraMinutes} extra minute${extraMinutes === 1 ? '' : 's'}</span>
            <span class="step-meaning">Modulo reveals leftover minutes exceeding whole hours</span>
          </div>
          <div class="math-step-row">
            <span class="step-formula">Rule Check: ${extraMinutes > 0 ? `${extraMinutes} mins > 0 &rarr; adds 1 full chargeable hour` : '0 remainder &rarr; no extra hour'}</span>
            <span class="step-meaning">${chargeableHours} hours &times; &pound;2.00 = &pound;${totalCharge.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = `
      <div class="result-banner primary">
        <div class="banner-label">Parking Fee Due</div>
        <div class="banner-headline">&pound;${totalCharge.toFixed(2)}</div>
        <div class="banner-sub">
          ${minutes === 0 
            ? '0 minutes parked. No fee charged.' 
            : `Billed for ${chargeableHours} hour${chargeableHours === 1 ? '' : 's'} at &pound;2.00 per hour or part thereof.`}
        </div>
      </div>

      <div class="parking-ticket">
        <div class="ticket-header">
          <span class="ticket-title">Car Park Receipt</span>
          <span class="ticket-rate">Rate: &pound;2.00 / started hour</span>
        </div>
        <div class="ticket-row">
          <span>Total Time Parked:</span>
          <strong>${minutes} minute${minutes === 1 ? '' : 's'} (${fullHours}h ${extraMinutes}m)</strong>
        </div>
        <div class="ticket-row">
          <span>Full 60-Minute Hours (DIV):</span>
          <span>${fullHours} hour${fullHours === 1 ? '' : 's'}</span>
        </div>
        <div class="ticket-row">
          <span>Remainder Minutes (MOD):</span>
          <span>${extraMinutes} minute${extraMinutes === 1 ? '' : 's'} ${extraMinutes > 0 ? '(rounds up to +1 hr)' : '(no extra hour)'}</span>
        </div>
        <div class="ticket-row">
          <span>Total Billed Hours:</span>
          <strong>${chargeableHours} hour${chargeableHours === 1 ? '' : 's'}</strong>
        </div>
        <div class="ticket-row total-row">
          <span>Total Payable:</span>
          <span class="ticket-total-price">&pound;${totalCharge.toFixed(2)}</span>
        </div>
      </div>

      ${renderHintAccordion('How DIV & MOD Work', mathBreakdownHTML, wasHintOpen)}
    `;
  }

  submitBtn.addEventListener('click', calculate);
  inputMinutes.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculate(); });

  resetBtn.addEventListener('click', () => {
    inputMinutes.value = '';
    resultBox.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🅿️</div>
        <p>Enter parking minutes and click <strong>Calculate Charge</strong></p>
      </div>
    `;
    inputMinutes.focus();
  });

  // Presets
  document.querySelectorAll('.preset-btn[data-target="p3"]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputMinutes.value = btn.getAttribute('data-val');
      calculate();
    });
  });

  // Initial run (hint closed by default)
  calculate();
}

// ============================================================================
// Program 4: ATM Cash Dispenser (DIV // & MOD %)
// ============================================================================
function initProgram4() {
  const inputAmount = document.getElementById('p4-amount');
  const submitBtn = document.getElementById('p4-submit');
  const resetBtn = document.getElementById('p4-reset');
  const resultBox = document.getElementById('p4-result');

  function calculate() {
    const val = inputAmount.value.trim();
    if (val === '') {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Missing Amount</div>
          <div class="banner-headline">Enter withdrawal amount</div>
          <div class="banner-sub">Please enter the cash amount you would like to withdraw.</div>
        </div>
      `;
      return;
    }

    const amount = parseInt(val, 10);
    if (isNaN(amount) || amount <= 0) {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Invalid Amount</div>
          <div class="banner-headline">Positive amount required</div>
          <div class="banner-sub">Please enter a valid amount greater than &pound;0.</div>
        </div>
      `;
      return;
    }

    // Check if divisible by £5 (the smallest available denomination)
    if (amount % 5 !== 0) {
      const lowerMultiple = Math.floor(amount / 5) * 5;
      const upperMultiple = lowerMultiple + 5;
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">ATM Denomination Error</div>
          <div class="banner-headline">Cannot dispense &pound;${amount}</div>
          <div class="banner-sub">
            This ATM only dispenses &pound;20, &pound;10, and &pound;5 notes.<br>
            Please select a multiple of &pound;5, such as <strong>&pound;${lowerMultiple}</strong> or <strong>&pound;${upperMultiple}</strong>.
          </div>
        </div>
      `;
      return;
    }

    const wasHintOpen = resultBox.querySelector('.btn-hint.active') !== null;

    // Greedy banknote dispensing using DIV and MOD
    // Step 1: £20 notes
    const notes20 = Math.floor(amount / 20);
    const remAfter20 = amount % 20;

    // Step 2: £10 notes from remaining
    const notes10 = Math.floor(remAfter20 / 10);
    const remAfter10 = remAfter20 % 10;

    // Step 3: £5 notes from remaining
    const notes5 = Math.floor(remAfter10 / 5);
    const finalRem = remAfter10 % 5;

    const totalNotes = notes20 + notes10 + notes5;

    const mathBreakdownHTML = `
      <div class="math-breakdown">
        <div class="math-title">Step-by-Step DIV and MOD Cascade</div>
        <div class="math-steps">
          <div class="math-step-row step-row-div">
            <span class="step-formula">Step 1: ${amount} // 20 = ${notes20} (&pound;20 notes)</span>
            <span class="step-meaning">Remainder: ${amount} % 20 = &pound;${remAfter20} left</span>
          </div>
          <div class="math-step-row step-row-mod">
            <span class="step-formula">Step 2: ${remAfter20} // 10 = ${notes10} (&pound;10 notes)</span>
            <span class="step-meaning">Remainder: ${remAfter20} % 10 = &pound;${remAfter10} left</span>
          </div>
          <div class="math-step-row step-row-div">
            <span class="step-formula">Step 3: ${remAfter10} // 5 = ${notes5} (&pound;5 notes)</span>
            <span class="step-meaning">Remainder: ${remAfter10} % 5 = &pound;${finalRem} (dispense complete)</span>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = `
      <div class="result-banner primary">
        <div class="banner-label">Transaction Complete</div>
        <div class="banner-headline">Dispensing &pound;${amount} (${totalNotes} note${totalNotes === 1 ? '' : 's'})</div>
        <div class="banner-sub">
          Optimal distribution using largest available notes first.
        </div>
      </div>

      <div class="atm-notes-grid">
        <div class="note-card note-20">
          <span class="note-denom">&pound;20 Note</span>
          <span class="note-count-badge">${notes20}</span>
          <span class="note-subtotal">&pound;${notes20 * 20} total</span>
        </div>

        <div class="note-card note-10">
          <span class="note-denom">&pound;10 Note</span>
          <span class="note-count-badge">${notes10}</span>
          <span class="note-subtotal">&pound;${notes10 * 10} total</span>
        </div>

        <div class="note-card note-5">
          <span class="note-denom">&pound;5 Note</span>
          <span class="note-count-badge">${notes5}</span>
          <span class="note-subtotal">&pound;${notes5 * 5} total</span>
        </div>
      </div>

      ${renderHintAccordion('How DIV & MOD Work', mathBreakdownHTML, wasHintOpen)}
    `;
  }

  submitBtn.addEventListener('click', calculate);
  inputAmount.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculate(); });

  resetBtn.addEventListener('click', () => {
    inputAmount.value = '';
    resultBox.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏧</div>
        <p>Enter a withdrawal amount and click <strong>Dispense Cash</strong></p>
      </div>
    `;
    inputAmount.focus();
  });

  // Presets
  document.querySelectorAll('.preset-btn[data-target="p4"]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputAmount.value = btn.getAttribute('data-val');
      calculate();
    });
  });

  // Initial run (hint closed by default)
  calculate();
}

// ============================================================================
// Program 5: Time Converter (DIV // & MOD %)
// ============================================================================
function initProgram5() {
  const inputSeconds = document.getElementById('p5-seconds');
  const submitBtn = document.getElementById('p5-submit');
  const resetBtn = document.getElementById('p5-reset');
  const resultBox = document.getElementById('p5-result');

  function calculate() {
    const val = inputSeconds.value.trim();
    if (val === '') {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Missing Input</div>
          <div class="banner-headline">Enter workout duration</div>
          <div class="banner-sub">Please enter the total number of seconds recorded.</div>
        </div>
      `;
      return;
    }

    const totalSeconds = parseInt(val, 10);
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      resultBox.innerHTML = `
        <div class="result-banner error">
          <div class="banner-label">Invalid Seconds</div>
          <div class="banner-headline">Enter positive number</div>
          <div class="banner-sub">Seconds must be 0 or a positive whole number.</div>
        </div>
      `;
      return;
    }

    const wasHintOpen = resultBox.querySelector('.btn-hint.active') !== null;

    // 1 hour = 3600 seconds
    // 1 minute = 60 seconds
    const hours = Math.floor(totalSeconds / 3600);
    const remAfterHours = totalSeconds % 3600;

    const minutes = Math.floor(remAfterHours / 60);
    const seconds = remAfterHours % 60;

    // Pad numbers for digital clock format
    const pad = (n) => String(n).padStart(2, '0');

    const mathBreakdownHTML = `
      <div class="math-breakdown">
        <div class="math-title">How DIV (//) &amp; MOD (%) Converted The Time</div>
        <div class="math-steps">
          <div class="math-step-row step-row-div">
            <span class="step-formula">DIV (//): ${totalSeconds} // 3600 = ${hours} hour${hours === 1 ? '' : 's'}</span>
            <span class="step-meaning">Calculates whole hours (3600s in an hour)</span>
          </div>
          <div class="math-step-row step-row-mod">
            <span class="step-formula">MOD (%): ${totalSeconds} % 3600 = ${remAfterHours} seconds remaining</span>
            <span class="step-meaning">Isolates seconds left over after whole hours</span>
          </div>
          <div class="math-step-row step-row-div">
            <span class="step-formula">DIV (//): ${remAfterHours} // 60 = ${minutes} minute${minutes === 1 ? '' : 's'}</span>
            <span class="step-meaning">Calculates whole minutes from remaining seconds</span>
          </div>
          <div class="math-step-row step-row-mod">
            <span class="step-formula">MOD (%): ${remAfterHours} % 60 = ${seconds} second${seconds === 1 ? '' : 's'}</span>
            <span class="step-meaning">Final remainder gives exact seconds</span>
          </div>
        </div>
      </div>
    `;

    resultBox.innerHTML = `
      <div class="time-display-board">
        <div class="time-unit-box">
          <span class="time-number">${pad(hours)}</span>
          <span class="time-unit-name">Hours</span>
        </div>
        <span class="time-separator">:</span>
        <div class="time-unit-box">
          <span class="time-number">${pad(minutes)}</span>
          <span class="time-unit-name">Minutes</span>
        </div>
        <span class="time-separator">:</span>
        <div class="time-unit-box">
          <span class="time-number">${pad(seconds)}</span>
          <span class="time-unit-name">Seconds</span>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Hours (DIV)</span>
          <span class="stat-value highlight-div">${hours}h</span>
          <span class="stat-note">${totalSeconds} // 3600</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Minutes (DIV)</span>
          <span class="stat-value highlight-div">${minutes}m</span>
          <span class="stat-note">${remAfterHours} // 60</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Seconds (MOD)</span>
          <span class="stat-value highlight-mod">${seconds}s</span>
          <span class="stat-note">${remAfterHours} % 60</span>
        </div>
      </div>

      ${renderHintAccordion('How DIV & MOD Work', mathBreakdownHTML, wasHintOpen)}
    `;
  }

  submitBtn.addEventListener('click', calculate);
  inputSeconds.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculate(); });

  resetBtn.addEventListener('click', () => {
    inputSeconds.value = '';
    resultBox.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⏱️</div>
        <p>Enter workout seconds and click <strong>Convert Time</strong></p>
      </div>
    `;
    inputSeconds.focus();
  });

  // Presets
  document.querySelectorAll('.preset-btn[data-target="p5"]').forEach(btn => {
    btn.addEventListener('click', () => {
      inputSeconds.value = btn.getAttribute('data-val');
      calculate();
    });
  });

  // Initial run (hint closed by default)
  calculate();
}
