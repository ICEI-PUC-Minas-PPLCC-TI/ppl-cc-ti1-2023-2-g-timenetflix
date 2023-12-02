async function criarConta(event) {
  event.preventDefault(); // Previne o envio do formulário (comportamento padrão)

  // Pega os valores dos campos
  var username = document.querySelector(
    'input[placeholder="Nome de usuário"]'
  ).value;
  var email = document.querySelector('input[placeholder="Email"]').value;
  var password = document.querySelector('input[placeholder="Senha"]').value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Verifica se a senha e a confirmação de senha são iguais
  if (password !== confirmPassword) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  // Cria um objeto de conta
  var novaConta = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(
      "https://jsonserver-conta-usuario.karencriscosta.repl.co/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaConta),
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert("Conta criada com sucesso!"); // Exibe uma mensagem de sucesso (pode ser ajustada conforme necessário)
      localStorage.setItem("usuarioAutenticado", true);
      localStorage.setItem("usuario", data.id);
      window.location.href = "/codigo/inicio.html";
      // Atualiza o banco de dados no localStorage
    } else {
      alert("Houve um problema ao criar a conta.");
    }
  } catch (error) {
    console.error(error);
    alert("Houve um problema ao criar a conta.");
  }
}

async function entrarNaConta(event) {
  event.preventDefault(); // Previne o envio do formulário (comportamento padrão)

  // Pega os valores dos campos
  var username = document.querySelector(
    'input[placeholder="Email ou nome de usuário"]'
  ).value;
  var password = document.querySelector('input[placeholder="Senha"]').value;

  // Aqui você pode verificar se as credenciais são válidas
  // Por exemplo, comparar com as contas armazenadas no seu banco de dados interno

  try {
    const response = await fetch(
      `https://jsonserver-conta-usuario.karencriscosta.repl.co/users?username=${username}&password=${password}`
    );

    if (response.ok) {
      const data = await response.json();
			console.log(data);
      if (data.length > 0) {
        alert("Login bem sucedido!");
        localStorage.setItem("usuarioAutenticado", true);
        localStorage.setItem("usuario", data[0].id);
        window.location.href = "/codigo/inicio.html";
      } else {
        alert(
          "Nome de usuário ou senha inválidos. Por favor, tente novamente."
        );
      }
    } else {
      alert("Houve um problema ao entrar na conta.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Houve um problema ao entrar na conta.");
  }

  verificarAutenticacao();
}

function verificarAutenticacao() {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const botaoSair = document.getElementById("sair-da-conta");

  if (usuarioAutenticado) {
    botaoSair.style.display = "block"; // ou 'inline' ou 'inline-block', dependendo do seu estilo
  } else {
    botaoSair.style.display = "none";
  }
}

function sairDaConta() {
  localStorage.removeItem("usuarioAutenticado");
  localStorage.removeItem("usuario");
  window.location.href = "/codigo/index.html";
  verificarAutenticacao();
}

async function validarCredenciais(username, password) {
  try {
    const response = await fetch(
      `https://jsonserver-conta-usuario.karencriscosta.repl.co/users?username=${username}&password=${password}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.length > 0; // Retorna true se a conta foi encontrada, senão retorna false.
    } else {
      console.error("Erro ao validar credenciais:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Erro:", error);
    return false;
  }
}

// Chamada para verificar a autenticação quando a página carrega
document.addEventListener("DOMContentLoaded", verificarAutenticacao);
