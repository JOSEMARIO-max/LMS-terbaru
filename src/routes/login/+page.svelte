<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";

  // --- SVELTE 5 RUNES ---
  let email = $state("");
  let password = $state("");
  let isLoading = $state(false);

  function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      goto("/user");
    }, 1500);
  }
</script>

<svelte:head><title>Login | Khwarizmi Academy</title></svelte:head>

<div class="min-h-screen w-full bg-[#fff7ed] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-orange-100">
  <div class="absolute top-0 left-0 w-96 h-96 bg-orange-200/20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
  <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 blur-[100px] translate-x-1/2 translate-y-1/2"></div>

  <a href="/" class="absolute top-8 left-8 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 shadow-sm border border-slate-100 transition-all hover:-translate-x-1 hover:text-orange-600 z-50">
    <span>←</span> Back to Home
  </a>

  <div class="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
    <div class="hidden lg:block space-y-8" in:fade={{ duration: 600 }}>
      <div class="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo" class="h-12 w-auto rounded-xl shadow-sm" />
        <div class="flex flex-col leading-none">
          <span class="text-xl font-black text-slate-900 tracking-tight">KHWARIZMI</span>
          <span class="text-sm font-bold text-orange-500 uppercase tracking-widest">Academy</span>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-2xl font-semibold text-slate-500">Assalamualaikum! 👋</h3>
        <h1 class="text-7xl font-black leading-[1.05] tracking-tighter text-slate-900">
          Join The <br />Learning <span class="text-orange-500 italic">Revolution.</span>
        </h1>
        <p class="text-lg text-slate-500 leading-relaxed max-w-md">Akses ribuan materi pembelajaran, tugas, dan mentor profesional hanya dalam satu akun terintegrasi.</p>
      </div>
    </div>

    <div class="flex justify-center lg:justify-end" in:fly={{ y: 20, duration: 800 }}>
      <div class="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-orange-900/5 border border-white/50">
        <div class="text-center mb-10">
          <h3 class="text-3xl font-black text-slate-900 mb-2">Welcome Back</h3>
          <p class="text-slate-400 text-sm font-medium">Masukkan akunmu untuk mulai belajar.</p>
        </div>

        <form onsubmit={handleLogin} class="space-y-4">
          <div class="space-y-1">
            <input
              type="email"
              placeholder="Email Address"
              bind:value={email}
              class="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
              required
            />
          </div>
          <div class="space-y-1">
            <input
              type="password"
              placeholder="Password"
              bind:value={password}
              class="w-full px-6 py-4 rounded-full bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
              required
            />
          </div>

          <div class="text-right">
            <a href="/forgot" class="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">Lupa Password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            class="w-full bg-orange-500 py-4 rounded-full text-white font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none"
          >
            {isLoading ? "Processing..." : "Login Now"}
          </button>
        </form>

        <div class="relative my-8 text-center">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
          <span class="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">OR</span>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <button class="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-full font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all">
            <span class="text-red-500">G</span> Google
          </button>
          <button class="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-full font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all">
            <span class="text-blue-600">f</span> Facebook
          </button>
        </div>

        <p class="text-center text-sm font-medium text-slate-400">
          Don't have an account? <a href="/register" class="text-orange-600 font-bold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  </div>
</div>
