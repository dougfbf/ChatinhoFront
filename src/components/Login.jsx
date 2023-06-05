import { useState, useRef } from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 320px;
    border-radius: 0.75rem;
    background-color: transparent;
    padding: 2rem;
    border: 1px solid red;
`

const ChatForm = styled.form`
    display: flex;
    flex-direction: column;
    bottom: 0.1rem;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    input {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: #c0ffff;
        border: none;
        padding: 1rem 1rem 0;
        flex-grow: 1;
        border-radius: 2rem;
        font-size: 1rem;
    }
    input:focus {
        outline: none;
    }
    button {
        background: linear-gradient(to bottom left, #00FFFF, #0069FF);
        border: none;
        padding: 0.5rem;
        margin-top: 0.5rem;
        border-radius: 2rem;
        outline: none;
        font-weight: bold;
        font-size: 1.5rem;
        color: #000000;
    }
`

export default function Login({ setIsLogged }) {
    const [name, setName] = useState('')

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function addUser() {
        localStorage.setItem('user', name)
        setIsLogged(true)
    }
    return (
        <>
            <LoginContainer>
                <ChatForm>
                    <input type="text" value={name} placeholder="Insira seu nome" autoComplete="off" onChange={handleNameChange} /><button onClick={addUser}>Entrar</button>
                </ChatForm>
            </LoginContainer>
        </>
    )
}