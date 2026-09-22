document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-list');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-list a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('is-open')));

  const topButton = document.querySelector('.top-button');
  window.addEventListener('scroll', () => topButton?.classList.toggle('visible', window.scrollY > 500), { passive: true });
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  document.querySelectorAll('[data-counter]').forEach(counter => {
    const target = Number(counter.dataset.counter);
    counter.textContent = String(target);
  });

  const speciesFilter = document.querySelector('#species-filter');
  const environmentFilter = document.querySelector('#environment-filter');
  const typeFilter = document.querySelector('#type-filter');
  const rows = document.querySelectorAll('[data-observation]');
  const filterRows = () => {
    [speciesFilter, environmentFilter, typeFilter].forEach(select => select?.setAttribute('aria-busy', 'true'));
    rows.forEach(row => {
      const match = (!speciesFilter?.value || row.dataset.species === speciesFilter.value) && (!environmentFilter?.value || row.dataset.environment === environmentFilter.value) && (!typeFilter?.value || row.dataset.type === typeFilter.value);
      row.hidden = !match;
    });
    [speciesFilter, environmentFilter, typeFilter].forEach(select => select?.setAttribute('aria-busy', 'false'));
  };
  [speciesFilter, environmentFilter, typeFilter].forEach(select => select?.addEventListener('change', filterRows));

  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  document.querySelectorAll('[data-gallery]').forEach(item => item.addEventListener('click', () => {
    lightboxContent.style.backgroundImage = item.dataset.gallery;
    lightboxContent.querySelector('strong').textContent = item.dataset.caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.querySelector('.lightbox-close').focus();
  }));
  const closeLightbox = () => { lightbox?.classList.remove('is-open'); lightbox?.setAttribute('aria-hidden', 'true'); };
  lightbox?.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('[data-demo-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('[role="status"]');
    status.textContent = 'Message enregistré localement pour la démonstration. Aucun envoi externe n’est effectué.';
    form.reset();
  }));
});
