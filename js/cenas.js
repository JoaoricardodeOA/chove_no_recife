// Toda a história do jogo está aqui. 
// Cada opção tem:
//   texto:   o que aparece no botão
//   efeito:  quanto soma ou tira de cada barra
//   proxima: a próxima cena
//   final:   usado no lugar de "proxima" quando a escolha termina o jogo

const CENAS = {
  saida: {
    local: '17h. Avenida Conde da Boa Vista',
    titulo: 'O céu fechou',
    texto: 'Caiu o primeiro pingo e, em dois minutos, o meio-fio virou riacho. Chega a mensagem da tua mãe: "Vem logo que a maré tá subindo, visse?"',
    opcoes: [
      { texto: 'Correr para a parada de ônibus', efeito: { paciencia: -5 }, proxima: 'parada' },
      { texto: 'Entrar numa loja até a chuva passar', efeito: { paciencia: -5 }, proxima: 'loja' },
      { texto: 'Chamar um carro pelo aplicativo', efeito: { bateria: -15 }, proxima: 'aplicativo' }
    ]
  },

  parada: {
    local: '17h20. Parada de ônibus',
    titulo: 'Tem mais gente aqui que no Carnaval',
    texto: 'Passa um ônibus tão cheio que a porta mal abre. Tem gente na escada, e o cobrador pede para todo mundo "dar um passinho para trás".',
    opcoes: [
      { texto: 'Se espremer e entrar assim mesmo', efeito: { paciencia: -20, dinheiro: -10 }, proxima: 'onibus' },
      { texto: 'Esperar o próximo mexendo no celular', efeito: { paciencia: -10, bateria: -15 }, proxima: 'amigoPromete' },
      { texto: 'Desistir e ir andando', efeito: { paciencia: -5 }, proxima: 'alagado' }
    ]
  },

  loja: {
    local: '17h15. Loja de utilidades',
    titulo: '"Essa chuva não passa hoje não, meu bem"',
    texto: 'O dono da loja nem olha para fora para dizer isso. No balcão tem sombrinha à venda e, logo atrás, uma tomada livre.',
    opcoes: [
      { texto: 'Comprar uma sombrinha e encarar a rua', efeito: { dinheiro: -20, paciencia: 5 }, proxima: 'alagado' },
      { texto: 'Pedir para carregar o celular um pouco', efeito: { bateria: 30, paciencia: -15 }, proxima: 'parada' }
    ]
  },

  aplicativo: {
    local: '17h15. Olhando para o celular',
    titulo: 'O preço subiu junto com a água',
    texto: 'Tu abre o aplicativo e a corrida de sempre está custando quase o triplo por causa da chuva. O preço é tão alto que dá até vontade de rir.',
    opcoes: [
      { texto: 'Pedir o carro mesmo assim', efeito: { dinheiro: -35, bateria: -5 }, proxima: 'carro' },
      { texto: 'Nem pensar. Vou para a parada', efeito: { paciencia: -10 }, proxima: 'parada' }
    ]
  },

  carro: {
    local: '17h40. Dentro do carro',
    titulo: 'Três metros em vinte minutos',
    texto: 'Dois motoristas cancelaram, mas o terceiro veio. Só que a avenida virou um estacionamento. Ele suspira, aumenta o brega no último volume e diz que dali ninguém sai tão cedo. Pela janela, tu vê que quem está a pé anda mais rápido que o carro.',
    opcoes: [
      { texto: 'Cantar junto e esperar o trânsito andar', efeito: { paciencia: 20 }, proxima: 'engarrafado' },
      { texto: 'Descer e continuar a pé, que está mais rápido', efeito: { paciencia: -5 }, proxima: 'alagado' }
    ]
  },

  onibus: {
    local: '17h50. Dentro do ônibus',
    titulo: '"Daqui não passa, alagou!"',
    texto: 'A janela não fecha, tua mochila está no colo de uma desconhecida e o motorista acaba de parar. Metade do ônibus já começou a tirar o sapato.',
    opcoes: [
      { texto: 'Tirar o sapato e descer também', efeito: { paciencia: -5 }, proxima: 'alagado' },
      { texto: 'Ficar e esperar a água baixar', efeito: { paciencia: -15, bateria: -20 }, proxima: 'engarrafado' }
    ]
  },

  amigoPromete: {
    local: '18h. Ainda na parada',
    titulo: '"Tô chegando, visse"',
    texto: 'Teu amigo disse que passa aí para te dar uma força. Faz quarenta minutos que ele está "chegando".',
    opcoes: [
      { texto: 'Acreditar e esperar mais um pouco', efeito: { paciencia: -20, bateria: -10 }, proxima: 'amigoChega' },
      { texto: 'Oxe, vou embora a pé', efeito: { paciencia: -5 }, proxima: 'alagado' }
    ]
  },

  amigoChega: {
    local: '18h10. Ainda na parada',
    titulo: 'Ele chegou. A pé.',
    texto: 'Teu amigo aparece encharcado, sorrindo, e pergunta se tu tem dinheiro para a passagem dele. Bem nessa hora, um ônibus quase vazio aponta na esquina.',
    opcoes: [
      { texto: 'Pagar as duas passagens', efeito: { dinheiro: -20, paciencia: 15 }, proxima: 'engarrafado' },
      { texto: 'Rir para não chorar e ir a pé com ele', efeito: { paciencia: 10 }, proxima: 'alagado' }
    ]
  },

  alagado: {
    local: '18h20. Rua alagada',
    titulo: 'A água já passou da canela',
    texto: 'Ninguém sabe onde o meio-fio termina. Numa calçada mais alta, um vendedor de caldinho segue trabalhando como se nada estivesse acontecendo.',
    opcoes: [
      { texto: 'Atravessar devagar, segurando nas grades', efeito: { paciencia: -15 }, proxima: 'ponte' },
      { texto: 'Parar para tomar um caldinho', efeito: { dinheiro: -15, paciencia: 25 }, proxima: 'caldinho' },
      { texto: 'Abrir o mapa e procurar outro caminho', efeito: { bateria: -20 }, proxima: 'ponte' }
    ]
  },

  caldinho: {
    local: '18h30. Barraca de caldinho',
    titulo: 'O melhor caldinho da tua vida',
    texto: 'Uma senhora ao teu lado conta de todas as chuvas que já enfrentou. Quando tu dizes para onde vai, ela aponta com o queixo: "Pela outra rua tá seco, meu bem".',
    opcoes: [
      { texto: 'Confiar na senhora e pegar a outra rua', efeito: {}, final: 'atalho' },
      { texto: 'Avisar tua mãe e seguir o caminho de sempre', efeito: { bateria: -15, paciencia: 5 }, proxima: 'ponte' }
    ]
  },

  // Liga as cenas de carro e de ônibus à ponte, que a pessoa atravessa a pé
  engarrafado: {
    local: '18h30. Perto da ponte',
    titulo: '"Daqui eu não passo tão cedo"',
    texto: 'O trânsito andou um pouco até o começo da ponte e ali parou de vez. O motorista desliga o motor e avisa que não adianta insistir. Da janela, dá para ver a ponte logo ali.',
    opcoes: [
      { texto: 'Descer e seguir a pé até a ponte', efeito: { paciencia: -5 }, proxima: 'ponte' },
      { texto: 'Ficar lá dentro até o trânsito voltar', efeito: { paciencia: -15, bateria: -10 }, final: 'tarde' }
    ]
  },

  ponte: {
    local: '18h40. Em cima da ponte',
    titulo: 'O Capibaribe está lá embaixo, e bem cheio',
    texto: 'O vento vira qualquer sombrinha do avesso. Falta pouco, mas a chuva apertou de novo e teu celular está esquentando no bolso.',
    opcoes: [
      { texto: 'Atravessar correndo', efeito: { paciencia: -10 }, final: 'encharcado' },
      { texto: 'Esperar a chuva afinar embaixo de uma marquise', efeito: { paciencia: -15, bateria: -10 }, final: 'tarde' },
      { texto: 'Ligar para casa e pedir socorro', efeito: { bateria: -25 }, final: 'resgate' }
    ]
  }
};

