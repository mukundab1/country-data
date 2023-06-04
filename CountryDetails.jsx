import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const CountryDetails = () => {
    const[countrydetail, setCountryDetail] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
      };

    const forward = (border) => {
        navigate(`/country-details/alpha/${border}`);
      };

      const getdetail = async () => {
        try {
          const response = await axios.get(
            `https://restcountries.com/v2/name/${id}`
          );
          console.log(response.data);
          setCountryDetail(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getdetail();
      }, []);

  return (
    <div className='container'>
        <h4>Where in the World?</h4>
      <button onClick={() => back()}>Back</button>
        {
            countrydetail.map((item)=>{
                return(
                    <div className='col col-sm-6 col-md-6 col-lg-6 col-xl-6' key={item.name}>
                        <div className='card mt-3 mb-4'>
                            <div className='card-body'>
                                <img className='card-image-top' src={item.flag} 
                                height="200px"
                                alt='card image cap' 
                                />
                                <h3 className="card-title mt-3">{item.name}</h3>
                                    <h6 className="card-title">
                                    {`Native Name : ${item.nativeName}`}
                                    </h6>
                                    <h6 className="card-title">
                                    {`Population : ${item.population}`}
                                    </h6>
                                    <h6 className="card-title">{`Region : ${item.region}`}</h6>
                                    <h6 className="card-title">
                                    {`Sub Region : ${item.subregion}`}
                                    </h6>
                                    <h6 className="card-title">{`Capital : ${item.capital}`}</h6>
                                    <h6 className="card-title">
                                    {`Top level Domain : ${item.topLevelDomain}`}
                                    </h6>
                                    <h6 className="card-title">
                                    {`Currencies : ${item.currencies.map((e) => e.name)}`}
                                    </h6>
                                    <h6 className="card-title">
                                    {`Languages : ${item.languages.map((a) => a.name)}`}
                                    </h6>
                                    <h6>
                                    {"Border Countries : "}
                                    {item.borders?.map((border) => (
                                        <button
                                        value={item.alpha3Code}
                                        onClick={() => forward(border)}
                                        >
                                        {border}
                                        </button>
                                    ))}
                                    </h6>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CountryDetails;