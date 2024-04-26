export default function useExternalRedirect (url: string, code:number) {

  //This regex means url must start with http:// or https://
  if(/^(https?:\/\/)/.test(url) == false) {
    throw new Error("Invalid URL!");
  }

  //Check if a component is on the server side.
  if(process.server) {
    //Get runtime context of nuxt app
    const nuxtApp = useNuxtApp();

    //ssrContext is a context that's only available
    //on server side. 'ssrContext.event' is an event that
    //Access the request & response of the current route.
    //If there's an event, it means that we're in the process
    //of routing.
    if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      //Call app:redirected hook which is a built-in hook
      //of nuxt. This hook is executed before server redirects
      //to another page.
      return nuxtApp.callHook('app:redirected').then(() => {
        //Check if ssrContext and ssrContext.event exist.
        //sendRedirect() doesn't want an undefined event.
        if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
          return sendRedirect(nuxtApp.ssrContext?.event, url, code);
        }
      });
    }
  }
  //If component is on the client side
  else {
    window.location.href = url;
    return;
  }

  //If something went wrong on server side.
  throw new Error("Something went wrong! Can't redirect to destination!");
}