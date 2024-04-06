let taskNumber = localStorage.getItem("taskNumber");
let tasksArray = [];
let allTask = document.querySelector("#all_task");
let taskCounter = localStorage.getItem("taskCounter");
let missedTaskCounter = 0;
let checkedTaskCounter = localStorage.getItem("checkedTaskCounter");
let notificed_all = document.getElementById("notificed_allTask").innerHTML;
let pageStatus = "Все задачи";
if (localStorage.getItem("tasksArray")) {
    tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
}
if(checkedTaskCounter == null){
  checkedTaskCounter = 0;
}
document.getElementById("notificed_allTask").innerHTML = taskCounter;

function create(){

    if(document.getElementById("task_title").value == "" ||  document.getElementById("task_date").value == "" ||  document.getElementById("task_time").value == ""){
      console.log("Заполните поля");
      document.getElementById("error").style.display = "block";
      
    }else{
      document.getElementById("error").style.display = "none";
    //Инкрементируем счетчик
    taskNumber++;
    taskCounter++;
    localStorage.setItem("taskCounter", taskCounter);
    localStorage.setItem("taskNumber", taskNumber);
    document.getElementById("notificed_allTask").innerHTML = taskCounter;

    //Получаем данные задачи
    let id = taskNumber;
    let title = document.getElementById("task_title").value;
    let description = document.getElementById("task_description").value;
    let date = document.getElementById("task_date").value;
    let time = document.getElementById("task_time").value;
    let completedTime = null;
    let status;
    let checked;
    var taskDateTime = new Date(date + 'T' + time);
    if(taskDateTime < new Date()){
      status = "bg-danger p-1";
    }else{
      status = "bg-warning p-1";
    }
    //Сохранняем данные в обьект
    let taskObject = {
        "id" : id,
        "title" : title,
        "description" : description,
        "date" : date,
        "time" : time,
        "status" : status,
        "checked" : checked,
        "completedTime" : completedTime
    }
    allTask.insertAdjacentHTML('afterBegin', htmlAdd(id, title, description, date, time, status, checked, completedTime));
    tasksArray.push(taskObject);
    document.getElementById(`completedTime_${id}`).style.display = "none";
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    document.getElementById("notificed_missedTask").innerHTML = missed_task(id-1);
    document.getElementById("task_title").value = "";
    document.getElementById("task_description").value = "";
    document.getElementById("task_date").value = "";
    document.getElementById("task_time").value = "";
    document.getElementById("close").click();
    

    }
    
}

function htmlAdd (id, title, description, date, time, status,checked, completedTime){
  return `<div class="col-lg-4 col-md-6 col-sm-12 mt-3" id="item_${id}">
  <div class="${status}" id="status_${id}" name="status_${id}"></div>
  <div class="task bg-body-secondary p-3 ">
    <div class="title d-flex border-bottom border-3 mt-2">
    <div class="checkbox col-1 align-items-center">
        <input class="checkbox_task form-check-input mt-2" type="checkbox" id="checkbox_${id}" onclick="checkControl(this);" value="${id}" ${checked}>
    </div>
    <div class="main_title col-9 mb-2">
    <h4 id="task_${id}">${title}</h4>
    </div>
    <div class="edit_button col-1 text-center">
      <a id="edit_${id}" data-bs-toggle="modal" data-bs-target="#editTask" onclick="edit(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
      </a>
    </div>
    <div class="close_button col-1">
      <a id="clean_${id}" onclick="clean(this);"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
      </svg></a>
      </div>
    </div>
    <div class="content_task mb-4 mt-2">
    <p id="taskInfo_${id}">${description}</p>
    <span><b>Дата: </b><span id="taskDate_${id}">${date}</span></span><br>
    <span><b>Время: </b><span id="taskTime_${id}">${time}</span></span>
    </div>
    <div class="content_task mb-4 mt-2 border-top border-3" id="completedTime_${id}">
    <p>Время выполнения: <span id="completedTimeSpan">${completedTime}</span></p>
    </div>
  </div>
</div>`;
}

function clean (item){
  taskCounter--;
  localStorage.setItem("taskCounter", taskCounter);
  document.getElementById("notificed_allTask").innerHTML = taskCounter;
  let itemId = item.id.split("_")[1];

  if(!checkDate(itemId-1)){
    missedTaskCounter--;
    document.getElementById("notificed_missedTask").innerHTML = missedTaskCounter;
  }

  if(tasksArray[itemId-1].checked == "checked"){
    checkedTaskCounter--;
    localStorage.setItem("checkedTaskCounter", checkedTaskCounter);
    document.getElementById("notificed_doneTask").innerHTML = checkedTaskCounter;
  }

  document.getElementById("item_" + itemId).remove();
  tasksArray[itemId-1] = null;
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
  
  console.log(tasksArray[itemId-1])
  console.log(itemId)
}

