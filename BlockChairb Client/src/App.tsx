import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import GroupChat from "./pages/GroupChat";
import PublicChat from "./pages/PublicChat";

import LandingPage from "./pages/Home";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Sidebar from "./components/ChatComponents/Sidebar";
import NavBar from "./components/App/NavBar";
import SignUp from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/features/userSlice";
import { useHistory } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const test = (roomName: string) => {};
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/chat">
            <div className="appChat">
              <div className="appChat_body">
                <NavBar user={user} dispatch={dispatch} history={history} />
                <Chat />
              </div>
            </div>
          </Route>
          <Route path="/groupChat">
            <div className="appChat">
              <div className="appChat_body">
                <NavBar user={user} dispatch={dispatch} history={history} />
                <GroupChat />
              </div>
            </div>
          </Route>
          <Route path="/publicChat">
            <div className="appChat">
              <div className="appChat_body">
                <NavBar user={user} dispatch={dispatch} history={history} />
                <PublicChat />
              </div>
            </div>
          </Route>
          <Route path="/profile">
            <div className="appChat">
              <div className="appChat_body">
                <NavBar user={user} dispatch={dispatch} history={history} />
                <Profile />
              </div>
            </div>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
