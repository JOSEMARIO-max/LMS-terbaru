<script>
  // Import Component Navbar (yang sudah ada sebelumnya)
  import Navbar from "$lib/components/navbar/Navbar.svelte";

  // Import Component Landing Page Sections
  import Hero from "$lib/components/landing/Hero.svelte";
  import Partners from "$lib/components/landing/Partners.svelte";
  import Categories from "$lib/components/landing/Categories.svelte";
  import Features from "$lib/components/landing/Features.svelte";
  import Pricing from "$lib/components/landing/Pricing.svelte";
  import CallToAction from "$lib/components/landing/CallToAction.svelte";
  import Footer from "$lib/components/landing/Footer.svelte";

  // Import CSS Halaman Utama (Tetap di sini agar ter-apply ke semua child component)
  import "./landing.css";
</script>

<div class="landing-page">
  <Navbar />
  <Hero />
  <!-- <Partners /> -->
  <Categories />
  <Features />
  <Pricing />
  <CallToAction />
  <Footer />
</div>
