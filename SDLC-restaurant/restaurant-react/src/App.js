import { Switch, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/custom.css";
import "./assets/css/classic.date.css";
import "./assets/css/classic.time.css";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import History from "./Pages/History"
import About from "./Pages/About";
import Reservation from "./Pages/Reservation";
import AdminSeat from "./Pages/AdminSeat";
import AdminMenu from "./Pages/AdminMenu";
import AdminReservation from "./Pages/AdminReservation";
import AdminDashboard from "./Pages/AdminDashboard";
import { Login2 } from "./Pages/Login2";
import { AdminLogin } from "./Pages/AdminLogin";
import { Register } from "./Pages/Register";
import Logout from "./Pages/Logout";
import ShowDetailsMenu from "./Components/CategoryMenu/ShowDetailsMenu";
import NotFound from "./Pages/NotFound.js";
const SERVER = "http://127.0.0.1:8081";

function App() {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/history" component={History} />
      <Route exact path="/about" component={About} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/login" component={Login2} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reservation" component={Reservation} />
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/admin/login" component={AdminLogin} />
      <Route exact path="/admin/menu" component={AdminMenu} />
      <Route exact path="/admin/seat" component={AdminSeat} />
      <Route exact path="/admin/reservation" component={AdminReservation} />
      <Route exact path="/admin/dashboard" component={AdminDashboard} />
      <Route
        exact
        path="/view-menu-details/:id"
        component={ShowDetailsMenu}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
