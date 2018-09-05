import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  countOfClear: 0,
  allData: {
    'mo': new Array(24),
    'tu': new Array(24),
    'we': new Array(24),
    'th': new Array(24),
    'fr': new Array(24),
    'sa': new Array(24),
    'sy': new Array(24)
  }
})
export default (state = initialState, action = {}) => {
  const obj = {
    [types.CLEAR_NOTICE]: () => {
      let { allData } = state
      let arr = {...allData}
      for (let day in arr) {
        arr[day] = new Array(24)
      }
      return state.merge({
        countOfClear: state.countOfClear + 1,
        allData: arr
      })
    },
    [types.CHANGE_CEIL]: () => {
      const { column, name } = action.payload
      let { allData } = state
      let arr = {...allData}
      arr[name] = column
      return state.merge({allData: arr})
    }
  }
  const a = obj[action.type]
  return a ? a() : state
}
