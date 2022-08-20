import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext(null);

export default function Theme(props) {
  const [toggle, settoggle] = useState(true);
  const [theme, setTheme] = useState();
  const [navBarBack, setNavBarBack] = useState();
  const [navBarBackDrop, setNavBarBackDrop] = useState();
  const [btnSquare, setBtnSquare] = useState();
  const [btnClicado, setBtnClicado] = useState();
  const [btnNaoClicado, setBtnNaoClicado] = useState();
  const [btnCadastrar, setBtnCadastrar] = useState();
  const [modalIcon, setModalIcon] = useState();
  const [statusCard, setStatusCard] = useState();
  const [btnCard, setBtnCard] = useState();
  const [btnDarkMode, setBtnDarkMode] = useState();
  const [btnLink, setBtnLink] = useState();

  useEffect(() => {
    setTheme(() => (toggle ? whiteBack : darkBack));
    setNavBarBack(() => (toggle ? navBarBackWhite : navBarBackDark));
    setNavBarBackDrop(() => (toggle ? navBarWhiteDrop : navBarBackDarkDrop));
    setBtnSquare(() => (toggle ? BtnSquareWhite : BtnSquareDark));
    setBtnClicado(() => (toggle ? btnClicadoWhite : btnClicadoDark));
    setBtnNaoClicado(() => (toggle ? btnNaoClicadoWhite : btnNaoClicadoDark));
    setBtnCadastrar(() => (toggle ? btnCadastrarWhite : btnCadastrarDark));
    setModalIcon(() => (toggle ? modalIconWhite : modalIconDark));
    setStatusCard(() => (toggle ? statusCardWhite : statusCardDark));
    setBtnCard(() => (toggle ? btnCardWhite : btnCardDark));
    setBtnDarkMode(() => (toggle ? BtnDarkModeDark : BtnDarkModeWhite));
    setBtnLink(() => (toggle ? btnLinkWhite : btnLinkDark));
  }, [toggle]);

  const whiteBack = {
    backgroundColor: "#EFEFEF",
    color: "#000000",
  };

  const darkBack = {
    backgroundColor: "#000000",
    color: "#EFEFEF",
  };

  const navBarBackWhite = {
    backgroundColor: "#51B5C5",
  };

  const navBarBackDark = {
    backgroundColor: "#65E4F7",
  };

  const BtnDarkModeDark = {
    backgroundColor: "#19AB27",
    borderColor: "#19AB27",
  };

  const BtnDarkModeWhite = {
    backgroundColor: "#9e1010",
    borderColor: "#9e1010",
  };

  const modalIconWhite = {
    color: "#51B5C5",
  };

  const modalIconDark = {
    color: "#65E4F7",
  };
  const btnLinkDark = {
    color: "#ffffff",
  };

  const btnLinkWhite = {
    color: "#000000",
  };

  const navBarWhiteDrop = {
    marginRight: "5rem",
    width: "4rem",
    backgroundColor: "#EFEFEF",
    borderRadius: "100%",
  };

  const navBarBackDarkDrop = {
    marginRight: "5rem",
    backgroundColor: "#000000",
    borderRadius: "100%",
  };

  const BtnSquareWhite = {
    backgroundColor: "#51B5C5",
    borderRadius: "6.35px",
    borderColor: "#51B5C5",
    fontSize: "20px",
    color: "#EFEFEF",
    fontWeight: "bold",
  };

  const BtnSquareDark = {
    backgroundColor: "#65E4F7",
    borderColor: "#65E4F7",
    borderRadius: "6.35px",
    fontSize: "20px",
    color: "#000000",
    fontWeight: "bold",
  };

  const btnNaoClicadoWhite = {
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    borderColor: "#51B5C5",
  };

  const btnClicadoWhite = {
    color: "#EFEFEF",
    fontWeight: "bold",
    backgroundColor: "#51B5C5",
    borderColor: "#51B5C5",
  };

  const btnNaoClicadoDark = {
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    borderColor: "#65E4F7",
  };

  const btnClicadoDark = {
    color: "#000000",
    fontWeight: "bold",
    backgroundColor: "#65E4F7",
    borderColor: "#65E4F7",
  };

  const btnCadastrarWhite = {
    height: "50px",
    borderRadius: "50.35px",
    fontWeight: "bold",
    color: "#EFEFEF",
    width: "15rem",
    backgroundColor: "#51B5C5",
    borderColor: "#51B5C5",
  };

  const btnCadastrarDark = {
    height: "50px",
    borderRadius: "50.35px",
    fontWeight: "bold",
    color: "#000000",
    width: "15rem",
    backgroundColor: "#65E4F7",
    borderColor: "#65E4F7",
  };

  const statusCardWhite = {
    color: "#51B5C5",
    borderColor: "#51B5C5",
  };
  const statusCardDark = {
    borderRadius: "50%",
    borderWidth: "10rem",
    color: "#000000",
    borderColor: "#000000",
  };

  const btnCardWhite = {
    width: "4rem",
    height: "4rem",
    borderRadius: "100%",
    backgroundColor: "#EFEFEF",
    borderColor: "#51B5C5",
    marginBottom: "1rem",
  };

  const btnCardDark = {
    width: "4rem",
    height: "4rem",
    borderRadius: "100%",
    backgroundColor: "#000000",
    borderColor: "#080808",
    marginBottom: "1rem",
  };

  function ChangeTheme() {
    if (toggle) {
      settoggle(false);
    } else {
      settoggle(true);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        ChangeTheme,
        theme,
        navBarBack,
        toggle,
        navBarBackDrop,
        btnSquare,
        btnClicado,
        btnNaoClicado,
        btnCadastrar,
        modalIcon,
        statusCard,
        btnCard,
        btnDarkMode,
        btnLink,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
