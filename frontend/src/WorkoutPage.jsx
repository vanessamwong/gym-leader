import { useState, useEffect } from 'react'
import WorkoutList from './WorkoutList'
import WorkoutForm from './WorkoutForm'
import './App.css'

function WorkoutPage() {
  const [workouts, setWorkouts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState({})

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    const response = await fetch("http://127.0.0.1:5000/workouts")
    const data = await response.json()
    setWorkouts(data.workouts)
    console.log(data.workouts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentWorkout({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (workout) => {
    if (isModalOpen) return
    setCurrentWorkout(workout)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchWorkouts()
  }

  return (
    <>
      <WorkoutList workouts={workouts} updateWorkout={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Add New Workout</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <WorkoutForm existingWorkout={currentWorkout} updateCallback={onUpdate}/>
        </div>
        </div>
        }
    </>
  )
}

export default WorkoutPage