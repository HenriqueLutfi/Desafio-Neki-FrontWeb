import React, { useContext, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [dados, setDados] = useState({
    login: "",
    password: "",
  });
  const [savePassword, setSavePassword] = useState(false);
  const [showLoginFail, setShowLoginFail] = useState(false);
  const navigate = useNavigate();
  const { handleSetToken, token, roles } = useContext(AuthContext);

  function handleSubmit() {
    api
      .post("/login", dados)
      .then((res) => {
        // console.log("aqui" + res.headers.authorization)
        handleSetToken(res.headers.authorization);
        if (savePassword) {
          localStorage.setItem("Authorization", res.headers.authorization);
        }
        navigate("/home");
      })
      .catch((error) => {
        setShowLoginFail(true);
      });
    // if(savePassword){
    //   localStorage.setItem("Authorization", dados.password);
    // }
  }
  const toggleSavePassword = () => {
    setSavePassword(!passwordShown);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="BackGroundContainer">
      {/* <div className="TituloPage">
        <h1>ahahahaha</h1>
      </div> */}
      <div className="ContainerLogin">
        <div className="ContainerLoginHolder">
          <div className="topContainerLogin">
            <h1 style={{ fontWeight: "bold", color: "white" }}>Login</h1>
          </div>
          <div className="formContainerLogin">
            <div className="ContainerInputLogin">
              <h4 style={{ fontWeight: "bold", color: "white" }}>
                Digite seu Login
              </h4>
              <input
                className="InputLogin"
                // type="email"
                placeholder="Login"
                value={dados.login}
                onChange={(e) => [
                  setDados({ ...dados, login: e.target.value }),
                ]}
              />
            </div>
            <div className="ContainerInputLogin">
              <h4 style={{ fontWeight: "bold", color: "white" }}>
                Digite sua Senha
              </h4>
              <div className="ContainerInputSenha">
                <input
                  className="InputSenha"
                  type={passwordShown ? "text" : "password"}
                  placeholder="Senha"
                  value={dados.password}
                  onChange={(e) => [
                    setDados({ ...dados, password: e.target.value }),
                  ]}
                />
                <div className="showPassword">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="40"
                    fill="currentColor"
                    class="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                    style={{ color: "#FFFFFF" }}
                    onClick={togglePassword}
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                </div>
              </div>
              {/* <button style={{width:"20%"}} onClick={togglePassword}>Mostrar Senha</button> */}
            </div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                style={{ fontWeight: "bold", color: "white" }}
                label="Salvar a Senha"
                onClick={toggleSavePassword}
              />
            </Form>
          </div>

          <div className="BottomContainerLogin">
            <Button className="w-50" style={{ fontWeight: "bold", color: "white" }} onClick={() => handleSubmit()}>Login</Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <p style={{ margin: "0px" }}>Nao possui uma conta? </p>
              <a
                // className="texto2"
                // style={btnLink}
                onClick={() => navigate("/cadastro")}
              >
                {" "}
                Cadastre-se
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        show={showLoginFail}
        onHide={() => setShowLoginFail(false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          closeButton
        >
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Credenciais invalidas
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          <Button variant="primary" onClick={() => setShowLoginFail(false)}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
