import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { get } from "services/api";

const MatchSummary = () => {
  const { _id } = useParams();
  const [matches, setMatches] = useState([]);
  const [errorFetchingMatches, setErrorFetchingMatches] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, [_id]);

  const fetchMatches = async () => {
    try {
      const response = await get(`teams/${_id}`);
      const { data } = response;
      const selectedTeam = data.find((team) => team._id === _id);
      setMatches(selectedTeam.match);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setErrorFetchingMatches(true);
    }
  };
  const getMatchResult = (match) => (!match.winner ? "No Ganó" : "Ganó");

  return (
    <div className='content'>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4" style={{ textAlign: "center" }}>
                Resumen de Partidos
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                {matches.map((match, index) => (
                  <Col md={6} key={index} style={{ marginBottom: "1rem" }}>
                    {console.log(match)}
                    <Card>
                      <CardBody>
                        <h5
                          className="card-title"
                          style={{ marginBottom: "1rem" }}
                        >
                          Partido {index + 1}
                        </h5>
                        <p>Resultado: {getMatchResult(match)}</p>
                        <p>Tarjetas Amarillas: {match.yellowCards}</p>
                        <p>Tarjetas Rojas: {match.redCards}</p>
                        <p>Disparos Realizados: {match.shots}</p>
                        <p>Disparos a Portería: {match.shotsOnGoal}</p>
                        <p>Pases Completados: {match.completedPasses}</p>
                        <p>Faltas Realizadas: {match.fouls}</p>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MatchSummary;
