import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export const Matches = props => {
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState([]);
  const [hasload, setHasload] = useState(false);
  const [hasload2, setHasload2] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  // let test = []
  useEffect(() => {
    fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid${location.pathname}/ids?start=0&count=100&api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMatches(data);
        setHasload(true);
      });

      // matches.map(x => {
      //   fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${x}?api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f`)
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((data) => {
      //       console.log(data);
      //       setMatch(data);
      //       setHasload2(true);
      //     });
      //     test.push(match)
      //     console.log(test);
      //   })
    }, [])
    // console.log(test);
  return (
    <>
    {matches.map(x => {
      return (
            <Link to={x}> <h3 className="no-margin">{x}</h3> </Link>
          )
        })}
      {/* <div><pre>{JSON.stringify(matches, null, 2)}</pre></div> */}
      {/* <div><pre>{JSON.stringify(test, null, 2)}</pre></div> */}
    </>
  )
};