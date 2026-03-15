// Make an element draggable
function dragElement(element, headerElement) {
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  const dragHandle = headerElement || element;
  dragHandle.onmousedown = startDragging;

  function startDragging(e) {
    e = e || window.event;

    if (e.target.classList.contains("closebutton") || e.target.id.includes("close")) {
      return;
    }

    e.preventDefault();

    // disable iframe interaction while dragging
    document.querySelectorAll("iframe").forEach(frame => {
      frame.style.pointerEvents = "none";
    });

    const rect = element.getBoundingClientRect();
    element.style.top = rect.top + "px";
    element.style.left = rect.left + "px";
    element.style.transform = "none";

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;

    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;

    // re-enable iframe interaction
    document.querySelectorAll("iframe").forEach(frame => {
      frame.style.pointerEvents = "auto";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {

  function setupWindow(iconId, windowId, closeId, headerId) {
    const icon = document.getElementById(iconId);
    const win = document.getElementById(windowId);
    const close = document.getElementById(closeId);
    const header = document.getElementById(headerId);

    if (icon && win) {
      icon.addEventListener("click", () => {
        win.style.display = "block";
      });
    }

    if (close && win) {
      close.addEventListener("click", () => {
        win.style.display = "none";
      });
    }

    if (win) {
      dragElement(win, header);
    }
  }

  // welcome window
  const welcome = document.getElementById("welcome");
  const welcomeClose = document.getElementById("welcomeclose");

  if (welcome) dragElement(welcome);

  if (welcome && welcomeClose) {
    welcomeClose.onclick = () => welcome.style.display = "none";
  }

  // Setup all app windows
  setupWindow("catIcon", "catimg", "catimgclose", "catimgheader");
  setupWindow("infoicon", "aboutme", "aboutmeclose", "aboutmeheader");
  setupWindow("paintIcon", "paint", "paintclose", "paintheader");
  setupWindow("buttonDesktop", "buttons", "buttonclose", "buttonheader");
  setupWindow("musicDesktop", "music", "musicclose", "musicheader");

});

let selectedIcon = null;

function selectIcon(element) {
  if (selectedIcon) {
    selectedIcon.classList.remove("selected");
  }

  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = null;
}

function handleIconTap(element, win) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    win.style.display = "block";
  } else {
    selectIcon(element);
  }
}