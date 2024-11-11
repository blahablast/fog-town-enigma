'use client'

const Cell = ({ color }) => {
  console.log('rendering cell with color:', color)
  return (
    <div
      className={`w-8 h-8 border border-opacity-10 border-white ${
        color ? color : 'bg-gray-800'
      }`}
    />
  )
}

export default Cell
