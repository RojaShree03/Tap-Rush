/* TAP BUTTON */

function TapButton({
    onClick,
    isPerfect = false,
    label = "+1"
}) {
    return (
        <button
            type="button"
            className={`tap-button ${isPerfect ? "perfect-ready" : ""}`}
            onClick={onClick}
            aria-label="Tap"
        >
            <span className="tap-button-label">
                {label}
            </span>

            {isPerfect && (
                <span className="tap-button-perfect">
                    PERFECT
                </span>
            )}
        </button>
    )
}

export default TapButton