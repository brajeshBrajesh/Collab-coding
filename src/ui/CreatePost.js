import React, { useRef, useState } from "react";
import app from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { push, getDatabase, set, ref as tempRef } from "firebase/database";
import imgUploadHandlerAndSaveInDatabase from "./functions/imgUploadHandlerAndSaveInDatabase.js";
import saveToDatabase from "./functions/saveToDatabase";

function CreatePost(props) {
  const [file, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [imgurl,setimgurl] = useState(null);


  const userDetails = useSelector((state) => state);

  const desc = useRef();
  const title=useRef();
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
    if (desc.current.value.trim().length == 0 && file === null) {
      alert("Nothing to post");
      return;
    }
    if (file !== null) {
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
      } else alert("Invalid file type");
    } else {
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
      style={{ border: "2px solid red", padding: "5px" }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">Enter title</label>
        <input type="text" id="title" ref={title}/><br/>
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label fw-bold"
        >
          Enter your Post
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          ref={desc}
          style={{ resize: "none" }}
        ></textarea>
        <div>
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
          <br />
          <br />
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload pictures/files
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={fileChangeHandler}
            />
          </div>
          <div>{imgurl && <img src={imgurl} />}</div>
          <br />

          <br />
        
        </div>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={postHandler}>
          Post
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


export default CreatePost;

