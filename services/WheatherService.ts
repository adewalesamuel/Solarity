import { Wheather } from '../core/entities/Wheather';
import { Api } from './Api';

const HOST_URL = 'https://api.open-meteo.com/v1/forecast'
const ENDPOINT = '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m&daily=weather_code&timezone=auto&past_days=3&models=meteofrance_seamless';

const getAll = (params: any, signal: AbortSignal): Promise<Wheather> => {
    const {latitude, longitude} = params;
    return Api._get(`?latitude=${latitude}&longitude=${longitude}${ENDPOINT}`, signal, HOST_URL) as Promise<Wheather>;
}

export const WeatherService = {
    getAll,
}