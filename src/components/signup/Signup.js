import React from "react";
import styles from "./Signup.module.css";
const Signup = (props) => {
  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.signupHandler();
  };
  return (
    <>
      <div className="container">
        <div className={styles.myCard}>
          <div className="row">
            <div className="col-md-6 ">
              <div className={styles.myLeftCtn}>
                <form
                  className="myForm text-center "
                  onSubmit={formSubmitHandler}
                >
                  <header>
                    <b>Welcome-Login In To Continue</b>
                  </header>
                  

                  <button type="submit" className="btn btn-outline-success">
                    Login With Google
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.myRightCtn}>
                <div className={styles.box}>
                  <header>Welcome to LetsCrack</header>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
