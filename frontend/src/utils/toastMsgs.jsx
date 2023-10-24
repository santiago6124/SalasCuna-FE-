import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function updateData(text) {
    toast.success(`${text}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false,
        transition: Slide,
    });
}

export function deletingData(text) {
    toast.error(`${text}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false,
        transition: Slide,
    });
}

export function warningData(text) {
    toast.warn(`${text}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false,
        transition: Bounce,
    });
}

export function toastLoading(text, ref) {
    ref.current = toast.loading(`${text}`,
        {
            toastId: "custom-id-yes",
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            transition: Zoom,
            pauseOnFocusLoss: false,
            closeButton: false
        })
}

export function toastUpdateSuccess(text, ref) {
    toast.update(ref.current,
        {
            render: `${text}`,
            type: "success",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            icon: "✔️",
            isLoading: false,
            transition: Flip
        });
}

export function toastUpdateError(text, ref) {
    toast.update(ref.current,
        {
            render: `${text}`,
            type: "error",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            icon: "✖️",
            isLoading: false,
            transition: Flip
        });
}