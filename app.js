(() => {
  const dialog = document.getElementById('capture-dialog');
  let opener;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (!dialog || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      const image = dialog.querySelector('img');
      image.src = link.href;
      image.alt = link.querySelector('img')?.alt || 'Captura del proyecto';
      dialog.querySelector('p').textContent = link.dataset.caption || image.alt;
      dialog.showModal();
    });
  });
  if (dialog) {
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { dialog.querySelector('img').removeAttribute('src'); opener?.focus(); });
  }
  document.querySelectorAll('[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      const player = document.createElement('video');
      player.controls = true;
      player.preload = 'metadata';
      player.playsInline = true;
      player.poster = button.querySelector('img').src;
      player.setAttribute('aria-label', button.dataset.label || 'Recorrido visual del proyecto');
      const source = document.createElement('source');
      source.src = button.dataset.video;
      source.type = 'video/mp4';
      const track = document.createElement('track');
      track.kind = 'captions'; track.src = button.dataset.track;
      track.srclang = 'es'; track.label = 'Descripción en español'; track.default = false;
      player.append(source, track);
      button.replaceWith(player);
      player.focus();
      player.play().catch(() => {});
    }, {once:true});
  });
  document.querySelectorAll('.mobile-nav nav a').forEach(link => {
    link.addEventListener('click', () => { link.closest('details').open = false; });
  });
})();
