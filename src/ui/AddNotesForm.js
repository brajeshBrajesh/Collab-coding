import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import saveToDatabase from "./functions/notes/saveToDatabase";
import imgUploadHandlerAndSaveInDatabase from "./functions/notes/imgUploadHandlerAndSaveInDatabase";

import { push, getDatabase, set, ref } from "firebase/database";
export default function AddNotesForm(props) {
  const [file, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [imgurl, setimgurl] = useState(null);
  const [postClicked, setPostClicked] = useState(false);
  const [error, setError] = useState({
    etitle: "",
    edesc: "",
  });
  const navigate = useNavigate();

  // const [toDisplayNotes, setToDisplayNotes] = useState([]);
  const userDetails = useSelector((state) => state);
  const title = useRef();
  const desc = useRef();

  const db = getDatabase();
  const postListRef = ref(db, "notes/" + userDetails.login.loginId);
  const newPostRef = push(postListRef);

  const cancelHandler = () => {
    title.current.value = "";
    desc.current.value = "";
    setimgurl(null);
    props.overlayOut();
    document.getElementById("formFile").value="";
  };
  const submitHandler = (e) => {
    e.preventDefault();

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

      if (
        fileExtension === "jpeg" ||
        fileExtension === "jpg" ||
        fileExtension === "png"
      ) {
        imgUploadHandlerAndSaveInDatabase(
          navigate,
          newPostRef,
          fileExtension,
          userDetails,
          file,
          title.current.value,
          desc.current.value,
          cancelHandler,
          setPostClicked,

          setProgress,
          setFileUrl
        );

        console.log("Valid image");
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
        cancelHandler,
        setPostClicked,

        "",
        ""
      );

      console.log("saving to databse");
    }

    // props.overlayOut();
  };
  const fileChangeHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      let select = e.target.files[0];
      setimgurl(URL.createObjectURL(select));
    }
  };

  
  return (
    <div style={{ border: "2px solid red", width: "30em", height: "30rem" }}>
      <form onSubmit={submitHandler}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Enter topic
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            ref={title}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Enter your important points/notes/links or anything else here
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            ref={desc}
          ></textarea>
          <div className="mb-3">
            <label
              htmlFor="formFile"
              className="form-label"
              style={{ color: "white", fontSize: "18px", padding: "5px" }}
            >
              Upload picture (If You Want)
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={fileChangeHandler}
              accept="image/*"
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
          {postClicked && (
            <p style={{ color: "white" }}>Uploading.....Please wait</p>
          )}
          <div>
            {imgurl && (
              <img
                src={imgurl}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>
          <button
            type="submit"
            class="btn btn-primary mb-3"
            disabled={postClicked}
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-danger mb-3"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
