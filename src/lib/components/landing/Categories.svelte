<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  // --- Types ---
  type ProgramItem = {
    name: string;
    items?: string[];
  };

  type Academy = {
    id: string;
    title: string;
    icon: string;
    theme: "teal" | "orange";
    shortDesc: string;
    fullDesc: string;
    programs: ProgramItem[];
  };

  // --- Data ---
  const academies: Academy[] = [
    {
      id: "it",
      title: "IT ACADEMY",
      icon: "💻",
      theme: "orange",
      shortDesc: "Master Tech & Values",
      fullDesc: "Mulai perjalanan teknologimu dari dasar hingga mahir dengan pondasi mindset Islami.",
      programs: [
        { name: "ITMI (Islamic Tech Mindset)" },
        { name: "Computer for Beginner", items: ["Word", "Office", "PPT"] },
        { name: "Skill Set Academy", items: ["Design", "UI/UX", "Video"] },
        { name: "Programming Class", items: ["Web Dev", "Frontend", "Backend"] },
        { name: "Freelance Academy", items: ["Portofolio", "Cuan Skill"] },
      ],
    },
    {
      id: "quran",
      title: "QURAN ACADEMY",
      icon: "📖",
      theme: "teal",
      shortDesc: "Interact with Quran",
      fullDesc: "Perbaiki bacaan, hafalan, hingga pemahaman makna ayat suci Al-Quran.",
      programs: [{ name: "RBQ (Reflek Baca Quran)" }, { name: "RTQ (Reflek Tahsin Quran)" }, { name: "RHQ (Reflek Hafal Quran)" }, { name: "RAQ (Reflek Analisatif Quran)" }],
    },
    {
      id: "character",
      title: "CHARACTER BLDG",
      icon: "🕌",
      theme: "teal",
      shortDesc: "Shape Your Character",
      fullDesc: "Bentuk karakter istimewa dalam diri dengan panduan ayat-ayat pilihan dan hadits.",
      programs: [{ name: "Materi QCB", items: ["3 Alat Belajar", "Sumber Kejahatan", "Akhirat Prioritas", "Makna Ujian", "Takdir"] }, { name: "Mentoring & Kemandirian" }, { name: "Hadits Character Building" }],
    },
    {
      id: "language",
      title: "LANGUAGE ACADEMY",
      icon: "🗣️",
      theme: "orange",
      shortDesc: "Speak Confidently",
      fullDesc: "Tingkatkan skill komunikasi, public speaking, dan bahasa asing.",
      programs: [{ name: "Komunikasi Islam" }, { name: "Second Language Potential" }, { name: "English Class" }, { name: "Arabic Class" }],
    },
  ];

  // --- State (Svelte 5) ---
  let selectedAcademy = $state<Academy | null>(null);

  const openModal = (item: Academy) => {
    selectedAcademy = item;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    selectedAcademy = null;
    document.body.style.overflow = "auto";
  };
</script>

