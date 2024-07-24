document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".container .image img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      // Create modal dynamically
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage" />
        <div id="caption"></div>
      `;

      // Append modal to the body
      document.body.appendChild(modal);

      // Get modal elements
      const modalImg = document.getElementById("modalImage");
      const captionText = document.getElementById("caption");
      const closeBtn = modal.querySelector(".close");

      const container = img.closest(".container");
      const title = container.querySelector(".title").innerText;

      modal.style.display = "flex"; // Show the modal
      setTimeout(() => modal.classList.add("show"), 10);
      modalImg.src = img.src;
      captionText.innerHTML = title;

      // Close functionality
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        setTimeout(() => document.body.removeChild(modal), 300);
      });

      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.classList.remove("show");
          setTimeout(() => document.body.removeChild(modal), 300);
        }
      });
    });

    img.addEventListener("contextmenu", (event) => {
      event.preventDefault(); // Prevent right-click menu
    });
  });
});


