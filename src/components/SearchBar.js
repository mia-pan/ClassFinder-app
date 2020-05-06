import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const SearchBar = (props) => {


  const handleFilter = e => {
    props.onFilterAppointment(e.target.value)
  }
  
  const handleStatusChange = e => {
    e.target.checked ? props.onSortByStatus(props.appointment) : e.target.checked = false
  }

  const handleNameChange = e => {
    e.target.checked ? props.onSortByName(props.appointment) : e.target.checked = false
  }
 const mappingAppointment = () => {
    return props.appointments.map(appointment => {
      return <option value={appointment.name}>{appointment.name}</option>
    })
 }

  return (
    <div>

      <strong>Sort by:  </strong> 
      <label>
        <input type="radio" value="Alphabetically" checked={null} onChange={e => handleNameChange(e)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Class Status" checked={null} onChange={e => handleStatusChange(e)}/>
        Class Status
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={e => handleFilter(e)}>
            {/* const length= {props.appointment.length} */}
          {mappingAppointment()}
          {/* <option value={props.appointment.name}>{props.appointment.name}</option> */}
           
        </select>
      </label>
    </div>
  );
}


export default SearchBar;