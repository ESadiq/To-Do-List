const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCountDisplay = document.getElementById("task-count");
const clearAllButton = document.getElementById("clear-all"); 

let addTask = document.getElementById("add-task");
let taskCount = 0;

clearAllButton.style.display = "none";

addTask.onclick = () => {
    if (inputBox.value === '') {
        alert("Siz nəsə yazı əlavə etməlisiniz!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        taskCount++;
        updateTaskCount();

        clearAllButton.style.display = "block";
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        taskCount--;
        updateTaskCount();

        if (taskCount === 0) {
            clearAllButton.style.display = "none";
        }
    }
}, false);

clearAllButton.onclick = () => {
    listContainer.innerHTML = "";
    taskCount = 0; 
    updateTaskCount(); 
    saveData();
    clearAllButton.style.display = "none";
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

    if (listContainer.children.length > 0) {
        clearAllButton.style.display = "block";
        taskCount = listContainer.children.length;
        updateTaskCount();
    }
}

function updateTaskCount() {
    taskCountDisplay.textContent = "To-Do Sayı: " + taskCount;
}

showTask();


