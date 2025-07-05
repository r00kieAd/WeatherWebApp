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
      'x-rapidapi-key': import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      'x-rapidapi-host': import.meta.env.VITE_OPEN_WEATHER_API_HOST,
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
  }  catch (error: any) {
        const axiosError = error as import("axios").AxiosError;
        const message =
            (axiosError?.response?.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data
                ? (axiosError.response.data as { message?: string }).message
                : undefined) ||
            axiosError?.message ||
            "Something went wrong";

        return {
            status: false,
            statusCode: axiosError?.response?.status || 500,
            statusMsg: message,
        };
    }
};

export default GetFourDayWeatherForecast;