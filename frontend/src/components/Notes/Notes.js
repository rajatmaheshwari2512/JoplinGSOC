import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fetch from "cross-fetch";
import io from "socket.io-client";
import queryString from "query-string";
import { Input } from "antd";
import "./Notes.css";

const ENDPOINT = "http://localhost:3000";

var socket;

const { TextArea } = Input;

export const Notes = ({ location }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();
  useEffect(() => {
    console.log(location.search);
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (err) => {
      if (err) {
        history.push("/");
      }
    });
    fetch(
      `http://localhost:41184/notes/${room}?token=4f1ccc42bc33967c6d0100f4428105c4d0669df0e933e6facc84001dbb39a44856eddc8ecb5698921788045c28630a1d33f7c10787198c7b8e9e9c42b5d3dd69&fields=title,body`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      });
  }, [ENDPOINT, location.search]);
  return (
    <div className="notes-wrapper">
      {room && <h1> Room: {room}</h1>}
      <h1>Title:</h1>
      {title && (
        <Input
          style={{ width: "300px", fontSize: "1.2rem" }}
          placeholder="Note Title"
          defaultValue={title}
        />
      )}
      <h1>Body:</h1>
      {body && (
        <TextArea
          style={{ width: "70vw", height: "75vh", fontSize: "1.2rem" }}
          rows={10}
          defaultValue={body}
        />
      )}
    </div>
  );
};
