import { showToastable } from 'react-native-toastable';
import { CONSTS } from '../constants';

const Toaster = {
    info: (message: string) => showToastable({message, status: 'info', messageColor: CONSTS.COLOR.INFO}),
    error: (message: string) => showToastable({message, status: 'danger'}),
    success: (message: string) => showToastable({message, status: 'success', messageColor: CONSTS.COLOR.SUCCESS}),
}

export default Toaster;