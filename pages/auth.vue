<script lang="ts" setup>

  const supabaseAuth = useSupabaseClient();

  const formInputs = reactive({
    email: '',
    password: ''
  });

  const credentialsFormMode = ref<String>("login");
  const errorMessage = ref<{
    message: String,
    color: String
  }>({
    message: '',
    color: ''
  });

  const credentialsFormAuth = async () => {
    if(!formInputs.email || !formInputs.password) {
      errorMessage.value = {
        message: "All fields must be filled up.",
        color: 'text-red-500'
      }
      return;
    }

    try {
      let dataError = null;

      if(credentialsFormMode.value === 'login') {
        const {data, error} = await supabaseAuth.auth.signInWithPassword({
          email: formInputs.email,
          password: formInputs.password
        });
        dataError = error

        if(data) {
          errorMessage.value = {
            message: '',
            color: ''
          }

          useRouter().push('/dashboard');
        }
      }
      else {
        const {data, error} = await supabaseAuth.auth.signUp({
          email: formInputs.email,
          password: formInputs.password
        });
        dataError = error

        if(data) {
          errorMessage.value = {
            message: 'Confirmation email has been sent!',
            color: 'text-green-300'
          }
        }
      }

      if(dataError) {
        errorMessage.value = {
          message: dataError.message,
          color: 'text-red-500'
        };
        return;
      }
    }
    catch(e) {
      console.error(e)
      errorMessage.value = {
        message: "Something went wrong!",
        color: 'text-red-500'
      }
    }
  }

  const githubAuth = () => {
    supabaseAuth.auth.signInWithOAuth({
      provider: 'github'
    })
  }
</script>

<template>
  <section class="h-screen grid place-content-center">
    <div 
      class="p-4 flex flex-col gap-4 card-color-primary"
    >
      <div class="flex justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-10 h-10"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>

      </div>

      <button
        class="p-2 rounded-2xl font-semibold btn-color-primary"
        @click="githubAuth"
      >
        Continue with Github
      </button>

      <hr class="opacity-[0.25]"/>

      <form 
        class="flex flex-col gap-4" 
        @submit.prevent="credentialsFormAuth"
      >
        <div class="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            v-model="formInputs.email"
            type="text" 
            id="email" 
            placeholder="email"
            class="p-1 text-md rounded-md bg-amber-500/15"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            v-model="formInputs.password"
            type="password" 
            id="password" 
            placeholder="Password"
            class="p-1 text-md rounded-md bg-amber-500/15"
          />
        </div>

        <!--Login-->
        <div
          class="flex flex-col gap-3"
        >
          <div class="flex flex-col gap-4 items-center">
            <button
              type="submit"
              class="w-full p-2 rounded-2xl font-semibold btn-color-primary"
            >
              {{ credentialsFormMode === 'login' ? 'Login' : 'Register' }}
            </button>

            <button
              type="button"
              class="bg-transparent w-fit h-fit hover:underline text-sm"
              @click="() => {
                credentialsFormMode === 'login' ? 
                credentialsFormMode = 'register' :
                credentialsFormMode = 'login';

                errorMessage = {
                  message: '',
                  color: ''
                }
              }"
            >
              {{ credentialsFormMode === 'login' ?
                "Don't have an account? Register here!" :
                "Have an account? Login here!"
              }}
            </button>
          </div>

          <p :class="['text-center', 'text-sm', 'text-red-500', errorMessage.color]">
            {{ errorMessage.message }}
          </p>
        </div>

      </form>
    </div>
  </section>
</template>