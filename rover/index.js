const marsRover = {
  position: [0, 0],
  direction: "east",
  move: function (inputString) {
    return {
      position: this.position,
      direction: this.direction,
    };
  },
};

module.exports = marsRover;
