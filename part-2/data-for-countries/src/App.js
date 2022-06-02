import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'


const Country = ({ country, setSearch }) => {
  return (
    <>
      <li>{country.name.common}</li>
        <Button text="Show detail" handleClick={() => setSearch(country.name.common)}/>
    </>
  
  )

} 

const Header = ({ text }) => <h1>{text}</h1>;


const CountriesTable = ({ countries, search, setSearch}) => {
  const filteredCountries = countries.filter((country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  }))
  console.log(filteredCountries.length);
  if (filteredCountries.length > 10) {return <p>Too many countries</p>}
  if (filteredCountries.length > 1) {
    return (
      <ul>
          {filteredCountries.map(country => {  
           return <Country key={country.name.common} country={country} setSearch={setSearch}/>
          })}
      </ul> 
      )
  }
  if (filteredCountries.length === 1) {
    return (
      <CountryDetail  country={filteredCountries[0]} />
    )
  }
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)




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
      <img src={country.flags.png} alt="flag"/> 
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


  const handleSearchFieldChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div >
      <SearchBar handleSearchFieldChange={handleSearchFieldChange} />
      <CountriesTable countries={countries} search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
