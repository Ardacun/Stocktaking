export class OrderItem {
    id: number;
    item_id: number;
    order_id: number;
    quantity: number;
    price: number;

    constructor(id: number, item_id: number, order_id: number, quantity: number, price: number) {
        this.id = id;
        this.item_id = item_id;
        this.order_id = order_id;
        this.quantity = quantity;
        this.price = price;
    }

    getId(): number {
        return this.id;
    }

    getItemId(): number {
        return this.item_id;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.price;
    }   
}
