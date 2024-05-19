import { Space, Input, Upload, Button } from "antd"
import { LoadButton } from "../components/LoadButton"
import { useEffect, useState } from "react"
import { UploadBox } from "../components/UploadBox";
import { usePostShopSignUpMutation } from "../store/beekneesApi";
import { useAppDispatch, useAppSelector } from "../store/store";
import { isAuthSelector, setCredential } from "../store/slices/credentialSlice";
import { signUpThunk } from "../store/slices/credentialSlice/thunks/signUpThunk";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../routing/constants";


export const RegistrationPage: React.FC = () => {


    const dispatch = useAppDispatch();

    const [brandLogo, setBrandLogo] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const buildHandleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }

    const navigate = useNavigate();
    const isAuth = useAppSelector(isAuthSelector);

    useEffect(() => {
        if (isAuth) navigate(HOME_PATH);
    }, [isAuth])

    const onSignUp = () => {
        if (brandLogo && title && email && password) dispatch(signUpThunk({
            body: {
                file: brandLogo,
                shop: {
                    name: title
                }
            }
        }))
    }

    return (
        <Space size={20} direction='vertical' style={{ width: '100%' }}>
            <UploadBox onLoad={setBrandLogo} file={brandLogo} />
            <Input placeholder='Название' onChange={buildHandleChange(setTitle)} value={title} />
            <Input placeholder='email' onChange={buildHandleChange(setMail)} value={email} />
            <Input placeholder="Пароль" onChange={buildHandleChange(setPassword)} value={password} />
            <Button onClick={onSignUp}>Отправить заявку</Button>
        </Space>
    )
}

