import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "reactstrap";
import "./MiddleSection.css";

function MiddleSection() {
  const history = useHistory();
  return (
    <div className="sectionMain">
      <aside className="between">
        <p>Bring it all together with the leader in social media management.</p>
        <button
          className={`btn btn-success btn-trial btn-lg`}
          onClick={() => history.push("/login")}
        >
          Start free trial
        </button>
        <div className="btn-trial">
          <a className="link" href="">
            Compare Plans
          </a>
        </div>
      </aside>
    </div>
  );
}

export default MiddleSection;
