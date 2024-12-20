import { showToastable } from 'react-native-toastable';
import { CONSTS } from '../constants';

const info = (message: string) => {
    showToastable(
        {
            message,
            status: 'info',
            messageColor: CONSTS.COLOR.INFO,
        }
    );
}

const success = (message: string) => {
    showToastable(
        {
            message,
            status: 'success',
            messageColor: CONSTS.COLOR.SUCCESS,
        }
    );
}

const error = (message: string) => {
    showToastable({message, status: 'danger'});
}

const Toaster = {
    info,
    error,
    success,
}

export default Toaster;