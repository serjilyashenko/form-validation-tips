(function () {
  console.log("Hello!");

  const constraintForm = document.getElementById("constraint-form");

  constraintForm.setAttribute("novalidate", "");

  constraintForm.addEventListener("submit", function (e) {
    e.stopPropagation();
    console.log(">> submit");
  });
})();
