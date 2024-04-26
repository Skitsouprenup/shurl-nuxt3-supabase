<script lang="ts" setup>
  import type { Database } from '~/types/supabase';

  //Apply middleware
  definePageMeta({
    middleware: 'auth'
  });

  const client = useSupabaseClient<Database>();
  //Get authenticated user
  const user = useSupabaseUser();

  const { data, refresh } = useAsyncData("links", async () => {
    const { data, error } = await client.
    from("links").
    select("*").
    eq("user_id", user.value?.id as string);

    return data;
  })

</script>

<template>
  <div class="container p-3 flex flex-col gap-8">
    <h1
      class="text-2xl font-semibold mt-8"
    >
      Dashboard
    </h1>

    <LinkForm @created="refresh"/>

    <div class="flex flex-col gap-4">
      <LinkItem
        v-for="link in data"
        :key="link.id"
        :link="{
          shortKey: link.short_key,
          longUrl: link.long_url || '',
          clicksCount: link.clicks_count || 0,
          id: link.id.toString()
        }"
      />
    </div>
  </div>
</template>