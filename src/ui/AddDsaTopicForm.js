import React from "react";
import { useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";

export default function AddDsaTopicForm(props) {
  const db = getDatabase();
  //   console.log(props);
  const topic = useRef();
  const qnLink = useRef();
  const solLink = useRef();
  const articleLink = useRef();
  const cancelHandler = () => {
    topic.current.value = "";
    qnLink.current.value = "";
    solLink.current.value = "";
    articleLink.current.value = "";
    props.offOverlay();
  };

  const topicAddHandler = (e) => {
    e.preventDefault();

    let newData = [];
    let dbInsertTopic = [];
    for (let i = 0; i < props.pos; ++i) {
      newData.push(props.allTopics[i]);
      dbInsertTopic.push({ ...props.allTopics[i], key: {} });
    }
    let temp_solLink = {},
      temp_articleLink = {};
    if (solLink.current.value !== "") temp_solLink = solLink.current.value;
    if (articleLink.current.value !== "")
      temp_articleLink = articleLink.current.value;
    newData.push({
      topic: topic.current.value,
      qnLink: qnLink.current.value,
      solLink: temp_solLink,
      articlelLink: temp_articleLink,
      key: props.pos,
    });
    dbInsertTopic.push({
      topic: topic.current.value,
      qnLink: qnLink.current.value,
      solLink: temp_solLink,
      articleLink: temp_articleLink,
    });
    for (let i = props.pos; i < props.allTopics.length; ++i) {
      //   console.log(i);
      dbInsertTopic.push({ ...props.allTopics[i], key: {} });
      newData.push({
        ...props.allTopics[i],
        key: props.allTopics[i].key + 1,
      });
    }
    set(ref(db, "content/dsa/" + props.topic), {
      questions: dbInsertTopic,
    });
    props.setNewTopics(newData);
    topic.current.value = "";
    qnLink.current.value = "";
    solLink.current.value = "";
    articleLink.current.value = "";
    props.offOverlay();
  };

  return (
    <form
      onSubmit={topicAddHandler}
      style={{ border: "2px solid red", padding: "2rem", background: "pink" }}
    >
      <div class="mb-3">
        <label for="exampleInputtext1" class="form-label">
          Enter the topic
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputtext1"
          aria-describedby="textHelp"
          ref={topic}
        />
        <label for="exampleInputtext1" class="form-label">
          Paste Qn link here
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputtext1"
          aria-describedby="textHelp"
          ref={qnLink}
        />
        <label for="exampleInputtext1" class="form-label">
          Paste solution Link Here(If Any)
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputtext1"
          aria-describedby="textHelp"
          ref={solLink}
        />
        <label for="exampleInputtext1" class="form-label">
          Paste Article Link Here(If Any)
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputtext1"
          aria-describedby="textHelp"
          ref={articleLink}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Add
      </button>
      <button type="button" class="btn btn-primary" onClick={cancelHandler}>
        cancel
      </button>
    </form>
  );
}
