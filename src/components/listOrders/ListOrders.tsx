import { Select } from "antd";
import { useMemo, useState } from "react";
import { useGetUserOrdersShopsByShopIdQuery } from "../../store/beekneesApi";
import { useAppSelector } from "../../store/store";
import OrderCard from "../orderCard/OrderCard";
import { filterOrders } from "./utils/Utils";

const ListOrders: React.FC = () => {
    const shopId = useAppSelector(state => state.credentialReducer.shop?.id);
    const { data, isLoading, isError } = useGetUserOrdersShopsByShopIdQuery({"shop-id": shopId ?? ""});

    const options = useMemo(() => [
        { value: 'Все заказы', label: 'Все заказы' },
        { value: 'Заказ оформлен', label: 'Заказ оформлен' },
        { value: 'Заказ собран', label: 'Заказ собран' },
        { value: 'В пути', label: 'В пути' },
        { value: 'Ожидает в пункте выдачи', label: 'Ожидает в пункте выдачи' },
        { value: 'Заказ выдан', label: 'Заказ выдан' },
    ], []);

    const [ tabActive, setTabActive ] = useState<string>(options[0].value);

    const orders = useMemo(
        () => filterOrders(data ?? [], tabActive),
        [data, tabActive]
    );

    const handleChange = (value: string) => {
        setTabActive(value);
        console.log(`selected ${value}`);
    };

    return(
        <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
            <h2 style={{margin: 0}}>Заказы</h2>
            <div style={{display: "flex", gap: "15px", alignItems: "center"}}>
                <p>Фильтры заказов</p>
                <Select
                    defaultValue={options[0].value}
                    style={{ width: 200 }}
                    onChange={handleChange}
                    options={options}
                />
            </div>
            <>
                {
                    isLoading
                    ? <p>Загрузка...</p>
                    : orders?.map((item, index) => {
                        return <OrderCard key={index} order={item}/>
                    })
                }
            </>
        </div>
    )
}

export default ListOrders;