const DIRECTION_LOOKUP = {
  north: {
    l: "west",
    r: "east",
  },
  east: {
    l: "north",
    r: "south",
  },
  south: {
    l: "east",
    r: "west",
  },
  west: {
    l: "south",
    r: "north",
  },
};

const POSITION_LOOKUP_Y = {
  north: {
    f: 1,
    b: -1,
  },
  south: {
    f: -1,
    b: 1,
  },
};

const POSITION_LOOKUP_X = {
  east: {
    f: 1,
    b: -1,
  },
  west: {
    f: -1,
    b: 1,
  },
};

function handleDirectionChange(currentDirection, instruction) {
  if (instruction == "r" || instruction == "l") {
    return DIRECTION_LOOKUP[currentDirection][instruction];
  }

  return currentDirection;
}

function getPositionChange(direction, instruction) {
  let xOffset = POSITION_LOOKUP_X[direction]?.[instruction] || 0;
  let yOffset = POSITION_LOOKUP_Y[direction]?.[instruction] || 0;

  return {
    xOffset,
    yOffset,
  };
}

function MarsRover(opts) {
  let _position = opts.position;
  let _direction = opts.direction;

  return {
    move: function (inputString) {
      for (let instruction of inputString) {
        _direction = handleDirectionChange(
          _direction,
          instruction.toLowerCase()
        );

        const { xOffset, yOffset } = getPositionChange(
          _direction,
          instruction.toLowerCase()
        );
        _position = [_position[0] + xOffset, _position[1] + yOffset];
      }
      return {
        position: _position,
        direction: _direction,
      };
    },
  };
}

module.exports = MarsRover;
