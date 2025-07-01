import Endpoints from '../Configs/endpoints.json';
import OpenWeather from '../Configs/apiKey.json';
import axios from 'axios';

interface Params {
  latitude: number | null;
  longitude: number | null;
}

async function GetFourDayWeatherForecast({ latitude, longitude }: Params) {

  const options = {
    method: 'GET',
    url: Endpoints.baseURI + Endpoints.getFiveDays,
    params: {
      latitude: latitude,
      longitude: longitude,
      lang: 'EN'
    },
    headers: {
      'x-rapidapi-key': OpenWeather.key,
      'x-rapidapi-host': OpenWeather.host
    }
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    const reqSuccess = response.status == 200;
    if (reqSuccess) {
      return { status: reqSuccess, resp: response.data };
    } else {
      return { status: reqSuccess, statusCode: response.status, statusMsg: response.statusText };
    };
  } catch (error) {
    console.error(error);
  };
};

export default GetFourDayWeatherForecast;