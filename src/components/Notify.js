import {toast} from 'react-toastify';

export default function Notify(type, message) {
    toast.configure({
        autoClose: 6000,
        draggable: false,

    });


    switch(type) {
        case toast.TYPE.INFO:
            toast.info(message);
            break;
        case toast.TYPE.SUCCESS:
            toast.success(message);
            break;
        case toast.TYPE.WARNING:
            toast.warn(message);
            break;
        case toast.TYPE.ERROR:
            toast.error(message);
            break;
        default:
    }
}