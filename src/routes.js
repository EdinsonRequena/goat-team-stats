import TableList from "views/Tables.js";
import NewTeamForm from "views/NewTeamForm";
import NewPlayerForm from "views/NewPlayerForm";
import NewTournamentForm from "views/NewTournamentForm";
import NewMatchForm from "views/NewMatchForm";
import MatchSummary from "views/MatchSummary";

const routes = [
  {
    path: "/tables",
    name: "Tabla de Posiciones",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/new-team/:teamId",
    name: "Nuevo Equipo",
    icon: "nc-icon nc-simple-add",
    component: <NewTeamForm />,
    layout: "/admin",
  },
  {
    path: "/new-player/:playerID",
    name: "Nuevo Jugador",
    icon: "nc-icon nc-simple-add",
    component: <NewPlayerForm />,
    layout: "/admin",
  },
  {
    path: "/new-tournament",
    name: "Nuevo Torneo",
    icon: "nc-icon nc-simple-add",
    component: <NewTournamentForm />,
    layout: "/admin",
  },
  {
    path: "/new-match",
    name: "Nuevo Partido",
    icon: "nc-icon nc-simple-add",
    component: <NewMatchForm />,
    layout: "/admin",
  },
  {
    path: "/teams/:_id",
    name: "Resumen de Partidos",
    component: <MatchSummary />,
    layout: "/admin",
  },
];

export default routes;
