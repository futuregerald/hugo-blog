# theme-default

## 流程

### compile:less

`src/styles/*.less` => `gulp-less` => `src/styles/_less`

### compile:css

`src/*.css` => `postcss` =>`distPath`

#### postcss

*   postcss-partial-import
*   postcss-css-reset
*   saladcss-bem
*   postcss-cssnext
*   postcss-inline-svg
*   postcss-px2rem ( optional )

#### distPath

distPath ( optional )

### copy:assets

`src/assets` => `distPath/assets`

#### assetsPath

allways `./assets`
