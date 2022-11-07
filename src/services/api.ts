import axios from 'axios'

export const api = axios.create({
    //ATENÇÃO CASO NÃO FUNCIONE O APP OU WEB FAVOR PEGAR 
    //O IP DA MÁQUINA E TROCAR NA LINHA ABAIXO
    baseURL: 'http://192.168.5.4:3333'
})