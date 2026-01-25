<script>
  import { onMount } from "svelte";

  const words = ["Web Development", "UI/UX", "Animation", "Videography", "Frontend Development", "Backend Development"];
  let currentText = "";
  let wordIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      currentText = currentWord.substring(0, currentText.length - 1);
      typingSpeed = 50;
    } else {
      currentText = currentWord.substring(0, currentText.length + 1);
      typingSpeed = 150;
    }

    if (!isDeleting && currentText === currentWord) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }
    setTimeout(typeEffect, typingSpeed);
  }

  onMount(() => {
    typeEffect();
  });
</script>

<header class="hero">
  <div class="container hero-grid">
    <div class="hero-text">
      <div class="badge-pill">🚀 #1 Learning Platform in Indonesia</div>
      <h1>
        Mau Belajar <br />
        <span class="highlight">
          {currentText}<span class="cursor">|</span>
        </span>
        <br />
        Jadi Lebih Mudah.
      </h1>
      <p>Ini waktunya untuk mulai belajar, naikin level, dan jadi lebih siap untuk masa depan.</p>
      <div class="hero-btns">
        <a href="/login" class="btn-primary">Mulai Belajar Sekarang</a>
        <button class="btn-secondary"><span class="play-icon">▶</span> Tonton Demo</button>
      </div>
      <!-- <div class="trust-proof">
        <div class="avatar-group">
          <img src="https://ui-avatars.com/api/?name=A&background=random" alt="u" />
          <img src="https://ui-avatars.com/api/?name=B&background=random" alt="u" />
          <img src="https://ui-avatars.com/api/?name=C&background=random" alt="u" />
        </div>
        <div class="trust-text">
          <strong>1000+ Siswa</strong> <br />telah bergabung minggu ini.
        </div>
      </div> -->
    </div>

    <div class="hero-image">
      <img src="/foto it.jpg" alt="Student" class="main-img" />
      <div class="float-card card-1">
        <div class="icon-box">🎨</div>
        <div>
          <strong>UI Design</strong>
          <div class="progress-bar"><div class="fill" style="width: 80%"></div></div>
        </div>
      </div>
      <div class="float-card card-2">
        <div class="check-icon">✓</div>
        <div><strong>Course Completed!</strong><small></small></div>
      </div>
    </div>
  </div>
</header>
