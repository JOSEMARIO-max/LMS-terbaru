<script>
  // --- DATA DUMMY ---
  const allLessons = [
    {
      id: 1,
      title: "Mastering Mobile App Design",
      mentor: "Padhang Satrio",
      total: 24,
      done: 18,
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      status: "active",
      last_watched: "2 hours ago",
    },
    {
      id: 2,
      title: "HTML & CSS for Beginners",
      mentor: "Leonardo Samsul",
      total: 12,
      done: 12,
      img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80",
      status: "completed",
      completed_date: "12 Jan 2026",
    },
    {
      id: 3,
      title: "Advanced Brand Identity",
      mentor: "Bayu Salto",
      total: 20,
      done: 5,
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
      status: "active",
      last_watched: "1 day ago",
    },
    {
      id: 4,
      title: "React JS Fundamental",
      mentor: "Bagas Mahpie",
      total: 25,
      done: 0,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
      status: "saved",
      last_watched: "-",
    },
    {
      id: 5,
      title: "Digital Marketing 101",
      mentor: "Sarah Vi",
      total: 10,
      done: 10,
      img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80",
      status: "completed",
      completed_date: "20 Dec 2025",
    },
  ];

  // --- SVELTE 5 STATE (RUNES) ---
  let activeTab = $state("active");
  let searchQuery = $state("");

  // --- DERIVED STATE ---
  let filteredLessons = $derived(
    allLessons.filter((l) => {
      const tabMatch = activeTab === "all" ? true : l.status === activeTab;
      const searchMatch = l.title.toLowerCase().includes(searchQuery.toLowerCase());
      return tabMatch && searchMatch;
    }),
  );

  function getProgress(done, total) {
    return Math.round((done / total) * 100);
  }
</script>

