import React from 'react'
import Card from '../Card/Card'


const Cards = ({products}) => {
  return (
    <div>
        {products?.map(el => <Card 
        key={el.id}
        id={el.id}
        images={el.images}
        name={el.name}
        price={el.price}
        
        />)}</div>
  )
}

export default Cards