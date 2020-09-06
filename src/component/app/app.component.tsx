import React, { FC, useState, useEffect, useReducer, useRef, memo, useCallback } from 'react'
import { Button } from '../button'
import { TextInput } from '../text-input'
import { exerciseListReducer } from './app.reducer'
import { exerciseTypeMap, max } from './app.config'
import { speakMessage } from '../../util'
const MemoTextIput = memo(TextInput)
const MemoButton = memo(Button)
const App: FC = () => {
  const typeOfExercises = 'multiplication'
  const numberOfExercises = 3
  const [exerciseList, updateExerciseList] = useReducer(exerciseListReducer, [])

  const [showGenerateButton, setShowGenerateButton] = useState<Boolean>(true)
  const [showFinalResultButton, setShowFinalResultButton] = useState<Boolean>(false)
  const [showFinalResult, setShowFinalResult] = useState<Boolean|null>(false)
  const verifyRef = useRef<any>(null)

  useEffect(() => {
    const bool = exerciseList.length && exerciseList.every((prop: any) => prop.solutionLength) || false
    console.log(`showGenerateButton, showFinalResultButton`)
    console.log(showGenerateButton, showFinalResultButton, bool, exerciseList)
    !showGenerateButton && showFinalResultButton && speakMessage(`
      You've got ${exerciseList.filter((prop: any) => prop.valid).length} right and
      ${exerciseList.filter((prop: any) => !prop.valid).length} wrong.
    `)
    setShowFinalResultButton(bool)
}, [exerciseList])

  const handleGenerateExercises = () => {
    // generate exercises from an array of [numberOfExercises]
    const generatedExerciseList: any[] = [
      ...Array
        .from(
          { length: numberOfExercises },
          (_, k) => {
            const maxFirstNumber = Math.ceil(Math.random() * max[0])
            const maxSecondNumber = Math.ceil(Math.random() * max[1])

            let result = 0
            // if (typeOfExercises === 'addition') {
            //   result = maxFirstNumber + maxSecondNumber
            // }
            if (typeOfExercises === 'multiplication') {
              result = maxFirstNumber * maxSecondNumber
            }

            return {
              maxFirstNumber,
              maxSecondNumber,
              result,
              index: k,
              solution: null,
              solutionLength: 0,
              valid: false,
              typeOfExercises
            }
          }
        )
    ]

    updateExerciseList({
      type: 'INIT_LIST',
      list: generatedExerciseList
    })
    setShowGenerateButton(false)
  }

  const addToList = useCallback((key: number, ref: any) => {
    updateExerciseList({
      type: 'UPDATE_ITEM',
      item: { key, ref }
    })
  }, [])
  
  const handleOnKeyDown = (e: any, value: any) => {
    if (e.key === 'Enter') {
      const { dataset = 0 } = e.target
      const current = +dataset.id
      const next = current + 1

      if (exerciseList[next]) {
        exerciseList[next].ref.current.focus()
      } else if (verifyRef.current) {
        verifyRef.current.focus()
      }

      const { value } = exerciseList[current].ref.current

      updateExerciseList({
        type: 'UPDATE_SOLUTION',
        item: {
          key: current,
          solution: value
        }
      })
    }
  }

  const renderExerciseList = () => {
    return exerciseList
      .map(({ maxFirstNumber, maxSecondNumber, result, typeOfExercises, valid }: any, key: number) => {
        return (
          <div key={key} style={{
            backgroundColor: showFinalResult
              ? (valid ? 'green' : 'red') : 'transparent'
          }}>
            {maxFirstNumber} {exerciseTypeMap[typeOfExercises]} {maxSecondNumber} = <MemoTextIput
              index={key}
              addToList={addToList}
              onKeyDown={handleOnKeyDown}
            />
          </div>
        )
      })
  }

  const handleVerifyExercises = () => {
    setShowFinalResult(true)
  }

  return (
    <div>
      <h1>This is the App</h1>
      {!showGenerateButton && (
        <MemoButton
          label="Verify Exercise"
          onClick={handleVerifyExercises}
          disabled={!showFinalResultButton}
          forwardedRef={verifyRef}
        />
      )}
      {renderExerciseList()}
      {showGenerateButton && (
        <MemoButton
          label="Generate Exercise"
          onClick={handleGenerateExercises}
        />
      )}
    </div>
  )
}

export { App }
