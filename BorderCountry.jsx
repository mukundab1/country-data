import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BorderCountry = () => {
  const [borderCountry, setBorderCountry] = useState([]);
  const { border } = useParams();
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const forward = (border) => {
    navigate(`/country-details/alpha/${border}`);
  };
  const getBorderCountry = async () => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v2/alpha/${border}`
      );
      console.log(res.data);
      setBorderCountry([res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBorderCountry();
  }, [border]);

  return (
    <div className="container">
      <h4>Where in the World?</h4>
      <button onClick={() => back()}>Back</button>
      {borderCountry.map((data) => {
        return (
          <div className="col col-sm-6 col-md-6 col-lg-6 col-xl-6" key={data.name}>
            <div className="card mt-3 mb-4" key={data.name}>
              <div className="card-body">
                <img
                  className="card-img-top"
                  src={data.flag}
                  height="200px"
                  alt="Card image cap"
                />
                <h3 className="card-title mt-3">{data.name}</h3>
                <h6 className="card-title">
                  {`Native Name : ${data.nativeName}`}
                </h6>
                <h6 className="card-title">
                  {`Population : ${data.population}`}
                </h6>
                <h6 className="card-title">{`Region : ${data.region}`}</h6>
                <h6 className="card-title">
                  {`Sub Region : ${data.subregion}`}
                </h6>
                <h6 className="card-title">{`Capital : ${data.capital}`}</h6>
                <h6 className="card-title">
                  {`Top level Domain : ${data.topLevelDomain}`}
                </h6>
                <h6 className="card-title">
                  {`Currencies : ${data.currencies.map((e) => e.name)}`}
                </h6>
                <h6 className="card-title">
                  {`Languages : ${data.languages.map((a) => a.name)}`}
                </h6>
                <h6>
                  {"Border Countries : "}
                  {data.borders?.map((border) => (
                    <button
                      value={data.alpha3Code}
                      onClick={() => forward(border)}
                    >
                      {border}
                    </button>
                  ))}
                </h6>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BorderCountry;
