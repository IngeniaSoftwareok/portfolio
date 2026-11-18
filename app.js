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
  document.querySelectorAll('[data-video]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const player = document.createElement('video');
      player.controls = true;
      player.preload = 'metadata';
      player.playsInline = true;
      player.poster = trigger.querySelector('img').src;
      player.setAttribute('aria-label', trigger.dataset.label || 'Video del proyecto');
      const source = document.createElement('source');
      source.src = trigger.dataset.video;
      source.type = 'video/mp4';
      const track = document.createElement('track');
      track.kind = 'captions'; track.src = trigger.dataset.track;
      track.srclang = 'es'; track.label = 'Español'; track.default = false;
      let errorShown = false;
      const showError = () => {
        if (errorShown) return;
        errorShown = true;
        const message = document.createElement('p');
        message.className = 'video-error';
        message.setAttribute('role', 'status');
        message.append('No se pudo cargar el video. ');
        const link = document.createElement('a');
        link.href = source.src;
        link.textContent = 'Abrir el archivo MP4';
        message.append(link);
        player.after(message);
      };
      source.addEventListener('error', showError, {once:true});
      player.addEventListener('error', showError, {once:true});
      player.append(source, track);
      trigger.replaceWith(player);
      player.focus();
      player.play().catch(() => {});
    });
  });
  document.querySelectorAll('.mobile-nav nav a').forEach(link => {
    link.addEventListener('click', () => { link.closest('details').open = false; });
  });
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav?.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileNav.open) {
      mobileNav.open = false;
      mobileNav.querySelector('summary').focus();
    }
  });
})();
