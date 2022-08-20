import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const CadastroUser = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [senha, setSenha] = useState();
  const [login, setLogin] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const handleCloseCadastroEfetuado = () => setShowCadastroEfetuado(false);
  const [showCadastroEfetuado, setShowCadastroEfetuado] = useState(false);
  const [showCadastroEFail, setShowCadastroEFail] = useState(false);
  const [showCadastroEFailExistente, setShowCadastroEFailExistente] =
    useState(false);

  // const [dados, setDados] = useState({
  //   login: "",
  //   password: senha,
  // });

  let dados = {
    login: login,
    password: senha,
  };

  const navigate = useNavigate();

  function handleSubmit() {
    console.log(senha);
    if (senha === confirmarSenha && senha != "" && login != "") {
      // console.log("foi")
      api
        .post("/user", dados)
        .then((res) => {
          // navigate("/home");
          setShowCadastroEfetuado(true);
          console.log(res);
        })
        .catch((error) => {
          setShowCadastroEFailExistente(true);
        });
    } else {
      setShowCadastroEFail(true);
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  function IconPassword() {
    if (passwordShown) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="40"
          style={{ color: "#FFFFFF" }}
          fill="currentColor"
          class="bi bi-eye"
          viewBox="0 0 16 16"
          onClick={togglePassword}
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      );
    } else {
      return (
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
      );
    }
  }

  return (
    <>
      <div className="BackGroundContainer">
        {/* <div className="TituloPage">
        <h1>ahahahaha</h1>
      </div> */}
        <div className="ContainerLogin">
          <div className="ContainerCadastroHolder">
            <div className="topContainerLogin">
              <h1 style={{ fontWeight: "bold", color: "white" }}>
                Cadastre-se
              </h1>
            </div>
            <div className="formContainerLogin">
              <div className="ContainerInputLogin">
                <h4 style={{ fontWeight: "bold", color: "white" }}>
                  Digite seu Login
                </h4>
                <input
                  className="InputLogin"
                  // type="email"
                  maxLength={12}
                  placeholder="Login"
                  value={dados.login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                  }}
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
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                  />
                  <div className="showPassword">{IconPassword()}</div>
                  {/* <button style={{width:"20%"}} onClick={togglePassword}>Mostrar Senha</button> */}
                </div>
              </div>
              <div className="ContainerInputLogin">
                <h4 style={{ fontWeight: "bold", color: "white" }}>
                  Confirmar sua Senha
                </h4>
                <div className="ContainerInputSenha">
                  <input
                    className="InputSenha"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                    }}
                  />
                  <div className="showPassword">{IconPassword()}</div>
                </div>
              </div>
            </div>
            <div className="BottomContainerLogin">
              <Button
                style={{ width: "50%", fontWeight: "bold", color: "white" }}
                onClick={() => handleSubmit()}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        show={showCadastroEfetuado}
        onHide={handleCloseCadastroEfetuado}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          closeButton
        >
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Cadastro realizado com sucesso
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          <Button
            style={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
            variant="primary"
            onClick={() => navigate("/login")}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        centered
        show={showCadastroEFail}
        onHide={() => setShowCadastroEFail(false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          closeButton
        >
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Usuario ou senha invalidos
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          <Button
            style={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
            variant="primary"
            onClick={() => setShowCadastroEFail(false)}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        centered
        show={showCadastroEFailExistente}
        onHide={() => setShowCadastroEFailExistente(false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          closeButton
        >
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Usuario ja cadastrado
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          <Button
            style={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
            variant="primary"
            onClick={() => setShowCadastroEFailExistente(false)}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
