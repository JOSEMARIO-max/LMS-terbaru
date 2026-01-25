<script lang="ts">
  import { page } from "$app/stores";
  import { fade, slide } from "svelte/transition";
  import { user } from "$lib/stores"; // Pastikan store ini ada isinya
  import { onMount } from "svelte";

  // --- LOGIC RESPONSIVE & TOGGLE ---
  let isSidebarOpen = true;
  let isMobile = false;

  // Cek ukuran layar (Client Side)
  onMount(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      // Mobile default tutup, Desktop default buka
      isSidebarOpen = !isMobile;
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // Auto close sidebar di mobile saat pindah halaman
  $: if (isMobile && $page.url.pathname) {
    isSidebarOpen = false;
  }

  // Tentukan halaman yang TANPA Sidebar (Landing & Login)
  $: isPublicPage = ["/", "/login", "/register"].includes($page.url.pathname);
</script>

<svelte:head>
  <title>Khwarizmi Academy</title>
  <meta name="description" content="Platform belajar IT terbaik di Indonesia" />
</svelte:head>

{#if isPublicPage}
  <slot />
{:else}
  <div class="app-container">
    {#if isMobile && isSidebarOpen}
      <div class="overlay" transition:fade={{ duration: 200 }} on:click={toggleSidebar} role="button" tabindex="0"></div>
    {/if}

    <aside class="sidebar" class:closed={!isSidebarOpen} class:mobile={isMobile}>
      <div class="brand-sidebar">
        <div class="logo-sq">
          <img src="/logo.jpg" alt="Logo" />
        </div>
        {#if isSidebarOpen || isMobile}
          <div class="brand-text" transition:fade>
            <span class="text-primary">Khwarizmi</span>
            <span class="text-secondary">Academy</span>
          </div>
        {/if}
      </div>

      <div class="menu-group">
        <small class:hide-text={!isSidebarOpen && !isMobile}>OVERVIEW</small>
        <nav>
          <a href="/dashboard" class:active={$page.url.pathname === "/dashboard"}>
            <span class="icon">📊</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Dashboard</span>
          </a>
          <a href="/courses" class:active={$page.url.pathname.startsWith("/courses")}>
            <span class="icon">💻</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Lesson</span>
          </a>
          <a href="/assignments" class:active={$page.url.pathname === "/assignments"}>
            <span class="icon">📝</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Task</span>
          </a>
          <a href="/schedule" class:active={$page.url.pathname === "/schedule"}>
            <span class="icon">👥</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Group</span>
          </a>
        </nav>
      </div>

      <div class="menu-group mt-auto">
        {#if $user}
          <div class="mini-profile">
            <img src={$user.avatar || "https://ui-avatars.com/api/?name=User"} alt="me" />
            <div class="mini-info" class:hide-text={!isSidebarOpen && !isMobile}>
              <strong>{$user.name || "Student"}</strong>
              <span>{$user.role || "Member"}</span>
            </div>
          </div>
        {/if}

        <nav>
          <a href="/profile" class:active={$page.url.pathname === "/profile"}>
            <span class="icon">⚙️</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Setting</span>
          </a>
          <a href="/logout" class="logout">
            <span class="icon">🚪</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Logout</span>
          </a>
        </nav>
      </div>
    </aside>

    <main class="main-area">
      <header class="top-bar">
        <div class="left-bar">
          <button class="hamburger" on:click={toggleSidebar}>
            {isSidebarOpen && isMobile ? "✕" : "☰"}
          </button>

          {#if !isSidebarOpen || isMobile}
            <span class="mobile-brand-title" transition:fade>Dashboard</span>
          {/if}
        </div>
      </header>

      <div class="content-wrapper">
        {#key $page.url.pathname}
          <div class="page-transition" in:fade={{ duration: 300, delay: 100 }}>
            <slot />
          </div>
        {/key}
      </div>
    </main>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background: #f3f4f6;
    color: #1f2937;
  }

  .app-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  /* --- SIDEBAR --- */
  .sidebar {
    width: 260px;
    background: white;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-right: 1px solid #e5e7eb;
    flex-shrink: 0;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 50;
    white-space: nowrap;
    overflow-x: hidden; /* Penting untuk animasi collapse */
  }

  /* LOGIKA CLOSE SIDEBAR (DESKTOP): Mengecil, bukan hilang */
  .sidebar.closed {
    width: 90px; /* Lebar saat collapsed */
    padding: 25px 15px; /* Padding disesuaikan */
  }

  /* Helper class untuk menyembunyikan teks saat collapsed */
  .hide-text {
    display: none;
    opacity: 0;
  }

  /* LOGIKA SIDEBAR MOBILE */
  .sidebar.mobile {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 280px;
    transform: translateX(0);
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);
  }

  .sidebar.mobile.closed {
    width: 280px;
    transform: translateX(-100%); /* Geser keluar layar */
  }

  /* --- BRAND SIDEBAR (Konsisten dengan Landing) --- */
  .brand-sidebar {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 50px;
    margin-bottom: 10px;
    overflow: hidden; /* Jaga-jaga */
  }

  .logo-sq {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-sq img {
    width: 65%;
    height: 100%;
    object-fit: cover;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .text-primary {
    font-weight: 800;
    font-size: 1.1rem;
    color: #111827;
  }

  .text-secondary {
    font-weight: 600;
    font-size: 0.75rem;
    color: #f97316;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* --- MENU STYLES --- */
  .menu-group small {
    color: #9ca3af;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 15px;
    display: block;
    padding-left: 10px; /* Align dengan text menu */
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  nav a {
    text-decoration: none;
    padding: 12px 15px; /* Padding kiri kanan */
    color: #6b7280;
    font-weight: 500;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: 0.2s;
    border-radius: 12px;
    height: 48px; /* Tinggi pasti agar ikon center */
  }

  nav a:hover,
  nav a.active {
    color: #f97316;
    font-weight: 600;
    background: #fff7ed;
  }

  .icon {
    font-size: 1.2rem;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .mt-auto {
    margin-top: auto;
  }

  .logout {
    color: #ef4444;
  }
  .logout:hover {
    color: #dc2626;
    background: #fef2f2;
  }

  /* --- MINI PROFILE --- */
  .mini-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 10px;
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 12px;
    overflow: hidden;
  }

  .mini-profile img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .mini-info {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  }
  .mini-info strong {
    font-size: 0.9rem;
    color: #1f2937;
  }
  .mini-info span {
    font-size: 0.75rem;
    color: #f97316;
    font-weight: 600;
  }

  /* --- MAIN AREA --- */
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    background: #f3f4f6;
  }

  .top-bar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    background: rgba(243, 244, 246, 0.8);
    backdrop-filter: blur(12px);
  }

  .left-bar {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .hamburger {
    background: white;
    border: 1px solid #e5e7eb;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    color: #374151;
    display: grid;
    place-items: center;
    transition: 0.2s;
  }

  .hamburger:hover {
    border-color: #f97316;
    color: #f97316;
  }

  .mobile-brand-title {
    font-weight: 700;
    font-size: 1.1rem;
    color: #111827;
  }

  .content-wrapper {
    padding: 0 30px 30px 30px;
    flex: 1;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 45;
    backdrop-filter: blur(2px);
  }

  /* MEDIA QUERY MOBILE */
  @media (max-width: 768px) {
    .top-bar {
      padding: 15px 20px;
    }
    .content-wrapper {
      padding: 0 20px 20px 20px;
    }
    .hamburger {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      padding: 0;
      width: auto;
      justify-content: flex-start;
    }
  }
</style>
