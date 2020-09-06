export const exerciseListReducer = (state: any[] = [], action: any): any[] => {
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
