import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function updateData() {
    toast.success('Actualizado con éxito!', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false
    });
}

export function loadingData() {
    toast.error('Desactivado con éxito!', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false
        });
}