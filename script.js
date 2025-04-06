
const form = document.getElementById('form-contato');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (nome === '' || email === '' || mensagem === '') {
    feedback.textContent = 'Preencher os campos é como abrir as janelas da alma — tente novamente, com carinho.';
    feedback.style.color = '#F48FB1';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Hmm... esse e-mail parece não estar pronto para voar pelo cosmos. Verifique-o com carinho.';
    feedback.style.color = '#F48FB1';
    return;
  }

  feedback.textContent = 'Sua mensagem foi lançada ao universo com sucesso (simuladamente, mas cheia de sentimento)!';
  feedback.style.color = '#4caf50';
  form.reset();
});

async function carregarFotosNASA() {
  const container = document.getElementById('nasa-photos');
  const apiKey = 'DEMO_KEY';
  const count = 6;

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

async function carregarFraseInspiradora() {
  const container = document.getElementById('frase-inspiradora');

  try {
    const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.quotable.io/random'));
    const dataWrapped = await res.json();
    const data = JSON.parse(dataWrapped.contents);

    container.textContent = `“${data.content}” — ${data.author}`;
    container.style.opacity = 1;
  } catch (error) {
    container.textContent = 'Nós somos feitos de poeira de estrelas.';
    container.style.opacity = 1;
    console.error('Erro ao buscar frase inspiradora:', error);
  }
}


window.addEventListener('DOMContentLoaded', () => {
  carregarFotosNASA();
  carregarFraseInspiradora();
});
