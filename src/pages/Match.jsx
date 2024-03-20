import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const Match = () => {
  const [matchCreate, setMatchCreate] = useState([]);
  const [match, setMatch] = useState([]);
  const [matchType, setMatchType] = useState("");
  const location = useLocation();
  let pushUp = 0
  let sitUp = 0
  let squat = 0
  let winDefeat
  let gameName
  let gameTag
  console.log(location.pathname);
  let matchId = location.pathname.split('/').slice(2).join()
  let puuid = location.pathname.split('/').slice(0, -1).join("")
  console.log(matchId);
  console.log(puuid);
  useEffect(() => {
    fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.info.participants);
        setMatch(data.info.participants);
        setMatchCreate(data.info.gameCreation)
        if (data.info.queueId === 400) {
          setMatchType("5v5 Draft Pick games")
        } else if (data.info.queueId === 420) {
          setMatchType("5v5 Ranked Solo games")
        } else if (data.info.queueId === 430) {
          setMatchType("5v5 Blind Pick games")
        } else if (data.info.queueId === 440) {
          setMatchType("5v5 Ranked Flex games")
        } else if (data.info.queueId === 450) {
          setMatchType("5v5 ARAM games")
        } else if (data.info.queueId === 490) {
          setMatchType("Normal (Quickplay)")
        } else {
          setMatchType("Other")
        }
      });
  }, [matchId])
  let matchDate = new Date(matchCreate)
  return (
    match.map(x => {
      if (x.puuid === puuid) {
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

        if (x.totalTimeSpentDead <= 100) {
          sitUp += 2
        } else if (x.totalTimeSpentDead > 100 && x.totalTimeSpentDead <= 200) {
          sitUp += 3
        } else if (x.totalTimeSpentDead > 200 && x.totalTimeSpentDead <= 300) {
          sitUp += 4
        } else if (x.totalTimeSpentDead > 300) {
          sitUp += 5
        }

        pushUp += Math.ceil((x.kills / 2) + (x.deaths) + (x.challenges.dragonTakedowns * 1.5))
        sitUp += Math.ceil((x.deaths) + (x.assists) + (x.challenges.teamBaronKills * 4.5))
        squat += Math.ceil((x.turretTakedowns * 10))
        console.log(pushUp);
        console.log(sitUp);
        console.log(squat);
        console.log(true * 3);

        return (
          <>
            <div>
              <div><h2>{gameName} #{gameTag}</h2></div>
              <div>Match Creation Time: {matchCreate} - {JSON.stringify(matchDate)}</div>
              <div>Champion: {x.championName} - {x.lane} - {matchType}</div>
              <div>KDA: {x.kills}/{x.deaths}/{x.assists} - {winDefeat}</div>
              <div>
                <div>Push-ups: {pushUp} -------- (kills/2) + (deaths) +(dragonTakedowns*1.5) + (win? 2 : 4)</div>
                <div>Sit-ups: {sitUp} ---------- (deaths) + (assists) + (teamBaronKills*4.5) + (win? 6 : 10) + (totalTimeSpentDead  &lt;100? 2 : 100~200? 3 : 200~300? 4 : &gt;300? 5)</div>
                <div>Squats: {squat} ----------- (turretTakedowns*10) + (win? 12 : 16)</div>
              </div>
            </div>
            <div>
              <div><pre>{JSON.stringify(x, null, 2)}</pre></div>
            </div>
          </>
        );
      }
    })
  )
}; 