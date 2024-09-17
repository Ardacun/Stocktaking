
export class Item {

    id: number;
    userId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category_id: number;

    constructor(id: number, name: string, description: string, price: number, userId: number, quantity: number, category_id: number) {
        this.userId = userId;
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.category_id = category_id;
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

    getPrice(): number {
        return this.price;
    }
    
    getUserId(): number {
        return this.userId;
    }
    
    getQuantity(): number {
        return this.quantity;
    }

    getCategoryId(): number {
        return this.category_id;
    }

}
