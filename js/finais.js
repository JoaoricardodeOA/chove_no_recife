const lista = document.getElementById('listaFinais');
const contagem = document.getElementById('contagem');

function mostrarFinais() {
  const descobertos = JSON.parse(localStorage.getItem('finais')) || [];
  const ids = Object.keys(FINAIS);

  contagem.textContent = 'Tu já descobriu ' + descobertos.length + ' de ' + ids.length + ' finais.';
  lista.innerHTML = '';

  // Monta um cartão para cada final, escondendo os que ainda não foram descobertos
  ids.forEach((id) => {
    if (descobertos.includes(id)) {
      lista.innerHTML += `<article class="cartao"><h2>${FINAIS[id].titulo}</h2><p>${FINAIS[id].texto}</p></article>`;
    } else {
      lista.innerHTML += '<article class="cartao bloqueado"><h2>???</h2><p>Continua jogando para descobrir este final.</p></article>';
    }
  });
}

document.getElementById('botaoApagar').addEventListener('click', () => {
  localStorage.removeItem('finais');
  mostrarFinais();
});

mostrarFinais();
