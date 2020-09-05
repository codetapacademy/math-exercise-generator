import React, { FC, useState, useEffect, useReducer } from 'react'
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

      default:
      return state
  }
}

const App: FC = () => {
  const typeOfExercises = 'addition'
  const numberOfExercises = 5
  const [exerciseList, updateExerciseList] = useReducer(exerciseListReducer, [])

  const [showGenerateButton, setShowGenerateButton] = useState<Boolean>(true)
  const min = [0, 0]
  const max = [
    10, // index 0
    15, // index 1
    16, // index 2
    22, // index 3
    3 // index 4
  ]

  useEffect(() => {
    console.log(`exerciseList`)
    console.log(exerciseList)
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
      console.info(`Try to focus next one`)
      console.log(exerciseList, value)
      const { dataset = 222 } = e.target
      console.log(dataset.id)
      
      console.log(`exerciseList[dataset.id + 1].ref.current.focus()`)
      console.log(exerciseList[dataset.id])
      console.log(exerciseList[+dataset.id + 1])

      if (exerciseList[+dataset.id + 1]) {
        exerciseList[+dataset.id + 1].ref.current.focus()
      }
    }
  }

  const renderExerciseList = () => {
    console.log(exerciseList)
    return exerciseList
      .map(({ maxFirstNumber, maxSecondNumber, result, typeOfExercises }: any, key: number) => {
        return (
          <div key={key}>
            {maxFirstNumber} {exerciseTypeMap[typeOfExercises]} {maxSecondNumber} = <TextInput
              index={key}
              addToList={addToList}
              onKeyDown={handleOnKeyDown}
            />
            <small>{result}</small>
          </div>
        )
      })
  }

  const handleVerifyExercises = () => {
    console.log(`We're supposed to do an algo rithm :) to check if all results are valid or invalid and mark them as such`)
  }

  return (
    <div>
      <h1>This is the App</h1>
      {!showGenerateButton && (
        <Button
          label="Verify Exercise"
          onClick={handleVerifyExercises}
          disabled={true}
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
