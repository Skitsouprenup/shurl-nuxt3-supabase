import useIpGeolocation from "~/composables/useIpGeolocation";

export default defineEventHandler(async (event) => {

  const request = event.node.req;
  const payload = await readBody(event);
  let geoData:unknown;

  if(!request) {
    throw new Error("Invalid Request");
  }

  if (request.method === 'POST') {
    let data:unknown;
    
    const config = useRuntimeConfig();

    if(payload?.userAgent && payload?.ip) {
      geoData = useIpGeolocation(payload?.ip);
    }

    return { content: geoData, success: true };
  }

  return { success: true };

});