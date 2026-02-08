<script lang="ts">
  import { page } from "$app/state"; // Menggunakan state Svelte 5
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import "./layout.css"; // Impor Tailwind v4 global

  // --- SVELTE 5 STATE ---
  let isMobile = $state(false);

  // Derived state untuk menentukan apakah ini halaman publik (Landing, Login, Register)
  // Segala sesuatu yang TIDAK diawali dengan /user dianggap halaman publik
  const isPublicPage = $derived(!page.url.pathname.startsWith("/user"));

  $effect(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });
</script>

<svelte:head>
  <title>Khwarizmi Academy</title>
</svelte:head>

<div class="min-h-screen bg-white font-plus selection:bg-orange-100">
  {#if isPublicPage}
    <main in:fade={{ duration: 200, delay: 150 }}>
      <slot />
    </main>
  {:else}
    <slot />
  {/if}
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    /* Menghilangkan margin default browser dan menghaluskan font */
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: white; /* Background dasar aplikasi */
  }
</style>
