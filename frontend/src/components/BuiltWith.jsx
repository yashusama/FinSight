import "./BuiltWith.css";

function BuiltWith() {
  return (
    <section className="built-with">

      <h2>Built With Modern Technologies</h2>

      <div className="tech-grid">

        <div className="tech-card">
          ⚛
          <h3>React</h3>
        </div>

        <div className="tech-card">
          🟢
          <h3>Node.js</h3>
        </div>

        <div className="tech-card">
          🚀
          <h3>Express</h3>
        </div>

        <div className="tech-card">
          🍃
          <h3>MongoDB</h3>
        </div>

        <div className="tech-card">
          🔐
          <h3>JWT Auth</h3>
        </div>

      </div>

    </section>
  );
}

export default BuiltWith;