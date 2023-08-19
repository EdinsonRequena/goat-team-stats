import React, { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

import SelectControlled from "components/SelectControlled";
import InputControlled from "components/InputControlled";

import { post, get } from "services/api";

const NewMatchForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [tournaments, setTournaments] = useState([]);
  const [isLoadingTournaments, setIsLoadingTournaments] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedTournamentDetails, setSelectedTournamentDetails] =
    useState(null);
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleTournamentChange = async (tournamentId) => {
    setSelectedTournament(tournamentId);

    try {
      const response = await get(`tournament/${tournamentId}`);
      const tournamentDetails = response.data;
      setSelectedTournamentDetails(tournamentDetails);
    } catch (error) {
      console.error("Error fetching tournament details:", error);
      toast.error(
        "Hubo un error al obtener los detalles del torneo. Por favor, inténtalo de nuevo más tarde."
      );
      setSelectedTournamentDetails(null);
    }
  };

  const fetchTournaments = async () => {
    try {
      const response = await get("tournament");
      const { data } = response;
      setTournaments(data);
      setIsLoadingTournaments(false);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error(
        "Hubo un error al obtener la lista de torneos. Por favor, inténtalo de nuevo más tarde."
      );
      setIsLoadingTournaments(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        tournament: "",
        homeTeam: "",
        visitorTeam: "",
        date: "",
        homeGoals: "",
        visitorGoals: "",
        homeYellowCards: "",
        visitorYellowCards: "",
        homeRedCards: "",
        visitorRedCards: "",
        homeShots: "",
        visitorShots: "",
        homeShotsOnGoal: "",
        visitorShotsOnGoal: "",
        homeCompletedPasses: "",
        visitorCompletedPasses: "",
        homeFouls: "",
        visitorFouls: "",
        winner: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const matchData = {
      tournament: data.tournament,
      homeTeam: data.homeTeam,
      visitorTeam: data.visitorTeam,
      date: new Date(data.date).toISOString(),
      goals: {
        home: parseInt(data.homeGoals),
        visitor: parseInt(data.visitorGoals),
      },
      yellowCards: {
        home: parseInt(data.homeYellowCards),
        visitor: parseInt(data.visitorYellowCards),
      },
      redCards: {
        home: parseInt(data.homeRedCards),
        visitor: parseInt(data.visitorRedCards),
      },
      shots: {
        home: parseInt(data.homeShots),
        visitor: parseInt(data.visitorShots),
      },
      shotsOnGoal: {
        home: parseInt(data.homeShotsOnGoal),
        visitor: parseInt(data.visitorShotsOnGoal),
      },
      completedPasses: {
        home: parseInt(data.homeCompletedPasses),
        visitor: parseInt(data.visitorCompletedPasses),
      },
      fouls: {
        home: parseInt(data.homeFouls),
        visitor: parseInt(data.visitorFouls),
      },
      winner: null,
    };
    console.log("se esta ejecutando el onsubmit");
    setErrorSubmitting(false);
    console.log("matchData", matchData.goals.home);
    console.log("data", matchData);
    try {
      await post("match", matchData);
      toast.success("Nuevo partido registrado con éxito!");
    } catch (error) {
      setErrorSubmitting(true);
      toast.error("Oops! Hubo un error al registrar el nuevo partido.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="content">
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          theme="colored"
        />
      </div>

      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Registrar Partido</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Torneos */}
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="tournament">Torneo</Label>
                      <SelectControlled
                        name="tournament"
                        id="tournament"
                        control={control}
                        rules={{ required: true }}
                        onChange={(e) => handleTournamentChange(e.target.value)}
                      >
                        {isLoadingTournaments ? (
                          <option value="">Cargando torneos...</option>
                        ) : (
                          tournaments.map((tournament) => (
                            <option key={tournament._id} value={tournament._id}>
                              {tournament.name}
                            </option>
                          ))
                        )}
                      </SelectControlled>
                      {errors.tournament && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Equipos */}
                {selectedTournament && (
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="homeTeam">Equipo Local</Label>
                        <SelectControlled
                          name="homeTeam"
                          id="homeTeam"
                          control={control}
                          rules={{ required: true }}
                        >
                          {isLoadingTournaments ? (
                            <option value="">Cargando equipos...</option>
                          ) : selectedTournamentDetails ? (
                            selectedTournamentDetails.teams.map((team) => (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            ))
                          ) : (
                            <option value="">
                              Selecciona un torneo primero
                            </option>
                          )}
                        </SelectControlled>
                        {errors.homeTeam && (
                          <span className="text-danger">
                            Este campo es requerido
                          </span>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="visitorTeam">Equipo Visitante</Label>
                        <SelectControlled
                          name="visitorTeam"
                          id="visitorTeam"
                          control={control}
                          rules={{ required: true }}
                        >
                          {isLoadingTournaments ? (
                            <option value="">Cargando equipos...</option>
                          ) : selectedTournamentDetails ? (
                            selectedTournamentDetails.teams.map((team) => (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            ))
                          ) : (
                            <option value="">
                              Selecciona un torneo primero
                            </option>
                          )}
                        </SelectControlled>
                        {errors.visitorTeam && (
                          <span className="text-danger">
                            Este campo es requerido
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                {/* Goles */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeGoals">Goles Local</Label>
                      <InputControlled
                        control={control}
                        name="homeGoals"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Goles del equipo local"
                      />
                      {errors.homeGoals && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorGoals">Goles Visitante</Label>
                      <InputControlled
                        control={control}
                        name="visitorGoals"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Goles del equipo visitante"
                      />
                      {errors.visitorGoals && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Tarjetas Amarillas */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeYellowCards">
                        Tarjetas Amarillas Local
                      </Label>
                      <InputControlled
                        control={control}
                        name="homeYellowCards"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Tarjetas amarillas del equipo local"
                      />
                      {errors.homeYellowCards && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorYellowCards">
                        Tarjetas Amarillas Visitante
                      </Label>
                      <InputControlled
                        control={control}
                        name="visitorYellowCards"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Tarjetas amarillas del equipo visitante"
                      />
                      {errors.visitorYellowCards && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Tarjetas Rojas */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeRedCards">Tarjetas Rojas Local</Label>
                      <InputControlled
                        control={control}
                        name="homeRedCards"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Tarjetas rojas del equipo local"
                      />
                      {errors.homeRedCards && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorRedCards">
                        Tarjetas Rojas Visitante
                      </Label>
                      <InputControlled
                        control={control}
                        name="visitorRedCards"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Tarjetas rojas del equipo visitante"
                      />
                      {errors.visitorRedCards && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Disparos */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeShots">Disparos Local</Label>
                      <InputControlled
                        control={control}
                        name="homeShots"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Disparos del equipo local"
                      />
                      {errors.homeShots && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorShots">Disparos Visitante</Label>
                      <InputControlled
                        control={control}
                        name="visitorShots"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Disparos del equipo visitante"
                      />
                      {errors.visitorShots && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Disparos a Puerta */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeShotsOnGoal">
                        Disparos a Puerta Local
                      </Label>
                      <InputControlled
                        control={control}
                        name="homeShotsOnGoal"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Disparos a puerta del equipo local"
                      />
                      {errors.homeShotsOnGoal && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorShotsOnGoal">
                        Disparos a Puerta Visitante
                      </Label>
                      <InputControlled
                        control={control}
                        name="visitorShotsOnGoal"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Disparos a puerta del equipo visitante"
                      />
                      {errors.visitorShotsOnGoal && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Pases Completados */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeCompletedPasses">
                        Pases Completados Local
                      </Label>
                      <InputControlled
                        control={control}
                        name="homeCompletedPasses"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Pases completados del equipo local"
                      />
                      {errors.homeCompletedPasses && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorCompletedPasses">
                        Pases Completados Visitante
                      </Label>
                      <InputControlled
                        control={control}
                        name="visitorCompletedPasses"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Pases completados del equipo visitante"
                      />
                      {errors.visitorCompletedPasses && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Faltas cometidas */}
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="homeFouls">Faltas cometidas Local</Label>
                      <InputControlled
                        control={control}
                        name="homeFouls"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Faltas cometidas del equipo local"
                      />
                      {errors.homeFouls && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="visitorFouls">
                        Faltas cometidas Visitante
                      </Label>
                      <InputControlled
                        control={control}
                        name="visitorFouls"
                        rules={{ required: true }}
                        type="number"
                        placeholder="Faltas cometidas del equipo visitante"
                      />
                      {errors.visitorFouls && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Ganador */}
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="winner">Ganador</Label>
                      <Controller
                        name="winner"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input {...field} type="select">
                            <option value="">Selecciona el ganador</option>
                            <option value="home">Local</option>
                            <option value="visitor">Visitante</option>
                            <option value="draw">Empate</option>
                          </Input>
                        )}
                      />
                      {errors.winner && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/* Fecha */}
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="date">Fecha del Partido</Label>
                      <Controller
                        name="date"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="date"
                            id="date"
                            placeholder="Selecciona la fecha del partido"
                          />
                        )}
                      />
                      {errors.date && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" type="submit" block>
                  Registrar Partido
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewMatchForm;
