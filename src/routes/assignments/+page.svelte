<script>
  // 1. IMPORT DATA STORE
  import { tasks, isPremium, ownedCourses } from "$lib/stores"; 
  import { fade, scale, fly } from "svelte/transition"; 

  // 2. LOGIC CEK AKSES
  // User punya akses jika: Premium ATAU Punya minimal 1 kursus
  $: hasAccess = $isPremium || $ownedCourses.length > 0;

  let activeFilter = "All";
  const filters = ["All", "To Do", "In Progress", "Completed"];

  // --- LOGIC MODAL & FORM ---
  let showModal = false;
  let newTitle = "", newMapel = "", newDesc = "", newPriority = "Medium";

  function openModal() { showModal = true; }
  function closeModal() { showModal = false; resetForm(); }
  function resetForm() { newTitle = ""; newMapel = ""; newDesc = ""; newPriority = "Medium"; }

  function saveTask() {
    if (!newTitle) return alert("Judul wajib diisi!");
    tasks.update((currentTasks) => [
      {
        id: Date.now(), title: newTitle, desc: newDesc || "Tidak ada deskripsi.",
        mapel: newMapel || "Umum", due: "Baru Saja", priority: newPriority,
        status: "To Do", team: ["Me"], 
      },
      ...currentTasks,
    ]);
    closeModal(); 
  }

  $: filteredTasks = activeFilter === "All" ? $tasks : $tasks.filter((t) => t.status === activeFilter);
</script>

