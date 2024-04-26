import { IPGeolocationAPI } from "ip-geolocation-api-sdk-typescript";
import { GeolocationParams } from "ip-geolocation-api-sdk-typescript/GeolocationParams";

export default function useIpGeolocation(ip: string) {
  //Only use IP Geolocation on the server side.
  if(process.server) {
    const config = useRuntimeConfig();
    let data: unknown;

    let ipgeolocationApi = new IPGeolocationAPI(config.apiSecret?.ipGeoApiKey, false); 

    function handleResponse(json:Record<string, unknown>) {
      data = {
        country: json?.country_code2,
        countryEmoji: json?.country_emoji
      };
    }

    let geolocationParams = new GeolocationParams();
    geolocationParams.setIPAddress(ip);
    geolocationParams.setLang('en');

    ipgeolocationApi.getGeolocation(handleResponse, geolocationParams);

    return data;
  }
}