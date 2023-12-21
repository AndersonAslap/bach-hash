import express, { Request, Response } from 'express'
import sjcl from 'sjcl';
import cors from 'cors';

import * as jwt from 'jsonwebtoken';

const server = express();

server.use(express.json())
server.use(cors())

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

const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

server.get('/', async (request: Request, response: Response) => {
    //response.cookie('hash', encrypted);
    return response.redirect('https://app-olga-2.vercel.app/wiipo?hash='+token)
});

server.post('/get-data', async (request: Request, response: Response) => {
    const {token} = request.body;
    const decodedPayload = jwt.verify(token, secretKey);
    return response.json(decodedPayload);
});

server.listen(3007);