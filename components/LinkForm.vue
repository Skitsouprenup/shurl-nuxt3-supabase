<script lang="ts" setup>
import { nanoid } from 'nanoid/non-secure';
import type { Database } from '~/types/supabase';

  const client = useSupabaseClient<Database>();
  //Get authenticated user
  const user = useSupabaseUser();

  const emit = defineEmits(['created']);

  const form = reactive({
    longUrl: '',
    shortKey: ''
  });

  const createShortKey = (len:number=6) => {
    form.shortKey = nanoid(len);
  }

  onMounted(() => {
    createShortKey(10);
  });

  const submitLinkForm = async () => {
    try {
      const {data, error} = await client.from('links').insert({
        long_url: form.longUrl,
        short_key: form.shortKey,
        user_id: user.value?.id
      });

      if(error) {
        alert(error.message);
        return;
      }
      
      createShortKey(10);
      form.longUrl = '';
      alert("Short Link Created!");

      emit('created');
    }
    catch(e) {
      console.error(e)
    }
  };
</script>

<template>
  <div 
    class="p-2 px-4 flex gap-6 card-color-primary"
  >
    <div class="flex flex-col gap-2 flex-1">
      <label htmlFor="url">Long URL</label>
      <input
        v-model="form.longUrl"
        type="text" 
        id="url" 
        placeholder="URL"
        class="p-2 text-md rounded-md bg-amber-500/15 w-full"
      />
    </div>

    <div class="flex flex-col gap-2 flex-1">
      <label htmlFor="short-key">Short Key</label>
      <input
        disabled
        v-model="form.shortKey"
        type="text" 
        id="short-key" 
        placeholder="Key"
        class="p-2 text-md rounded-md bg-amber-500/15 w-full"
      />
    </div>

    <div class="flex flex-col-reverse max-w-[8rem] w-[8rem]">
      <button
        @click="submitLinkForm"
        class="w-full p-2 rounded-2xl font-semibold btn-color-primary"
      >
        Short URL
      </button>
    </div>
  </div>
</template>