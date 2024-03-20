import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const Match = () => {
  const [matchCreate, setMatchCreate] = useState([]);
  const [match, setMatch] = useState([]);
  const [matchType, setMatchType] = useState("");
  const [hasload, setHasload] = useState(false);
  const [hasload2, setHasload2] = useState(false);
  const location = useLocation();
  let pushUp = 0
  let sitUp = 0
  let squat = 0
  let winDefeat
  let gameName
  let gameTag
  console.log(location.pathname);
  let test2 = location.pathname.split('/').slice(2).join()
  let test3 = location.pathname.split('/').slice(0, -1).join("")
  console.log(test2);
  console.log(test3);
  useEffect(() => {
    fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${test2}?api_key=RGAPI-7c56ce76-16b6-4c3e-b103-b319ca40ff0f`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.info.participants);
        setMatch(data.info.participants);
        setMatchCreate(data.info.gameCreation)
        if (data.info.queueId === 400) {
          setMatchType("Normal")
        } else if (data.info.queueId === 420) {
          setMatchType("Ranked")
        }
        setHasload2(true);
      });
    }, [])
    let test = new Date(matchCreate)
    return (
      match.map(x => {
        if (x.puuid === test3) {
          console.log(x);
          console.log(x.kills);
          console.log(x.championName);
          gameName = x.riotIdGameName
          gameTag = x.riotIdTagline

      if (x.win === true) {
        winDefeat = "Win"
        pushUp = 2
        sitUp = 6
        squat = 12
      } else {
        winDefeat = "Lose"
        pushUp = 4
        sitUp = 10
        squat = 16
      }

      pushUp += Math.ceil((x.kills/2) + (x.deaths) + (x.challenges.dragonTakedowns*1.5))
      sitUp += Math.ceil((x.deaths) + (x.assists) + (x.challenges.teamBaronKills*4.5))
      squat += Math.ceil((x.turretTakedowns*10))
      console.log(pushUp);
      console.log(sitUp);
      console.log(squat);
      console.log(true * 3);

        return (
          <>
            <div>
              <div><h2>{gameName} #{gameTag}</h2></div>
              <div>Match Creation Time: {matchCreate} - {JSON.stringify(test)}</div>
              <div>Champion: {x.championName} - {x.lane} - {matchType}</div>
              <div>KDA: {x.kills}/{x.deaths}/{x.assists} - {winDefeat}</div>
              <div>
                <div>Push-ups: {pushUp} -------- (kills/2) + (deaths) +(dragonTakedowns*1.5) + (win? 2 : 4)</div>
                <div>Sit-ups: {sitUp} ---------- (deaths) + (assists) + (teamBaronKills*4.5) + (win? 6 : 10)</div>
                <div>Squats: {squat} ----------- (turretTakedowns*10) + (win? 12 : 16)</div>
              </div>
            </div>
            <div>
              <div><pre>{ JSON.stringify(x, null, 2) }</pre></div>
            </div>
          </>
        );
      }
    })
  )
}; 