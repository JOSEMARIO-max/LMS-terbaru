<script>
  import { user, isPremium, ownedCourses } from "$lib/stores";
  import { fly, fade, scale, slide } from "svelte/transition";
  import { elasticOut, cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores"; 
  import toast, { Toaster } from 'svelte-french-toast'; // Import Toast

  // STATE WELCOME
  let showWelcome = false;
  let showContent = false; 

  // STATE PAYMENT
  let showPaymentModal = false;
  let selectedPayment = 'bca';
  let isLoading = false;
  let selectedCourseToBuy = null; // Menyimpan data kursus yang sedang dibeli

  const formatRp = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  onMount(() => {
    const isJustSubscribed = $page.url.searchParams.get('new') === 'true';
    if ($isPremium && isJustSubscribed) {
        showWelcome = true;
        setTimeout(() => showContent = true, 500); 
    }
  });

  function startExplore() {
    showWelcome = false;
    goto('/courses', { replaceState: true });
  }

  // --- DATA KURSUS ---
  const catalogData = [
    { id: 1, title: "Mastering Mobile App Design", category: "Design", price: 150000, img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" },
    { id: 2, title: "Fullstack Web Developer", category: "Development", price: 250000, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
    { id: 3, title: "Advanced Brand Identity", category: "Design", price: 175000, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" },
    { id: 4, title: "Python for Data Science", category: "Data", price: 200000, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { id: 5, title: "Digital Marketing Mastery", category: "Marketing", price: 125000, img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80" },
    { id: 6, title: "3D Modeling with Blender", category: "Design", price: 180000, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" },
  ];

  // 1. FUNGSI KLIK BELI (BUKA MODAL)
  function openPayment(course) {
    if ($ownedCourses.includes(course.id)) {
        toast.success("✅ Kamu sudah punya kursus ini!");
        return;
    }
    selectedCourseToBuy = course; // Simpan data kursus
    showPaymentModal = true;      // Buka Modal
  }

  // 2. FUNGSI PROSES BAYAR
  function processPayment() {
    isLoading = true;
    const loadingId = toast.loading("Memproses pembayaran...");

    setTimeout(() => {
        // Simpan kursus ke store
        $ownedCourses = [...$ownedCourses, selectedCourseToBuy.id];
        
        // Aktifkan status student jika belum
        if (!$isPremium) {
            $isPremium = true; 
            $user.role = "Active Student";
        }

        isLoading = false;
        showPaymentModal = false;
        toast.dismiss(loadingId);

        toast.success(`Berhasil membeli ${selectedCourseToBuy.title}!`, {
            duration: 4000,
            icon: '🎉'
        });

    }, 2000);
  }
</script>

<Toaster />

<div class="page-container">

  {#if showPaymentModal}
  <div class="modal-overlay" transition:fade={{ duration: 200 }}>
    <div class="payment-box" transition:scale={{ duration: 200, start: 0.95 }}>
      
      <div class="pay-header">
        <h3>Checkout Kelas 🎓</h3>
        <button class="close-x" on:click={() => showPaymentModal = false}>✕</button>
      </div>

      <div class="pay-summary">
        <div class="row">
            <span>Item</span>
            <strong>{selectedCourseToBuy.title}</strong>
        </div>
        <div class="row">
            <span>Kategori</span>
            <span>{selectedCourseToBuy.category}</span>
        </div>
        <div class="row total">
            <span>Total Tagihan</span>
            <span class="price-tag">{formatRp(selectedCourseToBuy.price)}</span>
        </div>
      </div>

      <div class="pay-method-section">
        <label>Pilih Metode Pembayaran</label>
        <div class="method-grid">
            <button class="method-card {selectedPayment === 'bca' ? 'selected' : ''}" on:click={() => selectedPayment = 'bca'}>
                <div class="logo-placeholder bca">BCA</div>
                {#if selectedPayment === 'bca'} <div class="check">✓</div> {/if}
            </button>

            <button class="method-card {selectedPayment === 'mandiri' ? 'selected' : ''}" on:click={() => selectedPayment = 'mandiri'}>
                <div class="logo-placeholder mandiri">MANDIRI</div>
                {#if selectedPayment === 'mandiri'} <div class="check">✓</div> {/if}
            </button>

            <button class="method-card {selectedPayment === 'gopay' ? 'selected' : ''}" on:click={() => selectedPayment = 'gopay'}>
                <div class="logo-placeholder gopay">GOPAY</div>
                {#if selectedPayment === 'gopay'} <div class="check">✓</div> {/if}
            </button>
            
            <button class="method-card {selectedPayment === 'qris' ? 'selected' : ''}" on:click={() => selectedPayment = 'qris'}>
                <div class="logo-placeholder">QRIS</div>
                {#if selectedPayment === 'qris'} <div class="check">✓</div> {/if}
            </button>
        </div>
      </div>

      <button class="btn-pay-now" on:click={processPayment} disabled={isLoading}>
        {#if isLoading}⏳ Memproses... {:else} Bayar Sekarang 🔒 {/if}
      </button>
      
    </div>
  </div>
  {/if}


  {#if showWelcome}
    <div class="celebration-overlay" out:fly={{ y: -1000, duration: 1000, easing: cubicInOut }}>
        <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
        <div class="content-box">
            {#if showContent}
                <div class="icon-wrapper" in:scale={{ duration: 800, easing: elasticOut, start: 0 }}>
                    <img src="/logo.jpg" alt="Logo" class="welcome-logo" />
                </div>
                <h1 in:fly={{ y: 50, duration: 800, delay: 200 }}>
                    Selamat Datang, <br> <span class="gradient-text">Khwarizmi Academy</span>
                </h1>
                <p in:fly={{ y: 50, duration: 800, delay: 400 }}>
                    Semua gembok telah terbuka. Akses <strong>seluruh Kelas Premium</strong> tanpa batas.
                </p>
                <button class="btn-blast" on:click={startExplore} in:fly={{ y: 50, duration: 800, delay: 600 }}>
                    Mulai Jelajahi Kelas
                </button>
            {/if}
        </div>
    </div>
  {/if}


  <div class="catalog-content">
    <div class="header">
        <div class="pill">KATALOG PREMIUM</div>
        <h1>Tentukan Jalan Karirmu</h1>
        <p>Pilih skill yang ingin kamu kuasai hari ini.</p>
    </div>

    <div class="grid-container">
        {#each catalogData as item}
            {@const isOwned = $ownedCourses.includes(item.id)}

            <div class="course-card">
                <div class="card-image" style="background-image: url('{item.img}')">
                    {#if isOwned}
                        <div class="overlay-owned"><span>✓ SIAP BELAJAR</span></div>
                    {:else if $isPremium}
                        <div class="overlay-pro"><span>🔓 UNLOCKED</span></div>
                    {/if}
                    <div class="cat-badge">{item.category}</div>
                </div>

                <div class="card-body">
                    <h3>{item.title}</h3>
                    
                    <div class="action-area">
                        {#if isOwned}
                            <a href="/lesson" class="btn-main owned">Lanjut Belajar ➔</a>
                        {:else}
                            {#if $isPremium}
                                <button class="btn-main pro" on:click={() => openPayment(item)}>
                                    Ambil Kelas (Gratis)
                                </button>
                            {:else}
                                <button class="btn-main buy" on:click={() => openPayment(item)}>
                                    Beli {formatRp(item.price)}
                                </button>
                            {/if}
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
  </div>

</div>

<style>
  :global(body) { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: #FFF7ED; overflow-x: hidden; }

  /* --- STYLE MODAL PEMBAYARAN --- */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 9999; display: grid; place-items: center; padding: 20px; }
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
  .bca { color: #00529C; } .mandiri { color: #FFB700; } .gopay { color: #00AED6; }
  .check { position: absolute; top: 5px; right: 5px; width: 18px; height: 18px; background: #f97316; color: white; border-radius: 50%; font-size: 0.7rem; display: grid; place-items: center; font-weight: bold; }

  .btn-pay-now { width: calc(100% - 50px); margin: 0 25px 15px 25px; padding: 14px; background: #111827; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: 0.2s; }
  .btn-pay-now:hover { background: #ea580c; transform: translateY(-2px); }
  .btn-pay-now:disabled { background: #9ca3af; cursor: not-allowed; }

  /* --- EXISTING STYLES (Sama spt sebelumnya) --- */
  .catalog-content { max-width: 1200px; margin: 0 auto; padding: 60px 20px; min-height: 100vh; }
  .header { text-align: center; margin-bottom: 50px; }
  .pill { background: #e0e7ff; color: #4338ca; font-size: 0.7rem; font-weight: 800; padding: 5px 15px; border-radius: 50px; display: inline-block; margin-bottom: 15px; letter-spacing: 1px; }
  .header h1 { font-size: 2.5rem; margin: 0 0 10px 0; color: #111827; }
  .header p { color: #6b7280; font-size: 1.1rem; }
  .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }
  .course-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #f1f5f9; display: flex; flex-direction: column; transition: 0.2s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); }
  .course-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border-color: #fdba74; }
  .card-image { height: 200px; background-size: cover; background-position: center; position: relative; }
  .cat-badge { position: absolute; top: 15px; left: 15px; background: white; color: #111827; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
  .overlay-owned { position: absolute; inset: 0; background: rgba(22, 163, 74, 0.9); display: grid; place-items: center; }
  .overlay-owned span { color: white; font-weight: 800; border: 2px solid white; padding: 5px 15px; border-radius: 50px; }
  .overlay-pro { position: absolute; inset: 0; background: rgba(249, 115, 22, 0.85); display: grid; place-items: center; opacity: 0; transition: 0.3s; }
  .course-card:hover .overlay-pro { opacity: 1; }
  .overlay-pro span { color: white; font-weight: 800; font-size: 1.2rem; border: 2px solid white; padding: 5px 15px; border-radius: 50px; }
  .card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
  h3 { margin: 0 0 20px 0; font-size: 1.1rem; color: #1f2937; line-height: 1.4; flex: 1; }
  .action-area { margin-top: auto; }
  .btn-main { width: 100%; padding: 14px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; text-align: center; display: block; text-decoration: none; font-size: 0.95rem; transition: 0.2s; }
  .buy { background: #111827; color: white; }
  .buy:hover { background: #f97316; transform: translateY(-2px); }
  .pro { background: #F97316; color: white; }
  .pro:hover { background: #ea580c; transform: translateY(-2px); }
  .owned { background: #dcfce7; color: #166534; }
  .owned:hover { background: #bbf7d0; }

  /* OVERLAY WELCOME */
  .celebration-overlay { position: fixed; inset: 0; background: #0F172A; z-index: 9999; display: flex; align-items: center; justify-content: center; text-align: center; color: white; overflow: hidden; }
  .content-box { position: relative; z-index: 10; padding: 20px; max-width: 600px; }
  .icon-wrapper { margin-bottom: 25px; animation: float 3s ease-in-out infinite; display: inline-block; }
  .welcome-logo { width: 50px; height: auto; object-fit: cover; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  .gradient-text { background: linear-gradient(to right, #F97316, #FDBA74); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .btn-blast { background: white; color: #0F172A; border: none; padding: 16px 40px; font-size: 1.1rem; font-weight: 700; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 30px rgba(255,255,255,0.3); }
  .btn-blast:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 0 50px rgba(255,255,255,0.6); }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6; }
  .orb-1 { width: 400px; height: 400px; background: #F97316; top: -100px; left: -100px; animation: drift 10s infinite alternate; }
  .orb-2 { width: 300px; height: 300px; background: #4F46E5; bottom: -50px; right: -50px; animation: drift 12s infinite alternate-reverse; }
  .orb-3 { width: 200px; height: 200px; background: #EC4899; top: 40%; left: 40%; opacity: 0.4; animation: pulse 8s infinite; }
  @keyframes drift { from { transform: translate(0,0); } to { transform: translate(30px, 30px); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
</style>    