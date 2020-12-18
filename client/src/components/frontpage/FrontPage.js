import React, { Component } from 'react'

class FrontPage extends Component {

  render() {
    return (
      <div>
        <div>
          <p className='frontpage-title'>Welcome to JAFA</p>
          <div className='about'>
            This is an application created for the Fullstack Project course by University of Helsinki.
            More information can be found from the repository:
            <a className='source' href='https://github.com/ollikehy/jafa'> https://github.com/ollikehy/jafa</a>
          </div>
        </div>
      </div>
    )
  }
}

export default FrontPage