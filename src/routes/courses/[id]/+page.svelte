<script>
  import { page } from "$app/stores";

  // Ambil ID dari URL (SvelteKit)
  const courseId = $page.params.id;

  // --- DUMMY DATA DETAIL KURSUS ---
  // Dalam aplikasi nyata, ini diambil dari database berdasarkan 'courseId'
  const courseDetail = {
    id: courseId,
    title: "Mastering Mobile App Design",
    description: "Pelajari cara merancang aplikasi mobile yang menarik dan fungsional dari nol. Kursus ini mencakup teori warna, tipografi, wireframing, hingga high-fidelity prototyping menggunakan Figma.",
    mentor: "Padhang Satrio",
    role: "Senior Product Designer",
    total_students: 1205,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  };

  // --- DUMMY PLAYLIST ---
  const playlist = [
    { id: 101, title: "Introduction to UI/UX", duration: "05:30", type: "video" },
    { id: 102, title: "Understanding User Flow", duration: "12:15", type: "video" },
    { id: 103, title: "Wireframing Basics", duration: "18:40", type: "video" },
    { id: 104, title: "Prototyping in Figma", duration: "25:10", type: "video" },
    { id: 105, title: "Design System 101", duration: "15:00", type: "lock" }, // Terkunci
    { id: 106, title: "Final Project Brief", duration: "08:20", type: "lock" },
  ];

  // --- SVELTE 5 STATE (RUNES) ---
  // Kita set video pertama sebagai default
  let currentVideo = $state(playlist[0]);

  // Fungsi ganti video
  function playVideo(video) {
    if (video.type === "lock") {
      alert("Selesaikan video sebelumnya untuk membuka materi ini!");
      return;
    }
    currentVideo = video;
  }
</script>

<div class="detail-container">
  <div class="nav-back">
    <a href="/dashboard" class="btn-back">← Kembali ke Dashboard</a>
  </div>

  <div class="main-layout">
    <div class="left-content">
      <div class="video-player">
        <div class="video-placeholder" style="background-image: url('{courseDetail.img}')">
          <div class="play-overlay">
            <button class="big-play-btn">▶</button>
          </div>
          <div class="video-ui">
            <span class="vid-title-overlay">Sedang memutar: {currentVideo.title}</span>
          </div>
        </div>
      </div>

      <div class="course-header">
        <h1>{courseDetail.title}</h1>
        <div class="meta-row">
          <div class="mentor-pill">
            <img src="https://ui-avatars.com/api/?name={courseDetail.mentor}" alt="m" />
            <div>
              <span class="m-name">{courseDetail.mentor}</span>
              <span class="m-role">{courseDetail.role}</span>
            </div>
          </div>
          <div class="stats">
            <span>⭐ {courseDetail.rating}</span>
            <span>👥 {courseDetail.total_students} Siswa</span>
          </div>
        </div>

        <div class="tabs">
          <button class="active">Deskripsi</button>
          <button>Diskusi</button>
          <button>Resource</button>
        </div>

        <p class="desc-text">
          {courseDetail.description}
        </p>
      </div>
    </div>

    <div class="right-sidebar">
      <div class="playlist-card">
        <div class="pl-header">
          <h3>Materi Kursus</h3>
          <span class="progress-text">2/{playlist.length} Selesai</span>
        </div>

        <div class="pl-items">
          {#each playlist as item, i}
            <button class="pl-item" class:active={currentVideo.id === item.id} class:locked={item.type === "lock"} onclick={() => playVideo(item)}>
              <div class="pl-number">{i + 1}</div>
              <div class="pl-info">
                <span class="pl-title">{item.title}</span>
                <span class="pl-dur">
                  {item.type === "lock" ? "🔒 Terkunci" : `🕒 ${item.duration}`}
                </span>
              </div>
              {#if currentVideo.id === item.id}
                <div class="playing-icon">Eq</div>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* GLOBAL & LAYOUT */
  .detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .nav-back {
    margin-bottom: 20px;
  }
  .btn-back {
    text-decoration: none;
    color: #6b7280;
    font-weight: 600;
    transition: 0.2s;
  }
  .btn-back:hover {
    color: #f97316;
    margin-left: -5px;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    align-items: start;
  }

  /* --- LEFT COLUMN: VIDEO --- */
  .video-player {
    width: 100%;
    aspect-ratio: 16/9;
    background: #000;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-bottom: 25px;
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
  }
  .video-placeholder {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .video-placeholder::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .big-play-btn {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.3s;
  }
  .big-play-btn:hover {
    background: #f97316;
    border-color: #f97316;
    transform: scale(1.1);
  }

  .video-ui {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  /* --- INFO SECTION --- */
  .course-header h1 {
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 15px;
    line-height: 1.2;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .mentor-pill {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .mentor-pill img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .m-name {
    display: block;
    font-weight: 700;
    color: #1f2937;
  }
  .m-role {
    display: block;
    font-size: 0.85rem;
    color: #6b7280;
  }

  .stats {
    display: flex;
    gap: 15px;
    font-weight: 600;
    color: #4b5563;
    background: #f3f4f6;
    padding: 8px 16px;
    border-radius: 50px;
  }

  .tabs {
    display: flex;
    gap: 20px;
    border-bottom: 2px solid #f3f4f6;
    margin-bottom: 20px;
  }
  .tabs button {
    background: none;
    border: none;
    padding-bottom: 10px;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    position: relative;
  }
  .tabs button.active {
    color: #f97316;
  }
  .tabs button.active::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #f97316;
  }

  .desc-text {
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.05rem;
  }

  /* --- RIGHT COLUMN: PLAYLIST --- */
  .playlist-card {
    background: white;
    border-radius: 20px;
    padding: 25px;
    border: 1px solid #f3f4f6;
    position: sticky;
    top: 20px; /* Sticky effect */
  }

  .pl-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .pl-header h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  .progress-text {
    font-size: 0.85rem;
    color: #f97316;
    font-weight: 700;
    background: #fff7ed;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .pl-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 5px;
  }

  .pl-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid transparent;
    cursor: pointer;
    text-align: left;
    transition: 0.2s;
    width: 100%;
  }
  .pl-item:hover {
    background: #f9fafb;
  }

  /* Active State */
  .pl-item.active {
    background: #fff7ed;
    border-color: #fed7aa;
  }
  .pl-item.active .pl-number {
    background: #f97316;
    color: white;
  }
  .pl-item.active .pl-title {
    color: #f97316;
  }

  /* Locked State */
  .pl-item.locked {
    opacity: 0.6;
    cursor: not-allowed;
    grayscale: 1;
  }

  .pl-number {
    width: 28px;
    height: 28px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 700;
    color: #9ca3af;
    flex-shrink: 0;
  }

  .pl-info {
    flex: 1;
  }
  .pl-title {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
    color: #374151;
    margin-bottom: 3px;
    line-height: 1.2;
  }
  .pl-dur {
    display: block;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .playing-icon {
    font-size: 0.7rem;
    font-weight: bold;
    color: #f97316;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* SCROLLBAR CUSTOM */
  .pl-items::-webkit-scrollbar {
    width: 6px;
  }
  .pl-items::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .main-layout {
      grid-template-columns: 1fr;
    }
    .right-sidebar {
      order: 2;
    }
    .playlist-card {
      position: static;
    }
  }
</style>
