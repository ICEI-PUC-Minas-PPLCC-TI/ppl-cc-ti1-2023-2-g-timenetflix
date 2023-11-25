const avaliacoesUsuarios = document.getElementById('avaliacoesUsuarios');
fetch('https://jsonserver--karencriscosta.repl.co/avaliacoesUsuarios')
    .then(response => response.json())
    .then(data => {
        // Aqui você terá acesso aos dados das avaliações
        console.log(data);
        
        let str_teste = "";

        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            str_teste += `
            <div class="comentario-container">
                <div class="comentario-user-info">
                    <div class="nome">
                        Nome: ${data[i].usuario}
                    </div>
                </div>

                <div class="comentario-dados">
                    <div class="nota">
                        Nota: ${data[i].nota}
                    </div>

                    <div class="comentario">
                        Comentario: ${data[i].comentario}
                    </div>

                    <div class="recomenda">
                        Recomenda: ${data[i].recomenda}
                    </div>
                </div>

            </div >`
        }

        avaliacoesUsuarios.innerHTML = str_teste;

    });

// Parte 1: Botão "Deixar minha avaliação"
document.getElementById('btn').addEventListener('click', function() {
    document.getElementById('popupAvaliacao').style.display = 'block';
});

// Parte 8: Botão "Fechar"
document.getElementById('btnFecharPopup').addEventListener('click', function() {
    document.getElementById('popupAvaliacao').style.display = 'none';
});

// Parte 12: Botão "Ver mais avaliações"
document.getElementById('btnVerMaisAvaliacoes').addEventListener('click', function() {
    // Código para carregar mais avaliações (adicionar ao #avaliacoesUsuarios)
});

// Parte 2: Popup para avaliação
function Avaliar(valor) {
    for (let i = 1; i <= 5; i++) {
        const estrela = document.getElementById(`s${i}`);
        if (i <= valor) {
            estrela.src = 'imagens/star1.png'; // Imagem brilhante
        } else {
            estrela.src = 'imagens/star0.png'; // Imagem sem brilho
        }
    }

    // Atualiza a classificação exibida
    const ratingElement = document.getElementById('rating');
    ratingElement.textContent = valor;
}

// Parte 7: Botões de Recomendação
const botoesRecomendacao = document.querySelectorAll('.recomendacao');
// Identifique os elementos dos emojis
const emojiFeliz = document.getElementById('recomenda-feliz');
const emojiTriste = document.getElementById('recomenda-triste');

// Adicione um evento de clique aos emojis
emojiFeliz.addEventListener('click', function() {
    enviarRespostaAoServidor(true); // Envia 'true' para indicar que o usuário recomenda
});

emojiTriste.addEventListener('click', function() {
    enviarRespostaAoServidor(false); // Envia 'false' para indicar que o usuário não recomenda
});

// Função para enviar a resposta ao servidor
function enviarRespostaAoServidor(recomenda) {
    fetch('https://jsonserver--karencriscosta.repl.co/avaliacoesUsuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recomenda: recomenda })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta enviada com sucesso:', data);
    })
    .catch(error => console.error('Erro ao enviar resposta:', error));
}

// Parte 8: Botão "Enviar avaliação
const btnEnviarAvaliacao = document.getElementById("btnEnviarAvaliacao");

btnEnviarAvaliacao.addEventListener('click', function() {
    var loadingIcon = document.getElementById('loadingIcon');
    
    // Exibir símbolo de carregamento e posicioná-lo no cursor
    loadingIcon.style.display = 'block';
    document.addEventListener('mousemove', moveLoadingIcon);

    function moveLoadingIcon(event) {
        var x = event.clientX;
        var y = event.clientY;
        loadingIcon.style.left = (x + 5) + 'px'; // Ajuste a posição conforme necessário
        loadingIcon.style.top = (y + 3) + 'px';  // Ajuste a posição conforme necessário
    }
    
});

btnEnviarAvaliacao.addEventListener('click', function() {
    // Código para enviar a avaliação para o banco de dados (usando JSON)
    
    // (Certifique-se de que o envio para o banco de dados está completo)

    // Fechar o popup após um pequeno atraso (simulando o envio)
setTimeout(function() {
        document.getElementById('popupAvaliacao').style.display = 'none';
        // Esconder o símbolo de carregamento após o fechamento do popup
        loadingIcon.style.display = 'none';
        document.removeEventListener('mousemove', moveLoadingIcon); // Remover o evento de movimento do mouse
    }, 1000); // Altere o valor (em milissegundos) conforme necessário
    });

btnEnviarAvaliacao.addEventListener("click", () => {
    const nome = document.getElementById('nomedoUsuario').textContent;
    const nota = document.getElementById('rating').textContent;
    const comentario = document.getElementById('comentario').value;
    const recomenda = document.querySelector('.emoji.selected').dataset.recomendacao; 
    // Isso assume que o emoji selecionado tem a classe 'selected'

    const str = `
    <div class="avaliacoesUsuarios">
       <div class="user-info">
           <div class="Nome">
             Nome: ${nome} 
           </div>
        </div>

        <div class="user-dados">
           <div class="Nota">
             Nota: ${nota} 
           </div>

           <div class="Nota">
             Comentário: ${comentario} 
           </div>

           <div class="Nota">
              Recomenda: ${recomenda}
           </div>

        </div>
        
    </div>
    `;
    
    avaliacoesUsuarios.innerHTML += str;

})

const emojis = document.querySelectorAll('.emoji');

emojis.forEach(emoji => {
    emoji.addEventListener('click', function() {
        emojis.forEach(e => e.classList.remove('selected')); // Remove a seleção de todos os emojis
        this.classList.add('selected'); // Adiciona a seleção ao emoji clicado
    });
});
