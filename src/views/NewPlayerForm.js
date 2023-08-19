import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
} from "reactstrap";
import InputControlled from "components/InputControlled";
import { toast, ToastContainer } from "react-toastify";
import { post } from "services/api";

const NewPlayerForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    isSubmitSuccessful,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        birthDate: "",
        ci: "",
        phoneNumber: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    try {
      await post("players", data);
      toast.success("Nuevo jugado registrado con existo🤺!");
    } catch (error) {
      toast.error("Hubo un error. Por favor, inténtalo de nuevo más tarde.");
      console.error("Error en la solicitud:", error);
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
              <CardTitle tag="h4">Registrar Nuevo Jugador</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstName">Nombre</Label>
                      <InputControlled
                        control={control}
                        name="firstName"
                        rules={{ required: true }}
                        type="text"
                      />
                      {errors?.firstName && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Apellido</Label>
                      <InputControlled
                        control={control}
                        name="lastName"
                        rules={{ required: true }}
                        type="text"
                      />
                      {errors?.lastName && (
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
                      <Label for="phoneNumber">Teléfono</Label>
                      <InputControlled
                        control={control}
                        name="phoneNumber"
                        rules={{
                          required: true,
                          pattern: /^[0-9]*$/,
                        }}
                        type="tel"
                      />
                      {errors?.phoneNumber && (
                        <span className="text-danger">
                          Este campo es requerido y debe contener solo números
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ci">Cédula</Label>
                      <InputControlled
                        control={control}
                        name="ci"
                        rules={{
                          required: true,
                          pattern: /^[0-9]*$/,
                        }}
                        type="text"
                      />
                      {errors?.ci && (
                        <span className="text-danger">
                          Este campo es requerido y debe contener solo números
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="birthDate">Fecha de Nacimiento</Label>
                      <InputControlled
                        control={control}
                        name="birthDate"
                        rules={{ required: true }}
                        type="date"
                      />
                      {errors?.birthDate && (
                        <span className="text-danger">
                          Este campo es requerido
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" type="submit" block>
                  Registrar Jugador
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewPlayerForm;
