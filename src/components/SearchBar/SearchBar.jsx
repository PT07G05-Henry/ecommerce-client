import React from 'react'


export default function SearchBar() { 


    return (<div className='formSearchBar'> 
        <form>
            <input className='inputProductos' type="text" placeholder='Colocar producto...' />
            <input className='inputButton' type="submit" value="" />
        </form>
    </div>)
}
