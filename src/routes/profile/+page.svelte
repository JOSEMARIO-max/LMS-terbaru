<script>
  import toast, { Toaster } from 'svelte-french-toast';
  import { fade, scale } from 'svelte/transition'; 
  import { user, isPremium, ownedCourses } from '$lib/stores'; 
  import { goto } from '$app/navigation'; // PENTING: Import goto untuk redirect

  let activeTab = 'Subscription'; 
  const tabs = ['Edit Profile', 'Subscription', 'Password', 'Notifications']; 
  
  let fileInput; 
  let isLoading = false;
  
  // STATE MODAL
  let showCancelModal = false; 
  let showPaymentModal = false; // Modal Pembayaran Baru
  let selectedPayment = 'bca'; // Default payment method

  // --- LOGIC GANTI FOTO ---
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => { $user.avatar = e.target.result; };
      reader.readAsDataURL(file);
      toast.success("Foto profil diperbarui!");
    }
  }

  function saveProfile() {
    toast.success("Data profil berhasil disimpan!", { position: "top-center" });
  }

  // ==========================================
  // 1. LOGIC BATAL LANGGANAN (CANCEL)
  // ==========================================
  function requestCancelSubscription() {
    showCancelModal = true; 
  }

  function confirmCancel() {
    showCancelModal = false; 
    isLoading = true; 
    const loadingId = toast.loading("Memproses pembatalan...");

    setTimeout(() => {
      $isPremium = false;
      $user.role = "Member"; 
      $ownedCourses = []; 
      
      isLoading = false;
      toast.dismiss(loadingId);
      toast.error("Berlangganan Dihentikan. Akses dicabut.", { duration: 4000, icon: '🗑️' });
    }, 2000);
  }

  // ==========================================
  // 2. LOGIC PEMBAYARAN (NEW PAYMENT FLOW)
  // ==========================================
  
  // A. Buka Modal Pembayaran
  function openPaymentModal() {
    showPaymentModal = true;
  }

  // B. Proses Bayar (Saat tombol 'Bayar Sekarang' diklik)
  function processPayment() {
    showPaymentModal = false; // Tutup modal
    isLoading = true;
    
    // Tampilkan Loading
    const loadingId = toast.loading("Menghubungkan ke Payment Gateway...");

    setTimeout(() => {
        // SUKSES BAYAR
        $isPremium = true;
        $user.role = "PRO Student";
        $ownedCourses = [1, 2, 3, 4, 5, 6, 7, 8]; 

        isLoading = false;
        toast.dismiss(loadingId);

        // Toast Sukses
        toast.success(`Pembayaran via ${selectedPayment.toUpperCase()} Berhasil!`, {
            duration: 5000,
            icon: '🎉',
            style: 'font-weight: bold;'
        });
        
        // --- REDIRECT KE COURSES DENGAN TRIGGER ANIMASI ---
        setTimeout(() => { 
            goto('/courses?new=true'); 
        }, 2000);
    }, 2500);
  }
</script>

<Toaster />

