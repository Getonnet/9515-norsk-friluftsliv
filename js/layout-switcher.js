const button = document.querySelector(".layout-switcher");
const dropdown = document.getElementById("viewDropdown");

function toggleDropdown() {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", !isExpanded);
  button.classList.toggle("active");
  dropdown.classList.toggle("show");
}

button.addEventListener("click", toggleDropdown);

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    button.classList.remove("active");
    dropdown.classList.remove("show");
    button.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function showDiv(divNumber) {
    // Hide all divs
    document.querySelectorAll(".content-div").forEach((div) => {
      div.style.display = "none";
    });
    // Show the selected div based on ID
    document.getElementById(`div-${divNumber}`).style.display = "block";
  }

  // Assign the function to window scope so inline `onclick` works
  window.showDiv = showDiv;
});
