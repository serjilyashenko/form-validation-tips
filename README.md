# Form validation repo

My experiments based on the cloud4 series of articles:

- [Part 1: HTML and CSS](https://cloudfour.com/thinks/progressively-enhanced-form-validation-part-1-html-and-css/)
- [Part 2: Layering in JavaScript](https://cloudfour.com/thinks/progressively-enhanced-form-validation-part-2-layering-in-javascript/)

### Notes:

- includes browswer build in constraint validation
- includes @supports to make `:user-invalid/:user-valid` progressive enhancement for chrome (chrome doesn't supports them (on 2023-09-09))
- no_js/js cases: `<body data-js-enabled='false'>` approach. If js is enabled, `:user-valid/:user-invalid` and `:valid/:invalid` are ignored
- `novalidate` form attribute to disable browser build in constraint validation (disables validation and error messages. But :valid/:invalid styling is still applied 🤷🏼‍♂️)
