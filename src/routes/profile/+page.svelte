<script>
  import { user } from '$lib/stores'; // Import Store
  
  let activeTab = 'Edit Profile';
  const tabs = ['Edit Profile', 'Password', 'Notifications'];
  
  let fileInput; // Untuk referensi input file

  // Fungsi Ganti Foto
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update data di Store (otomatis berubah di sidebar/dashboard)
        $user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Fungsi Save (Cuma alert simulasi)
  function saveProfile() {
    alert("Profil berhasil diperbarui! Cek Sidebar, fotomu pasti ganti.");
  }
</script>

<div class="profile-container">

  <div class="profile-header">
    <div class="cover-image"></div>
    <div class="header-content">
      <div class="avatar-wrapper">
        <img src={$user.avatar} alt="avatar">
        
        <button class="btn-cam" on:click={() => fileInput.click()}>📷</button>
        <input 
          type="file" 
          accept="image/*" 
          bind:this={fileInput} 
          on:change={handlePhotoChange} 
          style="display: none;" 
        />
      </div>
      
      <div class="user-meta">
        <h1>{$user.name} <span class="badge">PRO</span></h1>
        <p>{$user.role} • {$user.location}</p>
      </div>
      <div class="header-actions">
        <button class="btn-share">Share</button>
        <button class="btn-save" on:click={saveProfile}>Save Changes</button>
      </div>
    </div>
  </div>

  <div class="profile-grid">
    <div class="left-menu">
      {#each tabs as tab}
        <button 
          class="menu-item {activeTab === tab ? 'active' : ''}" 
          on:click={() => activeTab = tab}>
          <span class="indicator"></span> {tab}
        </button>
      {/each}
      
      <div class="stats-box">
        <div class="stat"><strong>12</strong><span>Courses</span></div>
        <div class="stat"><strong>98</strong><span>Points</span></div>
      </div>
    </div>

    <div class="right-content">
      {#if activeTab === 'Edit Profile'}
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="input-row">
            <div class="input-group">
              <label>Full Name</label>
              <input type="text" bind:value={$user.name}>
            </div>
            <div class="input-group">
              <label>Role</label>
              <input type="text" bind:value={$user.role}>
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label>Email</label>
              <input type="email" bind:value={$user.email}>
            </div>
            <div class="input-group">
              <label>Phone</label>
              <input type="tel" bind:value={$user.phone}>
            </div>
          </div>
          <div class="input-group">
            <label>Bio</label>
            <textarea rows="4" bind:value={$user.bio}></textarea>
          </div>
          <div class="input-group">
            <label>Location</label>
            <input type="text" bind:value={$user.location}>
          </div>
        </div>
      {:else}
        <div class="form-section">
          <h3>Security & Notif</h3>
          <p style="color:#666">Fitur ini demo visual saja.</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* CSS SAMA PERSIS SEPERTI YANG TERAKHIR KITA BUAT (Copy Paste dari response sebelumnya) */
  /* Saya ringkas di sini biar gak kepanjangan, pakai CSS profile terakhir kamu */
  :global(body) { background-color: #FFF7ED; background-image: radial-gradient(at 0% 0%, rgba(255, 166, 0, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(255, 255, 255, 0.8) 0px, transparent 50%); background-attachment: fixed; }
  .profile-container { max-width: 1000px; margin: 20px auto 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 20px 50px rgba(249, 115, 22, 0.05); }
  .profile-header { background: white; border-radius: 20px; overflow: hidden; margin-bottom: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.03); }
  .cover-image { height: 160px; background: linear-gradient(120deg, #F97316, #FDA4AF); width: 100%; position: relative; }
  .header-content { padding: 0 30px 30px 30px; display: flex; align-items: flex-end; gap: 25px; margin-top: -60px; position: relative; }
  .avatar-wrapper img { width: 120px; height: 120px; border-radius: 50%; border: 5px solid white; background: white; object-fit: cover; }
  .avatar-wrapper { position: relative; }
  .btn-cam { position: absolute; bottom: 10px; right: 0; background: #1F2937; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; border: 3px solid white; display: grid; place-items: center; }
  .user-meta { flex: 1; margin-bottom: 5px; }
  .user-meta h1 { margin: 0; font-size: 1.8rem; color: #111827; display: flex; align-items: center; gap: 10px; }
  .badge { font-size: 0.7rem; background: #FFF7ED; color: #F97316; padding: 4px 8px; border-radius: 6px; border: 1px solid #FED7AA; }
  .user-meta p { margin: 5px 0 0 0; color: #6B7280; font-weight: 500; }
  .header-actions { display: flex; gap: 10px; margin-bottom: 10px; }
  .btn-save { background: #1F2937; border: none; padding: 10px 20px; border-radius: 50px; font-weight: 600; cursor: pointer; color: white; transition: 0.2s; }
  .btn-save:hover { background: #F97316; }
  .btn-share { background: white; border: 1px solid #E5E7EB; padding: 10px 20px; border-radius: 50px; font-weight: 600; color: #374151; cursor: pointer; }
  .profile-grid { display: grid; grid-template-columns: 260px 1fr; gap: 30px; }
  @media (max-width: 800px) { .profile-grid { grid-template-columns: 1fr; } }
  .left-menu { display: flex; flex-direction: column; gap: 10px; }
  .menu-item { text-align: left; background: rgba(255,255,255,0.6); padding: 15px 20px; border-radius: 12px; font-weight: 600; color: #6B7280; cursor: pointer; display: flex; align-items: center; gap: 10px; border: 1px solid transparent; transition: 0.2s; }
  .menu-item.active { background: white; color: #F97316; border-color: #FED7AA; }
  .indicator { width: 6px; height: 6px; border-radius: 50%; background: transparent; } .menu-item.active .indicator { background: #F97316; }
  .stats-box { background: linear-gradient(135deg, #1F2937, #000); border-radius: 16px; padding: 25px; display: flex; margin-top: 10px; color: white; justify-content: space-between; }
  .stat { text-align: center; flex: 1; } .stat strong { display: block; font-size: 1.4rem; color: #F97316; } .stat span { font-size: 0.75rem; opacity: 0.7; }
  .right-content { background: white; border-radius: 20px; padding: 30px; }
  h3 { margin: 0 0 25px 0; font-size: 1.2rem; border-bottom: 1px solid #F3F4F6; padding-bottom: 15px; }
  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .input-group { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
  .input-group label { font-size: 0.85rem; font-weight: 700; color: #374151; text-transform: uppercase; }
  .input-group input, .input-group textarea { padding: 12px; border: 1px solid #E5E7EB; border-radius: 10px; font-size: 0.95rem; background: #F9FAFB; }
  .input-group input:focus, .input-group textarea:focus { outline: none; border-color: #F97316; background: white; }
</style>