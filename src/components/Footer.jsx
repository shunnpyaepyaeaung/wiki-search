import React from "react";

function Footer() {
  const styles = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "#28abb9",
    color: "white",
    textAlign: "center",
  };
  return (
    <footer>
      {" "}
      <footer style={styles}>
        Copyright 2021 By <b>WikiSearch</b>
      </footer>
    </footer>
  );
}

export default Footer;
