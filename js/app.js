import { criarHome } from './pages/home.js'
import { criarLogin } from './pages/login.js'
import { criarAdmin } from './pages/admin.js'


const paginas = {

    home: {
        titulo: 'BEAUTY STORE',
        renderizar: criarHome
    },

    login: {
        titulo: 'LOGIN',
        renderizar: criarLogin
    },

    admin: {
        titulo: 'PAINEL ADMINISTRATIVO',
        renderizar: criarAdmin
    }

}

export function navegarPara(pagina) {
    window.location.hash = pagina
}

export function renderizarPagina() {

    const nomePagina =
        window.location.hash.replace('#', '')

    const pagina =
        paginas[nomePagina]

    const conteudo =
        pagina.renderizar()

    document
        .getElementById('titulo')
        .textContent =
        pagina.titulo

    document
        .getElementById('app-main')
        .replaceChildren(conteudo)

}

window.addEventListener(
    'hashchange',
    renderizarPagina
)

navegarPara('home')