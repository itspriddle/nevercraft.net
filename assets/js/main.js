// Parallax with smooth easing
(function() {
  const layers = [
    { selector: '.stars', factor: 15 },
    { selector: '.laser-1', factor: 40, rotate: -15 },
    { selector: '.laser-2', factor: 50, rotate: 12 },
    { selector: '.laser-3', factor: 30, rotate: 8 },
    { selector: '.laser-4', factor: 45, rotate: -5 },
    { selector: '.horizon', factor: 10 },
    { selector: '.grid-wrap', factor: 20 },
    { selector: '.page-header', factor: 30 },
    { selector: '.nav-links', factor: 25 },
  ];

  let els = [];
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const ease = 0.08;

  function init() {
    els = layers.map(l => {
      const el = document.querySelector(l.selector);
      return el ? { el, factor: l.factor, rotate: l.rotate || 0 } : null;
    }).filter(Boolean);

    animate();
  }

  function animate() {
    // Smooth lerp toward target
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    els.forEach(({ el, factor, rotate }) => {
      const x = currentX * factor * 0.5;
      const y = currentY * factor * 0.3;
      if (rotate) {
        el.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + rotate + 'deg)';
      } else {
        el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      }
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', function(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
