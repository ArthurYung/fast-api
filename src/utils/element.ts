function createElementBox(): HTMLDivElement {
  const DomBox = document.createElement("div");
  DomBox.id = "test-black-box";
  DomBox.style.cssText = "position:fixed; top: 100%; left:0";
  document.body.appendChild(DomBox);
  return DomBox;
}

function clearElementBox(Dom: HTMLDivElement) {
  Dom.innerHTML = "";
  document.body.removeChild(Dom);
}

export { createElementBox, clearElementBox };
