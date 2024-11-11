export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20
export const TICK_SPEED = 1000

export const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'piece-I'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'piece-O'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'piece-T'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'piece-S'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'piece-Z'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'piece-J'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'piece-L'
  }
}
