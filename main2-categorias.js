
/* ==========================================
   DI MALLU — LÓGICA DAS PÁGINAS DE CATEGORIA
   ========================================== */

(function () {
  'use strict';


  /* ==========================================
     SELETORES GLOBAIS
     ========================================== */

  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navItems  = document.querySelectorAll('.nav-item');


  /* ==========================================
     MENU PRINCIPAL
     ========================================== */

  // EFEITO DE SCROLL — FUNDO AO DESCER
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // HAMBURGUER — ABRE/FECHA MENU E VOLTA AO TOPO AO ABRIR
  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) window.scrollTo({ top: 0, behavior: 'instant' });
  });

  // FECHA AO CLICAR EM UM ITEM
  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // FECHA AO CLICAR NO OVERLAY
  navLinks.addEventListener('click', function (e) {
    if (e.target === navLinks) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });

  // WHATSAPP — NÚMERO E MENSAGEM AUTOMÁTICA
  const WHATS_NUMERO = '5551999943011';
  const WHATS_MSG = 'Olá, tudo bem? \n\nVi o site da Di Mallu e amei as peças! \n\nGostaria de ver mais modelos de semijoias.';
  const WHATS_URL    = `https://wa.me/${WHATS_NUMERO}?text=${encodeURIComponent(WHATS_MSG)}`;

  const navWpp = document.querySelector('.nav-wpp');
  if (navWpp) navWpp.setAttribute('href', WHATS_URL);


  /* ==========================================
     ABAS — SOME AO SCROLLAR, VOLTA AO TOPO
     ========================================== */

  const categoriasNav = document.querySelector('.categorias-nav');

  if (categoriasNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY <= 0) {
        categoriasNav.classList.remove('oculta');
      } else {
        categoriasNav.classList.add('oculta');
      }
    }, { passive: true });
  }


  /* ==========================================
     REVEAL — APARECE GRADATIVAMENTE AO SCROLL
     ========================================== */

  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('in'); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }


})();