import React from "react";
import "../styles/FormStyles.css";

function FormField() {
  return (
    <div className="inputFolderWrapper">
      <text className="labelFolder">New Folder Name:</text>
      <input className="inputFolder" size={18} />
      <button className="addButton">Add Folder</button>
    </div>
  );
}

export default FormField;
