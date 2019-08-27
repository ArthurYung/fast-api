import bolb from "./test.js";

self.addEventListener("message", function(event) {
  const { action, data } = event.data;
  if (action === "TIMER_START") {
  }
});

function startCounter(event) {
  console.log(bolb);
  console.log(event.data, self);
  // let initial = event.data;
  // setInterval(() => ctx.postMessage("is Call back"), 1000);
}
