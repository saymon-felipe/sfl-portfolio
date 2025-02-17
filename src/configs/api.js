import axios from 'axios';

let url_api;

// Troca de ambiente da api.
const dev_environment = "http://localhost:3000"; //Ambiente de desenvolvimento.
const production_environment = "https://saymon-portfolio-api.herokuapp.com/"; //Ambiente de produção.

let test_or_prod = 1;

switch (test_or_prod) {
    case 0:
        url_api = dev_environment;
        break;
    case 1: 
        url_api = production_environment;
        break;
}

let api = axios.create({
    baseURL: url_api
});

export default api