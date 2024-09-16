from config import db
from datetime import datetime

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    target = db.Column(db.String(100), unique=False, nullable=False)
    intensity = db.Column(db.String(80), unique=False, nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "date": self.date,
            "target": self.target,
            "intensity": self.intensity,
            "notes": self.notes,
        }
    
class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(255), unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
        }