<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
  <section 
    class="grid place-content-center"
    style="height: calc(100% - 60px)"
  >
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl font-semibold leading-loose heading">
        Quickly shorten your links and share it around the world with shURL!
      </h1>

      <p class="text-stone-500">
        Create a short link that can be easily shared with others!
      </p>
    </div>

    <div class="mx-auto" v-if="user">
      <NuxtLink 
        to="/dashboard"
        class="relative top-8 p-4 rounded-2xl font-semibold btn-color-primary"
      >
        Go to Dashboard
      </NuxtLink>
    </div>
  </section>
</template>

<style>
  .heading {
    background: linear-gradient(white 10%, red 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>