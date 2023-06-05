import styled from 'styled-components'
import React, { useState } from 'react'
import Cross from '../assets/Cross.png';

const StyledFooter = styled.footer`
    user-select: none;
    position: fixed;
    bottom: 3.1rem;
    left: 0;
    right: 0;
    width: 100%;
    color: #DDDDDD;
    font-size: 0.9rem;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
`
const GreenText = styled.span`
    color: #5CFF72;
    font-weight: bold;
`

const UsersTab = styled.dialog`
    li {
        font-weight: bold;
        color: #5CFF72;
        list-style: none;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    position: fixed;
    display: flex;
    top: 50%;
    left: 50%;
    width: 75%;
    padding: 2rem;
    height: auto;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    background: #3a3a53;
    background: linear-gradient(to bottom left, #47475e, #373747);
    outline: none;
    border: none;
`

const TextShow = styled.p`
    position: fixed;
    font-weight: bold;
    color: #00FFFF;
    top: 10px;
    left: 10px;
`

const ButtonD = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
    position: fixed;
    top: 10px;
    right: 10px;
    background: transparent;
    font-weight: bold;
    font-size: 0.9rem;
    padding: 0.2rem;
    color: #00FFFF;
`

export default function Footer({ usersOnline }) {
    const [isOpen, setIsOpen] = useState(false)

    function openDialog() {
        console.log(usersOnline)
        setIsOpen(true)
    }
    function closeDialog() {
        setIsOpen(false)
    }
    return (
        <>
            {
                isOpen && (
                    <UsersTab>
                        <TextShow>Usuários online agora</TextShow>
                        {usersOnline.map((user) => {
                            return <li>{user.name}</li>
                        })}
                        <ButtonD onClick={closeDialog}><strong>FECHAR</strong></ButtonD>
                    </UsersTab>
                )
            }
            <StyledFooter onClick={openDialog}>👱 <GreenText>Pessoas aqui: </GreenText>{usersOnline.length}</StyledFooter>
        </>
    )
}