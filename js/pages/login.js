import { navegarPara } from "../app.js"

function verificarLogin(usuario, senha) {
    if (usuario.value === 'admin' && senha.value === '123') {
        navegarPara('admin')
    } else {
        alert('Usuário ou senha incorreta!')
    }
}

// Função auxiliar para criar os campos com ícones
function criarCampoComIcone(placeholder, type, iconeEmoji) {
    const wrapper = document.createElement('div')
    wrapper.className = 'input-wrapper'
    
    const icone = document.createElement('span')
    icone.className = 'input-icon'
    icone.textContent = iconeEmoji
    
    const input = document.createElement('input')
    input.type = type
    input.placeholder = placeholder
    input.className = 'input-beauty'
    
    wrapper.append(icone, input)
    return { wrapper, input }
}

export function criarLogin() {
    const container = document.createElement('section')
    container.className = 'login-beauty'

    // Header
    const header = document.createElement('header')
    header.className = 'login-header'
    header.innerHTML = `<h1>Beauty Store 💄</h1>`
    const btnHome = document.createElement('button')
    btnHome.textContent = 'Home'
    btnHome.onclick = () => navegarPara('home')
    header.appendChild(btnHome)

    // Card Principal
    const card = document.createElement('div')
    card.className = 'login-card'

    // Lado Esquerdo: Imagem
    const ladoImagem = document.createElement('div')
    ladoImagem.className = 'login-image-side'

    // Lado Direito: Formulário
    const ladoForm = document.createElement('div')
    ladoForm.className = 'login-form-side'

    const titulo = document.createElement('h2')
    titulo.textContent = 'Acesso Administrativo'
    
    const subtitulo = document.createElement('p')
    subtitulo.textContent = 'Entre para gerenciar sua loja'

    const { wrapper: usuarioWrapper, input: usuarioInput } = criarCampoComIcone('Usuário', 'text', '👤')
    const { wrapper: senhaWrapper, input: senhaInput } = criarCampoComIcone('Senha', 'password', '🔒')

    const entrar = document.createElement('button')
    entrar.textContent = 'Entrar'
    entrar.className = 'btn-beauty'
    entrar.onclick = () => verificarLogin(usuarioInput, senhaInput)

    ladoForm.append(titulo, subtitulo, usuarioWrapper, senhaWrapper, entrar)
    card.append(ladoImagem, ladoForm)

    container.append(header, card)

    return container
}