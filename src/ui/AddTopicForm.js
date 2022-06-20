import React from "react";
import { useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";

export default function AddTopicForm(props) {
  const db = getDatabase();
  //   console.log(props);
  const cancelHandler = () => {
    topic.current.value = "";
    props.offOverlay();
  };
  const topic = useRef();
  const topicAddHandler = (e) => {
    e.preventDefault();

    let newData = [];
    let dbInsertTopic = [];
    for (let i = 0; i < props.pos; ++i) {
      newData.push(props.allTopics[i]);
      dbInsertTopic.push(props.allTopics[i].topic);
    }
    newData.push({ topic: topic.current.value, key: props.pos });
    dbInsertTopic.push(topic.current.value);
    for (let i = props.pos; i < props.allTopics.length; ++i) {
      //   console.log(i);
      dbInsertTopic.push(props.allTopics[i].topic);
      newData.push({
        topic: props.allTopics[i].topic,
        key: props.allTopics[i].key + 1,
      });
    }
    set(ref(db, "content/dsa"), {
      all_topics: dbInsertTopic,
    });
    props.setNewTopics(newData);
    topic.current.value = "";
    props.offOverlay();
  };

  return (
    <form
      onSubmit={topicAddHandler}
      style={{ border: "2px solid red", padding: "2rem"  }}
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
      </div>
      
      <div id="textlHelp" class="form-text" style={{color:"black"}}>
        This topic will be entered at position {props.pos}
      </div>
      <br/>
      <div className="text-center">

      <button type="submit" class="btn btn-primary" style={{marginRight:"20%"}}>
        Add
      </button>
      <button type="button" class="btn btn-primary" onClick={cancelHandler}>
        cancel
      </button>
      </div>
    </form>
  );
}
