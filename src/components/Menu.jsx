import '../index.css';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export function Menu() {
  const [goUp, setGoUp] = useState([]);
  const location = useLocation();
  console.log(location);
  
  useEffect(() => {
    const url = window.location.href;
    console.log(url);
    console.log(location.pathname);
    if (location.pathname !== '/') {
      setGoUp(url.split('/').slice(0,-1).join('/'))
    } else {
      setGoUp(url)
    }
    console.log(goUp);
  }, [location, goUp])

  return (
    <>
    <div className="column td-none mb-20">
    <div className="center td-none column">
      <Link to="/"  className="td-none"><h1 className='no-margin'>LolFitness</h1></Link>
      <Link to="/matches"  className="td-none"><h2 className='no-margin'>Matches</h2></Link>
    </div>
      <div className='left'>
        <Link to={goUp}  className="td-none"><h3 className='no-margin'>⬆⬆</h3></Link><h3 className='no-margin'>{location.pathname}</h3>
      </div>
    </div>
    </>
  )
}