(function () {
  console.log("Hello!");

  const constraintForm = document.getElementById("constraint-form");

  /**
   * The novalidate attribute is a boolean attribute.
   * Boolean attributes are true when they are present and false when they are absent.
   * Technically, the value can be anything, but the convention is
   * to use either an empty string or the attribute name as the value
   * (e.g., novalidate="novalidate").
   */
  constraintForm.setAttribute("novalidate", "");

  constraintForm.addEventListener("submit", function (e) {
    document
      .querySelectorAll(".js-validate")
      .forEach(updateValidationStateForInput);

    const formEl = e.target;
    const isFormValid = formEl.checkValidity();

    const isInterestsGroupValid = validateInterestsCheckboxGroup(formEl);

    if (!isFormValid || !isInterestsGroupValid) {
      e.preventDefault();
    }

    const firstInvalidInputEl = formEl.querySelector(
      "input:invalid, fieldset.is-invalid input"
    );
    firstInvalidInputEl?.focus();
  });

  function updateValidationStateForInput(inputEl) {
    // Check if the input is valid using the Constraint Validation API.
    const isInputValid = inputEl.checkValidity();

    // Handle optional fields that are empty
    if (!inputEl.required && inputEl.value === "" && isInputValid) {
      // isInputValid in condition here because of
      // Unexpectedly, number-type inputs will report empty
      // when you enter non-numeric values in Firefox
      // (long Mozilla discussion) and Safari.
      // This causes a mixed, incorrect visual validation state
      // where only the error renders, but the input won’t show the invalid state.
      // Adding the isInputValid check ensures the expected behavior.
      inputEl.classList.remove("is-valid", "is-invalid");
    } else {
      // Required fields: Toggle valid/invalid state classes
      inputEl.classList.toggle("is-valid", isInputValid);
      inputEl.classList.toggle("is-invalid", !isInputValid);
    }

    /**
     * When a field has aria-invalid set to “true”,
     * VoiceOver in Safari announces “invalid data” when
     * the field gets focus; JAWS and NVDA notify the error as an “invalid entry”.
     */
    inputEl.setAttribute("aria-invalid", (!isInputValid).toString());

    const errorEl = inputEl.nextElementSibling;
    // get error message from Constraint Validation API (localized browser-specific error message)
    errorEl.textContent = inputEl.validationMessage;
    errorEl.hidden = isInputValid;
  }

  /**
   * Validates the "interests" checkbox group.
   * Custom validation is required because checkbox group validation
   * is not supported by the browser's built-in validation features.
   */
  const validateInterestsCheckboxGroup = (formEl) => {
    // Are any of the "interests" checkboxes checked?
    // At least one is required.
    const formData = new FormData(formEl); // FormData API
    const isValid = formData.getAll("interests").length > 0;

    const interestsCheckboxInputEl = formEl.querySelectorAll(
      'input[name="interests"]'
    );

    // Update the validation UI state for each checkbox.
    interestsCheckboxInputEl.forEach((checkboxInputEl) => {
      checkboxInputEl.classList.toggle("is-valid", isValid);
      checkboxInputEl.classList.toggle("is-invalid", !isValid);
    });

    const legendErrorEl = document.getElementById("js-interests-legend-error");
    const visualErrorEl = document.getElementById("js-interests-visual-error");

    const errorMsg = isValid ? "" : "Select at least one interest.";
    legendErrorEl.textContent = errorMsg;
    visualErrorEl.textContent = errorMsg;

    visualErrorEl.hidden = isValid;

    return isValid;
  };

  document.querySelectorAll(".js-validate").forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      updateValidationStateForInput(event.target);
    });
    inputEl.addEventListener("blur", (event) => {
      updateValidationStateForInput(event.target);
    });

    // Firefox fix.
    // Input field values hang around after a page refresh. As I noticed it may not happen.
    // But it happens more or less frequently
    if (inputEl.value !== "") {
      updateValidationStateForInput(inputEl);
    }
  });

  constraintForm
    .querySelectorAll('input[name="interests"]')
    .forEach((checkboxInputEl) => {
      checkboxInputEl.addEventListener("change", function () {
        validateInterestsCheckboxGroup(constraintForm);
      });
      // Set up late validation for the checkbox group
      checkboxInputEl.addEventListener("blur", function (event) {
        const newActiveEl = event.relatedTarget;
        if (newActiveEl?.getAttribute("name") !== "interests") {
          validateInterestsCheckboxGroup(constraintForm);
        }
      });
    });
})();
