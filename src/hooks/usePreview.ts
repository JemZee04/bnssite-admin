import { useState, useEffect } from "react";

export const usePreview = (file: File | null | string) => {

    const [preview, setPreview] = useState<ArrayBuffer | null | string>(null);

    useEffect(() => {
        if (typeof file === 'string') {
            const clearPath = file
                .split('')
                .map(symbol => symbol === '\\' ? '/' : symbol)
                .join('');
            setPreview(`http://localhost:8080/storage?path=${clearPath}`);
        }
        else if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file!);
            reader.onloadend = () => setPreview(reader.result)
        }
        else {
            setPreview(null);
        }
    }, [file])

    return preview;
}