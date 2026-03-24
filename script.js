document.addEventListener("DOMContentLoaded", () => {
  const timelineButtons = document.querySelectorAll(".timeline-btn");
  const timelinePanels = document.querySelectorAll(".timeline-panel");

  timelineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const year = button.dataset.year;

      timelineButtons.forEach((btn) => btn.classList.remove("active"));
      timelinePanels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");

      const activePanel = document.getElementById(`year-${year}`);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
});