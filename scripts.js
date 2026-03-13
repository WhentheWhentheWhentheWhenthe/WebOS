// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
// Optional: provide a headerElement to only allow dragging from that element
function dragElement(element, headerElement) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Use headerElement if provided, otherwise use the whole element
  var dragHandle = headerElement || element;

  // Step 3: Assign the `startDragging` function to the draggable element's `onmousedown` event.
  // This allows you to drag the window by holding down anywhere on the window.
  dragHandle.onmousedown = startDragging;

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    // Check if the target is a close button, don't drag
    if (e.target.classList.contains('closebutton') || e.target.id.includes('close')) {
      return;
    }
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

  // About me window
  const infoIcon = document.getElementById("infoicon");
  const aboutMeWindow = document.getElementById("aboutme");
  const aboutMeClose = document.getElementById("aboutmeclose");

  if (infoIcon && aboutMeWindow) {
    infoIcon.addEventListener("click", () => {
      aboutMeWindow.style.display = "block";
    });
  }

  if (aboutMeClose && aboutMeWindow) {
    aboutMeClose.addEventListener("click", () => {
      aboutMeWindow.style.display = "none";
    });
  }

  if (aboutMeWindow) {
    dragElement(aboutMeWindow);
  }

  // Paint window
  const paintIcon = document.getElementById("paintIcon");
  const paintWindow = document.getElementById("paint");
  const paintClose = document.getElementById("paintclose");

  if (paintIcon && paintWindow) {
    paintIcon.addEventListener("click", () => {
      paintWindow.style.display = "block";
    });
  }

  if (paintClose && paintWindow) {
    paintClose.addEventListener("click", () => {
      paintWindow.style.display = "none";
    });
  }

  if (paintWindow) {
    const paintHeader = document.getElementById("paintheader");
    dragElement(paintWindow, paintHeader);
  }

  // Buttons window
  const buttonIcon = document.getElementById("buttonDesktop");
  const buttonWindow = document.getElementById("buttons");
  const buttonClose = document.getElementById("buttonclose");

  if (buttonIcon && buttonWindow) {
    buttonIcon.addEventListener("click", () => {
      buttonWindow.style.display = "block";
    });
  }

  if (buttonClose && buttonWindow) {
    buttonClose.addEventListener("click", () => {
      buttonWindow.style.display = "none";
    });
  }

  if (buttonWindow) {
    dragElement(buttonWindow);
  }
});

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function handleIconTap(icon, window) {
  window.style.display = window.style.display === "none" ? "block" : "none";
}

function initializeWindow(type) {
  // Placeholder for future initialization
  console.log("Initializing window for " + type);
}
