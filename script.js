const form = document.getElementById('form-contato');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (nome === '' || email === '' || mensagem === '') {
    feedback.textContent = 'Preencher os campos é importante — tente novamente!';
    feedback.style.color = '#F48FB1';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Hmm... esse e-mail parece não estar pronto para voar pelo cosmos. Verifique-o.';
    feedback.style.color = '#F48FB1';
    return;
  }

  feedback.textContent = 'Sua mensagem foi lançada ao universo com sucesso :)';
  feedback.style.color = '#4caf50';
  form.reset();
});

async function carregarFotosNASA() {
  const container = document.getElementById('nasa-photos');
  const apiKey = 'gl19xLrXGIs7QAcz9oZajaJbTB0MomHDCvsBfMSJ';
  const count = 10;

  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`);
    const data = await res.json();

    data.forEach(item => {
      if (item.media_type === 'image') {
        const div = document.createElement('div');
        div.classList.add('nasa-image-card');

        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.title;
        img.classList.add('nasa-image');

        const caption = document.createElement('p');
        caption.textContent = item.title;
        caption.classList.add('nasa-caption');

        div.appendChild(img);
        div.appendChild(caption);
        container.appendChild(div);
      }
    });
  } catch (error) {
    console.error('Erro ao buscar imagens da NASA', error);
  }
}

function carregarFraseInspiradora() {
  const container = document.getElementById('frase-inspiradora');

  const frases = [
    { texto: "Nós somos feitos da matéria das estrelas.", autor: "Carl Sagan" },
    { texto: "A imaginação é mais importante que o conhecimento.", autor: "Albert Einstein" },
    { texto: "Qualquer tecnologia suficientemente avançada é indistinguível de magia.", autor: "Arthur C. Clarke" },
    { texto: "A vida é feita de escolhas. Quando você não escolhe, já escolheu.", autor: "Jean-Paul Sartre" },
    { texto: "Seja a mudança que você quer ver no mundo.", autor: "Mahatma Gandhi" },
    { texto: "Os programadores são os poetas da lógica.", autor: "Linda Liukas" },
    { texto: "A ciência é uma maneira de tentar não se enganar.", autor: "Richard Feynman" },
    { texto: "O software está comendo o mundo.", autor: "Marc Andreessen" },
    { texto: "Tudo deve ser feito o mais simples possível, mas não mais simples.", autor: "Albert Einstein" },
    { texto: "Nunca subestime o poder de um grupo pequeno de pessoas determinadas.", autor: "Margaret Mead" },
    { texto: "Astronomia nos ensina humildade.", autor: "Stephen Hawking" },
    { texto: "Programar é entender pessoas mais do que entender máquinas.", autor: "Larry Constantine" },
    { texto: "Se você quer ir rápido, vá sozinho. Se quer ir longe, vá em grupo.", autor: "Provérbio africano" },
    { texto: "Para cada problema complexo, existe uma solução clara, simples e errada.", autor: "H.L. Mencken" },
    { texto: "Se não for agora, quando?", autor: "Talmude" },
    { texto: "A única maneira de fazer um ótimo trabalho é amar o que você faz.", autor: "Steve Jobs" },
    { texto: "A curiosidade é a faísca por trás de cada grande ideia.", autor: "Marie Curie" },
    { texto: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.", autor: "Albert Einstein" },
    { texto: "A lógica leva de A a B. A imaginação leva a qualquer lugar.", autor: "Albert Einstein" },
    { texto: "O universo não está apenas mais estranho do que imaginamos, ele está mais estranho do que podemos imaginar.", autor: "J.B.S. Haldane" },
    { texto: "A única coisa que interfere com meu aprendizado é a minha educação.", autor: "Albert Einstein" },
    { texto: "Erros são portas para descobertas.", autor: "James Joyce" },
    { texto: "Os computadores são inúteis. Eles só dão respostas.", autor: "Pablo Picasso" },
    { texto: "Aprender a programar é como aprender uma nova linguagem para conversar com o universo.", autor: "Chris Pine" },
    { texto: "A simplicidade é a sofisticação máxima.", autor: "Leonardo da Vinci" },
    { texto: "Se você não pode explicar algo de forma simples, então você não entendeu direito.", autor: "Albert Einstein" },
    { texto: "Não há atalhos para qualquer lugar que valha a pena ir.", autor: "Beverly Sills" },
    { texto: "Ciência não é um conjunto de verdades, mas um processo para encontrá-las.", autor: "Carl Sagan" },
    { texto: "A aventura mais bonita que você pode experimentar é o mistério.", autor: "Albert Einstein" },
    { texto: "A persistência é o caminho do êxito.", autor: "Charles Chaplin" },
    { texto: "O importante é nunca parar de questionar.", autor: "Albert Einstein" },
    { texto: "Não há nada mais inovador do que a dúvida.", autor: "René Descartes" },
    { texto: "Se você quer resultados diferentes, faça diferente.", autor: "Albert Einstein" },
    { texto: "O código é como humor. Quando você tem que explicar, não é bom.", autor: "Cory House" },
    { texto: "As estrelas não estão tão longe quanto parecem — algumas vivem dentro de você.", autor: "Desconhecido" }
  ];

  let indice = 0;

  function mostrarFrase() {
    const frase = frases[indice];
    container.textContent = `"${frase.texto}" — ${frase.autor}`;
    indice = (indice + 1) % frases.length;
  }

  mostrarFrase(); // exibe imediatamente ao carregar
  setInterval(mostrarFrase, 5000); // muda a cada 5 segundos
}


window.addEventListener('DOMContentLoaded', () => {
  carregarFotosNASA();
  carregarFraseInspiradora();
});
