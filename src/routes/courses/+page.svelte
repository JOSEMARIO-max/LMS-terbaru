<script>
  // Kategori Filter
  const categories = ["All", "UI/UX Design", "Front End", "Back End", "Branding", "Marketing"];
  let activeCat = "All";

  // Data Materi (Dummy)
  const activeCourse = {
    title: "Mastering Mobile App Design",
    mentor: "Padhang Satrio",
    progress: 75,
    total: 24,
    done: 18,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80"
  };

  const courses = [
    { title: "HTML & CSS for Beginners", mentor: "leonardo plephon", level: "Beginner", videos: 12, img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80", tag: "Front End" },
    { title: "Advanced Brand Identity", mentor: "Bayu Salto", level: "Advanced", videos: 20, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", tag: "Branding" },
    { title: "Javascript Modern ES6", mentor: "Jhon Tosan", level: "Intermediate", videos: 15, img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&q=80", tag: "Front End" },
    { title: "User Research Mastery", mentor: "kucai", level: "Advanced", videos: 8, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", tag: "UI/UX Design" },
    { title: "Digital Marketing 101", mentor: "Sarah Vi", level: "Beginner", videos: 10, img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80", tag: "Marketing" },
    { title: "React JS Fundamental", mentor: "Bagas Mahpie", level: "Intermediate", videos: 25, img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", tag: "Front End" }
  ];

  // Logic Filter
  $: filteredCourses = activeCat === "All" ? courses : courses.filter(c => c.tag === activeCat);
</script>

<div class="lesson-container">

  <div class="top-header">
    <div class="search-bar">
      <span>🔍</span>
      <input type="text" placeholder="Find your favorite course...">
    </div>
    <div class="right-tools">
      <button class="icon-btn">🔔</button>
      <div class="profile-pill">
        <img src="https://ui-avatars.com/api/?name=Jason+Ranti" alt="p">
        <span>Jason Ranti</span>
      </div>
    </div>
  </div>

  <div class="active-banner">
    <div class="ab-content">
      <span class="status-badge">🔥 Sedang Dipelajari</span>
      <h1>{activeCourse.title}</h1>
      <div class="ab-meta">
        <img src="https://ui-avatars.com/api/?name={activeCourse.mentor}" alt="m">
        <span>{activeCourse.mentor} • {activeCourse.done}/{activeCourse.total} Video</span>
      </div>
      
      <div class="progress-area">
        <div class="p-track">
          <div class="p-fill" style="width: {activeCourse.progress}%"></div>
        </div>
        <span>{activeCourse.progress}%</span>
      </div>

      <button class="btn-continue">Lanjutkan Belajar ➔</button>
    </div>
    <div class="ab-image" style="background-image: url('{activeCourse.img}')"></div>
  </div>

  <div class="filter-tabs">
    {#each categories as cat}
      <button 
        class:active={activeCat === cat} 
        on:click={() => activeCat = cat}>
        {cat}
      </button>
    {/each}
  </div>

  <div class="course-grid">
    {#each filteredCourses as c}
      <div class="course-card">
        <div class="card-cover" style="background-image: url('{c.img}')">
          <div class="level-tag">{c.level}</div>
        </div>
        
        <div class="card-body">
          <small class="cat-text">{c.tag}</small>
          <h3>{c.title}</h3>
          
          <div class="card-footer">
            <div class="mentor-info">
              <img src="https://ui-avatars.com/api/?name={c.mentor}" alt="m">
              <span>{c.mentor}</span>
            </div>
            <div class="video-count">
              🎥 {c.videos} Eps
            </div>
          </div>
          
          <button class="btn-start">Tonton</button>
        </div>
      </div>
    {/each}
  </div>

</div>

<style>
  /* GLOBAL LAYOUT */
  .lesson-container { max-width: 1200px; margin: 0 auto; padding-bottom: 50px; }

  /* --- 1. HEADER --- */
  .top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
  .search-bar { background: white; padding: 12px 20px; border-radius: 50px; display: flex; align-items: center; gap: 10px; width: 400px; box-shadow: 0 5px 20px rgba(0,0,0,0.02); }
  .search-bar input { border: none; outline: none; width: 100%; font-size: 0.95rem; }
  
  .right-tools { display: flex; align-items: center; gap: 15px; }
  .icon-btn { background: white; border: none; width: 45px; height: 45px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.03); }
  .profile-pill { display: flex; align-items: center; gap: 10px; background: white; padding: 6px 15px 6px 6px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 5px 15px rgba(0,0,0,0.03); }
  .profile-pill img { width: 35px; height: 35px; border-radius: 50%; }

  /* --- 2. ACTIVE BANNER --- */
  .active-banner { 
    background: white; border-radius: 30px; padding: 30px; display: flex; justify-content: space-between; align-items: center; gap: 30px; margin-bottom: 40px; overflow: hidden; position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid #FFF7ED;
  }
  .ab-content { flex: 1; z-index: 2; }
  .status-badge { background: #FFF7ED; color: #F97316; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
  .active-banner h1 { font-size: 2rem; margin: 15px 0; color: #1F2937; line-height: 1.2; }
  
  .ab-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: #6B7280; font-weight: 500; }
  .ab-meta img { width: 30px; height: 30px; border-radius: 50%; }

  .progress-area { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
  .p-track { flex: 1; height: 10px; background: #F3F4F6; border-radius: 10px; overflow: hidden; }
  .p-fill { height: 100%; background: #F97316; border-radius: 10px; }
  .progress-area span { font-weight: 700; color: #F97316; }

  .btn-continue { background: #1F2937; color: white; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-continue:hover { background: #F97316; transform: translateY(-2px); }

  .ab-image { width: 350px; height: 250px; background-size: cover; background-position: center; border-radius: 20px; position: relative; }
  /* Efek gradient di atas gambar */
  .ab-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, white 0%, transparent 50%); border-radius: 20px; }

  /* --- 3. FILTERS --- */
  .filter-tabs { display: flex; gap: 10px; margin-bottom: 30px; overflow-x: auto; padding-bottom: 5px; }
  .filter-tabs button { 
    background: white; border: 1px solid #E5E7EB; padding: 10px 20px; border-radius: 50px; font-weight: 600; color: #6B7280; cursor: pointer; white-space: nowrap; transition: 0.2s;
  }
  .filter-tabs button:hover { border-color: #F97316; color: #F97316; }
  .filter-tabs button.active { background: #F97316; color: white; border-color: #F97316; }

  /* --- 4. GRID --- */
  .course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
  
  .course-card { background: white; border-radius: 24px; padding: 15px; border: 1px solid #F3F4F6; transition: 0.3s; }
  .course-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

  .card-cover { height: 180px; background-size: cover; background-position: center; border-radius: 18px; position: relative; margin-bottom: 15px; }
  .level-tag { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }

  .card-body { padding: 5px 10px; }
  .cat-text { color: #F97316; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; }
  h3 { margin: 5px 0 15px 0; font-size: 1.1rem; color: #111827; }

  .card-footer { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .mentor-info { display: flex; gap: 8px; align-items: center; font-size: 0.85rem; color: #6B7280; }
  .mentor-info img { width: 24px; height: 24px; border-radius: 50%; }
  .video-count { font-size: 0.8rem; color: #9CA3AF; background: #F9FAFB; padding: 4px 8px; border-radius: 6px; }

  .btn-start { width: 100%; background: white; border: 1px solid #E5E7EB; color: #1F2937; padding: 10px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-start:hover { background: #F97316; border-color: #F97316; color: white; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .top-header { flex-direction: column; align-items: flex-start; gap: 15px; }
    .search-bar { width: 100%; }
    .active-banner { flex-direction: column; padding: 20px; }
    .ab-image { width: 100%; height: 200px; order: -1; }
    .ab-image::after { background: linear-gradient(to top, white 0%, transparent 50%); }
  }
</style>