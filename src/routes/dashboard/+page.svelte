<script>
  import { user, ownedCourses } from "$lib/stores"; 
  import { slide, fade } from "svelte/transition";

  // --- DATA KURSUS ---
  const allCourses = [
    { id: 1, title: "Beginner's Guide to Frontend", category: "FRONT END", author: "Leonardo S.", price: "Rp 150.000", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
    { id: 2, title: "Optimizing User Experience", category: "UI/UX DESIGN", author: "Bayu Salto", price: "Rp 200.000", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
    { id: 3, title: "Reviving Company Image", category: "BRANDING", author: "Padhang S.", price: "Rp 175.000", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" },
    { id: 4, title: "Python Data Science", category: "DATA", author: "Sarah Vi", price: "Rp 180.000", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { id: 5, title: "Digital Marketing Ads", category: "MARKETING", author: "Kevin H.", price: "Rp 120.000", img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80" },
    { id: 6, title: "3D Blender Basic", category: "DESIGN", author: "Dian Sastro", price: "Rp 150.000", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" },
  ];

  // DATA KATEGORI STATISTIK (Dummy biar mirip referensi)
  const categoryStats = [
    { name: "UI/UX Design", watched: "2/8", icon: "🎨" },
    { name: "Branding", watched: "3/8", icon: "📢" },
    { name: "Front End", watched: "6/12", icon: "💻" },
  ];

  // DATA MENTOR
  const mentors = [
    { name: "Padhang Satrio", role: "Mentor", img: "https://ui-avatars.com/api/?name=Padhang+Satrio&background=FFEDD5&color=F97316" },
    { name: "Zakir Horizontal", role: "Mentor", img: "https://ui-avatars.com/api/?name=Zakir+Horizontal&background=E0E7FF&color=4F46E5" },
    { name: "Leonardo Samsul", role: "Mentor", img: "https://ui-avatars.com/api/?name=Leonardo+Samsul&background=DCFCE7&color=166534" },
  ];

  // --- LOGIC BELI ---
  function buyCourse(course) {
    if ($ownedCourses.includes(course.id)) return alert("✅ Anda sudah memiliki akses.");
    if(confirm(`Beli kursus "${course.title}" seharga ${course.price}?`)) {
      $ownedCourses = [...$ownedCourses, course.id]; 
      alert("🎉 Sukses! Kursus ditambahkan.");
    }
  }

  // REACTIVE VARIABLES
  $: myCourses = allCourses.filter(c => $ownedCourses.includes(c.id));
  $: recommendedCourses = allCourses.filter(c => !$ownedCourses.includes(c.id));
</script>

<div class="dashboard-wrapper">
  
  <main class="main-content">
    
    <header class="top-header">
      <div class="search-box">
        <span class="icon">🔍</span>
        <input type="text" placeholder="Search your course..." />
      </div>
    </header>

    <div class="hero-card">
      <div class="hero-content">
        <span class="badge">ONLINE COURSE</span>
        <h1>Sharpen Your Skills with Professional Online Courses</h1>
        <a href="#catalog" class="btn-hero">Join Now ➔</a>
      </div>
      <div class="hero-bg-decor">✨</div>
    </div>

    <div class="stats-row">
      {#each categoryStats as stat}
        <div class="stat-pill">
          <div class="sp-icon">{stat.icon}</div>
          <div class="sp-info">
            <strong>{stat.watched} watched</strong>
            <span>{stat.name}</span>
          </div>
          <button class="sp-more">⋮</button>
        </div>
      {/each}
    </div>

    <section class="section-block">
      <div class="section-head">
        <h3>Continue Watching</h3>
        <div class="nav-arrows">
          <button>❮</button><button class="active">❯</button>
        </div>
      </div>

      {#if myCourses.length > 0}
        <div class="cards-grid">
          {#each myCourses as c}
            <a href="/courses/{c.id}" class="course-card">
              <div class="card-thumb" style="background-image: url('{c.img}')">
                 <button class="heart-icon">♡</button>
              </div>
              <div class="card-body">
                <span class="cat-tag">{c.category}</span>
                <h4>{c.title}</h4>
                <div class="author">
                    <img src="https://ui-avatars.com/api/?name={c.author}&background=random" alt="a">
                    <div class="a-info">
                        <strong>{c.author}</strong>
                        <small>Mentor</small>
                    </div>
                </div>
                <div class="progress-line"><div class="fill" style="width: 45%"></div></div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="empty-box">
            <p>Belum ada kursus yang aktif.</p>
            <a href="#catalog" class="link-orange">Mulai Belajar</a>
        </div>
      {/if}
    </section>

    <section class="section-block" id="catalog">
      <div class="section-head">
        <h3>{myCourses.length > 0 ? "Recommended For You" : "Popular Courses"}</h3>
        <a href="/courses" class="see-all">See all</a>
      </div>

      <div class="list-view">
        {#each recommendedCourses.slice(0, 3) as c}
           <div class="list-item">
              <img src="{c.img}" class="list-thumb" alt="thumb">
              <div class="list-info">
                  <h4>{c.title}</h4>
                  <div class="list-meta">
                      <span class="cat-pill">{c.category}</span>
                      <small>By {c.author}</small>
                  </div>
              </div>
              <button class="btn-buy" on:click={() => buyCourse(c)}>
                  {c.price}
              </button>
           </div>
        {/each}
      </div>
    </section>

  </main>

  <aside class="sidebar">
    
    <div class="profile-header">
       <button class="icon-btn">✉️</button>
       <button class="icon-btn">🔔</button>
       <a href="/profile" class="user-chip">
           <img src={$user.avatar} alt="u">
           <span>{$user.name.split(' ')[0]}</span>
       </a>
    </div>

    <div class="widget-box">
       <div class="wb-head"><h3>Statistic</h3><span>⋮</span></div>
       
       <div class="stat-circle-wrapper">
           <div class="stat-ring">
               <img src={$user.avatar} alt="me" class="center-face">
               <div class="percent-badge">32%</div>
           </div>
           <h4>Good Morning, {$user.name.split(' ')[0]} 🔥</h4>
           <p>Continue your learning to achieve your target!</p>
       </div>

       <div class="chart-wrapper">
           <div class="chart-col" style="height: 40%"></div>
           <div class="chart-col active" style="height: 70%"></div>
           <div class="chart-col" style="height: 50%"></div>
           <div class="chart-col active-tall" style="height: 100%"></div>
           <div class="chart-col" style="height: 30%"></div>
       </div>
       <div class="chart-labels">
           <span>1-10 Aug</span><span>11-20 Aug</span><span>21-30 Aug</span>
       </div>
    </div>

    <div class="widget-box">
        <div class="wb-head"><h3>Your Mentor</h3><button class="add-btn">+</button></div>
        <div class="mentor-list">
            {#each mentors as m}
                <div class="mentor-item">
                    <img src="{m.img}" alt="m">
                    <div class="m-details">
                        <strong>{m.name}</strong>
                        <small>{m.role}</small>
                    </div>
                    <button class="btn-follow">+ Follow</button>
                </div>
            {/each}
        </div>
        <button class="btn-see-all">See All</button>
    </div>

  </aside>
</div>

<style>
  /* GLOBAL FONT & COLOR */
  :global(body) { background-color: #F8FAFC; color: #1E293B; font-family: "Plus Jakarta Sans", sans-serif; margin: 0; }
  
  .dashboard-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr 340px; /* Kiri Flex, Kanan Fixed */
      gap: 40px;
      align-items: start;
  }

  /* --- LEFT AREA --- */
  .main-content { min-width: 0; }
  
  /* SEARCH */
  .top-header { margin-bottom: 30px; }
  .search-box { background: white; padding: 14px 24px; border-radius: 50px; display: flex; align-items: center; gap: 12px; width: 100%; max-width: 500px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
  .search-box input { border: none; outline: none; width: 100%; font-size: 0.95rem; color: #64748B; }

  /* HERO BANNER - ORANGE THEME */
  .hero-card {
      background: linear-gradient(100deg, #FF8C42 0%, #F97316 100%);
      border-radius: 24px;
      padding: 40px;
      color: white;
      position: relative;
      margin-bottom: 30px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2);
  }
  .hero-content { position: relative; z-index: 2; max-width: 60%; }
  .badge { background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
  .hero-content h1 { font-size: 2rem; margin: 20px 0; line-height: 1.2; font-weight: 700; }
  .btn-hero { background: #1F2937; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-block; transition: 0.2s; }
  .btn-hero:hover { background: black; transform: translateY(-2px); }
  .hero-bg-decor { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); font-size: 10rem; opacity: 0.2; pointer-events: none; }

  /* STATS ROW (KOTAK KECIL) */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
  .stat-pill { background: white; padding: 15px; border-radius: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.02); }
  .sp-icon { width: 40px; height: 40px; background: #FFF7ED; border-radius: 12px; display: grid; place-items: center; font-size: 1.2rem; color: #F97316; }
  .sp-info { flex: 1; display: flex; flex-direction: column; }
  .sp-info strong { font-size: 0.9rem; color: #0F172A; }
  .sp-info span { font-size: 0.75rem; color: #64748B; }
  .sp-more { background: none; border: none; color: #CBD5E1; font-size: 1.2rem; cursor: pointer; }

  /* SECTIONS */
  .section-block { margin-bottom: 40px; }
  .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .section-head h3 { margin: 0; font-size: 1.2rem; color: #0F172A; }
  .nav-arrows button { width: 30px; height: 30px; border-radius: 50%; border: 1px solid #E2E8F0; background: white; cursor: pointer; color: #94A3B8; }
  .nav-arrows button.active { background: #1F2937; color: white; border-color: #1F2937; }
  .see-all { color: #64748B; text-decoration: none; font-size: 0.9rem; font-weight: 600; }

  /* CARD GRID */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
  
  /* COURSE CARD DESIGN */
  .course-card { background: white; border-radius: 24px; padding: 16px; transition: 0.3s; display: block; text-decoration: none; color: inherit; box-shadow: 0 10px 30px rgba(0,0,0,0.02); border: 1px solid transparent; }
  .course-card:hover { transform: translateY(-5px); border-color: #FDBA74; box-shadow: 0 20px 40px rgba(249, 115, 22, 0.1); }
  
  .card-thumb { height: 160px; background-size: cover; border-radius: 16px; position: relative; margin-bottom: 15px; }
  .heart-icon { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.3); color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; backdrop-filter: blur(4px); }
  
  .cat-tag { font-size: 0.65rem; font-weight: 700; color: #F97316; background: #FFF7ED; padding: 4px 10px; border-radius: 6px; display: inline-block; margin-bottom: 8px; }
  .course-card h4 { margin: 0 0 15px 0; font-size: 1rem; line-height: 1.4; }
  
  .author { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
  .author img { width: 32px; height: 32px; border-radius: 50%; }
  .a-info { display: flex; flex-direction: column; }
  .a-info strong { font-size: 0.8rem; }
  .a-info small { font-size: 0.7rem; color: #94A3B8; }

  .progress-line { height: 6px; background: #F1F5F9; border-radius: 10px; overflow: hidden; }
  .fill { height: 100%; background: #F97316; border-radius: 10px; }

  .empty-box { text-align: center; padding: 40px; background: white; border-radius: 20px; border: 2px dashed #E2E8F0; }
  .link-orange { color: #F97316; font-weight: 700; text-decoration: none; }

  /* LIST VIEW (KATALOG) */
  .list-view { display: flex; flex-direction: column; gap: 15px; }
  .list-item { background: white; padding: 10px; border-radius: 16px; display: flex; align-items: center; gap: 15px; transition: 0.2s; border: 1px solid transparent; }
  .list-item:hover { border-color: #FDBA74; transform: scale(1.01); }
  .list-thumb { width: 60px; height: 60px; border-radius: 12px; object-fit: cover; }
  .list-info { flex: 1; }
  .list-info h4 { margin: 0 0 5px 0; font-size: 0.95rem; }
  .list-meta { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; color: #64748B; }
  .cat-pill { background: #F1F5F9; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
  .btn-buy { background: white; border: 1px solid #E2E8F0; padding: 8px 15px; border-radius: 50px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: 0.2s; color: #0F172A; }
  .btn-buy:hover { background: #0F172A; color: white; border-color: #0F172A; }


  /* --- RIGHT SIDEBAR --- */
  .sidebar { position: sticky; top: 30px; display: flex; flex-direction: column; gap: 30px; }
  
  .profile-header { display: flex; justify-content: flex-end; gap: 15px; align-items: center; margin-bottom: 10px; }
  .icon-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: white; cursor: pointer; font-size: 1.1rem; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
  .user-chip { display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; font-weight: 700; font-size: 0.9rem; }
  .user-chip img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

  .widget-box { background: white; border-radius: 24px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
  .wb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
  .wb-head h3 { margin: 0; font-size: 1.1rem; }

  /* STATS CIRCLE */
  .stat-circle-wrapper { text-align: center; margin-bottom: 30px; }
  .stat-ring { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #FFF7ED; border-top-color: #F97316; border-right-color: #F97316; margin: 0 auto 15px; display: grid; place-items: center; position: relative; transform: rotate(-45deg); }
  .center-face { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; transform: rotate(45deg); }
  .percent-badge { position: absolute; top: -5px; right: -5px; background: #6366F1; color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 20px; transform: rotate(45deg); }
  .stat-circle-wrapper h4 { margin: 0 0 5px; font-size: 1rem; }
  .stat-circle-wrapper p { margin: 0; font-size: 0.75rem; color: #94A3B8; }

  /* BAR CHART CSS */
  .chart-wrapper { height: 100px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; padding: 0 10px; }
  .chart-col { flex: 1; background: #F1F5F9; border-radius: 6px; }
  .chart-col.active { background: #FDBA74; }
  .chart-col.active-tall { background: #F97316; }
  .chart-labels { display: flex; justify-content: space-between; font-size: 0.65rem; color: #94A3B8; margin-top: 10px; }

  /* MENTOR LIST */
  .mentor-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; }
  .mentor-item { display: flex; align-items: center; gap: 12px; }
  .mentor-item img { width: 40px; height: 40px; border-radius: 50%; }
  .m-details { flex: 1; }
  .m-details strong { display: block; font-size: 0.9rem; }
  .m-details small { font-size: 0.75rem; color: #94A3B8; }
  .btn-follow { background: white; border: 1px solid #E2E8F0; color: #F97316; padding: 6px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
  .btn-see-all { width: 100%; background: #FFF7ED; color: #F97316; border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
      .dashboard-wrapper { grid-template-columns: 1fr; }
      .sidebar { position: static; flex-direction: row; flex-wrap: wrap; }
      .widget-box { flex: 1; min-width: 300px; }
      .stats-row { grid-template-columns: 1fr; }
  }
</style>