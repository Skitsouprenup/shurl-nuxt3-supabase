interface UserAgentDetails {
  userAgent: string;
  ip?: string;
}

export async function useUserAgent(): Promise<UserAgentDetails>{
  if(process.server) {
    const nuxtApp = useNuxtApp();

    if(nuxtApp.ssrContext) {
      //Get request object
      const request = nuxtApp.ssrContext?.event.node.req;

      if(request) {
        //IP address can be in x-forwarder-for header or in the socket.remoteAddress.
        //x-forwarded-for returns an array.
        const ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
        const userAgent = request.headers["user-agent"] || "";

        return {
          userAgent,
          ip: typeof ip === 'string' ? ip : ip?.[0]
        }
      }

    }
  }
  else {
    const getIpOnClientSide = async () => {
      const data = (await fetch('https://api.ipify.org?format=json')).json()
      //console.log(await data);
      return await data;
    }
    const ipData = await getIpOnClientSide();
    return {
      userAgent: navigator.userAgent,
      ip: ipData?.ip
    }
  }

  //If something went wrong on server side.
  throw new Error("Something went wrong! User agent can't be accessed!");
}