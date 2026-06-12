import { navegarPara } from "../app.js"

async function verificarLogin(email, senha) {

    try {

        const resposta = await fetch(
            'https://base-back-dwpz.onrender.com/entrar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    senha: senha.value
                })
            }
        )

        const dados = await resposta.json()

        console.log('Resposta Login:', dados)

        if (!resposta.ok) {
            throw new Error('Credenciais inválidas')
        }

        const token =
            dados.token ||
            dados.accessToken ||
            dados.access_token

        if (!token) {
            throw new Error('Token não retornado pela API')
        }

        localStorage.setItem('accessToken', token)

        navegarPara('admin')

    } catch (erro) {

        console.error(erro)

        alert(
            'Email ou senha inválidos'
        )
    }
}

function criarCampoComIcone(
    placeholder,
    type,
    iconeEmoji
) {

    const wrapper = document.createElement('div')
    wrapper.className = 'input-wrapper'

    const icone = document.createElement('span')
    icone.className = 'input-icon'
    icone.textContent = iconeEmoji

    const input = document.createElement('input')
    input.type = type
    input.placeholder = placeholder
    input.className = 'input-beauty'

    wrapper.append(
        icone,
        input
    )

    return {
        wrapper,
        input
    }
}

export function criarLogin() {

    const container =
        document.createElement('section')

    container.className =
        'login-beauty'

    // HEADER
    const header =
        document.createElement('header')

    header.className =
        'login-header'

    const tituloHeader =
        document.createElement('h1')

    tituloHeader.textContent =
        'Beauty Store 💄'

    const btnHome =
        document.createElement('button')

    btnHome.textContent =
        'Home'

    btnHome.onclick = () =>
        navegarPara('home')

    header.append(
        tituloHeader,
        btnHome
    )

    // CARD
    const card =
        document.createElement('div')

    card.className =
        'login-card'

    // IMAGEM
    const ladoImagem =
        document.createElement('div')

    ladoImagem.className =
        'login-image-side'

    // FORM
    const ladoForm =
        document.createElement('div')

    ladoForm.className =
        'login-form-side'

    const titulo =
        document.createElement('h2')

    titulo.textContent =
        'Acesso Administrativo'

    const subtitulo =
        document.createElement('p')

    subtitulo.textContent =
        'Entre para gerenciar sua loja'

    const {
        wrapper: emailWrapper,
        input: emailInput
    } = criarCampoComIcone(
        'Email',
        'email',
        '📧'
    )

    const {
        wrapper: senhaWrapper,
        input: senhaInput
    } = criarCampoComIcone(
        'Senha',
        'password',
        '🔒'
    )

    const entrar =
        document.createElement('button')

    entrar.textContent =
        'Entrar'

    entrar.className =
        'btn-beauty'

    entrar.onclick = () =>
        verificarLogin(
            emailInput,
            senhaInput
        )

    ladoForm.append(
        titulo,
        subtitulo,
        emailWrapper,
        senhaWrapper,
        entrar
    )

    card.append(
        ladoImagem,
        ladoForm
    )

    container.append(
        header,
        card
    )

    return container
}