import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from "axios"
const Userdata = () => {

  const [countries, setCountries]= useState([])
  const [search,setsearch]= useState("")
  const [filtercountries, setfiltercountries] = useState("")

  const getcountries = async () =>{
    try {
      const responce = await axios.get("https://restcountries.com/v2/all")
      setCountries(responce.data)
      setfiltercountries(responce.data);
    } catch (error) {
      console.log(error)
    }
  }

 const colums = [

 {
  name:"Image",
  selector : (row) => <img width={40} height={40} src={row.flag} />,
 },
 {
  name:"name",
  selector : (row) =>row.name,
 },
 {
  name:"Country native name",
  selector : (row) =>row.nativeName,
 },

 {
  name:"location",
  selector : (row) =>row.capital,
 },


 ]

// to get country 
  useEffect (()=>{
     getcountries();
  }, []);

  // to get filtered search countries 
  useEffect(()=>{
   const result =countries.filter((country) =>{
    return country.name.toLowerCase().match(search.toLowerCase())
   })

   setfiltercountries(result)
  },[search])

  return (
    <div>
      <div className='flex justify-between items-center px-3 py-3'>
        <img className='h-[80px]' src={require("../assets/logo.png.png")} alt="" />
        <i class="fa-solid fa-bars fa-2xl"></i>
      </div>
      
      
      <DataTable 
      title ="Country List" columns={colums} data={filtercountries} pagination
      fixedHeader
      fixedHeaderScrollHeight='450px'
      highlightOnHover
     subHeader
     subHeaderComponent={
      <input className='border-2 border-black p-2 rounded-lg' type='text' placeholder='Search country'
      value={search}
      onChange={(e)=> setsearch(e.target.value)}
      
      />
     }
     subHeaderAlign='center'
      />

    </div>
  )
}

export default Userdata
