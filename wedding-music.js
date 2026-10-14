// Wedding background music: first 45 seconds of Swades, looped.
(function () {
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
      #wedding-music-toggle {
        position: fixed; bottom: 18px; right: 18px; z-index: 2147483000;
        border: 1px solid #d4b98a; border-radius: 32px;
        background: rgba(255,249,239,.95); color: #765127;
        font: 600 13px Georgia, serif; padding: 12px 16px;
        box-shadow: 0 5px 22px rgba(0,0,0,.18); cursor: pointer;
      }
      #wedding-music-toggle:focus-visible { outline: 3px solid #9b713f; outline-offset: 3px; }
    `;
    document.head.appendChild(style);
    const button = document.createElement('button');
    button.id = 'wedding-music-toggle';
    button.type = 'button';
    button.textContent = '♪ Play music';
    button.setAttribute('aria-label', 'Play background music');
    document.body.appendChild(button);

    const update = () => {
      const playing = !audio.paused;
      button.textContent = playing ? '♫ Pause music' : '♪ Play music';
      button.setAttribute('aria-pressed', String(playing));
    };
    const play = () => { if (audio.paused) audio.play().then(update).catch(update); };
    button.addEventListener('click', event => {
      event.stopPropagation();
      if (audio.paused) play(); else audio.pause();
      update();
    });
    audio.addEventListener('play', update);
    audio.addEventListener('pause', update);
    // Mobile browsers require a guest gesture before starting sound.
    document.addEventListener('pointerdown', event => {
      if (!button.contains(event.target)) play();
    }, { once: true, passive: true });
    document.addEventListener('keydown', play, { once: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
