/* Shared native UI behavior. Plain scripts also work when opened with file://. */
(() => {
  function scheduleFrame(action) {
    let pending = false;
    return () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; action(); });
    };
  }

  function tabs(list, controls, { orientation = 'horizontal', initial = 0, select } = {}) {
    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-orientation', orientation);
    function activate(index) {
      controls.forEach((control, position) => {
        control.setAttribute('aria-selected', String(position === index));
        control.tabIndex = position === index ? 0 : -1;
      });
      select?.(index);
    }
    controls.forEach((control, index) => {
      control.setAttribute('role', 'tab');
      control.addEventListener('click', event => { event.preventDefault(); activate(index); });
    });
    list.addEventListener('keydown', event => {
      const current = controls.indexOf(document.activeElement);
      if (current < 0) return;
      let next;
      if (event.key === ' ') next = current;
      else if (event.key === 'ArrowRight' || orientation === 'vertical' && event.key === 'ArrowDown') next = (current + 1) % controls.length;
      else if (event.key === 'ArrowLeft' || orientation === 'vertical' && event.key === 'ArrowUp') next = (current + controls.length - 1) % controls.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = controls.length - 1;
      else return;
      event.preventDefault();
      activate(next);
      controls[next].focus();
    });
    activate(initial);
    return { select: activate };
  }
  window.ILMETEO_UI = Object.freeze({ tabs, scheduleFrame });
})();
