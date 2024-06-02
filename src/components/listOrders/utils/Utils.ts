import { Order } from "../../../store/beekneesApi";

export function filterOrders(orders: Order[], tab: string) {
    return orders.filter(order => {
        if (tab === 'Все заказы') {
            return true;
        } else {
            return order.status === tab;
        }
    });
}