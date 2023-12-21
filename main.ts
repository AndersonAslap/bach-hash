import express, { Request, Response } from 'express'
import sjcl from 'sjcl';

const server = express();

const payload = {
    name: 'Sarah',
    birthdate: '29/12/1998', 
    email: 'aslap@gmail.com',
    cpf: '12345678945',
    phone: '81993525652',
    cnpj: '04846188000144'
}

const secretKey = 'your-secret-key'; 
const encrypted = sjcl.encrypt(secretKey, JSON.stringify(payload));    

server.get('/', async (request: Request, response: Response) => {
    response.cookie('hash', encrypted);
    return response.redirect('http://localhost:3000/wiipo')
});

server.listen(3007);