<div class="main-wrapper">
  <div class="content-container">
    <div class="header">
      <span class="pill">KHWARIZMI ACADEMY</span>
      <h1>Program <span class="gradient-text">Unggulan</span></h1>
      <p>Klik kartu untuk detail kurikulum.</p>
    </div>

    <div class="card-grid">
      {#each academies as item}
        <button class="card {item.theme}" onclick={() => openModal(item)}>
          <div class="card-bg-glow"></div>
          <div class="card-top">
            <div class="icon-wrapper">
              {item.icon}
            </div>
            <div class="arrow-icon">↗</div>
          </div>

          <div class="card-content">
            <h2>{item.title}</h2>
            <p>{item.shortDesc}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>

  {#if selectedAcademy}
    <div class="modal-backdrop" onclick={closeModal} transition:fade={{ duration: 200 }}>
      <div class="modal-window {selectedAcademy.theme}" onclick={(e) => e.stopPropagation()} transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: quintOut }}>
        <div class="modal-header">
          <div class="modal-icon-large">{selectedAcademy.icon}</div>
          <div>
            <h3>{selectedAcademy.title}</h3>
            <p class="modal-subtitle">{selectedAcademy.fullDesc}</p>
          </div>
          <button class="close-btn" onclick={closeModal}>✕</button>
        </div>

        <div class="modal-body">
          <div class="list-container">
            {#each selectedAcademy.programs as prog, i}
              <div class="program-row">
                <div class="program-number">{i + 1}</div>
                <div class="program-info">
                  <h4>{prog.name}</h4>
                  {#if prog.items}
                    <div class="tags">
                      {#each prog.items as tag}
                        <span>{tag}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="modal-footer">
          <button class="cta-btn" onclick={closeModal}>Daftar Sekarang</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* --- COLORS --- */
  :root {
    --teal: #1e857f;
    --teal-dark: #0f4c47;
    --teal-bg: #ccfbf1;
    --orange: #f97316;
    --orange-dark: #c2410c;
    --orange-bg: #ffedd5;
    --text: #1e293b;
    --text-muted: #64748b;
  }

  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background: #f8fafc;
    color: var(--text);
  }

  .main-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  .content-container {
    width: 100%;
    max-width: 1280px; /* Lebar ditambah agar muat 4 kartu */
  }

  /* --- HEADER --- */
  .header {
    text-align: center;
    margin-bottom: 40px;
  }
  .pill {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1px;
    background: white;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    color: var(--text-muted);
  }
  h1 {
    font-size: 2.2rem;
    margin: 15px 0 5px;
    font-weight: 800;
  }
  .gradient-text {
    background: linear-gradient(135deg, var(--teal), var(--orange));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .header p {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.9rem;
  }

  /* --- GRID 4 KOLOM (INTI PERUBAHAN) --- */
  .card-grid {
    display: grid;
    /* PENTING: repeat(4, 1fr) memaksa 4 kolom sejajar */
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
  }

  /* Responsive: Di bawah 1024px jadi 2 kolom, di HP jadi 1 kolom */
  @media (max-width: 1024px) {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 600px) {
    .card-grid {
      grid-template-columns: 1fr;
    }
  }

  /* --- CARD STYLES --- */
  .card {
    position: relative;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    padding: 24px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 240px; /* Tinggi seragam */
    justify-content: space-between;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
  }

  /* Card Themes */
  .card.teal .icon-wrapper {
    background: var(--teal-bg);
    color: var(--teal-dark);
  }
  .card.teal:hover {
    border-color: var(--teal);
  }
  .card.teal .arrow-icon {
    color: var(--teal);
  }

  .card.orange .icon-wrapper {
    background: var(--orange-bg);
    color: var(--orange-dark);
  }
  .card.orange:hover {
    border-color: var(--orange);
  }
  .card.orange .arrow-icon {
    color: var(--orange);
  }

  /* Inner Card */
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    font-size: 1.6rem;
  }

  .arrow-icon {
    font-size: 1.2rem;
    opacity: 0;
    transform: translate(-5px, 5px);
    transition: 0.3s;
  }
  .card:hover .arrow-icon {
    opacity: 1;
    transform: translate(0, 0);
  }

  .card-content h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 8px;
    color: var(--text);
  }
  .card-content p {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.4;
  }

  /* --- MODAL STYLES --- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(5px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal-window {
    background: white;
    width: 100%;
    max-width: 550px;
    max-height: 80vh;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .modal-header {
    padding: 25px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    border-bottom: 1px solid #f1f5f9;
  }
  .modal-window.teal .modal-header {
    background: linear-gradient(to right, #f0fdfa, white);
  }
  .modal-window.orange .modal-header {
    background: linear-gradient(to right, #fff7ed, white);
  }

  .modal-icon-large {
    font-size: 2.2rem;
  }
  .modal-header h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 800;
  }
  .modal-subtitle {
    margin: 5px 0 0;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .close-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #94a3b8;
  }

  .modal-body {
    padding: 25px;
    overflow-y: auto;
  }

  .program-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  .program-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f1f5f9;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .modal-window.teal .program-number {
    background: var(--teal-bg);
    color: var(--teal-dark);
  }
  .modal-window.orange .program-number {
    background: var(--orange-bg);
    color: var(--orange-dark);
  }

  .program-info h4 {
    margin: 0 0 8px;
    font-size: 0.95rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tags span {
    font-size: 0.7rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 3px 8px;
    border-radius: 6px;
  }

  .modal-footer {
    padding: 20px 25px;
    border-top: 1px solid #f1f5f9;
    text-align: right;
  }
  .cta-btn {
    padding: 10px 24px;
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .modal-window.teal .cta-btn {
    background: var(--teal);
  }
  .modal-window.teal .cta-btn:hover {
    background: var(--teal-dark);
  }
  .modal-window.orange .cta-btn {
    background: var(--orange);
  }
  .modal-window.orange .cta-btn:hover {
    background: var(--orange-dark);
  }
</style>
