// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',    // extends defines the preset that we want to use, in this case, it is standard
  // required to lint *.vue files
  // plugins contains the eslint plugins that we want to use
  // Here, the html plugin is used, which lets us link javascript code that lives within html and is also used to link the code that lives with .vue files
  plugins: [ 
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //'no-unused-vars': 1   // this rule has 3 states - error, warn and off
    // to disable the rule, set it to off. Instead of using words, we can also use the integer equivalents - 0 for error, 1 for warnings, and 2 for off
    // 1 displays it as a warning in the console
    // To set the rules conditionally, so that it awakens the right action for development, and production
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,    // display an error, if it is used in production, (i.e. 2) or display a warning, if it is used in development (i.e. 1)
    // if you want to disable eslint, you can remove the eslint loader from the webpack configuration, this can be found in build -> webpack.base.conf.js
    // "indent": ["error", 4],
  }
}
