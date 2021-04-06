import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import "./Landing.css";

import { NoteSelection } from "./NoteSelection";

import { Form, Button, Input } from "antd";

export const Landing = () => {
  var [result, setResult] = useState(null);
  const [name, setName] = useState("");
  const handleName = (values) => {
    setName(values.name);
  };
  const getNotes = () => {
    fetch(
      "http://localhost:41184/notes?token=4f1ccc42bc33967c6d0100f4428105c4d0669df0e933e6facc84001dbb39a44856eddc8ecb5698921788045c28630a1d33f7c10787198c7b8e9e9c42b5d3dd69",
      {
        method: "GET",
      }
    )
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
