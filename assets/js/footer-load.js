// Footer loader — injects footer.html into <div id="footer"> and stamps the
// current year. The markup is added with innerHTML, which never executes an
// inline <script>, so the year has to be set from out here.

(function () {
  function loadFooter() {
    const mount = document.getElementById("footer");
    if (!mount) return;

    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        mount.innerHTML = html;

        const year = mount.querySelector("#footerYear");
        if (year) year.textContent = new Date().getFullYear();
      })
      .catch(err => console.error("Footer failed to load:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFooter);
  } else {
    loadFooter();
  }
})();
