const secureCodeGroups = {
  1: ["11", "12", "13", "14", "15"],
  2: ["21", "22", "23", "24", "25"],
  3: ["31", "32", "33", "34", "35"],
  4: ["41", "42", "43", "44", "45"],
  5: ["51", "52", "53", "54", "55"],
  6: ["61", "62", "63", "64", "65"],
  // Add more groups with unique codes as needed
};
// const secureCodeGroups = {
//   1: ["abc123", "def456", "ghi789", "jkl012", "mno345"],
//   2: ["pqr678", "stu901", "vwx234", "yz567", "123abc"],
//   3: ["456def", "789ghi", "012jkl", "345mno", "678pqr"],
//   4: ["901stu", "234vwx", "567yz", "abc123", "def456"],
//   5: ["ghi789", "jkl012", "mno345", "pqr678", "stu901"],
//   6: ["vwx234", "yz567", "123abc", "456def", "789ghi"],
//   // Add more groups with unique codes as needed
// };

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

function checkSecureCode() {
  const groupSelectElement = document.getElementById("groupSelect");
  const inputElement = document.getElementById("secureCodeInput");
  const messageDisplayElement = document.getElementById("messageDisplay");

  const selectedGroupIndex = parseInt(groupSelectElement.value);
  const enteredCode = inputElement.value.trim();
  const expectedCode = `code${currentCodeIndex}`;

  if (currentCodeIndex === 1 && selectedGroupIndex !== currentGroupIndex) {
    currentGroupIndex = selectedGroupIndex;
    if (!secureCodeGroups[currentGroupIndex]) {
      messageDisplayElement.textContent =
        "Invalid team selection. Please choose a valid team.";
      messageDisplayElement.style.color = "red";
      inputElement.value = "";
      return;
    } else {
      messageDisplayElement.textContent = `Welcome Team ${currentGroupIndex} - Enter next code`;
      messageDisplayElement.style.color = "blue";
    }
  }

  const currentGroup = currentGroupIndex;
  const groupCodes = secureCodeGroups[currentGroup];

  if (enteredCode === expectedCode) {
    const message = `Team ${currentGroupIndex} - ${expectedCode} - Message ${currentCodeIndex}`;
    messageDisplayElement.textContent = message;
    messageDisplayElement.style.color = "green";
    currentCodeIndex++;

    if (currentCodeIndex > groupCodes.length) {
      currentCodeIndex = 1;
      messageDisplayElement.textContent = finishingMessages[currentGroupIndex];
      messageDisplayElement.style.color = "purple";
    }
  } else {
    messageDisplayElement.textContent = `Incorrect code. Please enter Team ${currentGroupIndex} - ${expectedCode}`;
    messageDisplayElement.style.color = "red";
  }

  // Clear the input field after checking
  inputElement.value = "";
}
