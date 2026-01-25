<script>
  import { fade, scale } from "svelte/transition";

  const categories = [
    {
      name: "IT Academy (COMING SOON)",
      count: "10+ Kelas",
      icon: "💻",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
      description: "From user to developer. Belajar IT lewat pemahaman logika, fokus sistem, sampai implementasi praktik nyata!",
      topics: ["Web Development", "Basic Frontend & Backend", "System Design", "Database Management", "Fullstack Roadmap"],
    },
    {
      name: "Skill Set Academy (COMING Very SOON)",
      count: "8+ Kelas",
      icon: "🎨",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
      description: "Ini giliranmu untuk mulai explore berbagai skill kreatif digital yang relevan dengan perkembangan zaman.",
      topics: ["Tutorial Blender 3D", "UI/UX Class", "Videography", "Video Editing", "Digital Illustration"],
    },
    {
      name: "Freelance Academy (COMING SOON)",
      count: "15+ Kelas",
      icon: "📢",
      img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
      description: "Ubah skill jadi sumber penghasilan! Ini saatnya belajar jadi freelancer bersama para expert di berbagai bidang.",
      topics: ["Building Portfolio", "Client Negotiation", "Personal Branding", "Networking Strategy", "Contract & Invoicing"],
    },
  ];

  let selectedCategory = null;

  function openModal(cat) {
    selectedCategory = cat;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    selectedCategory = null;
    document.body.style.overflow = "auto";
  }
</script>

<section class="categories" id="categories">
  <div class="container">
    <div class="section-head">
      <h2>Our Class</h2>
      <p>Temukan passion barumu dan mulai belajar hari ini.</p>
    </div>

    <div class="cat-grid">
      {#each categories as cat}
        <button type="button" class="cat-card" on:click={() => openModal(cat)}>
          <div class="cat-bg" style="background-image: url('{cat.img}')"></div>
          <div class="cat-overlay"></div>

          <div class="cat-content">
            <div class="cat-icon-box">{cat.icon}</div>
            <div class="cat-text">
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </div>
            <div class="cat-arrow">➔</div>
          </div>
        </button>
      {/each}
    </div>

    <div class="center-btn">
      <a href="/login" class="btn-outline">Lihat Semua Kategori</a>
    </div>
  </div>

  {#if selectedCategory}
    <div class="modal-backdrop" on:click={closeModal} transition:fade={{ duration: 200 }}>
      <div class="modal-content" on:click|stopPropagation transition:scale={{ duration: 300, start: 0.9 }}>
        <button class="close-btn" on:click={closeModal}>✕</button>

        <div class="modal-header" style="background-image: url('{selectedCategory.img}')">
          <div class="modal-header-overlay"></div>
          <div class="modal-icon">{selectedCategory.icon}</div>
          <h3>{selectedCategory.name}</h3>
        </div>

        <div class="modal-body">
          <p class="modal-desc">{selectedCategory.description}</p>
          <div class="modal-topics">
            <h4>Apa yang akan dipelajari:</h4>
            <ul>
              {#each selectedCategory.topics as topic}
                <li><span>✓</span> {topic}</li>
              {/each}
            </ul>
          </div>
          <a href="/login" class="btn-modal-action">Daftar Kelas Ini Sekarang</a>
        </div>
      </div>
    </div>
  {/if}
</section>
