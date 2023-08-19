import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { toast, ToastContainer } from "react-toastify";

import InputControlled from "components/InputControlled";

import { post } from "services/api";

const NewTeamForm = () => {
  const {
    register,
    control,
    isSubmitSuccessful,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        teamName: "",
        rif: "",
        address: "",
        phoneNumber: "",
        email: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    try {
      await post("teams", {
        name: data.teamName,
        rif: data.rif,
        coach: data.coach,
      });
      toast.success("Nuevo equipo registrado con existo🤺!");
    } catch (error) {
      toast.error("Hubo un error. Por favor, inténtalo de nuevo más tarde.");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Registrar Nuevo Equipo</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="teamName">Nombre del Equipo</Label>
                      <InputControlled
                        control={control}
                        type="text"
                        name="teamName"
                        id="teamName"
                        {...register("teamName", { required: true })}
                      />
                      {errors?.teamName && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="rif">RIF</Label>
                      <InputControlled
                        control={control}
                        type="text"
                        name="rif"
                        id="rif"
                        {...register("rif", { required: true })}
                      />
                      {errors?.rif && (
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
                      <Label for="coachName">Nombre del Director Técnico</Label>
                      <InputControlled
                        control={control}
                        name="coachName"
                        rules={{ required: true }}
                        type="text"
                        {...register("coachName", { required: true })}
                      />
                      {errors?.coachName && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  {/* <Col md={6}>
                    <FormGroup>
                      <Label for="coachPhone">
                        Teléfono del Director Técnico
                      </Label>
                      <Controller
                        control={control}
                        name="coachPhone"
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} type="tel" />}
                      />
                      {errors?.coachPhone && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col> */}
                </Row>
                <Button color="primary" type="submit">
                  Registrar Equipo
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewTeamForm;
