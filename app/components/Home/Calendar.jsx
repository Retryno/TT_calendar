import React, { Component } from 'react'
import { clearNotice } from 'store/date/actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Row from './Row/Row.jsx'
import './Home.styl'

const defaultData = {
  'mo': [],
  'tu': [],
  'we': [],
  'th': [],
  'fr': [],
  'sa': [],
  'sy': []
}

class Calendar extends Component {

  buttonClick = () => {
    this.props.dispatch(
      clearNotice()
    )
  }

  round (value) {
    return Math.ceil(value / 60)
  }

  generateArrayOfHours (arr) {
    let newArr = []
    arr.forEach(({ bt, et }) => {
      newArr.push({
        start: this.round(bt),
        end: this.round(et)
      })
    })
    return newArr
  }

  generateDayData (points) {
    let newArr = []
    let bt = null
    let et = null
    let newPoints = []
    for (let i = 0; i < points.length; i++) {
      newPoints.push(points[i] ? 'y' : 'n')
    }
    newPoints.forEach((point, index) => {
      if (point === 'y' && bt === null) {
        bt = index
      }
      if (point === 'n' && bt !== null) {
        et = index - 1
        newArr.push({bt: (bt * 60), et: (et * 60)})
        bt = null
        et = null
      }
      if (bt !== null && index === (newPoints.length - 1)) {
        et = 23
        newArr.push({bt: (bt * 60), et: (et * 60)})
        bt = null
        et = null
      }
    })
    return newArr
  }

  saveJSON = () => {
    let endJSON = {}
    const { allData } = this.props.date
    for (let day in allData) {
      endJSON[day] = this.generateDayData(allData[day])
    }
    localStorage.setItem('date', JSON.stringify(endJSON))
    alert('All is saved')
  }

  __renderHeaderColumn () {
    let hedaer = []
    let counter = 0
    hedaer.push(<td />)
    hedaer.push(<td />)
    for (let i = 0; i <= 23; i++) {
      hedaer.push(<td>{counter === 3 ? `${i}:00` : ''}</td>)
      if (counter === 3) {
        counter = 0
      }
      counter++
    }
    return <tr>{hedaer}</tr>
  }

  __renderRows () {
    let dataFromJSON = JSON.parse(localStorage.getItem('date')) || defaultData
    return Object.keys(dataFromJSON).map((day, key) => {
      const hoursArr = this.generateArrayOfHours(dataFromJSON[day])
      return <Row hoursArr={hoursArr} name={day} key={key} />
    })
  }

  render () {
    return (
      <div className='Calendar'>
        <table>
          <tbody>
            {this.__renderHeaderColumn()}
            {this.__renderRows()}
          </tbody>
        </table>
        <button onClick={this.buttonClick}>Clear</button>
        <button onClick={this.saveJSON}>Save Changes</button>
      </div>
    )
  }
}

Calendar.propTypes = {
  dispatch: PropTypes.any,
  date: PropTypes.any
}

const mapStateToProps = state => ({
  date: state.date
})

export default connect(mapStateToProps)(Calendar)
