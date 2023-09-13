// Redux toolkit

// import { Outlet, Link } from "react-router-dom"
// import { useEffect, useRef, useState } from 'react'
// import { useRefreshMutation } from "./authApiSlice"
// import usePersist from "hooks/usePersist"
// import { useSelector } from 'react-redux'
// import { selectCurrentToken } from "./authSlice"
// import PulseLoader from 'react-spinners/PulseLoader'
// import Cookies from "js-cookie"

// const PersistLogin = () => {

//     const [persist] = usePersist()
//     const token = useSelector(selectCurrentToken)
//     const effectRan = useRef(false)

//     const [trueSuccess, setTrueSuccess] = useState(false)

//     const [refresh, {
//         isUninitialized,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useRefreshMutation()

//     useEffect(() => {

//         if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

//             const verifyRefreshToken = async () => {
//                 console.log('verifying refresh token')
//                 try {
//                     // const response =
//                     await refresh()
//                     // const { accessToken } = response.data
//                     Cookies.get()
//                     setTrueSuccess(true)
//                 }
//                 catch (err) {
//                     console.error(err)
//                 }
//             }

//             if (!token && persist) {
//                 verifyRefreshToken()
//             }
//         }

//         return () => effectRan.current = true

//         // eslint-disable-next-line
//     }, [])

//     let content
//     if (!persist) { // persist: no
//         console.log('no persist')
//         content = <Outlet />
//     } else if (isLoading) { //persist: yes, token: no
//         console.log('loading')
//         content = <PulseLoader color={"#FFF"} />
//     } else if (isError) { //persist: yes, token: no
//         console.log('error')
//         content = (
//             <p className='errmsg'>
//                 {`${error?.data?.message} - `}
//                 <Link to="/">Please login again</Link>.
//             </p>
//         )
//     } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
//         console.log('success')
//         content = <Outlet />
//     } else if (token && isUninitialized) { //persist: yes, token: yes
//         console.log('token and uninit')
//         console.log(isUninitialized)
//         content = <Outlet />
//     }

//     return content
// }
// export default PersistLogin

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth;

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);
  
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return (
       <>
          {isLoading 
            ? <p>Loading...</p>
            : <Outlet />
          }
       </>
  )
};

export default PersistLogin;


