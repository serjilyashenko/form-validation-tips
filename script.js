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
    e.preventDefault();
    console.log(">> submit");
  });

  function updateValidationStateForInput(inputEl) {
    // Check if the input is valid using the Constraint Validation API.
    const isInputValid = inputEl.checkValidity();

    // For the case when a browser doesn't support :user-valid/:user-invalid
    inputEl.classList.toggle("is-valid", isInputValid);
    inputEl.classList.toggle("is-invalid", !isInputValid);

    /**
     * When a field has aria-invalid set to “true”,
     * VoiceOver in Safari announces “invalid data” when
     * the field gets focus; JAWS and NVDA notify the error as an “invalid entry”.
     */
    inputEl.setAttribute("aria-invalid", (!isInputValid).toString());
  }

  document.querySelectorAll(".js-validate").forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      updateValidationStateForInput(event.target);
    });
    inputEl.addEventListener("blur", (event) => {
      updateValidationStateForInput(event.target);
    });
  });
})();
