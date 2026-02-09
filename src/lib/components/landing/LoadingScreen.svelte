<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  export let isLoading = true;

  const messages = [
    "Menyiapkan Kelas Digital...",
    "Mengunduh Materi...",
    "Menghubungkan Mentor...",
    "Menyusun Algoritma...",
    "Membuka Gerbang Ilmu...",
    "Siap Belajar!"
  ];

  let currentMessage = messages[0];
  let progress = 0;
  let interval;
  let textInterval;

  // Partikel Matematika untuk Background (Agar tidak sepi)
  const mathSymbols = ["∑", "π", "√", "∞", "∫", "x²", "≠", "≈", "∆", "%"];

  onMount(() => {
    // 1. Progress Logic
    interval = setInterval(() => {
      progress += Math.random() * 6; // Sedikit lebih cepat
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => { isLoading = false; }, 800);
      }
    }, 100);

    // 2. Text Logic
    let i = 0;
    textInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      currentMessage = messages[i];
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(textInterval);
  });
</script>

{#if isLoading}
  <div class="loader-overlay" out:fade={{ duration: 600 }}>
    
    <div class="bg-particles">
      {#each mathSymbols as symbol, i}
        <div 
          class="particle" 
          style="
            top: {Math.random() * 100}%; 
            left: {Math.random() * 100}%; 
            animation-delay: {i * 0.5}s;
            font-size: {Math.random() * 20 + 10}px;
          "
        >
          {symbol}
        </div>
      {/each}
    </div>

    <div class="content-wrapper">
      
      <div class="orbit-system">
        
        <div class="ripple"></div>
        <div class="ripple delay-1"></div>

        <div class="nucleus-wrapper">
            <img src="/logo.jpg" alt="Khwarizmi Logo" class="nucleus-logo" />
        </div>

        <div class="orbit orbit-1"></div>
        <div class="orbit orbit-2"></div>
        <div class="orbit orbit-3"></div>
        
        <div class="electron e-1"></div>
        <div class="electron e-2"></div>
      </div>

      <div class="text-area">
        <h2 class="brand-name">KHWARIZMI <span class="highlight">ACADEMY</span></h2>
        
        <div class="msg-container">
          {#key currentMessage}
            <p class="loading-status" in:fly={{ y: 10, duration: 300 }}>
              {currentMessage}
            </p>
          {/key}
        </div>
      </div>

      <div class="progress-wrap">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
      <div class="percentage">{Math.floor(progress)}%</div>

    </div>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

  /* --- BASE OVERLAY --- */
  .loader-overlay {
    position: fixed;
    inset: 0;
    background: #ffffff; /* WHITE THEME */
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow: hidden;
  }

  /* --- BACKGROUND PARTICLES (BIAR GAK SEPI) --- */
  .bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    color: #cbd5e1; /* Abu-abu sangat muda */
    font-weight: 800;
    opacity: 0.4;
    user-select: none;
    animation: floatUp 10s linear infinite;
  }

  @keyframes floatUp {
    0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
    50% { opacity: 0.6; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* --- ORBIT SYSTEM --- */
  .orbit-system {
    width: 160px;
    height: 160px;
    position: relative;
    margin-bottom: 40px;
  }

  /* LOGO TENGAH */
  .nucleus-wrapper {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 70px; height: 70px;
    z-index: 5;
    /* Efek melayang */
    animation: floatLogo 3s ease-in-out infinite; 
  }

  .nucleus-logo {
    width: 100%; height: 100%;
    object-fit: contain; /* Agar logo utuh */
    /* Menghilangkan border dan diganti shadow halus */
    filter: drop-shadow(0 10px 15px rgba(249, 115, 22, 0.3)); 
  }

  /* RIPPLE EFFECT (Gelombang Air) */
  .ripple {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 60px; height: 60px;
    border-radius: 50%;
    background: rgba(249, 115, 22, 0.1);
    z-index: 1;
    animation: rippleAnim 2s linear infinite;
  }
  .delay-1 { animation-delay: 1s; }

  /* GARIS ORBIT (Tipis & Elegan) */
  .orbit {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid #e2e8f0; /* Abu-abu tipis */
  }

  .orbit-1 { animation: spin 4s linear infinite; border-top: 2px solid #f97316; } /* Orange */
  .orbit-2 { width: 120%; height: 120%; top: -10%; left: -10%; animation: spin 6s linear infinite reverse; border-right: 2px solid #3b82f6; opacity: 0.6; } /* Blue */
  .orbit-3 { width: 80%; height: 80%; top: 10%; left: 10%; animation: spin 3s linear infinite; border-bottom: 2px solid #10b981; opacity: 0.4; } /* Green */

  /* ELEKTRON */
  .electron {
    position: absolute;
    width: 10px; height: 10px;
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
  .e-1 { 
    background: #f97316; 
    box-shadow: 0 0 10px rgba(249,115,22,0.6);
    animation: orbitPath 4s linear infinite; 
    offset-path: path('M80,80 m-80,0 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0'); 
  }
  .e-2 { 
    background: #3b82f6; 
    box-shadow: 0 0 10px rgba(59,130,246,0.6);
    animation: orbitPath 6s linear infinite reverse; 
    offset-path: path('M96,96 m-96,0 a96,96 0 1,0 192,0 a96,96 0 1,0 -192,0'); 
  }

  /* --- TEXT STYLES --- */
  .text-area { text-align: center; margin-bottom: 20px; }
  
  .brand-name {
    color: #0f172a; /* Warna gelap kontras */
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin: 0 0 5px 0;
  }
  .highlight { color: #f97316; }

  .msg-container { height: 24px; overflow: hidden; }
  .loading-status { color: #64748b; font-size: 0.95rem; font-weight: 500; margin: 0; }

  /* --- PROGRESS BAR --- */
  .progress-wrap {
    width: 250px;
    height: 6px;
    background: #f1f5f9; /* Abu-abu track */
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f97316, #fb923c); /* Gradient Orange */
    border-radius: 10px;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
  }

  .percentage {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 700;
  }

  /* --- ANIMATIONS --- */
  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes floatLogo { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-5px); } }
  @keyframes rippleAnim {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
  }

  /* Responsive */
  @media (max-width: 480px) {
    .orbit-system { transform: scale(0.8); }
    .brand-name { font-size: 1.4rem; }
  }
</style>