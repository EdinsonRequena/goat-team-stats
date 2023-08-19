import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { get } from "services/api";

function Tables() {
  const [teams, setTeams] = useState([]);
  const [errorFetchingTeams, setErrorFetchingTeams] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await get("teams");
      const { data } = response;
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setErrorFetchingTeams(true);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tabla de Posiciones</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Equipo</th>
                      <th>Puntos</th>
                      <th>Victorias</th>
                      <th>Empates</th>
                      <th>Derrotas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team._id}>
                        <td>
                          <Link to={`/admin/teams/${team._id}`}>
                            {team.name}
                          </Link>
                        </td>
                        <td>{team.totalPoints}</td>
                        <td>{team.matchesWon}</td>
                        <td>{team.matchesDrawn}</td>
                        <td>{team.totalPoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
