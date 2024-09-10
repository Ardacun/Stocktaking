export class OrderItem {
    id: number;
    itemId: number;
    quantity: number;
    price: number;

    constructor(id: number, itemId: number, quantity: number, price: number) {
        this.id = id;
        this.itemId = itemId;
        this.quantity = quantity;
        this.price = price;
    }

    getId(): number {
        return this.id;
    }

    getItemId(): number {
        return this.itemId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.price;
    }   
}
