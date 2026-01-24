<script>
  // --- 1. LOGIC KALENDER REALTIME ---
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const currDate = date.getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currMonth];

  // Format Header Hari Ini (contoh: "TODAY, 24 JAN")
  const todayLabel = `TODAY, ${currDate} ${currentMonthName.substring(0, 3).toUpperCase()}`;

  // Generate Array Tanggal
  let calendarDays = [];

  // Cari hari pertama bulan ini (0 = Minggu, 1 = Senin, dst)
  const firstDayIndex = new Date(currYear, currMonth, 1).getDay();
  // Cari jumlah hari bulan ini
  const lastDay = new Date(currYear, currMonth + 1, 0).getDate();
  // Cari tanggal terakhir bulan lalu
  const prevLastDay = new Date(currYear, currMonth, 0).getDate();

  // 1. Isi tanggal bulan lalu (Mute)
  for (let i = firstDayIndex; i > 0; i--) {
    calendarDays.push({ num: prevLastDay - i + 1, type: "mute" });
  }

  // 2. Isi tanggal bulan ini
  for (let i = 1; i <= lastDay; i++) {
    // Cek apakah ini hari ini?
    const isToday = i === currDate;
    calendarDays.push({ num: i, type: isToday ? "active" : "normal" });
  }

  // 3. Isi tanggal bulan depan (Mute) - Biar kotak grid penuh (total 42 kotak / 6 baris)
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ num: i, type: "mute" });
  }

  // --- 2. DATA JADWAL (DUMMY) ---
  const todayClasses = [
    {
      id: 1,
      time: "08:00 - 09:30",
      mapel: "Visual Design Principle",
      mentor: "Padhang Satrio",
      status: "Live Now",
      link: "Zoom",
    },
    {
      id: 2,
      time: "10:00 - 11:30",
      mapel: "User Experience Research",
      mentor: "Zakir Horizontal",
      status: "Upcoming",
      link: null,
    },
  ];

  const nextDays = [
    {
      day: "Tomorrow",
      classes: [
        { time: "09:00", mapel: "Front-End Fundamental", color: "blue" },
        { time: "13:00", mapel: "Branding Identity", color: "purple" },
      ],
    },
    {
      day: "Next Day",
      classes: [{ time: "08:00", mapel: "React JS Advanced", color: "orange" }],
    },
  ];
</script>

