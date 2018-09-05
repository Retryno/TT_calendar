import * as types from './actionTypes'

export const clearNotice = () => dispatch => {
  dispatch({type: types.CLEAR_NOTICE})
}

export const changeCeil = (column, name) => dispatch => {
  dispatch({
    type: types.CHANGE_CEIL,
    payload: {column, name}
  })
}
