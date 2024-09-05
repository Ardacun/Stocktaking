export class Category {

    id: number;
    name: string;
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }   

    getDescription(): string {
        return this.description;
    }
}
