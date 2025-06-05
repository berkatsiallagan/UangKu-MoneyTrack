// security.js

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, etc.
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
    return false;
  }
});

// Optional: prevent some devtools from auto-opening on some browsers (basic)
(function () {
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function () {
      throw new Error('DevTools detection');
    }
  });
  setInterval(() => {
    console.log(element);
    console.clear();
  }, 1000);
})();
