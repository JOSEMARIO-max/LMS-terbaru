<script lang="ts">
  import { fade, slide, scale, fly } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast";

  // --- SVELTE 5 STATE (RUNES) ---
  let siteName = $state("Khwarizmi Academy");
  let siteEmail = $state("support@khwarizmi.ac");
  let maintenanceMode = $state(false);

  // Modal & Form State
  let isCouponModalOpen = $state(false);
  let isDeleteModalOpen = $state(false); // Modal Konfirmasi Hapus
  let editingId = $state<number | null>(null);
  let deletingId = $state<number | null>(null); // ID Kupon yang akan dihapus
  let couponForm = $state({ code: "", discount: "10%", limit: 100 });

  let coupons = $state([
    { id: 1, code: "NEWYEAR2026", discount: "20%", limit: 50, used: 12, status: "Active" },
    { id: 2, code: "PROMOFEB", discount: "15%", limit: 100, used: 85, status: "Active" },
    { id: 3, code: "FLASHDEAL", discount: "50%", limit: 10, used: 10, status: "Expired" },
  ]);

  // --- FUNCTIONS: COUPON MANAGEMENT ---
  function openCreateModal() {
    editingId = null;
    couponForm = { code: "", discount: "10%", limit: 100 };
    isCouponModalOpen = true;
  }

  function openEditModal(coupon: any) {
    editingId = coupon.id;
    couponForm = { code: coupon.code, discount: coupon.discount, limit: coupon.limit };
    isCouponModalOpen = true;
  }

  // Fungsi memicu Modal Konfirmasi Hapus
  function triggerDelete(id: number) {
    deletingId = id;
    isDeleteModalOpen = true;
  }

  async function saveCoupon() {
    if (!couponForm.code) return toast.error("Kode kupon wajib diisi!");
    const t = toast.loading(editingId ? "Memperbarui data..." : "Mendaftarkan kupon...");

    setTimeout(() => {
      if (editingId) {
        coupons = coupons.map((c) => (c.id === editingId ? { ...c, ...couponForm, code: couponForm.code.toUpperCase() } : c));
        toast.success("Data berhasil diperbarui", { id: t });
      } else {
        coupons = [{ id: Date.now(), ...couponForm, code: couponForm.code.toUpperCase(), used: 0, status: "Active" }, ...coupons];
        toast.success("Kupon Khwarizmi diaktifkan!", { id: t, icon: "🎫" });
      }
      isCouponModalOpen = false;
    }, 1000);
  }

  function confirmDelete() {
    if (deletingId) {
      const target = coupons.find((c) => c.id === deletingId);
      coupons = coupons.filter((c) => c.id !== deletingId);
      toast.success(`Kupon ${target?.code} telah dihapus`, {
        icon: "🗑️",
        style: "border-radius: 12px; font-weight: bold;",
      });
      isDeleteModalOpen = false;
      deletingId = null;
    }
  }

  // --- SYSTEM FUNCTIONS ---
  function handleSaveSettings() {
    const saveToast = toast.loading("Sinkronisasi...");
    setTimeout(() => toast.success("Sistem diperbarui!", { id: saveToast }), 1000);
  }

  function runBackup() {
    const t = toast.loading("Backup DB...");
    setTimeout(() => toast.success("Database Aman!", { id: t, icon: "📦" }), 2000);
  }
</script>

<Toaster />

