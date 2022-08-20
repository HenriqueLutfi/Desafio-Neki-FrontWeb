import React, { useState, useEffect, useContext } from "react";
import { Container, CardContainer, ContainerDropDown } from "./style.jsx";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// import { CardHome } from "../../componentes/cardHome.jsx";
import Modal from "react-bootstrap/Modal";
import api from "../../service/api.js";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../../context/AuthContext/index.jsx";
import { CardSkill } from "../../context/HomeCompnents/index.jsx";
import CardGroup from "react-bootstrap/CardGroup";
import { ReRenderContext } from "../../context/ReRender/Rerender.jsx";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const Home = () => {
  const [nome, setNome] = useState("");
  const [versao, setVersao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillUser, setSkillUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModalLogOut, setShowModalLogOut] = useState(false);
  const [showModalInfoSave, setShowModalInfoSave] = useState(false);
  const [showModalCadastroSkillFail, setShowModalCadastroSkillFail] =
    useState(false);
  const [addSkill, setAddSkill] = useState("");
  const { handleSetToken, token, roles, id } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [knowledgeLvl, setKnowledgeLvl] = useState(1);
  const { ChangeRender, renderCount } = useContext(ReRenderContext);

  useEffect(() => {
    getSkills();
    getSkillsUser();
  }, [renderCount]);

  const getSkills = async () => {
    api
      .get("/skill", { headers: { Authorization: token } })
      .then((result) => {
        // console.log("skills" + JSON.stringify(result.data));
        setSkills(result.data);
      })
      .catch((error) => {
        // console.log("Erro ao carregar " + JSON.stringify(error));
      });
  };

  const getSkillsUser = async () => {
    api
      .get(`/user/${id}`, { headers: { Authorization: token } })
      .then((result) => {
        // console.log("skillsUser" + JSON.stringify(result.data));
        setSkillUser(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));
      });
  };

  let dadosModal = {
    name: nome,
    version: versao,
    description: descricao,
    imageUrl: imagem,
  };

  let addSkillUser = {
    userId: id,
    skillId: addSkill.id,
    knowledgeLvl: knowledgeLvl,
  };

  function enviarDados() {
    api
      .post(`/skill`, dadosModal, { headers: { Authorization: token } })
      .then((result) => {
        ChangeRender();
        setNome("");
        setVersao("");
        setDescricao("");
        setImagem("");
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));
        setNome("");
        setVersao("");
        setDescricao("");
        setImagem("");
        handleCloseModal();
        setShowModalCadastroSkillFail(true);
      });
  }

  function postUserSkill() {
    console.log(addSkillUser);
    api
      .post(`/userSkill`, addSkillUser, { headers: { Authorization: token } })
      .then((result) => {
        console.log("skillsUser" + JSON.stringify(result.data));
        setShowModalInfoSave(false);
        ChangeRender();
      });
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "5px",
          }}
        >
          <a onClick={() => setShowModalLogOut(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
              style={{ color: "#FFFFFF" }}
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </a>
        </div>
        <div>
          <h1
            style={{
              fontWeight: "bold",
              color: "#FFFFFF",
              margin: "50px",
              fontSize: "40px",
            }}
          >
            Suas Habilidades
          </h1>
        </div>
        <ContainerDropDown>
          <div style={{ width: "90%" }}>
            <Dropdown
              style={{
                width: "100%",
                height: "38px",
              }}
            >
              <Dropdown.Toggle
                style={{
                  width: "100%",
                  height: "38px",
                  fontWeight: "bold",
                }}
                variant="light"
                bg="light"
                expand="lg"
              >
                Eschola sua Habilidade
                {/* {skills ? skills : "Atividade Economica*"} */}
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="white"
                bg="white"
                expand="lg"
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {skills.map((item) => (
                  <Dropdown.Item
                    onClick={() => {
                      setKnowledgeLvl("");
                      setAddSkill(item);
                      setShowModalInfoSave(true);
                    }}
                    eventKey={item.id}
                    href="#/action-2"
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            style={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "5px",
            }}
          >
            <a onClick={handleShowModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
                style={{
                  color: "#FFFFFF",
                }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
          </div>
        </ContainerDropDown>
        <CardContainer>
          {skillUser.skills.map((res) => (
            <CardSkill skill={res} />
          ))}
        </CardContainer>
        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            closeButton
          >
            <Modal.Title
              style={{
                backgroundColor: "rgb(33, 36, 36)",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              className="d-flex justify-content-center align-items-center"
            >
              Cadastrar nova Habilidade
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Nome da Habilidade"
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Descrição da Habilidade"
                  autoFocus
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Versão Habilidade"
                  autoFocus
                  value={versao}
                  onChange={(e) => setVersao(e.target.value)}
                />
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Link de Imagem da Habilidade"
                  autoFocus
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }} className="d-flex justify-content-center align-items-center">
            <Button
              variant="primary"
              onClick={() => {
                enviarDados();
              }}
              style={{
                color: "#ffffff",
                fontWeight:"bold"
              }}
            >
              CADASTRAR
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="p-5 d-flex justify-content-center align-items-center"
          show={showModalLogOut}
          onHide={() => setShowModalLogOut(false)}
          centered
        >
          <Modal.Title
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="p-4 d-flex justify-content-center align-items-center"
          >
            Tem certeza que deseja sair?
          </Modal.Title>

          <Modal.Body
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="p-3 d-flex justify-content-center align-items-center"
          >
            <Form>
              <Form.Group
                controlId="exampleForm.ControlInput1"
                className="d-flex justify-content-center align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="120"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  style={{
                    color: "#ffffff",
                  }}
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              className="d-flex justify-content-center align-items-center"
              variant="primary"
              onClick={() => {
                localStorage.removeItem("Authorization");
                navigate("/login");
              }}
              style={{
                fontWeight: "bold",
                width: "8rem",
                borderRadius: "10.35px",
                color: "#3D5CFF",
                backgroundColor: "rgb(33, 36, 36)",
                borderColor: "#3D5CFF",
              }}
            >
              SIM
            </Button>
            <Button
              className="d-flex justify-content-center align-items-center"
              variant="primary"
              onClick={() => setShowModalLogOut(false)}
              style={{
                fontWeight: "bold",
                width: "8rem",
                borderRadius: "10.35px",
                color: "#ffffff",
                backgroundColor: "#3D5CFF",
                borderColor: "#3D5CFF",
              }}
            >
              NÃO
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showModalInfoSave}
          centered
          onHide={() => setShowModalInfoSave(false)}
        >
          <Modal.Header
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            closeButton
          >
            <Modal.Title>{addSkill.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="d-flex justify-content-center align-items-center w-100"
          >
            <img src={addSkill.imageUrl} />
          </Modal.Body>
          <Modal.Body
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            {/* <h1>{addSkill.description}</h1> */}
            <textarea
              style={{
                backgroundColor: "rgb(33, 36, 36)",
                width: "100%",
                height: "100px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              maxLength={5}
              id="message"
              name="message"
              value={addSkill.description}
              disabled={true}
            />
          </Modal.Body>
          <Modal.Body
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="p-0 d-flex justify-content-center align-items-center"
          >
            Escolha seu Nivel:
          </Modal.Body>
          <Modal.Body
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <Rating
              name="customized-10"
              defaultValue={knowledgeLvl}
              value={knowledgeLvl}
              max={10}
              onClick={(e) => {
                setKnowledgeLvl(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "rgb(33, 36, 36)",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => setShowModalInfoSave(false)}
            >
              fechar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                postUserSkill();
              }}
            >
              adicionar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showModalCadastroSkillFail}
          centered
          onHide={() => setShowModalCadastroSkillFail(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Falha no Cadastro</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center w-100">
            Habilidade ja cadastrada
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModalCadastroSkillFail(false)}
            >
              fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
