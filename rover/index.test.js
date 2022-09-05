const marsRover = require("./index");
const assert = require("assert");

describe("Mars Rover", () => {
  // TODO

  // - Empty string input returns rovers current coordinates and direction

  it("Empty string input returns rovers current coordinates and direction", () => {
    const initialPositionAndDirection = {
      position: [0, 0],
      direction: "east",
    };

    const rover = marsRover.move("");

    assert.deepEqual(initialPositionAndDirection, rover);
  });

  // - Any input that isn't "R, L, F, B" is ignored 🚀
  // - R, L, F, B are accepted
  // - Rover maintains initial position and direction when passed invalid inputs

  // - If rover starts facing east, "R" will face the rover to the south
  // - Rover can change direction right
  // - Rovers direction property has changed
  // - Rover is facing the correct direction from input

  // - Rover facing east with input "L" will face north
  // - Rover can change direction left
  // - Rovers direction property has changed
  // - Rover is facing the correct direction from input

  // - Rover at position [5, 6] facing east with input "F" will update position to [6, 6]
  // - Rover goes forward
  // - Rover can change position
  // - Rovers position updates correctly

  // - Rover at position [5, 6] facing east with input "B" will update position to [4, 6]
  // - Rover goes backwards
  // - Rover can change position
  // - Rovers position updates correctly

  // - Rover at position [5, 6] facing east with input "FF" will update position to [7, 6]
  // - Rover can move forward twice
  // - Rover moves position correctly given double input

  // - Rover at position [0, 0] facing east with input "B" will update position to [-1, 0]
  // - Rover can move to negative coordinates
  // - Rovers position updates correctly when moving to a negative value on the grid

  // - Rover at position [5, 6] facing east with input "LF" will update position to [5, 7]
  // - Rover can move and change direction
  // - Rover can both move and change direction from one set of inputs

  // - Rover at position [0, 0] facing east with input "RR" will update position to [0,0] facing: west
  // - Rover can change directions twice
  // - Two changes of direction are possible from one set of inputs

  // - Rover at position [5, 6] facing east with input "FLF" will update position to [6, 7]
  // - Rover can accept three inputs
  // - Three inputs can be handled by the rover

  // - Rover at position [5, 6] facing east with input "FYLXF" will update position to [6, 7]
});
