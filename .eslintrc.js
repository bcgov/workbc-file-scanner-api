const prettierConfig = require("./.prettierrc")

module.exports = {
    extends: ["elmsd"],
    parserOptions: { ecmaVersion: 2020 },
    rules: {},
    ignorePatterns: ["**/dist/**/*.js"]
}
