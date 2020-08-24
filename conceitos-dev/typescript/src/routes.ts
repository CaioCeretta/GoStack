import { Request, Response } from 'express';
import createUser from './services/CreateUser';

// Primitivas: string, number, boolean, object, Array
// Interfaces: formas da gente definir tipagem de conjuntos de dados

export function helloWord(request: Request, response: Response) {
    const user = createUser({
        email: 'dudsmary28@gmail.com',
        password: '12345678',
        techs: [
            'NodeJS',
            'React',
            'React Native',
            { title: 'Javascript', experience: 50},
            { title: 'PHP', experience: 90 }
        ],
    });

    return response.json({ message: 'Hello World' });
}