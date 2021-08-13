import React, { useContext } from "react";
import { InputsContainer, SignUpFormContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/useForm";
import Button from "@material-ui/core/Button";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import GlobalStateContext from "../../global/GlobalStateContext";
import Loader from "../../components/Loader";
import { MenuItem } from "@material-ui/core";
import InputMask from "react-input-mask";

const SignUpForm = () => {
  const [form, onChange, clear] = useForm({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    knowledge_1: "",
    knowledge_2: "",
    knowledge_3: "",
  });

  const { setOpenAlert, setAlertMsg, setAlertSeverity, loading, setLoading } =
    useContext(GlobalStateContext);

  const knowledgeOptions = [
    { value: "", label: "Nenhum" },
    { value: "Git", label: "Git" },
    { value: "React", label: "React" },
    { value: "Php", label: "PHP" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "DevOps", label: "DevOps" },
    { value: "Banco de Dados", label: "Banco de Dados" },
    { value: "TypeScript", label: "TypeScript" },
  ];

  const onSubmitForm = (event) => {
    event.preventDefault();

    for (var prop in form) {
      if (form[prop] === "") {
        delete form[prop];
      }
    }

    if (isValidCPF(form.cpf) === false) {
      setAlertMsg("Cpf inválido");
      setAlertSeverity("error");
      setOpenAlert(true);
    } else if (isValidEmail(form.email) === false) {
      setAlertMsg("Email inválido");
      setAlertSeverity("error");
      setOpenAlert(true);
    } else if (
      form.knowledge_1 === form.knowledge_2 ||
      form.knowledge_1 === form.knowledge_3 ||
      (form.knowledge_2 &&
        form.knowledge_3 &&
        form.knowledge_2 === form.knowledge_3)
    ) {
      setAlertMsg("Verifique os conhecimentos selecionados");
      setAlertSeverity("error");
      setOpenAlert(true);
    } else {
      signUp(form, clear);
      setLoading(true);
    }
  };

  const signUp = (body, clear) => {
    setLoading(true);
    console.log("body", body);
    axios
      .post(`${BASE_URL}/collaborator/registrar`, body)
      .then((res) => {
        clear();
        setLoading(false);
        setAlertMsg("Você foi registrado com successo.");
        setAlertSeverity("success");
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
      });
  };

  function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    cpf = cpf.split("");

    const validator = cpf
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map((el) => +el);

    const toValidate = (pop) =>
      cpf
        .filter((digit, index, array) => index < array.length - pop && digit)
        .map((el) => +el);

    const rest = (count, pop) =>
      ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
        10) %
        11) %
      10;

    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
  }

  function isValidEmail(mail) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return true;
    }
    return false;
  }

  return (
    <SignUpFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmitForm}>
          <InputsContainer>
            <TextField
              name={"name"}
              value={form.name}
              onChange={onChange}
              label={"Nome"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              name={"email"}
              value={form.email}
              onChange={onChange}
              label={"E-mail"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"email"}
              inputProps={{ maxLength: 100 }}
              error={form.email.length > 0 && !isValidEmail(form.email)}
            />
            <InputMask
              mask="999.999.999-99"
              value={form.cpf}
              onChange={onChange}
              disabled={false}
              maskChar="X"
            >
              {() => (
                <TextField
                  name={"cpf"}
                  variant={"outlined"}
                  fullWidth
                  margin={"normal"}
                  required
                  label={"Cpf"}
                  error={form.cpf.length > 0 && !isValidCPF(form.cpf)}
                />
              )}
            </InputMask>

            <InputMask
              mask="(99) 99999-9999"
              value={form.phone}
              onChange={onChange}
              disabled={false}
              maskChar="X"
            >
              {() => (
                <TextField
                  name={"phone"}
                  label={"Celular"}
                  variant={"outlined"}
                  fullWidth
                  margin={"normal"}
                />
              )}
            </InputMask>

            <TextField
              name={"knowledge_1"}
              select
              label="Conhecimentos"
              value={form.knowledge_1}
              onChange={onChange}
              required
              fullWidth
              error={form.knowledge_1 === ""}
            >
              {knowledgeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name={"knowledge_2"}
              select
              value={form.knowledge_2}
              onChange={onChange}
              fullWidth
              error={
                form.knowledge_2 === form.knowledge_1 && form.knowledge_2 !== ""
              }
            >
              {knowledgeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name={"knowledge_3"}
              select
              value={form.knowledge_3}
              onChange={onChange}
              fullWidth
              error={
                (form.knowledge_3 === form.knowledge_1 &&
                  form.knowledge_3 !== "") ||
                (form.knowledge_3 === form.knowledge_2 &&
                  form.knowledge_3 !== "")
              }
              helperText={"Selecione no mínimo 1, sem repetir valores"}
            >
              {knowledgeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </InputsContainer>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            Cadastre-se
          </Button>
        </form>
      )}
    </SignUpFormContainer>
  );
};

export default SignUpForm;
