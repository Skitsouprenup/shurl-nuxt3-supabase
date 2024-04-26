export default defineNuxtRouteMiddleware((to, from) => {
  //Get the user info from the authentication used in supabase.
  const user = useSupabaseUser();

  //If user doesn't exist
  if(!user.value) {
    //Redirect to 'auth' page
    return navigateTo('/auth');
  }
});