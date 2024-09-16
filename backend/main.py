from flask import request, jsonify
from config import app, db
from models import Workout
from datetime import datetime

POKEMONAPI = "https://pokeapi.co/api/v2/pokemon"

@app.route("/workouts", methods=["GET"])
def get_workouts():
    workouts= Workout.query.all()
    json_workouts = list(map(lambda x: x.to_json(), workouts))
    return jsonify({"workouts": json_workouts})

@app.route("/create_workout", methods=["POST"])
def create_workout():
    date = datetime.strptime(request.json.get("date"), "%Y-%m-%d").date()
    target = request.json.get("target")
    intensity = request.json.get("intensity")
    notes = request.json.get("notes")

    if not date or not target or not intensity:
        return jsonify({"message": "You must fill in all required information to log a workout!"}), 400
    
    new_workout = Workout(date=date, target=target, intensity=intensity, notes=notes)
    try:
        db.session.add(new_workout)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Workout session logged!"}), 201

@app.route("/update_workout/<int:workout_id>", methods=["PATCH"])
def update_workout(workout_id):
    workout = Workout.query.get(workout_id)

    if not workout:
        return jsonify({"message": "Workout not found"}), 404
    
    data = request.json
    workout.date = datetime.strptime(data.get("date", workout.date), "%Y-%m-%d").date()
    workout.target = data.get("target", workout.target)
    workout.intensity = data.get("intensity", workout.intensity)
    workout.notes = data.get("notes", workout.notes)

    db.session.commit()

    return jsonify({"message": "Workout updated!"}), 200

@app.route("/delete_workout/<int:workout_id>", methods=["DELETE"])
def delete_workout(workout_id):
    workout = Workout.query.get(workout_id)

    if not workout:
        return jsonify({"message": "Workout not found"}), 404
    
    db.session.delete(workout)
    db.session.commit()

    return jsonify({"message": "Workout deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)