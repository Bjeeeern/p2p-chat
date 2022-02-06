require("mocha/mocha.css");

const mocha = require("mocha/mocha-es2018");

mocha.setup("bdd");
mocha.checkLeaks();

const context = require.context(
  "../src", // Root directory
  true, // Recursive
  /.\.spec\.[m]js$/ // Test pattern
);

// Require each within build
context.keys().forEach(context);

mocha.run();