{#if showCancelModal}
  <div class="modal-overlay" transition:fade={{ duration: 200 }}>
    <div class="modal-box" transition:scale={{ duration: 200, start: 0.9 }}>
      <div class="modal-icon">⚠️</div>
      <h3>Berhenti Berlangganan?</h3>
      <p>Tindakan ini <b>tidak dapat dibatalkan</b>. Status member akan dicabut dan semua kursus di Dashboard akan dihapus.</p>
      <div class="modal-actions">
        <button class="btn-back" on:click={() => showCancelModal = false}>Kembali</button>
        <button class="btn-confirm-delete" on:click={confirmCancel}>Ya, Berhenti</button>
      </div>
    </div>
  </div>
{/if}

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


<div class="profile-container">

  <div class="profile-header">
    <div class="cover-image"></div>
    <div class="header-content">
      <div class="avatar-wrapper">
        <img src={$user.avatar} alt="avatar">
        <button class="btn-cam" on:click={() => fileInput.click()}>📷</button>
        <input type="file" accept="image/*" bind:this={fileInput} on:change={handlePhotoChange} style="display: none;" />
      </div>
      
      <div class="user-meta">
        <h1>{$user.name} {#if $isPremium}<span class="badge">PRO</span>{/if}</h1>
        <p>{$user.role} • {$user.location}</p>
      </div>
      <div class="header-actions">
        <button class="btn-save" on:click={saveProfile}>Simpan Profil</button>
      </div>
    </div>
  </div>

  <div class="profile-grid">
    <div class="left-menu">
      {#each tabs as tab}
        <button class="menu-item {activeTab === tab ? 'active' : ''}" on:click={() => activeTab = tab}>
          <span class="indicator"></span> {tab}
        </button>
      {/each}
      
      <div class="stats-box">
        <div class="stat"><strong>{$ownedCourses.length}</strong><span>Courses</span></div>
        <div class="stat"><strong>{$isPremium ? '98' : '0'}</strong><span>Points</span></div>
      </div>
    </div>

    <div class="right-content">
      {#if activeTab === 'Edit Profile'}
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="input-row">
            <div class="input-group"><label>Full Name</label><input type="text" bind:value={$user.name}></div>
            <div class="input-group"><label>Role</label><input type="text" bind:value={$user.role} disabled style="opacity: 0.7"></div>
          </div>
          <div class="input-row">
            <div class="input-group"><label>Email</label><input type="email" bind:value={$user.email}></div>
            <div class="input-group"><label>Phone</label><input type="tel" bind:value={$user.phone}></div>
          </div>
          <div class="input-group"><label>Location</label><input type="text" bind:value={$user.location}></div>
        </div>

      {:else if activeTab === 'Subscription'}
        <div class="form-section">
          <h3>Status Langganan</h3>
          
          {#if $isPremium}
            <div class="sub-card premium">
              <div class="sub-header">
                <div><h4>Khwarizmi PRO Plan 💎</h4><span class="status-active">Aktif • Auto Renew</span></div>
                <div class="price">Rp 150k<span>/bln</span></div>
              </div>
              <div class="sub-benefits">
                <p>✅ Akses Full ke <b>{$ownedCourses.length} Kursus</b></p>
                <p>✅ Download source code & aset</p>
                <p>✅ Sertifikat kelulusan</p>
              </div>
              <div class="sub-footer">
                <small>Tagihan selanjutnya: 24 Feb 2026</small>
                <button class="btn-cancel" on:click={requestCancelSubscription} disabled={isLoading}>Batalkan Langganan</button>
              </div>
            </div>
          {:else}
            <div class="sub-card free">
              <div class="sub-header">
                <div><h4>Free Starter Plan</h4><span class="status-free">Non-Aktif</span></div>
                <div class="price">Rp 0</div>
              </div>
              <div class="sub-benefits warning-mode">
                <p>❌ <b>Semua Kursus Terhapus</b></p>
                <p>❌ Dashboard Terkunci</p>
              </div>
              <div class="sub-footer center-btn">
                <p style="margin-bottom: 15px; font-size: 0.9rem; color: #666;">Pulihkan semua kursus Anda dengan mengaktifkan paket kembali.</p>
                
                <button class="btn-upgrade" on:click={openPaymentModal} disabled={isLoading}>
                    Aktifkan Kembali PRO (Rp 150k) 🚀
                </button>
              </div>
            </div>
          {/if}
        </div>
      {:else}
        <div class="form-section"><h3>Settings Lainnya</h3><p style="color:#666">Fitur Notifications & Password belum tersedia.</p></div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* === STYLE MODAL UMUM === */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 999; display: grid; place-items: center; padding: 20px; }
  
  /* --- CANCEL MODAL --- */
  .modal-box { background: white; padding: 30px; border-radius: 24px; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
  .modal-icon { font-size: 3rem; margin-bottom: 10px; }
  .modal-box h3 { margin: 0 0 10px 0; color: #111827; font-size: 1.4rem; }
  .modal-box p { color: #6b7280; font-size: 0.95rem; margin: 0 0 25px 0; line-height: 1.5; }
  .modal-actions { display: flex; gap: 10px; flex-direction: column; }
  .btn-confirm-delete { background: #fee2e2; color: #dc2626; border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 0.95rem; }
  .btn-confirm-delete:hover { background: #fecaca; }
  .btn-back { background: white; border: 1px solid #e5e7eb; color: #374151; padding: 12px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-back:hover { background: #f9fafb; border-color: #d1d5db; }

  /* --- PAYMENT MODAL STYLE --- */
  .payment-box { background: white; width: 100%; max-width: 450px; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; }
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

  /* === EXISTING STYLES (Sama seperti sebelumnya) === */
  .profile-container { max-width: 1000px; margin: 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 20px 50px rgba(249, 115, 22, 0.05); }
  .profile-header { background: white; border-radius: 20px; overflow: hidden; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.03); }
  .cover-image { height: 160px; background: linear-gradient(120deg, #F97316, #FDA4AF); width: 100%; }
  .header-content { padding: 0 30px 30px 30px; display: flex; align-items: flex-end; gap: 25px; margin-top: -60px; position: relative; }
  .avatar-wrapper img { width: 120px; height: 120px; border-radius: 50%; border: 5px solid white; background: white; object-fit: cover; }
  .avatar-wrapper { position: relative; }
  .btn-cam { position: absolute; bottom: 10px; right: 0; background: #1F2937; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; border: 3px solid white; display: grid; place-items: center; }
  .user-meta h1 { margin: 0; font-size: 1.8rem; color: #111827; display: flex; align-items: center; gap: 10px; }
  .badge { font-size: 0.7rem; background: #FFF7ED; color: #F97316; padding: 4px 8px; border-radius: 6px; border: 1px solid #FED7AA; }
  .user-meta p { margin: 5px 0 0 0; color: #6B7280; font-weight: 500; }
  .header-actions { display: flex; gap: 10px; margin-bottom: 10px; }
  .btn-save { background: #1F2937; border: none; padding: 10px 20px; border-radius: 50px; font-weight: 600; cursor: pointer; color: white; }
  .profile-grid { display: grid; grid-template-columns: 260px 1fr; gap: 30px; }
  @media (max-width: 800px) { .profile-grid { grid-template-columns: 1fr; } }
  .left-menu { display: flex; flex-direction: column; gap: 10px; }
  .menu-item { text-align: left; background: rgba(255,255,255,0.6); padding: 15px 20px; border-radius: 12px; font-weight: 600; color: #6B7280; cursor: pointer; display: flex; align-items: center; gap: 10px; border: 1px solid transparent; transition: 0.2s; }
  .menu-item.active { background: white; color: #F97316; border-color: #FED7AA; }
  .indicator { width: 6px; height: 6px; border-radius: 50%; background: transparent; } .menu-item.active .indicator { background: #F97316; }
  .stats-box { background: linear-gradient(135deg, #1F2937, #000); border-radius: 16px; padding: 25px; display: flex; margin-top: 10px; color: white; justify-content: space-between; }
  .stat { text-align: center; flex: 1; } .stat strong { display: block; font-size: 1.4rem; color: #F97316; } .stat span { font-size: 0.75rem; opacity: 0.7; }
  .right-content { background: white; border-radius: 20px; padding: 30px; min-height: 400px; }
  h3 { margin: 0 0 25px 0; font-size: 1.2rem; border-bottom: 1px solid #F3F4F6; padding-bottom: 15px; }
  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .input-group { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
  .input-group label { font-size: 0.85rem; font-weight: 700; color: #374151; text-transform: uppercase; }
  .input-group input { padding: 12px; border: 1px solid #E5E7EB; border-radius: 10px; background: #F9FAFB; }
  .sub-card { border: 1px solid #E5E7EB; border-radius: 16px; padding: 25px; }
  .sub-card.premium { background: #FFF7ED; border-color: #FED7AA; }
  .sub-card.free { background: #F9FAFB; border-color: #E5E7EB; }
  .sub-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 20px; }
  .sub-header h4 { margin: 0 0 5px 0; font-size: 1.2rem; }
  .status-active { background: #DCFCE7; color: #166534; font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; }
  .status-free { background: #E5E7EB; color: #6B7280; font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; }
  .price { font-size: 1.5rem; font-weight: 800; } .price span { font-size: 0.9rem; color: #6B7280; font-weight: 500; }
  .sub-benefits p { margin: 8px 0; font-size: 0.95rem; color: #4B5563; }
  .warning-mode p { color: #EF4444; }
  .sub-footer { margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05); }
  .sub-footer.center-btn { text-align: center; }
  .btn-cancel { background: white; border: 1px solid #FECACA; color: #EF4444; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; float: right; }
  .btn-cancel:hover { background: #FEF2F2; border-color: #EF4444; }
  .btn-cancel:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-upgrade { background: #F97316; color: white; padding: 14px 30px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; font-size: 1rem; box-shadow: 0 10px 20px rgba(249, 115, 22, 0.2); width: 100%; transition: 0.2s; }
  .btn-upgrade:hover { transform: translateY(-2px); background: #ea580c; }
  .btn-upgrade:disabled { background: #cbd5e1; transform: none; box-shadow: none; cursor: not-allowed; }
</style>