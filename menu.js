document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!menuBtn || !sidebar || !overlay) return;

  function openSidebar() {
    if (window.innerWidth <= 992) {
      sidebar.classList.add("open");
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", function () {
    if (window.innerWidth <= 992) {
      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  });

  overlay.addEventListener("click", closeSidebar);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      closeSidebar();
    }
  });

});