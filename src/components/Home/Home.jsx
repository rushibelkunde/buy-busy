import React, {useContext, useState} from 'react'
import {data, categories} from '../../data'
import ItemCard from './ItemCard/ItemCard'
import "./Home.css"
import FilterComponent from './FilterComponent/FilterComponent'
import { UserContext } from '../../UserContext'

function Home() {

  const [category, setCatagory] = useState("All")
  const [price, setPrice] = useState(300)
  const {input, handleAdd} = useContext(UserContext)
  
    
  return (
    <>
    <div>
      <FilterComponent price={price} category={category} categories={categories} setCatagory={setCatagory} setPrice={setPrice}/>
    </div>
    <div className='items-container'>
      {data.map((item)=>(
        category=="All" && price>item.price && item.name.toLowerCase().includes(input.toLowerCase())?
         <ItemCard id={item.id}  name={item.name}  imageUrl={item.imageUrl} price={item.price}  description={item.description} handleAdd={handleAdd}/>:
        category==item.category && price>= item.price?
         <ItemCard id={item.id} name={item.name}  imageUrl={item.imageUrl} price={item.price}  description={item.description} handleAdd={handleAdd}/>:
        ""
      ))}
    </div>
    </>
  )
}

export default Home