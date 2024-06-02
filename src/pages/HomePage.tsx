import { Button, Layout, Menu } from "antd"
import { Header, Content, Footer } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Outlet, useNavigate } from "react-router-dom"
import CreateItem from "../components/createItem/CreateItem"
import Catalog from "../components/catalog/Catalog"
import { HOME_PATH, ORDER_PATH } from "../routing/constants"


export const HomePage = () => {
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
                {/* <Outlet /> */}
                {/* <CreateItem/> */}
                <Catalog />
            </Content>
        </Layout>
    )
}