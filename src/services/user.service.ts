import { session } from "./session.repository";

class UserService {

    private readonly url = 'http://192.168.1.8:3000/users';

    private async getHeaders() {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Login Inválido!');

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        };
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        if (response.status === 200) {
            return await response.json();
        } else {
            const error = await response.json();
            return error.message; 
        }
    }

    
    public async getById(id: number){
        const response = await fetch(this.url+"/"+id, {
            method: 'GET',
            headers: await this.getHeaders()
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        if (response.status === 200) {
            return await response.json();
        } else {
            const error = await response.json();
            return error.message; 
        }
    }

    public async create(name: string, username: string, password: string, roles:string[]) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify({ name, username, password,roles })
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

    public async update(id: number, name: string, username: string, password: string, roles:string[]) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify({ name, username, password,roles })
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

    public async addRole(id: number, role:string) {
        let roles: string[] = [];
        roles.push(role);
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify({roles :roles })
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

    public async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders()
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

}

export const userService = new UserService();