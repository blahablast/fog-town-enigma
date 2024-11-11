'use client'

const Cell = ({ color }) => (
  <div className={`tetris-cell ${color ? color : 'empty-cell'}`}>
    {color && <div className="cell-inner"></div>}
  </div>
)

export default Cell
