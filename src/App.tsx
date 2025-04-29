import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./App.css";
import EditLifeEventForm from "./pages/lifeEvents/EditLifeEventForm";
import Button from "@mui/material/Button";

function App() {
  const [showForm, toggleForm] = useState(false);

  return (
    <>
      {showForm && <EditLifeEventForm />}

      <div className="card">
        {!showForm && (
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => toggleForm(!showForm)}
          >
            Edit Life Event
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
