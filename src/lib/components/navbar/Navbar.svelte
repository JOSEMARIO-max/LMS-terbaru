<script lang="ts">
  /* Di Svelte 5, kita menggunakan $state untuk reaktivitas.
     Gunakan onclick={() => ...} sebagai pengganti on:click.
  */
  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="sticky top-0 z-50 border-b border-gray-100 bg-white/90 py-4 backdrop-blur-md">
  <div class="container mx-auto flex items-center justify-between px-6">
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 overflow-hidden rounded-xl shadow-sm">
        <img src="/logo.jpg" alt="Khwarizmi Academy Logo" class="h-full w-full object-cover" />
      </div>
      <div class="flex flex-col leading-tight sm:flex-row sm:gap-1.5 text-xl font-extrabold tracking-tight">
        <span class="text-kh-teal">Khwarizmi</span> <span class="text-[#f67d26]">Academy</span>
      </div>
    </div>

    <div class="hidden gap-8 font-medium text-gray-600 lg:flex">
      <a href="#mentors" class="transition-colors hover:text-kh-orange">Mentor</a>
      <a href="#categories" class="transition-colors hover:text-[#f67d26]">Kategori</a>
      <a href="#features" class="transition-colors hover:text-[#f67d26]">Fitur</a>
      <a href="#pricing" class="transition-colors hover:text-[#f67d26]">Harga</a>
    </div>

    <div class="flex items-center gap-4">
      <button class="grid h-10 w-10 place-items-center rounded-lg bg-gray-50 text-2xl lg:hidden" onclick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div class="hidden items-center gap-6 lg:flex">
        <a href="/login" class="font-bold text-gray-700 hover:text-[#f67d26]">Masuk</a>
        <a href="/login" class="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#f67d26] hover:shadow-lg hover:shadow-orange-200"> Daftar Gratis </a>
      </div>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="absolute top-full left-0 flex w-full flex-col gap-4 border-b border-gray-100 bg-white p-6 shadow-xl lg:hidden">
      <div class="flex flex-col gap-4 font-semibold text-gray-700">
        <a href="#categories" onclick={toggleMenu} class="p-2">Kategori</a>
        <a href="#features" onclick={toggleMenu} class="p-2">Fitur</a>
        <a href="#mentors" onclick={toggleMenu} class="p-2">Mentor</a>
      </div>

      <hr class="border-gray-50" />

      <div class="flex flex-col gap-3">
        <a href="/login" class="rounded-xl p-3 text-center font-bold text-gray-700">Masuk</a>
        <a href="/login" class="rounded-xl bg-[#f67d26] p-4 text-center font-bold text-white shadow-md"> Daftar Sekarang </a>
      </div>
    </div>
  {/if}
</nav>

<style>
  /* Anda tetap bisa menggunakan .container bawaan CSS Anda 
     atau menggunakan utility mx-auto dari Tailwind.
  */
  .container {
    max-width: 1140px;
  }
</style>
