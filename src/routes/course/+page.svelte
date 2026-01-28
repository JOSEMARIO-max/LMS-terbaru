<script>
  import { ownedCourses } from "$lib/stores";

  // --- 1. DATA MASTER HARUS LENGKAP (SAMA PERSIS DENGAN KATALOG) ---
  // Kalau di katalog ada 8 kursus, di sini juga harus ada 8 detailnya.
  const allLessons = [
    {
      id: 1,
      title: "Mastering Mobile App Design (Figma)",
      mentor: "Padhang Satrio",
      total: 24,
      done: 18,
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      status: "active" 
    },
    {
      id: 2,
      title: "Fullstack Web Developer: HTML to React",
      mentor: "Leonardo Samsul",
      total: 45,
      done: 12,
      img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80",
      status: "completed"
    },
    {
      id: 3,
      title: "Advanced Brand Identity & Logo",
      mentor: "Bayu Salto",
      total: 20,
      done: 0,
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
      status: "active"
    },
    {
      id: 4,
      title: "Python for Data Science Bootcamp",
      mentor: "Sarah Vi",
      total: 60,
      done: 0,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      status: "active"
    },
    {
      id: 5,
      title: "Digital Marketing: Ads & SEO Mastery",
      mentor: "Kevin H.",
      total: 30,
      done: 0,
      img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80",
      status: "active"
    },
    {
      id: 6,
      title: "3D Modeling with Blender for Beginners",
      mentor: "Dian Sastro",
      total: 25,
      done: 0,
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
      status: "active"
    },
    {
      id: 7,
      title: "Copywriting that Sells",
      mentor: "Andi Penulis",
      total: 15,
      done: 0,
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
      status: "active"
    },
    {
      id: 8,
      title: "Flutter Mobile Dev: iOS & Android",
      mentor: "Rizky K.",
      total: 50,
      done: 0,
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
      status: "active"
    }
  ];

  // --- 2. FILTER: Tampilkan hanya yang ID-nya ada di Store ---
  $: myLessons = allLessons.filter(l => $ownedCourses.includes(l.id));

  // --- 3. HELPER FUNCTION ---
  function getProgress(done, total) {
    if(!total) return 0;
    return Math.round((done / total) * 100);
  }
</script>

<div class="page-container">
  <div class="header-section">
    <h1>My Learning (Dashboard)</h1>
    <p>Daftar kursus yang sudah kamu miliki.</p>
  </div>

  <div class="lesson-grid">
    {#if myLessons.length === 0}
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>Kamu belum punya kursus</h3>
        <p>Yuk, investasi ilmu sekarang!</p>
        
        <a href="/courses" class="btn-cert" style="display:inline-block; margin-top:20px; text-decoration:none;">Beli Kursus Dulu</a>
      </div>
    {:else}
      {#each myLessons as item}
        <div class="lesson-card">
          <div class="card-thumb" style="background-image: url('{item.img}')">
            {#if item.status === "completed"}
              <div class="badge-done">Completed</div>
            {/if}
          </div>
          
          <div class="card-body">
            <small class="mentor-text">By {item.mentor}</small>
            <h3 class="card-title">{item.title}</h3>
            
            <div class="progress-section">
              <div class="p-header">
                <span>Progress</span>
                <span>{getProgress(item.done, item.total)}%</span>
              </div>
              <div class="p-track">
                <div class="p-fill" style="width: {getProgress(item.done, item.total)}%"></div>
              </div>
              <small>{item.done}/{item.total} Materi Selesai</small>
            </div>

            <div class="card-footer">
              <a href="/courses/{item.id}" class="btn-play">Lanjut Belajar</a>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  :global(body) { background-color: #f9fafb; font-family: "Inter", sans-serif; margin: 0; }
  .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
  
  .header-section { margin-bottom: 40px; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; }
  h1 { font-size: 1.8rem; margin: 0; color: #111827; }
  p { color: #6b7280; margin-top: 5px; }

  /* GRID SYSTEM */
  .lesson-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
  
  /* CARD STYLE */
  .lesson-card { background: white; border-radius: 16px; border: 1px solid #f3f4f6; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s; height: 100%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
  .lesson-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-color: #e5e7eb; }
  
  .card-thumb { height: 160px; background-size: cover; background-position: center; position: relative; }
  .badge-done { position: absolute; top: 12px; right: 12px; background: #10b981; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  
  .card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
  .mentor-text { color: #9ca3af; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .card-title { margin: 5px 0 20px 0; font-size: 1.1rem; color: #1f2937; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  
  .progress-section { margin-top: auto; margin-bottom: 20px; }
  .p-header { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px; font-weight: 600; color: #4b5563; }
  .p-track { height: 6px; background: #f3f4f6; border-radius: 10px; overflow: hidden; }
  .p-fill { height: 100%; background: #f97316; border-radius: 10px; }
  
  .card-footer { margin-top: auto; }
  .btn-play { display: block; text-align: center; text-decoration: none; background: #1f2937; color: white; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s; }
  .btn-play:hover { background: #f97316; }

  /* EMPTY STATE */
  .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #9ca3af; background: white; border-radius: 16px; border: 2px dashed #e5e7eb; }
  .empty-icon { font-size: 3rem; margin-bottom: 15px; display: block; }
  .btn-cert { background: #1f2937; color: white; padding: 10px 24px; border-radius: 8px; font-weight: 600; transition: 0.2s; }
  .btn-cert:hover { background: #374151; transform: translateY(-2px); }
</style>