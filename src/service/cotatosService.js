import axios from "axios"

const url = "http://localhost:5228/api/Agenda"

export default {
    criarContato(contato) {
        return axios.post(url, contato)
    },
    buscarTodosContatos() {
        return axios.get(url)
    }, 
    deletarContato(id) {
        return axios.delete(`${url}/${id}`)
    },
    atualizarContato(id, contato) {
        return axios.put(`${url}/${id}`, contato)
    }
}