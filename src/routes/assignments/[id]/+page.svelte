<script>
  import { page } from "$app/stores";
  import { tasks } from "$lib/stores";

  // Ambil ID dari URL
  const taskId = $page.params.id;

  // Cari tugas di store berdasarkan ID
  // (Karena ID di store bisa number atau string, kita pakai loose equality ==)
  let task = $tasks.find((t) => t.id == taskId);

  // Fallback jika task tidak ditemukan (misal refresh halaman dan store kosong)
  if (!task) {
    task = {
      title: "Tugas Tidak Ditemukan",
      desc: "Mungkin Anda me-refresh halaman? Karena ini data dummy lokal, silakan kembali ke menu utama.",
      mapel: "Error",
      priority: "Low",
      due: "-",
      status: "Unknown",
    };
  }

  // State untuk upload file
  let isDragging = false;
  let fileUploaded = null;

  function handleDrop(e) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileUploaded = e.dataTransfer.files[0];
    }
  }

  function handleFileSelect(e) {
    if (e.target.files && e.target.files[0]) {
      fileUploaded = e.target.files[0];
    }
  }
</script>

<div class="detail-container">
  <a href="/assignments" class="btn-back">← Back to Assignments</a>

  <div class="detail-grid">
    <div class="main-col">
      <div class="header-card">
        <div class="hc-top">
          <span class="badge-mapel">{task.mapel}</span>
          <span class="badge-prio {task.priority.toLowerCase()}">{task.priority} Priority</span>
        </div>
        <h1>{task.title}</h1>
        <div class="meta-row">
          <span>📅 Due: {task.due}</span>
          <span>👤 Team: Me</span>
        </div>
      </div>

      <div class="content-card">
        <h3>Description</h3>
        <p class="desc-text">{task.desc}</p>

        <div class="attachment-box">
          📎 <strong>Reference.pdf</strong> (Teacher's Guide)
          <button class="btn-dl">Download</button>
        </div>
      </div>

      <div class="comments-section">
        <h3>Comments (2)</h3>
        <div class="comment-item">
          <img src="https://ui-avatars.com/api/?name=Teacher" alt="t" />
          <div>
            <strong>Mr. Teacher</strong>
            <p>Please refer to chapter 4 for the design guidelines.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="side-col">
      <div class="submission-card">
        <h3>Your Submission</h3>
        <div class="status-indicator {task.status === 'Completed' ? 'green' : 'orange'}">
          Status: <strong>{task.status}</strong>
        </div>

        {#if task.status === "Completed"}
          <div class="submitted-view">
            <div class="check-icon">✅</div>
            <p>Assignment Handed In</p>
            <small>12 Feb 2026, 10:00 AM</small>
            <button class="btn-undo">Unsubmit</button>
          </div>
        {:else}
          <div class="drop-zone" class:dragging={isDragging} on:dragover|preventDefault={() => (isDragging = true)} on:dragleave={() => (isDragging = false)} on:drop={handleDrop}>
            {#if fileUploaded}
              <div class="file-preview">
                📄 {fileUploaded.name}
                <button on:click={() => (fileUploaded = null)}>✕</button>
              </div>
            {:else}
              <div class="upload-icon">☁️</div>
              <p>Drag & Drop files here or</p>
              <label class="btn-browse">
                Browse File
                <input type="file" hidden on:change={handleFileSelect} />
              </label>
            {/if}
          </div>

          <button class="btn-submit" disabled={!fileUploaded}> Turn In Assignment </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* --- LAYOUT --- */
  .detail-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .btn-back {
    text-decoration: none;
    color: #6b7280;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 25px;
    transition: 0.2s;
  }
  .btn-back:hover {
    color: #f97316;
    transform: translateX(-5px);
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
  }
  @media (max-width: 800px) {
    .detail-grid {
      grid-template-columns: 1fr;
    }
    .side-col {
      order: -1;
    }
  }

  /* --- LEFT COLUMN --- */
  .header-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    border: 1px solid #f3f4f6;
    margin-bottom: 20px;
  }
  .hc-top {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  .badge-mapel {
    background: #f3f4f6;
    color: #4b5563;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
  .badge-prio {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .badge-prio.high {
    background: #fef2f2;
    color: #dc2626;
  }
  .badge-prio.medium {
    background: #fff7ed;
    color: #ea580c;
  }

  h1 {
    font-size: 2rem;
    margin: 0 0 15px 0;
    color: #1f2937;
  }
  .meta-row {
    display: flex;
    gap: 20px;
    color: #6b7280;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .content-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    border: 1px solid #f3f4f6;
    margin-bottom: 20px;
  }
  .desc-text {
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 20px;
  }
  .attachment-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #374151;
  }
  .btn-dl {
    background: white;
    border: 1px solid #d1d5db;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .comments-section {
    margin-top: 30px;
  }
  .comment-item {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }
  .comment-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .comment-item div {
    background: #f3f4f6;
    padding: 10px 15px;
    border-radius: 0 15px 15px 15px;
  }
  .comment-item p {
    margin: 5px 0 0 0;
    font-size: 0.9rem;
    color: #4b5563;
  }

  /* --- RIGHT COLUMN (SUBMISSION) --- */
  .submission-card {
    background: white;
    padding: 25px;
    border-radius: 20px;
    border: 1px solid #f3f4f6;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    height: fit-content;
    position: sticky;
    top: 20px;
  }
  .submission-card h3 {
    margin-top: 0;
  }

  .status-indicator {
    margin-bottom: 20px;
    font-size: 0.9rem;
    padding: 10px;
    border-radius: 8px;
    background: #fff7ed;
    color: #c2410c;
  }
  .status-indicator.green {
    background: #ecfdf5;
    color: #047857;
  }

  /* Drop Zone */
  .drop-zone {
    border: 2px dashed #d1d5db;
    border-radius: 15px;
    padding: 40px 20px;
    text-align: center;
    color: #9ca3af;
    transition: 0.2s;
    background: #f9fafb;
  }
  .drop-zone.dragging {
    border-color: #f97316;
    background: #fff7ed;
    color: #f97316;
  }

  .upload-icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  .btn-browse {
    color: #f97316;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
  }

  .file-preview {
    background: white;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #374151;
    font-weight: 600;
  }
  .file-preview button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-weight: bold;
  }

  .btn-submit {
    width: 100%;
    background: #1f2937;
    color: white;
    padding: 12px;
    border-radius: 10px;
    border: none;
    font-weight: 700;
    margin-top: 20px;
    cursor: pointer;
  }
  .btn-submit:hover {
    background: #f97316;
  }
  .btn-submit:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
    color: #9ca3af;
  }

  /* Submitted View */
  .submitted-view {
    text-align: center;
    padding: 20px 0;
  }
  .check-icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }
  .btn-undo {
    margin-top: 15px;
    background: white;
    border: 1px solid #d1d5db;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