// "ruim: true" marca os finais em que a pessoa não chega em casa
const FINAIS = {
  encharcado: {
    titulo: 'Chegou, mas a meia nunca mais foi a mesma',
    texto: 'Tu abre a porta pingando no chão limpo. Tua mãe olha para o chão, olha para ti e só diz: "Toalha. Agora."'
  },
  tarde: {
    titulo: 'Sem se molhar, mas só de madrugada',
    texto: 'A chuva afinou, tu chegou sem um arranhão e tua janta estava no micro-ondas com um bilhete: "Da próxima, sai mais cedo".'
  },
  resgate: {
    titulo: 'O resgate da família',
    texto: 'Teu tio aparece com o carro velho que nunca pega, mas hoje pegou. Tu vai ouvir sobre esse favor por muitos e muitos Natais.'
  },
  atalho: {
    titulo: 'A sabedoria do caldinho',
    texto: 'A outra rua estava mesmo seca. Tu chega em casa antes de todo mundo e entende que quem sabe das coisas não é o aplicativo de mapa.'
  },
  semBateria: {
    ruim: true,
    titulo: 'Tela preta',
    texto: 'O celular morreu. Sem mapa, sem mensagem e sem ideia de onde está o ônibus, tu fica debaixo de uma marquise até alguém conhecido passar.'
  },
  semDinheiro: {
    ruim: true,
    titulo: 'Cartão sem saldo',
    texto: 'Tu passa o cartão, a catraca apita e o cobrador olha com pena. Sem um real no bolso, resta dormir na casa do primo que mora perto.'
  },
  semPaciencia: {
    ruim: true,
    titulo: 'Sentou no meio-fio',
    texto: 'Chega. Tu senta na calçada, no meio da água, e declara em voz alta que agora vai morar ali mesmo. Ninguém nem estranha.'
  }
};
