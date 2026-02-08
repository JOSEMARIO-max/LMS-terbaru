<script lang="ts">
  /**
   * Menggunakan Svelte 5 $props untuk menangkap data dari layout.
   */
  let { href, icon, label, isSidebarOpen, active = false, isLogout = false } = $props();
</script>

<a
  {href}
  class="group flex items-center gap-4 h-12 px-3.5 rounded-xl font-bold transition-all duration-200 whitespace-nowrap
  {active ? 'bg-orange-50 text-orange-600 shadow-sm shadow-orange-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-orange-500'}
  {isLogout ? 'mt-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600' : ''}"
>
  <span class="text-xl shrink-0 w-6 flex justify-center transition-transform group-hover:scale-110">
    {icon}
  </span>

  {#if isSidebarOpen}
    <span class="text-sm tracking-tight transition-opacity duration-300" aria-hidden={!isSidebarOpen}>
      {label}
    </span>
  {/if}

  {#if !isSidebarOpen}
    <div class="absolute left-16 scale-0 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:scale-100 transition-all z-50">
      {label}
    </div>
  {/if}
</a>

<style>
  /* Menghilangkan dekorasi link default */
  a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
</style>
