import React from 'react'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getCategories, selectCategories } from "../../store/api"



const prueba = () => {
 const dispatch = useDispatch()
 const categories = useSelector(selectCategories)

 useEffect(()=>{
    (categories[0].toBeField || categories[0].error) && dispatch(getCategories()) 
 },[categories])

  return !(categories[0].toBeField || categories[0].error) && (categories[0].idle? <h1> loading </h1> : <>
  card
  </> )
}

export default prueba