import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import OrderWidget from "../components/orderWidget/OrderWidget";
import { HOME_PATH, ORDER_PATH } from "../routing/constants";

const OrdersPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Header>
            <div style={{height: "64px", display: "flex", gap: "15px", alignItems: "center"}}>
                <Button onClick={() => navigate(HOME_PATH)}>Продукты</Button>
                <Button onClick={() => navigate(ORDER_PATH)}>Заказы</Button>
            </div>
        </Header>
        <Content>
            <OrderWidget/>
        </Content>
    </Layout>
    );
}

export default OrdersPage;