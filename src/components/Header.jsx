import Logo from '../img/logo_Turnover.png';
import LogoCliente from '../img/logo_atma.png';
import LogoMenu from '../img/iso_tipo_turnover.png';
import { useState } from 'react';

export default function Header({ nome }) {
  const [aberto, setAberto] = useState(false);

  return (
    <header>
      <div className="menuDesktop menuDash">
        <div className="logoMenuBox logoMenuBoxDash">
          <nav className="navMenuDesktop navMenuDash">
            <ul className="navLinks navLinksDash">
              <a className="logoffDash" href="#">
                Logoff
              </a>
            </ul>
          </nav>
          <a className="logoMenuLink" href="#" title="Voltar a home">
            <img
              className="logoMenu"
              src={Logo}
              alt="Logo da empresa turnover"
            />
          </a>
        </div>
        <h3 className="saudacaoDash">Olá, {nome}</h3>
        <img
          src={LogoCliente}
          alt="logo da Atma"
          className="logoAtma"
        ></img>
      </div>
      <div className="cabecalhoSaudacaoDash">
        <h3 className="saudacaoDash">Olá, {nome}</h3>
        <img
          src={LogoCliente}
          alt="logo da Atma"
          className="logoAtma"
        />
      </div>
      <div onClick={() => setAberto(!aberto)} className={aberto ? "menuMobile active" : "menuMobile"} id="menuMobile">
        <img src={LogoMenu} alt="Menu" />
      </div>
      <nav>
        <ul className={aberto ? "nav-links active": "nav-links"}>
          <li>
            <a href="#">Logoff</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