function edit(item){
  let itemId = item.id.split("_")[1];
  let title = tasksArray[itemId-1].title;
  let description = tasksArray[itemId-1].description;
  let date = tasksArray[itemId-1].date;
  let time = tasksArray[itemId-1].time;
  let edit_title = document.getElementById("edit_title");
  let edit_description = document.getElementById("edit_description");
  let edit_date = document.getElementById("edit_date");
  let edit_time = document.getElementById("edit_time");
  let edit_button = document.getElementById("edit_button");

  edit_title.value = title;
  edit_description.innerHTML = description;
  edit_date.value = date;
  edit_time.value = time;
  edit_button.value = itemId;

  console.log(edit_button)
}

function edit_save (item){
  let itemId = item.value;
  let edit_title = document.getElementById("edit_title").value;
  let edit_description = document.getElementById("edit_description").value;
  let edit_date = document.getElementById("edit_date").value;
  let edit_time = document.getElementById("edit_time").value;

  let title = tasksArray[itemId-1].title;
  let description = tasksArray[itemId-1].description;
  let date = tasksArray[itemId-1].date;
  let time = tasksArray[itemId-1].time;
  let oldStatus = tasksArray[itemId-1].status;
  let oldDateTime = new Date(tasksArray[itemId-1].date + 'T' + tasksArray[itemId-1].time); 
  

  tasksArray[itemId-1].title = edit_title;
  document.getElementById("task_"+itemId).innerHTML = edit_title;
  tasksArray[itemId-1].description = edit_description;
  document.getElementById("taskInfo_"+itemId).innerHTML = edit_description;
  tasksArray[itemId-1].date = edit_date;
  document.getElementById("taskDate_"+itemId).innerHTML = edit_date;
  tasksArray[itemId-1].time = edit_time;
  document.getElementById("taskTime_"+itemId).innerHTML = edit_time;

  let newDateTime = new Date(edit_date + 'T' + edit_time);

  if(tasksArray[itemId-1].checked == "checked"){
    tasksArray[itemId-1].status = "bg-success p-1";
  }else{
    if (newDateTime < new Date()) { // Если задача стала просроченной
      tasksArray[itemId-1].status = "bg-danger p-1";
    } else {
      tasksArray[itemId-1].status = "bg-warning p-1";
    }
  }

  let newStatus = tasksArray[itemId-1].status;

  if (oldStatus !== newStatus) {
    if (oldStatus === "bg-danger p-1") {
      missedTaskCounter--;
    } else {
      missedTaskCounter++;
    }
    document.getElementById("notificed_missedTask").innerHTML = missedTaskCounter; // Обновляем отображение счетчика
  }

  document.getElementById("status_"+itemId).className = tasksArray[itemId-1].status;
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}

function checkDate(itemId){
  var taskDateTime = new Date(tasksArray[itemId].date + 'T' + tasksArray[itemId].time);
  if(taskDateTime < new Date()){
    if(tasksArray[itemId].checked == "checked"){
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
}

function missed_task(item){
  if(checkDate(item) == false){
    missedTaskCounter++;
  }
    return missedTaskCounter;
}

function checkControl(checkbox) {
  let itemId = checkbox.value;
  let taskStatus = tasksArray[itemId-1].status;
  let oldStatus = tasksArray[itemId-1].status;
  if (checkbox.checked) {
    checkedTaskCounter++;
    taskStatus = "bg-success p-1";
    tasksArray[itemId-1].checked = "checked";
    document.getElementById(`completedTime_${itemId}`).style.display = "block";
    tasksArray[itemId-1].completedTime = new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear();
    document.getElementById("completedTimeSpan").innerHTML = tasksArray[itemId-1].completedTime;
    document.getElementById("completedTime")
    if(document.getElementById("allTaskTitle").innerHTML == "Пропущенные задачи"){
        document.getElementById("item_"+itemId).style.display = "none";
    }
} else {
  checkedTaskCounter--;
  tasksArray[itemId-1].checked = null;
  tasksArray[itemId-1].completedTime = null;
  document.getElementById(`completedTime_${itemId}`).style.display = "none";
    if (checkDate(itemId-1)) {
        taskStatus = "bg-warning p-1";
    } else {
        taskStatus = "bg-danger p-1";
    }
}
  localStorage.setItem("checkedTaskCounter", checkedTaskCounter);
  document.getElementById("notificed_doneTask").innerHTML = checkedTaskCounter;

  tasksArray[itemId-1].status = taskStatus;
  if(oldStatus == "bg-danger p-1" && checkbox.checked){
    missedTaskCounter--;
  }else if(!checkDate(itemId-1) && !checkbox.checked){
    missedTaskCounter++;
  }
  document.getElementById("notificed_missedTask").innerHTML = missedTaskCounter;
  console.log(oldStatus)
  console.log(checkbox.checked)

  // Обновляем класс элемента задачи для отображения соответствующего статуса
  document.getElementById("status_" + itemId).className = taskStatus;
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray)); // Сохраняем изменения в localStorage
}

