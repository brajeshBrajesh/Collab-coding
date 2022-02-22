import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
export default function AddButton() {
    const isAdmin = useSelector((state) => state.login.isAdmin);
    return (
    <div>
        <Button variant="contained" style={{display:!isAdmin?'none':null}}>Add data</Button>
    </div>
  )
}
