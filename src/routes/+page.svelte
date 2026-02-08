<script lang="ts">
  // 1. IMPORT COMPONENT (Hasil Refactor Svelte 5)
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Hero from "$lib/components/landing/Hero.svelte";
  import Categories from "$lib/components/landing/Categories.svelte";
  import Features from "$lib/components/landing/Features.svelte";
  import Pricing from "$lib/components/landing/Pricing.svelte";
  import CallToAction from "$lib/components/landing/CallToAction.svelte";
  import Footer from "$lib/components/landing/Footer.svelte";
</script>

<svelte:head>
  <title>Khwarizmi Academy - Level Up Your Skill!</title>
  <meta name="description" content="Platform edukasi teknologi no.1 di Indonesia. Master Tech & Values bersama mentor ahli." />
</svelte:head>

<div class="flex min-h-screen flex-col bg-white font-sans antialiased">
  <Navbar />

  <main>
    <Hero />

    <Categories />

    <Features />

    <Pricing />

    <CallToAction />
  </main>

  <Footer />
</div>

<style>
  /* Global smooth scroll untuk navigasi id (#features, #pricing, dll) */
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Memastikan tidak ada tumpahan horizontal karena animasi split */
  :global(body) {
    overflow-x: hidden;
  }
</style>
