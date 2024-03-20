import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export function Matches() {
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid${location.pathname}/ids?start=0&count=100&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMatches(data);
      });
    }, [location.pathname])
  return (
    <>
    {matches.map(x => {
      return (
            <Link to={x}> <h3 className="no-margin">{x}</h3> </Link>
          )
        })}
    </>
  )
};