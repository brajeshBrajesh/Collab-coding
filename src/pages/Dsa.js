import React, { useState, useEffect } from "react";

import { getDatabase, ref, child, get, set } from "firebase/database";

// import { Link } from "react-router-dom";
import NavCard from "../ui/NavCard";
import { useSelector } from "react-redux";
import styles from "./Dsa.module.css";
import AddTopicForm from "../ui/AddTopicForm";

export default function Dsa() {
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  const dbRef = ref(getDatabase());
  const deleteHandler = (pos) => {
    console.log(pos);
    let tempDisplay = [];
    let tempSaveToDatabase = [];
    for (let i = 0; i < allTopics.length; ++i) {
      if (i !== pos) {
        tempDisplay.push(allTopics[i]);
        tempSaveToDatabase.push(allTopics[i].topic);
      }
    }
    const db = getDatabase();
    set(ref(db, "content/dsa"), {
      all_topics: tempSaveToDatabase,
    });
    setAllTopics(tempDisplay);
  };
  const indexSetHandler = (pos) => {
    setIndex(pos);
    onOverlay();
  };

  const fetchList = () => {
    setLoading(true);
    get(child(dbRef, "content/dsa/all_topics"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let temp = [];
          for (let i = 0; i < snapshot.val().length; ++i) {
            temp.push({ topic: snapshot.val()[i], key: i });
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
          <AddTopicForm
            offOverlay={offOverlay}
            pos={index}
            allTopics={allTopics}
            setNewTopics={setNewTopics}
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="container text-center">
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
                <NavCard
                  title={ds.topic}
                  k={ds.key}
                  indexSet={indexSetHandler}
                  deleteIt={deleteHandler}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
