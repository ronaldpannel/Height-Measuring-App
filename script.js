function main() {
  window.addEventListener("deviceorientation", onOrientationChange);

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (signal) {
      const video = document.getElementById("myVideo");
      video.srcOject = signal;
      video.play();
    })
    .catch(function (err) {
      alert(err);
    });
}

function onOrientationChange(event) {
  let angle = event.beta - 90;
  if (angle < 0) {
    angle = 0;
  }

  const distanceToObject = document.getElementById("mySlider").value;
  document.getElementById("myLabel").innerHTML =
    "Distance to object: " + distanceToObject + " meters";
  const height = Math.tan((angle * Math.PI) / 180) * distanceToObject;
  document.getElementById("heightInfo").innerHTML =
    height.toFixed(1) + " m(" + angle.toFixed(1) + " &deg;)";
  console.log(height.toFixed(1) + " m(" + angle.toFixed(1) + " &ged;)");
}
