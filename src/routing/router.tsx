import { Route, Routes } from "react-router-dom"
import { AUTH_PATH, HOME_PATH } from "./constants"
import { AuthPage } from "../pages/AuthPage"
import { AuthGuard } from "./AuthGuard"
import { HomePage } from "../pages/HomePage"

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={AUTH_PATH} element={<AuthPage />} />
            <Route
                path={HOME_PATH}
                element={<AuthGuard />}
                children={[
                    <Route
                        index
                        element={<HomePage />}
                    />
                ]}
            />
        </Routes>
    )
}