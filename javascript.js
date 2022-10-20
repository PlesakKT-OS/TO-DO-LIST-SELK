let version = "1.1";
let openTasks = [];
let inProgressTask;
let closedTasks = [];
let counterOfTasks = 0;
let currentEditId;
let popup = document.getElementById("popup");
let popupEdit = document.getElementById("popup-edit");
const openTasksContainer = document.querySelector(".open-tasks");
const inProgressTasksContainer = document.querySelector(".in-progress-tasks");
const closedTasksContainer = document.querySelector(".closed-tasks");
AddDateAndAppVersion();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-popup").addEventListener("click", OpenPopup);
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-addTask")
    .addEventListener("click", AddUserInputToOpenTasks);
});
const AddUserInputToOpenTasks = (ev) => {
  ev.preventDefault();
  let taskRating = $("input[name='rating']:checked").val();
  if (document.getElementById("taskName").value === "") {
    alert("Unesite ime zadatka");
  } else if (document.getElementById("taskDueDate").value === "") {
    alert("Unesite krajni rok zadatka");
  } else if (taskRating === undefined) {
    alert("Odaberite rating zadatka");
  } else if (document.getElementById("taskCreatorName").value === "") {
    alert("Unesite svoje ime i prezime");
  } else if (document.getElementById("taskDescription").value === "") {
    alert("Unesite opis zadatka");
  } else {
    let openTask = {
      date: new Date(),
      taskName: document.getElementById("taskName").value,
      taskDueDate: document.getElementById("taskDueDate").value,
      taskCreatorName: document.getElementById("taskCreatorName").value,
      taskDescription: document.getElementById("taskDescription").value,
      rating: taskRating,
      status: "OPEN",
      id: counterOfTasks,
    };
    document.getElementById("new-todo-form").reset();
    openTasks.push(openTask);

    ClosePopup();
    counterOfTasks++;
    UpdateContainers();
  }
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-close").addEventListener("click", ClosePopup);
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-close-edit")
    .addEventListener("click", ClosePopupEdit);
});
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-edit-openTasks")
    .addEventListener("click", EditOpenTasks);
});
const EditOpenTasks = (ev) => {
  ev.preventDefault();
  let taskRatingEdit = $("input[name='rating']:checked").val();

  if (document.getElementById("taskNameEdit").value === "") {
    alert("Unesite ime zadatka");
  } else if (document.getElementById("taskDueDateEdit").value === "") {
    alert("Unesite krajni rok zadatka");
  } else if (taskRatingEdit === undefined) {
    alert("Odaberite rating zadatka");
  } else if (document.getElementById("taskCreatorNameEdit").value === "") {
    alert("Unesite svoje ime i prezime");
  } else if (document.getElementById("taskDescriptionEdit").value === "") {
    alert("Unesite opis zadatka");
  } else {
    let EditedTask = {
      date: new Date(),
      taskName: document.getElementById("taskNameEdit").value,
      taskDueDate: document.getElementById("taskDueDateEdit").value,
      taskCreatorName: document.getElementById("taskCreatorNameEdit").value,
      taskDescription: document.getElementById("taskDescriptionEdit").value,
      rating: taskRatingEdit,
      status: "OPEN",
      id: currentEditId,
    };
    openTasks = openTasks.filter((data) => data.id != currentEditId);
    openTasks.push(EditedTask);
    ClosePopupEdit();
    UpdateContainers();
  }
};
$(".open-tasks").on(
  "click",
  ".btn-open-to-in-progress",
  function MoveFromOpenToInProgress() {
    let idOfRemovedOpenTask;
    openTasks.forEach((element) => {
      if (inProgressTask === undefined) {
        if (element.id.toString() === this.id.toString()) {
          inProgressTask = element;
          idOfRemovedOpenTask = element.id;
          openTasks = openTasks.filter(
            (data) => data.id != idOfRemovedOpenTask
          );
        }
      }
    });
    UpdateContainers();
  }
);
$(".open-tasks").on("click", ".btn-edit", function EditTask() {
  currentEditId = this.id;
  OpenPopupEdit();
});
$(".in-progress-tasks").on(
  "click",
  ".btn-in-progress-to-open",
  function MoveFromInProgressToOpen() {
    openTasks.push(inProgressTask);
    inProgressTask = undefined;
    UpdateContainers();
  }
);
$(".in-progress-tasks").on(
  "click",
  ".btn-in-progress-to-closed",
  function MoveFromInProgressToClosed() {
    closedTasks.push(inProgressTask);
    inProgressTask = undefined;
    UpdateContainers();
  }
);
$(".closed-tasks").on(
  "click",
  ".btn-closed-to-garbage",
  function MoveFromInProgressToClosed() {
    let idOfClosedRemovedTask;
    closedTasks.forEach((element) => {
      if (element.id.toString() === this.id.toString()) {
        idOfClosedRemovedTask = element.id;
        closedTasks = closedTasks.filter(
          (data) => data.id != idOfClosedRemovedTask
        );
      }
    });
    UpdateContainers();
  }
);
jQuery(".open-tasks").css("overflow-y", "scroll");
jQuery(".closed-tasks").css("overflow-y", "scroll");
function AddTaskToOpenContainer(task) {
  let month = task.date.getMonth() + 1;
  const p_name = document.createElement("p");
  const p_date = document.createElement("p");
  const div_dateAndName = document.createElement("div");
  p_name.innerText = task.taskName;
  p_date.innerText =
    "(" +
    task.date.getDate() +
    "." +
    month +
    "." +
    task.date.getFullYear() +
    ")";
  p_name.classList.add("name");
  p_date.classList.add("date");

  div_dateAndName.appendChild(p_name);
  div_dateAndName.appendChild(p_date);
  div_dateAndName.classList.add("name-and-date");

  const p_description = document.createElement("p");
  p_description.innerText = task.taskDescription;
  p_description.classList.add("name-and-date");

  const p_rating = document.createElement("p");
  p_rating.innerText = "Rating: " + task.rating;
  p_rating.classList.add("rating");

  const p_dueDate = document.createElement("p");
  p_dueDate.innerText = "Rok: " + task.taskDueDate;
  p_dueDate.classList.add("due-date");

  const p_creator = document.createElement("p");
  p_creator.innerText = "Kreirao: " + task.taskCreatorName;
  p_creator.classList.add("creator");

  const div_taskDescription = document.createElement("div");
  div_taskDescription.classList.add("task-description");

  div_taskDescription.appendChild(div_dateAndName);
  div_taskDescription.appendChild(p_description);
  div_taskDescription.appendChild(p_rating);
  div_taskDescription.appendChild(p_dueDate);
  div_taskDescription.appendChild(p_creator);

  const ionIcon = document.createElement("ion-icon");
  ionIcon.setAttribute("name", "arrow-forward-outline");
  ionIcon.classList.add("ion-icons");
  const ionEdit = document.createElement("ion-icon");
  ionEdit.setAttribute("name", "create-outline");
  ionEdit.classList.add("ion-icons");

  const a_taskButton = document.createElement("button");
  const b_taskButton = document.createElement("button");
  a_taskButton.classList.add("btn-open-to-in-progress");
  b_taskButton.classList.add("btn-edit");
  a_taskButton.setAttribute("id", task.id);
  b_taskButton.setAttribute("id", task.id);
  b_taskButton.appendChild(ionEdit);
  a_taskButton.appendChild(ionIcon);

  const div_taskButton = document.createElement("div");
  div_taskButton.classList.add("task-buttons");
  div_taskButton.appendChild(b_taskButton);
  div_taskButton.appendChild(a_taskButton);

  const div_openTask = document.createElement("div");
  div_openTask.classList.add("open-task");
  div_openTask.setAttribute("id", task.id);
  div_openTask.appendChild(div_taskDescription);
  div_openTask.appendChild(div_taskButton);

  openTasksContainer.appendChild(div_openTask);
}
function AddTaskToInProgressContainer(task) {
  let month = task.date.getMonth() + 1;
  const p_name = document.createElement("p");
  const p_date = document.createElement("p");
  const div_dateAndName = document.createElement("div");
  p_name.innerText = task.taskName;
  p_date.innerText =
    "(" +
    task.date.getDate() +
    "." +
    month +
    "." +
    task.date.getFullYear() +
    ")";
  p_name.classList.add("name");
  p_date.classList.add("date");

  div_dateAndName.appendChild(p_name);
  div_dateAndName.appendChild(p_date);
  div_dateAndName.classList.add("name-and-date");

  const p_description = document.createElement("p");
  p_description.innerText = task.taskDescription;
  p_description.classList.add("name-and-date");

  const p_rating = document.createElement("p");
  p_rating.innerText = "Rating: " + task.rating;
  p_rating.classList.add("rating");

  const p_dueDate = document.createElement("p");
  p_dueDate.innerText = "Rok: " + task.taskDueDate;
  p_dueDate.classList.add("due-date");

  const p_creator = document.createElement("p");
  p_creator.innerText = "Kreirao: " + task.taskCreatorName;
  p_creator.classList.add("creator");

  const div_taskDescription = document.createElement("div");
  div_taskDescription.classList.add("task-description");
  div_taskDescription.appendChild(div_dateAndName);
  div_taskDescription.appendChild(p_description);
  div_taskDescription.appendChild(p_rating);
  div_taskDescription.appendChild(p_dueDate);
  div_taskDescription.appendChild(p_creator);

  const ionIconLeftArrow = document.createElement("ion-icon");
  ionIconLeftArrow.setAttribute("name", "arrow-back-outline");
  ionIconLeftArrow.classList.add("ion-icons");

  const ionIconRightArrow = document.createElement("ion-icon");
  ionIconRightArrow.setAttribute("name", "arrow-forward-outline");
  ionIconRightArrow.classList.add("ion-icons");

  const a_taskButtonLeftArrow = document.createElement("a");
  a_taskButtonLeftArrow.href = "#";
  a_taskButtonLeftArrow.classList.add("btn-in-progress-to-open");
  a_taskButtonLeftArrow.setAttribute("id", task.id);

  const a_taskButtonRightArrow = document.createElement("a");
  a_taskButtonRightArrow.href = "#";
  a_taskButtonRightArrow.classList.add("btn-in-progress-to-closed");
  a_taskButtonRightArrow.setAttribute("id", task.id);

  a_taskButtonRightArrow.appendChild(ionIconRightArrow);
  a_taskButtonLeftArrow.appendChild(ionIconLeftArrow);

  const div_taskButton = document.createElement("div");
  div_taskButton.classList.add("task-buttons");
  div_taskButton.appendChild(a_taskButtonLeftArrow);
  div_taskButton.appendChild(a_taskButtonRightArrow);

  const div_openTask = document.createElement("div");
  div_openTask.classList.add("in-progress-task");
  div_openTask.setAttribute("id", task.id);
  div_openTask.appendChild(div_taskDescription);
  div_openTask.appendChild(div_taskButton);

  inProgressTasksContainer.appendChild(div_openTask);
}
function AddTaskToClosedContainer(task) {
  let month = task.date.getMonth() + 1;
  const p_name = document.createElement("p");
  const p_date = document.createElement("p");
  const div_dateAndName = document.createElement("div");
  p_name.innerText = task.taskName;
  p_date.innerText =
    "(" +
    task.date.getDate() +
    "." +
    month +
    "." +
    task.date.getFullYear() +
    ")";
  p_name.classList.add("name");
  p_date.classList.add("date");

  div_dateAndName.appendChild(p_name);
  div_dateAndName.appendChild(p_date);
  div_dateAndName.classList.add("name-and-date");

  const p_description = document.createElement("p");
  p_description.innerText = task.taskDescription;
  p_description.classList.add("name-and-date");

  const p_rating = document.createElement("p");
  p_rating.innerText = "Rating: " + task.rating;
  p_rating.classList.add("rating");

  const p_dueDate = document.createElement("p");
  p_dueDate.innerText = "Rok: " + task.taskDueDate;
  p_dueDate.classList.add("due-date");

  const p_creator = document.createElement("p");
  p_creator.innerText = "Kreirao: " + task.taskCreatorName;
  p_creator.classList.add("creator");

  const div_taskDescription = document.createElement("div");
  div_taskDescription.classList.add("task-description");
  div_taskDescription.appendChild(div_dateAndName);
  div_taskDescription.appendChild(p_description);
  div_taskDescription.appendChild(p_rating);
  div_taskDescription.appendChild(p_dueDate);
  div_taskDescription.appendChild(p_creator);

  const ionIcon = document.createElement("ion-icon");
  ionIcon.setAttribute("name", "trash-outline");
  ionIcon.classList.add("ion-icons");

  const a_taskButton = document.createElement("button");
  a_taskButton.classList.add("btn-closed-to-garbage");
  a_taskButton.setAttribute("id", task.id);

  a_taskButton.appendChild(ionIcon);

  const div_taskButton = document.createElement("div");
  div_taskButton.classList.add("task-button");
  div_taskButton.appendChild(a_taskButton);

  const div_closedTask = document.createElement("div");
  div_closedTask.classList.add("closed-task");
  div_closedTask.setAttribute("id", task.id);
  div_closedTask.appendChild(div_taskDescription);
  div_closedTask.appendChild(div_taskButton);

  closedTasksContainer.appendChild(div_closedTask);
}
function ClearOpenTasks() {
  let openTaskElements = document.querySelectorAll(".open-task");
  openTaskElements.forEach((element) => {
    element.remove();
  });
}
function ShowAllOpenTasks() {
  openTasks.forEach((element) => {
    AddTaskToOpenContainer(element);
  });
}
function ClearInProgressTask() {
  let openTaskElements = document.querySelectorAll(".in-progress-task");
  openTaskElements.forEach((element) => {
    element.remove();
  });
}
function ShowInProgressTask() {
  if (inProgressTask != undefined) AddTaskToInProgressContainer(inProgressTask);
}
function ClearClosedTasks() {
  let openTaskElements = document.querySelectorAll(".closed-task");
  openTaskElements.forEach((element) => {
    element.remove();
  });
}
function ShowAllClosedTasks() {
  closedTasks.forEach((element) => {
    AddTaskToClosedContainer(element);
  });
}
function ClearAllTasks() {
  ClearOpenTasks();
  ClearInProgressTask();
  ClearClosedTasks();
}
function ShowAllTasks() {
  ShowAllOpenTasks();
  ShowInProgressTask();
  ShowAllClosedTasks();
}
function UpdateContainers() {
  ClearAllTasks();
  SortByDateLatest();
  ShowAllTasks();
}
function AddDateAndAppVersion() {
  let date = new Date();
  let month = date.getMonth() + 1;

  document.getElementById("date-and-app-version").innerText =
    date.getDate() + "/" + month + "/" + date.getFullYear() + ", v" + version;
}
function OpenPopup() {
  popup.classList.add("open-popup");
}
function ClosePopup() {
  document.getElementById("new-todo-form").reset();
  popup.classList.remove("open-popup");
}
function OpenPopupEdit() {
  popupEdit.classList.add("open-popup");
  let taskNameEdit = document.getElementById("taskNameEdit");
  let taskDueDate = document.getElementById("taskDueDateEdit");
  let taskCreatorName = document.getElementById("taskCreatorNameEdit");
  let taskDescription = document.getElementById("taskDescriptionEdit");
  let taskRating = openTasks[currentEditId].rating;
  let taskRating1 = document.getElementById("taskRating1Edit");
  let taskRating2 = document.getElementById("taskRating2Edit");
  let taskRating3 = document.getElementById("taskRating3Edit");
  let taskRating4 = document.getElementById("taskRating4Edit");
  let taskRating5 = document.getElementById("taskRating5Edit");

  if (taskRating.toString() === "1") taskRating1.checked = true;
  else if (taskRating.toString() === "2") taskRating2.checked = true;
  else if (taskRating.toString() === "3") taskRating3.checked = true;
  else if (taskRating.toString() === "4") taskRating4.checked = true;
  else taskRating5.checked = true;
  taskNameEdit.value = openTasks[currentEditId].taskName;
  taskDueDate.value = openTasks[currentEditId].taskDueDate;
  taskCreatorName.value = openTasks[currentEditId].taskCreatorName;
  taskDescription.value = openTasks[currentEditId].taskDescription;
}
function ClosePopupEdit() {
  popupEdit.classList.remove("open-popup");
}
function SortByDateLatest() {
  openTasks.sort(
    (firstItem, secondItem) =>
      secondItem.date.getTime() - firstItem.date.getTime()
  );
  closedTasks.sort(
    (firstItem, secondItem) =>
      secondItem.date.getTime() - firstItem.date.getTime()
  );
}
function SortByDateOldest() {
  openTasks.sort(
    (firstItem, secondItem) =>
      firstItem.date.getTime() - secondItem.date.getTime()
  );
  closedTasks.sort(
    (firstItem, secondItem) =>
      firstItem.date.getTime() - secondItem.date.getTime()
  );
}
function SortByMaxRating() {
  openTasks.sort(
    (firstItem, secondItem) => secondItem.rating - firstItem.rating
  );
  closedTasks.sort(
    (firstItem, secondItem) => secondItem.rating - firstItem.rating
  );
}
function SortByMinRating() {
  openTasks.sort(
    (firstItem, secondItem) => firstItem.rating - secondItem.rating
  );
  closedTasks.sort(
    (firstItem, secondItem) => firstItem.rating - secondItem.rating
  );
}
function ChangeSort(value) {
  let dateLatest = 1,
    dateOldest = 2,
    max = 3;
  if (value.toString() === dateLatest.toString()) SortByDateLatest();
  else if (value.toString() === dateOldest.toString()) SortByDateOldest();
  else if (value.toString() === max.toString()) SortByMaxRating();
  else SortByMinRating();
  ClearAllTasks();
  ShowAllTasks();
}
