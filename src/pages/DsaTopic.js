import React, { useState, useEffect } from "react";

import { getDatabase, ref, child, get, set } from "firebase/database";

// import { Link } from "react-router-dom";
import NavCard from "../ui/NavCard";
import { useSelector } from "react-redux";
import styles from "./Dsa.module.css";
import AddDsaTopicForm from "../ui/AddDsaTopicForm";
import FinalCardDsa from "../ui/FinalCardDsa";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";

export default function Dsa() {
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const { topic } = useParams();

  const dbRef = ref(getDatabase());
  const deleteHandler = (pos) => {
    console.log(pos);
    let tempDisplay = [];
    let tempSaveToDatabase = [];
    for (let i = 0; i < allTopics.length; ++i) {
      if (i !== pos) {
        tempDisplay.push({ ...allTopics[i], key: i });
        tempSaveToDatabase.push({ ...allTopics[i], key: {} });
      }
    }
    const db = getDatabase();
    set(ref(db, "content/dsa/" + topic), {
      questions: tempSaveToDatabase,
    });
    setAllTopics(tempDisplay);
  };
  const indexSetHandler = (pos) => {
    setIndex(pos);
    onOverlay();
  };

  const fetchList = () => {
    setLoading(true);
    get(child(dbRef, "content/dsa/" + topic + "/questions"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          for (let i = 0; i < snapshot.val().length; ++i) {
            temp.push({ ...snapshot.val()[i], key: i });
          }
          setAllTopics(temp);
          // console.log(temp);
        } else {
          console.log("No data available");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchList();
  }, []);
  console.log(allTopics);
  const onOverlay = () => {
    document.getElementById("overlay").style.display = "block";
  };
  const offOverlay = () => {
    document.getElementById("overlay").style.display = "none";
  };
  const setNewTopics = (newTopics) => {
    setAllTopics(newTopics);
  };

  return (
    <div>
      <div id="overlay" className={styles.overlay}>
        <div id="text" className={styles.text}>
          <AddDsaTopicForm
            offOverlay={offOverlay}
            pos={index}
            allTopics={allTopics}
            setNewTopics={setNewTopics}
            topic={topic}
          />
        </div>
      </div>
      {loading && <Spinner />}
      {!loading && (
        <div className="container ">
          {isAdmin && (
            <button
              type="button"
              class="btn btn-dark my-3 "
              onClick={() => indexSetHandler(0)}
            >
              Add at First Position
            </button>
          )}
          <div className="row ">
            {allTopics.map((ds) => (
              <div className="col-md-6 col-xs-12 col-lg-4" key={ds.key}>
                <FinalCardDsa
                  indexSet={indexSetHandler}
                  deleteIt={deleteHandler}
                  details={ds}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
