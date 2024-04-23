t

const item = document.querySelector("#item");
const todo = document.querySelector("#to-do-items");


item.addEventListener("keyup", function(event){
    if(event.key == "Enter") // if enter is pressed, then task is added // 1) if we want to add some task then we can use add event listner and we can enter the  task 
    {
        addToDo(this.value);
        saveNotes();
        this.value = ""; // for new task the input field will be empty // 2) input field will be empty and we can add new task
    }
});
// 1) if we want to add some task then we can use add event listner and we can enter 
const saveNotes = () => {
    const tasks = document.querySelectorAll("li");
    const data = [];

    tasks.forEach(
        (task) => {
            data.push(task.textContent.trim());
            // trim method is used for removing whitespace.
        }
    ) 
    
    localStorage.setItem("tasks", JSON.stringify(data)); //
}// to complete the task and add the item asv string then convert to json object .

const addToDo = (item) => {
    const listItem = document.createElement("li");// for creating list of item in our front page
    listItem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
    `;

    // function for text line crossing, after task is done
    listItem.addEventListener("click", function(){
        this.classList.toggle("done")  // done class is called from css
    })

    listItem.querySelector("i").addEventListener("click", function(){
        listItem.remove();
        removeFromLocalStorage(listItem.textContent.trim());
    })
    todo.appendChild(listItem);
}

// to remove the task from local storage as well
const removeFromLocalStorage = (taskContent) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];// getting all the task present in local storage, if no task present then empty[] will be stored

    tasks = tasks.filter(task => task !== taskContent); // if the , which is to be removed matches in the local storage then than won't be added in tasks object

    localStorage.setItem("tasks", JSON.stringify(tasks)); // local storage is re modified after removing task to be deleted
}

(
    function(){
        const lstasks = JSON.parse(localStorage.getItem("tasks"));

        lstasks.forEach(
            (lstask) => {
                addToDo(lstask);
            }
        );
    }
)();