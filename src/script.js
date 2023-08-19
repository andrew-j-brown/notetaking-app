document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#add-button");
  const list = document.querySelector("#todo-list");

  const title = document.querySelector("#note-title");
  const description = document.querySelector("#note-content");
  const importantBtn = document.querySelector("#important");
  // const statusArr = ["No Urgency", "Urgent!", "Urgent!!", "Urgent!!!"];

  let noteArr = [
    {
      title: "Grocery Shopping",
      description: "Buy vegetables, fruits, milk, and bread.",
      dueDate: "test",
      priority: 0
    },
    {
      title: "Call Mom",
      description: "Check in on her and discuss upcoming family gathering.",
      dueDate: "test",
      priority: 1
    },
    {
      title: "Prepare Presentation",
      description:
        "Gather data and create slides for the upcoming team meeting.",
      dueDate: "test",
      priority: 2
    },
    {
      title: "Pay Rent",
      description:
        "Transfer the monthly rent amount to the landlord's account.",
      dueDate: "test",
      priority: 0
    },
    {
      title: "Book Flight Tickets",
      description:
        "Research and book flight tickets for the upcoming vacation.",
      dueDate: "test",
      priority: 1
    },
    {
      title: "Submit Expense Report",
      description:
        "Compile all receipts and submit the monthly expense report.",
      dueDate: "test",
      priority: 2
    },
    {
      title: "Dentist Appointment",
      description: "Attend the 2:00 PM dental checkup at Smiles Dental Clinic.",
      dueDate: "test",
      priority: 0
    },
    {
      title: "Finish Book",
      description:
        "Read the last few chapters of the novel 'Mystic Adventures.'",
      dueDate: "test",
      priority: 0
    },
    {
      title: "Gym Session",
      description:
        "Head to the gym for a workout session focused on upper body exercises.",
      dueDate: "test",
      priority: 3
    },
    {
      title: "Plan Birthday Party",
      description:
        "Organize a surprise birthday party for Sarah's upcoming birthday.",
      dueDate: "test",
      priority: 1
    }
  ];
  let listItems;
  let statusIndex = 0;

  // Note Priority Selector
  const sidebarItems = document.querySelectorAll(".sidebar-link");

  console.log(sidebarItems);

  sidebarItems.forEach((item) => {
    console.log("click");
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("sidebar-highlighted"));
      item.classList.add("sidebar-highlighted");
    });
  });

  // Note constructor
  function Note(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  // Create new note function
  function addNote(title, description, dueDate, priority) {
    const newNote = new Note(title, description, dueDate, priority);
    noteArr.push(newNote);
    noteArr.sort((a, b) => {
      return b.priority - a.priority;
    });
    updateDOM();
  }

  // Change urgency of note
  importantBtn.onclick = () => {
    statusIndex++;
    if (statusIndex === 4) {
      statusIndex = 0;
    }
    importantBtn.innerText = statusIndex;
    switch (statusIndex) {
      case 0:
        importantBtn.style.background = "#dfe6e9";
        importantBtn.style.color = "#2d3436";
        break;
      case 1:
        importantBtn.style.background = "#fdcb6e";
        break;
      case 2:
        importantBtn.style.background = "#e17055";
        importantBtn.style.color = "#fff";
        break;
      case 3:
        importantBtn.style.background = "#d63031";
    }
  };

  // Push notes array to DOM.
  function updateDOM() {
    list.innerHTML = "";
    for (let i = 0; i < noteArr.length; i++) {
      const note = noteArr[i];

      const li = document.createElement("li");
      li.classList.add("list-element");

      const hr = document.createElement("hr");
      hr.classList.add("hr");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("list-checkbox");
      li.appendChild(checkbox);
      li.appendChild(hr);

      const subContainer = document.createElement("div");
      subContainer.classList.add("sub-container");
      li.appendChild(subContainer);

      const t = document.createElement("p");
      t.classList.add("note-title");
      t.innerText = note.title;
      subContainer.appendChild(t);

      const p = document.createElement("p");
      p.innerText = note.description;
      subContainer.appendChild(p);

      const b = document.createElement("button");
      b.classList.add("list-delete");
      b.innerHTML = "<i class='bx bx-trash-alt' ></i>";
      b.addEventListener("click", deleteHandler(i));

      li.appendChild(subContainer);
      li.appendChild(b);

      // Style li element

      switch (noteArr[i].priority) {
        case 0:
          li.style.borderColor = "#b2bec3";
          break;
        case 1:
          li.style.borderColor = "#fdcb6e";
          break;
        case 2:
          li.style.borderColor = "#e17055";
          break;
        case 3:
          li.style.borderColor = "#d63031";
      }

      li.style.borderBottomWidth = "thick";

      list.appendChild(li);
    }
    listItems = document.querySelectorAll(".list-element");
  }

  // Delete Functionality
  function deleteHandler(index) {
    return function () {
      noteArr.splice(index, 1);
      updateDOM();
    };
  }

  // Add note button functionality
  button.onclick = () => {
    addNote(title.value, description.value, "test", statusIndex);
    title.value = "";
    description.value = "";
  };

  // Add note text area growth
  const textarea = document.getElementById("note-content");

  textarea.addEventListener("input", () => {
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set the new height
  });

  // Initial load of the app
  noteArr.sort((a, b) => {
      return b.priority - a.priority;
    });
  updateDOM();
});
