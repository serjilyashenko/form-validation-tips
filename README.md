# Form validation repo

My experiments based on the cloud4 series of articles:

- [Part 1: HTML and CSS](https://cloudfour.com/thinks/progressively-enhanced-form-validation-part-1-html-and-css/)
- [Part 2: Layering in JavaScript](https://cloudfour.com/thinks/progressively-enhanced-form-validation-part-2-layering-in-javascript/)

### Notes:

- includes browswer build in constraint validation
- includes @supports to make `:user-invalid/:user-valid` progressive enhancement for chrome (chrome doesn't supports them (on 2023-09-09))
- no_js/js cases: `<body data-js-enabled='false'>` approach. If js is enabled, `:user-valid/:user-invalid` and `:valid/:invalid` are ignored
- `novalidate` form attribute to disable browser build in constraint validation (disables validation and error messages. But :valid/:invalid styling is still applied 🤷🏼‍♂️)
- `real-time` and `late` validation but `late` validation is generally always better ([Live validation UX](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/))
- includes :has pseudoclass test

```css
@supports (selector(:has(input))) {
  .field-wrapper:has(input:required) label:after {
    content: "*";
  }
}
```

- custom “error” element (a paragraph tag after each .js-validate input).
  - The “error” element should have a hidden attribute so it is not displayed by default
  - The input should have an `aria-describedby` attribute with the ID of the “error” element so assistive technologies can convey validation feedback to users when the input is in focus.
  - errors gets a messages from Constraint Validation API (localized browser-specific error message)
