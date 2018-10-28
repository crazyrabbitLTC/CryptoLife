import React from "react";

function SponsorBar(props) {
  const { sponsorAddress, emergencyDetails } = props;
  return (
    <div className="">
      <div className="sponsorBanner">
        <img src="https://cdn.worldvectorlogo.com/logos/air-france-11.svg" />
      </div>
      <div className="sponsorAddress">
        Sponsor Address:{" "}
        <a href={"https://blockscout.com/poa/dai/address/" + sponsorAddress}>
          {sponsorAddress}
        </a>
      </div>
      <div className="sponsorProject">
      Relief Program: {emergencyDetails}</div>
    </div>
  );
}

export default SponsorBar;
