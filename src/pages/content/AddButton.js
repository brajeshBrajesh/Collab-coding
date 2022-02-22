import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { getDatabase, ref,push,set } from "firebase/database";
import { internal_resolveProps } from '@mui/utils';
export default function AddButton(props) {

    const isAdmin = useSelector((state) => state.login.isAdmin);
    
 
    return (
    <div>
        <Button  onClick={() => {
            props.onClick();
            }} variant="contained" style={{display:!isAdmin?'none':null}}>Add data</Button>
    </div>
  )
}
