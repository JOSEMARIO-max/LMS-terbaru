<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import * as XLSX from "xlsx";
  import toast, { Toaster } from "svelte-french-toast";

  // --- DATA ---
  // Warna diupdate ke palet Khwarizmi: bg-teal-50, text-teal-600, dsb.
  const adminStats = [
    { label: "Total Students", value: "1,205", grow: "+12%", icon: "👥", color: "bg-[#0D9488]/10 text-[#0D9488]" },
    { label: "Total Revenue", value: "Rp 45.2M", grow: "+8%", icon: "💰", color: "bg-[#14B8A6]/10 text-[#14B8A6]" },
    { label: "Active Courses", value: "48", grow: "+2", icon: "📚", color: "bg-[#F59E0B]/10 text-[#F59E0B]" },
    { label: "New Assignments", value: "156", grow: "Pending", icon: "📝", color: "bg-slate-100 text-slate-600" },
  ];

  let courseManagement = $state([
    { id: 1, title: "Mastering Mobile App Design", sales: 450, price: 150000, status: "Published" },
    { id: 2, title: "Fullstack Web Developer", sales: 890, price: 250000, status: "Published" },
    { id: 3, title: "Advanced Brand Identity", sales: 120, price: 175000, status: "Draft" },
    { id: 4, title: "Python Data Science", sales: 340, price: 200000, status: "Published" },
  ]);

  function exportToExcel() {
    const loadingToast = toast.loading("Menyiapkan laporan Khwarizmi...");

    setTimeout(() => {
      try {
        const dataToExport = courseManagement.map((course) => ({
          "ID Kursus": course.id,
          "Nama Kursus": course.title,
          "Total Penjualan": course.sales,
          "Harga (IDR)": course.price,
          "Status Konten": course.status,
          "Tanggal Laporan": new Date().toLocaleDateString("id-ID"),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const columnWidths = [{ wch: 10 }, { wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kursus");

        XLSX.writeFile(workbook, `Khwarizmi_Admin_Report_${new Date().getTime()}.xlsx`);

        toast.success("Laporan Excel berhasil diunduh!", { id: loadingToast, icon: "📊" });
      } catch (error) {
        toast.error("Gagal mengekspor data.", { id: loadingToast });
      }
    }, 1200);
  }
</script>

<Toaster />

<div class="space-y-8 max-w-7xl mx-auto px-4 font-plus antialiased pb-20 mt-8">
  <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 flex items-center justify-center">
          <img src="/logo.webp" alt="Logo" class="w-full h-full object-contain" />
        </div>

        <h1 class="text-3xl font-black text-slate-900 tracking-tight italic">Admin Console</h1>
        <span class="px-3 py-1 bg-[#14B8A6]/10 text-[#0D9488] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#14B8A6]/20">v4.0.0</span>
      </div>
      <p class="text-slate-500 font-medium mt-1 italic opacity-80 uppercase text-[11px] tracking-wider">Khwarizmi Academy Management System</p>
    </div>

    <div class="flex gap-3">
      <button
        onclick={exportToExcel}
        class="group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 hover:border-[#14B8A6] hover:text-[#0D9488] transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <span class="text-lg group-hover:rotate-12 transition-transform">📊</span>
        Export Excel
      </button>

      <a
        href="/admin/content/create"
        class="bg-[#F59E0B] text-white px-8 py-3.5 rounded-2xl text-sm font-black hover:bg-slate-900 transition-all shadow-lg shadow-[#F59E0B]/20 active:scale-95 cursor-pointer uppercase tracking-widest italic"
      >
        + Create Course
      </a>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each adminStats as stat}
      <div class="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div class="flex justify-between items-start">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl {stat.color} group-hover:scale-110 transition-transform shadow-inner">
            {stat.icon}
          </div>
          <span class="text-[10px] font-black px-3 py-1 rounded-full {stat.grow.startsWith('+') ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}">
            {stat.grow}
          </span>
        </div>
        <div>
          <h4 class="text-2xl font-black text-slate-900 leading-none tracking-tight italic uppercase">{stat.value}</h4>
          <p class="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">{stat.label}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
    <div class="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div class="p-8 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 class="font-black text-slate-900 text-lg italic tracking-tight uppercase">Course Inventory</h3>
          <p class="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Database Khwarizmi</p>
        </div>
        <button class="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[#14B8A6] hover:text-[#0D9488] transition-all cursor-pointer shadow-sm italic"> Filter Data </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
              <th class="px-10 py-6 border-b border-slate-50">Course Info</th>
              <th class="px-6 py-6 border-b border-slate-50 text-center">Popularity</th>
              <th class="px-6 py-6 border-b border-slate-50">Value</th>
              <th class="px-6 py-6 border-b border-slate-50">State</th>
              <th class="px-10 py-6 border-b border-slate-50 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            {#each courseManagement as course}
              <tr in:fade class="group hover:bg-[#14B8A6]/5 transition-all">
                <td class="px-10 py-6">
                  <div class="flex flex-col">
                    <span class="font-black text-slate-800 text-sm group-hover:text-[#0D9488] transition-colors italic uppercase">{course.title}</span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1 opacity-60">ID: #{course.id}9921</span>
                  </div>
                </td>
                <td class="px-6 py-6 text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-sm font-black text-slate-700 italic">{course.sales}</span>
                    <div class="w-12 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div class="h-full bg-[#14B8A6]" style="width: {Math.min(course.sales / 10, 100)}%"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-6">
                  <span class="text-xs font-black text-slate-500 italic">Rp {course.price.toLocaleString("id-ID")}</span>
                </td>
                <td class="px-6 py-6">
                  <span
                    class="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border {course.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'}"
                  >
                    {course.status}
                  </span>
                </td>
                <td class="px-10 py-6 text-right">
                  <button class="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-[#0D9488] hover:text-white transition-all cursor-pointer shadow-sm italic font-black">✏️</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-[#14B8A6]/20 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-[#14B8A6]/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-[#F59E0B]/10 transition-all duration-700"></div>

      <h3 class="font-black text-xl italic tracking-tight mb-8 uppercase tracking-widest text-[#14B8A6]">System Health</h3>

      <div class="space-y-10 relative z-10">
        <div class="space-y-4">
          <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#14B8A6] italic opacity-80">
            <span>Server Load</span>
            <span>72%</span>
          </div>
          <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-[#14B8A6] to-[#F59E0B] rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" style="width: 72%"></div>
          </div>
        </div>

        <div class="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-3 backdrop-blur-sm group-hover:border-[#14B8A6]/30 transition-all">
          <p class="text-xs font-black text-[#F59E0B] uppercase tracking-widest italic">Admin Tip 💡</p>
          <p class="text-sm font-medium leading-relaxed text-slate-300 italic opacity-80">Gunakan aksen Oranye untuk tombol aksi penting (CTA) dan Teal untuk elemen navigasi agar sesuai branding Khwarizmi.</p>
        </div>

        <button
          class="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-[#14B8A6] hover:text-white transition-all active:scale-95 shadow-xl shadow-slate-900/50 cursor-pointer italic"
        >
          View Logs
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
    /* Font Plus Jakarta Sans direkomendasikan untuk desain ini */
  }
</style>
