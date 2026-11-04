// Pega os elementos da página
const textoLocal = document.getElementById('local');
const titulo = document.getElementById('titulo');
const texto = document.getElementById('texto');
const opcoes = document.getElementById('opcoes');
const mudanca = document.getElementById('mudanca');
const cartaoCena = document.getElementById('cena');
const agua = document.getElementById('agua');

const ICONES = { bateria: '🔋', dinheiro: '💰', paciencia: '😤' };

// Guarda o estado da partida
let barras;
let decisoes;

function comecar() {
  barras = { bateria: 60, dinheiro: 50, paciencia: 60 };
  decisoes = 0;
  mudanca.textContent = '';
  atualizarBarras();
  mostrarCena('saida');
}

// Coloca os valores das barras na tela e sobe a água conforme as decisões
function atualizarBarras() {
  for (const nome in barras) {
    document.getElementById(nome).value = barras[nome];
  }
  agua.style.height = decisoes * 12 + '%';
}

// Coloca os textos na tela e apaga os botões da cena anterior
function mostrarTextos(local, novoTitulo, novoTexto) {
  textoLocal.textContent = local;
  titulo.textContent = novoTitulo;
  texto.textContent = novoTexto;
  opcoes.innerHTML = '';
}

// Cria um botão e diz o que acontece quando ele é clicado
function criarBotao(rotulo, aoClicar) {
  const botao = document.createElement('button');
  botao.className = 'opcao';
  botao.textContent = rotulo;
  botao.addEventListener('click', aoClicar);
  opcoes.appendChild(botao);
}

function mostrarCena(id) {
  const cena = CENAS[id];
  mostrarTextos(cena.local, cena.titulo, cena.texto);
  cartaoCena.classList.remove('ruim');
  cena.opcoes.forEach((opcao) => criarBotao(opcao.texto, () => escolher(opcao)));
}

// Aplica o efeito da escolha e decide o que vem depois
function escolher(opcao) {
  const avisos = [];

  for (const nome in opcao.efeito) {
    const valor = opcao.efeito[nome];
    barras[nome] = Math.min(100, Math.max(0, barras[nome] + valor)); // mantém entre 0 e 100
    avisos.push(ICONES[nome] + ' ' + (valor > 0 ? '+' : '') + valor);
  }

  decisoes++;
  mudanca.textContent = avisos.join('   ');
  atualizarBarras();

  // Se alguma barra zerou, o jogo acaba na hora
  if (barras.bateria === 0) {
    mostrarFinal('semBateria');
  } else if (barras.dinheiro === 0) {
    mostrarFinal('semDinheiro');
  } else if (barras.paciencia === 0) {
    mostrarFinal('semPaciencia');
  } else if (opcao.final) {
    mostrarFinal(opcao.final);
  } else {
    mostrarCena(opcao.proxima);
  }
}

function mostrarFinal(id) {
  const final = FINAIS[id];
  mostrarTextos(final.ruim ? 'Não chegou em casa' : 'Chegou em casa!', final.titulo, final.texto);
  cartaoCena.classList.toggle('ruim', final.ruim === true);
  salvarFinal(id);
  criarBotao('Tentar de novo', comecar);
  criarBotao('Ver os finais descobertos', () => {
    window.location.href = 'finais.html';
  });
}

// Guarda no navegador os finais já descobertos, sem repetir nenhum
function salvarFinal(id) {
  const descobertos = JSON.parse(localStorage.getItem('finais')) || [];
  if (!descobertos.includes(id)) {
    descobertos.push(id);
    localStorage.setItem('finais', JSON.stringify(descobertos));
  }
}

comecar();
