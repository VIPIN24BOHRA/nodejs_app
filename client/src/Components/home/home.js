import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home(props) {
  let location = useLocation();

  return (
    <div className="Home">
      <h1>WELCOME</h1>
      <p>
        <Link to="/register"> register</Link> or
        <Link to="/login"> login</Link>
      </p>
    </div>
  );
}
