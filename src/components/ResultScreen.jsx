/* RESULT SCREEN */

function ResultScreen({
    result,
    gameMode,
    bestScore,
    onPlayAgain,
    onChangeMode
}) {

    /* RESULT DATA */

    const isZeroRush = gameMode === "zeroRush"
    const isNewBest = result?.isNewBest ?? false

    const score = result?.score ?? 0
    const completionTime = result?.completionTime
    const totalTaps = result?.totalTaps ?? 0
    const perfectTaps = result?.perfectTaps ?? 0
    const misses = result?.misses ?? 0
    const bestCombo = result?.bestCombo ?? 0
    const lives = result?.lives
    const completed = result?.completed ?? false

    /* ACCURACY */

    const attempts = totalTaps + misses

    const accuracy = attempts > 0
        ? Math.round((totalTaps / attempts) * 100)
        : 0

    /* MODE LABEL */

    const modeLabels = {
        easy: "Easy",
        normal: "Normal",
        pro: "Pro",
        zeroRush: "Zero Rush"
    }

    const modeLabel = modeLabels[gameMode] || "Game"

    /* RESULT TITLE */

    let resultTitle = "Great Run"

    if (isZeroRush) {
        resultTitle = completed
            ? "Zero Reached"
            : "Time's Up"
    } else if (gameMode === "pro" && lives === 0) {
        resultTitle = "Out of Lives"
    } else if (isNewBest) {
        resultTitle = "New Best"
    }

    /* RESULT SUBTITLE */

    let resultSubtitle = "Keep pushing your reaction speed."

    if (isZeroRush && completed) {
        resultSubtitle = "You reached zero. Can you do it faster?"
    } else if (isZeroRush) {
        resultSubtitle = "Get to zero before the clock runs out."
    } else if (gameMode === "pro" && lives === 0) {
        resultSubtitle = "Stay precise and protect your lives."
    }

    return (
        <section className="result-screen">

            {/* RESULT HEADER */}

            <header className="result-header">

                <span className="result-mode">
                    {modeLabel}
                </span>

                <span className="result-status">
                    {completed ? "COMPLETED" : "FINISHED"}
                </span>

            </header>

            {/* RESULT CONTENT */}

            <main className="result-content">

                {/* RESULT TITLE */}

                <p className="result-eyebrow">
                    {isNewBest ? "PERSONAL RECORD" : "YOUR RUN"}
                </p>

                <h1 className="result-title">
                    {resultTitle}
                </h1>

                <p className="result-subtitle">
                    {resultSubtitle}
                </p>

                {/* PRIMARY RESULT */}

                <div className="final-result">

                    {isZeroRush ? (
                        <>
                            <span className="final-result-label">
                                COMPLETION TIME
                            </span>

                            <strong className="final-result-value">
                                {completionTime !== null &&
                                    completionTime !== undefined
                                    ? `${completionTime.toFixed(2)}s`
                                    : "--"}
                            </strong>
                        </>
                    ) : (
                        <>
                            <span className="final-result-label">
                                SCORE
                            </span>

                            <strong className="final-result-value">
                                {score}
                            </strong>
                        </>
                    )}

                </div>

                {/* NEW BEST */}

                {isNewBest && (
                    <div className="new-best-badge">
                        ✦ NEW BEST
                    </div>
                )}

                {/* RESULT STATS */}

                <div className="result-stats">

                    {!isZeroRush && (
                        <div className="result-stat">

                            <span className="result-stat-label">
                                BEST
                            </span>

                            <strong className="result-stat-value">
                                {bestScore}
                            </strong>

                        </div>
                    )}

                    <div className="result-stat">

                        <span className="result-stat-label">
                            TAPS
                        </span>

                        <strong className="result-stat-value">
                            {totalTaps}
                        </strong>

                    </div>

                    {!isZeroRush && (
                        <div className="result-stat">

                            <span className="result-stat-label">
                                ACCURACY
                            </span>

                            <strong className="result-stat-value">
                                {accuracy}%
                            </strong>

                        </div>
                    )}

                    {isZeroRush && (
                        <div className="result-stat">

                            <span className="result-stat-label">
                                STARTED
                            </span>

                            <strong className="result-stat-value">
                                20
                            </strong>

                        </div>
                    )}

                    <div className="result-stat">

                        <span className="result-stat-label">
                            {isZeroRush ? "MISSES" : "PERFECT"}
                        </span>

                        <strong className="result-stat-value">
                            {isZeroRush
                                ? misses
                                : perfectTaps}
                        </strong>

                    </div>

                    {!isZeroRush && (
                        <div className="result-stat">

                            <span className="result-stat-label">
                                BEST COMBO
                            </span>

                            <strong className="result-stat-value">
                                {bestCombo}
                            </strong>

                        </div>
                    )}

                    {gameMode === "pro" && (
                        <div className="result-stat">

                            <span className="result-stat-label">
                                LIVES LEFT
                            </span>

                            <strong className="result-stat-value">
                                {lives ?? 0}
                            </strong>

                        </div>
                    )}

                </div>

                {/* RESULT ACTIONS */}

                <div className="result-actions">

                    <button
                        type="button"
                        className="result-primary-button"
                        onClick={onPlayAgain}
                    >
                        Play Again
                        <span>→</span>
                    </button>

                    <button
                        type="button"
                        className="result-secondary-button"
                        onClick={onChangeMode}
                    >
                        Change Mode
                    </button>

                </div>

            </main>

            {/* RESULT FOOTER */}

            <footer className="result-footer">
                Tap Rush · Reaction Lab
            </footer>

        </section>
    )
}

export default ResultScreen