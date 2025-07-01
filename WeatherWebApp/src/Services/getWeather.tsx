import Endpoints from '../Configs/endpoints.json';
import OpenWeather from '../Configs/apiKey.json';
import axios from 'axios';

interface Params {
    latitude: number | null;
    longitude: number | null;
}

async function GetWeatherByLatLon({ latitude, longitude }: Params) {

    const options = {
        method: 'GET',
        url: Endpoints.baseURI + Endpoints.getByLatLon,
        params: {
            latitude: latitude,
            longitude: longitude,
        },
        headers: {
            'x-rapidapi-key': OpenWeather.key,
            'x-rapidapi-host': OpenWeather.host
        }
    };

    try {
        const response = await axios.request(options);
        const reqSuccess = response.status == 200;
        if (reqSuccess) {
            return { status: reqSuccess, resp: response.data };
        } else {
            return { status: reqSuccess, statusCode: response.status, statusMsg: response.statusText };
        };
    } catch (error) {
        return { status: false, statusCode: 500, statusMsg: error };
    };
};

export default GetWeatherByLatLon;