# Welcome to JoplinGSOC 👋

> A Starter Project as an entry point to the Realtime Note Collaboration Idea of the Joplin Organisation

## Description

- This is a sample realtime note editor made using the Joplin Web Clipper API, and made collaborative using SocketIO.
- You can set a username(must be unique), select a note to work on and a room will be created for you.
- When someone else joins or leaves the room, a toast notification will popup letting you know who joined/left.
- The final product(note) with the markdown rendered can be seen in the actual Joplin App.
- All the collaborators must be in the same local network for this project to work.

## Install

```sh
cd frontend && yarn install
cd backend && npm install
```

## Usage

- The backend must be run first, and runs on port 3000, or you can change the variable names in the **env.js** file
- It is also imporant to note that since the Web Clipper server listens only on the local network, you will need to setup a TCP Tunnel
- I recommend using socat, once the Web Clipper server is running, all you need to do is

```sh
socat tcp-listen:41185,reuseaddr,fork tcp:localhost:41184
```

- This Command ensures that the port 41184 on your localhost is forwarded and made available to all the other devices on your local network

```sh
cd backend && npm start
cd frontend && yarn start
```

## Author

👤 **Rajat Maheshwari**

- Github: [@rajatmaheshwari2512](https://github.com/rajatmaheshwari2512)
- LinkedIn: [@rajatmaheshwari2512](https://linkedin.com/in/rajatmaheshwari2512)

## Show your support

Give a ⭐️ if this project helped you!

---
