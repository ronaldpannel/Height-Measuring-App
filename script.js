function main() {
  window.addEventListener("deviceorientation", onOrientationChange);

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        // You can add additional constraints if needed
      },
    })
    .then(function (signal) {
      const video = document.getElementById("myVideo");
      video.srcObject = signal;
      video.play();
    })
    .catch(function (err) {
      // Check if the error is related to constraints and provide a more informative message
      if (err.name === "NotAllowedError" || err.name === "NotFoundError") {
        alert(
          "Please enable camera access or ensure that your device has a rear camera available."
        );
      } else {
        alert("Error accessing camera: " + err.message);
      }
    });

  // navigator.mediaDevices.getUserMedia({video:{
  //   facingMode: 'environment'
  // }})
  //   .then(function (signal){
  //     const video = document.getElementById("myVideo");
  //     video.srcObject=signal;
  //     video.play();
  //   })
  //   .catch(function (err) {
  //     alert(err);
  //   });
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
