<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  // --- Types ---
  type ProgramItem = { name: string; items?: string[] };
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
      programs: [{ name: "Materi QCB", items: ["3 Alat Belajar", "Sumber Kejahatan", "Akhirat Prioritas", "Takdir"] }, { name: "Mentoring & Kemandirian" }, { name: "Hadits Character Building" }],
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

  // --- State ---
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
            <div class="icon-wrapper">{item.icon}</div>
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
      <div class="modal-window" onclick={(e) => e.stopPropagation()} transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: quintOut }}>
        <div class="modal-header {selectedAcademy.theme}">
          <div class="header-pattern"></div>

          <div class="header-top-row">
            <span class="header-badge">PROGRAM DETAIL</span>
            <button class="close-btn" onclick={closeModal}>✕</button>
          </div>

          <div class="header-main">
            <div class="header-icon-box">
              {selectedAcademy.icon}
            </div>
            <div class="header-text">
              <h3>{selectedAcademy.title}</h3>
              <p>{selectedAcademy.fullDesc}</p>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <h4 class="curriculum-label">Materi Pembelajaran</h4>
          <div class="list-container">
            {#each selectedAcademy.programs as prog, i}
              <div class="program-card">
                <div class="program-number {selectedAcademy.theme}">{i + 1}</div>
                <div class="program-info">
                  <span class="program-title">{prog.name}</span>
                  {#if prog.items}
                    <div class="tags">
                      {#each prog.items as tag}
                        <span class="tag-chip {selectedAcademy.theme}">{tag}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="modal-footer">
          <button class="cta-btn {selectedAcademy.theme}" onclick={closeModal}>Daftar Sekarang</button>
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
    --bg-modal: #f8fafc;
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
    align-items: flex-start;
    padding: 40px 20px;
    box-sizing: border-box;
  }
  .content-container {
    width: 100%;
    max-width: 1280px;
  }

  /* HEADER MAIN PAGE */
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  .pill {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1px;
    background: white;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    color: var(--text-muted);
  }
  h1 {
    font-size: 2rem;
    margin: 10px 0 5px;
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

  /* GRID */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
  }
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

  /* CARD STYLES */
  .card {
    position: relative;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    padding: 24px;
    text-align: left;
    cursor: pointer;
    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 220px;
    justify-content: space-between;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
  }
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
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .icon-wrapper {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-size: 1.4rem;
  }
  .arrow-icon {
    font-size: 1.1rem;
    opacity: 0;
    transform: translate(-5px, 5px);
    transition: 0.3s;
  }
  .card:hover .arrow-icon {
    opacity: 1;
    transform: translate(0, 0);
  }
  .card-content h2 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0 0 6px;
    color: var(--text);
  }
  .card-content p {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.4;
  }

  /* --- MODAL STYLES --- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal-window {
    background: var(--bg-modal);
    width: 100%;
    max-width: 550px;
    max-height: 85vh;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* --- NEW HEADER CSS --- */
  .modal-header {
    padding: 24px 28px;
    position: relative;
    /* Membuat flex container agar isi rapi */
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Themed Backgrounds for Header */
  .modal-header.teal {
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
    color: var(--teal-dark);
    border-bottom: 1px solid #99f6e4;
  }
  .modal-header.orange {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
    color: var(--orange-dark);
    border-bottom: 1px solid #fed7aa;
  }

  .header-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-badge {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 1px;
    background: rgb(255, 225, 190);
    padding: 4px 10px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.5);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 1rem;
    cursor: pointer;
    color: inherit;
    display: grid;
    place-items: center;
    transition: 0.2s;
  }
  .close-btn:hover {
    background: white;
    transform: rotate(90deg);
  }

  .header-main {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .header-icon-box {
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 18px;
    font-size: 2rem;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }

  .header-text h3 {
    color: black;
    margin: 0;
    font-size: 1.4rem;
    font-weight: 800;
    line-height: 1.1;
  }
  .header-text p {
    margin: 6px 0 0;
    font-size: 0.85rem;
    opacity: 0.85;
    line-height: 1.3;
  }

  /* --- BODY & LIST --- */
  .modal-body {
    padding: 24px 28px;
    overflow-y: auto;
    scrollbar-width: thin;
  }
  .curriculum-label {
    margin: 0 0 16px;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    font-weight: 700;
  }

  .list-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .program-card {
    background: white;
    padding: 16px;
    border-radius: 16px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.04);
  }

  /* Numbering Colors */
  .program-number {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    font-size: 0.85rem;
    font-weight: 800;
  }
  .program-number.teal {
    background: var(--teal-bg);
    color: var(--teal-dark);
  }
  .program-number.orange {
    background: var(--orange-bg);
    color: var(--orange-dark);
  }

  .program-info {
    width: 100%;
  }
  .program-title {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 6px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .tag-chip {
    font-size: 0.75rem;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 500;
  }
  .tag-chip.teal {
    background: #f0fdfa;
    color: var(--teal-dark);
    border: 1px solid #ccfbf1;
  }
  .tag-chip.orange {
    background: #fff7ed;
    color: var(--orange-dark);
    border: 1px solid #ffedd5;
  }

  /* FOOTER */
  .modal-footer {
    padding: 20px 28px;
    background: white;
    border-top: 1px solid #e2e8f0;
  }
  .cta-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 14px;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .cta-btn:hover {
    filter: brightness(0.95);
    transform: translateY(-2px);
  }
  .cta-btn.teal {
    background: var(--teal);
  }
  .cta-btn.orange {
    background: var(--orange);
  }

  @media (max-width: 600px) {
    .modal-window {
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }
  }
</style>
