/**
 *  Para criar um usuario: name, email e senha
 */

 interface TechObject {
     title: string;
     experience: number;
     
 }

 interface CreateUserData{
     name?: string;
     email: string;
     password: string;
     techs: Array<string | TechObject>; //techs: string[] quando for um tipo simples
 }


export default function createUser({ name, email, password }: CreateUserData ) {
    const user = {
        name,
        email,
        password
    }

    return user;
}