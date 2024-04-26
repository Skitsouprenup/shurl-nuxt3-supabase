<script lang="ts" setup>
  import type { Database } from '~/types/supabase';

  const { id } = useRoute().params;
  const clicks = ref<Array<Record<string, unknown>> | null | undefined>(null);

  const { data } = useAsyncData(id.toString(), async () => {
    const client = useSupabaseClient<Database>();

    //This query means that select one row in links
    //and clicks where short_key is equal to param id
    const linkData = await client.from('links').
    select('*, clicks(*)').
    eq("short_key", id).
    single();

    clicks.value = linkData.data?.clicks;
    return linkData.data;
  });


</script>

<template>
  <div class="container p-3 flex flex-col gap-8">
    <div
      class="flex flex-col gap-1"
    >
      <h1
        class="text-4xl font-semibold mt-8 text-amber-500"
      >
        {{ data?.short_key }}
      </h1>

      <p class="text-stone-500">
        {{ new Date(data?.created_at as string).toLocaleString() }}
      </p>
    </div>

    <div class="flex gap-2">
      <div class="p-2 px-4 flex flex-col gap-2 card-color-primary">
        <h2 class="text-4xl">
          {{ data?.clicks_count }}
        </h2>
        <p class="text-stone-300">Total Clicks</p>
      </div>

      <div class="flex justify-center items-stretch">
        <div class="flex flex-col gap-2 card-color-primary justify-center p-2">
          <div>
            <p class="text-stone-300">Long URL</p>
            <p 
              class="py-2 whitespace-nowrap max-w-[300px] overflow-x-auto"
            >
              {{ data?.long_url }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">

      <div class="flex flex-col gap-2" v-if="data?.clicks">
        <p class="text-xl">Clicks Log</p>
        <div 
          v-for="click in data?.clicks" 
          :key="click?.id.toString()"
          class="p-2 px-4 flex flex-col gap-2 card-color-primary"
        >
          <p class="text-2xl">
            <span class="text-stone-300">Country: </span>  
            {{ click?.country as string + ' ' + click?.country_emoji as string }}
          </p>
          <p class="text-stone-400">
            {{ new Date(click?.created_at as string).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>