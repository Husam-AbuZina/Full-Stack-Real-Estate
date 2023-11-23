import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../context/UseDetailContext'
import { createUser } from '../../utils/api'
import { useMutation } from 'react-query'

function Layout() {




  const { isAuthenticated, isLoading, user, getAccessTokenWithPopup } = useAuth0()
  const { setUserDetails } = useContext(UserDetailContext)




  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token)
  })

  useEffect(() => {

    console.log(isAuthenticated)
    console.log(user)
    console.log(isLoading)

    const getTokenAndRegister = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email"
        }
      });
      localStorage.setItem("access_token", res)
      setUserDetails((prev) => ({ ...prev, token: res }))
      console.log(res)
      mutate(res)
    };


    !isAuthenticated && !isLoading && getTokenAndRegister()
  }, [isAuthenticated])

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout