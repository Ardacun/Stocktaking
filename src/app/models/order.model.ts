import { OrderItem } from "./orderitem.model";

export class Order {
    id?: number;
    user_id: number;
    order_date: string;
    order_status: string;
    order_total: number;

    constructor(id: number, user_id: number, order_date: string, order_status: string, order_total: number) {
        this.id = id;
        this.user_id = user_id;
        this.order_date = order_date;
        this.order_total = order_total;
        this.order_status = order_status;
    }

   
}
