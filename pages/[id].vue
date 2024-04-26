<script lang="ts" setup>
import type { Database } from '~/types/supabase';

  const params = useRoute().params;
  const client = useSupabaseClient<Database>();
  const config = useRuntimeConfig();

  if(!params.id) {
    throw createError({
      statusCode: 404,
      message: 'Not Found'
    });
  }

  const linkData = useAsyncData("link", async () => {
    const { data, error } = await client.
    from("links").
    select("*").
    eq("short_key", params.id).
    single();

    if(error) {
      throw createError({
        statusCode: 404,
        message: 'Not Found'
      });
    }

    return data;
  });

  onBeforeMount(async () => {
    if(linkData.data.value?.long_url) {

      const agent = await useUserAgent();

      if(agent && agent.ip) {
        
        const { data } = await useFetch(
          `${config.public.baseUrl}api/ipgeo`,
          {
            method: 'POST',
            body: agent
          }
        );
        let fetched = data.value as Record<string, unknown>;
        fetched = fetched?.content as Record<string, unknown>;
        //console.log(fetched?.countryEmoji + ' | ' + fetched?.country);

        const {error} = await client.from('clicks').insert({
          link_id: linkData.data.value.id,
          ip_addr: agent.ip,
          country: fetched?.country as string,
          country_emoji: fetched?.countryEmoji as string,
          user_agent: agent.userAgent,
        });

        if(error) {
          console.error(error);
        }

        useExternalRedirect(linkData.data.value.long_url, 302);
      }
    }
  })

</script>

<template>
  <div 
    class="flex w-full justify-center items-center"
    style="height: calc(100% - 60px);"
  >
    <h2 class="text-3xl font-bold">
      Redirecting...
    </h2>
  </div>
</template>