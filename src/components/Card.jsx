import React from "react";

const Card = ({ job }) => {
  // console.log(job)
  const { company, date, location, position, status, type, id } = job;
  // console.log(status);

  const getClassName = () => {
    switch (status) {
      case "Devam Ediyor":
        return "pending";
      case "Reddedildi":
        return "rejected";
      case "Mülakat":
        return "interview";
      default:
        return "default";
    }
  };

  return (
    <div className="card">
      {/* top-area */}
      <div className="head">
        <div className="letter">
          <p>{company[0]}</p>
        </div>
        <div className="info">
          <p>{position}</p>
          <p>{company}</p>
        </div>
      </div>
      {/* bottom-area */}
      <div className="body">
        <div className="field">
          <img src="./images/bag.png" alt="" />
          <p>{location}</p>
        </div>
        <div className="field">
          <img src="./images/bag.png" alt="" />
          <p>{type}</p>
        </div>
        <div className="field">
          <img src="./images/bag.png" alt="" />
          <p>{date}</p>
        </div>
        <div className="status">
          <span className={getClassName()}>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