function missedDiv() {
  pageStatus = "Пропущенные задачи";
  document.getElementById("allTaskTitle").innerHTML = pageStatus;
  for (let i = 0; i <= taskNumber; i++) {
      if (document.getElementById("item_" + i) !== null) {
          document.getElementById("item_" + i).remove();
      }
  }

  for (let i = 0; i <= taskNumber; i++) {
      if (tasksArray[i] && !checkDate(i)) {
          allTask.insertAdjacentHTML('afterBegin', htmlAdd(tasksArray[i].id, tasksArray[i].title, tasksArray[i].description, tasksArray[i].date, tasksArray[i].time, tasksArray[i].status, tasksArray[i].checked));
      }
  }
}

function allDiv(){
  pageStatus = "Все задачи";
  document.getElementById("allTaskTitle").innerHTML = pageStatus;
  for (let i = 0; i <= taskNumber; i++) {
      if (document.getElementById("item_" + i) !== null) {
          document.getElementById("item_" + i).remove();
      }
  }


  for (let i = 0; i <= taskNumber; i++){
    if(tasksArray[i] == null){
  
    }else{
      if(!checkDate(i)){
        tasksArray[i].status = "bg-danger p-1"
      }
      allTask.insertAdjacentHTML('afterBegin', htmlAdd(tasksArray[i].id, tasksArray[i].title, tasksArray[i].description, tasksArray[i].date, tasksArray[i].time, tasksArray[i].status, tasksArray[i].checked));
    }
  }
}

function completedDiv() {
  pageStatus = "Выполненные задачи";
  document.getElementById("allTaskTitle").innerHTML = pageStatus;
  for (let i = 0; i <= taskNumber; i++) {
      if (document.getElementById("item_" + i) !== null) {
          document.getElementById("item_" + i).remove();
      }
  }

  for (let i = 0; i <= taskNumber; i++) {
      if (tasksArray[i] && tasksArray[i].checked == "checked") {
          allTask.insertAdjacentHTML('afterBegin', htmlAdd(tasksArray[i].id, tasksArray[i].title, tasksArray[i].description, tasksArray[i].date, tasksArray[i].time, tasksArray[i].status, tasksArray[i].checked));
      }
  }
}

//DarkMode
document.addEventListener('DOMContentLoaded', (event) => {
  const htmlElement = document.documentElement;
  const switchElement = document.getElementById('darkModeSwitch');

  // Set the default theme to dark if no setting is found in local storage
  const currentTheme = localStorage.getItem('bsTheme') || 'dark';
  htmlElement.setAttribute('data-bs-theme', currentTheme);
  switchElement.checked = currentTheme === 'dark';

  switchElement.addEventListener('change', function () {
      if (this.checked) {
          htmlElement.setAttribute('data-bs-theme', 'dark');
          localStorage.setItem('bsTheme', 'dark');
      } else {
          htmlElement.setAttribute('data-bs-theme', 'light');
          localStorage.setItem('bsTheme', 'light');
      }
  });
});


function searchTasks() {
  let searchText = document.getElementById("searchInput").value.toLowerCase();
  if(searchText == ""){
    document.getElementById("allTaskTitle").innerHTML = pageStatus;
  }else{
    document.getElementById("allTaskTitle").innerHTML = searchText;
  }
  for(let i = 0; i < tasksArray.length; i++){
    if(tasksArray[i] != null){
      let taskTitle = tasksArray[i].title.toLowerCase();
      let taskDescription = tasksArray[i].description.toLowerCase();
      let taskId = tasksArray[i].id;

      if(document.getElementById("item_" + taskId) != null){
        if (taskTitle.includes(searchText) || taskDescription.includes(searchText)) {
          document.getElementById("item_" + taskId).style.display = "block";
      } else {
          document.getElementById("item_" + taskId).style.display = "none";
      }
      }
    }
  }
}

if (taskCounter == null){
  taskCounter = 0;
  localStorage.setItem("taskCounter", taskCounter);
  document.getElementById("notificed_allTask").innerHTML = taskCounter;
}
for (let i = 0; i <= taskNumber; i++){
  if(tasksArray[i] == null){

  }else{
    if(!checkDate(i)){
      tasksArray[i].status = "bg-danger p-1";
    }
    document.getElementById("notificed_doneTask").innerHTML = checkedTaskCounter;
    document.getElementById("notificed_missedTask").innerHTML = missed_task(i);
    allTask.insertAdjacentHTML('afterBegin', htmlAdd(tasksArray[i].id, tasksArray[i].title, tasksArray[i].description, tasksArray[i].date, tasksArray[i].time, tasksArray[i].status, tasksArray[i].checked, tasksArray[i].completedTime));
    if(tasksArray[i].completedTime == null){
      console.log(tasksArray[i].completedTime)
      document.getElementById(`completedTime_${i+1}`).style.display = "none";
    }
    
  }
}
