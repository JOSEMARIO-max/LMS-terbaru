<script>
  // 1. IMPORT LIB & STORE
  import { user, isPremium, ownedCourses } from "$lib/stores";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from 'svelte-french-toast';
  import { fade, scale } from 'svelte/transition';

  // 2. STATE UNTUK MODAL PEMBAYARAN
  let showPaymentModal = false;
  let selectedPayment = 'bca'; // Default method
  let isLoading = false;

  // 3. LOGIC BUKA MODAL
  function openPaymentModal() {
    // Cek jika user sudah Premium
    if ($isPremium) {
      toast.success("Akun kamu sudah PRO (Active)!", { icon: '✅' });
      setTimeout(() => goto('/lesson'), 1000);
      return;
    }
    // Buka Modal
    showPaymentModal = true;
  }

  // 4. LOGIC PROSES BAYAR (SIMULASI)
  function processPayment() {
    showPaymentModal = false; // Tutup modal
    isLoading = true;
    
    // Tampilkan Loading Toast
    const loadingId = toast.loading("Menghubungkan ke Payment Gateway...");

    setTimeout(() => {
        // A. UPDATE STORE (JADI PREMIUM)
        $isPremium = true;
        $user.role = "PRO Member";
        // Unlock semua kursus (ID 1-8)
        $ownedCourses = [1, 2, 3, 4, 5, 6, 7, 8]; 

        isLoading = false;
        toast.dismiss(loadingId);

        // B. TOAST SUKSES
        toast.success(`Pembayaran via ${selectedPayment.toUpperCase()} Berhasil!`, {
            duration: 5000,
            icon: '🎉',
            style: 'font-weight: bold; background: #fff; color: #333;'
        });
        
        // C. REDIRECT KE DASHBOARD
        setTimeout(() => { 
            goto('/lesson'); 
        }, 2000);
    }, 2500);
  }
</script>

<Toaster />

