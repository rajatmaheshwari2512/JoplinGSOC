import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";

import { Landing } from "./components/Landing/Landing";
import { Notes } from "./components/Notes/Notes";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/notes" component={Notes} />
    </Router>
  );
};

export default App;
