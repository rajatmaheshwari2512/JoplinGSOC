import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fetch from "cross-fetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import queryString from "query-string";
import { Input } from "antd";

import { API_URL, ENDPOINT_URL, TOKEN } from "../../env";

import "./Notes.css";

const ENDPOINT = ENDPOINT_URL;

var socket;
toast.configure();

const { TextArea } = Input;

export const Notes = ({ location }) => {
  const handleBody = (newBody) => {
    setBody(newBody.target.value);
    fetch(`${API_URL}/notes/${room}?token=${TOKEN}`, {
      method: "PUT",
      body: JSON.stringify({
        body: newBody.target.value,
      }),
    }).then((res) => {
      socket.emit("sendBody", newBody.target.value, () => {
        console.log("New Body Sent");
      });
    });
  };
  const handleTitle = (newTitle) => {
    setTitle(newTitle.target.value);
    fetch(`${API_URL}/notes/${room}?token=${TOKEN}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTitle.target.value,
      }),
    }).then((res) => {
      socket.emit("sendTitle", newTitle.target.value, () => {
        console.log("New Title Sent");
      });
    });
  };

  const [title, setTitle] = useState("Untitled");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (err) => {
      if (err) {
        history.push("/");
        return toast.error(err);
      }
    });

    setName(name);
    setRoom(room);

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

  useEffect(() => {
    socket.on("welcomeMessage", (message) => {
      toast.success(message.text);
    });
    socket.on("title", (message) => {
      setTitle(message.text);
    });
    socket.on("body", (message) => {
      setBody(message.text);
    });
    socket.on("disMess", (message) => {
      toast.warning(message.text);
    });
  }, []);

  return (
    <div className="notes-wrapper">
      {room && <h1> Room: {room}</h1>}
      <h1>Title:</h1>
      <TextArea
        onChange={handleTitle}
        style={{ width: "300px", fontSize: "1.2rem" }}
        placeholder="Note Title"
        value={title}
      />
      <h1>Body:</h1>
      <TextArea
        onChange={handleBody}
        style={{ width: "70vw", height: "75vh", fontSize: "1.2rem" }}
        rows={10}
        value={body}
      />
    </div>
  );
};