<div class="task-container">
  
  <div class="task-header">
    <div class="header-text">
      <h1>Assignments 📝</h1>
      <p>Kelola tugas dan proyekmu di sini.</p>
    </div>
    
    {#if hasAccess}
      <button class="btn-add" on:click={openModal}>+ Tugas Baru</button>
    {/if}
  </div>

  {#if hasAccess}
    
    <div in:fade>
      <div class="stats-row">
        <div class="stat-pill orange">
          <span class="num">{$tasks.length}</span>
          <span class="label">Total Tugas</span>
        </div>
        <div class="stat-pill green">
          <span class="num">{$tasks.filter(t => t.status === 'Completed').length}</span>
          <span class="label">Selesai</span>
        </div>
      </div>

      <div class="filter-bar">
        {#each filters as f}
          <button class:active={activeFilter === f} on:click={() => (activeFilter = f)}>{f}</button>
        {/each}
      </div>

      <div class="task-grid">
        {#each filteredTasks as t (t.id)}
          <div class="task-card {t.status === 'Completed' ? 'done' : ''}" in:fly={{ y: 20, duration: 300 }}>
            <div class="card-top">
              <span class="tag-mapel">{t.mapel}</span>
              <div class="priority-badge {t.priority.toLowerCase()}">{t.priority}</div>
            </div>

            <h3>{t.title}</h3>
            <p class="desc">{t.desc}</p>

            <div class="card-footer">
              <span class="due-date">📅 {t.due}</span>
              <button class="status-pill {t.status.replace(' ', '-').toLowerCase()}" on:click={() => {
                  if(t.status === 'To Do') t.status = 'In Progress';
                  else if(t.status === 'In Progress') t.status = 'Completed';
                  else t.status = 'To Do';
                  $tasks = $tasks;
              }}>
                {t.status}
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>

  {:else}

    <div class="locked-state" in:scale={{ start: 0.95 }}>
        <div class="icon-lock">🔒</div>
        <h3>Fitur Tugas Terkunci</h3>
        <p>
            Menu ini khusus untuk siswa yang aktif.<br>
            Silakan <strong>berlangganan PRO</strong> atau <strong>beli minimal 1 kelas</strong> untuk membuka akses tugas dan proyek.
        </p>
        <div class="btn-group">
            <a href="/courses" class="btn-primary">Lihat Katalog Kelas</a>
            <a href="/profile" class="btn-outline">Aktifkan PRO</a>
        </div>
    </div>

  {/if}

</div>

{#if showModal}
  <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={closeModal}>
    <div class="modal-card" transition:scale={{ start: 0.95, duration: 200 }} on:click|stopPropagation>
      <div class="modal-header"><h2>Buat Tugas Baru</h2><button class="btn-close" on:click={closeModal}>✕</button></div>
      <div class="modal-body">
        <div class="input-group"><label>Judul Tugas</label><input type="text" placeholder="Contoh: Redesign Homepage..." bind:value={newTitle} /></div>
        <div class="row-input">
          <div class="input-group"><label>Mata Pelajaran</label><input type="text" placeholder="UI/UX..." bind:value={newMapel} /></div>
          <div class="input-group"><label>Prioritas</label><select bind:value={newPriority}><option>Low</option><option>Medium</option><option>High</option></select></div>
        </div>
        <div class="input-group"><label>Deskripsi</label><textarea rows="3" placeholder="Detail tugas..." bind:value={newDesc}></textarea></div>
      </div>
      <div class="modal-footer"><button class="btn-cancel" on:click={closeModal}>Batal</button><button class="btn-save" on:click={saveTask}>Simpan</button></div>
    </div>
  </div>
{/if}

<style>
  /* --- BASE STYLES --- */
  :global(body) { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; margin: 0; }
  .task-container { max-width: 1000px; margin: 0 auto; padding: 40px 20px 80px; }

  /* HEADER */
  .task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
  h1 { margin: 0; font-size: 2rem; color: #111827; }
  p { margin: 5px 0 0; color: #6b7280; }
  .btn-add { background: #1f2937; color: white; border: none; padding: 12px 24px; border-radius: 50px; font-weight: 700; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
  .btn-add:hover { background: #f97316; transform: translateY(-2px); }

  /* --- LOCKED STATE STYLE (BARU) --- */
  .locked-state { 
      text-align: center; 
      background: white; 
      padding: 60px 20px; 
      border-radius: 24px; 
      border: 2px dashed #cbd5e1; 
      margin-top: 20px;
  }
  .icon-lock { font-size: 4rem; margin-bottom: 20px; animation: bounce 2s infinite; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  
  .locked-state h3 { font-size: 1.8rem; margin: 0 0 10px 0; color: #1e293b; }
  .locked-state p { color: #64748b; margin-bottom: 30px; line-height: 1.6; }
  
  .btn-group { display: flex; gap: 15px; justify-content: center; }
  .btn-primary { background: #111827; color: white; padding: 12px 30px; border-radius: 50px; font-weight: 700; text-decoration: none; transition: 0.2s; }
  .btn-primary:hover { background: #f97316; }
  .btn-outline { background: white; color: #111827; border: 2px solid #e2e8f0; padding: 12px 30px; border-radius: 50px; font-weight: 700; text-decoration: none; transition: 0.2s; }
  .btn-outline:hover { border-color: #111827; }

  /* STATS */
  .stats-row { display: flex; gap: 20px; margin-bottom: 30px; }
  .stat-pill { background: white; padding: 15px 25px; border-radius: 16px; min-width: 120px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
  .stat-pill .num { font-size: 1.8rem; font-weight: 800; color: #111827; display: block; line-height: 1; margin-bottom: 5px; }
  .stat-pill .label { font-size: 0.8rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-pill.orange { border-bottom: 4px solid #f97316; }
  .stat-pill.green { border-bottom: 4px solid #10b981; }

  /* FILTER */
  .filter-bar { display: flex; gap: 10px; margin-bottom: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; overflow-x: auto; }
  .filter-bar button { background: none; border: none; padding: 8px 16px; font-weight: 600; color: #64748b; cursor: pointer; border-radius: 8px; transition: 0.2s; white-space: nowrap; }
  .filter-bar button:hover { background: #f1f5f9; color: #1e293b; }
  .filter-bar button.active { color: #f97316; background: #fff7ed; }

  /* GRID */
  .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }

  /* CARD */
  .task-card { background: white; border-radius: 20px; padding: 25px; border: 1px solid #f1f5f9; transition: 0.3s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); display: flex; flex-direction: column; position: relative; overflow: hidden; }
  .task-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -5px rgba(0,0,0,0.08); border-color: #fdba74; }
  .task-card.done { opacity: 0.8; background: #f8fafc; border-style: dashed; }
  .task-card.done h3 { text-decoration: line-through; color: #94a3b8; }

  .card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
  .tag-mapel { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

  .priority-badge { font-size: 0.7rem; padding: 4px 10px; border-radius: 50px; font-weight: 700; text-transform: uppercase; }
  .priority-badge.high { background: #fef2f2; color: #dc2626; }
  .priority-badge.medium { background: #fff7ed; color: #ea580c; }
  .priority-badge.low { background: #dcfce7; color: #166534; }

  h3 { margin: 0 0 10px 0; font-size: 1.15rem; color: #111827; font-weight: 700; }
  .desc { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex: 1; }

  .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
  .due-date { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }

  .status-pill { border: none; padding: 6px 14px; border-radius: 8px; font-size: 0.75rem; background: #f1f5f9; font-weight: 700; color: #475569; cursor: pointer; transition: 0.2s; }
  .status-pill:hover { background: #e2e8f0; color: #1e293b; }
  .status-pill.to-do { background: #f3f4f6; color: #4b5563; }
  .status-pill.in-progress { background: #eff6ff; color: #2563eb; }
  .status-pill.completed { background: #dcfce7; color: #166534; }

  /* MODAL */
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 100; display: flex; justify-content: center; align-items: center; padding: 20px; }
  .modal-card { background: white; width: 100%; max-width: 500px; border-radius: 24px; padding: 30px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #fff7ed; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
  .modal-header h2 { margin: 0; font-size: 1.5rem; color: #1f2937; }
  .btn-close { background: none; border: none; font-size: 1.5rem; color: #9ca3af; cursor: pointer; transition: 0.2s; }
  .btn-close:hover { color: #ef4444; }
  .input-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 8px; }
  .modal-body label { display: block; font-size: 0.85rem; font-weight: 700; color: #4b5563; }
  .modal-body input, .modal-body textarea, .modal-body select { width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.95rem; outline: none; transition: 0.2s; font-family: inherit; box-sizing: border-box; background: #f9fafb; }
  .modal-body input:focus, .modal-body textarea:focus, .modal-body select:focus { border-color: #f97316; box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); background: white; }
  .row-input { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
  .modal-footer { margin-top: 35px; display: flex; justify-content: flex-end; gap: 12px; }
  .btn-cancel { background: white; border: 1px solid #e2e8f0; padding: 12px 24px; border-radius: 50px; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.2s; }
  .btn-cancel:hover { background: #f1f5f9; color: #1e293b; }
  .btn-save { background: #1f2937; border: none; padding: 12px 30px; border-radius: 50px; font-weight: 600; color: white; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .btn-save:hover { background: #f97316; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(249, 115, 22, 0.25); }
</style>