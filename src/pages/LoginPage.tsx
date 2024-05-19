import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { signInThunk } from "../store/slices/credentialSlice/thunks/signInThunk";
import { useNavigate } from "react-router-dom";
import { isAuthSelector } from "../store/slices/credentialSlice";
import { HOME_PATH } from "../routing/constants";



export const LoginPage: React.FC = () => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const isAuth = useAppSelector(isAuthSelector);

    useEffect(() => {
        if (isAuth) navigate(HOME_PATH);
    }, [isAuth])

    const onLogin = () => {
        dispatch(signInThunk({
            phone: phone,
            password: password
        }))
    }

    const buildHandleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }

    return (
        <Space size={20} direction='vertical' style={{ width: '100%' }}>
            <Input placeholder='Номер телефона' value={phone} onChange={buildHandleChange(setPhone)} />
            <Input placeholder="Пароль" value={password} onChange={buildHandleChange(setPassword)} />
            <Button onClick={onLogin}>Войти</Button>
        </Space>
    );
}