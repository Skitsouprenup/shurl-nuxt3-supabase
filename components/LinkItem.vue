<script lang="ts" setup>
  const props = defineProps<{
    link: {
      shortKey: string,
      longUrl: string,
      clicksCount: number,
      id: string
    }
  }>();

  const config = useRuntimeConfig();

  const copyShortenLink = () => {
    navigator.clipboard.writeText(`${config.public.baseUrl}${props.link.shortKey}`);
    alert("Shorten link copied to clipboard!");
  }
</script>

<template>
  <div 
    class="p-2 px-4 flex gap-2 card-color-primary"
  >
    <div class="flex flex-col gap-2 flex-1">
      <NuxtLink :to="`/dashboard/${link.shortKey}`">
        <h3 class="text-xl font-semibold text-amber-400">{{ link.shortKey }}</h3>
      </NuxtLink>
      <p class="text-stone-400">
        {{ link.longUrl.substring(0, 20) + "..." }}
      </p>
    </div>

    <div      
      class="flex gap-4 items-center justify-center rounded-full"
    >

      <div class="flex gap-1 justify-center items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-8 h-8"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
        </svg>

        <p class="text-2xl">
          {{ link.clicksCount }}
        </p>
      </div>

      <button
        @click="copyShortenLink"
        class="flex items-center justify-center cursor-pointer
        rounded-full bg-amber-400 w-[50px] h-[50px]"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-6 h-6"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
      </button>
    </div>

  </div>
</template>