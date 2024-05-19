import { Layout, Menu } from "antd"
import { Header, Content, Footer } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { Outlet } from "react-router-dom"
import CreateItem from "../components/createItem/CreateItem"
import Catalog from "../components/catalog/Catalog"


export const HomePage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header></Header>
            <Content>
                {/* <Outlet /> */}
                {/* <CreateItem/> */}
                <Catalog />
            </Content>
        </Layout>
    )
}