import express, { Request, Response } from 'express'
import sjcl from 'sjcl';

const server = express();

const payload = {
    name: 'Sarah Vianna',
    birthdate: '29/12/1998', 
    email: 'sarah@gmail.com',
    cpf: '39335730092',
    phone: '81993525652',
    cnpj: '04846188000144'
}

const secretKey = 'your-secret-key'; 
const encrypted = sjcl.encrypt(secretKey, JSON.stringify(payload));    

server.get('/', async (request: Request, response: Response) => {
    //response.cookie('hash', encrypted);
    response.cookie('hash', encrypted, {
        domain: 'app-olga-2.vercel.app',
        path: '/wiipo',
        secure: true, 
        sameSite: 'none',
    });
    //response.setHeader('X-Hash', JSON.stringify(encrypted));
    return response.redirect(302, 'https://app-olga-2.vercel.app/wiipo')
});

server.listen(3007);