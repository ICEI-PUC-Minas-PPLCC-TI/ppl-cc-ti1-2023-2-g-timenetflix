document.addEventListener("DOMContentLoaded", () => {
    const atoresRecomendadosElement = document.getElementById("atores-recomendados");
  
    // Função para obter a lista de atores com base nos filmes
    async function obterAtoresRecomendados() {
      try {
        const response = await fetch("http://localhost:3000/filmes");
        const filmes = await response.json();
  
        const atores = filmes.reduce((atores, filme) => {
          filme.atores.forEach((ator) => {
            if (!atores.includes(ator)) {
              atores.push(ator);
            }
          });
          return atores;
        }, []);
  
        return atores;
      } catch (error) {
        console.error("Erro ao obter dados do servidor:", error);
      }
    }
  
    // Função para exibir atores recomendados na página
    async function exibirAtoresRecomendados() {
      const atoresRecomendados = await obterAtoresRecomendados();
  
      if (atoresRecomendados.length > 0) {
        const listaAtores = document.createElement("ul");
  
        atoresRecomendados.forEach((ator) => {
          const itemLista = document.createElement("li");
          itemLista.textContent = ator;
          listaAtores.appendChild(itemLista);
        });
  
        atoresRecomendadosElement.appendChild(listaAtores);
      } else {
        atoresRecomendadosElement.textContent = "Nenhum ator recomendado.";
      }
    }
  
    // Chama a função para exibir atores recomendados
    exibirAtoresRecomendados();
  });
  