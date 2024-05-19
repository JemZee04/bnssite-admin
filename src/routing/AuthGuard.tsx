import React from "react";
import { useAppSelector } from "../store/store";
import { isAuthSelector } from "../store/slices/credentialSlice";
import { Outlet, OutletProps } from "react-router";
import { Navigate } from "react-router-dom";
import { AUTH_PATH } from "./constants";


export const AuthGuard: React.FC = () => {

    const isAuth = useAppSelector(isAuthSelector)

    return isAuth
        ? <Outlet />
        : <Navigate to={AUTH_PATH} />
}