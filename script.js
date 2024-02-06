const secureCodeGroups = {
  1: ["abc123", "def456", "ghi789", "jkl012", "mno345"],
  2: ["pqr678", "stu901", "vwx234", "yz567", "123abc"],
  3: ["456def", "789ghi", "012jkl", "345mno", "678pqr"],
  4: ["901stu", "234vwx", "567yz", "abc123", "def456"],
  5: ["ghi789", "jkl012", "mno345", "pqr678", "stu901"],
  6: ["vwx234", "yz567", "123abc", "456def", "789ghi"],
  // Add more groups with unique codes as needed
};

const finishingMessages = {
  1: "Congratulations! Team 1 has completed all codes.",
  2: "Way to go! Team 2 has successfully entered all codes.",
  3: "Fantastic! Team 3 has conquered all codes.",
  4: "Well done! Team 4 has accomplished all codes.",
  5: "Great job! Team 5 has finished all codes.",
  6: "Hooray! Team 6 has successfully entered all codes.",
  // Add more finishing messages as needed
};

let currentGroupIndex = 1;
let currentCodeIndex = 1;
let resetTimeout;

function checkSecureCode() {
  clearTimeout(resetTimeout); // Clear the previous timeout

  const groupSelectElement = document.getElementById("groupSelect");
  const inputElement = document.getElementById("secureCodeInput");
  const messageDisplayElement = document.getElementById("messageDisplay");

  const selectedGroupIndex = parseInt(groupSelectElement.value);
  const enteredCode = inputElement.value.trim();

  if (selectedGroupIndex !== currentGroupIndex) {
    currentGroupIndex = selectedGroupIndex;
    if (!secureCodeGroups[currentGroupIndex]) {
      messageDisplayElement.textContent =
        "Invalid team selection. Please choose a valid team.\nResetting in 10 seconds.";
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
      messageDisplayElement.textContent = finishingMessages[currentGroupIndex];
      messageDisplayElement.style.color = "purple";
    }
  } else {
    messageDisplayElement.textContent = `Incorrect code. Please enter the correct code in the correct order.\nResetting in 10 seconds.`;
    messageDisplayElement.style.color = "red";
    resetAfterDelay();
  }

  // Clear the input field after checking
  inputElement.value = "";
}

function resetAfterDelay() {
  // Reset everything after 10 seconds
  resetTimeout = setTimeout(() => {
    currentGroupIndex = 1;
    currentCodeIndex = 1;

    const messageDisplayElement = document.getElementById("messageDisplay");
    messageDisplayElement.textContent = "";
    messageDisplayElement.style.color = "black";

    const inputElement = document.getElementById("secureCodeInput");
    inputElement.value = "";

    const groupSelectElement = document.getElementById("groupSelect");
    groupSelectElement.value = "1";

    clearTimeout(resetTimeout); // Clear the timeout to avoid multiple resets
  }, 5000);
}
