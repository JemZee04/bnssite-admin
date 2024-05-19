import { Route, Routes } from "react-router-dom"
import { AUTH_PATH, HOME_PATH } from "./constants"
import { AuthPage } from "../pages/AuthPage"

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={AUTH_PATH} element={<AuthPage />} />
            <Route path={HOME_PATH} element={<div>Home</div>} />
        </Routes>
    )
}