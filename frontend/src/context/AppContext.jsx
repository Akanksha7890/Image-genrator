import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()   // ✅ NAMED EXPORT

const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [credit, setCredit] = useState(0)

  const backendUrl = "https://image-generator-backend-11ss.onrender.com"
  const navigate = useNavigate()

  // 🔹 Load credits
  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/credits',
        {
          headers: { token }
        }
      )

      if (data.success) {
        setCredit(data.creditBalance)
        setUser(data.user)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // 🔹 Generate image
 const generateImage = async (prompt) => {
  if (!token) {
    toast.error("Please login first");
    return null;
  }

  try {
    const { data } = await axios.post(
      backendUrl + '/api/image/generate-image',
      { prompt },
      {
        headers: { token }
      }
    );

    if (data.success) {
      setCredit(data.creditBalance); // update credit
      return data;
    } else {
      toast.error(data.message);
      setCredit(data.creditBalance || 0);
      if (data.creditBalance === 0) navigate('/buy');
      return null;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Something went wrong");
    return null; // always return null on error
  }
};


  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setCredit(0)
  }

  useEffect(() => {
    if (token) {
      loadCreditData()
    }
  }, [token])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        token,
        setToken,
        credit,
        backendUrl,
        logout,
        generateImage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider   // ✅ DEFAULT EXPORT
