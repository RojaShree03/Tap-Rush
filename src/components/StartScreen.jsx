/* START SCREEN */

import DifficultySelector from "./DifficultySelector"

function StartScreen({
    gameMode,
    onSelectGameMode,
    onStart,
    onViewScores
}) {

    return (
        <section className="start-screen">

            {/* HEADER */}

            <header className="start-header">

                {/* BRAND */}

                <div className="brand">

                    <div className="brand-icon">
                        ⚡
                    </div>

                    <div className="brand-text">

                        <span className="brand-name">
                            TAP RUSH
                        </span>

                        <span className="brand-subtitle">
                            REACTION LAB
                        </span>

                    </div>

                </div>

                {/* SCORES BUTTON */}

                <button
                    type="button"
                    className="icon-button"
                    onClick={onViewScores}
                    aria-label="View best scores"
                    title="Best Scores"
                >
                    🏆
                </button>

            </header>

            {/* START CONTENT */}

            <main className="start-content">

                {/* EYEBROW */}

                <p className="start-eyebrow">
                    REACTION GAME
                </p>

                {/* TITLE */}

                <h1>
                    How fast can you tap?
                </h1>

                {/* DESCRIPTION */}

                <p className="start-description">
                    Choose your challenge, stay focused,
                    and chase your personal best.
                </p>

                {/* GAME MODES */}

                <DifficultySelector
                    gameMode={gameMode}
                    onSelectGameMode={onSelectGameMode}
                />

                {/* START BUTTON */}

                <button
                    type="button"
                    className="start-button"
                    onClick={onStart}
                >
                    Start Game
                    <span>→</span>
                </button>

            </main>

            {/* FOOTER */}

            <footer className="start-footer">
                Built for speed · Designed for focus
            </footer>

        </section>
    )
}

export default StartScreen