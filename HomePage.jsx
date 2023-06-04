import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const[countries, setCountries] = useState([]);
    const[filterCountry, setFilterCountry] = useState([]);
    const[searchCountry, setSearchCountry] = useState("");
    const[regionCountry, setRegionCountry] = useState("");
    const navigate = useNavigate();

    const getCountries =  async() => {
        try{
            const response = await axios.get('https://restcountries.com/v2/all');
            setCountries(response.data);
            setFilterCountry(response.data)
        }catch(err){
            console.log(err);
        }
    }

    const countryDetails = (data) => {
        navigate(`country-details/name/${data.name}`)
    }

    const getCountrybyRegion = () => {
        const response = countries.filter((data)=> {
            return data.region.toLowerCase().match(regionCountry.toLowerCase());
        });
        setFilterCountry(response);
    } 

    const getSearchedCountry = () =>{
        const res = countries.filter((item)=> {
            return item.name.toLowerCase().match(searchCountry.toLowerCase());
        });
        setFilterCountry(res);
    }

    useEffect(()=> {
        getCountries();
    },[])

    useEffect(()=>{
        getCountrybyRegion();
    },[regionCountry])

    useEffect(()=> {
        getSearchedCountry();
    },[searchCountry])

  return (
    <div className='container'>
        <div className='row'>
            <h2 className='mt-3'>Where in the World.?</h2>
        <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>            
                <input type='text'
                    placeholder='Search for a Country......'
                    style={{padding:"6px"}}
                    value={searchCountry}
                    onChange={(e)=> setSearchCountry(e.target.value)}
                    />
        </div>
        <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <select className='form-control' id='exampleFormControlSelect1'
                    style={{width:"30vw"}}
                    value={regionCountry}
                    onChange={(e)=> setRegionCountry(e.target.value)}>
                    <option value="">Filter by Region....</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>           
        </div>
        {
            filterCountry.map((cdata) => {
                return(
                    <div className='col col-sm-6 col-md-3 col-lg-3 col-xl-3 mt-3 mb-4' key={cdata.name}>                        
                            <div className='card' key={cdata.name}
                                value={cdata.demonym}
                                onClick={()=> countryDetails(cdata)}    >
                                <div className='card-body ' >
                                    <img src={cdata.flag} height="150px" width="200px" alt='card image cap'/>
                                    <h3 className='card-title'>{cdata.name}</h3>
                                    <h5 className='card-title'>{"Population :" + cdata.population}</h5>
                                    <h5 className='card-title'>{"Region : " + cdata.region}</h5>
                                    <h5 className='card-title'>{"Capital : " + cdata.capital}</h5>
                                </div>
                            </div>                       
                    </div>
                )                
            })
        }
        </div>        
    </div>
  )
}

export default HomePage;