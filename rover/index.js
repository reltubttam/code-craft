function MarsRover (opts) {
  let _position = opts.position;
  let _direction = opts.direction;

  return {
    move: function (inputString) {
      for (let instruction of inputString) {
        if (instruction == 'R') {
          _direction = 'south';
        } else if (instruction == 'L') {
          _direction = 'north';
        } else if (instruction == 'F') {
          _position = [++_position[0],6];
        } else if (instruction == 'B') {
          _position = [--_position[0],6]
        }
      }
      return {
        position: _position,
        direction: _direction,
      };
    },
  }
};


module.exports = MarsRover;
