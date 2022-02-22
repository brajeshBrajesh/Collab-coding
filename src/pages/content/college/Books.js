import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { useSelector } from "react-redux";
export default function Books() {
  const [toDisplaData, setToDisplayData] = useState([]);
  const [bookFilters, setBookFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const isAdmin=useSelector(state=>state.login.isAdmin);

  const dbRef = ref(getDatabase());

  const fetchBooks = () => {
    setLoading(true);
    get(child(dbRef, "content/college/Books"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          let books = [...snapshot.val()];
          setToDisplayData(books);
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
    fetchBooks();
  }, []);
  return (
    <>
      {loading && <p>Loading ... </p>}
      <ul>
        {!loading &&
          toDisplaData.map((books) => (
            <li>
              <div className="container">
                sem={books.sem}
                <br />
                subject={books.subject}
                <br />
                <a
                  class="btn btn-primary"
                  href={books.pdfUrl}
                  target="_blank"
                  role="button"
                >
                  Link
                </a>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
