import { showToastable } from 'react-native-toastable';

const Toaster = {
    info: (message: string) => showToastable({message, status: 'info'}),
    error: (message: string) => showToastable({message, status: 'danger'}),
    success: (message: string) => showToastable({message, status: 'success'}),
}

export default Toaster;