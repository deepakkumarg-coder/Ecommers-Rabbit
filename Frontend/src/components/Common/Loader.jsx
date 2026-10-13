import "../../Loader.css"

/**
 * Logo loader: a ring spins around your logo.
 *
 * Props
 *  - size:       diameter of the spinner in px (default 120)
 *  - fullScreen: cover the whole page with a white overlay (default true)
 *  - label:      text read out by screen readers (default "Loading")
 */
const Loader = ({ size = 120, fullScreen = true, label = "Loading" }) => (
  <div
    className={`rb-loader${fullScreen ? " rb-loader--full" : ""}`}
    role="status"
    aria-live="polite"
  >
    <div className="rb-loader__spinner" style={{ "--rb-size": `${size}px` }}>
      <svg className="rb-loader__ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="rb-loader__track" cx="60" cy="60" r="54" />
        <circle className="rb-loader__arc" cx="60" cy="60" r="54" />
      </svg>
      <img className="rb-loader__logo" src="/logo.svg" alt="" />
    </div>
    <span className="rb-loader__sr">{label}</span>
  </div>
);

export default Loader;
