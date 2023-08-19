import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";

import InputControlled from "components/InputControlled";
import SelectControlled from "components/SelectControlled";

import { get, post } from "services/api";

const NewTournament = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await get("teams");

      const { data } = response;
      setTeams(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error(
        "Hubo un error al obtener la lista de equipos. Por favor, inténtalo de nuevo más tarde."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: "", teams: "", startDate: "", endDate: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = useCallback(
    async (data) => {
      setErrorSubmitting(false);
      console.log(data)
      try {
        await post("tournament", {
          name: data.name,
          teams: [data.teams],
          startDate: data.startDate,
          endDate: data.endDate,
        });

        toast.success("Nuevo torneo registrado con existo🤺!");
        reset();
      } catch (error) {
        setErrorSubmitting(true);
        toast.error("Oops! un error al registrar el nuevo torneo.");
        console.error("Error submitting form:", error);
      }
    },
    [reset]
  );

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
              <CardTitle tag="h4">Registrar Torneo</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Nombre del Torneo</Label>
                      <InputControlled
                        type="text"
                        name="name"
                        id="name"
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors?.name && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="teams">Equipos</Label>
                      {isLoading ? (
                        <p>Cargando equipos...</p>
                      ) : (
                        <SelectControlled
                          control={control}
                          name="teams"
                          rules={{ required: true }}
                          title="Selecciona un equipo"
                        >
                          {teams?.map((team) => {
                            return (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            );
                          })}
                        </SelectControlled>
                      )}
                      {errors?.teams && (
                        <span className="text-danger">
                          Debes seleccionar un equipo
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="startDate">Fecha de Inicio</Label>
                      <InputControlled
                        control={control}
                        type="date"
                        name="startDate"
                        id="startDate"
                        {...register("startDate", { required: true })}
                      />
                      {errors?.startDate && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="endDate">Fecha de Fin</Label>
                      <InputControlled
                        control={control}
                        type="date"
                        name="endDate"
                        id="endDate"
                        {...register("endDate", { required: true })}
                      />
                      {errors?.endDate && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  color="primary"
                  type="submit"
                  block={teams.lenght === 0 || isLoading}
                >
                  Registrar Torneo
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewTournament;
