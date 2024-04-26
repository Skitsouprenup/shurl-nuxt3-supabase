<script lang="ts" setup>
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const logoutUser = async () => {
    await client.auth.signOut();

    useRouter().push({
      name: 'index'
    });
  }
</script>

<template>
  <div 
    class="fixed top-0 left-0 border-b border-white/20 w-full
    bg-gray-800/20 backdrop-blur-sm"
  >
    <nav class="container p-3 flex gap-2">
      <div class="flex items-center">
        <NuxtLink
          :to="{
            name: 'index'
          }"
          class="text-2xl font-bold text-zinc-200"
        >
          shURL
        </NuxtLink>
      </div>

      <ul class="flex gap-4 flex-row-reverse w-full items-center">
        <li v-if="!user">
          <NuxtLink 
            to="/auth"
            class="p-2 rounded-2xl btn-color-primary"
          >
            Login
          </NuxtLink>
        </li>
        <li v-else>
          <button 
            class="p-2 rounded-2xl btn-color-primary"
            @click="logoutUser"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>