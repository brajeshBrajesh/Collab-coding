import React from "react";

export const Books = () => {
  return (
    <>
      <form
        action=""
        style={{
          width: "18%",
          borderRadius: "5px",
          padding: 5,
          textAlign: "center",
          border: "1px solid gray",
          borderTop: "3px solid Seagreen",
          backgroundColor: "mintcream",
          //   borderStyle: "ridge",
        }}
      >
        <fieldset>
          <legend>Book Details</legend>
          <label htmlfor="fname">Enter subject </label>
          <br />
          <input type="text" id="fname" name="fname" />
          <br />

          <label htmlfor="lname">Book author</label>
          <br />
          <input type="text" id="lname" name="lname" />
          <br />
          <br />
          <input type="submit" className="btn btn-success" value="Submit" />
        </fieldset>
      </form>
    </>
  );
};
export default Books;
