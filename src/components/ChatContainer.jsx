import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import SendSound from '../assets/SendSound.mp3'

const ChatForm = styled.form`
    position: fixed;
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
        background: #c0ffff;
        border: none;
        padding: 0 1rem 0;
        flex-grow: 1;
        border-radius: 2rem 0 0 2rem;
        margin: 0.25rem 0 0.25rem 0.25rem;
    }
    input:focus {
        outline: none;
    }
    button {
        background: linear-gradient(to bottom left, #00FFFF, #0069FF);
        border: none;
        padding: 0.5rem;
        margin: 0.25rem 0.25rem 0.25rem 0;
        border-radius: 0 2rem 2rem 0;
        outline: none;
        font-weight: bold;
        color: #000000;
    }
`

function getDate() {
    let date = new Date()
    date.setHours(date.getHours())
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`
}

export default function ChatContainer({ socket }) {
    const [msgValue, setMsgValue] = useState('')
    const inputRef = useRef('null')
    function changeHandler(e) {
        setMsgValue(e.target.value)
    }
    function sendMsg(e) {
        inputRef.current.focus()
        PlaySend()
        e.preventDefault()
        if (msgValue === '') { return }
        console.log(msgValue)
        setMsgValue('')
        socket.emit('message', { user: localStorage.getItem('user'), text: msgValue, type: 'msg', date: getDate()})
    }
    function PlaySend() {
        const audio = new Audio(SendSound)
        audio.play()
    }
    return (
        <>
            <ChatForm>
                <input ref={inputRef} type="text" value={msgValue} placeholder="Digite sua mensagem..." autoComplete="off" onChange={changeHandler} /><button onClick={sendMsg}>Enviar</button>
            </ChatForm>
        </>
    )
}