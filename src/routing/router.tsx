import { Route, Routes } from "react-router-dom"
import { AUTH_PATH, HOME_PATH } from "./constants"

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={AUTH_PATH} element={<div>AUTH</div>} />
            <Route path={HOME_PATH} element={<div>Home</div>} />
        </Routes>
    )
}