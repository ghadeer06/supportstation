function getClient() {
  return window.supabase.createClient(
    'https://mcxdjisoyqdnyieboqpy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGRqaXNveXFkbnlpZWJvcXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDI3NDAsImV4cCI6MjA5MDk3ODc0MH0.kIwJ1pc-GLX1lTvstLSDZ5Li1rd9vwutI4-Wz_HR6nE'
  );
}

const supabase = getClient();

/* ============================
   1) إحصائيات عامة
============================ */
async function loadCounts() {
  const { data: reports } = await supabase.from("reports").select("*");
  const { data: tasks } = await supabase.from("tasks").select("*");
  const { data: notifications } = await supabase.from("notifications").select("*").eq("seen", 0);

  document.getElementById("countReports").textContent = reports?.length || 0;
  document.getElementById("countTasks").textContent = tasks?.length || 0;
  document.getElementById("countNotifications").textContent = notifications?.length || 0;
}

/* ============================
   2) أحدث البلاغات
============================ */
async function loadLatestReports() {
  const box = document.getElementById("latestReports");

  const { data } = await supabase
    .from("reports")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (!data || data.length === 0) {
    box.innerHTML = `<p class="empty-text">لا توجد بلاغات</p>`;
    return;
  }

  box.innerHTML = data.map(r => `
    <div class="report-card">
      <div class="report-head">
        <h3>بلاغ #${r.id}</h3>
        <span class="status-tag">${r.status}</span>
      </div>
      <p><b>الوصف:</b> ${r.description}</p>
      <p><b>الموقع:</b> ${r.location}</p>
    </div>
  `).join("");
}

/* ============================
   3) أحدث الإشعارات
============================ */
async function loadLatestNotifications() {
  const box = document.getElementById("latestNotifications");

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (!data || data.length === 0) {
    box.innerHTML = `<p class="empty-text">لا توجد إشعارات</p>`;
    return;
  }

  box.innerHTML = data.map(n => `
    <div class="alert-item">
      <strong>${n.title}</strong>
      <p>${n.message}</p>
    </div>
  `).join("");
}

/* ============================
   4) أحدث المهام
============================ */
async function loadLatestTasks() {
  const box = document.getElementById("latestTasks");

  const { data } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: false })
    .limit(3);

  if (!data || data.length === 0) {
    box.innerHTML = `<p class="empty-text">لا توجد مهام</p>`;
    return;
  }

  box.innerHTML = data.map(t => `
    <div class="alert-item">
      <strong>${t.title}</strong>
      <p>${t.details}</p>
    </div>
  `).join("");
}

/* تشغيل */
loadCounts();
loadLatestReports();
loadLatestNotifications();
loadLatestTasks();
