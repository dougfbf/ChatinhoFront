import styled from 'styled-components';
import Logo from '../assets/Logo.png';
import Sair from '../assets/sair.png';

const Nav = styled.nav`
    background-color: var(--navBg);
    height: var(--navSize);
    display: flex;
    place-items: center;
    justify-content: space-between;
    padding: 0 0.7rem;
    user-select: none;
    position: fixed; /* Add position fixed */
    top: 0; /* Stick it to the top */
    width: 100%; /* Make it full width */
    z-index: 999; /* Ensure it's above other content */
`;

const NavItem = styled.div`
    height: calc(var(--navSize) * 0.65);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .cross {
        cursor: pointer;
    }

    img {
        -webkit-user-drag: none;
        width: 100%;
        height: 100%;
        transition: all 1s ease;
    }

    .text {
        font-weight: bold;
        font-size: 2rem;
    }

    .usersOnline {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .name {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .gradient {
        background: linear-gradient(to bottom left, #00FFFF, #0069FF);
        -webkit-background-clip: text; /* For Safari */
        -webkit-text-fill-color: transparent; /* For Safari */
        background-clip: text;
        color: transparent;
    }
`;

export default function Navbar({ isLogged, setIsLogged }) {
    function handleLogOff() {
        localStorage.clear();
        setIsLogged(false);
    }

    return (
        <Nav>
            <NavItem>
                <img src={Logo} alt="Logo" />
                <p className="text gradient">Chatinho</p>
            </NavItem>
            <NavItem>
                {isLogged ? (
                    <img className='cross' onClick={handleLogOff} src={Sair} alt="Sair" />
                ) : null}
            </NavItem>
        </Nav>
    );
}
