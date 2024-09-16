import React from "react"

const WorkoutList = ({ workouts, updateWorkout, updateCallback }) => {

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toISOString().split('T')[0]
    }

    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_workout/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }
    return <div>
        <h2>My Workouts</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Target</th>
                    <th>Intensity</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map((workout) => {
                    return (
                        <tr key={workout.id}>
                            <td>{formatDate(workout.date)}</td>
                            <td>{workout.target}</td>
                            <td>{workout.intensity}</td>
                            <td>
                                <button onClick={() => updateWorkout(workout)}>Update</button>
                                <button onClick={() => onDelete(workout.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
}

export default WorkoutList