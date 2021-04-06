import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import "./Landing.css";

import { API_URL, TOKEN } from "../../env";

import { NoteSelection } from "./NoteSelection";

import { Form, Button, Input } from "antd";

export const Landing = () => {
  var [result, setResult] = useState(null);
  const [name, setName] = useState("");
  const handleName = (values) => {
    setName(values.name);
  };
  const getNotes = () => {
    fetch(`${API_URL}/notes?token=${TOKEN}`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setResult(res);
      });
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div className="main-wrapper">
      <h1 className="choice-explain">Select which Note you want to work on</h1>
      <Form className="get-name" name="name" onFinish={handleName}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Enter Your Username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Set Name
          </Button>
        </Form.Item>
      </Form>
      <div className="all-notes">
        {result &&
          result.items.map((i) => {
            return <NoteSelection name={name} title={i.title} id={i.id} />;
          })}
      </div>
    </div>
  );
};
