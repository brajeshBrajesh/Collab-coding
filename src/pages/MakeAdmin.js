import {useRef, useState} from "react"
export default function Admin(){
    
    const email = useRef();

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(email);
    // }

    return(
        <form  >
            <input type="email" ref={email}  placeholder="Enter Email"></input>
             <button type="submit">Submit</button>
        </form>
    );
}