<script>
  import { onMount } from 'svelte';

  // --- 1. LOGIKA TYPING ANIMATION ---
  const words = ["Coding", "UI/UX Design", "Digital Marketing", "Data Science"];
  let currentText = "";
  let wordIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      currentText = currentWord.substring(0, currentText.length - 1);
      typingSpeed = 50;
    } else {
      currentText = currentWord.substring(0, currentText.length + 1);
      typingSpeed = 150;
    }

    if (!isDeleting && currentText === currentWord) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }
    setTimeout(typeEffect, typingSpeed);
  }

  // --- 2. LOGIKA MOBILE MENU ---
  let isMenuOpen = false;
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // --- 3. LOGIKA SPLIT SCROLL ANIMATION ---
  let y = 0;
  let splitContainer;
  let splitProgress = 0;

  $: if (splitContainer) {
    const start = splitContainer.offsetTop;
    const distance = splitContainer.offsetHeight - window.innerHeight;
    const scrolled = y - start;
    splitProgress = Math.max(0, Math.min(1, scrolled / distance));
  }

  // --- DATA KATEGORI ---
  const categories = [
    { name: "Web Development", count: "120+ Kelas", icon: "💻", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" },
    { name: "UI/UX Design", count: "85+ Kelas", icon: "🎨", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80" },
    { name: "Digital Marketing", count: "40+ Kelas", icon: "📢", img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80" },
    { name: "Business & Startup", count: "50+ Kelas", icon: "💼", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80" },
    { name: "Photography", count: "30+ Kelas", icon: "📸", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80" },
    { name: "Data Science", count: "65+ Kelas", icon: "📊", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" }
  ];

  onMount(() => {
    typeEffect();
  });
</script>

<svelte:window bind:scrollY={y} />

<div class="landing-page">

  <nav class="navbar">
    <div class="container nav-wrapper">
      <div class="brand">
        <div class="logo-sq">LMS</div>
        <span>Khwarizmi.</span>
      </div>
      
      <div class="nav-links">
        <a href="#mentors">Mentor</a>
        <a href="#categories">Kategori</a>
        <a href="#features">Fitur</a>
        <a href="#pricing">Harga</a>
      </div>

      <div class="nav-actions">
        <button class="hamburger" on:click={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <div class="desktop-auth">
          <a href="/login" class="btn-login">Masuk</a>
          <a href="/login" class="btn-register">Daftar Gratis</a>
        </div>
      </div>
    </div>

    {#if isMenuOpen}
      <div class="mobile-menu">
        <a href="#categories" on:click={toggleMenu}>Kategori</a>
        <a href="#features" on:click={toggleMenu}>Fitur</a>
        <a href="#mentors" on:click={toggleMenu}>Mentor</a>
        <div class="mobile-auth">
          <a href="/login" class="btn-login">Masuk</a>
          <a href="/login" class="btn-register-mobile">Daftar Sekarang</a>
        </div>
      </div>
    {/if}
  </nav>

  <header class="hero">
    <div class="container hero-grid">
      <div class="hero-text">
        <div class="badge-pill">🚀 #1 Learning Platform in Indonesia</div>
        <h1>
          Belajar Skill <br>
          <span class="highlight">
            {currentText}<span class="cursor">|</span>
          </span>
          <br>
          Jadi Lebih Mudah.
        </h1>
        <p>Bergabung dengan komunitas belajar modern. Akses materi berkualitas tinggi langsung dari praktisi ahli di bidangnya.</p>
        <div class="hero-btns">
          <a href="/login" class="btn-primary">Mulai Belajar Sekarang</a>
          <button class="btn-secondary"><span class="play-icon">▶</span> Tonton Demo</button>
        </div>
        <div class="trust-proof">
          <div class="avatar-group">
            <img src="https://ui-avatars.com/api/?name=A&background=random" alt="u">
            <img src="https://ui-avatars.com/api/?name=B&background=random" alt="u">
            <img src="https://ui-avatars.com/api/?name=C&background=random" alt="u">
          </div>
          <div class="trust-text">
            <strong>1000+ Siswa</strong> <br>telah bergabung minggu ini.
          </div>
        </div>
      </div>

      <div class="hero-image">
        <img src="/foto it.jpg" alt="Student" class="main-img">
        <div class="float-card card-1">
          <div class="icon-box">🎨</div>
          <div><strong>UI Design</strong><div class="progress-bar"><div class="fill" style="width: 80%"></div></div></div>
        </div>
        <div class="float-card card-2">
          <div class="check-icon">✓</div>
          <div><strong>Course Completed!</strong><small></small></div>
        </div>
      </div>
    </div>
  </header>

  <section class="partners">
    <div class="container">
      <p>Dipercaya oleh perusahaan teknologi terdepan</p>
      <div class="logos-grid">
        <span class="logo-text">OKEOCE</span>
        <span class="logo-text">Gojek</span>
        <span class="logo-text">Tokopedia</span>
        <span class="logo-text">Traveloka</span>
        <span class="logo-text">Microsoft</span>
      </div>
    </div>
  </section>

  <section class="categories" id="categories">
    <div class="container">
      <div class="section-head">
        <h2>Top Popular Categories</h2>
        <p>Temukan passion barumu dan mulai belajar hari ini.</p>
      </div>
      
      <div class="cat-grid">
        {#each categories as cat}
          <a href="/login" class="cat-card">
            <div class="cat-bg" style="background-image: url('{cat.img}')"></div>
            <div class="cat-overlay"></div>
            
            <div class="cat-content">
              <div class="cat-icon-box">{cat.icon}</div>
              <div class="cat-text">
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
              <div class="cat-arrow">➔</div>
            </div>
          </a>
        {/each}
      </div>

      <div class="center-btn">
        <a href="/login" class="btn-outline">Lihat Semua Kategori</a>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <div class="section-head">
        <h2>Kenapa Harus Khwarizmi?</h2>
        <p>Platform belajar mandiri yang didesain agar kamu cepat paham, bukan cepat bosan.</p>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon-simple">⏰</div>
          <h3>Belajar Semau Kamu</h3>
          <p>Gak ada jadwal kaku. Mau belajar subuh, siang, atau tengah malam, akses materi 24/7 sesuka hatimu.</p>
        </div>
        <div class="feature-card">
          <div class="icon-simple">⚡</div>
          <h3>Materi To-The-Point</h3>
          <p>Kami membuang teori membosankan. Kurikulum didesain padat, singkat, dan langsung praktik ke studi kasus.</p>
        </div>
        <div class="feature-card">
          <div class="icon-simple">🎮</div>
          <h3>Gamifikasi Seru</h3>
          <p>Dapatkan XP, naikkan Level, dan raih Badge eksklusif setiap kali kamu menyelesaikan materi. Belajar jadi adiktif!</p>
        </div>
        <div class="feature-card">
          <div class="icon-simple">∞</div>
          <h3>Akses Seumur Hidup</h3>
          <p>Lupa materi? Tinggal tonton ulang. Sekali bergabung, seluruh materi menjadi milikmu selamanya tanpa biaya tambahan.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="pricing" id="pricing">
    <div class="container">
      <div class="section-head">
        <div class="badge-pill orange">INVESTASI TERBAIK</div>
        <h2>Pilih Paket Belajarmu</h2>
        <p>Mulai gratis atau buka potensi penuhmu dengan paket PRO.</p>
      </div>

      <div class="pricing-grid">
        <div class="price-card">
          <div class="plan-name">Starter</div>
          <div class="price">
            Rp 0 <span class="period">/ selamanya</span>
          </div>
          <p class="desc">Cukup untuk sekadar melihat-lihat dan belajar dasar.</p>
          <ul class="features-list">
            <li>✅ Akses Materi Gratis</li>
            <li>✅ 1x Kuis per Hari</li>
            <li>❌ Sertifikat Kompetensi</li>
            <li>❌ Grup Diskusi Mentor</li>
            <li>❌ Download Video Offline</li>
          </ul>
          <a href="/login" class="btn-outline-full">Daftar Gratis</a>
        </div>

        <div class="price-card pro-plan">
          <div class="popular-badge">PALING DIMINATI 🔥</div>
          <div class="plan-name text-white">Pro Member</div>
          <div class="price text-white">
            Rp 49rb <span class="period text-white-50">/ bulan</span>
          </div>
          <p class="desc text-white-80">Akses tanpa batas untuk karir masa depanmu.</p>
          <ul class="features-list text-white">
            <li>✅ <strong>Unlimited Access</strong> ke Semua Kelas</li>
            <li>✅ Sertifikat Resmi & Portfolio</li>
            <li>✅ <strong>Prioritas Mentoring</strong> (Chat Langsung)</li>
            <li>✅ Review CV & Portfolio Kerja</li>
            <li>✅ Akses Webinar Eksklusif</li>
          </ul>
          <a href="/login" class="btn-white-full">Langganan Sekarang</a>
        </div>

        <div class="price-card">
          <div class="plan-name">Lifetime</div>
          <div class="price">
            Rp 999rb <span class="period">/ sekali bayar</span>
          </div>
          <p class="desc">Komitmen jangka panjang? Bayar sekali, akses selamanya.</p>
          <ul class="features-list">
            <li>✅ Semua Fitur Pro Member</li>
            <li>✅ <strong>Akses Seumur Hidup</strong></li>
            <li>✅ Merchandise Eksklusif</li>
            <li>✅ 1-on-1 Career Coaching (1x)</li>
            <li>✅ VIP Support Jalur Cepat</li>
          </ul>
          <a href="/login" class="btn-outline-full">Beli Lifetime</a>
        </div>
      </div>
    </div>
  </section>

  <section class="split-section" bind:this={splitContainer}>
    <div class="sticky-wrapper">
      
      <div class="hidden-content" style="opacity: {splitProgress > 0.6 ? 1 : 0}; transform: scale({0.8 + (splitProgress * 0.2)});">
        <div class="content-box-cta">
          <h2>Are you ready to<br>change your career?</h2>
          <p>Dunia teknologi terus berkembang. Jangan hanya jadi penonton, jadilah pemain utama di era digital ini.</p>
          
          <div class="cta-actions">
            <a href="/login" class="btn-pulse">LOGIN SEKARANG ➔</a>
            <small>Daftar gratis, batalkan kapan saja.</small>
          </div>
        </div>
      </div>

      <div class="door top" style="transform: translateY(-{splitProgress * 100}%)">
        <div class="door-inner">
          <h1 class="split-text">ARE YOU READY?</h1>
        </div>
      </div>

      <div class="door bottom" style="transform: translateY({splitProgress * 100}%)">
        <div class="door-inner">
          <h1 class="split-text">ARE YOU READY?</h1>
        </div>
      </div>

    </div>
  </section>

  <footer class="footer-dark">
    <div class="container">
      
      <div class="footer-top">
        
        <div class="f-brand-box">
          <div class="brand text-white">
            <div class="logo-sq">Al</div>
            <span>Khwarizmi.</span>
          </div>
          <p class="f-desc">
            Platform edukasi teknologi no.1 di Indonesia. Kami membantu kamu beralih karir ke dunia digital dengan kurikulum praktis dan mentor ahli.
          </p>
          <div class="f-socials">
            <a href="https://www.instagram.com/alkhwarizmi.id/?hl=id" class="social-icon">Instagram ↗</a>
            <a href="https://www.instagram.com/alkhwarizmi.id/?hl=id" class="social-icon">LinkedIn ↗</a>
            <a href="#" class="social-icon">Website ↗</a>
          </div>
        </div>

        <div class="f-links-col">
          <h4>Belajar</h4>
          <a href="#">Semua Kelas</a>
          <a href="#">Bootcamp Intensif</a>
          <a href="#">Webinar Gratis</a>
          <a href="#">Alur Belajar</a>
        </div>

        <div class="f-links-col">
          <h4>Tentang Kami</h4>
          <a href="#">Kisah Alumni</a>
          <a href="#">Karir Mentor</a>
          <a href="#">Hubungi Kami</a>
          <a href="#">Syarat & Ketentuan</a>
        </div>

        <div class="f-newsletter">
          <h4>Jangan Ketinggalan Info</h4>
          <p>Dapatkan tips karir & diskon spesial setiap minggu.</p>
          <form class="newsletter-form" on:submit|preventDefault>
            <input type="email" placeholder="Email kamu..." required>
            <button type="submit">Subscribe</button>
          </form>
          <small>Kami benci spam. Data kamu aman 🔒</small>
        </div>

      </div>

      <div class="footer-bottom">
        <div class="copyright-text">
          &copy; 2026 Inisiasi Learning. All rights reserved.
        </div>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>

    </div>
  </footer>

</div>

<style>
  /* --- GLOBAL SETUP --- */
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; font-family: 'Poppins', sans-serif; background: #FAFAFA; color: #1F2937; overflow-x: hidden; }
  .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
  a { text-decoration: none; color: inherit; transition: 0.2s; }

  /* --- NAVBAR --- */
  .navbar { position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); padding: 18px 0; border-bottom: 1px solid #F3F4F6; }
  .nav-wrapper { display: flex; justify-content: space-between; align-items: center; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.5rem; color: #111827; }
  .logo-sq { width: 38px; height: 38px; background: #F97316; border-radius: 10px; display: grid; place-items: center; color: white; font-size: 1.2rem; }
  .nav-links { display: flex; gap: 35px; font-weight: 500; color: #4B5563; }
  .nav-links a:hover { color: #F97316; }
  .nav-actions { display: flex; gap: 15px; align-items: center; }
  .desktop-auth { display: flex; gap: 15px; align-items: center; }
  .btn-login { font-weight: 700; color: #374151; }
  .btn-login:hover { color: #F97316; }
  .btn-register { background: #1F2937; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 0.95rem; transition: 0.3s; }
  .btn-register:hover { background: #F97316; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(249, 115, 22, 0.2); }
  .hamburger { display: none; background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #1F2937; }
  .mobile-menu { position: absolute; top: 100%; left: 0; width: 100%; background: white; border-bottom: 1px solid #E5E7EB; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 15px; text-align: center; }
  .btn-register-mobile { background: #F97316; color: white; padding: 12px; border-radius: 10px; font-weight: 700; }

  /* --- HERO SECTION --- */
  .hero { padding: 80px 0 100px 0; overflow: hidden; }
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .badge-pill { display: inline-block; background: #FFF7ED; color: #F97316; font-size: 0.85rem; font-weight: 700; padding: 8px 16px; border-radius: 50px; margin-bottom: 25px; border: 1px solid #FED7AA; }
  .hero h1 { font-size: 3.5rem; line-height: 1.2; color: #111827; margin: 0 0 25px 0; font-weight: 800; }
  .highlight { color: #F97316; position: relative; }
  .cursor { animation: blink 1s infinite; color: #111827; font-weight: 100; margin-left: 2px; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .hero p { font-size: 1.15rem; color: #6B7280; line-height: 1.7; margin-bottom: 40px; max-width: 90%; }
  .hero-btns { display: flex; gap: 15px; margin-bottom: 50px; }
  .btn-primary { background: #F97316; color: white; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 1.05rem; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3); transition: 0.3s; }
  .btn-primary:hover { transform: translateY(-3px); background: #EA580C; }
  .btn-secondary { background: white; color: #374151; padding: 16px 32px; border: 1px solid #E5E7EB; border-radius: 50px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 1.05rem; transition: 0.3s; }
  .btn-secondary:hover { border-color: #D1D5DB; background: #F9FAFB; }
  .play-icon { font-size: 0.8rem; color: #F97316; }
  .trust-proof { display: flex; align-items: center; gap: 15px; }
  .avatar-group { display: flex; }
  .avatar-group img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid white; margin-left: -15px; }
  .avatar-group img:first-child { margin-left: 0; }
  .trust-text { font-size: 0.9rem; line-height: 1.4; color: #4B5563; }
  .hero-image { position: relative; display: flex; justify-content: center; }
  .main-img { width: 90%; position: relative; z-index: 1; border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
  .float-card { position: absolute; background: white; padding: 15px 20px; border-radius: 16px; box-shadow: 0 2px 10px #c0c0c0 ; z-index: 2; display: flex; align-items: center; gap: 12px; animation: float 6s ease-in-out infinite; max-width: 200px; }
  .card-1 { top: 10%; left: -20px; }
  .card-2 { bottom: -5%; right: -20px; animation-delay: 2s; }
  .icon-box { width: 40px; height: 40px; background: #FFF7ED; border-radius: 10px; display: grid; place-items: center; font-size: 1.2rem; }
  .check-icon { width: 40px; height: 40px; background: #10B981; color: white; border-radius: 50%; display: grid; place-items: center; font-weight: bold; }
  .progress-bar { width: 80px; height: 6px; background: #F3F4F6; border-radius: 10px; margin-top: 5px; }
  .fill { height: 100%; background: #F97316; border-radius: 10px; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

  /* --- PARTNERS --- */
  .partners { padding: 40px 0; border-top: 1px solid #F3F4F6; border-bottom: 1px solid #F3F4F6; text-align: center; }
  .partners p { color: #9CA3AF; font-size: 0.95rem; margin-bottom: 25px; font-weight: 500; }
  .logos-grid { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; }
  .logo-text { font-size: 1.5rem; font-weight: 800; color: #D1D5DB; text-transform: uppercase; letter-spacing: 1px; }

  /* --- KATEGORI --- */
  .categories { padding: 80px 0; background: #FFFFFF; }
  .section-head { text-align: center; max-width: 600px; margin: 0 auto 60px auto; }
  .section-head h2 { font-size: 2.5rem; color: #111827; margin-bottom: 15px; }
  .section-head p { font-size: 1.1rem; color: #6B7280; }
  .cat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 50px; }
  .cat-card { position: relative; height: 220px; border-radius: 20px; overflow: hidden; display: flex; align-items: flex-end; padding: 25px; text-decoration: none; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: 0.3s; }
  .cat-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.5s ease; z-index: 1; }
  .cat-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%); z-index: 2; }
  .cat-card:hover .cat-bg { transform: scale(1.1); }
  .cat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2); }
  .cat-content { position: relative; z-index: 3; display: flex; align-items: center; justify-content: space-between; width: 100%; }
  .cat-icon-box { font-size: 2rem; margin-right: 15px; background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 50px; height: 50px; display: grid; place-items: center; border-radius: 12px; }
  .cat-text h3 { margin: 0; font-size: 1.2rem; font-weight: 700; }
  .cat-text p { margin: 5px 0 0 0; font-size: 0.85rem; opacity: 0.9; font-weight: 500; }
  .cat-arrow { background: white; color: #1F2937; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-weight: bold; transition: 0.3s; }
  .cat-card:hover .cat-arrow { background: #F97316; color: white; transform: rotate(-45deg); }
  .center-btn { text-align: center; }
  .btn-outline { border: 2px solid #E5E7EB; color: #374151; padding: 15px 30px; border-radius: 50px; font-weight: 700; display: inline-block; transition: 0.2s; }
  .btn-outline:hover { border-color: #F97316; color: #F97316; background: #FFF7ED; }

  /* --- FEATURES --- */
  .features { padding: 80px 0; background: #FAFAFA; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
  .feature-card { padding: 30px; border-radius: 20px; transition: 0.3s; border: 1px solid white; background: white; }
  .feature-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.05); transform: translateY(-10px); }
  .icon-simple { font-size: 2.5rem; margin-bottom: 20px; display: inline-block; }
  .feature-card h3 { font-size: 1.25rem; margin-bottom: 10px; color: #111827; }
  .feature-card p { color: #6B7280; line-height: 1.6; }

  /* --- PRICING SECTION --- */
  .pricing { padding: 80px 0; background: #FAFAFA; }
  .badge-pill.orange { background: #FFF7ED; color: #F97316; border: 1px solid #FED7AA; display: inline-block; padding: 5px 15px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; margin-bottom: 15px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; align-items: center; }
  .price-card { background: white; padding: 40px; border-radius: 24px; border: 1px solid #E5E7EB; position: relative; transition: 0.3s; }
  .price-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
  .pro-plan { background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); border: none; box-shadow: 0 20px 50px rgba(249, 115, 22, 0.3); transform: scale(1.05); z-index: 2; }
  .pro-plan:hover { transform: scale(1.08); }
  .popular-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: #111827; color: white; padding: 8px 16px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }
  .plan-name { font-size: 1.2rem; font-weight: 700; color: #111827; margin-bottom: 15px; }
  .text-white { color: white !important; }
  .price { font-size: 2.5rem; font-weight: 800; color: #111827; margin-bottom: 10px; }
  .period { font-size: 1rem; color: #6B7280; font-weight: 500; }
  .text-white-50 { color: rgba(255,255,255,0.6); }
  .desc { font-size: 0.95rem; color: #6B7280; margin-bottom: 30px; line-height: 1.5; }
  .text-white-80 { color: rgba(255,255,255,0.9); }
  .features-list { list-style: none; padding: 0; margin: 0 0 30px 0; }
  .features-list li { margin-bottom: 12px; font-size: 0.95rem; color: #374151; display: flex; align-items: center; gap: 10px; }
  .pro-plan .features-list li { color: white; }
  .btn-outline-full { display: block; width: 100%; text-align: center; padding: 15px; border: 2px solid #E5E7EB; border-radius: 50px; font-weight: 700; color: #374151; transition: 0.2s; }
  .btn-outline-full:hover { border-color: #111827; color: #111827; background: white; }
  .btn-white-full { display: block; width: 100%; text-align: center; padding: 15px; background: white; border-radius: 50px; font-weight: 700; color: #F97316; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: 0.2s; }
  .btn-white-full:hover { background: #FFF7ED; transform: translateY(-2px); }

  /* -------------------------------------
     🚀 SPLIT ANIMATION STYLES
     ------------------------------------- */
  
  .split-section {
    height: 300vh; /* Tinggi area scroll */
    position: relative;
    background: #111827; /* Dark background untuk hidden content */
    margin-top: 50px;
  }

  .sticky-wrapper {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* --- DOORS (Pintu Putih) --- */
  .door {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50vh;
    background: #FFFFFF;
    overflow: hidden;
    z-index: 20;
    will-change: transform;
    border-color: #F3F4F6;
  }
  .door.top { top: 0; border-bottom: 1px solid #ddd; }
  .door.bottom { bottom: 0; border-top: 1px solid #ddd; }

  /* --- BIG TEXT ("ARE YOU READY") --- */
  .door-inner {
    position: absolute;
    left: 0; width: 100%; height: 100%;
  }

  .split-text {
    font-size: 10vw; /* Responsif, sangat besar */
    font-weight: 900;
    color: #F97316;
    text-transform: uppercase;
    text-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
    position: absolute;
    left: 50%;
    margin: 0;
    white-space: nowrap;
    line-height: 1;
    letter-spacing: -3px;
    user-select: none;
  }

  /* Text Pintu Atas (nempel bawah) */
  .door.top .split-text {
    bottom: 0;
    transform: translate(-50%, 50%);
  }

  /* Text Pintu Bawah (nempel atas) */
  .door.bottom .split-text {
    top: 0;
    transform: translate(-50%, -50%);
  }

  /* --- HIDDEN CONTENT REVEAL --- */
  .hidden-content {
    position: absolute;
    z-index: 10;
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  }

  .content-box-cta {
    max-width: 800px;
  }

  .content-box-cta h2 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 20px;
    font-weight: 800;
    background: linear-gradient(to right, #FFF, #FED7AA);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content-box-cta p {
    font-size: 1.3rem;
    color: #D1D5DB;
    margin-bottom: 50px;
    line-height: 1.6;
  }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .cta-actions small {
    color: #6B7280;
    font-size: 0.9rem;
  }

  /* PULSE BUTTON */
  .btn-pulse {
    display: inline-block;
    background: #F97316;
    color: white;
    padding: 22px 60px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 1.3rem;
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
    animation: pulse-orange 2s infinite;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @keyframes pulse-orange {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
  }

  /* -------------------------------------
     🔥 NEW: MODERN DARK FOOTER STYLES
     ------------------------------------- */
  
  .footer-dark {
    background: #0F172A; /* Dark Blue/Black */
    color: #94A3B8; /* Slate Gray Text */
    padding: 80px 0 30px 0;
    font-size: 0.95rem;
    position: relative;
    z-index: 50; /* Pastikan di atas elemen lain */
  }

  /* Agar Text Brand Putih */
  .text-white { color: white !important; }

  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr; /* Kolom 1 & 4 lebih lebar */
    gap: 60px;
    margin-bottom: 60px;
  }

  /* Kolom 1: Brand */
  .f-desc {
    margin-top: 20px;
    line-height: 1.7;
    margin-bottom: 30px;
    max-width: 350px;
  }

  .f-socials {
    display: flex;
    gap: 15px;
  }

  .social-icon {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    background: rgba(255,255,255,0.1);
    padding: 8px 15px;
    border-radius: 50px;
    transition: 0.3s;
  }

  .social-icon:hover {
    background: #F97316;
    color: white;
    transform: translateY(-3px);
  }

  /* Kolom Link */
  .f-links-col h4, .f-newsletter h4 {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 25px;
  }

  .f-links-col {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .f-links-col a {
    transition: 0.2s;
  }

  .f-links-col a:hover {
    color: #F97316;
    padding-left: 5px; /* Efek geser sedikit saat hover */
  }

  /* Kolom Newsletter */
  .newsletter-form {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .newsletter-form input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px 15px;
    border-radius: 8px;
    color: white;
    width: 100%;
    outline: none;
    transition: 0.3s;
  }

  .newsletter-form input:focus {
    border-color: #F97316;
    background: rgba(255,255,255,0.1);
  }

  .newsletter-form button {
    background: #F97316;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
  }

  .newsletter-form button:hover {
    background: #EA580C;
    transform: translateY(-2px);
  }

  .f-newsletter small {
    font-size: 0.8rem;
    color: #64748B;
  }

  /* Bagian Bawah */
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .legal-links {
    display: flex;
    gap: 30px;
  }

  .legal-links a:hover {
    color: white;
    text-decoration: underline;
  }

  /* --- RESPONSIVE ADJUSTMENTS --- */
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .hero-text { margin-bottom: 50px; }
    .hero-btns, .trust-proof { justify-content: center; }
    .hero h1 { font-size: 2.8rem; }
    
    .nav-links, .desktop-auth { display: none; }
    .hamburger { display: block; }
    .pro-plan { transform: scale(1); margin: 20px 0; }
    
    /* Responsive Split Animation */
    .split-text { font-size: 15vw; } 
    .content-box-cta h2 { font-size: 2.5rem; }
    .content-box-cta p { font-size: 1rem; }
    .btn-pulse { padding: 18px 40px; font-size: 1rem; }

    /* Responsive Footer */
    .footer-top {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
    
    .newsletter-form {
      flex-direction: column;
    }
    
    .newsletter-form button {
      padding: 12px;
    }
  }
</style>