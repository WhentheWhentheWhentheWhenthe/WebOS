// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Assign the `startDragging` function to the draggable element's `onmousedown` event.
  // This allows you to drag the window by holding down anywhere on the window.
  element.onmousedown = startDragging;

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Get current position and remove transform for dragging
    var rect = element.getBoundingClientRect();
    element.style.top = rect.top + 'px';
    element.style.left = rect.left + 'px';
    element.style.transform = 'none';
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Wait until the DOM is ready before wiring up the UI.
document.addEventListener("DOMContentLoaded", function () {
  const welcome = document.getElementById("welcome");
  if (welcome) {
    dragElement(welcome);
  }

  const welcomeClose = document.getElementById("welcomeclose");
  if (welcomeClose && welcome) {
    welcomeClose.addEventListener("click", function () {
      welcome.style.display = "none";
    });
  }

  // Cat image window: open on icon click, close on its close button
  const catWindow = document.getElementById("catimg");
  const catIcon = document.getElementById("catIcon");
  const catClose = document.getElementById("catimgclose");

  if (catIcon && catWindow) {
    catIcon.addEventListener("click", () => {
      catWindow.style.display = "block";
    });
  }

  if (catClose && catWindow) {
    catClose.addEventListener("click", () => {
      catWindow.style.display = "none";
    });
  }

  if (catWindow) {
    // Make the cat window draggable as well
    dragElement(catWindow);
  }
});

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}
 