import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NoteSelection = ({ title, id, name }) => {
  return (
    <Card
      title={title}
      className={id}
      id={id}
      style={{ width: "100%", marginBottom: "5rem" }}
    >
      <p>The ID Of this Room is:</p>
      <p>
        <b>{id}</b>
      </p>
      <Link
        onClick={(e) => (!name ? e.preventDefault() : null)}
        to={`/notes?name=${name}&room=${id}`}
      >
        <Button type="primary" htmlType="submit">
          Collaborate on this Note
        </Button>
      </Link>
    </Card>
  );
};
