import './stylesheets/reset.css';
import './stylesheets/style.css';
import icon from '/home/grimhoney/the_odin_project/todo-list/src/images/crystal.png';
import icon2 from '/home/grimhoney/the_odin_project/todo-list/src/images/expand.png';
import icon3 from '/home/grimhoney/the_odin_project/todo-list/src/images/close.jpg';
import icon4 from '/home/grimhoney/the_odin_project/todo-list/src/images/edit.png';
import icon5 from '/home/grimhoney/the_odin_project/todo-list/src/images/edit2.png';
import icon6 from '/home/grimhoney/the_odin_project/todo-list/src/images/pink-mark.png';

const app = (function() {
    const tabContainer = document.querySelector('#tabContainer');
    const taskContainer = document.querySelector('#taskContainer');
    const tabBtn = document.querySelector('#tabBtn');
    const taskBtn = document.querySelector('#taskBtn');
    const defaultTab = document.querySelector('#defaultTab');
    let myTasks = [];
    let myTabs = [];
    let currentTab = 'AllTasks';

    tabBtn.addEventListener('click', () => {
        if (document.contains(document.querySelector('.form'))) {

        }
        else {
            tabForm();
        }
    });

    taskBtn.addEventListener('click', () => {
        if (document.contains(document.querySelector('.form'))) {

        }
        else {
            taskForm();
        }
    });

    return {taskContainer, tabContainer, myTasks, currentTab};
})();

function tabForm() {
    const formContainer = document.createElement('div');
    formContainer.id = 'tabForm';
    formContainer.classList.add('form');
    
    const tabInput = document.createElement('input');
    tabInput.id = 'tabInput';
    tabInput.placeholder = 'Enter tab name here';

    const btnContainer = document.createElement('div');
    btnContainer.id = 'btnContainer';

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancelBtn';
    cancelBtn.innerText = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        formContainer.remove();
    });

    const createBtn = document.createElement('button');
    createBtn.id = 'createBtn';
    createBtn.innerText = 'Create';
    createBtn.addEventListener('click', () => {
        if (tabInput.value != '' && tabInput.value != ' ') {
            tabCreation(tabInput);
            formContainer.remove();
        }
    });

    btnContainer.append(cancelBtn, createBtn);

    formContainer.append(tabInput, btnContainer);

    taskContainer.appendChild(formContainer);
}

function tabCreation(tabInput) {
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.classList.add('currentTab');
    tab.innerText = tabInput.value;

    tabContainer.appendChild(tab);

    app.currentTab = tabInput.value.split(' ').join('');

    let tasks = document.querySelectorAll('#taskDiv');
            tasks.forEach((task) => {
                if (task.classList.contains(`${app.currentTab}`)) {
                    task.style.display = 'flex';
                }
                else {
                    task.style.display = 'none';
                }
            });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            if (document.contains(document.querySelector('.form'))) {

            }
            else {
            app.currentTab = tab.innerText.split(' ').join('');
            tab.classList.add('currentTab');

            tasks = document.querySelectorAll('#taskDiv');
            tasks.forEach((task) => {
                if (task.classList.contains(`${app.currentTab}`)) {
                    task.style.display = 'flex';
                }
                else {
                    task.style.display = 'none';
                }
            });

            tabs.forEach((tab) => {
                if (tab.innerText.split(' ').join('') != app.currentTab) {
                    tab.classList.remove('currentTab');
                }
            });
        }
        });

        if (tab.innerText.split(' ').join('') != app.currentTab) {
            tab.classList.remove('currentTab');
        }
    });
}

function taskForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form');
    formContainer.id = 'taskForm';

    const taskInput = document.createElement('input');
    taskInput.id = 'taskInput';
    taskInput.placeholder = 'Enter task name here *(required)';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'descriptionInput';
    descriptionInput.placeholder = 'Enter task description here';

    const deadlineContainer = document.createElement('div');
    deadlineContainer.id = 'deadlineContainer';

    const dueDateInput = document.createElement('input');
    dueDateInput.id = 'dueDateInput';
    dueDateInput.type = 'date';

    const dueTimeInput = document.createElement('input');
    dueTimeInput.id = 'dueTimeInput';
    dueTimeInput.type = 'time';

    const priorityLevel = document.createElement('input');
    priorityLevel.id = 'priorityLevel';
    priorityLevel.placeholder = 'Priority level (High, Medium, Low) *';

    const btnContainer = document.createElement('div');
    btnContainer.id = 'taskBtnContainer';

    const cancelBtn = document.createElement('button');
    cancelBtn.id = 'cancelTaskBtn';
    cancelBtn.innerText = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        formContainer.remove();
    });

    const createBtn = document.createElement('button');
    createBtn.id = 'createTaskBtn';
    createBtn.innerText = 'Create';
    createBtn.addEventListener('click', () => {
        let level = priorityLevel.value.toLowerCase();
        if ((taskInput.value != '' && taskInput.value != ' ') && (level != '' && level != ' ')) {
            if ((level == 'high' || level == 'medium') || (level == 'low')) {
                if (taskInput.value.length > 15) {
                    alert('Task name must be less than 15 characters long');
                }
                else {
                    app.myTasks.push(new task(taskInput.value, descriptionInput.value, dueDateInput.value, dueTimeInput.value, level));
                    formContainer.remove();
                    console.log(app.myTasks);
                    taskCreation();
                }
            }
        }
    });

    deadlineContainer.append(dueDateInput, dueTimeInput);

    btnContainer.append(cancelBtn, createBtn);

    formContainer.append(taskInput, descriptionInput, deadlineContainer, priorityLevel, btnContainer);

    taskContainer.appendChild(formContainer);
}

class task {
    constructor (name, description, date, time, level) {
        this.name = name,
        this.description = description,
        this.date = date,
        this.time = time,
        this.level = level
        this.defaultTab = 'AllTasks';
        this.tab = app.currentTab;
    }
}

