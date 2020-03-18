import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class Exercises extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    //this.props.fetchExercises()
  }

  render() {
    return (
      <div className='container'>
        <Link className='linkbutton' to='/exercise/new'>Add a new exercise</Link>
        <div>List of all exercises</div>
      </div>
    )
  }
}

export default Exercises