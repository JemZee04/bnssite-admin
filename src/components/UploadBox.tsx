import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps, message } from "antd";
import { Blob } from "buffer";
import React, { useState } from "react";
import { usePreview } from "../hooks/usePreview";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

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

export type UploadBoxProps = {
    onLoad: (image: File) => void,
    file: File | null
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onLoad, file }) => {

    const [loading, setLoading] = useState(false);

    const image = usePreview(file ?? null);

    const handleChange: UploadProps['onChange'] = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            console.log('DONE');

            // Get this url from response in real world.
            const file = info.file.originFileObj;
            if (!file) return;
            onLoad(file);
            setLoading(false);
        }
    };

    //@ts-ignore
    const dummyRequest = async (args:  UploadRequestOption<any>) => {
        const {onSuccess} = args;
        setLoading(true);
        onSuccess("ok");
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={dummyRequest}
        >
            {image ? <img src={image.toString()} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
}