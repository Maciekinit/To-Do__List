{
    const tasks = [
        {
            content: "przykładowe zadanie nie zrobione",
            done: false,
        },
        {
            content: "przykładowe zadanie zrobione",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
               <li class="tasks__item js-task">
                 <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                   ${task.done ? "🗸" : ""}
                 </button>
                 <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                 ${task.content}</span>
                 <button class="tasks__button tasks__button--remove js-remove">
                   🗑️
                 </button>
               </li>
            `;
        }

        const tasksElement = document.querySelector(".js-tasks");
        if (tasksElement) {
            tasksElement.innerHTML = tasksListHTMLContent;
        }

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        if (!newTaskElement) {
            return;
        }

        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        if (form) {
            form.addEventListener("submit", onFormSubmit);
        }
    };

    init();
}