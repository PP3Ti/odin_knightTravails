const Move = (row, col, dist) => {
  return {
    row,
    col,
    dist,
    posString() {
      return `${this.row}, ${this.col}`
    }
  }
}
const createBoard = (boardSize) => {
  let validNodes = []

  for (let i = 1; i < boardSize + 1; i++) {
    for (let j = 1; j < boardSize + 1; j++) {
      validNodes.push(Move(i, j))
    }
  }
  return validNodes
}
const chessBoard = createBoard(8)

const offsets = [ [1, 2],
                  [2, 1],
                  [2, -1],
                  [1, -2],
                  [-1, -2],
                  [-2, -1],
                  [-2, 1],
                  [-1, 2] ]

function findPossibleMoves(Pos, offsets) {
  let result = []
  const limit = chessBoard.at(-1).col
  offsets.forEach(offset => {
      Pos.row += offset[0]
      Pos.col += offset[1]
      if ((Pos.row <= limit && Pos.row >= 1) && (Pos.col <= limit && Pos.col >= 1)) {
        result.push(Move(Pos.row, Pos.col, Pos.dist + 1))
      }
      Pos.row -= offset[0]
      Pos.col -= offset[1]
  })
  return result
}

const knightMoves = ([startX, startY], [goalX, goalY]) => {
  const queue = []
  const startPos = Move(startX, startY, 0)
  queue.push(startPos)

  const visited = new Set()

  while (queue.length > 0) {
    //remove move from queue
    const move = queue.shift()
    // process move
    if (move.row === goalX && move.col === goalY) {
      return move.dist
    }
    visited.add(move.posString())

    // add neighbours
    const possibleMoves = findPossibleMoves(move, offsets)
    for (const move of possibleMoves) {
      if (visited.has(move.posString())) {
        continue
      }
      queue.push(move)
    }
  }
}

console.log(knightMoves([1, 3], [8, 8]))