import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import "./Landing.css";

import { API_URL, TOKEN } from "../../env";

import { NoteSelection } from "./NoteSelection";

import { Form, Button, Input, Row, List } from "antd";

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
      <h1 style={{ left: "60%" }} className="choice-explain">
        Select which Note you want to work on
      </h1>
      <Form className="get-name" name="name" onFinish={handleName}>
        <Form.Item
          style={{ width: "50%" }}
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
        {result && (
          <Row>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={result.items}
              renderItem={(item) => (
                <List.Item>
                  <NoteSelection name={name} title={item.title} id={item.id} />
                </List.Item>
              )}
            />
          </Row>
        )}
      </div>
    </div>
  );
};
