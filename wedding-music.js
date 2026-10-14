// Wedding background music — Swades instrumental, first 45 seconds, looping.
// The original invitation's YouTube-music button remains untouched but hidden.
(function () {
  'use strict';

  function initialize() {
    if (document.getElementById('wedding-music-toggle')) return;

    const audio = document.createElement('audio');
    audio.src = './swades-0-45-loop.mp3';
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.22;
    document.body.appendChild(audio);

    const style = document.createElement('style');
    style.textContent = `
      /* Hide only the template's original music button. */
      #musicToggle { display: none !important; }
      #wedding-music-toggle {
        position: fixed;
        right: clamp(14px, 4vw, 26px);
        bottom: clamp(14px, 4vw, 26px);
        z-index: 2147483000;
        width: 50px;
        height: 50px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid #c39a45;
        border-radius: 50%;
        background: #432d28;
        color: #f0dfb3;
        box-shadow: 0 10px 26px rgba(0,0,0,.30);
        cursor: pointer;
        transition: transform .25s, background .25s;
      }
      #wedding-music-toggle:hover { transform: scale(1.06); }
      #wedding-music-toggle:focus-visible {
        outline: 3px solid #c39a45;
        outline-offset: 3px;
      }
      #wedding-music-toggle[aria-pressed="true"] {
        background: #e5cc90;
        color: #35251d;
      }
      #wedding-music-toggle svg { width: 23px; height: 23px; }
      #wedding-music-toggle[aria-pressed="true"] svg {
        animation: weddingNoteSway 2.4s ease-in-out infinite;
      }
      @keyframes weddingNoteSway {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.id = 'wedding-music-toggle';
    button.type = 'button';
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    button.setAttribute('aria-label', 'Play Swades instrumental');
    button.setAttribute('aria-pressed', 'false');
    button.title = 'Swades instrumental';
    document.body.appendChild(button);

    function update() {
      const playing = !audio.paused;
      button.setAttribute('aria-label', playing ? 'Pause Swades instrumental' : 'Play Swades instrumental');
      button.setAttribute('aria-pressed', String(playing));
    }
    function play() {
      if (!audio.paused) return;
      const result = audio.play();
      if (result && typeof result.catch === 'function') result.then(update).catch(update);
    }
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      if (audio.paused) play();
      else audio.pause();
      update();
    });
    audio.addEventListener('play', update);
    audio.addEventListener('pause', update);

    // Browsers generally require the visitor's first gesture to start audio.
    document.addEventListener('pointerdown', function (event) {
      if (!button.contains(event.target)) play();
    }, { once: true, passive: true });
    document.addEventListener('keydown', play, { once: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else initialize();
})();
