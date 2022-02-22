import React from "react";
import { useParams } from "react-router-dom";
import Books from "./college/Books";
import Notes from "./college/Notes";
import QnPaper from "./college/QnPaper";

export default function FinalClgContent() {
  const { topic } = useParams();
  if (topic === "notes")
    return (
      <div>
        <Notes />
      </div>
    );
  if (topic === "qn-paper")
    return (
      <div>
        <QnPaper />
      </div>
    );
  if (topic === "books")
    return (
      <div>
        <Books />
      </div>
    );
}
