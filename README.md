# eslint-plugin-fullfilename

Eslint plugin that allow to verrify that all the files full path match a naming convention.

## How to use

```console
  $ npm install eslint-plugin-fullfilename --save-dev
```

OR

```console
  $ yarn add -D eslint-plugin-fullfilename
```

Then in `.eslintrc`

```json
"plugins": [
    "fullfilename"
  ],
  "rules": {
    "fullfilename/match-regex": [2, [
      {"regexp": "SOME_REGEXP"}
    ]]
  }
```
## Documentation
 - The rules are evaluated from top to bottom.
   Once one of the rule is matched no other rule is checked.

 - To be considered a problem, a file name must not match any regexp or match one that uses `failOnMatch` [*see exemples*](#Fail-on-match)

 - All regexps are validated against the full path from the root of the file system.\
  ie: `/users/me/my-code/my-project/src/myFile.js`

  - Only files that are validated be eslint are checked


## Exemples

### Multiple rules

```json
"plugins": [
    "fullfilename"
  ],
  "rules": {
    "fullfilename/match-regex": [2, [
      {"regexp": "SOME_REGEXP"},
      {"regexp": "SOME_OTHER_REGEXP"}
    ]]
 }
 ```

### Fail on match
You can instruct the plugin to treat a match as an error

 ```json
"plugins": [
    "fullfilename"
  ],
  "rules": {
    "fullfilename/match-regex": [2, [
      {
        "regexp": "SOME_REGEXP",
        "failOnMatch": true
      },
    ]]
 }
 ```

 You can also specify an error message when using `failOnMatch`
 ```json
"plugins": [
    "fullfilename"
  ],
  "rules": {
    "fullfilename/match-regex": [2, [
      {
        "regexp": "SOME_REGEXP",
        "failOnMatch": true,
        "message": "the file {{name}} does not respect the rules"
      },
    ]]
 }
 ```

