import Endpoints from '../Configs/endpoints.json';
import axios from 'axios';

interface Params {
    cityName: string | undefined
}

async function GetWeather ({ cityName }: Params) {

    const options = {
        method: 'GET',
        url: Endpoints.getByCity,
        params: {
            city: cityName ?? 'new york',
            lang: 'EN'
        },
        headers: {
            'x-rapidapi-key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}