import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';

type LatLong = {
    latitude: number,
    longitude: number,
}

const getLatLong = (): Promise<LatLong> => {
    return new Promise((resolve, reject) => {
        const onSuccess = (position: GeolocationResponse) => {
            const {latitude, longitude} = position.coords;
            resolve({latitude, longitude});
        };
        const onError = (error: GeolocationError) => {
            reject(error);
        }

        Geolocation.getCurrentPosition(onSuccess, onError);
    })
}

export const Location = {
    getLatLong,
}