module.exports = {
    verbose: true,
    errorOnDeprecated: true,
    setupFiles: ["./jestsetup.js"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        }
    }
}