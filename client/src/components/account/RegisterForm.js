import React, {Component, useState} from 'react'

const RegisterForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {

  }

  return (
    <div className="register-form">
      <form>
        <div>
          <input
            name="username"
            className="input-field"
            required value={username}
            onChange={handleUsernameChange}
            placeholder="Username">
          </input>
        </div>
        <div>
          <input
            name="password"
            className="input-field"
            required value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password">
          </input>
        </div>
        <div className='registerform-button'>
          <button onClick={handleSubmit} className='button'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm