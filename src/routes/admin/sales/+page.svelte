<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import toast, { Toaster } from "svelte-french-toast"; // Import Toast

  // --- SVELTE 5 STATE (SALES DATA) ---
  const revenueStats = [
    { label: "Total Revenue", value: "Rp 128.400.000", grow: "+15.2%", icon: "📈", color: "bg-emerald-50 text-emerald-600" },
    { label: "Sales This Month", value: "Rp 12.500.000", grow: "+5.4%", icon: "💳", color: "bg-indigo-50 text-indigo-600" },
    { label: "Refund Requests", value: "2", grow: "-12%", icon: "🔄", color: "bg-rose-50 text-rose-600" },
    { label: "Average Order", value: "Rp 185.000", grow: "+2.1%", icon: "📊", color: "bg-orange-50 text-orange-600" },
  ];

  const topCourses = [
    { title: "Fullstack Web Developer", sales: 124, revenue: "Rp 31.000.000" },
    { title: "Mastering Mobile Design", sales: 98, revenue: "Rp 14.700.000" },
    { title: "Python Data Science", sales: 85, revenue: "Rp 17.000.000" },
  ];

  const recentTransactions = [
    { id: "TX-9901", user: "Rizky Pratama", course: "UI/UX Design", amount: "Rp 150.000", date: "Today, 09:45", method: "BCA" },
    { id: "TX-9902", user: "Siti Sarah", course: "Web Dev", amount: "Rp 250.000", date: "Today, 08:30", method: "GOPAY" },
    { id: "TX-9903", user: "Budi Tabuti", course: "Data Science", amount: "Rp 200.000", date: "Yesterday", method: "MANDIRI" },
  ];

  // --- FUNCTIONS ---
  function handleExport() {
    const t = toast.loading("Mengunduh laporan transaksi...");
    setTimeout(() => {
      toast.success("Laporan berhasil diunduh ke perangkat Anda", {
        id: t,
        icon: "📄",
      });
    }, 1500);
  }

  function handleFullReport() {
    const t = toast.loading("Menganalisis data pertumbuhan...");
    setTimeout(() => {
      toast.success("Analisis selesai! Membuka laporan lengkap", {
        id: t,
        icon: "🔥",
      });
    }, 2000);
  }

  function copyTxID(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("ID Transaksi disalin ke clipboard", {
      position: "bottom-center",
      style: "font-size: 12px; font-weight: bold; border-radius: 12px;",
    });
  }
</script>

<Toaster />

<div class="space-y-8 pb-20 font-plus antialiased text-slate-700 mt-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each revenueStats as stat}
      <div class="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 transition-all hover:shadow-md hover:-translate-y-1">
        <div class="flex justify-between items-center">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl {stat.color} shadow-sm">
            {stat.icon}
          </div>
          <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 uppercase italic">
            {stat.grow}
          </span>
        </div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 opacity-60">{stat.label}</p>
          <h4 class="text-xl font-black text-slate-900 leading-none tracking-tight italic">{stat.value}</h4>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
    <section class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
      <div class="p-8 flex justify-between items-center border-b border-slate-50 bg-white sticky top-0 z-10">
        <div>
          <h3 class="font-black text-slate-900 text-lg italic uppercase tracking-tight">Recent Transactions</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest opacity-60 italic">Live updates from gateway</p>
        </div>
        <button
          onclick={handleExport}
          class="text-[10px] font-black text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm active:scale-95 cursor-pointer"
        >
          Export Report
        </button>
      </div>

      <div class="overflow-x-auto flex-1">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50 italic">
              <th class="px-8 py-5 border-b border-slate-100">Transaction ID</th>
              <th class="px-6 py-5 border-b border-slate-100">Student & Course</th>
              <th class="px-6 py-5 border-b border-slate-100">Amount</th>
              <th class="px-6 py-5 border-b border-slate-100">Method</th>
              <th class="px-8 py-5 text-right border-b border-slate-100">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each recentTransactions as tx}
              <tr in:fade class="group hover:bg-indigo-50/20 transition-all duration-300">
                <td class="px-8 py-5">
                  <button onclick={() => copyTxID(tx.id)} class="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-tighter hover:text-indigo-600 transition-colors cursor-pointer">
                    {tx.id} 📋
                  </button>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm font-black text-slate-800 leading-none mb-1 group-hover:text-indigo-600 transition-colors italic">{tx.user}</p>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-tight">{tx.course}</p>
                </td>
                <td class="px-6 py-5 text-sm font-black text-slate-900 italic">{tx.amount}</td>
                <td class="px-6 py-5">
                  <span class="text-[9px] font-black text-slate-500 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm uppercase tracking-tighter group-hover:border-indigo-200">{tx.method}</span>
                </td>
                <td class="px-8 py-5 text-right">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Success
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <aside class="space-y-8 h-fit sticky top-24">
      <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <h3 class="font-black text-slate-900 leading-none uppercase text-[10px] tracking-[0.2em] opacity-40 italic">Best Selling</h3>
        <div class="space-y-6">
          {#each topCourses as course}
            <div class="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-black text-slate-800 truncate group-hover:text-indigo-600 transition-colors italic leading-none">{course.title}</p>
                <p class="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-tighter italic opacity-60">{course.sales} Unit Terjual</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-emerald-600 italic tracking-tighter">{course.revenue.split(".")[0]}M</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="bg-indigo-600 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl"></div>

        <div class="flex justify-between items-start relative z-10">
          <div>
            <h4 class="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic opacity-80">Monthly Growth</h4>
            <p class="text-4xl font-black italic tracking-tighter">+24.8%</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/10 shadow-lg group-hover:rotate-12 transition-transform">🔥</div>
        </div>

        <div class="flex items-end gap-2 h-24 pt-4 relative z-10">
          {#each [30, 50, 40, 80, 60, 95, 75] as h}
            <div class="flex-1 bg-white/20 rounded-t-xl transition-all hover:bg-white/60 cursor-help" style="height: {h}%" title="{h}%"></div>
          {/each}
        </div>

        <div class="pt-6 border-t border-white/10 relative z-10">
          <button
            onclick={handleFullReport}
            class="w-full py-4.5 bg-white text-indigo-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:bg-indigo-50 active:scale-95 shadow-xl shadow-indigo-900/20 cursor-pointer italic"
          >
            Generate Full Report
          </button>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
