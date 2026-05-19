
/* ==========================================
   DI MALLU — LÓGICA DO SITE
   ========================================== */

(function () {
  'use strict';


  /* ==========================================
     SELETORES GLOBAIS
     ========================================== */

  const intro     = document.getElementById('intro');
  const video     = document.getElementById('intro-video');
  const main      = document.getElementById('main-content');
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navItems  = document.querySelectorAll('.nav-item');
  const divisorEl = document.getElementById('divisor-sessao');


  /* ==========================================
     INTRO — ANIMAÇÃO DA MARCA
     ========================================== */

  let revealed = false;
  let fallbackTimer;

  // GARANTE QUE O REVEAL SÓ EXECUTA UMA VEZ
  function revealMain() {
    if (revealed) return;
    revealed = true;

    clearTimeout(fallbackTimer);

    intro.classList.add('fade-out');
    main.classList.add('visible');
    document.body.style.overflow = '';

    // SCROLL IMEDIATO — SEM ANIMAÇÃO
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(function () {
      initReveal();
      initDivisor();
    }, 300);
  }

  // BLOQUEIA SCROLL ENQUANTO O INTRO TOCA
  document.body.style.overflow = 'hidden';

  // PULA O INTRO SE VIER DE OUTRA PÁGINA
  if (document.referrer && !document.referrer.includes('index1-principal.html')) {
    intro.style.display = 'none';
    main.classList.add('visible');
    document.body.style.overflow = '';
    revealed = true;
    setTimeout(function () {
      document.getElementById('hero').scrollIntoView({ behavior: 'instant' });
      initReveal();
      initDivisor();
    }, 50);
  } else {
    video.addEventListener('ended', revealMain);
    video.addEventListener('error', revealMain);
    video.addEventListener('canplay', function () {
      if (video.paused && !video.autoplay) revealMain();
    });
    const VIDEO_DURATION_MS = 8000;
    fallbackTimer = setTimeout(revealMain, VIDEO_DURATION_MS);
  }

  
  /* ==========================================
     REVEAL — APARECE GRADATIVAMENTE AO SCROLL
     ========================================== */

  function initReveal() {
    const elements = document.querySelectorAll('.reveal');

    // FALLBACK PARA BROWSERS SEM INTERSECTIONOBSERVER
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target); // OBSERVA SÓ UMA VEZ
        }
      });
    }, {
      threshold: 0.08,                  // DISPARA CEDO — MELHOR PARA MOBILE
      rootMargin: '0px 0px -20px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }


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

    if (isOpen) window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const WHATS_MSG    = 'Olá! Vim pelo site da Di Mallu e gostaria de conhecer as peças.';
  const WHATS_URL    = `https://wa.me/${WHATS_NUMERO}?text=${encodeURIComponent(WHATS_MSG)}`;

  const navWpp = document.querySelector('.nav-wpp');
  if (navWpp) navWpp.setAttribute('href', WHATS_URL);


  /* ==========================================
     SESSÃO 1 — HERO
     ========================================== */

  // DIVISOR — ANIMA AS LINHAS AO ENTRAR NA VIEWPORT
  function initDivisor() {
    if (!divisorEl || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          divisorEl.classList.add('animado');
          observer.unobserve(divisorEl);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

    observer.observe(divisorEl);
  }


  /* ==========================================
     SESSÃO 2 — FRASE & FOTO
     ========================================== */

  // SLIDESHOW KEN BURNS — TROCA A CADA 4S
  function initSlideshow() {
    const slides = document.querySelectorAll('#slideshow .slide');
    if (!slides.length) return;

    let atual = 0;

    setInterval(function () {
      slides[atual].classList.remove('ativo');
      atual = (atual + 1) % slides.length;
      slides[atual].classList.add('ativo');
    }, 4000);
  }

  initSlideshow();


  /* ==========================================
     SESSÃO 3 — HISTÓRIA DA MARCA
     ========================================== */

  // SLIDESHOW LATERAL — LOOP INFINITO COM CLONES
  function initHistoria() {
    const track = document.getElementById('historiaTrack');
    const dots  = document.querySelectorAll('.historia-dot');
    if (!track) return;

    const total     = 3;
    let atual       = 0;
    let bloqueado   = false;

    // CLONA OS SLIDES PARA CRIAR EFEITO DE LOOP
    Array.from(track.children).forEach(function (s) {
      track.appendChild(s.cloneNode(true));
    });

    // AJUSTA LARGURA DO TRACK PARA 6 SLIDES (3 ORIGINAIS + 3 CLONES)
    track.style.width = '600%';
    track.querySelectorAll('.historia-slide').forEach(function (s) {
      s.style.width = '16.666%';
    });

    function irPara(idx, animado) {
      track.style.transition = animado === false
        ? 'none'
        : 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)';

      track.style.transform = `translateX(-${idx * 100 / 6}%)`;

      dots.forEach(function (d) { d.classList.remove('on'); });
      dots[idx % total].classList.add('on');
      atual = idx;
    }

    // AO CHEGAR NO CLONE, SALTA SEM ANIMAÇÃO PARA O ORIGINAL
    track.addEventListener('transitionend', function () {
      if (atual >= total) irPara(atual - total, false);
      bloqueado = false;
    });

    // CLIQUE NOS DOTS
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        if (!bloqueado) irPara(i);
      });
    });

    // AUTOPLAY
    setInterval(function () {
      if (bloqueado) return;
      bloqueado = true;
      irPara(atual + 1);
    }, 5000);

    irPara(0, false);
  }

  initHistoria();


  /* ==========================================
     SESSÃO 4 — PRODUTOS
     ========================================== */

  // MARQUEE — POPULA O TRACK COM ITENS DUPLICADOS
  const marqueeItens = [
    'Enviamos para todo o Brasil',
    'Peças exclusivas e limitadas',
    'Atendimento via WhatsApp',
    'Sua compra 100% segura e protegida',
    'Banho premium de alta durabilidade',
    'Tecnologia antialérgica',
    'Garantia',
  ];

  const marqueeTrack = document.getElementById('marqueeTrack');
  [...marqueeItens, ...marqueeItens].forEach(function (texto) {
    const item = document.createElement('span');
    item.className = 'marquee-item';
    item.innerHTML = `<span>${texto}</span><img src="./ARQUIVOS/simbolo-logo.png" alt="" aria-hidden="true" class="marquee-logo">`;
    marqueeTrack.appendChild(item);
  });

  // CARRINHO — ADICIONA / REMOVE PRODUTO E ATUALIZA BADGE
  let carrinho          = [];
  const btnCarrinho     = document.getElementById('btnVerCarrinho');
  const badge           = document.getElementById('carrinhoBadge');

  function atualizarBadge() {
    badge.textContent = carrinho.length;
  }

  document.querySelectorAll('.produto-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const adicionado = btn.dataset.adicionado === 'true';

      if (!adicionado) {
        carrinho.push({
          nome:  btn.getAttribute('data-nome'),
          preco: btn.getAttribute('data-preco'),
          btn:   btn,
        });
        btn.dataset.adicionado = 'true';
        btn.textContent        = '✓ 1';
        btn.style.background   = '#C9A96E';
        btn.style.color        = '#2C2215';
      } else {
        carrinho = carrinho.filter(function (p) { return p.btn !== btn; });
        btn.dataset.adicionado = 'false';
        btn.textContent        = '+ Adicionar';
        btn.style.background   = '';
        btn.style.color        = '';
      }

      atualizarBadge();
    });
  });

  btnCarrinho.addEventListener('click', function () {
    this.classList.toggle('ativo');
  });


  /* ==========================================
     SESSÃO 5 — CTA FINAL
     ========================================== */

  // BOTÃO WHATSAPP
  const ctaWpp = document.getElementById('ctaWpp');
  if (ctaWpp) {
    ctaWpp.setAttribute('href', WHATS_URL);
    ctaWpp.addEventListener('click', function () {
      window.open(WHATS_URL, '_blank');
    });
  }


})();