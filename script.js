function main() {
  window.addEventListener("deviceorientation", onOrientationChange);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Function to handle iOS-friendly getUserMedia
  async function getIOSMediaStream() {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Success callback
      const video = document.getElementById("myVideo");
      video.srcObject = stream;

      // Play the video after a user gesture (e.g., a button click)
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    } catch (err) {
      // Handle errors
      alert("Error accessing camera: " + err.message);
    }
  }

  // Check if the device is iOS and call the appropriate function
  if (isIOS) {
    getIOSMediaStream();
  } else {
    // For non-iOS devices, use your original code
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (signal) {
        const video = document.getElementById("myVideo");
        video.srcObject = signal;
        video.play();
      })
      .catch(function (err) {
        alert(err);
      });
  }

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
