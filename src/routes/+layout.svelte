<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { user } from '$lib/stores'; 
</script>

{#if $page.url.pathname === '/login' || $page.url.pathname === '/'}
  
  <slot />

{:else}

  <div class="app-container">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-icon">LMS</div>
        <span class="brand-text">Khwarizmi</span>
      </div>

      <div class="menu-group">
        <small>OVERVIEW</small>
        <nav>
          <a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>
            <span class="icon">📊</span> Dashboard
          </a>
          <a href="/courses" class:active={$page.url.pathname.startsWith('/courses')}>
            <span class="icon">💻</span> Lesson
          </a>
          <a href="/assignments" class:active={$page.url.pathname === '/assignments'}>
            <span class="icon">📝</span> Task
          </a>
          <a href="/schedule" class:active={$page.url.pathname === '/schedule'}>
            <span class="icon">👥</span> Group
          </a>
        </nav>
      </div>

      <div class="menu-group mt-auto">
        <div class="mini-profile">
          <img src={$user.avatar} alt="me">
          <div class="mini-info">
            <strong>{$user.name}</strong>
            <span>{$user.role}</span>
          </div>
        </div>
        <nav>
          <a href="/profile" class:active={$page.url.pathname === '/profile'}>
            <span class="icon">⚙️</span> Setting
          </a>
          <a href="/login" class="logout">
            <span class="icon">🚪</span> Logout
          </a>
        </nav>
      </div>
    </aside>

    <main class="main-area">
      {#key $page.url.pathname}
        <div class="page-transition" in:fade={{ duration: 300 }}>
          <slot />
        </div>
      {/key}
    </main>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  :global(body) { margin: 0; font-family: 'Poppins', sans-serif; background: #F3F4F6; color: #1F2937; }
  .app-container { display: flex; height: 100vh; overflow: hidden; }
  .sidebar { width: 260px; background: white; padding: 30px; display: flex; flex-direction: column; gap: 30px; border-right: 1px solid #E5E7EB; flex-shrink: 0; }
  .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .logo-icon { width: 35px; height: 35px; background: #F97316; border-radius: 10px; display: grid; place-items: center; color: white; font-size: 1.2rem; }
  .brand-text { font-size: 1.5rem; font-weight: 700; color: #111827; }
  .menu-group small { color: #9CA3AF; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 15px; display: block; }
  nav { display: flex; flex-direction: column; gap: 8px; }
  nav a { text-decoration: none; padding: 12px 0; color: #6B7280; font-weight: 500; font-size: 0.95rem; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
  nav a:hover, nav a.active { color: #F97316; font-weight: 600; }
  nav a.active { border-right: 3px solid #F97316; }
  .icon { font-size: 1.1rem; width: 24px; text-align: center; }
  .mt-auto { margin-top: auto; }
  .logout { color: #EF4444; } .logout:hover { color: #DC2626; }
  .mini-profile { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px; background: #FFF7ED; border-radius: 12px; }
  .mini-profile img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid white; }
  .mini-info { display: flex; flex-direction: column; }
  .mini-info strong { font-size: 0.85rem; color: #1F2937; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
  .mini-info span { font-size: 0.7rem; color: #F97316; font-weight: 600; }
  .main-area { flex: 1; overflow-y: auto; padding: 30px; }
  .page-transition { height: 100%; }
</style>