// utils/toast.ts
import toast from "react-hot-toast";

type ToastOptions = {
    message: string;
    type: 'success' | 'error';
    durationTime: number;
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export const showToast = ({ message, type, durationTime, position }: ToastOptions) => {
    const options = {
        duration: durationTime,
        position,
        style: {
            color: "#fff",
            background: "#000",
        },
    };

    if (type === 'success') {
        toast.success(message, options);
    } else {
        toast.error(message, options);
    }
};