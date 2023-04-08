
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let  userid = localStorage.getItem("authToken") == null ? false : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/" />};
        </>

    )
}
export default PrivateRoutes;