<script>
  import { tasks } from "$lib/stores";
  import { fade, scale } from "svelte/transition"; // Untuk animasi modal

  let activeFilter = "All";
  const filters = ["All", "To Do", "In Progress", "Completed"];

  // --- LOGIC MODAL & FORM ---
  let showModal = false;

  // State untuk Form Input
  let newTitle = "";
  let newMapel = "";
  let newDesc = "";
  let newPriority = "Medium";

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    // Reset form saat tutup
    newTitle = "";
    newMapel = "";
    newDesc = "";
    newPriority = "Medium";
  }

  function saveTask() {
    if (!newTitle) return alert("Judul wajib diisi!");

    // Update Store
    tasks.update((currentTasks) => [
      ...currentTasks,
      {
        id: Math.random(), // ID Random
        title: newTitle,
        desc: newDesc || "No description provided.",
        mapel: newMapel || "General",
        due: "Baru Saja",
        priority: newPriority,
        status: "To Do",
        team: ["Me"], // Default user
      },
    ]);

    closeModal(); // Tutup modal setelah simpan
  }

  // Logic Filter
  $: filteredTasks = activeFilter === "All" ? $tasks : $tasks.filter((t) => t.status === activeFilter);
</script>

<div class="task-container">
  <div class="task-header">
    <div class="header-text">
      <h1>Assignments 📝</h1>
      <p>Keep track of your projects.</p>
    </div>
    <button class="btn-add" on:click={openModal}>+ New Submission</button>
  </div>

  <div class="stats-row">
    <div class="stat-pill orange">
      <span class="num">{$tasks.length}</span>
      <span class="label">Total Tasks</span>
    </div>
  </div>

  <div class="filter-bar">
    {#each filters as f}
      <button class:active={activeFilter === f} on:click={() => (activeFilter = f)}>{f}</button>
    {/each}
  </div>

  <div class="task-grid">
    {#each filteredTasks as t}
      <a href="/assignments/{t.id}" class="task-card {t.status === 'Completed' ? 'done' : ''}">
        <div class="card-top">
          <span class="tag-mapel">{t.mapel}</span>
          <div class="priority-badge {t.priority.toLowerCase()}">{t.priority}</div>
        </div>

        <h3>{t.title}</h3>
        <p class="desc">{t.desc}</p>

        <div class="card-footer">
          <div class="team-stack">
            {#each t.team as m}
              <img src="https://ui-avatars.com/api/?name={m}&background=random" alt="m" />
            {/each}
          </div>
          <span class="status-pill">{t.status}</span>
        </div>
      </a>
    {/each}
  </div>
</div>

{#if showModal}
  <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={closeModal}>
    <div class="modal-card" transition:scale={{ start: 0.9, duration: 200 }} on:click|stopPropagation>
      <div class="modal-header">
        <h2>Create New Task</h2>
        <button class="btn-close" on:click={closeModal}>✕</button>
      </div>

      <div class="modal-body">
        <label>Judul Tugas</label>
        <input type="text" placeholder="Contoh: Redesign Homepage..." bind:value={newTitle} autofocus />

        <div class="row-input">
          <div>
            <label>Mata Pelajaran</label>
            <input type="text" placeholder="UI/UX, Math..." bind:value={newMapel} />
          </div>
          <div>
            <label>Prioritas</label>
            <select bind:value={newPriority}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <label>Deskripsi</label>
        <textarea rows="3" placeholder="Detail tugas..." bind:value={newDesc}></textarea>
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" on:click={closeModal}>Cancel</button>
        <button class="btn-save" on:click={saveTask}>Create Task</button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* PAKE CSS TASK YANG TADI (SAMA PERSIS) */
  .task-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #111827;
  }
  p {
    margin: 5px 0 0 0;
    color: #6b7280;
  }
  .btn-add {
    background: #1f2937;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .btn-add:hover {
    background: #f97316;
    transform: translateY(-2px);
  }
  .stats-row {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .stat-pill {
    background: white;
    padding: 15px 25px;
    border-radius: 16px;
    min-width: 100px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    border: 1px solid #f3f4f6;
  }
  .stat-pill .num {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    display: block;
  }
  .stat-pill.orange {
    border-bottom: 4px solid #f97316;
  }
  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 15px;
  }
  .filter-bar button {
    background: none;
    border: none;
    padding: 8px 16px;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 8px;
  }
  .filter-bar button.active {
    color: #f97316;
    background: #fff7ed;
  }
  .task-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }
  .task-card {
    background: white;
    border-radius: 20px;
    padding: 25px;
    border: 1px solid #f3f4f6;
    transition: 0.3s;
  }
  .task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
    border-color: #f97316;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .tag-mapel {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
  }
  .priority-badge {
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 50px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .priority-badge.high {
    background: #fef2f2;
    color: #dc2626;
  }
  .priority-badge.medium {
    background: #fff7ed;
    color: #ea580c;
  }
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #111827;
  }
  .desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 20px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .team-stack img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -10px;
  }
  .team-stack {
    padding-left: 10px;
  }
  a.task-card {
    text-decoration: none; /* Hilangkan garis bawah */
    color: inherit; /* Warna teks ikut parent */
    display: block; /* Agar kotak sempurna */
    /* ... sisa style card TETAP SAMA ... */
    background: white;
    border-radius: 20px;
    padding: 25px;
    border: 1px solid #f3f4f6;
    transition: 0.3s;
  }

  a.task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
    border-color: #f97316;
  }

  /* Ganti style .btn-status jadi .status-pill */
  .status-pill {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    background: #f3f4f6;
    font-weight: 600;
    color: #6b7280;
  }
  .task-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 15px;
  }
  .filter-bar button {
    background: none;
    border: none;
    padding: 8px 16px;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 8px;
  }
  .filter-bar button.active {
    color: #f97316;
    background: #fff7ed;
  }
  .task-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .tag-mapel {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
  }
  .priority-badge {
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 50px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .priority-badge.high {
    background: #fef2f2;
    color: #dc2626;
  }
  .priority-badge.medium {
    background: #fff7ed;
    color: #ea580c;
  }
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #111827;
  }
  .desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 20px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .team-stack img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -10px;
  }
  .team-stack {
    padding-left: 10px;
  }

  .task-container {
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #111827;
  }
  p {
    margin: 5px 0 0 0;
    color: #6b7280;
  }

  .btn-add {
    background: #1f2937;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .btn-add:hover {
    background: #f97316;
    transform: translateY(-2px);
  }

  .stats-row {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .stat-pill {
    background: white;
    padding: 15px 25px;
    border-radius: 16px;
    min-width: 100px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    border: 1px solid #f3f4f6;
  }
  .stat-pill .num {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    display: block;
  }
  .stat-pill.orange {
    border-bottom: 4px solid #f97316;
  }

  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 15px;
  }
  .filter-bar button {
    background: none;
    border: none;
    padding: 8px 16px;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 8px;
  }
  .filter-bar button.active {
    color: #f97316;
    background: #fff7ed;
  }

  .task-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }

  /* Link Card Style */
  a.task-card {
    text-decoration: none;
    color: inherit;
    display: block;
    background: white;
    border-radius: 20px;
    padding: 25px;
    border: 1px solid #f3f4f6;
    transition: 0.3s;
  }
  a.task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
    border-color: #f97316;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .tag-mapel {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
  }

  .priority-badge {
    font-size: 0.7rem;
    padding: 4px 10px;
    border-radius: 50px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .priority-badge.high {
    background: #fef2f2;
    color: #dc2626;
  }
  .priority-badge.medium {
    background: #fff7ed;
    color: #ea580c;
  }
  .priority-badge.low {
    background: #ecfdf5;
    color: #059669;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #111827;
  }
  .desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .team-stack img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -10px;
  }
  .team-stack {
    padding-left: 10px;
  }

  .status-pill {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    background: #f3f4f6;
    font-weight: 600;
    color: #6b7280;
  }

  /* --- MODAL STYLES (BARU) --- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal-card {
    background: white;
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    border: 1px solid #fff7ed;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
  }
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #9ca3af;
    cursor: pointer;
  }

  .modal-body label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: #4b5563;
    margin-bottom: 5px;
    margin-top: 15px;
  }
  .modal-body input,
  .modal-body textarea,
  .modal-body select {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    font-size: 0.95rem;
    outline: none;
    transition: 0.2s;
    font-family: inherit;
    box-sizing: border-box;
  }
  .modal-body input:focus,
  .modal-body textarea:focus,
  .modal-body select:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }

  .row-input {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .modal-footer {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .btn-cancel {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
  }
  .btn-save {
    background: #1f2937;
    border: none;
    padding: 10px 25px;
    border-radius: 50px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: 0.2s;
  }
  .btn-save:hover {
    background: #f97316;
  }
</style>
