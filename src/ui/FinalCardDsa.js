import React from "react";
import { useSelector } from "react-redux";

export default function FinalCardDsa(props) {
  // console.log(props.k);
  // console.log(props.details);
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
      <div className="card my-1" style={{ width: "14rem",height:"12rem" }}>
        <div className="card-body text-center">
          <h3 className="card-title">{props.details.topic}</h3>
        </div>
        {props.details.qnLink !== undefined && (
          <a
            href={props.details.qnLink}
            target="_blank"
            className="link-primary"
          >
            Question Link
          </a>
        )}
        {props.details.articleLink !== undefined && (
          <a
            href={props.details.articleLink}
            target="_blank"
            className="link-danger"
          >
            Article Link
          </a>
        )}
        {props.details.solLink !== undefined && (
          <a
            href={props.details.solLink}
            target="_blank"
            className="link-warning"
          >
            Solution Link
          </a>
        )}
        {isAdmin && (
          <button
            type="button"
            className="btn btn-info my-1 "
            onClick={() => deleteHandler(props.details.key)}
          >
            Delete
          </button>
        )}
      </div>

      {isAdmin && (
        <button
          type="button"
          className="btn btn-dark my-1 "
          onClick={() => indexSetHandler(props.details.key + 1)}
        >
          Add After This
        </button>
      )}
    </>
  );
}
