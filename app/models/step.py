from .db import db


class Step(db.Model):
    __tablename__ = "steps"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(
        db.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False
    )
    step_no = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(1000), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "step_no": self.step_no,
            "details": self.details,
        }
