'use strict'

import { uploadParaCloudinary } from '../cloudinay.js'
import { navegarPara } from '../app.js'

const API_URL = 'https://base-back-dwpz.onrender.com/produtos'

export function criarAdmin() {

    let editId = null
    let imagemAtual = ''

    const pagina = document.createElement('section')
    pagina.className = 'admin-cosmeticos'

    // =========================
    // HEADER
    // =========================
    const header = document.createElement('div')
    header.className = 'admin-header'

    const titulo = document.createElement('h1')
    titulo.textContent = 'Beauty Store Admin 💄'

    const btnHome = document.createElement('button')
    btnHome.textContent = 'Voltar loja'
    btnHome.onclick = () => navegarPara('home')

    header.append(titulo, btnHome)

    // =========================
    // MÉTRICAS
    // =========================
    const metricas = document.createElement('section')
    metricas.className = 'admin-metricas'

    const cardProdutos = document.createElement('div')
    cardProdutos.className = 'metrica-card'

    const totalProdutos = document.createElement('h3')
    totalProdutos.textContent = '0'

    const textoProdutos = document.createElement('p')
    textoProdutos.textContent = 'Produtos'

    cardProdutos.append(totalProdutos, textoProdutos)

    const cardReceita = document.createElement('div')
    cardReceita.className = 'metrica-card'

    const totalReceita = document.createElement('h3')
    totalReceita.textContent = 'R$ 0,00'

    const textoReceita = document.createElement('p')
    textoReceita.textContent = 'Faturamento'

    cardReceita.append(totalReceita, textoReceita)

    metricas.append(cardProdutos, cardReceita)

    // =========================
    // TÍTULO FORM
    // =========================
    const formWrapper = document.createElement('section')
    formWrapper.className = 'admin-form-wrapper'

    const tituloForm = document.createElement('h2')
    tituloForm.textContent = 'Novo Produto'

    // =========================
    // FORM
    // =========================
    const form = document.createElement('div')
    form.className = 'admin-form'

    const inputNome = document.createElement('input')
    inputNome.placeholder = 'Nome do produto'

    const inputDescricao = document.createElement('input')
    inputDescricao.placeholder = 'Descrição do produto'

    const inputPreco = document.createElement('input')
    inputPreco.type = 'number'
    inputPreco.placeholder = 'Preço'

    const uploadCard = document.createElement('label')
uploadCard.className = 'upload-card'

const inputImagem = document.createElement('input')
inputImagem.type = 'file'
inputImagem.accept = 'image/*'
inputImagem.hidden = true

const preview = document.createElement('img')
preview.className = 'preview-produto'
preview.style.display = 'none'

const textoUpload = document.createElement('span')
textoUpload.textContent =
    '📷 Clique para adicionar uma imagem'

uploadCard.append(
    preview,
    textoUpload,
    inputImagem
)

inputImagem.addEventListener('change', ({ target }) => {

    if (!target.files.length) return

    preview.src = URL.createObjectURL(
        target.files[0]
    )

    preview.style.display = 'block'

    textoUpload.textContent =
        'Imagem selecionada'
})

    const btnSalvar = document.createElement('button')
    btnSalvar.type = 'button'
    btnSalvar.className = 'btn-salvar'
    btnSalvar.textContent = 'Cadastrar produto'

   form.append(
    inputNome,
    inputDescricao,
    inputPreco,
    uploadCard,
    btnSalvar
)

    formWrapper.append(tituloForm, form)

    // =========================
    // TÍTULO LISTA
    // =========================
    const tituloLista = document.createElement('h2')
    tituloLista.className = 'admin-titulo-lista'
    tituloLista.textContent = 'Produtos Cadastrados'

    // =========================
    // LISTA
    // =========================
    const lista = document.createElement('div')
    lista.className = 'admin-lista'

  
    async function carregar() {

    try {

       const token = localStorage.getItem('accessToken')

        const resposta = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!resposta.ok) {
            throw new Error('Erro na API: ' + resposta.status)
        }

        const produtos = await resposta.json()

        lista.replaceChildren()

        totalProdutos.textContent = produtos.length

        const receita = produtos.reduce((total, produto) => {
            return total + Number(produto.preco || 0)
        }, 0)

        totalReceita.textContent = receita.toLocaleString(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        )

        produtos.forEach(produto => {
            // resto do seu código continua igual

                const card = document.createElement('div')
                card.className = 'admin-card'
const IMAGEM_PADRAO = '/img/beauty.png'
const imagem = document.createElement('img')

imagem.src = produto.imagem || IMAGEM_PADRAO
imagem.alt = produto.nome

imagem.onerror = () => {
    imagem.src = IMAGEM_PADRAO
}

                const info = document.createElement('div')
                info.className = 'info'

                const nome = document.createElement('h3')
                nome.textContent = produto.nome

                const descricao = document.createElement('p')
                descricao.textContent =
                    produto.descricao || ''

                const preco = document.createElement('span')
                preco.className = 'produto-preco'

                preco.textContent = Number(
                    produto.preco || 0
                ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                info.append(
                    nome,
                    descricao,
                    preco
                )

                // =========================
                // AÇÕES
                // =========================
                const acoes = document.createElement('div')
                acoes.className = 'admin-acoes'

                const btnEditar =
                    document.createElement('button')

                btnEditar.className = 'btn-editar'
                btnEditar.textContent = 'Editar'

                btnEditar.onclick = () => {

                    inputNome.value =
                        produto.nome || ''

                    inputDescricao.value =
                        produto.descricao || ''

                    inputPreco.value =
                        produto.preco || ''
                        imagemAtual = produto.imagem || ''
preview.src = produto.imagem
preview.style.display = 'block'

textoUpload.textContent =
    'Imagem atual'

                    editId = produto.id

                    btnSalvar.textContent =
                        'Atualizar produto'
                }

                const btnExcluir =
                    document.createElement('button')

                btnExcluir.className = 'btn-excluir'
                btnExcluir.textContent = 'Excluir'

                btnExcluir.onclick = async () => {

                     const token = localStorage.getItem('accessToken')
                    await fetch(`${API_URL}/${produto.id}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

                    carregar()
                }

                acoes.append(
                    btnEditar,
                    btnExcluir
                )

                card.append(
                    imagem,
                    info,
                    acoes
                )

                lista.append(card)
            })

        } catch (erro) {

            console.error(
                'Erro ao carregar produtos:',
                erro
            )
        }
    }

    // =========================
    // POST / PATCH
    // =========================
    btnSalvar.onclick = async () => {

        const token =localStorage.getItem('accessToken')
let urlImagem = imagemAtual

if (inputImagem.files.length) {

    urlImagem =
        await uploadParaCloudinary(
            inputImagem.files[0]
        )
}

const produto = {
    nome: inputNome.value,
    descricao: inputDescricao.value,
    preco: Number(inputPreco.value),
    imagem: urlImagem
}

        try {

            if (!editId) {

                await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                        Authorization:
                            `Bearer ${token}`
                    },
                    body: JSON.stringify(produto)
                })

            } else {

                await fetch(
                  `${API_URL}/${editId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type':
                                'application/json',
                            Authorization:
                                `Bearer ${token}`
                        },
                        body: JSON.stringify(produto)
                    }
                )

                editId = null

                btnSalvar.textContent =
                    'Cadastrar produto'
            }

          inputNome.value = ''
inputDescricao.value = ''
inputPreco.value = ''
inputImagem.value = ''

preview.src = ''
preview.style.display = 'none'

textoUpload.textContent =
    '📷 Clique para adicionar uma imagem'

imagemAtual = ''

            carregar()

        } catch (erro) {

            console.error(
                'Erro ao salvar produto:',
                erro
            )
        }
    }

    // =========================
    // SAIR
    // =========================
    const btnSair = document.createElement('button')
    btnSair.className = 'btn-sair'
    btnSair.textContent = 'Sair'

    btnSair.onclick = () => {
        navegarPara('home')
    }

    // =========================
    // MONTAGEM
    // =========================
    pagina.append(
        header,
        metricas,
        formWrapper,
        tituloLista,
        lista,
        btnSair
    )

    carregar()

    return pagina
}