<div class="schedule-container">
  <div class="main-schedule">
    <div class="header-section">
      <div>
        <h1>Schedule 📅</h1>
        <p>Don't miss your class today!</p>
      </div>
      <button class="btn-download">Download PDF 📥</button>
    </div>

    <div class="label-day">{todayLabel}</div>

    <div class="today-list">
      {#each todayClasses as c}
        <div class="class-card {c.status === 'Live Now' ? 'live' : ''}">
          <div class="time-col">
            <span class="time">{c.time}</span>
            {#if c.status === "Live Now"}
              <span class="badge-live">● LIVE</span>
            {/if}
          </div>

          <div class="info-col">
            <h3>{c.mapel}</h3>
            <div class="mentor">
              <img src="https://ui-avatars.com/api/?name={c.mentor}" alt="m" />
              <span>{c.mentor}</span>
            </div>
          </div>

          <div class="action-col">
            {#if c.status === "Live Now"}
              <a href="/class/{c.id}" class="btn-join active"> Join Class ➔ </a>
            {:else}
              <button class="btn-join disabled" disabled> Wait... </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#each nextDays as d}
      <div class="label-day">{d.day}</div>
      <div class="upcoming-list">
        {#each d.classes as c}
          <div class="mini-card">
            <div class="stripe {c.color}"></div>
            <strong>{c.time}</strong>
            <span>{c.mapel}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <div class="side-widgets">
    <div class="widget calendar-widget">
      <h3>{currentMonthName} {currYear}</h3>

      <div class="cal-grid">
        <span class="head">S</span>
        <span class="head">M</span>
        <span class="head">T</span>
        <span class="head">W</span>
        <span class="head">T</span>
        <span class="head">F</span>
        <span class="head">S</span>

        {#each calendarDays as day}
          <span class={day.type}>
            {day.num}
          </span>
        {/each}
      </div>
    </div>

    <div class="widget exam-widget">
      <div class="bell-icon">🔔</div>
      <div>
        <h4>Mid-Term Exam</h4>
        <p>Prepare yourself!</p>
        <div class="timer">02 Days : 14 Hours Left</div>
      </div>
    </div>
  </div>
</div>

<style>
  .schedule-container {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media (max-width: 900px) {
    .schedule-container {
      grid-template-columns: 1fr;
    }
  }

  /* HEADER */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
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
  .btn-download {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    color: #374151;
    transition: 0.2s;
  }
  .btn-download:hover {
    border-color: #f97316;
    color: #f97316;
  }

  .label-day {
    font-size: 0.85rem;
    font-weight: 700;
    color: #9ca3af;
    margin: 25px 0 15px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* CLASS CARD (TODAY) */
  .today-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .class-card {
    background: white;
    border-radius: 20px;
    padding: 25px;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 1px solid #f3f4f6;
    transition: 0.3s;
  }
  .class-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
  .class-card.live {
    border: 2px solid #f97316;
    background: #fff7ed;
  }

  .time-col {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 100px;
  }
  .time {
    font-weight: 700;
    font-size: 1.1rem;
    color: #1f2937;
  }
  .badge-live {
    background: #ef4444;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    display: inline-block;
    width: fit-content;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .info-col {
    flex: 1;
  }
  .info-col h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    color: #111827;
  }
  .mentor {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #6b7280;
  }
  .mentor img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .btn-join {
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;

    /* Tambahan agar Link <a> terlihat seperti tombol */
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: 0.2s;
  }

  /* Style active dan disabled tetap sama */
  .btn-join.active {
    background: #f97316;
    color: white;
    box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3);
  }
  .btn-join.active:hover {
    transform: translateY(-2px); /* Efek hover */
  }
  .btn-join.disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }

  /* MINI CARDS (UPCOMING) */
  .upcoming-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  .mini-card {
    background: white;
    padding: 15px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid #f3f4f6;
  }
  .stripe {
    width: 4px;
    height: 40px;
    border-radius: 4px;
  }
  .stripe.blue {
    background: #3b82f6;
  }
  .stripe.purple {
    background: #8b5cf6;
  }
  .stripe.orange {
    background: #f97316;
  }

  .mini-card strong {
    color: #1f2937;
  }
  .mini-card span {
    font-size: 0.9rem;
    color: #6b7280;
  }

  /* SIDEBAR WIDGETS */
  .side-widgets {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .widget {
    background: white;
    padding: 25px;
    border-radius: 25px;
    border: 1px solid #f3f4f6;
  }

  /* --- FIX KALENDER --- */
  .calendar-widget h3 {
    margin: 0 0 20px 0;
    text-align: center;
    font-size: 1.1rem;
    color: #1f2937;
  }

  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .cal-grid span {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 8px;
    cursor: pointer;
    color: #374151;
  }
  .cal-grid span:hover {
    background: #f3f4f6;
  }

  .cal-grid .head {
    color: #9ca3af;
    font-size: 0.75rem;
    cursor: default;
    padding-bottom: 5px;
  }
  .cal-grid .head:hover {
    background: none;
  }

  /* Class dinamis dari JS */
  .cal-grid .mute {
    color: #e5e7eb;
    pointer-events: none;
  }
  .cal-grid .active {
    background: #f97316;
    color: white !important;
    box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);
  }

  .exam-widget {
    background: #1f2937;
    color: white;
    display: flex;
    gap: 15px;
    align-items: center;
    border: none;
  }
  .bell-icon {
    font-size: 2rem;
    background: rgba(255, 255, 255, 0.1);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .exam-widget h4 {
    margin: 0;
    font-size: 1.1rem;
    color: #f97316;
  }
  .exam-widget p {
    margin: 5px 0 10px 0;
    font-size: 0.85rem;
    opacity: 0.8;
  }
  .timer {
    font-family: monospace;
    font-size: 0.85rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 6px;
    display: inline-block;
  }
</style>
