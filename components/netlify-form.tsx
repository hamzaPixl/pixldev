import React from "react";

// Hidden form for Netlify form detection
// This component should be included somewhere in your app (like in layout.tsx)
const NetlifyForm = () => {
  return (
    <form name="contact" data-netlify="true" style={{ display: "none" }}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="company" />
      <textarea name="message"></textarea>
    </form>
  );
};

export default NetlifyForm;
