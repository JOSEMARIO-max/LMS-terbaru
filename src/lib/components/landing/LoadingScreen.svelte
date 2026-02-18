<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let isLoading = true;

  const messages = [
    "Memuat Aset...",
    "Menyiapkan Kelas...",
    "Sinkronisasi Data...",
    "Hampir Siap..."
  ];

  let currentMessage = messages[0];
  let progress = 0;
  let interval: any;
  let textInterval: any;

  onMount(() => {
    // Progress Bar Logic (Smooth)
    interval = setInterval(() => {
      // Logika agar cepat di awal, pelan di akhir
      const remaining = 100 - progress;
      progress += remaining * 0.1; // Tambah 10% dari sisa
      
      if (progress > 99.5) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => { isLoading = false; }, 600);
      }
    }, 100);

    // Text Rotation Logic
    let i = 0;
    textInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      currentMessage = messages[i];
    }, 1500);
  });

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(textInterval);
  });
</script>

{#if isLoading}
  <div class="loader-overlay" out:fade={{ duration: 500 }}>
    
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="glass-surface"></div>

    <div class="content">
      
      <div class="logo-container">
        <div class="pulse-ring"></div>
        <img src="/logo.jpg" alt="Khwarizmi Logo" class="logo" />
      </div>

      <div class="text-wrapper">
        <h2 class="title">KHWARIZMI ACADEMY</h2>
        
        <div class="message-box">
          {#key currentMessage}
            <span class="message" in:fly={{ y: 10, duration: 300, easing: cubicOut }}>
              {currentMessage}
            </span>
          {/key}
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar" style="width: {progress}%"></div>
      </div>
      
      <div class="percentage">{Math.round(progress)}%</div>
    </div>

  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

  /* LAYOUT UTAMA */
  .loader-overlay {
    position: fixed;
    inset: 0;
    background: #fff7ed; /* Cream background (senada dengan login) */
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow: hidden;
  }

  /* BACKGROUND BLOBS (Modern Touch) */
  .bg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: floatBlob 10s infinite ease-in-out alternate;
  }
  .blob-1 {
    width: 400px; height: 400px;
    background: #fed7aa; /* Light Orange */
    top: -10%; left: -10%;
  }
  .blob-2 {
    width: 350px; height: 350px;
    background: #ffedd5; /* Very Light Orange */
    bottom: -10%; right: -10%;
    animation-delay: -5s;
  }
  
  /* Glass effect tipis di atas blob */
  .glass-surface {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(30px); /* Bikin blobnya makin halus menyatu */
  }

  /* CONTENT WRAPPER */
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 300px;
  }

  /* LOGO STYLES */
  .logo-container {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 20px; /* Rounded Box shape is more modern than circle sometimes */
    box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.2);
    z-index: 2;
  }

  .pulse-ring {
    position: absolute;
    inset: -5px;
    border-radius: 24px;
    border: 2px solid rgba(249, 115, 22, 0.1);
    animation: pulse 2s infinite;
    z-index: 1;
  }

  /* TEXT STYLES */
  .text-wrapper {
    text-align: center;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1e293b;
    margin: 0;
    margin-bottom: 0.25rem;
  }

  .message-box {
    height: 20px; /* Fixed height agar tidak lompat */
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .message {
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 500;
  }

  /* PROGRESS BAR (Minimalist) */
  .progress-container {
    width: 100%;
    height: 6px;
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: #f97316; /* Orange Brand */
    border-radius: 10px;
    transition: width 0.3s ease-out;
  }

  .percentage {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: -1.5rem; /* Tarik ke atas sedikit dekat bar */
  }

  /* ANIMATIONS */
  @keyframes floatBlob {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, 50px) scale(1.1); }
  }

  @keyframes pulse {
    0% { transform: scale(0.95); opacity: 0.5; }
    50% { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(0.95); opacity: 0; }
  }
</style>