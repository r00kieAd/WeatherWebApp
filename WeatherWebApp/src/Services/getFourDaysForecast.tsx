import Endpoints from '../Configs/endpoints.json';
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
      'x-rapidapi-key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
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