import React from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'


type LoadButtonProps = {
    isLoading: boolean
}

export const LoadButton: React.FC<LoadButtonProps> = ({ isLoading }) => {

    return (
        <button style={{ border: 0, background: 'none' }} type="button">
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

}