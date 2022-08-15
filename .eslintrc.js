const prettierConfig = require("./.prettierrc")

module.exports = {
    extends: ["elmsd"],
    parserOptions: { ecmaVersion: 2020 },
    rules: {
        "prettier/prettier": ["error", prettierConfig]
    },
    ignorePatterns: ["**/dist/**/*.js"]
}
