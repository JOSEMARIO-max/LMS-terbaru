<script>
  // Import CSS terpisah
  import "./navbar.css";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="navbar">
  <div class="container nav-wrapper">
    <div class="brand">
      <div class="logo-sq">LMS</div>
      <span>Khwarizmi.</span>
    </div>

    <div class="nav-links">
      <a href="#mentors">Mentor</a>
      <a href="#categories">Kategori</a>
      <a href="#features">Fitur</a>
      <a href="#pricing">Harga</a>
    </div>

    <div class="nav-actions">
      <button class="hamburger" on:click={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <div class="desktop-auth">
        <a href="/login" class="btn-login">Masuk</a>
        <a href="/login" class="btn-register">Daftar Gratis</a>
      </div>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu">
      <a href="#categories" on:click={toggleMenu}>Kategori</a>
      <a href="#features" on:click={toggleMenu}>Fitur</a>
      <a href="#mentors" on:click={toggleMenu}>Mentor</a>
      <div class="mobile-auth">
        <a href="/login" class="btn-login">Masuk</a>
        <a href="/login" class="btn-register-mobile">Daftar Sekarang</a>
      </div>
    </div>
  {/if}
</nav>
