import React from 'react'

const WorkoutFormContent = ({ currentExercise, exercises, state, handleChange, handleExerciseChange, addExerciseToState }) => {

    return (
        <div className='workout-form-exercise-form'>
            <select id='exerciselist' defaultValue='Choose exercise' className='workout-form-select' value={currentExercise.name} onChange={handleExerciseChange}>
                <option defaultValue disabled hidden>Choose exercise</option>
                {exercises && exercises.map((exercise, idx) => (
                    <option key={idx}>{exercise.name}</option>
                ))}
            </select>
            {currentExercise.weightExercise &&
                <div className='workout-form-weightform'>
                    <input id='sets'
                        type='number'
                        name='sets'
                        onChange={handleChange}
                        value={state.sets}
                        placeholder='Sets' 
                        className='workout-exercise-input'
                        />
                    <input id='reps'
                        type='number'
                        name='reps'
                        onChange={handleChange}
                        value={state.reps}
                        placeholder='Repetitions' 
                        className='workout-exercise-input'
                        />
                    <input id='weight'
                        type='number'
                        name='weight'
                        onChange={handleChange}
                        value={state.weight}
                        placeholder='Weight (kg)' 
                        className='workout-exercise-input'
                        />
                </div>}
            {currentExercise.timedExercise &&
                <div>
                    <input id='time'
                        type='number'
                        name='time'
                        onChange={handleChange}
                        value={state.time}
                        placeholder='time (min)' 
                        className='workout-exercise-input'
                        />
                </div>}
            {currentExercise.distanceExercise &&
                <div>
                    <input id='distance'
                        type='number'
                        name='distance'
                        onChange={handleChange}
                        value={state.distance}
                        placeholder='distance (m)' 
                        className='workout-exercise-input'
                        />
                </div>}
            {currentExercise !== '' && <button id='add-exercise-button' onClick={addExerciseToState}>Add</button>}
        </div>
    )
}

export default WorkoutFormContent