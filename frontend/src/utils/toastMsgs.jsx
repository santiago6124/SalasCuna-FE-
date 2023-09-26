import { toast, Slide, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function loadingData() {
    toast.info('Cargando la información', {
        position: "top-center",
        autoClose: 3000,
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
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
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
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        closeButton: false,
        transition: Slide,
    });
}