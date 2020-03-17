import React, {Component} from 'react'

export class ExerciseMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOpen: false
    }
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    })
  }

  render() {
    const {listOpen} = this.state

    return (
      <div className='dropdown-wrapper'>
        <div className='dropdown-header' onClick={this.toggleList}>
          Exercises
        </div>
        {listOpen && <div className='dropdown-content'>
          <p className='dropdown-item'>All exercises</p>
          <p className='dropdown-item'>Add exercise</p>
        </div>}
      </div>
    )
  }
}

export default ExerciseMenu