function taskCreation() {

    let obj = app.myTasks[app.myTasks.length-1]; //yo
    const taskDiv = document.createElement('div');
    taskDiv.id = 'taskDiv';
    taskDiv.classList.add('AllTasks');
    taskDiv.classList.add(`${app.currentTab}`);

    const priorityDiv = document.createElement('div');
    priorityDiv.id = 'priorityDiv';

    const crystal = document.createElement('img');
    crystal.src = icon;
    crystal.id = 'crystal';
    
    const level = app.myTasks[app.myTasks.length-1].level;

    if (level == 'high') {
        priorityDiv.append(crystal, crystal.cloneNode(), crystal.cloneNode());
    }
    else if (level == 'medium') {
        priorityDiv.append(crystal, crystal.cloneNode());
    }
    else if (level == 'low') {
        priorityDiv.appendChild(crystal);
    }

    const taskText = app.myTasks[app.myTasks.length-1].name;

    const task = document.createElement('p');
    task.id = 'task'
    task.innerText = `Task: ${app.myTasks[app.myTasks.length-1].name}`;

    const description = document.createElement('p');
    description.id = 'description';

    const descriptionText = app.myTasks[app.myTasks.length-1].description;
    if (descriptionText == '') {
        description.innerText = `Description: N/A`;
    }
    else if (descriptionText.length > 10) {
        const expand = document.createElement('a');
        expand.id = 'expand';
        expand.innerHTML = 'Expand';

        description.innerText = 'Description: ';
        description.appendChild(expand);

        expand.addEventListener('click', () => {
            if (document.contains(document.querySelector('.form'))) {

            }
            else {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.id = 'descriptionDiv';
                descriptionDiv.classList.add('form');

                const descriptionDivTask = document.createElement('p');
                descriptionDivTask.classList.add('descriptionDivText');
                descriptionDivTask.innerText = `Task: ${app.myTasks[app.myTasks.length-1].name}`;

                const descriptionDivText = document.createElement('p');
                descriptionDivText.classList.add('descriptionDivText');
                descriptionDivText.innerText = `Description: ${descriptionText}`;

                const closeBtn = document.createElement('button');
                closeBtn.id = 'closeBtn';
                closeBtn.innerText = 'Close';
                closeBtn.addEventListener('click', () => {
                    descriptionDiv.remove();
                });

                descriptionDiv.append(descriptionDivTask, descriptionDivText, closeBtn);
    
                taskContainer.appendChild(descriptionDiv);
            }
        });
    }
    else {
        description.innerText = `Description: ${descriptionText}`;
    }

    const date = app.myTasks[app.myTasks.length-1].date;
    
    const time = app.myTasks[app.myTasks.length-1].time;

    const dateAndTime = document.createElement('p');
    dateAndTime.id = 'dateAndTime';
    if (app.myTasks[app.myTasks.length-1].date == '' && app.myTasks[app.myTasks.length-1].time == '') {
        dateAndTime.innerText = 'Due by: N/A';
    }
    else if (app.myTasks[app.myTasks.length-1].date != '' && app.myTasks[app.myTasks.length-1].time == '') {
        dateAndTime.innerText = `Due by: ${app.myTasks[app.myTasks.length-1].date}`;
    }
    else if (app.myTasks[app.myTasks.length-1].date == '' && app.myTasks[app.myTasks.length-1].time != '') {
        dateAndTime.innerText = `Due by: ${app.myTasks[app.myTasks.length-1].time}`;
    }
    else {
        dateAndTime.innerText = `Due by: ${app.myTasks[app.myTasks.length-1].date}  ${app.myTasks[app.myTasks.length-1].time}`;
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'buttonDiv';

    const leftButtonDiv = document.createElement('div');
    leftButtonDiv.id = 'leftButtonDiv';

    const rightButtonDiv = document.createElement('div');
    rightButtonDiv.id = 'rightButtonDiv';


    const checkMark = document.createElement('img');
    checkMark.id = 'checkMark';
    checkMark.src = icon6;
    checkMark.addEventListener('click', () => {
        if (document.contains(document.querySelector('.form'))) {

        }
        else {
        taskDiv.remove();
        }
    });
    
    const editBtn = document.createElement('img');
    editBtn.id = 'editBtn';
    editBtn.src = icon5;
    editBtn.addEventListener('click', () => {
        if (document.contains(document.querySelector('.form'))) {

        }
        else {
        // let inputValues = {
        //     level: level,
        //     task: taskText,
        //     description: descriptionText,
        //     date: date,
        //     time: time
        // };
        let editableElements = {
            pDiv: priorityDiv,
            crystal: crystal,
            task: task,
            description: description,
            dateAndTime: dateAndTime
        }
        console.log(obj);
        taskEditForm(obj, editableElements);
    }
    });

    leftButtonDiv.appendChild(checkMark);

    rightButtonDiv.appendChild(editBtn);

    buttonDiv.append(leftButtonDiv, rightButtonDiv);

    taskDiv.append(priorityDiv, task, description, dateAndTime, buttonDiv);

    taskContainer.appendChild(taskDiv);
};


function taskEditForm(inputValues, editableElements) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('taskForm');
    formContainer.classList.add('form');

    const taskInput = document.createElement('input');
    taskInput.classList.add('taskInput');
    taskInput.placeholder = 'Enter task name here *(required)';
    taskInput.value = `${inputValues.name}`;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('descriptionInput');
    descriptionInput.placeholder = 'Enter task description here';
    descriptionInput.value = `${inputValues.description}`;

    const deadlineContainer = document.createElement('div');
    deadlineContainer.classList.add('deadlineContainer');

    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add('dueDateInput');
    dueDateInput.type = 'date';
    dueDateInput.value = `${inputValues.date}`;

    const dueTimeInput = document.createElement('input');
    dueTimeInput.classList.add('dueTimeInput');
    dueTimeInput.type = 'time';
    dueTimeInput.value = `${inputValues.time}`;

    const priorityLevel = document.createElement('input');
    priorityLevel.classList.add('priorityLevel');
    priorityLevel.placeholder = 'Priority level (High, Medium, Low) *';
    priorityLevel.value = `${inputValues.level}`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('taskBtnContainer');

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelTaskBtn');
    cancelBtn.innerText = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        formContainer.remove();
    });

    const createBtn = document.createElement('button');
    createBtn.classList.add('createTaskBtn');
    createBtn.innerText = 'Update';
    createBtn.addEventListener('click', () => {
        let level = priorityLevel.value.toLowerCase();
        if ((taskInput.value != '' && taskInput.value != ' ') && (level != '' && level != ' ')) {
            if ((level == 'high' || level == 'medium') || (level == 'low')) {
                if (taskInput.value.length > 15) {
                    alert('Task name must be less than 15 characters long');
                }
                else {
                    inputValues.name = taskInput.value;
                    inputValues.description = descriptionInput.value;
                    inputValues.date = dueDateInput.value;
                    inputValues.time = dueTimeInput.value;
                    inputValues.level = priorityLevel.value;
                    const editedValues = {
                        taskInput: taskInput.value,
                        descriptionInput: descriptionInput.value,
                        dueDateInput: dueDateInput.value,
                        dueTimeInput: dueTimeInput.value,
                        priorityLevel: priorityLevel.value
                    };
                    taskEditInit(editableElements, editedValues);
                    formContainer.remove();
                }
            }
        }
    });

    deadlineContainer.append(dueDateInput, dueTimeInput);

    btnContainer.append(cancelBtn, createBtn);

    formContainer.append(taskInput, descriptionInput, deadlineContainer, priorityLevel, btnContainer);

    taskContainer.appendChild(formContainer);
}


