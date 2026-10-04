/* COUNTDOWN SCREEN */

import { useEffect, useState } from "react"

function CountdownScreen({ onComplete }) {

    const [count, setCount] = useState(3)

    /* COUNTDOWN */

    useEffect(() => {

        let timer

        if (count > 1) {

            timer = setTimeout(() => {
                setCount((current) => current - 1)
            }, 1000)

        } else {

            timer = setTimeout(() => {
                setCount(0)

                setTimeout(() => {
                    onComplete()
                }, 450)

            }, 1000)
        }

        return () => {
            clearTimeout(timer)
        }

    }, [count, onComplete])

    /* RENDER */

    return (
        <section className="countdown-screen">

            <div className="countdown-content">

                {/* COUNTDOWN LABEL */}

                <p className="countdown-label">
                    GET READY
                </p>

                {/* COUNTDOWN NUMBER */}

                {count > 0 ? (
                    <div
                        key={count}
                        className="countdown-number"
                    >
                        {count}
                    </div>
                ) : (
                    <div
                        className="countdown-go"
                    >
                        GO!
                    </div>
                )}

                {/* COUNTDOWN HINT */}

                <p className="countdown-hint">
                    Focus. Tap fast.
                </p>

            </div>

        </section>
    )
}

export default CountdownScreen;