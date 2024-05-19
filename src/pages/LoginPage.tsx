import { Input, Space } from "antd";
import React from "react";



export const LoginPage: React.FC = () => {
    return (
        <Space size={20} direction='vertical' style={{width: '100%'}}>
            <Input placeholder='email' />
            <Input placeholder="Пароль"/>
        </Space>
    );
}