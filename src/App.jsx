import {
  useCallback,
  useState,
} from "react";

import StartScreen from "./components/StartScreen";
import CountdownScreen from "./components/CountdownScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import BestScores from "./components/BestScores";


/* APP */

function App() {


  /* SCREEN */

  const [screen, setScreen] =
    useState("start");


  /* GAME MODE */

  const [gameMode, setGameMode] =
    useState("easy");


  /* RESULT */

  const [result, setResult] =
    useState(null);


  /* GAME ID */

  const [gameId, setGameId] =
    useState(0);


  /* BEST SCORES */

  const [bestScores, setBestScores] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "tapRushBestScores"
          );

        if (!saved) {
          return {
            easy: 0,
            normal: 0,
            pro: 0,
            zeroRush: 0,
          };
        }

        const parsed =
          JSON.parse(saved);

        return {
          easy:
            Number(parsed.easy) || 0,

          normal:
            Number(parsed.normal) || 0,

          pro:
            Number(parsed.pro) || 0,

          zeroRush:
            Number(parsed.zeroRush) || 0,
        };

      } catch {

        return {
          easy: 0,
          normal: 0,
          pro: 0,
          zeroRush: 0,
        };
      }

    });


  /* HISTORY */

  const [history, setHistory] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "tapRushHistory"
          );

        if (!saved) {
          return [];
        }

        const parsed =
          JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed.slice(0, 10)
          : [];

      } catch {

        return [];

      }

    });


  /* GAME SETTINGS */

  const settings = {

    easy: {
      duration: 10,
      label: "Easy",
    },

    normal: {
      duration: 15,
      label: "Normal",
    },

    pro: {
      duration: 20,
      label: "Pro",
    },

    zeroRush: {
      duration: 30,
      startingNumber: 50,
      label: "Zero Rush",
    },

  };


  /* CURRENT SETTINGS */

  const currentSettings =
    settings[gameMode];


  /* SELECT GAME MODE */

  const handleSelectGameMode = (
    selectedMode
  ) => {

    setGameMode(selectedMode);

  };


  /* START */

  const handleStart = () => {

    setResult(null);

    setScreen("countdown");

  };


  /* COUNTDOWN COMPLETE */

  const handleCountdownComplete =
    useCallback(() => {

      setGameId(
        (previous) =>
          previous + 1
      );

      setScreen("game");

    }, []);


  /* SAVE BEST SCORES */

  const saveBestScores = (
    updatedScores
  ) => {

    setBestScores(updatedScores);

    localStorage.setItem(
      "tapRushBestScores",
      JSON.stringify(updatedScores)
    );

  };


  /* SAVE HISTORY */

  const saveHistory = (
    updatedHistory
  ) => {

    setHistory(updatedHistory);

    localStorage.setItem(
      "tapRushHistory",
      JSON.stringify(updatedHistory)
    );

  };


  /* GAME OVER */

  const handleGameOver = useCallback(
    (gameResult) => {

      const currentBest =
        bestScores[gameMode] ?? 0;


      /*
       * ZERO RUSH
       *
       * Lower completion time
       * is better.
       */

      let isNewBest = false;

      let newBest = currentBest;


      if (gameMode === "zeroRush") {

        const completed =
          gameResult.completed === true;

        const completionTime =
          Number(
            gameResult.completionTime
          );


        if (
          completed &&
          Number.isFinite(
            completionTime
          ) &&
          (
            currentBest === 0 ||
            completionTime <
            currentBest
          )
        ) {

          newBest =
            completionTime;

          isNewBest = true;

        }

      }


      /*
       * NORMAL SCORE MODES
       *
       * Higher score is better.
       */

      else {

        newBest =
          Math.max(
            currentBest,
            gameResult.score
          );

        isNewBest =
          gameResult.score >
          currentBest;

      }


      /* UPDATE BEST */

      if (isNewBest) {

        const updatedScores = {
          ...bestScores,
          [gameMode]: newBest,
        };

        saveBestScores(
          updatedScores
        );

      }


      /* HISTORY ITEM */

      const historyItem = {

        id:
          `${Date.now()}-${gameId}`,

        gameMode,

        score:
          gameResult.score ?? 0,

        completionTime:
          gameResult.completionTime ??
          null,

        totalTaps:
          gameResult.totalTaps ?? 0,

        perfectTaps:
          gameResult.perfectTaps ?? 0,

        misses:
          gameResult.misses ?? 0,

        bestCombo:
          gameResult.bestCombo ?? 0,

        lives:
          gameResult.lives ?? null,

        completed:
          gameResult.completed ??
          false,

        duration:
          currentSettings.duration,

        time:
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

      };


      /* UPDATE HISTORY */

      const updatedHistory = [

        historyItem,

        ...history,

      ].slice(0, 10);


      saveHistory(
        updatedHistory
      );


      /* SAVE RESULT */

      setResult({
        ...gameResult,
        isNewBest,
        bestScore:
          isNewBest
            ? newBest
            : currentBest,
      });


      /* RESULT SCREEN */

      setScreen("result");

    },
    [
      bestScores,
      gameMode,
      history,
      currentSettings.duration,
      gameId,
    ]
  );


  /* PLAY AGAIN */

  const handlePlayAgain = () => {

    setResult(null);

    setScreen("countdown");

  };


  /* CHANGE MODE */

  const handleChangeMode = () => {

    setResult(null);

    setScreen("start");

  };


  /* VIEW SCORES */

  const handleViewScores = () => {

    setScreen("scores");

  };


  /* BACK FROM SCORES */

  const handleBackFromScores = () => {

    setScreen("start");

  };


  /* UI */

  return (

    <main className="app">


      {/* START */}

      {screen === "start" && (

        <StartScreen

          gameMode={
            gameMode
          }

          onSelectGameMode={
            handleSelectGameMode
          }

          onStart={
            handleStart
          }

          onViewScores={
            handleViewScores
          }

        />

      )}


      {/* COUNTDOWN */}

      {screen === "countdown" && (

        <CountdownScreen

          onComplete={
            handleCountdownComplete
          }

        />

      )}


      {/* GAME */}

      {screen === "game" && (

        <GameScreen

          key={gameId}

          gameMode={
            gameMode
          }

          duration={
            currentSettings.duration
          }

          startingNumber={
            currentSettings.startingNumber
          }

          onGameOver={
            handleGameOver
          }

        />

      )}


      {/* RESULT */}

      {screen === "result" && result && (

        <ResultScreen

          result={
            result
          }

          gameMode={
            gameMode
          }

          bestScore={
            bestScores[gameMode]
          }

          onPlayAgain={
            handlePlayAgain
          }

          onChangeMode={
            handleChangeMode
          }

        />

      )}


      {/* BEST SCORES */}

      {screen === "scores" && (

        <BestScores

          bestScores={
            bestScores
          }

          history={
            history
          }

          onBack={
            handleBackFromScores
          }

        />

      )}

    </main>
  );
}


export default App;