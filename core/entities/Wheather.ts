export interface Wheather {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    current_units: {
        time: string,
        interval: string,
        temperature_2m: string,
        relative_humidity_2m: string,
        apparent_temperature: string,
        is_day: string,
        precipitation: string,
        rain: string,
        wind_speed_10m: string,
    },
    current: {
        time: string,
        interval: number,
        temperature_2m: number,
        relative_humidity_2m: number,
        apparent_temperature: number,
        is_day: number,
        precipitation: number,
        rain: number,
        wind_speed_10m: number,
    }
    daily_units: {
        time: string,
        weather_code: string,
    },
    daily: {
        time: string[],
        wheather_code: number[],
    },
}