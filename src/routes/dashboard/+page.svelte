<script>
  import { user } from "$lib/stores";

  // DATA DUMMY (SAMA SEPERTI SEBELUMNYA)
  const watching = [
    { id: 1, title: "Beginner's Guide to Frontend", category: "FRONT END", author: "Leonardo Samsul", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
    { id: 2, title: "Optimizing User Experience", category: "UI/UX DESIGN", author: "Bayu Salto", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
    { id: 3, title: "Reviving Company Image", category: "BRANDING", author: "Padhang Satrio", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" },
  ];
  const mentors = [
    { name: "Padhang Satrio", role: "Mentor" },
    { name: "Zakir Horizontal", role: "Mentor" },
    { name: "Leonardo Samsul", role: "Mentor" },
  ];
  const lessons = [{ mentor: "Padhang Satrio", date: "2/16/2026", type: "UI/UX DESIGN", desc: "Understand Of UI/UX Design" }];

  let showNotif = false;
  const notifications = [
    { id: 1, text: "Lesson 'UI/UX Design' updated", time: "2m ago", unread: true },
    { id: 2, text: "New comment from Mentor Padhang", time: "1h ago", unread: true },
  ];

  function toggleNotif() {
    showNotif = !showNotif;
  }
</script>

<div class="dashboard-grid">
  <div class="right-col">
    <div class="right-header">
      <div class="user-profile">
        <img src={$user.avatar} alt="u" />
        <div class="u-info">
          <span>{$user.name}</span>
          <small>{$user.role || "Student"}</small>
        </div>
      </div>

      <div class="tools-wrapper">
        <button class="icon-btn">✉️</button>
        <div class="notif-wrapper">
          <button class="icon-btn" on:click={toggleNotif}>
            🔔
            {#if notifications.some((n) => n.unread)}
              <span class="red-dot"></span>
            {/if}
          </button>
          {#if showNotif}
            <div class="notif-popup">
              <div class="notif-header">
                <span>Notifications</span>
                <small>Mark read</small>
              </div>
              <div class="notif-list">
                {#each notifications as n}
                  <div class="notif-item {n.unread ? 'unread' : ''}">
                    <div class="n-content">
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="desktop-widgets">
      <div class="widget">
        <div class="widget-head">
          <h3>Statistic</h3>
          <span>⋮</span>
        </div>
        <div class="circular-chart">
          <div class="chart-ring">
            <img src={$user.avatar} alt="me" class="center-face" />
            <div class="percent-badge">32%</div>
          </div>
          <h4 class="greeting">Hi, {$user.name.split(" ")[0]} 🔥</h4>
          <p class="sub-greet">Keep learning!</p>
        </div>
      </div>

      <div class="widget">
        <div class="widget-head">
          <h3>Your mentor</h3>
        </div>
        <div class="mentor-list">
          {#each mentors as m}
            <div class="mentor-row">
              <img src="https://ui-avatars.com/api/?name={m.name}" alt="m" />
              <div><strong>{m.name}</strong><small>{m.role}</small></div>
              <button class="follow-btn">+</button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="center-col">
    <div class="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search course..." />
    </div>

    <div class="hero-banner">
      <div class="banner-content">
        <small>ONLINE COURSE</small>
        <h1>Sharpen Your Skills</h1>
        <button class="btn-join">Join Now ➔</button>
      </div>
      <div class="star-decor top">✦</div>
    </div>

    <div class="stats-scroll-container">
      <div class="stats-row">
        <div class="stat-box">
          <div class="icon-circle">🎨</div>
          <div class="stat-info"><strong>2/8</strong><span>UI/UX</span></div>
        </div>
        <div class="stat-box">
          <div class="icon-circle">📢</div>
          <div class="stat-info"><strong>3/8</strong><span>Branding</span></div>
        </div>
        <div class="stat-box">
          <div class="icon-circle">💻</div>
          <div class="stat-info"><strong>6/12</strong><span>Front End</span></div>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h3>Continue Watching</h3>
      <div class="arrows">
        <button>&lt;</button><button class="active">&gt;</button>
      </div>
    </div>

    <div class="course-scroll">
      {#each watching as c}
        <a href="/courses/{c.id}" class="course-card">
          <div class="card-img" style="background-image: url('{c.img}')">
            <button class="heart-btn" on:click|preventDefault|stopPropagation> ♥ </button>
          </div>
          <div class="card-body">
            <span class="tag">{c.category}</span>
            <h4>{c.title}</h4>
            <div class="author">
              <div class="avatar-mini"></div>
              <span>{c.author}</span>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div class="section-header">
      <h3>Your Lesson</h3>
      <a href="/lesson" class="see-all">See all</a>
    </div>

    <div class="table-wrapper">
      <div class="lesson-table">
        <div class="t-head"><span>MENTOR</span><span>TYPE</span><span>DESC</span><span>ACTION</span></div>
        {#each lessons as l}
          <div class="t-row">
            <div class="mentor-cell">
              <img src="https://ui-avatars.com/api/?name={l.mentor}" alt="m" />
              <div><strong>{l.mentor}</strong><small>{l.date}</small></div>
            </div>
            <div><span class="type-badge">{l.type}</span></div>
            <div class="desc">{l.desc}</div>
            <div><button class="play-btn">▶</button></div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* GLOBAL LINK FIX */
  a.course-card {
    text-decoration: none;
    color: inherit;
    display: block;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }
  a.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(249, 115, 22, 0.15);
  }

  /* --- GRID LAYOUT RESPONSIVE --- */
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    height: 100%;
    overflow-x: hidden;
  }

  /* MEDIA QUERY UTAMA UNTUK TABLET & MOBILE */
  @media (max-width: 1024px) {
    .dashboard-grid {
      grid-template-columns: 1fr; /* Jadi 1 Kolom */
      gap: 20px;
      display: flex;
      flex-direction: column;
    }

    /* Pindahkan Right Col ke Atas (Profile & Notif) */
    .right-col {
      order: -1;
    }

    .right-header {
      justify-content: space-between !important; /* Agar profile kiri, notif kanan */
      margin-bottom: 20px !important;
    }

    .desktop-widgets {
      display: none; /* Sembunyikan widget berat di mobile agar bersih */
      /* Atau ganti display: block jika ingin tetap tampil di bawah */
    }
  }

  /* --- CENTER COL --- */
  .center-col {
    padding-bottom: 50px;
    min-width: 0; /* Fix grid overflow */
  }

  .search-bar {
    background: white;
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
  }
  .search-bar input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.95rem;
  }

  /* BANNER */
  .hero-banner {
    background: linear-gradient(135deg, #fb923c, #ea580c);
    border-radius: 30px;
    padding: 40px;
    color: white;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.3);
  }
  .banner-content {
    position: relative;
    z-index: 2;
    max-width: 70%;
  }
  .hero-banner h1 {
    font-size: 2rem;
    line-height: 1.2;
    margin: 10px 0 25px 0;
  }
  .btn-join {
    background: #111827;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .hero-banner {
      padding: 25px;
    }
    .hero-banner h1 {
      font-size: 1.5rem;
    }
    .banner-content {
      max-width: 100%;
    }
  }

  /* STATS (Auto fit) */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
  .stat-box {
    background: white;
    padding: 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
  }
  @media (max-width: 768px) {
    /* Agar stats bisa di-scroll horizontal di layar kecil */
    .stats-scroll-container {
      overflow-x: auto;
      padding-bottom: 10px;
      margin: 0 -20px 20px -20px; /* Bleed effect */
      padding: 0 20px 10px 20px;
    }
    .stats-row {
      display: flex;
      width: max-content;
      gap: 15px;
      margin-bottom: 0;
    }
    .stat-box {
      min-width: 160px;
    }
  }

  .icon-circle {
    width: 40px;
    height: 40px;
    background: #fff7ed;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #f97316;
  }
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  .stat-info strong {
    font-size: 0.85rem;
    color: #9ca3af;
  }
  .stat-info span {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1f2937;
  }

  /* SECTION HEADER */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #111827;
  }
  .arrows button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: #e5e7eb;
    cursor: pointer;
    color: #6b7280;
  }
  .arrows button.active {
    background: #f97316;
    color: white;
  }

  /* COURSE GRID (Responsive) */
  .course-scroll {
    display: grid;
    /* Auto fill agar responsif tanpa media query ribet */
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .course-card {
    background: white;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  }
  .card-img {
    height: 140px;
    background-size: cover;
    border-radius: 15px;
    position: relative;
    margin-bottom: 15px;
  }
  .heart-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .tag {
    font-size: 0.7rem;
    font-weight: 700;
    color: #f97316;
    background: #fff7ed;
    padding: 4px 10px;
    border-radius: 6px;
  }
  .course-card h4 {
    margin: 10px 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  .author {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 0.8rem;
    color: #6b7280;
  }
  .avatar-mini {
    width: 20px;
    height: 20px;
    background: #d1d5db;
    border-radius: 50%;
  }

  /* TABLE (Scrollable) */
  .table-wrapper {
    overflow-x: auto; /* KUNCI RESPONSIVE TABLE */
    background: white;
    border-radius: 20px;
  }
  .lesson-table {
    min-width: 600px; /* Paksa lebar agar scroll muncul di HP */
    padding: 20px;
  }
  .t-head,
  .t-row {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 0.5fr;
    font-size: 0.75rem;
    align-items: center;
  }
  .t-head {
    color: #9ca3af;
    font-weight: 700;
    margin-bottom: 15px;
  }
  .t-row {
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;
  }
  .mentor-cell {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .mentor-cell img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .type-badge {
    background: #eef2ff;
    color: #6366f1;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 4px;
  }
  .play-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    background: white;
    cursor: pointer;
    color: #f97316;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* RIGHT COL (Profile & Widgets) */
  .right-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
  }
  .user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto; /* Push tools to right */
  }
  .user-profile img {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    object-fit: cover;
  }
  .u-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .u-info span {
    font-weight: 700;
    font-size: 0.95rem;
    color: #1f2937;
  }
  .u-info small {
    color: #9ca3af;
    font-size: 0.75rem;
  }

  .tools-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .icon-btn {
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  }

  /* WIDGETS */
  .widget {
    margin-bottom: 30px;
  }
  .widget-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .circular-chart {
    text-align: center;
    margin-bottom: 30px;
  }
  .chart-ring {
    width: 120px;
    height: 120px;
    border: 8px solid #fff7ed;
    border-top-color: #f97316;
    border-radius: 50%;
    margin: 0 auto 15px auto;
    position: relative;
    display: grid;
    place-items: center;
    transform: rotate(-45deg);
  }
  .center-face {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transform: rotate(45deg);
    object-fit: cover;
  }
  .percent-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #4f46e5;
    color: white;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 10px;
    transform: rotate(45deg);
  }

  .mentor-list {
    background: white;
    padding: 20px;
    border-radius: 20px;
  }
  .mentor-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  .mentor-row img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .mentor-row div {
    flex: 1;
  }
  .follow-btn {
    border: none;
    background: #fff7ed;
    color: #f97316;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 8px;
  }

  /* NOTIFIKASI */
  .notif-wrapper {
    position: relative;
  }
  .red-dot {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
  }
  .notif-popup {
    position: absolute;
    top: 55px;
    right: 0;
    width: 300px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    border: 1px solid #f3f4f6;
  }
  .notif-header {
    padding: 15px;
    background: #fff7ed;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 0.9rem;
  }
  .notif-list {
    max-height: 250px;
    overflow-y: auto;
  }
  .notif-item {
    padding: 12px 15px;
    border-bottom: 1px solid #f9fafb;
    font-size: 0.85rem;
  }
  .notif-item.unread {
    background: #fffffb;
    font-weight: 600;
  }

  /* MEDIA QUERY NOTIF MOBILE */
  @media (max-width: 640px) {
    .notif-popup {
      right: -50px;
      width: 280px;
    } /* Geser agar tidak offscreen */
  }
</style>
