/* GAME SCREEN */

import { useCallback, useEffect, useRef, useState } from "react"
import TapButton from "./TapButton"
import useGameTimer from "../hooks/useGameTimer"

function GameScreen({
    gameMode,
    duration,
    startingNumber = 50,
    onGameOver
}) {

    /* GAME STATE */

    const [score, setScore] = useState(0)
    const [totalTaps, setTotalTaps] = useState(0)
    const [perfectTaps, setPerfectTaps] = useState(0)
    const [combo, setCombo] = useState(0)
    const [bestCombo, setBestCombo] = useState(0)
    const [lives, setLives] = useState(
        gameMode === "pro" ? 3 : null
    )
    const [misses, setMisses] = useState(0)

    /* ZERO RUSH */

    const [remaining, setRemaining] = useState(
        startingNumber
    )

    /* TARGET POSITION */

    const [position, setPosition] = useState({
        x: 50,
        y: 50
    })

    /* FEEDBACK */

    const [isPerfect, setIsPerfect] = useState(false)
    const [feedback, setFeedback] = useState("")
    const [isGameOver, setIsGameOver] = useState(false)

    /* REFS */

    const gameAreaRef = useRef(null)
    const completedRef = useRef(false)

    const perfectTimeoutRef = useRef(null)
    const feedbackTimeoutRef = useRef(null)

    /* MODE */

    const isEasy = gameMode === "easy"
    const isNormal = gameMode === "normal"
    const isPro = gameMode === "pro"
    const isZeroRush = gameMode === "zeroRush"

    const isMovingMode =
        isNormal || isPro

    /* GAME OVER */

    const handleTimeUp = useCallback(() => {

        if (completedRef.current) {
            return
        }

        completedRef.current = true
        setIsGameOver(true)

        onGameOver({
            gameMode,
            score,
            totalTaps,
            perfectTaps,
            misses,
            bestCombo,
            lives,
            completed: false,
            completionTime: null
        })

    }, [
        gameMode,
        score,
        totalTaps,
        perfectTaps,
        misses,
        bestCombo,
        lives,
        onGameOver
    ])

    /* TIMER */

    const {
        timeLeft,
        resetTimer
    } = useGameTimer(
        duration,
        handleTimeUp
    )

    /* START TIMER */

    useEffect(() => {

        resetTimer()

        return () => {

            if (perfectTimeoutRef.current) {
                clearTimeout(
                    perfectTimeoutRef.current
                )
            }

            if (feedbackTimeoutRef.current) {
                clearTimeout(
                    feedbackTimeoutRef.current
                )
            }

        }

    }, [resetTimer])

    /* MOVE TARGET */

    const moveTarget = useCallback(() => {

        if (!gameAreaRef.current) {
            return
        }

        const x =
            Math.floor(Math.random() * 70) + 15

        const y =
            Math.floor(Math.random() * 65) + 18

        setPosition({
            x,
            y
        })

    }, [])

    /* INITIAL TARGET */

    useEffect(() => {

        if (isMovingMode) {
            moveTarget()
        }

    }, [
        isMovingMode,
        moveTarget
    ])

    /* FEEDBACK */

    const showFeedback = useCallback(
        (message) => {

            setFeedback(message)

            if (feedbackTimeoutRef.current) {
                clearTimeout(
                    feedbackTimeoutRef.current
                )
            }

            feedbackTimeoutRef.current =
                setTimeout(() => {
                    setFeedback("")
                }, 500)

        },
        []
    )

    /* PERFECT FEEDBACK */

    const triggerPerfect = useCallback(() => {

        setIsPerfect(true)

        if (perfectTimeoutRef.current) {
            clearTimeout(
                perfectTimeoutRef.current
            )
        }

        perfectTimeoutRef.current =
            setTimeout(() => {
                setIsPerfect(false)
            }, 350)

    }, [])

    /* ZERO RUSH COMPLETE */

    const finishZeroRush = useCallback(() => {

        if (completedRef.current) {
            return
        }

        completedRef.current = true
        setIsGameOver(true)

        const elapsedSeconds =
            duration - timeLeft

        const completionTime =
            Math.max(
                0.01,
                Number(
                    elapsedSeconds.toFixed(2)
                )
            )

        onGameOver({
            gameMode: "zeroRush",
            score: 0,
            totalTaps,
            perfectTaps,
            misses,
            bestCombo,
            lives: null,
            completed: true,
            completionTime
        })

    }, [
        duration,
        timeLeft,
        totalTaps,
        perfectTaps,
        misses,
        bestCombo,
        onGameOver
    ])

    /* SUCCESSFUL TAP */

    const handleTap = useCallback(() => {

        if (
            completedRef.current ||
            isGameOver
        ) {
            return
        }

        /* ZERO RUSH */

        if (isZeroRush) {

            const nextRemaining =
                Math.max(
                    0,
                    remaining - 1
                )

            setRemaining(nextRemaining)

            setTotalTaps(
                current => current + 1
            )

            if (nextRemaining === 0) {
                finishZeroRush()
            }

            return
        }

        /* SCORE */

        setScore(
            current => current + 1
        )

        setTotalTaps(
            current => current + 1
        )

        /* COMBO */

        setCombo(current => {

            const nextCombo =
                current + 1

            setBestCombo(best =>
                Math.max(
                    best,
                    nextCombo
                )
            )

            return nextCombo
        })

        /* EASY */

        if (isEasy) {
            return
        }

        /* MOVING TARGET */

        if (isMovingMode) {

            setPerfectTaps(
                current => current + 1
            )

            triggerPerfect()

            showFeedback("Perfect")

            moveTarget()
        }

    }, [
        isGameOver,
        isZeroRush,
        remaining,
        finishZeroRush,
        isEasy,
        isMovingMode,
        triggerPerfect,
        showFeedback,
        moveTarget
    ])

    /* MISS */

    const handleMiss = useCallback(() => {

        if (
            completedRef.current ||
            isGameOver ||
            !isPro
        ) {
            return
        }

        setMisses(
            current => current + 1
        )

        setCombo(0)

        setLives(current => {

            const nextLives =
                Math.max(
                    0,
                    current - 1
                )

            if (nextLives === 0) {

                completedRef.current = true
                setIsGameOver(true)

                onGameOver({
                    gameMode: "pro",
                    score,
                    totalTaps,
                    perfectTaps,
                    misses: misses + 1,
                    bestCombo,
                    lives: 0,
                    completed: false,
                    completionTime: null
                })
            }

            return nextLives
        })

        showFeedback("Miss")

        moveTarget()

    }, [
        isGameOver,
        isPro,
        score,
        totalTaps,
        perfectTaps,
        misses,
        bestCombo,
        onGameOver,
        showFeedback,
        moveTarget
    ])

    /* FORMAT TIME */

    const formattedTime =
        timeLeft.toFixed(1)

    /* RENDER */

    return (
        <section
            className={`game-screen game-${gameMode}`}
        >

            {/* GAME HEADER */}

            <header className="game-header">

                {/* SCORE */}

                <div className="game-stat">

                    <span className="game-stat-label">
                        {isZeroRush
                            ? "REMAINING"
                            : "SCORE"}
                    </span>

                    <strong
                        className="game-stat-value"
                    >
                        {isZeroRush
                            ? remaining
                            : score}
                    </strong>

                </div>

                {/* TIMER */}

                <div className="game-timer">

                    <span className="game-stat-label">
                        TIME
                    </span>

                    <strong
                        className="game-stat-value"
                    >
                        {formattedTime}
                    </strong>

                </div>

                {/* LIVES */}

                {isPro && (
                    <div className="game-lives">

                        <span className="game-stat-label">
                            LIVES
                        </span>

                        <strong
                            className="game-stat-value"
                            aria-label={`${lives} lives remaining`}
                        >
                            {"♥".repeat(lives)}
                            {"♡".repeat(
                                3 - lives
                            )}
                        </strong>

                    </div>
                )}

                {/* COMBO */}

                {!isZeroRush && (
                    <div className="game-combo">

                        <span className="game-stat-label">
                            COMBO
                        </span>

                        <strong
                            className="game-stat-value"
                        >
                            {combo}
                        </strong>

                    </div>
                )}

            </header>

            {/* PLAY AREA */}

            <main
                ref={gameAreaRef}
                className="game-area"
                onClick={handleMiss}
            >

                {/* EASY */}

                {isEasy && (
                    <div className="easy-game-center">

                        <TapButton
                            onClick={handleTap}
                            isPerfect={isPerfect}
                            label="+1"
                        />

                        {feedback && (
                            <span className="tap-feedback">
                                {feedback}
                            </span>
                        )}

                    </div>
                )}

                {/* NORMAL / PRO */}

                {isMovingMode && (
                    <div
                        className="moving-target-wrapper"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`
                        }}
                    >

                        <TapButton
                            onClick={(event) => {

                                event.stopPropagation()

                                handleTap()
                            }}
                            isPerfect={isPerfect}
                            label="+1"
                        />

                    </div>
                )}

                {/* ZERO RUSH */}

                {isZeroRush && (
                    <div className="zero-rush-center">

                        <span className="zero-rush-label">
                            REACH ZERO
                        </span>

                        <div className="zero-rush-number">
                            {remaining}
                        </div>

                        <TapButton
                            onClick={(event) => {

                                event.stopPropagation()

                                handleTap()
                            }}
                            isPerfect={false}
                            label="-1"
                        />

                        <span className="zero-rush-target">
                            {remaining} → 0
                        </span>

                    </div>
                )}

                {/* GAME FEEDBACK */}

                {feedback && !isEasy && (
                    <div
                        className={`game-feedback ${feedback === "Miss"
                                ? "feedback-miss"
                                : "feedback-perfect"
                            }`}
                    >
                        {feedback}
                    </div>
                )}

            </main>

            {/* GAME FOOTER */}

            <footer className="game-footer">

                {isZeroRush ? (
                    <>
                        <span>
                            Every tap brings you closer.
                        </span>

                        <strong>
                            {remaining} remaining
                        </strong>
                    </>
                ) : (
                    <>
                        <span>
                            {isPro
                                ? "Don't miss the target."
                                : "Stay focused and tap fast."}
                        </span>

                        <strong>
                            Best combo: {bestCombo}
                        </strong>
                    </>
                )}

            </footer>

        </section>
    )
}

export default GameScreen