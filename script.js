document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Timeline für ueber-uns.html
  ========================= */
  const timelineButtons = document.querySelectorAll(".timeline-btn");
  const timelinePanels = document.querySelectorAll(".timeline-panel");

  if (timelineButtons.length && timelinePanels.length) {
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
  }

  /* =========================
     Gruppen-Lightbox für galerie.html
  ========================= */
  const galleryGroups = {
    "vorher-nachher-1": [
      "Bilder/Vorher-Nachher/Vorher-Nachher1/vorher-nachher1-1.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher1/vorher-nachher1-2.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher1/vorher-nachher1-3.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher1/vorher-nachher1-4.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher1/vorher-nachher1-5.jpg"
    ],
    "vorher-nachher-2": [
      "Bilder/Vorher-Nachher/Vorher-Nachher2/vorher-nachher2-1.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher2/vorher-nachher2-2.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher2/vorher-nachher2-3.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher2/vorher-nachher2-4.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher2/vorher-nachher2-5.jpg"
    ],
    "vorher-nachher-3": [
      "Bilder/Vorher-Nachher/Vorher-Nachher3/vorher-nachher3-1.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher3/vorher-nachher3-2.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher3/vorher-nachher3-3.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher3/vorher-nachher3-4.jpg",
      "Bilder/Vorher-Nachher/Vorher-Nachher3/vorher-nachher3-5.jpg"
    ],
    "objekt-1": [
      "Bilder/Objekte/Objekt1/objekt1-1.jpg",
      "Bilder/Objekte/Objekt1/objekt1-2.jpg",
      "Bilder/Objekte/Objekt1/objekt1-3.jpg",
      "Bilder/Objekte/Objekt1/objekt1-4.jpg",
      "Bilder/Objekte/Objekt1/objekt1-5.jpg"
    ],
    "objekt-2": [
      "Bilder/Objekte/Objekt2/objekt2-1.jpg",
      "Bilder/Objekte/Objekt2/objekt2-2.jpg",
      "Bilder/Objekte/Objekt2/objekt2-3.jpg",
      "Bilder/Objekte/Objekt2/objekt2-4.jpg",
      "Bilder/Objekte/Objekt2/objekt2-5.jpg"
    ],
    "objekt-3": [
      "Bilder/Objekte/Objekt3/objekt3-1.jpg",
      "Bilder/Objekte/Objekt3/objekt3-2.jpg",
      "Bilder/Objekte/Objekt3/objekt3-3.jpg",
      "Bilder/Objekte/Objekt3/objekt3-4.jpg",
      "Bilder/Objekte/Objekt3/objekt3-5.jpg"
    ]
  };

  const groupCards = document.querySelectorAll(".gallery-group-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  let currentGroup = [];
  let currentGroupName = "";
  let currentImageIndex = 0;

  function showGroupImage(index) {
    if (!lightboxImg || !currentGroup.length) return;

    lightboxImg.src = currentGroup[index];
    lightboxImg.alt = `${currentGroupName} Bild ${index + 1}`;
    currentImageIndex = index;
  }

  if (
    groupCards.length &&
    lightbox &&
    lightboxImg &&
    lightboxClose &&
    lightboxPrev &&
    lightboxNext
  ) {
    groupCards.forEach((card) => {
      card.addEventListener("click", () => {
        const groupName = card.dataset.group;
        const images = galleryGroups[groupName];

        if (!images || !images.length) return;

        currentGroup = images;
        currentGroupName = groupName;
        showGroupImage(0);
        lightbox.classList.add("active");
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });

    lightboxPrev.addEventListener("click", () => {
      if (!currentGroup.length) return;
      const previousIndex =
        currentImageIndex === 0 ? currentGroup.length - 1 : currentImageIndex - 1;
      showGroupImage(previousIndex);
    });

    lightboxNext.addEventListener("click", () => {
      if (!currentGroup.length) return;
      const nextIndex =
        currentImageIndex === currentGroup.length - 1 ? 0 : currentImageIndex + 1;
      showGroupImage(nextIndex);
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("active")) return;

      if (event.key === "Escape") {
        lightbox.classList.remove("active");
      }

      if (event.key === "ArrowLeft") {
        if (!currentGroup.length) return;
        const previousIndex =
          currentImageIndex === 0 ? currentGroup.length - 1 : currentImageIndex - 1;
        showGroupImage(previousIndex);
      }

      if (event.key === "ArrowRight") {
        if (!currentGroup.length) return;
        const nextIndex =
          currentImageIndex === currentGroup.length - 1 ? 0 : currentImageIndex + 1;
        showGroupImage(nextIndex);
      }
    });
  }

  /* =========================
     Kontaktformular + E-Mail-Validierung + Popup
  ========================= */
  const contactForm = document.getElementById("contact-form");
  const successPopup = document.getElementById("success-popup");
  const popupCloseBtn = document.getElementById("popup-close-btn");
  const emailInput = document.getElementById("email");

  if (emailInput) {
    emailInput.addEventListener("invalid", () => {
      if (emailInput.validity.valueMissing) {
        emailInput.setCustomValidity("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      } else if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
        emailInput.setCustomValidity("Dies ist keine gültige E-Mail-Adresse.");
      } else {
        emailInput.setCustomValidity("");
      }
    });

    emailInput.addEventListener("input", () => {
      emailInput.setCustomValidity("");
    });
  }

  if (contactForm && successPopup && popupCloseBtn) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      successPopup.classList.add("active");
      contactForm.reset();
    });

    popupCloseBtn.addEventListener("click", () => {
      successPopup.classList.remove("active");
    });

    successPopup.addEventListener("click", (event) => {
      if (event.target === successPopup) {
        successPopup.classList.remove("active");
      }
    });
  }
});