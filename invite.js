(() => {
  const modal = document.getElementById('inviteModal');
  const openButton = document.getElementById('openInvite');
  const closeButton = document.getElementById('closeInvite');
  if (!modal || !openButton || !closeButton) return;
  openButton.addEventListener('click', () => { modal.showModal(); });
  closeButton.addEventListener('click', () => { modal.close(); });
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) modal.close();
  });
})();