{#if showPaymentModal}
  <div class="modal-overlay" transition:fade={{ duration: 200 }}>
    <div class="payment-box" transition:scale={{ duration: 200, start: 0.95 }}>
      
      <div class="pay-header">
        <h3>Checkout PRO 💎</h3>
        <button class="close-x" on:click={() => showPaymentModal = false}>✕</button>
      </div>

      <div class="pay-summary">
        <div class="row">
            <span>Paket Langganan</span>
            <strong>Bulanan (Auto-renew)</strong>
        </div>
        <div class="row total">
            <span>Total Tagihan</span>
            <span class="price-tag">Rp 150.000</span>
        </div>
      </div>

      <div class="pay-method-section">
        <label>Pilih Metode Pembayaran</label>
        <div class="method-grid">
            <button class="method-card {selectedPayment === 'bca' ? 'selected' : ''}" on:click={() => selectedPayment = 'bca'}>
                <div class="logo-placeholder bca">BCA</div>
                <span>Virtual Account</span>
                {#if selectedPayment === 'bca'} <div class="check">✓</div> {/if}
            </button>

            <button class="method-card {selectedPayment === 'mandiri' ? 'selected' : ''}" on:click={() => selectedPayment = 'mandiri'}>
                <div class="logo-placeholder mandiri">MANDIRI</div>
                <span>Virtual Account</span>
                {#if selectedPayment === 'mandiri'} <div class="check">✓</div> {/if}
            </button>

            <button class="method-card {selectedPayment === 'card' ? 'selected' : ''}" on:click={() => selectedPayment = 'card'}>
                <div class="logo-placeholder card">💳</div>
                <span>Debit / Credit</span>
                {#if selectedPayment === 'card'} <div class="check">✓</div> {/if}
            </button>

            <button class="method-card {selectedPayment === 'gopay' ? 'selected' : ''}" on:click={() => selectedPayment = 'gopay'}>
                <div class="logo-placeholder gopay">GOPAY</div>
                <span>E-Wallet</span>
                {#if selectedPayment === 'gopay'} <div class="check">✓</div> {/if}
            </button>
        </div>
      </div>

      <button class="btn-pay-now" on:click={processPayment}>
        Bayar Sekarang 🔒
      </button>
      
      <p class="secure-text">🔒 Pembayaran Anda dienkripsi dan aman.</p>
    </div>
  </div>
{/if}

<section class="pricing" id="pricing">
  <div class="container">
    <div class="section-head">
      <div class="badge-pill orange">INVESTASI TERBAIK</div>
      <h2>Metode Belajar Pilihanmu</h2>
      <p>Pilih tipe kelas yang sesuai dengan gaya belajar dan budget kamu. Bayar sekali atau langganan hemat.</p>
    </div>

    <div class="pricing-grid">
      
      <div class="price-card">
        <div class="plan-name">Video Course</div>
        <div class="price">
          <small style="font-size: 1rem; font-weight: 500;">Mulai dari</small><br />
          Rp 99rb <span class="period">/ kursus</span>
        </div>
        <p class="desc">Cocok untuk kamu yang ingin mempelajari satu skill spesifik secara mandiri.</p>
        <ul class="features-list">
          <li>✅ Akses Video Selamanya</li>
          <li>✅ Sertifikat Penyelesaian</li>
          <li>✅ Forum Tanya Jawab</li>
          <li>✅ Materi Praktik & Studi Kasus</li>
          <li>❌ Akses Kursus Lain</li>
        </ul>
        <a href="/courses" class="btn-outline-full">Lihat Katalog Kelas</a>
      </div>

      <div class="price-card pro-plan">
        <div class="popular-badge">PALING HEMAT 🔥</div>
        <div class="plan-name text-white">Khwarizmi PRO</div>
        <div class="price text-white">
          <small style="font-size: 1rem; font-weight: 500; opacity: 0.8;">Hanya</small><br />
          Rp 150rb <span class="period text-white-50">/ bulan</span>
        </div>
        <p class="desc text-white-80">Akses tanpa batas ke seluruh materi di platform ini. Lebih hemat, belajar sepuasnya.</p>
        <ul class="features-list text-white">
          <li>✅ <strong>Akses SEMUA 8+ Kursus</strong></li>
          <li>✅ <strong>Download Source Code</strong></li>
          <li>✅ Prioritas Review Tugas</li>
          <li>✅ Konsultasi Mentor</li>
          <li>✅ Sertifikat Jalur Karir</li>
        </ul>
        
        <button class="btn-white-full" on:click={openPaymentModal} style="width: 100%; border: none; cursor: pointer; font-size: 1rem; font-weight: 700;">
          Langganan Sekarang 🚀
        </button>
      </div>

      <div class="price-card">
        <div class="plan-name">Career Bundling</div>
        <div class="price">
          <small style="font-size: 1rem; font-weight: 500;">Hemat hingga</small><br />
          30% <span class="period">OFF</span>
        </div>
        <p class="desc">Paket lengkap dari nol sampai mahir. Gabungan beberapa materi menjadi satu alur belajar.</p>
        <ul class="features-list">
          <li>✅ Gabungan 3-5 Video Course</li>
          <li>✅ Roadmap Belajar Terstruktur</li>
          <li>✅ Portfolio Project Akhir</li>
          <li>✅ Sertifikat Jalur Karir</li>
          <li>✅ Akses Seumur Hidup</li>
        </ul>
        <a href="/courses" class="btn-outline-full">Lihat Paket Bundling</a>
      </div>

    </div>
  </div>
</section>

<style>
  /* --- STYLE MODAL PEMBAYARAN --- */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 9999; display: grid; place-items: center; padding: 20px; }
  
  .payment-box { background: white; width: 100%; max-width: 450px; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; font-family: 'Plus Jakarta Sans', sans-serif; text-align: left; }
  
  .pay-header { padding: 20px 25px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; background: #fff7ed; }
  .pay-header h3 { margin: 0; font-size: 1.1rem; color: #9a3412; }
  .close-x { background: transparent; border: none; font-size: 1.2rem; cursor: pointer; color: #9a3412; font-weight: bold; }
  
  .pay-summary { padding: 25px; background: #f9fafb; border-bottom: 1px solid #f3f4f6; }
  .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #4b5563; }
  .row.total { margin-top: 15px; border-top: 1px dashed #d1d5db; padding-top: 15px; align-items: center; }
  .row.total span { font-weight: 700; font-size: 1.1rem; color: #1f2937; }
  .price-tag { color: #ea580c !important; font-size: 1.3rem !important; }

  .pay-method-section { padding: 25px; }
  .pay-method-section label { display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 15px; color: #374151; }
  
  .method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .method-card { border: 2px solid #e5e7eb; background: white; border-radius: 12px; padding: 15px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; transition: 0.2s; }
  .method-card:hover { border-color: #fdba74; background: #fff7ed; }
  .method-card.selected { border-color: #f97316; background: #fff7ed; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.1); }
  
  .logo-placeholder { font-weight: 900; font-size: 0.8rem; letter-spacing: 1px; }
  .bca { color: #00529C; } .mandiri { color: #FFB700; } .card { font-size: 1.5rem; } .gopay { color: #00AED6; }
  .method-card span { font-size: 0.75rem; color: #6b7280; }
  
  .check { position: absolute; top: 5px; right: 5px; width: 18px; height: 18px; background: #f97316; color: white; border-radius: 50%; font-size: 0.7rem; display: grid; place-items: center; font-weight: bold; }

  .btn-pay-now { width: calc(100% - 50px); margin: 0 25px 15px 25px; padding: 14px; background: #111827; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: 0.2s; }
  .btn-pay-now:hover { background: #ea580c; transform: translateY(-2px); }
  
  .secure-text { text-align: center; font-size: 0.75rem; color: #9ca3af; margin-bottom: 25px; }
</style>