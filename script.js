const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalInput = document.querySelectorAll(".goal-input");
const goalContainer = document.querySelector(".goal-container");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
completedGoalscount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalscount / 3) * 100}%`

checkBoxList.forEach((checkbox) => {

    checkbox.addEventListener("click", (e) => {
        const allFieldsFilled = [...goalInput].every((input) => {
            return input.value
        })

        if (allFieldsFilled) {
            checkbox.parentElement.classList.toggle("completed")
            progressValue.style.opacity = "1"
            const inputId = checkbox.nextElementSibling.id
            completedGoalscount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalscount / 3 * 100}%`
            allGoals[inputId].completed = !allGoals[inputId].completed
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            if (completedGoalscount === 4) {
                progressValue.style.width = '100%'
            }
        }
        else {
            errorLabel.style.display = "block";
        }
    });
});

goalInput.forEach((input) => {
    input.value = allGoals[input.id].name
    if (allGoals[input.id].completed) {
        input.parentElement.classList.add("completed")
    }

    input.addEventListener("focus", () => {
        errorLabel.style.display = "none";
    });
    input.addEventListener('input', (e) => {
        allGoals[input.id] = {
            name: e.target.value,
            completed: false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
});


