import Link from "next/link";

export const AnimatedButton = () => (
  <div className="btn-row fade-in">
    <Link
      href="/blog/how-i-got-here-pt-2-the-software-development-journey"
      className="btn btn-animate"
    >
      <div className="arrow first">
        <div className="arrow-fill"></div>
        <div className="arrow-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <polyline
              points="18 8 18 18 8 18"
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
            ></polyline>
            <line
              x1="18"
              y1="18"
              x2="5"
              y2="5"
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
            ></line>
          </svg>
        </div>
      </div>
      <div className="btn-content">
        <div className="btn-fill"></div>
        <div className="btn-text">
          <span>Read my full story</span>
        </div>
      </div>
      <div className="arrow second">
        <div className="arrow-fill"></div>
        <div className="arrow-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <polyline
              points="18 8 18 18 8 18"
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
            ></polyline>
            <line
              x1="18"
              y1="18"
              x2="5"
              y2="5"
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
            ></line>
          </svg>
        </div>
      </div>
    </Link>
  </div>
)