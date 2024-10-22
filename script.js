// Handle button click to calculate the sum of last N nodes
let sum = 0;
document.getElementById("calculate-btn").addEventListener("click", () => {
  const linkedListInput = document.getElementById("linked-list").value;
  const nValue = parseInt(document.getElementById("n-value").value);
  sum = 0;
  document.getElementById("fast-pointer-steps").innerHTML = "";
  document.getElementById("slow-pointer-steps").innerHTML = "";
  document.getElementById("linked-list-display").innerHTML = "";
  document.getElementById("linked-list-display-2").innerHTML = "";
  document.getElementById("sum-display").innerText = "";

  if (linkedListInput && nValue > 0) {
    document.getElementById("calculate-btn").classList.add("disable");
    const linkedList = linkedListInput.split(",").map(Number); // Convert input to array of numbers
    visualizeLinkedList(linkedList);
    animateFastPointer(linkedList, nValue);
  } else {
    alert("Please enter a valid linked list and N value.");
  }
});

// Function to visualize the linked list
function visualizeLinkedList(linkedList) {
  const linkedListDisplay = document.getElementById("linked-list-display");
  linkedListDisplay.innerHTML = ""; // Clear previous visualization

  linkedList.forEach((value) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.textContent = value;
    linkedListDisplay.appendChild(nodeElement);
  });
}

// Function to visualize the linked list
function visualizeLinkedList2(linkedList) {
  const linkedListDisplay = document.getElementById("linked-list-display-2");
  linkedListDisplay.innerHTML = ""; // Clear previous visualization

  linkedList.forEach((value) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node2");
    nodeElement.textContent = value;
    linkedListDisplay.appendChild(nodeElement);
  });
}

// Function to animate the fast pointer
function animateFastPointer(linkedList, n) {
  const fastPointerAnimation = document.getElementById(
    "fast-pointer-animation"
  );
  const fastPointerSteps = document.getElementById("fast-pointer-steps");
  fastPointerSteps.innerHTML = ""; // Clear previous steps

  let fastIdx = 0;

  // Display the initial calculations before starting the addition
  fastPointerSteps.innerHTML += `<p>Fast pointer will move <strong>${n}</strong> nodes ahead.</p>`;

  let intervalId = setInterval(() => {
    if (fastIdx < n) {
      const node = document.getElementsByClassName("node")[fastIdx];
      node.classList.add("highlight");
      sum += linkedList[fastIdx];
      fastPointerSteps.innerHTML += `<p>Fast pointer at index <strong>${fastIdx}</strong>: sum is <strong>${sum}</strong>.</p>`;
      fastPointerAnimation.innerHTML = `<div class="pointer-info">Fast pointer at index <strong>${fastIdx}</strong>: value <strong>${linkedList[fastIdx]}</strong>.</div>`;
      fastIdx++;
    } else {
      clearInterval(intervalId); // Stop highlighting fast pointer
      fastPointerSteps.innerHTML += `<p>Fast pointer moved ahead, now at index <strong>${fastIdx}</strong>.</p>`;
      visualizeLinkedList2(linkedList);
      animateSlowPointer(linkedList, fastIdx);
    }
  }, 2000); // Adjust delay time (1500ms = 1.5 seconds) for visual effect
}

// Function to animate the slow pointer
function animateSlowPointer(linkedList, fastIdx) {
  const slowPointerAnimation = document.getElementById(
    "slow-pointer-animation"
  );
  const slowPointerSteps = document.getElementById("slow-pointer-steps");
  slowPointerSteps.innerHTML = ""; // Clear previous steps

  let slowIdx = 0;

  let intervalId = setInterval(() => {
    if (fastIdx < linkedList.length) {
      // Highlight slow pointer node
      const slowNode = document.getElementsByClassName("node2")[slowIdx];
      const fastNode = document.getElementsByClassName("node2")[fastIdx];
      slowNode.classList.add("highlight");
      fastNode.classList.add("highlight2");

      // Update sum and show the steps

      sum -= linkedList[slowIdx];
      slowPointerSteps.innerHTML += `<p>Slow pointer at index <strong>${slowIdx}</strong>: Subtract value from sum <strong>${sum}</strong>,</p>`;
      sum += linkedList[fastIdx];
      slowPointerSteps.innerHTML += `<p>Fast pointer at index <strong>${fastIdx}</strong>: Add value to sum <strong>${sum}</strong>,</p><br><hr><br>`;

      // Move both pointers
      slowIdx++;
      fastIdx++;
    } else {
      clearInterval(intervalId); // Stop when fast pointer reaches the end
      document.getElementById("sum-display").innerText = `Sum: ${sum}`;
      document.getElementById("calculate-btn").classList.remove("disable");
    }
  }, 2000); // Adjust delay time (1500ms = 1.5 seconds) for visual effect
}
