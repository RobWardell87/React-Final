import React from "react";

const Message = ({ message, isError, isLoading }) => {
  if (!message) return null;

  const classes = ["message"];
  if (isError) classes.push("error");
  if (isLoading) classes.push("loading");

  return (
    <div className={classes.join(" ")} id="message__area">
      {message.split("\n").map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ))}
    </div>
  );
};

export default Message;
