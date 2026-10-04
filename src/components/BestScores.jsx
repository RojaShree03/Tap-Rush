/* BEST SCORES */

function BestScores({
    bestScores,
    history,
    onBack
}) {

    /* MODE CONFIG */

    const modes = [
        {
            id: "easy",
            title: "Easy",
            description: "Fast tapping"
        },
        {
            id: "normal",
            title: "Normal",
            description: "Moving target"
        },
        {
            id: "pro",
            title: "Pro",
            description: "Precision + lives"
        },
        {
            id: "zeroRush",
            title: "Zero Rush",
            description: "Race to zero"
        }
    ]

    /* FORMAT HISTORY */

    const recentGames = [...history]
        .reverse()
        .slice(0, 10)

    const formatDate = (value) => {

        if (!value) {
            return "--"
        }

        const date = new Date(value)

        if (Number.isNaN(date.getTime())) {
            return "--"
        }

        return date.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short"
        })
    }

    const formatResult = (game) => {

        if (game.gameMode === "zeroRush") {

            if (
                game.completionTime === null ||
                game.completionTime === undefined
            ) {
                return "DNF"
            }

            return `${Number(game.completionTime).toFixed(2)}s`
        }

        return `${game.score ?? 0}`
    }

    const getModeLabel = (gameMode) => {

        const mode = modes.find(
            (item) => item.id === gameMode
        )

        return mode?.title || "Game"
    }

    return (
        <section className="scores-screen">

            {/* SCORES HEADER */}

            <header className="scores-header">

                <button
                    type="button"
                    className="icon-button back-button"
                    onClick={onBack}
                    aria-label="Go back"
                >
                   <span>←</span> 
                </button>

                <div className="scores-heading">

                    <span className="scores-eyebrow">
                        PERFORMANCE
                    </span>

                    <h1>
                        Best Scores
                    </h1>

                </div>

                <div className="scores-header-spacer" />

            </header>

            {/* BEST SCORE CARDS */}

            <main className="scores-content">

                <section className="best-score-section">

                    <div className="section-heading">

                        <span>
                            PERSONAL RECORDS
                        </span>

                        <small>
                            Your best runs
                        </small>

                    </div>

                    <div className="best-score-grid">

                        {modes.map((mode) => {

                            const best = bestScores?.[mode.id] ?? 0
                            const isZeroRush = mode.id === "zeroRush"

                            return (
                                <article
                                    key={mode.id}
                                    className={`best-score-card best-score-${mode.id}`}
                                >

                                    {/* CARD TOP */}

                                    <div className="best-score-card-top">

                                        <span className="best-score-mode">
                                            {mode.title}
                                        </span>

                                        <span className="best-score-icon">
                                            {isZeroRush ? "0" : "✦"}
                                        </span>

                                    </div>

                                    {/* CARD VALUE */}

                                    <div className="best-score-value">

                                        {isZeroRush ? (
                                            best > 0
                                                ? `${Number(best).toFixed(2)}s`
                                                : "--"
                                        ) : (
                                            best > 0
                                                ? best
                                                : "--"
                                        )}

                                    </div>

                                    {/* CARD DESCRIPTION */}

                                    <span className="best-score-description">
                                        {isZeroRush
                                            ? "Fastest completion"
                                            : mode.description}
                                    </span>

                                </article>
                            )
                        })}

                    </div>

                </section>

                {/* RECENT GAMES */}

                <section className="recent-games-section">

                    <div className="section-heading">

                        <span>
                            RECENT GAMES
                        </span>

                        <small>
                            Last 10 runs
                        </small>

                    </div>

                    {recentGames.length === 0 ? (

                        <div className="empty-history">

                            <span className="empty-history-icon">
                                ◌
                            </span>

                            <h2>
                                No games yet
                            </h2>

                            <p>
                                Complete your first run to see it here.
                            </p>

                        </div>

                    ) : (

                        <div className="history-list">

                            {recentGames.map((game, index) => (

                                <article
                                    key={`${game.time}-${index}`}
                                    className="history-row"
                                >

                                    {/* HISTORY MODE */}

                                    <div className="history-mode">

                                        <span className="history-mode-dot" />

                                        <div>

                                            <strong>
                                                {getModeLabel(game.gameMode)}
                                            </strong>

                                            <span>
                                                {formatDate(game.time)}
                                            </span>

                                        </div>

                                    </div>

                                    {/* HISTORY RESULT */}

                                    <div className="history-result">

                                        <span>
                                            {game.gameMode === "zeroRush"
                                                ? "TIME"
                                                : "SCORE"}
                                        </span>

                                        <strong>
                                            {formatResult(game)}
                                        </strong>

                                    </div>

                                    {/* HISTORY TAPS */}

                                    <div className="history-detail">

                                        <span>
                                            TAPS
                                        </span>

                                        <strong>
                                            {game.totalTaps ?? 0}
                                        </strong>

                                    </div>

                                    {/* HISTORY COMBO */}

                                    {!isZeroRushGame(game.gameMode) && (
                                        <div className="history-detail">

                                            <span>
                                                COMBO
                                            </span>

                                            <strong>
                                                {game.bestCombo ?? 0}
                                            </strong>

                                        </div>
                                    )}

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

            {/* SCORES FOOTER */}

            <footer className="scores-footer">
                Tap Rush · Reaction Lab
            </footer>

        </section>
    )
}

/* MODE HELPER */

function isZeroRushGame(gameMode) {
    return gameMode === "zeroRush"
}

export default BestScores