ember-formatjs
==============================================================================

What it does?
------------------------------------------------------------------------------
Ast plugin replaces x helper with t helper.
{{x "example text" "example description"}}
{{t "key from formatjs}}

options in ember-cli-build
------------------------------------------------------------------------------
Custom idInterpolationPattern can be set in ember-cli-build if needed. It should be the same pattern used for en-en.json extraction.

let app = new EmberApp(defaults, {
  'ember-formatjs': {
    idInterpolationPattern: '[sha512:contenthash:base64:6]', //this interpolation pattern is default
  },
});



[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-formatjs
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
