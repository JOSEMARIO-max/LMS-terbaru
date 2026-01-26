<script>
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let isLoading = false;

  function handleLogin() {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      goto("/dashboard");
    }, 1500);
  }
</script>

<div class="light-gradient-bg">
  <a href="/" class="btn-back-home">
    <span class="arrow">←</span> Back to Home
  </a>

  <div class="content-grid">
    <div class="text-section">
      <div class="brand">
        <img src="logo.jpg" alt="Logo Khwarizmi Academy" class="brand-logo" />
        <span class="brand-name">Khwarizmi <span>Academy</span></span>
      </div>

      <div class="hero-text">
        <h3>Assalamualaikum! 👋</h3>
        <h1>Join The Learning <br />Revolution Today.</h1>
        <p>Akses ribuan materi pembelajaran, tugas, dan mentor profesional hanya dalam satu akun terintegrasi.</p>
      </div>
    </div>

    <div class="card-section">
      <div class="login-card">
        <div class="card-header">
          <h3>Welcome Back</h3>
          <p>Masukkan akunmu untuk mulai belajar.</p>
        </div>

        <form on:submit|preventDefault={handleLogin}>
          <div class="input-block">
            <input type="email" placeholder="Email Address" bind:value={email} required />
          </div>
          <div class="input-block">
            <input type="password" placeholder="Password" bind:value={password} required />
          </div>

          <div class="forgot-pass">
            <a href="#">Lupa Password?</a>
          </div>

          <button type="submit" class="btn-primary" disabled={isLoading}>
            {#if isLoading}
              Loading...
            {:else}
              Login
            {/if}
          </button>
        </form>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="social-row">
          <button class="btn-soc google">
            <span class="g-icon">G</span> Google
          </button>
          <button class="btn-soc fb">
            <span class="f-icon">f</span> Facebook
          </button>
        </div>

        <div class="card-footer">
          Don't have an account? <a href="#">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
  }

  /* --- BACKGROUND BARU: DOMINAN PUTIH + GRADASI ORANGE HALUS --- */
  .light-gradient-bg {
    min-height: 100vh;
    width: 100%;
    background-color: #fff7ed;
    background-image: radial-gradient(at 0% 0%, rgba(255, 166, 0, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(251, 146, 60, 0.15) 0px, transparent 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    position: relative; /* Penting untuk tombol back absolute */
    overflow: hidden;
  }

  /* --- STYLE TOMBOL BACK --- */
  .btn-back-home {
    position: absolute;
    top: 30px;
    left: 40px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    background: white;
    padding: 10px 20px;
    border-radius: 50px;
    color: #4b5563;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    z-index: 10; /* Pastikan tombol di atas elemen lain */
  }

  .btn-back-home:hover {
    color: #f97316;
    transform: translateX(-5px); /* Efek geser sedikit ke kiri saat hover */
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.15);
  }

  .btn-back-home .arrow {
    font-size: 1.2rem;
    line-height: 1;
    padding-bottom: 2px;
  }

  /* GRID LAYOUT (KIRI TEKS, KANAN KARTU) */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width: 1100px;
    gap: 50px;
    align-items: center;
  }

  /* --- KIRI: TEKS (WARNA GELAP BIAR KELIATAN DI BG TERANG) --- */
  .text-section {
    color: #1f2937;
    padding-left: 20px;
  }

  /* Mengatur font agar modern */

  .brand {
    display: flex;
    align-items: center;
    gap: 12px; /* Jarak antara logo dan teks */
    text-decoration: none; /* Jika nanti dibungkus tag <a> */
    font-family: "Poppins", sans-serif;
    margin-bottom: 1rem;
  }

  .brand-logo {
    height: 42px; /* Ukuran logo yang pas */
    width: auto;
    object-fit: contain;
  }

  /* Teks Utama "Khwarizmi" */
  .brand-name {
    font-size: 1.35rem;
    font-weight: 700; /* Bold */
    color: #0c2e28; /* Warna Dark Teal (Gelap) */
    letter-spacing: -0.5px;
    line-height: 1;
    display: flex;
    flex-direction: column; /* Opsional: jika ingin numpuk saat layar kecil */
  }

  /* Teks "Academy" (Target SPAN di dalam brand-name) */
  .brand-name span {
    color: #f67d26; /* Warna Oranye dari Logo */
    font-weight: 400; /* Opsional: Membuat 'Academy' lebih tipis agar kontras */
    /* Atau biarkan bold (700) jika ingin tebal semua */
  }

  /* Responsif untuk layar kecil (HP) */
  @media (max-width: 768px) {
    .brand-logo {
      height: 35px;
    }
    .brand-name {
      font-size: 1.1rem;
    }
  }

  .hero-text h3 {
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0.9;
    margin: 0 0 10px 0;
    letter-spacing: 1px;
    color: #4b5563;
  }
  .hero-text h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 20px 0;
    letter-spacing: -1px;
    color: #111827;
  }
  .hero-text p {
    font-size: 1rem;
    opacity: 0.8;
    max-width: 80%;
    line-height: 1.6;
    color: #6b7280;
  }

  /* --- KANAN: KARTU LOGIN (PUTIH BERSIH) --- */
  .card-section {
    display: flex;
    justify-content: flex-end;
  }

  .login-card {
    background: white;
    width: 100%;
    max-width: 400px;
    border-radius: 30px;
    padding: 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .card-header {
    text-align: center;
    margin-bottom: 30px;
  }
  .card-header h3 {
    font-size: 1.8rem;
    color: #1e293b;
    margin: 0 0 8px 0;
  }
  .card-header p {
    color: #64748b;
    margin: 0;
    font-size: 0.95rem;
  }

  .input-block {
    margin-bottom: 15px;
  }
  .input-block input {
    width: 100%;
    padding: 16px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 50px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: 0.2s;
    background: #f8fafc;
  }
  .input-block input:focus {
    outline: none;
    border-color: #f97316;
    background: white;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
  }

  .forgot-pass {
    text-align: right;
    margin-bottom: 25px;
    font-size: 0.9rem;
  }
  .forgot-pass a {
    color: #f97316;
    text-decoration: none;
    font-weight: 600;
  }

  .btn-primary {
    width: 100%;
    padding: 16px;
    border-radius: 50px;
    background: #f97316;
    color: white;
    border: none;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3);
    transition: 0.2s;
  }
  .btn-primary:hover {
    background: #c2410c;
    transform: translateY(-2px);
  }

  .divider {
    text-align: center;
    margin: 25px 0;
    position: relative;
  }
  .divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: #e2e8f0;
  }
  .divider span {
    background: white;
    padding: 0 10px;
    color: #94a3b8;
    font-size: 0.8rem;
    position: relative;
    z-index: 1;
  }

  .social-row {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
  }
  .btn-soc {
    flex: 1;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    font-weight: 600;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.2s;
  }
  .btn-soc:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
  .g-icon {
    color: #ea4335;
    font-weight: bold;
  }
  .f-icon {
    color: #1877f2;
    font-weight: bold;
  }

  .card-footer {
    text-align: center;
    font-size: 0.9rem;
    color: #64748b;
  }
  .card-footer a {
    color: #f97316;
    font-weight: 700;
    text-decoration: none;
  }

  /* RESPONSIVE HP */
  @media (max-width: 900px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: 30px;
      text-align: center;
      margin-top: 60px; /* Tambah jarak atas agar tidak nabrak tombol back */
    }
    .text-section {
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero-text h1 {
      font-size: 2.5rem;
    }
    .hero-text p {
      margin: 0 auto;
    }
    .card-section {
      justify-content: center;
    }

    /* Penyesuaian tombol back di HP */
    .btn-back-home {
      left: 20px;
      top: 20px;
      font-size: 0.85rem;
      padding: 8px 15px;
    }
  }
</style>