function taskEditInit(editableElements, editedValues) {

    editableElements.pDiv.innerHTML = '';

    if (editedValues.priorityLevel == 'high') {
        editableElements.pDiv.append(editableElements.crystal, editableElements.crystal.cloneNode(), editableElements.crystal.cloneNode());
    }
    else if (editedValues.priorityLevel == 'medium') {
        editableElements.pDiv.append(editableElements.crystal, editableElements.crystal.cloneNode());
    }
    else if (editedValues.priorityLevel == 'low') {
        editableElements.pDiv.appendChild(editableElements.crystal);
    }

    editableElements.task.innerText = `Task: ${editedValues.taskInput}`;

    editableElements.description.innerHTML = '';
    if (editedValues.descriptionInput == '') {
        editableElements.description.innerText = `Description: N/A`;
    }
    else if (editedValues.descriptionInput.length > 10) {
        const expand = document.createElement('a');
        expand.id = 'expand';
        expand.innerHTML = 'Expand';

        editableElements.description.innerText = 'Description: ';
        editableElements.description.appendChild(expand);

        expand.addEventListener('click', () => {
            if (document.contains(document.querySelector('.form'))) {

            }
            else {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.id = 'descriptionDiv';
                descriptionDiv.classList.add('form');

                const descriptionDivTask = document.createElement('p');
                descriptionDivTask.classList.add('descriptionDivText');
                descriptionDivTask.innerText = `Task: ${editedValues.taskInput}`;

                const descriptionDivText = document.createElement('p');
                descriptionDivText.classList.add('descriptionDivText');
                descriptionDivText.innerText = `Description: ${editedValues.descriptionInput}`;

                const closeBtn = document.createElement('button');
                closeBtn.id = 'closeBtn';
                closeBtn.innerText = 'Close';
                closeBtn.addEventListener('click', () => {
                    descriptionDiv.remove();
                });

                descriptionDiv.append(descriptionDivTask, descriptionDivText, closeBtn);
    
                document.querySelector('#taskContainer').appendChild(descriptionDiv);
            }
        });
    }
    else {
        editableElements.description.innerText = `Description: ${editedValues.descriptionInput}`;
    }

    editableElements.dateAndTime.innerHTML = '';
    if (editedValues.dueDateInput == '' && editedValues.dueTimeInput == '') {
        editableElements.dateAndTime.innerText = 'Due by: N/A';
    }
    else if (editedValues.dueDateInput != '' && editedValues.dueTimeInput == '') {
        editableElements.dateAndTime.innerText = `Due by: ${editedValues.dueDateInput}`;
    }
    else if (editedValues.dueDateInput == '' && editedValues.dueTimeInput != '') {
        editableElements.dateAndTime.innerText = `Due by: ${editedValues.dueTimeInput}`;
    }
    else {
        editableElements.dateAndTime.innerText = `Due by: ${editedValues.dueDateInput}  ${editedValues.dueTimeInput}`;
    }
};

