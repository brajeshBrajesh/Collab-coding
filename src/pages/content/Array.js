import React from "react";
import {Link,Outlet} from 'react-router-dom'
export default function Array() {
  return (
    <div>
      <h1>HI</h1>
      <Link to="array">Array</Link>
      <Outlet/>
    </div>
  );
}
