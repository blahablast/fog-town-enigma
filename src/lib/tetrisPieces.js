export const PIECES = {
  I: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ], // Horizontal
    [
      [1, -1],
      [1, 0],
      [1, 1],
      [1, 2]
    ] // Vertical
  ],
  O: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1]
    ] // Single rotation (square shape)
  ],
  T: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1]
    ], // T shape down
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 1]
    ], // T shape left
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ], // T shape up
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2]
    ] // T shape right
  ],
  L: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1]
    ], // L shape down
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 0]
    ], // L shape left
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1]
    ], // L shape up
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2]
    ] // L shape right
  ],
  J: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0]
    ], // J shape down
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0]
    ], // J shape left
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [0, 0]
    ], // J shape up
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2]
    ] // J shape right
  ],
  Z: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1]
    ], // Z shape horizontal
    [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 2]
    ] // Z shape vertical
  ],
  S: [
    [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0]
    ], // S shape horizontal
    [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 2]
    ] // S shape vertical
  ]
}