<div class="page-container">
  <div class="header-section">
    <div class="title-group">
      <h1>My Learning</h1>
      <p class="subtitle">Track your progress and achievements.</p>
    </div>

    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search courses..." bind:value={searchQuery} />
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon orange">🔥</div>
      <div>
        <span class="stat-val">2</span>
        <span class="stat-label">In Progress</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">✅</div>
      <div>
        <span class="stat-val">14</span>
        <span class="stat-label">Completed</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue">⏱️</div>
      <div>
        <span class="stat-val">85h</span>
        <span class="stat-label">Hours Spent</span>
      </div>
    </div>
  </div>

  <div class="tabs-container">
    <button class:active={activeTab === "active"} onclick={() => (activeTab = "active")}>In Progress</button>
    <button class:active={activeTab === "completed"} onclick={() => (activeTab = "completed")}>Completed</button>
    <button class:active={activeTab === "saved"} onclick={() => (activeTab = "saved")}>Saved</button>
  </div>

  <div class="lesson-grid">
    {#if filteredLessons.length === 0}
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>No courses found</h3>
        <p>Try changing the filter or search keyword.</p>
      </div>
    {:else}
      {#each filteredLessons as item}
        <div class="lesson-card">
          <div class="card-thumb" style="background-image: url('{item.img}')">
            {#if item.status === "completed"}
              <div class="badge-done">Completed</div>
            {/if}
            <div class="overlay"></div>
          </div>

          <div class="card-body">
            <div>
              <small class="mentor-text">By {item.mentor}</small>
              <h3 class="card-title">{item.title}</h3>
            </div>

            <div class="progress-section">
              <div class="p-header">
                <span>Progress</span>
                <span class="p-percent">{getProgress(item.done, item.total)}%</span>
              </div>
              <div class="p-track">
                <div class="p-fill {item.status === 'completed' ? 'green' : ''}" style="width: {getProgress(item.done, item.total)}%"></div>
              </div>
              <small class="ep-count">{item.done}/{item.total} Episodes Watched</small>
            </div>

            <div class="card-footer">
              {#if item.status === "completed"}
                <button class="btn-cert">Download Certificate</button>
              {:else}
                <a href="/courses/{item.id}" class="btn-play">Continue Learning</a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  /* --- GLOBAL CONFIG --- */
  :global(body) {
    background-color: #f9fafb;
  }

  .page-container {
    max-width: 1200px; /* Lebar ditambah agar grid muat 3-4 */
    margin: 0 auto;
    padding: 40px 20px;
    font-family: "Inter", sans-serif;
  }

  /* --- HEADER --- */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
  }
  h1 {
    font-size: 1.8rem;
    margin: 0;
    color: #111827;
    letter-spacing: -0.5px;
  }
  .subtitle {
    color: #6b7280;
    margin: 4px 0 0 0;
    font-size: 0.95rem;
  }

  .search-wrap {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    gap: 10px;
    width: 320px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  .search-wrap:focus-within {
    border-color: #f97316;
    ring: 2px solid #fed7aa;
  }
  .search-wrap input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    color: #374151;
  }

  /* --- STATS WIDGET --- */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  }
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
  }
  .stat-icon.orange {
    background: #fff7ed;
    color: #f97316;
  }
  .stat-icon.green {
    background: #ecfdf5;
    color: #10b981;
  }
  .stat-icon.blue {
    background: #eff6ff;
    color: #3b82f6;
  }

  .stat-val {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #1f2937;
    line-height: 1;
    margin-bottom: 2px;
  }
  .stat-label {
    font-size: 0.85rem;
    color: #6b7280;
    font-weight: 500;
  }

  /* --- TABS --- */
  .tabs-container {
    display: flex;
    gap: 8px;
    margin-bottom: 25px;
    background: #e5e7eb;
    padding: 4px;
    border-radius: 12px;
    width: fit-content;
  }
  .tabs-container button {
    background: transparent;
    border: none;
    padding: 8px 20px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  .tabs-container button.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* --- GRID SYSTEM (KUNCI KERAPIHAN) --- */
  .lesson-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsif otomatis */
    gap: 24px;
  }

  /* --- CARD DESIGN --- */
  .lesson-card {
    background: white;
    border-radius: 16px;
    border: 1px solid #f3f4f6;
    overflow: hidden;
    display: flex;
    flex-direction: column; /* Vertikal Layout */
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    height: 100%; /* Agar semua card sama tinggi */
  }
  .lesson-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
    border-color: #fed7aa;
  }

  .card-thumb {
    height: 160px;
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .badge-done {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(16, 185, 129, 0.9);
    backdrop-filter: blur(4px);
    color: white;
    font-weight: 700;
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .card-body {
    padding: 20px;
    flex: 1; /* Mengisi sisa ruang */
    display: flex;
    flex-direction: column;
  }

  .mentor-text {
    color: #9ca3af;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .card-title {
    margin: 5px 0 20px 0;
    font-size: 1.1rem;
    color: #1f2937;
    line-height: 1.4;
  }

  .progress-section {
    margin-bottom: 20px;
    margin-top: auto; /* Dorong ke bawah jika konten sedikit */
  }
  .p-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #4b5563;
  }
  .p-track {
    height: 6px;
    background: #f3f4f6;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .p-fill {
    height: 100%;
    background: #f97316;
    border-radius: 10px;
  }
  .p-fill.green {
    background: #10b981;
  }
  .ep-count {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .card-footer {
    margin-top: auto;
  }
  .btn-play {
    display: block;
    text-align: center;
    text-decoration: none;
    background: #1f2937;
    color: white;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  .btn-play:hover {
    background: #f97316;
  }

  .btn-cert {
    width: 100%;
    background: white;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .btn-cert:hover {
    border-color: #10b981;
    color: #10b981;
    background: #f0fdf4;
  }

  /* --- EMPTY STATE --- */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
    color: #9ca3af;
  }
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 10px;
    opacity: 0.5;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 640px) {
    .header-section {
      flex-direction: column;
      align-items: flex-start;
    }
    .search-wrap {
      width: 100%;
      box-sizing: border-box;
    }
    .lesson-grid {
      grid-template-columns: 1fr;
    } /* 1 Kolom di HP */
  }
</style>
