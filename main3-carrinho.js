/* ==========================================
   DI MALLU — CARRINHO COMPARTILHADO
   ========================================== */

(function () {
  'use strict';

  const CHAVE = 'dimallu_carrinho';


  /* ==========================================
     FUNÇÕES BASE
     ========================================== */

  function lerCarrinho() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch (e) {
      return [];
    }
  }

  function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE, JSON.stringify(carrinho));
  }

  function adicionarProduto(nome, preco) {
    const carrinho = lerCarrinho();
    const jaExiste = carrinho.find(function (p) { return p.nome === nome; });
    if (!jaExiste) {
      carrinho.push({ nome: nome, preco: preco });
      salvarCarrinho(carrinho);
    }
    atualizarBadges();
  }

  function removerProduto(nome) {
    const carrinho = lerCarrinho().filter(function (p) { return p.nome !== nome; });
    salvarCarrinho(carrinho);
    atualizarBadges();
  }

  function limparCarrinho() {
    localStorage.removeItem(CHAVE);
    atualizarBadges();
  }


  /* ==========================================
     BADGE — ATUALIZA TODOS OS BOTÕES DA PÁGINA
     ========================================== */

  function atualizarBadges() {
    const total = lerCarrinho().length;
    document.querySelectorAll('.btn-carrinho-badge').forEach(function (badge) {
      badge.textContent = total;
    });
  }


  /* ==========================================
     BOTÕES + ADICIONAR — GUARD CONTRA DUPLO REGISTRO
     ========================================== */

  function iniciarBotoesProduto() {
    const carrinho = lerCarrinho();

    document.querySelectorAll('.produto-btn').forEach(function (btn) {

      // EVITA REGISTRAR O MESMO BOTÃO DUAS VEZES
      if (btn.dataset.carrinhoIniciado === 'true') return;
      btn.dataset.carrinhoIniciado = 'true';

      const nome  = btn.getAttribute('data-nome');
      const preco = btn.getAttribute('data-preco');

      // MARCA OS JÁ ADICIONADOS AO CARREGAR A PÁGINA
      const jaAdicionado = carrinho.find(function (p) { return p.nome === nome; });
      if (jaAdicionado) {
        btn.dataset.adicionado = 'true';
        btn.textContent        = '✓ 1';
        btn.style.background   = '#C9A96E';
        btn.style.color        = '#2C2215';
      }

      btn.addEventListener('click', function () {
        const adicionado = btn.dataset.adicionado === 'true';

        if (!adicionado) {
          adicionarProduto(nome, preco);
          btn.dataset.adicionado = 'true';
          btn.textContent        = '✓ 1';
          btn.style.background   = '#C9A96E';
          btn.style.color        = '#2C2215';
        } else {
          removerProduto(nome);
          btn.dataset.adicionado = 'false';
          btn.textContent        = '+ Adicionar';
          btn.style.background   = '';
          btn.style.color        = '';
        }
      });
    });
  }


  /* ==========================================
     BOTÃO VER CARRINHO — ABRE A PÁGINA
     ========================================== */

  function iniciarBtnVerCarrinho() {
    const btn = document.getElementById('btnVerCarrinho');
    if (!btn || btn.dataset.carrinhoIniciado === 'true') return;
    btn.dataset.carrinhoIniciado = 'true';

    btn.addEventListener('click', function () {
      window.location.href = 'index8-carrinho.html';
    });
  }


  /* ==========================================
     INIT
     ========================================== */

  function init() {
    iniciarBotoesProduto();
    iniciarBtnVerCarrinho();
    atualizarBadges();
  }

  // INIT NORMAL — PÁGINAS DE CATEGORIA (SEM INTRO)
  document.addEventListener('DOMContentLoaded', init);

  // EXPÕE FUNÇÕES GLOBAIS
  window.CarrinhoDiMallu = {
    lerCarrinho:    lerCarrinho,
    removerProduto: removerProduto,
    limparCarrinho: limparCarrinho,
    init:           init, // CHAMADO PELO main1-principal.js APÓS O REVEAL
  };

})();