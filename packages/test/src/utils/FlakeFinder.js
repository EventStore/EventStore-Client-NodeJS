const Sequencer = require("@jest/test-sequencer").default;

class FlakeFinder extends Sequencer {
  sort(tests) {
    return tests.reduce(
      (acc, test) => [...acc, ...Array.from({ length: 100 }, () => test)],
      []
    );
  }
}

module.exports = FlakeFinder;
