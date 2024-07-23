import '../styles/ceo.css';
import Logo from '../img/logo_Turnover.png';
import LogoCliente from '../img/logo_atma.png';
import LogoMenu from '../img/iso_tipo_turnover.png';

export default function Header({ nome }) {
  return (
    <header>
      <div class="menuDesktop menuDash">
        <div class="logoMenuBox logoMenuBoxDash">
          <nav class="navMenuDesktop navMenuDash">
            <ul class="navLinks navLinksDash">
              <a class="logoffDash" href="#">
                Logoff
              </a>
            </ul>
          </nav>
          <a class="logoMenuLink" href="#" title="Voltar a home">
            <img
              class="logoMenu"
              src={Logo}
              alt="Logo da empresa turnover"
            />
          </a>
        </div>
        <h3 class="saudacaoDash">Olá, {nome}</h3>
        <img
          src={LogoCliente}
          alt="logo da Atma"
          class="logoAtma"
        ></img>
      </div>
      <div class="cabecalhoSaudacaoDash">
        <h3 class="saudacaoDash">Olá, {nome}</h3>
        <img
          src={LogoCliente}
          alt="logo da Atma"
          class="logoAtma"
        />
      </div>
      <div class="menuMobile" id="menuMobile">
        <img src={LogoMenu} alt="Menu" />
      </div>
      <nav>
        <ul class="nav-links">
          <li>
            <a href="#">Logoff</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
