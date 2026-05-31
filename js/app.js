/**
 * -------------------------------------------------------------
 * Premium Personal Marriage Profile Website - Engine
 * Designed by Creative Director & Frontend Architect
 * -------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentSection: 0,
    totalSections: 0,
    isTransitioning: false,
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
    swipeThreshold: 50 // Minimum swipe distance in pixels
  };

  // DOM Elements
  const sections = document.querySelectorAll('.section');
  const totalSectionsCount = sections.length;
  state.totalSections = totalSectionsCount;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const currentNumEl = document.getElementById('current-num');
  const totalNumEl = document.getElementById('total-num');
  const dotsContainer = document.getElementById('progress-dots-container');
  const preloader = document.getElementById('preloader');
  const downloadBtn = document.getElementById('download-biodata-btn');

  // Initialize Page Numbers
  if (totalNumEl) {
    totalNumEl.textContent = formatPageNumber(totalSectionsCount);
  }

  // Generate Navigation Dots Dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSectionsCount; i++) {
      const dot = document.createElement('button');
      dot.className = `progress-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to Page ${i + 1}`);
      dot.setAttribute('id', `nav-dot-${i}`);
      dot.addEventListener('click', () => {
        if (state.currentSection !== i) {
          navigateToSection(i);
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Preloader Timeout Simulation for Smooth Luxury Reveal
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      setTimeout(() => {
        preloader.style.display = 'none';
        // Auto activate first section on load
        updateActiveStates();
      }, 1000);
    }
  }, 1800);

  // Core Section Navigation Function
  function navigateToSection(index) {
    if (state.isTransitioning) return;
    if (index < 0 || index >= state.totalSections) return;

    state.isTransitioning = true;
    
    // Set inactive/fade-out
    sections[state.currentSection].classList.remove('active');
    
    // Set target section active
    state.currentSection = index;
    sections[state.currentSection].classList.add('active');

    // Update Dots & Numbers
    updateActiveStates();

    // Reset Transition Lock
    setTimeout(() => {
      state.isTransitioning = false;
    }, 1200); // Equal to CSS transition speed
  }

  // Update UI Elements and Control Classes
  function updateActiveStates() {
    // Section active classes managing
    sections.forEach((sec, idx) => {
      if (idx === state.currentSection) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Update progress dots status
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, idx) => {
      if (idx === state.currentSection) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Numbers formatted
    if (currentNumEl) {
      currentNumEl.textContent = formatPageNumber(state.currentSection + 1);
    }

    // Prev/Next Button Disabling Bounds
    if (prevBtn) {
      prevBtn.disabled = (state.currentSection === 0);
    }
    if (nextBtn) {
      nextBtn.disabled = (state.currentSection === state.totalSections - 1);
    }
  }

  // Format integer to e.g. "01"
  function formatPageNumber(num) {
    return num.toString().padStart(2, '0');
  }

  // Event Listeners for Nav Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentSection > 0) {
        navigateToSection(state.currentSection - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.currentSection < state.totalSections - 1) {
        navigateToSection(state.currentSection + 1);
      }
    });
  }

  // Keyboard Navigation Handling (Arrow keys)
  document.addEventListener('keydown', (e) => {
    if (state.isTransitioning) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      if (state.currentSection < state.totalSections - 1) {
        navigateToSection(state.currentSection + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (state.currentSection > 0) {
        navigateToSection(state.currentSection - 1);
      }
    } else if (e.key === 'Home') {
      navigateToSection(0);
    } else if (e.key === 'End') {
      navigateToSection(state.totalSections - 1);
    }
  });

  // Touch Gesture Swipings
  document.addEventListener('touchstart', (e) => {
    state.touchStartX = e.changedTouches[0].screenX;
    state.touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    state.touchEndX = e.changedTouches[0].screenX;
    state.touchEndY = e.changedTouches[0].screenY;
    handleSwipeGestures();
  }, { passive: true });

// function handleSwipeGestures() {
//   const diffX = state.touchEndX - state.touchStartX;
//   const diffY = state.touchEndY - state.touchStartY;

//   // Only respond to horizontal swipes
//   if (
//     Math.abs(diffX) > state.swipeThreshold &&
//     Math.abs(diffX) > Math.abs(diffY)
//   ) {
//     if (diffX < 0) {
//       // Swipe Left -> Next Section
//       if (state.currentSection < state.totalSections - 1) {
//         navigateToSection(state.currentSection + 1);
//       }
//     } else {
//       // Swipe Right -> Previous Section
//       if (state.currentSection > 0) {
//         navigateToSection(state.currentSection - 1);
//       }
//     }
//   }
// }

  // Print & Download Biodata Handler using elegant Native Print Interface
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Brief aesthetic alert feedback or direct print trigger
      // Note browser print command respects custom print CSS formatting
      window.print();
    });
  }
});
