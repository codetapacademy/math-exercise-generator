import React, { FC, useState, useEffect, useReducer, useRef } from 'react'
import { Button } from '../button'
import { TextInput } from '../text-input'
const exerciseTypeMap: any = {
  addition: '+',
  multiplication: '×',
}

const exerciseListReducer = (state: any[] = [], action: any) => {
  switch(action.type) {
    case 'INIT_LIST':
      return action.list

    case 'UPDATE_ITEM':
      return state.map((exercise, index) => {
        return index === action.item.key
        ? ({
          ...exercise,
          ref: action.item.ref
        })
        : exercise
      })

    case 'UPDATE_SOLUTION':
      return state.map((exercise, index) => {
        return index === action.item.key
        ? ({
          ...exercise,
          solution: action.item.solution,
          solutionLength: String(action.item.solution).length,
          valid: +action.item.solution === exercise.result
        })
        : exercise
      })

      default:
      return state
  }
}

const App: FC = () => {
  const typeOfExercises = 'addition'
  const numberOfExercises = 5
  const [exerciseList, updateExerciseList] = useReducer(exerciseListReducer, [])

  const [showGenerateButton, setShowGenerateButton] = useState<Boolean>(true)
  const [showFinalResultButton, setShowFinalResultButton] = useState<Boolean>(false)
  const [showFinalResult, setShowFinalResult] = useState<Boolean|null>(false)
  const verifyRef = useRef<any>(null)

  const min = [0, 0]
  const max = [
    10, // index 0
    15, // index 1
    16, // index 2
    22, // index 3
    3 // index 4
  ]

  useEffect(() => {
    const bool = exerciseList.every((prop: any) => prop.solutionLength)
    setShowFinalResultButton(bool)
}, [exerciseList])

  const buttonPropList = {
    label: 'Generate exercise'
  }

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
            if (typeOfExercises === 'addition') {
              result = maxFirstNumber + maxSecondNumber
            }
            else if (typeOfExercises === 'multiplication') {
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

  const addToList = (key: number, ref: any) => {
    updateExerciseList({
      type: 'UPDATE_ITEM',
      item: { key, ref }
    })
  }
  
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
    console.log(exerciseList)
    return exerciseList
      .map(({ maxFirstNumber, maxSecondNumber, result, typeOfExercises, valid }: any, key: number) => {
        return (
          <div key={key} style={{
            backgroundColor: showFinalResult
              ? (valid ? 'green' : 'red') : 'transparent'
          }}>
            {maxFirstNumber} {exerciseTypeMap[typeOfExercises]} {maxSecondNumber} = <TextInput
              index={key}
              addToList={addToList}
              onKeyDown={handleOnKeyDown}
            />
            {showFinalResult && <small>{result}</small>}
          </div>
        )
      })
  }

  const handleVerifyExercises = () => {
    setShowFinalResult(true)
    console.log(`We're supposed to do an algo rithm :) to check if all results are valid or invalid and mark them as such`)
  }

  return (
    <div>
      <h1>This is the App</h1>
      {!showGenerateButton && (
        <Button
          label="Verify Exercise"
          onClick={handleVerifyExercises}
          disabled={!showFinalResultButton}
          ref={verifyRef}
        />
      )}
      {renderExerciseList()}
      {showGenerateButton && (
        <Button
          label="Generate Exercise"
          onClick={handleGenerateExercises}
        />
      )}
    </div>
  )
}

export { App }
