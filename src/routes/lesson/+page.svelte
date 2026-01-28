<script>
  import { user, ownedCourses } from "$lib/stores";
  import { fly, fade } from "svelte/transition";

  // DATA KURSUS
  const allCourses = [
    { 
      id: 1, title: "Mastering Mobile App Design", category: "Design", author: "Padhang Satrio", totalMateri: 24, 
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80" 
    },
    { 
      id: 2, title: "Fullstack Web Developer", category: "Development", author: "Leonardo Samsul", totalMateri: 45, 
      img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" 
    },
    { 
      id: 3, title: "Advanced Brand Identity", category: "Design", author: "Bayu Salto", totalMateri: 20, 
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" 
    },
    { 
      id: 4, title: "Python for Data Science", category: "Data", author: "Sarah Vi", totalMateri: 60, 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" 
    },
    { 
      id: 5, title: "Digital Marketing Mastery", category: "Marketing", author: "Kevin H.", totalMateri: 30, 
      img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80" 
    },
    { 
      id: 6, title: "3D Modeling with Blender", category: "Design", author: "Dian Sastro", totalMateri: 25, 
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" 
    },
    { 
      id: 7, title: "Copywriting that Sells", category: "Marketing", author: "Andi Penulis", totalMateri: 15, 
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" 
    },
    { 
      id: 8, title: "Flutter Mobile Dev", category: "Development", author: "Rizky K.", totalMateri: 50, 
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" 
    }
  ];

  // LOGIC FILTER
  $: myLessons = allCourses.filter(c => $ownedCourses.includes(c.id));
</script>

