'use strict'

import { navegarPara } from '../app.js'

const URL = 'https://base-back-dwpz.onrender.com/produtos'

export function criarAdmin() {

    let editId = null

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

    const inputImagem = document.createElement('input')
    inputImagem.placeholder = 'URL da imagem'

    const btnSalvar = document.createElement('button')
    btnSalvar.type = 'button'
    btnSalvar.className = 'btn-salvar'
    btnSalvar.textContent = 'Cadastrar produto'

    form.append(
        inputNome,
        inputDescricao,
        inputPreco,
        inputImagem,
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

    // =========================
    // GET
    // =========================
    async function carregar() {

        try {

            const resposta = await fetch(URL)
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

                const card = document.createElement('div')
                card.className = 'admin-card'

                const imagem = document.createElement('img')
                imagem.src =
                    produto.imagem ||
                    'https://via.placeholder.com/120'

                imagem.alt = produto.nome

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

                    inputImagem.value =
                        produto.imagem || ''

                    editId = produto.id

                    btnSalvar.textContent =
                        'Atualizar produto'
                }

                const btnExcluir =
                    document.createElement('button')

                btnExcluir.className = 'btn-excluir'
                btnExcluir.textContent = 'Excluir'

                btnExcluir.onclick = async () => {

                    const token =
                        localStorage.getItem('token')

                    await fetch(
                        `${URL}/${produto.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    )

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

        const token =
            localStorage.getItem('token')

        const produto = {
            nome: inputNome.value,
            descricao: inputDescricao.value,
            preco: Number(inputPreco.value),
            imagem: inputImagem.value
        }

        try {

            if (!editId) {

                await fetch(URL, {
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
                    `${URL}/${editId}`,
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