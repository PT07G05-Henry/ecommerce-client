import React from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
  const  navigate = useNavigate()
  return (
    <section className="container">
    <h1 className='container container__title'>Is not a valid path!</h1>
    { setTimeout(() => {
        
        navigate("/")
    }, 5000)
        
    }
      
      
  </section>
    
  )
}

export default Redirect