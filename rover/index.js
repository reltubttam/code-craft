function MarsRover (opts) {
  let position = opts.position;
  let direction = opts.direction;

  return {
    position,
    direction,
    move: function (inputString) {
      if (inputString == 'R') {
        direction = 'south';
      } else if (inputString == 'L') {
        direction = 'north';
      }
      return {
        position,
        direction,
      };
    },
  }
};


module.exports = MarsRover;
