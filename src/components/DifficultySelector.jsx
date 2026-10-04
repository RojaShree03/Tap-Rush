/* GAME MODE SELECTOR */

const gameModes = [
    {
        id: "easy",
        title: "Easy",
        description: "Tap as many times as you can",
        meta: "10 seconds",
        icon: "●"
    },
    {
        id: "normal",
        title: "Normal",
        description: "Hit the moving target",
        meta: "15 seconds",
        icon: "◉"
    },
    {
        id: "pro",
        title: "Pro",
        description: "Fast target with 3 lives",
        meta: "20 seconds",
        icon: "◆"
    },
    {
        id: "zeroRush",
        title: "Zero Rush",
        description: "Start at 50 and reach zero",
        meta: "30 seconds",
        icon: "0"
    }
]

function DifficultySelector({ gameMode, onSelectGameMode }) {

    return (
        <div className="mode-selector">

            {/* MODE CARDS */}

            <div className="mode-grid">

                {gameModes.map((mode) => {

                    const isSelected = gameMode === mode.id

                    return (
                        <button
                            key={mode.id}
                            type="button"
                            className={`mode-card ${isSelected ? "selected" : ""} mode-${mode.id}`}
                            onClick={() => onSelectGameMode(mode.id)}
                        >

                            {/* MODE ICON */}

                            <span className="mode-icon">
                                {mode.icon}
                            </span>

                            {/* MODE CONTENT */}

                            <span className="mode-content">

                                <span className="mode-title">
                                    {mode.title}
                                </span>

                                <span className="mode-description">
                                    {mode.description}
                                </span>

                                <span className="mode-meta">
                                    {mode.meta}
                                </span>

                            </span>

                            {/* SELECTED INDICATOR */}

                            <span className="mode-check">
                                {isSelected ? "✓" : ""}
                            </span>

                        </button>
                    )
                })}

            </div>

        </div>
    )
}

export default DifficultySelector