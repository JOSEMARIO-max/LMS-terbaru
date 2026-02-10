<script lang="ts">
  // 1. IMPORT COMPONENT UTAMA
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Hero from "$lib/components/landing/Hero.svelte";
  import Categories from "$lib/components/landing/Categories.svelte";
  import Features from "$lib/components/landing/Features.svelte";
  import Pricing from "$lib/components/landing/Pricing.svelte";
  import CallToAction from "$lib/components/landing/CallToAction.svelte";
  import Footer from "$lib/components/landing/Footer.svelte";
  
  // 2. IMPORT FITUR TAMBAHAN (Loading & Internship)
  import LoadingScreen from "$lib/components/landing/LoadingScreen.svelte";
  import Internship from "$lib/components/landing/internship.svelte";
  
  // 3. IMPORT CSS
  import "./landing.css";
</script>

<svelte:head>
  <title>Khwarizmi Academy - Level Up Your Skill!</title>
  <meta name="description" content="Platform edukasi teknologi no.1 di Indonesia. Master Tech & Values bersama mentor ahli." />
</svelte:head>

<div class="landing-page flex min-h-screen flex-col bg-white font-sans antialiased">
  
  <LoadingScreen />

  <Navbar />

  <main>
    <Hero />

    <Categories />

    <Features />

    <Pricing />

    <CallToAction />

    <Internship />
  </main>

  <Footer />
</div>

<style>
  /* Global smooth scroll */
  :global(html) {
    scroll-behavior: smooth;
  }

  /* Mencegah scroll horizontal yang tidak diinginkan */
  :global(body) {
    overflow-x: hidden;
  }
</style>