import { Toast } from "toastify-react-native";


const Toaster = {
    info: (message: string) => Toast.info(message),
    error: (message: string) => Toast.error(message),
    success: (message: string) => Toast.success(message),
}

export default Toaster;