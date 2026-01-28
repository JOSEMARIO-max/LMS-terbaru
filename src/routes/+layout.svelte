<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { user, isPremium } from "$lib/stores"; // Mengambil status premium dari store.js
  import { onMount } from "svelte";

  let isSidebarOpen = true;
  let isMobile = false;

  onMount(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      // Default tertutup di mobile, terbuka di desktop
      isSidebarOpen = !isMobile;
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // Tutup sidebar otomatis di mobile saat pindah halaman
  $: if (isMobile && $page.url.pathname) {
    isSidebarOpen = false;
  }

  // Halaman public tanpa sidebar
  $: isPublicPage = ["/", "/login", "/register"].includes($page.url.pathname);
</script>

<svelte:head>
  <title>Khwarizmi Academy | Dashboard</title>
</svelte:head>

{#if isPublicPage}
  <slot />
{:else}
  <div class="app-container">
    
    {#if isMobile && isSidebarOpen}
      <div 
        class="overlay" 
        transition:fade={{ duration: 200 }} 
        on:click={toggleSidebar} 
        on:keydown={(e) => e.key === 'Enter' && toggleSidebar()}
        role="button" 
        tabindex="0"
        aria-label="Close sidebar"
      ></div>
    {/if}

    <aside class="sidebar" class:closed={!isSidebarOpen} class:mobile={isMobile}>
      
      <div class="brand-sidebar">
        <div class="logo-sq">
          <img src="/logo.jpg" alt="Logo" />
        </div>
        {#if isSidebarOpen || isMobile}
          <div class="brand-text" transition:fade={{ duration: 150 }}>
            <span class="text-primary">KHWARIZMI</span>
            <span class="text-secondary">Academy</span>
          </div>
        {/if}
      </div>

      <div class="menu-scrollable">
        
        <div class="menu-group">
          <small class:hide-text={!isSidebarOpen && !isMobile}>UTAMA</small>
          <nav>
            <a href="/dashboard" class:active={$page.url.pathname === "/dashboard"}>
              <span class="icon">📊</span>
              <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Overview</span>
            </a>
            
            <a href="/lesson" class:active={$page.url.pathname.startsWith("/lesson")}>
              <span class="icon">📖</span>
              <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Pelajaran</span>
            </a>

            <a href="/courses" class:active={$page.url.pathname.startsWith("/courses")}>
              <span class="icon">💻</span>
              <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Kursus IT</span>
            </a>
          </nav>
        </div>

        <div class="menu-group">
          <small class:hide-text={!isSidebarOpen && !isMobile}>AKADEMIK</small>
          <nav>
            <a href="/assignments" class:active={$page.url.pathname === "/assignments"}>
              <span class="icon">📝</span>
              <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Tugas</span>
            </a>
            <a href="/schedule" class:active={$page.url.pathname === "/schedule"}>
              <span class="icon">👥</span>
              <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Komunitas</span>
            </a>
          </nav>
        </div>

      </div>

      <div class="sidebar-footer">
        {#if $user}
          <div class="mini-profile">
            <div class="avatar-wrapper">
              <img src={$user.avatar || "https://ui-avatars.com/api/?name=User"} alt="me" />
              <div class="online-indicator"></div>
            </div>
            <div class="mini-info" class:hide-text={!isSidebarOpen && !isMobile}>
              <strong>{$user.name || "Student"}</strong>
              <span>{$isPremium ? "Premium Member" : "Regular Member"}</span>
            </div>
          </div>
        {/if}

        <nav>
          <a href="/profile" class="setting-link" class:active={$page.url.pathname === "/profile"}>
            <span class="icon">⚙️</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Pengaturan</span>
          </a>
          <a href="/login" class="logout-btn">
            <span class="icon">🚪</span>
            <span class="label" class:hide-text={!isSidebarOpen && !isMobile}>Keluar</span>
          </a>
        </nav>
      </div>
    </aside>

    <main class="main-area">
      <header class="top-bar">
        <div class="left-bar">
          <button class="hamburger" on:click={toggleSidebar} aria-label="Toggle Sidebar">
            {#if isSidebarOpen && isMobile} ✕ {:else} ☰ {/if}
          </button>
          
          {#if !isSidebarOpen || isMobile}
            <span class="mobile-brand-title" transition:fade>
               {#if $page.url.pathname === '/dashboard'} Overview
               {:else if $page.url.pathname === '/lesson'} Pelajaran Saya
               {:else if $page.url.pathname === '/courses'} Katalog Kursus
               {:else if $page.url.pathname === '/profile'} Profil Pengguna
               {:else} Menu Utama {/if}
            </span>
          {/if}
        </div>
      </header>

      <div class="content-wrapper">
        {#key $page.url.pathname}
          <div class="page-transition" in:fade={{ duration: 300, delay: 50 }}>
            <slot />
          </div>
        {/key}
      </div>
    </main>

  </div>
{/if}

<style>
  /* FONT UTAMA */
  @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

  :global(body) {
    margin: 0;
    font-family: "Plus Jakarta Sans", sans-serif;
    background: #f8fafc;
    color: #0f172a;
    overflow-x: hidden; /* Mencegah scroll horizontal */
  }

  .app-container { display: flex; height: 100vh; overflow: hidden; position: relative; }

  /* --- SIDEBAR BASE --- */
  .sidebar {
    width: 260px; /* Ukuran standar */
    background: #ffffff;
    padding: 25px 15px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e2e8f0;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    flex-shrink: 0;
  }

  .sidebar.closed { width: 80px; padding: 25px 10px; }

  /* --- BRAND --- */
  .brand-sidebar { 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    padding-left: 8px; 
    margin-bottom: 30px; 
    height: 45px;
    overflow: hidden; /* Mencegah teks bocor */
  }

  /* PERBAIKAN UKURAN LOGO DISINI */
  .logo-sq {
    width: 20px; /* Diubah dari 40px menjadi 32px */
    height: 32px; /* Diubah dari 40px menjadi 32px */
    border-radius: 5px; /* Radius disesuaikan sedikit */
    overflow: hidden;
    flex-shrink: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f1f5f9;
  }
  .logo-sq img { width: 100%; height: 100%; object-fit: cover; }

  .brand-text { display: flex; flex-direction: column; justify-content: center; white-space: nowrap; }
  .text-primary { font-weight: 800; font-size: 1rem; color: #1e293b; line-height: 1.; }
  .text-secondary { font-weight: 600; font-size: 0.75rem; color: #f97316; letter-spacing: 1px; }

  /* --- MENU LIST --- */
  .menu-scrollable { flex: 1; overflow-y: auto; overflow-x: hidden; }
  
  .menu-group { margin-bottom: 25px; }
  .menu-group small { 
    color: #94a3b8; 
    font-size: 0.7rem; 
    font-weight: 800; 
    letter-spacing: 1px; 
    margin: 0 0 10px 12px; 
    display: block; 
    white-space: nowrap;
  }

  nav a {
    text-decoration: none;
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;
    border-radius: 12px;
    margin-bottom: 4px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748b;
    transition: all 0.2s ease;
    white-space: nowrap; /* Mencegah teks turun baris */
  }

  nav a:hover { color: #f97316; background: #fff7ed; }
  nav a.active { color: #f97316; background: #fff7ed; }

  .icon { 
    font-size: 1.25rem; 
    width: 24px; 
    text-align: center; 
    flex-shrink: 0; /* Icon jangan mengecil */
  }

  /* --- FOOTER --- */
  .sidebar-footer { padding-top: 15px; border-top: 1px solid #f1f5f9; margin-top: auto; }
  
  .mini-profile { 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    padding: 10px; 
    background: #f8fafc; 
    border-radius: 14px; 
    margin-bottom: 15px; 
    overflow: hidden;
  }
  .avatar-wrapper { position: relative; flex-shrink: 0; }
  .mini-profile img { width: 38px; height: 38px; border-radius: 10px; border: 2px solid white; }
  .online-indicator { position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; background: #22c55e; border: 2px solid white; border-radius: 50%; }

  .mini-info { display: flex; flex-direction: column; white-space: nowrap; }
  .mini-info strong { font-size: 0.9rem; color: #1e293b; }
  .mini-info span { font-size: 0.7rem; color: #64748b; }

  .logout-btn { color: #e11d48 !important; }
  .logout-btn:hover { background: #fff1f2 !important; }

  /* --- MAIN CONTENT --- */
  .main-area { flex: 1; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; }
  
  .top-bar { 
    padding: 15px 30px; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    position: sticky; 
    top: 0; 
    z-index: 30; 
    background: rgba(248, 250, 252, 0.85); 
    backdrop-filter: blur(8px); 
  }
  
  .left-bar { display: flex; align-items: center; gap: 15px; }
  .hamburger { 
    width: 40px; 
    height: 40px; 
    border-radius: 10px; 
    border: 1px solid #e2e8f0; 
    background: white; 
    cursor: pointer; 
    color: #64748b; 
    font-size: 1.2rem;
    display: grid; 
    place-items: center; 
    transition: 0.2s;
  }
  .hamburger:hover { border-color: #cbd5e1; color: #1e293b; }
  
  .mobile-brand-title { font-weight: 700; font-size: 1.1rem; color: #1e293b; }

  .content-wrapper { padding: 10px 30px 40px 30px; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box; }

  /* --- UTILITY --- */
  .hide-text { display: none !important; }
  .overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); z-index: 40; }

  /* --- MOBILE RESPONSIVE --- */
  .sidebar.mobile { position: fixed; top: 0; left: 0; height: 100%; width: 260px; box-shadow: 4px 0 20px rgba(0,0,0,0.05); }
  .sidebar.mobile.closed { transform: translateX(-100%); }

  @media (max-width: 768px) {
    .top-bar { padding: 15px 20px; }
    .content-wrapper { padding: 0 20px 30px 20px; }
  }
</style>