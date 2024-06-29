const Message = ({ text }) => {
  const messageStyle = {
    fontSize: 12,
    color: "green",
  };

  if (text == null) return null;

  return (
    <div>
      <p style={messageStyle}>{text}</p>
    </div>
  );
};

export default Message;