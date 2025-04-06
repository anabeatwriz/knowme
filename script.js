
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

function carregarFraseInspiradora() {
  const container = document.getElementById('frase-inspiradora');

  fetch('https://api.quotable.io/random')
    .then(res => res.json())
    .then(data => {
      container.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      container.textContent = 'Nós somos feitos de poeira de estrelas.';
    });
}

window.addEventListener('DOMContentLoaded', () => {
  carregarFotosNASA();
  carregarFraseInspiradora();
});