<div class="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 pb-20 font-plus antialiased text-slate-700 mt-8 px-4 lg:px-0">
  <main class="space-y-8">
    <section class="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm space-y-8">
      <div class="flex items-center gap-4 border-b border-slate-50 pb-8">
        <img src="/logo.webp" alt="Logo" class="w-14 h-14 rounded-2xl object-contain shadow-inner bg-[#14B8A6]/10 p-2" />

        <div>
          <h3 class="text-xl font-black text-slate-900 leading-none italic uppercase tracking-tight">System Settings</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 italic opacity-60">Identity & Environment</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Academy Name</label>
          <input
            type="text"
            bind:value={siteName}
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all italic"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Central Support</label>
          <input
            type="email"
            bind:value={siteEmail}
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#14B8A6]/10 focus:border-[#14B8A6] transition-all italic"
          />
        </div>
      </div>

      <div class="flex justify-end pt-4">
        <button onclick={handleSaveSettings} class="bg-[#14B8A6] hover:bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-100 transition-all active:scale-95 italic">
          Save Changes
        </button>
      </div>
    </section>

    <section class="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
      <div class="p-10 flex justify-between items-center border-b border-slate-50 bg-white">
        <div>
          <h3 class="font-black text-slate-900 text-lg italic uppercase tracking-tight leading-none">Marketing Promo</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest opacity-60">Kelola kupon & diskon aktif</p>
        </div>
        <button onclick={openCreateModal} class="text-[10px] font-black text-white bg-slate-900 px-8 py-3.5 rounded-xl uppercase tracking-[0.2em] hover:bg-[#14B8A6] transition-all shadow-lg active:scale-95 cursor-pointer italic"
          >+ Create Promo</button
        >
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
              <th class="px-10 py-5 border-b border-slate-100">Code</th>
              <th class="px-6 py-5 border-b border-slate-100">Value</th>
              <th class="px-6 py-5 border-b border-slate-100 text-center">Usage</th>
              <th class="px-10 py-5 text-right border-b border-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each coupons as c (c.id)}
              <tr in:fade class="group hover:bg-[#14B8A6]/5 transition-all duration-300">
                <td class="px-10 py-6 font-mono text-sm font-black text-[#0D9488] italic tracking-tighter uppercase">{c.code}</td>
                <td class="px-6 py-6 text-sm font-black text-slate-700 italic">{c.discount}</td>
                <td class="px-6 py-6">
                  <div class="w-40 mx-auto space-y-2">
                    <div class="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 italic">
                      <span>{c.used} used</span>
                      <span class="text-[#0D9488]">{Math.round((c.used / c.limit) * 100)}%</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div class="h-full bg-gradient-to-r from-[#14B8A6] to-[#0D9488] rounded-full" style="width: {(c.used / c.limit) * 100}%"></div>
                    </div>
                  </div>
                </td>
                <td class="px-10 py-6 text-right">
                  <div class="flex justify-end gap-3">
                    <button onclick={() => openEditModal(c)} class="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:border-[#14B8A6] hover:text-[#0D9488] transition-all shadow-sm active:scale-90">✏️</button>
                    <button onclick={() => triggerDelete(c.id)} class="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all shadow-sm active:scale-90">🗑️</button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <aside class="space-y-8 sticky top-24 h-fit">
    <div class="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-[#14B8A6]/20">
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#14B8A6]/20 rounded-full blur-3xl opacity-50"></div>

      <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl border border-white/10 italic">🛡️</div>
        <div>
          <h4 class="font-black text-sm uppercase tracking-widest italic opacity-90 leading-none">Security Center</h4>
          <p class="text-[10px] text-[#14B8A6] font-bold mt-2 uppercase tracking-tighter italic">Status: Fully Secured</p>
        </div>
      </div>

      <div class="space-y-4 relative z-10 pt-8 border-t border-white/5">
        <button class="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all italic opacity-60"> Purge All Cache </button>
        <button onclick={runBackup} class="w-full py-5 bg-[#F59E0B] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-orange-900/40 active:scale-95 italic">
          RUN DATABASE BACKUP
        </button>
      </div>
    </div>
  </aside>
</div>

{#if isCouponModalOpen}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-md" transition:fade onclick={() => (isCouponModalOpen = false)}></div>
    <div class="bg-white w-full max-w-md rounded-[3.5rem] p-10 relative z-[110] shadow-2xl border border-white" in:fly={{ y: 50 }} out:scale={{ start: 0.9 }}>
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-[#14B8A6]/10 text-[#0D9488] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner italic font-black">{editingId ? "✏️" : "%"}</div>
        <h3 class="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none">{editingId ? "Edit Promo" : "New Promo"}</h3>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 italic opacity-60">Atur konfigurasi kupon diskon</p>
      </div>

      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Kupon Code</label>
          <input
            type="text"
            bind:value={couponForm.code}
            class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-[#0D9488] outline-none focus:ring-4 focus:ring-[#14B8A6]/10 transition-all uppercase italic"
          />
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Discount</label>
            <select bind:value={couponForm.discount} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black outline-none focus:border-[#14B8A6] italic appearance-none">
              {#each ["5%", "10%", "25%", "50%"] as d}
                <option value={d}>{d}</option>
              {/each}
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Usage Limit</label>
            <input type="number" bind:value={couponForm.limit} class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black outline-none italic" />
          </div>
        </div>
        <div class="flex gap-4 pt-6 italic">
          <button onclick={() => (isCouponModalOpen = false)} class="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Cancel</button>
          <button onclick={saveCoupon} class="flex-2 bg-[#F59E0B] text-white rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 italic"> {editingId ? "Update Coupon" : "Create Coupon"} </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isDeleteModalOpen}
  <div class="fixed inset-0 z-[120] flex items-center justify-center p-6">
    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" transition:fade onclick={() => (isDeleteModalOpen = false)}></div>
    <div class="bg-white w-full max-w-sm rounded-[3rem] p-10 relative z-[130] shadow-2xl border border-rose-50 text-center" in:fly={{ y: 20 }} out:scale={{ start: 0.9 }}>
      <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner animate-pulse">⚠️</div>
      <h3 class="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none">Hapus Kupon?</h3>
      <p class="text-sm font-medium text-slate-500 mt-4 leading-relaxed italic">Tindakan ini tidak dapat dibatalkan. Kupon akan dihapus permanen dari database.</p>

      <div class="flex flex-col gap-3 mt-10 italic">
        <button onclick={confirmDelete} class="w-full bg-rose-500 text-white rounded-2xl py-4.5 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95"> Ya, Hapus Sekarang </button>
        <button onclick={() => (isDeleteModalOpen = false)} class="w-full py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all"> Batalkan </button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
