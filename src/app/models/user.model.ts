export class User {

    id: number;
    username: string;
    email: string;
    password_hash: string;
    role: string;

    constructor(id: number, name: string, email: string, password: string, role: string) {
        this.id = id;
        this.username = name;
        this.email = email;
        this.password_hash = password;
        this.role = role;
    }
    
    getId(): number {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password_hash;
    }   

    getRole(): string {
        return this.role;
    }
}
