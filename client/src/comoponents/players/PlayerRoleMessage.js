import React, { useContext, useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import { SocketContext } from "../../context";

const PlayerRoleMessage = (props) => {
  const [role, setRole] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("roles", (roles) => {
      roles.forEach((r) => {
        if (r.username === props.username) {
          setRole({
            charactere: r.charactere,
            knowledge: setKnowledge(r.knowledge),
            group: r.group,
          });
        }
      });

      setIsVisible(true);
    });
  });

  const setKnowledge = (knowledge) => {
    return knowledge.length === 0 ? ["nobody"] : knowledge;
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && role ? (
        <Message onDismiss={handleDismiss} floating size="small">
          <Message.Content style={contentStyle}>
            You are
            <p
              className={
                role.group === "mordred" || role.group === "oberon"
                  ? "evil"
                  : "good"
              }
              style={pStyle}
            >
              {role.charactere.name}
            </p>
            {role.charactere.description}
          </Message.Content>
          <Message.List style={ListStyle}>
            {role.knowledge.map((k) => (
              <Message.Item key={k}>{k}</Message.Item>
            ))}
          </Message.List>
        </Message>
      ) : null}
    </>
  );
};

export default PlayerRoleMessage;

const contentStyle = {
  display: "flex",
};

const ListStyle = {
  margin: "15px",
  textTransform: "capitalize",
};

const pStyle = {
  fontWeight: "bold",
  marginLeft: "0.5em",
  marginRight: "0.5em",
  textTransform: "capitalize",
};
