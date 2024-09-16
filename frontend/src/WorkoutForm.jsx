import { useState } from "react";

const WorkoutForm = ({ existingWorkout = {}, updateCallback }) => {
    const [date, setDate] = useState(existingWorkout.date || "")
    const [target, setTarget] = useState(existingWorkout.target || "")
    const [intensity, setIntensity] = useState(existingWorkout.intensity || "")
    const [notes, setNotes] = useState(existingWorkout.notes || "")

    const updating = Object.entries(existingWorkout).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            date,
            target,
            intensity,
            notes,
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_workout/${existingWorkout.id}` : "create_workout")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="Date">Date:</label>
                <input 
                    type="date" 
                    id="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="target">Target:</label>
                <input 
                    type="text" 
                    id="target" 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="Intensity">Intensity:</label>
                <input 
                    type="text" 
                    id="intensity" 
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="Notes">Notes:</label>
                <input 
                    type="text" 
                    id="notes" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    />
            </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    )
}

export default WorkoutForm