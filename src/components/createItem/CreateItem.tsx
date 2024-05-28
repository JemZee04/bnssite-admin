import { Button, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { InboxOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import type { SelectProps } from 'antd';
import { useMemo, useState } from "react";
import { usePreview } from "../../hooks/usePreview";
import { DefaultOptionType } from "antd/es/select";
import { UploadBox } from "../UploadBox";
import axios from "axios";
import { useAppSelector } from "../../store/store";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

//TODO получение цветов с бека
const arrayColors = [
    {
        id: "1b4a58e3-cbf0-4825-9fc0-95da54888cf6",
        name: "red",
        hex: "#ff0000"
    },
    {
        id: "4635f316-d9e9-44bf-9da1-bb00ff72988c",
        name: "green",
        hex: "#00ff00"
    },
    {
        id: "d57c8551-6183-4f9f-87b9-082523d53532",
        name: "blue",
        hex: "#0000ff"
    },
    {
        id: "3cd1523a-4eeb-45ef-adc2-66cb7ab71d0c",
        name: "yellow",
        hex: "#ffff00"
    },
    {
        id: "6b53c0a7-ba78-4816-98a1-c9315a5e5434",
        name: "purple",
        hex: "#800080"
    },
    {
        id: "d38b028e-86d5-430e-b975-822220e488c0",
        name: "orange",
        hex: "#ffa500"
    },
    {
        id: "c9e9ccd7-e16e-4c0e-aad8-a9b6bec8fd70",
        name: "pink",
        hex: "#ffc0cb"
    },
    {
        id: "9c3ebccb-9794-455e-b7eb-3efea60ca128",
        name: "brown",
        hex: "#a52a2a"
    },
    {
        id: "53f27c53-b875-46d9-9f53-63cd7595b463",
        name: "gray",
        hex: "#808080"
    },
    {
        id: "ed9e58ba-6b31-48e7-8424-bf70f7db43e4",
        name: "black",
        hex: "#000000"
    },
    {
        id: "f2d69648-dc7f-47ea-8fb4-bf4c3baab569",
        name: "white",
        hex: "#ffffff"
    }
];

const arraySizes = [
    {
        id: "86d39aa9-6d47-4c52-9cb5-eec2c1211e25",
        name: "xs"
    },
    {
        id: "eb784e18-6d8b-4db6-a3ec-f6d48b012a08",
        name: "s"
    },
    {
        id: "ff60362c-5694-4cf3-a044-e4d242c7fe42",
        name: "m"
    },
    {
        id: "4d0baf6b-a64d-4222-ab9c-79c245d53131",
        name: "l"
    },
    {
        id: "44e0a6e6-f754-4d71-a352-90fe2fc9182e",
        name: "xl"
    },
    {
        id: "c1e96b0a-7f16-43ae-9fe8-c478d29a1c3f",
        name: "xxl"
    },
    {
        id: "4cd73bd5-48e9-41f5-8f93-8567ef2dc307",
        name: "xxxl"
    },
    {
        id: "a2821d9c-3806-41d4-83e5-dcc3ffee850d",
        name: "xxxxl"
    }
];

const optionsGender: SelectProps['options'] = [
    {
        label: "Женский",
        value: 1
    },
    {
        label: "Мужской",
        value: 2
    }
]

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const { Dragger } = Upload;

export type CreateItemProps = {
    refetch: () => void,
    close: () => void
}

const CreateItem: React.FC<CreateItemProps> = ({ refetch, close }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState<DefaultOptionType[]>([]);
    const [colors, setColors] = useState<DefaultOptionType[]>([]);
    const [gender, setGender] = useState<DefaultOptionType>();
    const [brandLogo, setBrandLogo] = useState<File | null>(null);

    const brandId = useAppSelector(state => state.credentialReducer.shop?.id);

    const optionsSizes: SelectProps['options'] = useMemo(() =>
        arraySizes.map(item => { return { label: item.name, value: item.id } }), []);

    const optionsColors: SelectProps['options'] = useMemo(() =>
        arrayColors.map(item => { return { label: item.name, value: item.id } }), []);

    const handleChangeSelectColor = (value: string[]) => {
        let tmp: DefaultOptionType[] = [];
        value.forEach(el => {
            optionsColors.forEach(element => {
                if (el === element.value) tmp.push(element);
            });
        });
        setColors(tmp);
    };

    const handleChangeSelectSizes = (value: string[]) => {
        let tmp: DefaultOptionType[] = [];
        value.forEach(el => {
            optionsSizes.forEach(element => {
                if (el === element.value) tmp.push(element);
            });
        });
        setSizes(tmp);
    };

    const handleChangeSelectGender = (value: string) => {
        optionsGender.forEach(element => {
            if (value === element.value) setGender(element);
        });
    };

    const sendHandler = () => {
        axios.postForm(
            `https://teaching-perfect-antelope.ngrok-free.app/api/v1/bns/shop/${brandId ?? 1}/products`,
            {
                file: brandLogo,
                product: {
                    name: name,
                    description: description,
                    price: price,
                    gender: gender,
                    colors: colors,
                    sizes: sizes
                }
            }
        ).finally(() => {
            refetch();
            close();
        })
    }

    return (
        <Space style={{ width: '100%' }} direction="vertical">
            <UploadBox file={brandLogo} onLoad={setBrandLogo} />
            <Input
                placeholder="Введите название"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input
                placeholder="Введите цену"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            />
            <TextArea
                rows={4}
                showCount
                placeholder="Введите описание (максимум 1000 символов)"
                maxLength={1000}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />

            <p>Выберите гендер:</p>
            <Select
                style={{ width: '60%' }}
                allowClear
                placeholder="Выберите гендер"
                onChange={handleChangeSelectGender}
                options={optionsGender}
            />

            <p>Выберите цвета:</p>
            <Select
                mode="multiple"
                style={{ width: '60%' }}
                allowClear
                placeholder="Выберите цвета"
                onChange={handleChangeSelectColor}
                options={optionsColors}
            />

            <p>Выберите доступные размеры:</p>
            <Select
                mode="multiple"
                style={{ width: '60%' }}
                allowClear
                placeholder="Выберите размеры"
                onChange={handleChangeSelectSizes}
                options={optionsSizes}
            />
            <Button onClick={sendHandler}>Добавить товар</Button>
        </Space>
    )
}

export default CreateItem;