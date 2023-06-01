const Move = (row, col, dist, path = []) => {
  return {
    row,
    col,
    dist,
    posString() {
      return `${this.row}, ${this.col}`
    },
    path
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
        result.push(Move(Pos.row, Pos.col, Pos.dist + 1, Pos.path.concat([Pos])))
      }
      Pos.row -= offset[0]
      Pos.col -= offset[1]
  })
  return result
}

const knightMoves = ([startX, startY], [goalX, goalY]) => {
  const limit = chessBoard.at(-1).col
  if (startX > limit || startX < 1 || startY > limit || startY < 1 || goalX > limit || goalX < 1 || goalY > limit || goalY < 1) {
    console.log('valid inputs are [(1-8), (1-8)], [(1-8), (1-8)]')
    return
  }
  const queue = []
  const startPos = Move(startX, startY, 0, [])
  queue.push(startPos)

  const visited = new Set()

  while (queue.length > 0) {
    //remove move from queue
    const move = queue.shift()
    // process move
    if (move.row === goalX && move.col === goalY) {
      let finalPath = []
      move.path.forEach(move => {
        finalPath.push(`[${move.row}, ${move.col}]`)
      })
      finalPath.push(`[${goalX}, ${goalY}]`)
      console.log(`The distance from [${startX}, ${startY}] to [${goalX}, ${goalY}] is ${move.dist} moves`)
      console.log('The moves are:')
      for (let i = 0; i < finalPath.length; i++) {
        if (i === finalPath.length-1) {
          return
        }
        console.log(`${finalPath[i]} ==> ${finalPath[i+1]}`)
      }
      return
    }
    visited.add(move.posString())

    // add neighbours
    const possibleMoves = findPossibleMoves(move, offsets)
    for (const possibleMove of possibleMoves) {
      if (visited.has(possibleMove.posString())) {
        continue
      }
      queue.push(possibleMove)
    }
  }
}
knightMoves([8, 1], [7, 5])