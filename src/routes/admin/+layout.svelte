<script lang="ts">
  import { page } from "$app/state";
  import { fade, fly } from "svelte/transition";
  import SidebarLink from "$lib/components/SidebarLink.svelte";

  // --- SVELTE 5 STATE ---
  let isSidebarOpen = $state(true);
  let isMobile = $state(false);

  const pageTitle = $derived.by(() => {
    const path = page.url.pathname;
    if (path === "/admin") return "Admin Overview";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/content")) return "Content Manager";
    if (path.includes("/sales")) return "Sales Analytics";
    if (path.includes("/settings")) return "System Settings";
    if (path.includes("/zoom")) return "Zoom Management";
    return "Admin Console";
  });

  // --- LOGIC RESPONSIVE ---
  $effect(() => {
    const checkScreen = () => {
      isMobile = window.innerWidth < 1024;
      if (isMobile) isSidebarOpen = false;
      else isSidebarOpen = true;
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class="flex h-screen overflow-hidden bg-[#F8FAFC] font-plus antialiased text-slate-900">
  {#if isMobile && isSidebarOpen}
    <div class="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-md" transition:fade={{ duration: 200 }} onclick={toggleSidebar}></div>
  {/if}

  <aside
    class="bg-white border-r border-slate-200/60 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col
    {isMobile ? 'fixed inset-y-0 left-0 shadow-2xl' : 'relative'}
    {isSidebarOpen ? 'w-72' : 'w-24'} 
    {isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}"
  >
    <div class="h-20 flex items-center px-7 shrink-0 overflow-hidden">
      <div class="w-10 h-10 flex items-center justify-center shrink-0">
        <img src="/logo.webp" alt="Logo" class="w-full h-full object-contain" />
      </div>

      {#if isSidebarOpen}
        <div class="ml-4 flex flex-col leading-tight whitespace-nowrap" transition:fade>
          <span class="text-base font-black tracking-tighter text-slate-800 uppercase italic">Khwarizmi</span>
          <span class="text-[10px] font-bold text-[#0D9488] uppercase tracking-[0.3em]">Console v4</span>
        </div>
      {/if}
    </div>

    <div class="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
      <div>
        {#if isSidebarOpen}
          <p class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-60 italic" in:fade>Menu Utama</p>
        {/if}
        <nav class="space-y-2">
          <SidebarLink href="/admin" icon="📊" label="Dashboard" {isSidebarOpen} active={page.url.pathname === "/admin"} />
          <SidebarLink href="/admin/users" icon="👥" label="Siswa" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/users")} />
          <SidebarLink href="/admin/content" icon="📁" label="Kursus" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/content")} />
          <SidebarLink href="/admin/zoom" icon=" 📹" label="Zoom" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/zoom")} />
        </nav>
      </div>

      <div>
        {#if isSidebarOpen}
          <p class="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-60 italic" in:fade>Laporan</p>
        {/if}
        <nav class="space-y-2">
          <SidebarLink href="/admin/sales" icon="💰" label="Keuangan" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/sales")} />
          <SidebarLink href="/admin/settings" icon="⚙️" label="Setelan" {isSidebarOpen} active={page.url.pathname.startsWith("/admin/settings")} />
        </nav>
      </div>
    </div>

    <div class="p-6">
      <div class="rounded-3xl bg-slate-50 p-2 border border-slate-100">
        <SidebarLink href="/login" icon="🚪" label="Logout" {isSidebarOpen} isLogout />
      </div>
    </div>
  </aside>

  <main class="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
    <header class="h-20 flex items-center px-8 lg:px-12 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-30 justify-between border-b border-slate-100/50">
      <div class="flex items-center gap-6">
        <button
          onclick={toggleSidebar}
          class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0D9488] hover:border-[#14B8A6]/30 hover:shadow-lg hover:shadow-teal-50 transition-all active:scale-90 cursor-pointer shadow-sm"
        >
          <span class="text-xl font-bold">{isSidebarOpen && isMobile ? "✕" : "☰"}</span>
        </button>

        <div class="flex flex-col">
          <h2 class="font-black text-slate-900 text-xl tracking-tight leading-none uppercase italic">{pageTitle}</h2>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Workspace</span>
            <span class="text-[10px] text-slate-300">/</span>
            <span class="text-[10px] font-black text-[#14B8A6] uppercase tracking-widest italic">{pageTitle.split(" ")[0]}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 lg:gap-8">
  <div class="hidden md:flex flex-col text-right">
    <p class="text-[11px] font-black text-slate-900 leading-none uppercase tracking-tighter italic">Luthfi Hakim</p>
    <p class="text-[10px] font-bold text-emerald-500 uppercase mt-1 tracking-widest flex items-center justify-end gap-1">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
      Online
    </p>
  </div>
  
  <a 
    href="/admin/settings" 
    class="w-12 h-12 rounded-[1.25rem] bg-slate-900 flex items-center justify-center font-black text-white shadow-xl shadow-slate-200 border-2 border-white group cursor-pointer hover:border-[#14B8A6] hover:scale-105 transition-all no-underline"
  >
    LH
  </a>
</div>
    </header>

    <div class="flex-1 overflow-y-auto px-8 lg:px-12 pb-12">
      <div class="max-w-[1400px] mx-auto w-full">
        {#key page.url.pathname}
          <div in:fly={{ y: 20, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="mt-6">
            <slot />
          </div>
        {/key}
      </div>
    </div>
  </main>
</div>

<style>
  :global(.custom-scrollbar::-webkit-scrollbar) {
    width: 5px;
  }
  :global(.custom-scrollbar::-webkit-scrollbar-thumb) {
    background: #cbd5e1;
    border-radius: 10px;
  }
  :global(body) {
    background-color: #f8fafc;
  }
</style>
