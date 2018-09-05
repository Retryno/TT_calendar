import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Row.styl'
import { changeCeil } from 'store/date/actions'
import selectImg from './Images/select.png'

class Row extends Component {

  state = {
    columns: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    isAll: false
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.date.countOfClear !== nextProps.date.countOfClear) {
      let { columns } = this.state
      console.log(columns)
      for (let i = 0, l = columns.length; i < l; ++i) {
        columns[i] = 0
      }
      this.setState({isAll: false, columns})
    }
  }

  componentDidMount () {
    this.generateCeils()
  }

  generateCeils = () => {
    const { hoursArr } = this.props
    let { columns } = this.state
    hoursArr.forEach(({start, end}) => {
      for (let i = start; i <= end; i++) {
        columns[i] = 1
      }
    })
    this.sendToReducer(columns)
    this.setState({columns})
  }

  huinya () {
    let test = {}
    ;[...document.querySelectorAll('tr')].forEach(i => {
      test[i.innerText] = [...i.querySelectorAll('td')].filter(d => d.getAttribute('data-time') === '1' && d.getAttribute('data-time')).map(df => df.getAttribute('data-key'))
    })
    console.log(test)
  }

  onCeilClick = index => {
    let { columns } = this.state
    columns[index] = columns[index] === 1 ? 0 : 1
    this.sendToReducer(columns)
    this.setState({columns})
  }

  onAllDayClick = () => {
    let { isAll, columns } = this.state
    for (let i = 0, l = columns.length; i < l; ++i) {
      columns[i] = isAll ? 0 : 1
    }
    this.sendToReducer(columns)
    this.setState({isAll: !isAll, columns})
  }

  onCeilOver = (e, index) => {
    // this.huinya()
    if (e.buttons === 1) {
      this.onCeilClick(index)
    }
  }

  sendToReducer (columns) {
    this.props.dispatch(changeCeil(columns, this.props.name))
  }

  render () {
    const { name } = this.props
    let { columns, isAll } = this.state
    return (
      <tr>
        <td>{name}</td>
        <td onClick={this.onAllDayClick}>
          {isAll && <img src={selectImg} alt='no img' />}
        </td>
        {columns.map((hour, key) =>
          <td data-time={hour} data-key={key}
            onMouseDown={() => this.onCeilClick(key)}
            onMouseOver={e => this.onCeilOver(e, key)}
            key={key} className={hour && 'color-fill'} />)}
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  date: state.date
})
Row.propTypes = {
  name: PropTypes.string,
  hoursArr: PropTypes.any,
  date: PropTypes.any,
  dispatch: PropTypes.any
}
export default connect(mapStateToProps)(Row)
