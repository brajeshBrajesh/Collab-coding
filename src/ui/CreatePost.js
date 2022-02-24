import React, { useRef, useState } from "react";
import app from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CreatePost.module.css";

import { push, getDatabase, set, ref as tempRef } from "firebase/database";
import imgUploadHandlerAndSaveInDatabase from "./functions/imgUploadHandlerAndSaveInDatabase.js";
import saveToDatabase from "./functions/saveToDatabase";

function CreatePost(props) {
  const [file, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [imgurl, setimgurl] = useState(null);
  const [postClicked, setPostClicked] = useState(false);
  const [error, setError] = useState({
    etitle: "",
    edesc: "",
  });

  const userDetails = useSelector((state) => state);

  const desc = useRef();
  const title = useRef();
  const navigate = useNavigate();

  //Database
  const db = getDatabase();
  const postListRef = tempRef(db, "posts");
  const newPostRef = push(postListRef);

  const cancelHandler = () => {
    props.createPostCancel();
  };

  const fileChangeHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      let select = e.target.files[0];
      setimgurl(URL.createObjectURL(select));
    }
    // console.log(e.target.files[0]);
  };

  const postHandler = () => {
    if (title.current.value.trim().length === 0) {
      setError((prev) => {
        return { ...prev, etitle: "Title cannot be empty" };
      });
      if (desc.current.value.trim().length == 0) {
        setError((prev) => {
          return { ...prev, edesc: "Nothing To post" };
        });
        return;
      }
      return;
    }
    if (desc.current.value.trim().length == 0) {
      setError((prev) => {
        return { ...prev, edesc: "Nothing To post" };
      });
      return;
    }

    if (file !== null) {
      setPostClicked(true);
      const fileExtension = file.type.substring(file.type.lastIndexOf("/") + 1);
      console.log(fileExtension);

      if (
        fileExtension === "jpeg" ||
        fileExtension === "jpg" ||
        // fileExtension === "pdf" ||
        fileExtension === "png" ||
        fileExtension === "gif"
      ) {
        imgUploadHandlerAndSaveInDatabase(
          navigate,
          newPostRef,
          fileExtension,
          userDetails,
          file,
          title.current.value,
          desc.current.value,

          setProgress,
          setFileUrl
        );
      } else {
        alert("Invalid file type");
        setPostClicked(false);
      }
    } else {
      setPostClicked(true);
      saveToDatabase(
        navigate,
        newPostRef,
        userDetails,
        title.current.value,
        desc.current.value,

        "",
        ""
      );
    }

    // console.log(file);
  };
  return (
    <div
      className="container"
      style={{
        border: "1px solid SteelBlue",
        padding: "10px",
        width: "60%",
        backgroundColor: "#000536",
        margin: "auto",
        maxWidth: 800,
      }}
    >
      <div className="mb-3">
        <label
          htmlFor="title"
          className="form-label "
          style={{ color: "white", fontSize: "18px", padding: "5px" }}
        >
          Enter title
        </label>
        <br />

        <input
          type="text"
          id="title"
          ref={title}
          style={{
            resize: "none",
            border: "4px solid SteelBlue",
            margin: "auto",
          }}
          placeholder="write here your post title"
          onChange={() => {
            setError((prev) => {
              return { ...prev, etitle: "" };
            });
          }}
        />
        <br />
        <span style={{ color: "red" }}>{error.etitle}</span>
        <br />
        <br />
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label  ld"
          style={{ color: "white", fontSize: "18px", padding: "5px" }}
        >
          Enter your Post
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
          ref={desc}
          style={{
            resize: "none",
            border: "4px solid SteelBlue",
            margin: "auto",
          }}
          placeholder="Write your post here"
          onChange={() => {
            setError((prev) => {
              return { ...prev, edesc: "" };
            });
          }}
        ></textarea>
        <span style={{ color: "red" }}>{error.edesc}</span>
        <b />
        <div>
          <br />
          <br />
          <div className="mb-3">
            <label
              htmlFor="formFile"
              className="form-label"
              style={{ color: "white", fontSize: "18px", padding: "5px" }}
            >
              Upload pictures/files
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={fileChangeHandler}
            />
          </div>
          {postClicked && (
            <div className="progress my-2">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: progress + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          )}
          {postClicked && <p>Uploading.....Please wait</p>}
          <div>
            {imgurl && (
              <img src={imgurl} style={{maxWidth:"20"}} />
            )}
          </div>
          <br />

          <br />
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-success mx-2"
          onClick={postHandler}
          disabled={postClicked}
        >
          Post
        </button>
        <button
          type="button"
          className="btn btn-secondary "
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
