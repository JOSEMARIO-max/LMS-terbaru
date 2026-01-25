<script lang="ts">
  let y = 0;
  let splitContainer: HTMLElement | null = null;
  let splitProgress = 0;

  // Reactive statement
  $: if (splitContainer) {
    const start = splitContainer.offsetTop;
    const distance = splitContainer.offsetHeight - window.innerHeight;
    const scrolled = y - start;
    splitProgress = Math.max(0, Math.min(1, scrolled / distance));
  }
</script>

<svelte:window bind:scrollY={y} />

<section class="split-section" bind:this={splitContainer}>
  <div class="sticky-wrapper">
    <div class="hidden-content" style="opacity: {splitProgress > 0.6 ? 1 : 0}; transform: scale({0.8 + splitProgress * 0.2});">
      <div class="content-box-cta">
        <h2>Are you ready to<br />change your career?</h2>
        <p>Dunia teknologi terus berkembang. Jangan hanya jadi penonton, jadilah pemain utama di era digital ini.</p>

        <div class="cta-actions">
          <a href="/login" class="btn-pulse">LOGIN SEKARANG ➔</a>
          <small>Daftar gratis, batalkan kapan saja.</small>
        </div>
      </div>
    </div>

    <div class="door top" style="transform: translateY(-{splitProgress * 100}%)">
      <div class="door-inner">
        <h1 class="split-text">ARE YOU READY?</h1>
      </div>
    </div>

    <div class="door bottom" style="transform: translateY({splitProgress * 100}%)">
      <div class="door-inner">
        <h1 class="split-text">ARE YOU READY?</h1>
      </div>
    </div>
  </div>
</section>
