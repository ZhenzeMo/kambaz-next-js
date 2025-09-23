export default function Modules() {
    return (
      <div>
        <button>Collapse All</button>
        <button>View Progress</button>
        <button>Publish All ▼</button>
        <button>+ Module</button>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1 - Introduction to Machine Learning</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Understand ML fundamentals</li>
                  <li className="wd-content-item">Learn supervised vs unsupervised learning</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Pattern Recognition and Machine Learning - Chapter 1</li>
                  <li className="wd-content-item">Introduction to Neural Networks</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">ML Applications</li>
                  <li className="wd-content-item">Data Preprocessing</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2 - Linear Regression and Classification</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Implement linear regression</li>
                  <li className="wd-content-item">Understand classification algorithms</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Gradient Descent</li>
                  <li className="wd-content-item">Logistic Regression</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3 - Deep Learning and Neural Networks</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Build neural networks</li>
                  <li className="wd-content-item">Understand backpropagation</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">CNN Architecture</li>
                  <li className="wd-content-item">RNN and LSTM</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
