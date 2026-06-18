(function () {
  const body = document.body;
  const screens = Array.from(document.querySelectorAll('.screen'));
  const navItems = Array.from(document.querySelectorAll('.nav-item[data-target]'));
  const projectContext = document.getElementById('projectContext');
  const topActions = document.querySelector('.top-actions');
  const roomDrawer = document.getElementById('roomDrawer');
  const drawerScrim = document.getElementById('drawerScrim');
  const params = new URLSearchParams(window.location.search);

  function setScreen(name, updateUrl = false) {
    const target = screens.some((screen) => screen.dataset.screen === name) ? name : 'projects';
    screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === target));
    navItems.forEach((item) => item.classList.toggle('active', item.dataset.target === target));
    projectContext.style.visibility = target === 'projects' ? 'hidden' : 'visible';
    topActions.style.visibility = target === 'projects' ? 'hidden' : 'visible';
    if (updateUrl) {
      const next = new URL(window.location.href);
      next.searchParams.set('screen', target);
      next.searchParams.delete('drawer');
      window.history.replaceState({}, '', next);
    }
  }

  function openDrawer() {
    setScreen('table');
    roomDrawer.classList.add('open');
    drawerScrim.classList.add('open');
    body.classList.add('drawer-open');
  }

  function closeDrawer() {
    roomDrawer.classList.remove('open');
    drawerScrim.classList.remove('open');
    body.classList.remove('drawer-open');
  }

  navItems.forEach((item) => item.addEventListener('click', () => setScreen(item.dataset.target, true)));
  document.querySelectorAll('.project-entry[data-target]').forEach((item) => item.addEventListener('click', () => setScreen(item.dataset.target, true)));
  document.querySelectorAll('[data-open-drawer]').forEach((button) => button.addEventListener('click', openDrawer));
  document.getElementById('openDrawer').addEventListener('click', openDrawer);
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
  document.getElementById('drawerCancel').addEventListener('click', closeDrawer);
  drawerScrim.addEventListener('click', closeDrawer);

  document.querySelectorAll('.group-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const row = button.closest('.group-row');
      row.classList.toggle('collapsed');
      button.textContent = row.classList.contains('collapsed') ? '＋' : '−';
    });
  });

  document.querySelectorAll('.form-section-title').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.form-section');
      section.classList.toggle('open');
      const marker = button.querySelector('i');
      if (marker) marker.textContent = section.classList.contains('open') ? '−' : '＋';
    });
  });

  const tweaksPanel = document.getElementById('tweaksPanel');
  document.getElementById('tweaksToggle').addEventListener('click', () => tweaksPanel.classList.toggle('open'));
  document.getElementById('tweaksClose').addEventListener('click', () => tweaksPanel.classList.remove('open'));
  document.getElementById('densitySelect').addEventListener('change', (event) => { body.dataset.density = event.target.value; });
  document.getElementById('paletteSelect').addEventListener('change', (event) => { body.dataset.palette = event.target.value; });

  const initialScreen = params.get('screen') || 'projects';
  setScreen(initialScreen);
  if (params.get('drawer') === '1') openDrawer();
})();
