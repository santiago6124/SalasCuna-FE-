import { toast, Slide, Zoom, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function loadingData() {
    toast.info('Cargando la información', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });
}

export function updateData() {
    toast.success('Actualizado con éxito!', {
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

export function deletingData() {
    toast.error('Desactivado con éxito!', {
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
            autoClose: 3000,
            closeButton: true
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