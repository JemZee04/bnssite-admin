import { Space, Input, Upload } from "antd"
import { LoadButton } from "../components/LoadButton"
import { useState } from "react"
import { UploadBox } from "../components/UploadBox";


export const RegistrationPage: React.FC = () => {

    const [brandLogo, setBrandLogo] = useState<File | null>(null);

    return (
        <Space size={20} direction='vertical' style={{ width: '100%' }}>
            <UploadBox onLoad={setBrandLogo} file={brandLogo} />
            <Input placeholder='Название' />
            <Input placeholder='email' />
            <Input placeholder="Пароль" />
        </Space>
    )
}

