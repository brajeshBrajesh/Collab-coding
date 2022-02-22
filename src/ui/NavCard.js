import { ContentCutOutlined, PortraitSharp } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavCard(props) {
  // console.log(props.k);
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const indexSetHandler = (pos) => {
    console.log(pos);
    props.indexSet(pos);
  };
  const deleteHandler = (pos) => {
    if (window.confirm("Sure want to delete?")) props.deleteIt(pos);
  };
  return (
    <>
      <div className="card my-1" style={{ width: "18rem" }}>
        <Link to={props.title}>
          <img
            src="https://www.w3schools.com/html/pic_trulli.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body text-center">
            <h3 className="card-title">{props.title}</h3>
          </div>
        </Link>
        {isAdmin && (
          <button
            type="button"
            class="btn btn-info my-1 "
            onClick={() => deleteHandler(props.k)}
          >
            Delete
          </button>
        )}
      </div>

      {isAdmin && (
        <button
          type="button"
          class="btn btn-dark my-1 "
          onClick={() => indexSetHandler(props.k + 1)}
        >
          Add After This
        </button>
      )}
    </>
  );
}
