<script>
  import { user } from "$lib/stores";

  // DATA DUMMY
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

  // --- LOGIC NOTIFIKASI (BARU) ---
  let showNotif = false;

  const notifications = [
    { id: 1, text: "Lesson 'UI/UX Design' updated", time: "2m ago", unread: true },
    { id: 2, text: "New comment from Mentor Padhang", time: "1h ago", unread: true },
    { id: 3, text: "Your subscription ends soon", time: "1d ago", unread: false },
    { id: 4, text: "Welcome to the course!", time: "2d ago", unread: false },
  ];

  function toggleNotif() {
    showNotif = !showNotif;
  }
</script>

<div class="dashboard-grid">
  <div class="center-col">
    <div class="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Search your course..." />
    </div>

    <div class="hero-banner">
      <div class="banner-content">
        <small>ONLINE COURSE</small>
        <h1>Sharpen Your Skills with Professional Online Courses</h1>
        <button class="btn-join">Join Now ➔</button>
      </div>
      <div class="star-decor top">✦</div>
      <div class="star-decor bottom">✦</div>
    </div>

    <div class="stats-row">
      <div class="stat-box">
        <div class="icon-circle">🎨</div>
        <div class="stat-info"><strong>2/8 Watched</strong><span>UI/UX Design</span></div>
      </div>
      <div class="stat-box">
        <div class="icon-circle">📢</div>
        <div class="stat-info"><strong>3/8 Watched</strong><span>Branding</span></div>
      </div>
      <div class="stat-box">
        <div class="icon-circle">💻</div>
        <div class="stat-info"><strong>6/12 Watched</strong><span>Front End</span></div>
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

  <div class="right-col">
    <div class="right-header">
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
              <small>Mark all as read</small>
            </div>
            <div class="notif-list">
              {#each notifications as n}
                <div class="notif-item {n.unread ? 'unread' : ''}">
                  <div class="n-icon">{n.unread ? "⚡" : "✨"}</div>
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
      <div class="user-profile">
        <img src={$user.avatar} alt="u" />
        <span>{$user.name}</span>
      </div>
    </div>

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
        <h4 class="greeting">Good Morning {$user.name.split(" ")[0]} 🔥</h4>
        <p class="sub-greet">Continue your learning!</p>
      </div>

      <div class="bar-chart">
        <div class="bar" style="height: 40%"></div>
        <div class="bar active" style="height: 70%"></div>
        <div class="bar" style="height: 50%"></div>
        <div class="bar active-tall" style="height: 100%"></div>
        <div class="bar" style="height: 30%"></div>
      </div>
    </div>

    <div class="widget">
      <div class="widget-head">
        <h3>Your mentor</h3>
        <button class="add-btn">+</button>
      </div>
      <div class="mentor-list">
        {#each mentors as m}
          <div class="mentor-row">
            <img src="https://ui-avatars.com/api/?name={m.name}" alt="m" />
            <div><strong>{m.name}</strong><small>{m.role}</small></div>
            <button class="follow-btn">+ Follow</button>
          </div>
        {/each}
        <button class="btn-see-all">See All</button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Tambahkan ini agar link card tidak terlihat seperti link text biasa */
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
    box-shadow: 0 15px 35px rgba(249, 115, 22, 0.15); /* Orange shadow glow */
  }
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    height: 100%;
  }
  @media (max-width: 1100px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  .center-col {
    padding-bottom: 50px;
  }
  .search-bar {
    background: white;
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
  }
  .search-bar input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.95rem;
    font-family: inherit;
  }

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
    max-width: 60%;
  }
  .hero-banner small {
    opacity: 0.8;
    letter-spacing: 1px;
    font-weight: 600;
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
  .star-decor {
    position: absolute;
    font-size: 4rem;
    opacity: 0.3;
  }
  .top {
    top: 20px;
    right: 80px;
  }
  .bottom {
    bottom: -20px;
    right: 150px;
  }

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
    flex: 1;
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
    font-weight: bold;
  }
  .arrows button.active {
    background: #f97316;
    color: white;
  }

  .course-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  .lesson-table {
    background: white;
    border-radius: 20px;
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

  .right-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
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
  .user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .user-profile img {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    object-fit: cover;
  }

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
  .greeting {
    margin: 0;
    font-size: 1.1rem;
  }
  .sub-greet {
    font-size: 0.8rem;
    color: #9ca3af;
    margin: 5px 0 0 0;
  }

  .bar-chart {
    height: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
    padding: 0 20px;
  }
  .bar {
    width: 100%;
    background: #e5e7eb;
    border-radius: 8px;
  }
  .bar.active {
    background: #fdba74;
  }
  .bar.active-tall {
    background: #f97316;
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
    background: white;
    color: #f97316;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-see-all {
    width: 100%;
    background: #fff7ed;
    color: #f97316;
    border: none;
    padding: 10px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .add-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    background: white;
    cursor: pointer;
  }

  /* --- CSS BARU UNTUK NOTIFIKASI --- */
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
    width: 320px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    animation: slideDown 0.2s ease-out;
    border: 1px solid #f3f4f6;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .notif-header {
    padding: 15px 20px;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff7ed;
  }
  .notif-header span {
    font-weight: 700;
    color: #1f2937;
  }
  .notif-header small {
    font-size: 0.75rem;
    color: #f97316;
    cursor: pointer;
    font-weight: 600;
  }

  .notif-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .notif-item {
    padding: 15px 20px;
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #f9fafb;
    transition: background 0.2s;
    cursor: pointer;
    text-align: left;
  }
  .notif-item:hover {
    background: #f9fafb;
  }
  .notif-item.unread {
    background: #fffffb;
  }
  .notif-item.unread p {
    font-weight: 600;
    color: #111827;
  }

  .n-icon {
    width: 32px;
    height: 32px;
    background: #f3f4f6;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
    flex-shrink: 0;
  }
  .notif-item.unread .n-icon {
    background: #ffedd5;
    color: #f97316;
  }

  .n-content p {
    margin: 0 0 4px 0;
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.4;
  }
  .n-content span {
    font-size: 0.7rem;
    color: #9ca3af;
  }
</style>
