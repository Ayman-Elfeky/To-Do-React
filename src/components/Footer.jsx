import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} To-Do App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
