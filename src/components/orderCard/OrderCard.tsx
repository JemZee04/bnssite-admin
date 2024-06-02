import { Select } from "antd";
import { useMemo } from "react";
import { Order, usePatchUserOrdersByOrderIdStatusMutation } from "../../store/beekneesApi";
import CardOrder from "./OrderItemCard";

type OrderCardProps = {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [updateStatus, {data, isLoading, isError}] = usePatchUserOrdersByOrderIdStatusMutation();

    const handleChange = (value: string) => {
        updateStatus({
            "order-id": order.id ?? "",
            body: { status: value }});
        console.log(`selected ${value}`);
    };

    const options = useMemo(() => [
        { value: 'Заказ оформлен', label: 'Заказ оформлен' },
        { value: 'Заказ собран', label: 'Заказ собран' },
        { value: 'В пути', label: 'В пути' },
        { value: 'Ожидает в пункте выдачи', label: 'Ожидает в пункте выдачи' },
        { value: 'Заказ выдан', label: 'Заказ выдан' },
    ], [])

    return (
        <div style={{padding: "10px 0"}}>
                <div style={{display: "flex", justifyContent: "flex-start", gap: "20px"}}>
                    <div>
                        <div style={{display: "flex", gap: "35px"}}>
                        <p style={{fontWeight: 600}}>{`Заказ №${order.id}`}</p>
                            <div style={{display: "flex", gap: "15px", alignItems: "center"}}>
                                <p>Статус заказа</p>
                                <Select
                                    defaultValue={options.find(item => item.value === order.status)?.value ?? "Заказ оформлен"}
                                    style={{ width: 200 }}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                        </div>
                        
                        <p>{`Стоимость ${order.totalPrice} ₽`}</p>
                    </div>
            </div>
            <>
                {
                    order.productItems && order.productItems.map((item, index) => {
                        return <CardOrder item={{
                            id: item.id,
                            name: item.name,
                            shop: item.shop,
                            price: item.price,
                            colors: item.colors,
                            sizes: item.sizes,
                            images: item.images?.filepath
                        }} count={item.quantity ?? 1} />
                    })
                }
            </>
        </div>
    )
}

export default OrderCard;