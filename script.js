const secureCodeGroups = {
  1: ["dht123", "def456", "frc543", "jkl012", "ift934"],
  2: ["pqr678", "stu901", "vwx234", "ayz567", "123abc"],
  3: ["456def", "789ghi", "102jkl", "345mno", "678pqr"],
  4: ["901stu", "234vwx", "567ayz", "abc123", "def456"],
  5: ["ghi789", "jkl012", "mno345", "pqr678", "stu901"],
  6: ["vwx234", "yzq567", "123abc", "456def", "789ghi"],
  // Add more groups with unique codes as needed
};

const finishingMessages = {
  1: "තිබුනත් ලස්සනට පෙනී කහටක්වත් නැ,\nමොනව උනත් පුටුටික නම් කියල වැඩක් නැ,\nඉල්ලන දේ කවදාවත් හම්බෙන්නෙත් නැ,\nබෝල්ට් ඇනයි ලොකු කතුරයි නොයිල්ලලත් බැ",
  2: "සෙට් එක වල බැහැල ඉන්නේ,\nටිකක් උඩින් වල තියෙන්නේ,\nවල ඇතුළෙයි මාළු ඉන්නේ,\nමාළු එක්ක බඩු තියෙන්නේ",
  3: "Follow the current to where it's spun, a place thay shares power with everyone. In circuits it flows, distributing might, the heartbeat of knowledge, a guide light.",
  4: "යමුද යදම් බිද අපි මිහිර සොයා,\nමොනව තිබුනත් ඔක්කොම අපෙ බඩට තමා,\nපරනයි නමුත් ඉල්ලන්නම් ලැජ්ජ නොයා,\nPrintout  ටුයි බෝල්ට් ඇනයි දෙන්න මෙයා",
  5: "අළුතින් දැම්මා මැශිමක් ගහන්නම,\nඋදේ ඉදන් රෑ වෙනකල් ඇරලාදා,\nපැත්තක් 7යි දෙපසම 9යි දැනට,\nඅයියේ අපිට චිකන් ටිකක් දෙනවාද",
  6: "Hooray! Team 6 has successfully entered all codes.",
  // Add more finishing messages as needed
};

let currentGroupIndex = 1;
let currentCodeIndex = 1;
let resetTimeout;

document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("secureCodeInput");
  const checkButton = document.getElementById("checkButton");

  inputElement.addEventListener("input", function () {
    checkButton.disabled = inputElement.value.trim().length !== 6;
  });
});

function checkSecureCode() {
  clearTimeout(resetTimeout); // Clear the previous timeout

  const groupSelectElement = document.getElementById("groupSelect");
  const inputElement = document.getElementById("secureCodeInput");
  const messageDisplayElement = document.getElementById("messageDisplay");

  const selectedGroupIndex = parseInt(groupSelectElement.value);
  const enteredCode = inputElement.value.trim().toLowerCase(); // Convert to lowercase

  // Validate text length

  if (selectedGroupIndex !== currentGroupIndex) {
    currentGroupIndex = selectedGroupIndex;
    if (!secureCodeGroups[currentGroupIndex]) {
      messageDisplayElement.textContent =
        "Invalid team selection. Please choose a valid team.\nResetting in 5 seconds.";
      messageDisplayElement.style.color = "red";
      inputElement.value = "";
      resetAfterDelay();
      return;
    } else {
      currentCodeIndex = 1;
      messageDisplayElement.textContent = `Welcome.... - Enter the code`;
      messageDisplayElement.style.color = "blue";
    }
  }

  const groupCodes = secureCodeGroups[currentGroupIndex];
  const expectedCode = groupCodes[currentCodeIndex - 1];

  if (enteredCode === expectedCode) {
    const message = `Well done.... Enter the code ${currentCodeIndex + 1}.`;
    messageDisplayElement.textContent = message;
    messageDisplayElement.style.color = "green";
    currentCodeIndex++;

    if (currentCodeIndex > groupCodes.length) {
      messageDisplayElement.textContent =
        "හම්බෝ ඇති යන්තම්,හොයාගන්න මාව,ලස්සනම වැවේ,වතුරේ නොගෑ​වී";
      messageDisplayElement.style.color = "purple";
    }
  } else {
    messageDisplayElement.textContent = `Incorrect code. Please enter the correct code in the correct order.\nResetting in 5 seconds.`;
    console.log(enteredCode, expectedCode);

    messageDisplayElement.style.color = "red";
    resetAfterDelay();
  }

  // Clear the input field after checking
  inputElement.value = "";
}

function resetAfterDelay() {
  // Reset everything after 10 seconds
  window.setTimeout(function () {
    window.location.reload();
  }, 5000);
}
