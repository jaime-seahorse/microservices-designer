module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
	"testMatch": [
    "**/*.steps.js"
  ],
}