import goongJs from '@goongmaps/goong-js';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import APIs, { endpoints } from '../../configs/APIs';

const AutocompleteLocation = () => {
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState("");
  const myQuery = useDebounce(address, 1000);



  const handleResult = (e) => {
    setAddress(e.target.value);

  };

  const getDatas = async (queryInput) => {
    const res = await APIs.get(endpoints["mapAutocomplate"], {
      params: {
        input: queryInput,
        sessionToken: localStorage.getItem("sessionToken")
      }
    })
    const data = await res.data;
    if (data.predictions) {
      setResults(data.predictions);
    }
  }

  useEffect(() => {
    if (myQuery[0]) {
      getDatas(myQuery[0]);
    }
  }, [myQuery[0]])
  // const key = process.env.REACT_APP_GOONG_MAPS_MAPTILES_KEY;
  // useEffect(() => {
  //   goongJs.accessToken = key;
  //   var map = new goongJs.Map({
  //     container: 'map',
  //     style: 'https://tiles.goong.io/assets/goong_map_web.json',
  //     center: [105.83991, 21.02800],
  //     zoom: 9
  //   });
  // }, [])

  return (
    <div>
      {/* <div id="map"></div> */}
      <input
        onChange={e => handleResult(e)}
      />
      <ul>
        {results.map((result) => (
          <li key={result.placeId}>{result.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteLocation;
