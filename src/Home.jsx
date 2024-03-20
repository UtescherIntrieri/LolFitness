import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = props => {
  const id = useId();
  const [name, setName] = useState(props?.value ?? '');
  const [tag, setTag] = useState(props?.value ?? '');
  const [summ, setSumm] = useState("");
  const [summId, setSummId] = useState("");
  console.log(name);
  console.log(tag);
  console.log(summId);

  return (
    <div>
      <label htmlFor={id}>Summoner puuid: </label>
      <input id={id} value={summId} onInput={e => setSummId(e.target.value)} /> - Region: BR1 (other regions TBA) <br />
      <Link to={{ pathname: `/${summId}` }}>GO!</Link>
    </div>
  )

}
// const findSumm = async () => {
//   try {
//     fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/ShakaGoldilocks/Naia?api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f`)
//     // fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setSummId(data)
//         })
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// return (
//   <div>
//     <label htmlFor={id}>Summoner Name and Tag: </label>
//     <input id={id} value={name} onInput={e => setName(e.target.value)} /><input id={id} value={tag} onInput={f => setTag(f.target.value)} /> - Region: BR1 (other regions TBA)
//     <button type="submit" onClick={findSumm}>Search</button>
//     <Link to={{pathname: `/${summId}`}}>Register</Link>
//   </div>
// )
// https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/ShakaGoldilocks?api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f