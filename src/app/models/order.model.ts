import { OrderItem } from "./orderitem.model";

export class Order {
    id: number;
    userId: number;
    date: Date;
    status: string;
    items: OrderItem[];
    total: number;

    constructor(id: number, userId: number, date: Date, status: string, items: OrderItem[], total: number) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.total = total;
        this.status = status;
        this.items = items;
    }

    getId(): number {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getDate(): Date {
        return this.date;
    }

    getTotal(): number {
        return this.total;
    }

    getItems(): OrderItem[] {
        return this.items;
    }

    getStatus(): string {
        return this.status;
    }
}
