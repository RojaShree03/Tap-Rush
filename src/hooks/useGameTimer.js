/* GAME TIMER */

import { useCallback, useEffect, useRef, useState } from "react"

function useGameTimer(duration, onComplete) {

    /* TIMER STATE */

    const [timeLeft, setTimeLeft] = useState(duration)

    /* TIMER REFS */

    const intervalRef = useRef(null)
    const completedRef = useRef(false)
    const onCompleteRef = useRef(onComplete)

    /* CALLBACK REF */

    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    /* CLEAR TIMER */

    const clearTimer = useCallback(() => {

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

    }, [])

    /* START TIMER */

    const startTimer = useCallback(() => {

        clearTimer()

        completedRef.current = false

        setTimeLeft(duration)

        const startTime = Date.now()
        const durationMs = duration * 1000

        intervalRef.current = setInterval(() => {

            const elapsed = Date.now() - startTime
            const remaining = Math.max(
                0,
                durationMs - elapsed
            )

            const seconds = Number(
                (remaining / 1000).toFixed(1)
            )

            setTimeLeft(seconds)

            /* TIMER COMPLETE */

            if (remaining <= 0) {

                clearTimer()

                if (!completedRef.current) {

                    completedRef.current = true

                    onCompleteRef.current?.()
                }
            }

        }, 100)

    }, [duration, clearTimer])

    /* RESET TIMER */

    const resetTimer = useCallback(() => {
        startTimer()
    }, [startTimer])

    /* CLEANUP */

    useEffect(() => {

        return () => {
            clearTimer()
        }

    }, [clearTimer])

    /* RETURN */

    return {
        timeLeft,
        resetTimer,
        startTimer,
        clearTimer
    }
}

export default useGameTimer