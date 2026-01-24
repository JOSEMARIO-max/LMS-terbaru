<script>
  import { tasks } from '$lib/stores'; // Import Store Tugas
  
  let activeFilter = 'All';
  const filters = ['All', 'To Do', 'In Progress', 'Completed'];

  // Fungsi Tambah Tugas (Simple Prompt)
  function addTask() {
    const title = prompt("Judul Tugas Baru:");
    if(!title) return;
    
    const mapel = prompt("Mata Pelajaran (contoh: UI/UX):") || "General";
    
    // Update Store
    tasks.update(currentTasks => [
      ...currentTasks, // Copy tugas lama
      {
        id: Math.random(),
        title: title,
        desc: "New task created by user.",
        mapel: mapel,
        due: "Baru Saja",
        priority: "Medium",
        status: "To Do",
        team: ["Me"]
      }
    ]);
  }

  // Logic Filter (Reactive)
  $: filteredTasks = activeFilter === 'All' 
    ? $tasks 
    : $tasks.filter(t => t.status === activeFilter);
</script>

<div class="task-container">
  <div class="task-header">
    <div class="header-text">
      <h1>Assignments 📝</h1>
      <p>Keep track of your projects.</p>
    </div>
    <button class="btn-add" on:click={addTask}>+ New Submission</button>
  </div>

  <div class="stats-row">
    <div class="stat-pill orange">
      <span class="num">{$tasks.length}</span>
      <span class="label">Total Tasks</span>
    </div>
    </div>

  <div class="filter-bar">
    {#each filters as f}
      <button class:active={activeFilter === f} on:click={() => activeFilter = f}>{f}</button>
    {/each}
  </div>

  <div class="task-grid">
    {#each filteredTasks as t}
      <div class="task-card {t.status === 'Completed' ? 'done' : ''}">
        <div class="card-top">
          <span class="tag-mapel">{t.mapel}</span>
          <div class="priority-badge {t.priority.toLowerCase()}">{t.priority}</div>
        </div>
        <h3>{t.title}</h3>
        <p class="desc">{t.desc}</p>
        <div class="card-footer">
           <div class="team-stack">
             {#each t.team as m}
               <img src="https://ui-avatars.com/api/?name={m}&background=random" alt="m">
             {/each}
           </div>
           <button class="btn-status">{t.status}</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* PAKE CSS TASK YANG TADI (SAMA PERSIS) */
  .task-container { max-width: 1000px; margin: 0 auto; padding-bottom: 50px; }
  .task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
  h1 { margin: 0; font-size: 1.8rem; color: #111827; }
  p { margin: 5px 0 0 0; color: #6B7280; }
  .btn-add { background: #1F2937; color: white; border: none; padding: 12px 24px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: 0.2s; }
  .btn-add:hover { background: #F97316; transform: translateY(-2px); }
  .stats-row { display: flex; gap: 20px; margin-bottom: 30px; }
  .stat-pill { background: white; padding: 15px 25px; border-radius: 16px; min-width: 100px; box-shadow: 0 5px 15px rgba(0,0,0,0.03); border: 1px solid #F3F4F6; }
  .stat-pill .num { font-size: 1.5rem; font-weight: 700; color: #111827; display: block; }
  .stat-pill.orange { border-bottom: 4px solid #F97316; }
  .filter-bar { display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 1px solid #E5E7EB; padding-bottom: 15px; }
  .filter-bar button { background: none; border: none; padding: 8px 16px; font-weight: 600; color: #9CA3AF; cursor: pointer; border-radius: 8px; }
  .filter-bar button.active { color: #F97316; background: #FFF7ED; }
  .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }
  .task-card { background: white; border-radius: 20px; padding: 25px; border: 1px solid #F3F4F6; transition: 0.3s; }
  .task-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); border-color: #F97316; }
  .card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
  .tag-mapel { font-size: 0.75rem; font-weight: 700; color: #6B7280; text-transform: uppercase; }
  .priority-badge { font-size: 0.7rem; padding: 4px 10px; border-radius: 50px; font-weight: 700; text-transform: uppercase; }
  .priority-badge.high { background: #FEF2F2; color: #DC2626; } .priority-badge.medium { background: #FFF7ED; color: #EA580C; }
  h3 { margin: 0 0 10px 0; font-size: 1.1rem; color: #111827; }
  .desc { font-size: 0.9rem; color: #6B7280; margin-bottom: 20px; }
  .card-footer { display: flex; justify-content: space-between; align-items: center; }
  .team-stack img { width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; margin-left: -10px; } .team-stack { padding-left: 10px; }
  .btn-status { padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; background: #F3F4F6; border: none; font-weight: 600; color: #6B7280; }
</style>