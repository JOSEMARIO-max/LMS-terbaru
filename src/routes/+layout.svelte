<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { user } from "$lib/stores";
  import { onMount } from "svelte";

  // --- LOGIC RESPONSIVE & TOGGLE ---
  let isSidebarOpen = true; // Default untuk Server Side Rendering
  let isMobile = false;

  // Cek ukuran layar saat komponen dimuat (Client Side)
  onMount(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024; // Batas breakpoint (bisa disesuaikan)
      // Jika mobile, default tertutup. Jika desktop, default terbuka.
      if (isMobile) {
        isSidebarOpen = false;
      } else {
        isSidebarOpen = true;
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // Khusus Mobile: Tutup sidebar jika klik menu/pindah halaman
  $: if (isMobile && $page.url.pathname) {
    isSidebarOpen = false;
  }
</script>

{#if $page.url.pathname === "/login" || $page.url.pathname === "/"}
  <slot />
{:else}
  <div class="app-container">
    {#if isMobile && isSidebarOpen}
      <div class="overlay" transition:fade={{ duration: 200 }} on:click={toggleSidebar} role="button" tabindex="0"></div>
    {/if}

    <aside class="sidebar" class:closed={!isSidebarOpen} class:mobile={isMobile}>
      <div class="brand">
        <div class="logo-icon">LMS</div>
        <span class="brand-text">Khwarizmi</span>
      </div>

      <div class="menu-group">
        <small>OVERVIEW</small>
        <nav>
          <a href="/dashboard" class:active={$page.url.pathname === "/dashboard"}>
            <span class="icon">📊</span> Dashboard
          </a>
          <a href="/courses" class:active={$page.url.pathname.startsWith("/courses")}>
            <span class="icon">💻</span> Lesson
          </a>
          <a href="/assignments" class:active={$page.url.pathname === "/assignments"}>
            <span class="icon">📝</span> Task
          </a>
          <a href="/schedule" class:active={$page.url.pathname === "/schedule"}>
            <span class="icon">👥</span> Group
          </a>
        </nav>
      </div>

      <div class="menu-group mt-auto">
        <div class="mini-profile">
          <img src={$user.avatar} alt="me" />
          <div class="mini-info">
            <strong>{$user.name}</strong>
            <span>{$user.role}</span>
          </div>
        </div>
        <nav>
          <a href="/profile" class:active={$page.url.pathname === "/profile"}>
            <span class="icon">⚙️</span> Setting
          </a>
          <a href="/login" class="logout">
            <span class="icon">🚪</span> Logout
          </a>
        </nav>
      </div>
    </aside>

    <main class="main-area">
      <header class="top-bar">
        <div class="left-bar">
          <button class="hamburger" on:click={toggleSidebar}> ☰ </button>
          {#if !isSidebarOpen || isMobile}
            <span class="mobile-brand" transition:fade>LMS Khwarizmi</span>
          {/if}
        </div>
      </header>

      <div class="content-wrapper">
        {#key $page.url.pathname}
          <div class="page-transition" in:fade={{ duration: 300 }}>
            <slot />
          </div>
        {/key}
      </div>
    </main>
  </div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

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
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-right: 1px solid #e5e7eb;
    flex-shrink: 0;

    /* Transisi Halus untuk Lebar (Desktop) & Posisi (Mobile) */
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 50;

    /* Agar konten tidak 'penyet' saat sidebar mengecil */
    white-space: nowrap;
    overflow: hidden;
  }

  /* LOGIKA CLOSE SIDEBAR (DESKTOP) */
  .sidebar.closed {
    width: 0;
    padding-left: 0;
    padding-right: 0;
    border-right: none;
    opacity: 0; /* Efek fading */
  }

  /* LOGIKA SIDEBAR MOBILE */
  .sidebar.mobile {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 280px;
    opacity: 1; /* Reset opacity di mobile */
    /* Mobile pakai transform biar performa tinggi */
    transform: translateX(0);
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);
  }
  .sidebar.mobile.closed {
    width: 280px; /* Lebar tetap, cuma digeser */
    transform: translateX(-100%);
    padding: 30px; /* Reset padding */
  }

  /* --- BRAND & MENU --- */
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    height: 40px;
  }
  .logo-icon {
    width: 35px;
    height: 35px;
    background: #f97316;
    border-radius: 10px;
    display: grid;
    place-items: center;
    color: white;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .brand-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }

  .menu-group small {
    color: #9ca3af;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 15px;
    display: block;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  nav a {
    text-decoration: none;
    padding: 12px 0;
    color: #6b7280;
    font-weight: 500;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: 0.2s;
    border-radius: 8px;
  }
  nav a:hover,
  nav a.active {
    color: #f97316;
    font-weight: 600;
  }
  nav a.active {
    background: #fff7ed;
    padding-left: 10px;
  }

  .icon {
    font-size: 1.1rem;
    width: 24px;
    text-align: center;
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
    padding-left: 10px;
  }

  .mini-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding: 10px;
    background: #fff7ed;
    border-radius: 12px;
  }
  .mini-profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    flex-shrink: 0;
  }
  .mini-info {
    display: flex;
    flex-direction: column;
  }
  .mini-info strong {
    font-size: 0.85rem;
    color: #1f2937;
  }
  .mini-info span {
    font-size: 0.7rem;
    color: #f97316;
    font-weight: 600;
  }

  /* --- MAIN AREA & STICKY HEADER --- */
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    background: #f3f4f6;
  }

  /* HEADER STICKY MEWAH */
  .top-bar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;

    /* Efek Glassmorphism */
    background: rgba(243, 244, 246, 0.85); /* Transparan */
    backdrop-filter: blur(12px); /* Blur konten di belakangnya */
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
  }

  .mobile-brand {
    font-weight: 700;
    font-size: 1.1rem;
    color: #111827;
  }

  .content-wrapper {
    padding: 0 30px 30px 30px;
    flex: 1;
  }
  .page-transition {
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
    backdrop-filter: blur(3px);
  }

  /* MEDIA QUERY */
  @media (max-width: 768px) {
    .top-bar {
      padding: 15px 20px;
    }
    .content-wrapper {
      padding: 0 20px 20px 20px;
    }
    .hamburger {
      border: none;
      background: transparent;
      font-size: 1.5rem;
      width: auto;
      padding: 0;
    }
    .hamburger:hover {
      box-shadow: none;
    }
  }
</style>