<div class="page-container">
  <div class="header">
    <div class="pill-label">🎓 DASHBOARD SISWA</div>
    <h1>Selamat Datang, <span class="highlight">{$user.name}</span>!</h1>
    <p>
      {#if myLessons.length > 0}
        Lanjutkan progres belajarmu dan raih target hari ini.
      {:else}
        Akun kamu belum memiliki kelas aktif.
      {/if}
    </p>
  </div>

  {#if myLessons.length === 0}
    
    <div class="empty-state" in:fly={{ y: 20 }}>
      <div class="icon-bg">
        <div class="lock-icon">🔒</div>
      </div>
      <h3>Akses Terkunci</h3>
      <p>
        Kamu belum membeli kelas apapun.<br>
        Silakan beli kursus untuk membuka materi belajar.
      </p>
      <div class="btn-group">
        <a href="/courses" class="btn-primary">Beli Kelas Sekarang</a>
        <a href="/profile" class="btn-outline">Cek Langganan</a>
      </div>
    </div>

  {:else}
    
    <div class="grid-container">
      {#each myLessons as lesson (lesson.id)}
        <div class="course-card" in:fly={{ y: 20, duration: 400 }}>
          
          <div class="card-image" style="background-image: url('{lesson.img}')">
            <div class="play-overlay">
              <div class="play-btn">▶</div>
            </div>
            <div class="category-badge">{lesson.category}</div>
          </div>

          <div class="card-body">
            <h3 class="course-title">{lesson.title}</h3>
            <p class="mentor-name">Mentor: <strong>{lesson.author}</strong></p>
            
            <div class="progress-section">
              <div class="progress-info">
                <span>Progress Belajar</span>
                <span class="percent">0%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: 0%"></div>
              </div>
              <small class="materi-count">{lesson.totalMateri} Materi Video</small>
            </div>

            <a href="/courses/{lesson.id}" class="btn-action">
              Lanjut Belajar ➔
            </a>
            
          </div>
        </div>
      {/each}
    </div>

  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  :global(body) { 
    background-color: #f8fafc; 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    color: #0f172a;
  }

  .page-container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }

  /* --- HEADER --- */
  .header { text-align: center; margin-bottom: 60px; }
  
  .pill-label { 
    background: #fff7ed; 
    color: #f97316; /* Orange Theme */
    font-weight: 800; 
    padding: 8px 18px; 
    border-radius: 50px; 
    font-size: 0.75rem; 
    letter-spacing: 1px; 
    display: inline-block; 
    margin-bottom: 20px; 
    border: 1px solid #ffedd5; 
  }

  .header h1 { 
    font-size: 2.8rem; 
    margin: 0 0 15px 0; 
    line-height: 1.2; 
    color: #0f172a; 
    letter-spacing: -1px; 
    font-weight: 800; 
  }
  
  .highlight { color: #f97316; }

  .header p { 
    font-size: 1.15rem; 
    color: #64748b; 
    max-width: 600px; 
    margin: 0 auto; 
    line-height: 1.6; 
  }

  /* --- EMPTY STATE (LOCKED) --- */
  .empty-state { 
    text-align: center; 
    padding: 80px 20px; 
    background: white; 
    border-radius: 30px; 
    border: 2px dashed #cbd5e1; 
    max-width: 600px; 
    margin: 0 auto; 
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05); 
  }
  
  .icon-bg {
    width: 100px; height: 100px; background: #fff7ed; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
  }
  .lock-icon { font-size: 3rem; opacity: 0.8; }
  
  .empty-state h3 { margin: 0 0 10px 0; color: #0f172a; font-size: 1.8rem; }
  .empty-state p { color: #64748b; margin: 0 0 30px 0; line-height: 1.6; }
  
  .btn-group { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
  
  .btn-primary { 
    background: #0f172a; 
    color: white; 
    padding: 14px 35px; 
    border-radius: 50px; 
    font-weight: 700; 
    text-decoration: none; 
    transition: 0.3s; 
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .btn-primary:hover { background: #f97316; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(249, 115, 22, 0.3); }
  
  .btn-outline { 
    background: white; 
    color: #0f172a; 
    border: 2px solid #e2e8f0; 
    padding: 14px 35px; 
    border-radius: 50px; 
    font-weight: 700; 
    text-decoration: none; 
    transition: 0.3s; 
  }
  .btn-outline:hover { border-color: #0f172a; }

  /* --- CARD GRID --- */
  .grid-container { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
    gap: 30px; 
  }

  .course-card { 
    background: white; 
    border-radius: 24px; 
    overflow: hidden; 
    border: 1px solid #f1f5f9; 
    transition: all 0.3s ease; 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
    position: relative; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); 
  }
  .course-card:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px -5px rgba(0,0,0,0.1); 
    border-color: #fed7aa; 
  }

  /* IMAGE */
  .card-image { 
    height: 200px; 
    background-size: cover; 
    background-position: center; 
    position: relative; 
  }
  .card-image::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.2); transition: 0.3s; }
  .course-card:hover .card-image::after { background: rgba(0,0,0,0.1); }
  
  .category-badge { 
    position: absolute; 
    top: 15px; left: 15px; 
    z-index: 2; 
    background: rgba(255,255,255,0.95); 
    color: #c2410c; 
    font-size: 0.7rem; 
    font-weight: 800; 
    padding: 6px 12px; 
    border-radius: 8px; 
    text-transform: uppercase; 
    letter-spacing: 0.5px; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
  }
  
  .play-overlay { position: absolute; inset: 0; display: grid; place-items: center; z-index: 2; opacity: 0; transition: 0.3s; }
  .course-card:hover .play-overlay { opacity: 1; }
  .play-btn { 
    width: 60px; height: 60px; 
    background: rgba(255,255,255,0.9); 
    border-radius: 50%; 
    display: grid; place-items: center; 
    color: #f97316; font-size: 1.5rem; padding-left: 4px; 
    box-shadow: 0 10px 20px rgba(0,0,0,0.2); 
    transform: scale(0.8); transition: 0.3s; 
  }
  .course-card:hover .play-btn { transform: scale(1); }

  /* BODY */
  .card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
  
  .course-title { 
    margin: 0 0 8px 0; 
    font-size: 1.2rem; 
    line-height: 1.4; 
    color: #0f172a; 
    font-weight: 700; 
  }
  .mentor-name { color: #64748b; font-size: 0.9rem; font-weight: 500; margin: 0 0 25px 0; }

  /* PROGRESS BAR */
  .progress-section { margin-top: auto; margin-bottom: 24px; }
  .progress-info { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
  .progress-track { height: 8px; background: #f1f5f9; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
  .progress-fill { height: 100%; background: #f97316; border-radius: 10px; }
  .materi-count { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

  /* ACTION BUTTON */
  .btn-action { 
    width: 100%; 
    border: none; 
    padding: 14px; 
    border-radius: 12px; 
    font-weight: 700; 
    cursor: pointer; 
    transition: all 0.3s ease; 
    font-size: 0.95rem; 
    text-align: center; 
    text-decoration: none; 
    display: block; 
    box-sizing: border-box; 
    background: #0f172a; 
    color: white; 
  }
  .btn-action:hover { 
    background: #f97316; 
    transform: translateY(-2px); 
    box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3); 
  }

  @media (max-width: 640px) {
    .header h1 { font-size: 2rem; }
    .grid-container { grid-template-columns: 1fr; }
  }
</style>