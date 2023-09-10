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
  // constraintForm.setAttribute("novalidate", "");

  constraintForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(">> submit");
  });
})();
