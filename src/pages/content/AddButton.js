import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { getDatabase, ref, push, set } from "firebase/database";
export default function AddButton(props) {
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [file, setFile] = useState(null);

  return (
    <div style={{ display: !isAdmin ? "none" : null }}>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <Button
        onClick={() => {
          props.onClick(file);
        }}
        variant="contained"
      >
        Add data
      </Button>
    </div>
  );
}
