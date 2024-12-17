module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{test.ts,test.tsx}", // adjust this pattern to match your files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js",
  },
  testEnvironment: "jsdom",
};
