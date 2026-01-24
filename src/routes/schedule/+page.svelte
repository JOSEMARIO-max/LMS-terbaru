<script>
  // Data Jadwal
  const todayClasses = [
    { time: "08:00 - 09:30", mapel: "Visual Design Principle", mentor: "Padhang Satrio", status: "Live Now", link: "Zoom" },
    { time: "10:00 - 11:30", mapel: "User Experience Research", mentor: "Zakir Horizontal", status: "Upcoming", link: null },
  ];

  const nextDays = [
    { day: "Tomorrow, 20 Jan", classes: [
      { time: "09:00", mapel: "Front-End Fundamental", color: "blue" },
      { time: "13:00", mapel: "Branding Identity", color: "purple" }
    ]},
    { day: "Wed, 21 Jan", classes: [
      { time: "08:00", mapel: "React JS Advanced", color: "orange" }
    ]}
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

    <div class="label-day">TODAY, 19 JAN</div>
    <div class="today-list">
      {#each todayClasses as c}
        <div class="class-card {c.status === 'Live Now' ? 'live' : ''}">
          <div class="time-col">
            <span class="time">{c.time}</span>
            {#if c.status === 'Live Now'}
              <span class="badge-live">● LIVE</span>
            {/if}
          </div>
          
          <div class="info-col">
            <h3>{c.mapel}</h3>
            <div class="mentor">
              <img src="https://ui-avatars.com/api/?name={c.mentor}" alt="m">
              <span>{c.mentor}</span>
            </div>
          </div>

          <div class="action-col">
            <button class="btn-join {c.status === 'Live Now' ? 'active' : 'disabled'}">
              {c.status === 'Live Now' ? 'Join Class ➔' : 'Wait...'}
            </button>
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
      <h3>January 2026</h3>
      <div class="cal-grid">
        <span class="head">S</span><span class="head">M</span><span class="head">T</span><span class="head">W</span><span class="head">T</span><span class="head">F</span><span class="head">S</span>
        
        <span class="mute">29</span><span class="mute">30</span><span class="mute">31</span>
        <span>1</span><span>2</span><span>3</span><span>4</span>
        <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
        <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
        <span class="active">19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
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
  .schedule-container { display: grid; grid-template-columns: 1fr 300px; gap: 40px; max-width: 1200px; margin: 0 auto; }
  @media (max-width: 900px) { .schedule-container { grid-template-columns: 1fr; } }

  /* HEADER */
  .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
  h1 { margin: 0; font-size: 1.8rem; color: #111827; }
  p { margin: 5px 0 0 0; color: #6B7280; }
  .btn-download { background: white; border: 1px solid #E5E7EB; padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; color: #374151; transition: 0.2s; }
  .btn-download:hover { border-color: #F97316; color: #F97316; }

  .label-day { font-size: 0.85rem; font-weight: 700; color: #9CA3AF; margin: 25px 0 15px 0; letter-spacing: 1px; }

  /* CLASS CARD (TODAY) */
  .today-list { display: flex; flex-direction: column; gap: 15px; }
  
  .class-card { background: white; border-radius: 20px; padding: 25px; display: flex; align-items: center; gap: 20px; border: 1px solid #F3F4F6; transition: 0.3s; }
  .class-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
  .class-card.live { border: 2px solid #F97316; background: #FFF7ED; }

  .time-col { display: flex; flex-direction: column; gap: 5px; min-width: 100px; }
  .time { font-weight: 700; font-size: 1.1rem; color: #1F2937; }
  .badge-live { background: #EF4444; color: white; padding: 4px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; display: inline-block; width: fit-content; animation: pulse 2s infinite; }
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }

  .info-col { flex: 1; }
  .info-col h3 { margin: 0 0 10px 0; font-size: 1.2rem; color: #111827; }
  .mentor { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #6B7280; }
  .mentor img { width: 24px; height: 24px; border-radius: 50%; }

  .btn-join { border: none; padding: 12px 20px; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 0.9rem; }
  .btn-join.active { background: #F97316; color: white; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3); }
  .btn-join.disabled { background: #F3F4F6; color: #9CA3AF; cursor: not-allowed; }

  /* MINI CARDS (UPCOMING) */
  .upcoming-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
  .mini-card { background: white; padding: 15px; border-radius: 15px; display: flex; align-items: center; gap: 15px; border: 1px solid #F3F4F6; }
  .stripe { width: 4px; height: 40px; border-radius: 4px; }
  .stripe.blue { background: #3B82F6; } .stripe.purple { background: #8B5CF6; } .stripe.orange { background: #F97316; }
  
  .mini-card strong { color: #1F2937; }
  .mini-card span { font-size: 0.9rem; color: #6B7280; }

  /* SIDEBAR WIDGETS */
  .side-widgets { display: flex; flex-direction: column; gap: 30px; }
  
  .widget { background: white; padding: 25px; border-radius: 25px; border: 1px solid #F3F4F6; }
  
  /* --- FIX KALENDER --- */
  .calendar-widget h3 { margin: 0 0 20px 0; text-align: center; font-size: 1.1rem; }
  
  .cal-grid { 
    display: grid; 
    grid-template-columns: repeat(7, 1fr); 
    gap: 5px; /* JARAK DIRAPATKAN DARI 10px JADI 5px */
    text-align: center; 
    font-size: 0.85rem; 
    font-weight: 600; 
  }
  
  .cal-grid span { 
    aspect-ratio: 1; /* Biar kotak sempurna */
    display: grid; place-items: center;
    border-radius: 8px; cursor: pointer; 
    padding: 0; /* Padding dihapus, diganti aspect-ratio biar pas */
  }
  .cal-grid span:hover { background: #F3F4F6; }
  .cal-grid .head { color: #9CA3AF; font-size: 0.75rem; cursor: default; }
  .cal-grid .head:hover { background: none; }
  .cal-grid .mute { color: #D1D5DB; }
  .cal-grid .active { background: #F97316; color: white; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3); }

  .exam-widget { background: #1F2937; color: white; display: flex; gap: 15px; align-items: center; border: none; }
  .bell-icon { font-size: 2rem; background: rgba(255,255,255,0.1); width: 60px; height: 60px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; }
  .exam-widget h4 { margin: 0; font-size: 1.1rem; color: #F97316; }
  .exam-widget p { margin: 5px 0 10px 0; font-size: 0.85rem; opacity: 0.8; }
  .timer { font-family: monospace; font-size: 0.85rem; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 6px; display: inline-block; }
</style>