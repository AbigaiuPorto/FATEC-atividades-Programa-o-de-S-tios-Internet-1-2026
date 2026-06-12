'use strict'
import { navegarPara } from '../app.js'

const URL = 'https://base-back-dwpz.onrender.com/produtos'

// =========================
// FORMATAR PREÇO
// =========================
function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

// =========================
// CARD COSMÉTICO
// =========================
function criarCard(produto) {

    const card = document.createElement('article')
    card.classList.add('card-cosmetico')

    const imagem = document.createElement('img')
    imagem.src = produto.imagem || 'https://via.placeholder.com/300'
    imagem.alt = produto.nome

    const nome = document.createElement('h3')
    nome.textContent = produto.nome

    const descricao = document.createElement('p')
    descricao.textContent = produto.descricao || 'Produto de beleza e cuidados pessoais'

    const preco = document.createElement('strong')
    preco.textContent = formatarPreco(produto.preco)

    const btnDetalhes = document.createElement('button')
    btnDetalhes.textContent = 'Ver detalhes'

    btnDetalhes.onclick = () => {
        localStorage.setItem('produtoAtual', JSON.stringify(produto))
        navegarPara('produto')
    }

    card.append(imagem, nome, descricao, preco, btnDetalhes)

    return card
}

// =========================
// CARREGAR PRODUTOS
// =========================
async function carregarProdutos(container) {

    try {
        const response = await fetch(URL)
        const produtos = await response.json()

        container.replaceChildren()

        produtos.forEach(produto => {
            container.appendChild(criarCard(produto))
        })

    } catch {
        container.innerHTML = '<p>Erro ao carregar produtos.</p>'
    }
}

// =========================
// HOME
// =========================
export function criarHome() {

    const pagina = document.createElement('section')
    pagina.classList.add('home-cosmeticos')

    const header = document.createElement('header')

    const logo = document.createElement('h1')
    logo.textContent = 'Beauty Store 💄'

    const admin = document.createElement('button')
    admin.textContent = 'Admin'
    admin.onclick = () => navegarPara('login')

    header.append(logo, admin)

    const banner = document.createElement('section')
    banner.classList.add('banner-cosmeticos')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Beleza & Cosméticos'

    const texto = document.createElement('p')
    texto.textContent = 'Skincare, maquiagem e cuidados pessoais em um só lugar'

    const btnBanner = document.createElement('button')
    btnBanner.textContent = 'Ver produtos'

    btnBanner.onclick = () => {
        document.querySelector('.produtos')
            .scrollIntoView({ behavior: 'smooth' })
    }

    banner.append(titulo, texto, btnBanner)

    const secaoProdutos = document.createElement('section')
    secaoProdutos.classList.add('produtos')

    carregarProdutos(secaoProdutos)

    pagina.append(header, banner, secaoProdutos)

    return pagina
}