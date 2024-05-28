import { useEffect } from "react";
import { useGetUserOrdersShopsByShopIdQuery } from "../../store/beekneesApi";
import { useAppSelector } from "../../store/store";
import OrderCard from "../orderCard/OrderCard";

const ListOrders: React.FC = () => {
    const shopId = useAppSelector(state => state.credentialReducer.shop?.id);
    const { data, isLoading, isError } = useGetUserOrdersShopsByShopIdQuery({"shop-id": shopId ?? ""});

    useEffect(() => {
        console.log(shopId);
    }, [])

    return(
        <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
            <h2 style={{margin: 0}}>Заказы</h2>
            <>
                {
                    isLoading
                    ? <p>Загрузка...</p>
                    : data?.map((item, index) => {
                        return <OrderCard key={index} order={item}/>
                    })
                }
            </>
        </div>
    )
}

export default ListOrders;