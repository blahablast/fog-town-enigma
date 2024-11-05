'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  completePuzzleAsync,
  updateScore,
  selectCurrentPuzzle
} from '../store/gameSlice'
import {
  increaseFog,
  decreaseFog,
  selectFogLevel,
  selectCurrentFogEffect
} from '../store/fogSlice'
import { getPuzzle, isPuzzleAvailable } from '../lib/puzzles'
import { GAME_SETTINGS } from '../lib/constants'

export default function Game() {
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [currentPuzzle, setCurrentPuzzle] = useState(null)

  const dispatch = useDispatch()

  // Get state from both slices
  const currentPuzzleId = useSelector(selectCurrentPuzzle)
  const fogLevel = useSelector(selectFogLevel)
  const currentFogEffect = useSelector(selectCurrentFogEffect)

  useEffect(() => {
    const puzzle = getPuzzle(currentPuzzleId)
    if (puzzle && isPuzzleAvailable(currentPuzzleId, fogLevel)) {
      setCurrentPuzzle(puzzle)
      setUserAnswer('')
      setShowHint(false)
    }
  }, [currentPuzzleId, fogLevel])

  const handleHintRequest = () => {
    setShowHint(true)
    // Use fog-specific action
    dispatch(increaseFog(GAME_SETTINGS.HINT_COST))
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault()

    try {
      const resultAction = await dispatch(
        completePuzzleAsync({
          puzzleId: currentPuzzleId,
          answer: userAnswer,
          hintsUsed: showHint
        })
      ).unwrap()

      if (resultAction.success) {
        dispatch(
          updateScore(
            showHint
              ? GAME_SETTINGS.SCORE_WITH_HINT
              : GAME_SETTINGS.SCORE_WITHOUT_HINT
          )
        )

        // Handle fog effect based on puzzle completion
        if (currentPuzzle.fogImpact.change > 0) {
          dispatch(increaseFog(currentPuzzle.fogImpact.change))
        } else {
          dispatch(decreaseFog(Math.abs(currentPuzzle.fogImpact.change)))
        }
      }
    } catch (err) {
      console.error('Failed to complete puzzle:', err)
    }
  }

  return (
    <div className={`game-container p-6 ${currentFogEffect.visibility}`}>
      {/* Rest of the JSX */}
    </div>
  )
}
