import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NoteSelection = ({ title, id, name }) => {
  return (
    <Card
      title={title}
      className={id}
      id={id}
      style={{ width: 300, marginBottom: "5rem" }}
    >
      <p>Lorem Ipsum</p>
      <p>Lorem Ipsum</p>
      <p>Lorem Ipsum</p>
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
