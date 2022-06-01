import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'


const Country = ({ country }) => <li>{country.name.common}</li>

const Header = ({ text }) => <h1>{text}</h1>;


const CountriesTable = ({ countries, search }) => {
  const filteredCountries = countries.filter((country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  }))
  console.log(filteredCountries);
  console.log(filteredCountries.length);
  if (filteredCountries.length > 10) {return <p>Too many countries</p>}
  if (filteredCountries.length > 1) {
    return (
      <ul>
          {filteredCountries.map(country => {  
           return <Country key={country.name.common} country={country} />
          })}
      </ul> 
      )
  }
  if (filteredCountries.length == 1) {
    return (
      <CountryDetail country={filteredCountries[0]} />
    )
  }

    

}


 const CountryDetail = ({ country }) => {
   
  return (
    <div>
      <Header text={country.name.common}  />
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png} /> 
    </div>
    
  )
 }

 


const SearchBar = ({ handleSearchFieldChange }) => {
  return (
    <div>
        search: <input onChange={handleSearchFieldChange} />
    </div>
  )
}


// i belive its a problem with the inital state of countries, and trying to functions etc on an empty array
// posiibly fixed by putting it inside a component, or finding soething else to set as initial state
// if you type in something quick before it realises you can fix it, then removing serach brings up countries
// tho i suppose the application should be displaying no countries until searched for


const  App = () => {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')


  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  //console.log(countries);
  
 
//  <ul> 
//     {countries.filter((country => {
//       return country.name.common.toLowerCase().includes(search.toLowerCase())
//     })).map(country => {  
//       return <Country key={country.name.common} country={country} />
//     })}
//   </ul>


  const handleSearchFieldChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div >
      <SearchBar handleSearchFieldChange={handleSearchFieldChange} />
      <CountriesTable countries={countries} search={search} />
      
      
      
      
    </div>
  );
}

export default App;
