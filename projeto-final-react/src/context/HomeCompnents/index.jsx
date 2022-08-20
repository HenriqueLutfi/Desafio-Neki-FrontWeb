import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../AuthContext";
import api from "../../service/api";
import { ReRenderContext } from "../ReRender/Rerender";
import Form from "react-bootstrap/Form";
import Rating from "@mui/material/Rating";

export const CardSkill = ({ skill }) => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { handleSetToken, token, roles, id } = useContext(AuthContext);
  const { ChangeRender } = useContext(ReRenderContext);
  const [knowledgeLvl, setKnowledgeLvl] = useState(skill.knowledgeLvl);

  let updateUserSkill = {
    id: skill.id,
    userId: id,
    skillId: skill.skill.id,
    knowledgeLvl: knowledgeLvl,
  };

  function DeleteSkills() {
    api
      .delete(`/userSkill/${skill.id}`, { headers: { Authorization: token } })
      .then((result) => {
        ChangeRender();
        setShowModalInfo(false);
      });
  }

  function postUserSkill() {
    console.log(updateUserSkill);
    api
      .put(`/userSkill`, updateUserSkill, { headers: { Authorization: token } })
      .then((result) => {
        console.log("skillsUser" + JSON.stringify(result.data));
      });
    setShowModalInfo(false);
    ChangeRender();
  }

  return (
    <>
      <Card
        style={{ height: "350px", backgroundColor: "rgb(33, 36, 36)" }}
        className="card"
      >
        <Card.Body>
          <Card.Title
            className="d-flex justify-content-center align-items-center"
            style={{ fontSize: "30px", fontWeight: "bold", color: "white" }}
          >
            {skill.skill.name}
          </Card.Title>
          <Card.Img
            className="mb-2"
            style={{ width: "100%", height: "140px" }}
            src={skill.skill.imageUrl}
          />
          <Card.Subtitle className="card-subtitle-um mt-2">
            <p
              class="text-truncate"
              style={{ fontWeight: "bold", color: "white" }}
            >
              {skill.skill.description}
            </p>
          </Card.Subtitle>
          <Card.Subtitle className="w-100 card-subtitle-um mb-2 mt-2">
            <Rating
              name="customized-10"
              defaultValue={knowledgeLvl}
              value={knowledgeLvl}
              max={10}
              size="small"
              readOnly
            />
          </Card.Subtitle>
          <Button
            style={{ fontWeight: "bold", color: "white" }}
            className="mt-2"
            onClick={() => setShowModalInfo(true)}
          >
            Editar
          </Button>
        </Card.Body>
      </Card>
      <Modal
        centered
        show={showModalInfo}
        onHide={() => setShowModalInfo(false)}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          closeButton
        >
          <Modal.Title>{skill.skill.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          className="d-flex justify-content-center align-items-center w-100"
        >
          <img src={skill.skill.imageUrl} />
        </Modal.Body>
        <Modal.Body
          style={{
            backgroundColor: "rgb(33, 36, 36)",
            fontWeight: "bold",
            color: "#ffffff",
          }}
          className="d-flex justify-content-center align-items-center w-100"
        >
          {/* <p>{skill.skill.description}</p> */}
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
            value={skill.skill.description}
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
          className="pt-1 d-flex justify-content-center align-items-center"
        >
          <Rating
            name="customized-10"
            defaultValue={skill.knowledgeLvl}
            max={10}
            onClick={(e) => {
              setKnowledgeLvl(e.target.value);
              console.log(knowledgeLvl);
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
            style={{
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#ff000d",
              borderColor: "#ff000d",
            }}
            onClick={() => DeleteSkills()}
          >
            Remover
          </Button>
          <Button
            style={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
            variant="primary"
            onClick={() => postUserSkill()}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
