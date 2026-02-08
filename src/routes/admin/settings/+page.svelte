<script lang="ts">
  import { fade, slide, scale, fly } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast"; // Import Toast

  // --- SVELTE 5 STATE (RUNES) ---
  let siteName = $state("Khwarizmi Academy");
  let siteEmail = $state("support@khwarizmi.ac");
  let maintenanceMode = $state(false);

  // Modal & Form State
  let isCouponModalOpen = $state(false);
  let newCoupon = $state({ code: "", discount: "10%", limit: 100 });

  let coupons = $state([
    { id: 1, code: "NEWYEAR2026", discount: "20%", limit: 50, used: 12, status: "Active" },
    { id: 2, code: "PROMOFEB", discount: "15%", limit: 100, used: 85, status: "Active" },
    { id: 3, code: "FLASHDEAL", discount: "50%", limit: 10, used: 10, status: "Expired" },
  ]);

  // Fungsi Create Coupon dengan Loading Toast
  async function saveNewCoupon() {
    if (!newCoupon.code) return toast.error("Kode kupon tidak boleh kosong!");

    const myToast = toast.loading("Membuat kupon baru...");

    // Simulasi loading API
    setTimeout(() => {
      coupons = [
        {
          id: Date.now(),
          code: newCoupon.code.toUpperCase(),
          discount: newCoupon.discount,
          limit: newCoupon.limit,
          used: 0,
          status: "Active",
        },
        ...coupons,
      ];

      toast.success("Kupon berhasil diaktifkan!", { id: myToast });
      isCouponModalOpen = false;
      newCoupon = { code: "", discount: "10%", limit: 100 }; // Reset form
    }, 1500);
  }

  // Fungsi Save Settings dengan Loading Toast
  function handleSave() {
    const saveToast = toast.loading("Menyimpan pengaturan...");

    setTimeout(() => {
      toast.success("Sistem berhasil diperbarui!", {
        id: saveToast,
        icon: "🚀",
      });
    }, 1200);
  }

  function toggleMaintenance() {
    maintenanceMode = !maintenanceMode;
    if (maintenanceMode) {
      toast.error("Mode Maintenance Aktif!", { duration: 3000 });
    } else {
      toast.success("Platform kembali online!", { duration: 3000 });
    }
  }
</script>

<Toaster />

<div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 pb-20 font-plus antialiased text-slate-700 mt-8">
  <main class="space-y-8">
    <section class="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-8">
      <div class="flex items-center gap-4 border-b border-slate-50 pb-6">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-sm">⚙️</div>
        <div>
          <h3 class="text-lg font-black text-slate-900 leading-none">General Settings</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Konfigurasi identitas platform</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Site Name</label>
          <input
            type="text"
            bind:value={siteName}
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Support Email</label>
          <input
            type="email"
            bind:value={siteEmail}
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group transition-all hover:border-amber-200 hover:bg-amber-50/30">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm group-hover:rotate-12 transition-transform">🛠️</div>
          <div>
            <h4 class="text-sm font-black text-slate-900 leading-none">Maintenance Mode</h4>
            <p class="text-[10px] font-bold text-slate-400 uppercase mt-2 italic">Kunci akses publik sementara</p>
          </div>
        </div>
        <button onclick={toggleMaintenance} class="w-14 h-8 rounded-full transition-all relative {maintenanceMode ? 'bg-amber-500 shadow-lg shadow-amber-200' : 'bg-slate-300'}">
          <div class="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all {maintenanceMode ? 'left-7' : 'left-1'}"></div>
        </button>
      </div>

      <div class="flex justify-end pt-4">
        <button onclick={handleSave} class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"> Save All Changes </button>
      </div>
    </section>

    <section class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
      <div class="p-8 flex justify-between items-center border-b border-slate-50 bg-white">
        <div>
          <h3 class="font-black text-slate-900 text-lg italic">Marketing Coupons</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Kelola kode promosi & diskon</p>
        </div>
        <button
          onclick={() => (isCouponModalOpen = true)}
          class="text-[10px] font-black text-white bg-indigo-600 px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-95 cursor-pointer">+ Create New</button
        >
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th class="px-8 py-5 border-b border-slate-100 italic">Promo Code</th>
              <th class="px-6 py-5 border-b border-slate-100">Discount</th>
              <th class="px-6 py-5 border-b border-slate-100">Usage Progress</th>
              <th class="px-8 py-5 text-right border-b border-slate-100">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each coupons as c (c.id)}
              <tr in:fade class="group hover:bg-indigo-50/30 transition-all">
                <td class="px-8 py-5">
                  <span class="font-mono text-sm font-black text-indigo-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm group-hover:border-indigo-300 transition-all">{c.code}</span>
                </td>
                <td class="px-6 py-5 text-sm font-black text-slate-700">{c.discount}</td>
                <td class="px-6 py-5">
                  <div class="flex flex-col gap-2 w-40">
                    <div class="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      <span>{c.used} / {c.limit} used</span>
                      <span class="text-indigo-600 italic">{Math.round((c.used / c.limit) * 100)}%</span>
                    </div>
                    <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                      <div class="h-full bg-indigo-500 rounded-full transition-all duration-1000" style="width: {(c.used / c.limit) * 100}%"></div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-5 text-right">
                  <span
                    class="inline-block px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm {c.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-rose-50 text-rose-600 border-rose-100'}"
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <aside class="space-y-8 sticky top-24 h-fit">
    <div class="bg-white border border-slate-200 p-8 rounded-[2.5rem] space-y-6 shadow-sm">
      <h3 class="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] opacity-40">Site Branding</h3>
      <div class="aspect-square bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 group hover:border-indigo-400 transition-all cursor-pointer relative">
        <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">🖼️</div>
        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-6 leading-relaxed italic">Drop logo <br /> here to update</span>
        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>

    <div class="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-200">
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/10">🛡️</div>
        <div>
          <h4 class="font-black text-sm uppercase tracking-widest leading-none italic">Security Hub</h4>
          <p class="text-[10px] text-indigo-300 font-bold mt-2 opacity-80 uppercase tracking-tighter italic">Status: Fully Protected</p>
        </div>
      </div>
      <div class="space-y-3 relative z-10 pt-4 border-t border-white/5">
        <button class="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic"> Purge Cache </button>
        <button class="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:bg-indigo-500 active:scale-95"> Backup DB </button>
      </div>
    </div>
  </aside>
</div>

{#if isCouponModalOpen}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" transition:fade onclick={() => (isCouponModalOpen = false)}></div>

    <div class="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-[110] shadow-2xl border border-white" in:fly={{ y: 50, duration: 400 }} out:scale={{ start: 0.9, duration: 200 }}>
      <div class="text-center space-y-2 mb-8">
        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto shadow-sm italic font-black mb-4">%</div>
        <h3 class="text-2xl font-black text-slate-900 italic tracking-tight">Create Coupon</h3>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tambahkan promo diskon baru</p>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kupon Code</label>
          <input
            type="text"
            bind:value={newCoupon.code}
            placeholder="CONTOH: PROMO2026"
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-indigo-600 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all uppercase"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount</label>
            <select bind:value={newCoupon.discount} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none">
              <option value="5%">5%</option>
              <option value="10%">10%</option>
              <option value="25%">25%</option>
              <option value="50%">50%</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Limit Usage</label>
            <input type="number" bind:value={newCoupon.limit} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all" />
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button onclick={() => (isCouponModalOpen = false)} class="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"> Cancel </button>
          <button onclick={saveNewCoupon} class="flex-2 bg-slate-900 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"> Create Coupon </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
