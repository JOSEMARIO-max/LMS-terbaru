<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  // ID Kelas dari URL
  const classId = $page.params.id;

  // --- DATA DUMMY KELAS ---
  const classInfo = {
    title: "Visual Design Principle",
    mentor: "Padhang Satrio",
    time_start: "08:00",
    time_end: "09:30",
    participants_count: 24,
    bg_image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80", // Gambar background video
  };

  // --- SVELTE 5 STATES (RUNES) ---
  let activeTab = $state("chat"); // 'chat', 'people', 'files'
  let messageInput = $state("");

  // State Controls
  let isMicOn = $state(true);
  let isCamOn = $state(true);
  let isHandRaised = $state(false);

  // Data Chat Dummy
  let chats = $state([
    { name: "Siti Aisyah", text: "Selamat pagi semuanya! 👋", time: "08:01", self: false },
    { name: "Budi Santoso", text: "Materinya bisa didownload dimana ya mas?", time: "08:05", self: false },
    { name: "Me", text: "Halo, ada di tab Files ya", time: "08:06", self: true },
  ]);

  // Data Files Dummy
  const files = [
    { name: "Slide_Materi_Minggu_3.pdf", size: "2.4 MB" },
    { name: "Assets_Latihan.zip", size: "15 MB" },
  ];

  // --- LOGIC KIRIM PESAN ---
  function sendMessage(e) {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Tambah chat baru ke array
    chats = [
      ...chats,
      {
        name: "Me",
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        self: true,
      },
    ];

    messageInput = ""; // Reset input

    // Auto scroll ke bawah (simple logic)
    setTimeout(() => {
      const chatBox = document.getElementById("chat-scroll");
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
  }
</script>

<div class="classroom-layout">
  <main class="stream-area">
    <div class="stream-header">
      <div class="live-badge">
        <span class="dot"></span> LIVE
      </div>
      <div class="class-meta">
        <h2>{classInfo.title}</h2>
        <span>with {classInfo.mentor} • {classInfo.time_start} - {classInfo.time_end}</span>
      </div>
    </div>

    <div class="video-container" style="background-image: url('{classInfo.bg_image}')">
      {#if !isCamOn}
        <div class="cam-off-overlay">
          <div class="avatar-placeholder">You</div>
          <p>Camera is off</p>
        </div>
      {/if}

      <div class="participant-name">Padhang Satrio (Mentor)</div>
    </div>

    <div class="controls-bar">
      <div class="left-controls">
        <button class="ctrl-btn {isMicOn ? '' : 'off'}" onclick={() => (isMicOn = !isMicOn)} title="Toggle Mic">
          {isMicOn ? "🎙️" : "🔇"}
        </button>
        <button class="ctrl-btn {isCamOn ? '' : 'off'}" onclick={() => (isCamOn = !isCamOn)} title="Toggle Camera">
          {isCamOn ? "📹" : "📷"}
        </button>
      </div>

      <div class="center-controls">
        <button class="ctrl-btn hand {isHandRaised ? 'active' : ''}" onclick={() => (isHandRaised = !isHandRaised)} title="Raise Hand"> ✋ </button>
        <button class="ctrl-btn share" title="Share Screen"> 🖥️ </button>
      </div>

      <div class="right-controls">
        <a href="/schedule" class="btn-end">End Call 📞</a>
      </div>
    </div>
  </main>

  <aside class="sidebar">
    <div class="tabs">
      <button class={activeTab === "chat" ? "active" : ""} onclick={() => (activeTab = "chat")}> Chat </button>
      <button class={activeTab === "people" ? "active" : ""} onclick={() => (activeTab = "people")}>
        People ({classInfo.participants_count})
      </button>
      <button class={activeTab === "files" ? "active" : ""} onclick={() => (activeTab = "files")}> Files </button>
    </div>

    {#if activeTab === "chat"}
      <div class="chat-container">
        <div class="chat-list" id="chat-scroll">
          {#each chats as chat}
            <div class="chat-bubble {chat.self ? 'me' : 'other'}">
              <div class="chat-name">{chat.name} <small>{chat.time}</small></div>
              <div class="chat-text">{chat.text}</div>
            </div>
          {/each}
        </div>

        <form class="chat-input-area" onsubmit={sendMessage}>
          <input type="text" placeholder="Type a message..." bind:value={messageInput} />
          <button type="submit" disabled={!messageInput}>➤</button>
        </form>
      </div>
    {:else if activeTab === "people"}
      <div class="people-list">
        <div class="person-row">
          <img src="https://ui-avatars.com/api/?name=Padhang+Satrio" alt="p" />
          <div>
            <strong>Padhang Satrio</strong>
            <small>Host • Mentor</small>
          </div>
          <span>🎙️</span>
        </div>
        {#each Array(5) as _, i}
          <div class="person-row">
            <img src="https://ui-avatars.com/api/?name=User+{i}&background=random" alt="p" />
            <div>
              <strong>Student {i + 1}</strong>
              <small>Student</small>
            </div>
            <span class="muted">🔇</span>
          </div>
        {/each}
      </div>
    {:else}
      <div class="files-list">
        <div class="info-note">Files shared in this class will appear here.</div>
        {#each files as file}
          <div class="file-item">
            <div class="f-icon">📄</div>
            <div class="f-info">
              <strong>{file.name}</strong>
              <small>{file.size}</small>
            </div>
            <button class="btn-dl">⬇</button>
          </div>
        {/each}
      </div>
    {/if}
  </aside>
</div>

<style>
  /* --- LAYOUT GLOBAL --- */
  :global(body) {
    margin: 0;
    overflow: hidden;
  } /* Lock scroll body agar full screen */

  .classroom-layout {
    display: flex;
    height: 100vh;
    background: #111827; /* Dark Mode base untuk video */
    color: white;
  }

  /* --- STREAM AREA (KIRI) --- */
  .stream-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
  }

  .stream-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .live-badge {
    background: #dc2626;
    color: white;
    padding: 5px 12px;
    border-radius: 4px;
    font-weight: 800;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: pulse 1s infinite;
  }
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .class-meta {
    text-align: right;
  }
  .class-meta h2 {
    margin: 0;
    font-size: 1.2rem;
  }
  .class-meta span {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  /* VIDEO PLAYER */
  .video-container {
    flex: 1;
    background-color: #000;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .participant-name {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    padding: 5px 15px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .cam-off-overlay {
    background: #1f2937;
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    background: #374151;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    border: 2px solid #4b5563;
  }

  /* CONTROLS BAR */
  .controls-bar {
    margin-top: 20px;
    background: rgba(31, 41, 55, 0.8);
    backdrop-filter: blur(10px);
    padding: 15px 30px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ctrl-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    background: #374151;
    color: white;
    transition: 0.2s;
    margin-right: 10px;
  }
  .ctrl-btn:hover {
    background: #4b5563;
  }
  .ctrl-btn.off {
    background: #ef4444;
  } /* Merah kalau off */
  .ctrl-btn.hand.active {
    background: #f97316;
  } /* Orange kalau angkat tangan */

  .btn-end {
    background: #ef4444;
    color: white;
    text-decoration: none;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 700;
  }
  .btn-end:hover {
    background: #dc2626;
  }

  /* --- SIDEBAR (KANAN) --- */
  .sidebar {
    width: 350px;
    background: white; /* Light mode untuk sidebar agar kontras */
    color: #1f2937;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e5e7eb;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 10px;
  }
  .tabs button {
    flex: 1;
    padding: 15px;
    background: none;
    border: none;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    border-bottom: 3px solid transparent;
  }
  .tabs button.active {
    color: #f97316;
    border-bottom-color: #f97316;
  }

  /* CHAT TAB */
  .chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .chat-list {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .chat-bubble {
    padding: 10px 15px;
    border-radius: 12px;
    max-width: 85%;
    font-size: 0.9rem;
  }
  .chat-bubble.other {
    background: #f3f4f6;
    align-self: flex-start;
    border-bottom-left-radius: 2px;
  }
  .chat-bubble.me {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    align-self: flex-end;
    border-bottom-right-radius: 2px;
  }

  .chat-name {
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 4px;
    color: #f97316;
  }
  .other .chat-name {
    color: #4b5563;
  }
  .chat-name small {
    font-weight: 400;
    color: #9ca3af;
    margin-left: 5px;
  }

  .chat-input-area {
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 10px;
  }
  .chat-input-area input {
    flex: 1;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 50px;
    outline: none;
  }
  .chat-input-area input:focus {
    border-color: #f97316;
  }
  .chat-input-area button {
    background: #f97316;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  .chat-input-area button:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
  }

  /* PEOPLE TAB */
  .people-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  .person-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 10px;
  }
  .person-row:hover {
    background: #f9fafb;
  }
  .person-row img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .person-row div {
    flex: 1;
  }
  .person-row strong {
    display: block;
    font-size: 0.9rem;
  }
  .person-row small {
    color: #6b7280;
    font-size: 0.75rem;
  }
  .muted {
    opacity: 0.5;
  }

  /* FILES TAB */
  .files-list {
    padding: 20px;
  }
  .info-note {
    font-size: 0.85rem;
    color: #9ca3af;
    text-align: center;
    margin-bottom: 20px;
  }
  .file-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 10px;
  }
  .f-icon {
    font-size: 1.5rem;
  }
  .f-info {
    flex: 1;
  }
  .f-info strong {
    display: block;
    font-size: 0.9rem;
  }
  .f-info small {
    color: #6b7280;
    font-size: 0.75rem;
  }
  .btn-dl {
    border: none;
    background: #f3f4f6;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
  }
  .btn-dl:hover {
    background: #f97316;
    color: white;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .classroom-layout {
      flex-direction: column;
      height: 100vh;
      overflow-y: auto;
    }
    :global(body) {
      overflow: auto;
    }
    .stream-area {
      height: 60vh;
    }
    .sidebar {
      width: 100%;
      height: 40vh;
      border-left: none;
      border-top: 1px solid #e5e7eb;
    }
  }
</style>
