const registrationForm = document.getElementById("registration-form");
const submitButton = document.getElementById("submit-button");
const registrationsTable = document.getElementById("table");
const bioInput = document.getElementById("bio");
const bioCounter = document.getElementById("bio-counter");
const bioWarning = document.getElementById("bio-warning");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password")
};
const touchedFields = new Set();

function getFieldError(fieldName) {
    const field = fields[fieldName];
    const value = field.value.trim();

    if (fieldName === "name" && !value) {
        return "Name is required.";
    }

    if (fieldName === "email") {
        if (!value) {
            return "Email is required.";
        }
        if (!field.validity.valid) {
            return "Enter a valid email address.";
        }
    }

    if (fieldName === "password" && field.value.length < 6) {
        return "Password must be at least 6 characters.";
    }

    return "";
}

function updateValidation() {
    let formIsValid = true;

    Object.keys(fields).forEach((fieldName) => {
        const errorMessage = getFieldError(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        const shouldShowError = touchedFields.has(fieldName) && errorMessage;

        errorElement.textContent = shouldShowError ? errorMessage : "";
        fields[fieldName].setAttribute("aria-invalid", shouldShowError ? "true" : "false");
        formIsValid = formIsValid && !errorMessage;
    });

    const bioIsValid = bioInput.value.length <= 200;
    submitButton.disabled = !(formIsValid && bioIsValid);
    bioCounter.textContent = `${bioInput.value.length} / 200 characters`;
    bioCounter.classList.toggle("limit-reached", bioInput.value.length === 200);
    bioWarning.textContent = bioInput.value.length === 200 ? "Character limit reached." : "";
}

Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener("input", () => {
        touchedFields.add(fieldName);
        updateValidation();
    });
});

bioInput.addEventListener("input", updateValidation);

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    Object.keys(fields).forEach((fieldName) => touchedFields.add(fieldName));
    updateValidation();

    if (submitButton.disabled) {
        return;
    }

    const row = document.createElement("tr");
    [fields.name.value.trim(), fields.email.value.trim(), bioInput.value.trim()].forEach((value, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        cell.className = "px-6 py-4";
        cell.textContent = value;

        if (index === 0) {
            cell.scope = "row";
        }

        row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    actionCell.className = "px-6 py-4";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "font-medium text-fg-brand hover:underline";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => row.remove());
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    registrationsTable.appendChild(row);

    registrationForm.reset();
    touchedFields.clear();
    updateValidation();
});

updateValidation();
