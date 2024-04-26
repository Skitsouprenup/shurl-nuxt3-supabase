# shurl-nuxt3-supabase
A Simple and responsive URL shortener created using Nuxt3, Supabase and TailwindCSS.

I have a demo video of this project in this [link](https://youtu.be/J1OWqJ_fdfU)

# Technologies Used
* **Typescript**
* **Nuxt3**
* **Supabase**
* **TailwindCSS**

# Features
Github and email/password authentication via supabase authentication.  
Data storage using supabase.  
Supabase function and trigger in click count.  
Home page.  
Dashboard.  
Link details page.  
IP Geolocation using `https://ipgeolocation.io`.  
`ipify.org` for getting IP address on the client side.  
URL shortener.

# Testing this project
If you wanna test this project, You need to add these environment variables:

**SUPABASE_URL** -> go to your supabase project and then `Project Settings->API->Project URL`  
**SUPABASE_KEY** -> go to your supabase project and then `Project Settings->API->Project API Keys` and then get the first key not the key with 'secret' tag.  
**BASE_URL** -> Base URL e.g. `http://example.com`.  
**IP_GELOCATION_API_KEY** -> go to `https://ipgeolocation.io` then go to dashboard and get the API key there.