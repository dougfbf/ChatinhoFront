import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

import Footer from '../components/Footer'
import ChatContainer from '../components/ChatContainer'
import ReceiveSound from '../assets/ReceiveSound.mp3'

const Wrapper = styled.div`
    flex-direction: column;
`

const MessagesContainer = styled.ul`
    width: 100%;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;

    margin-bottom: 8rem;
    li:first-child {
        margin-top: 50px;
    }
    li:nth-child(odd) {
        background: #3f3f5c;
    }
`

const JL = styled.li`
    font-size: 0.7rem;
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background: transparent;
    color: #797979;
    padding: 0.05rem;
`

const TheirMsg = styled.li`
    border-radius: 1.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    justify-content: flex-start;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
    color: white;
    background-color: #353546;
    padding: 0.5rem 0.7rem;
`

const MyMsg = styled.li`
    display: flex;
    border-radius: 1.5rem;
    justify-content: flex-end;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    color: white;
    background-color: #353546;
    padding: 0.5rem 0.7rem;
`

const UserColor = styled.span`
    font-weight: bold;
     background: linear-gradient(to bottom left, #00FFFF, #0069FF);
    -webkit-background-clip: text; /* For Safari */
    -webkit-text-fill-color: transparent; /* For Safari */
    background-clip: text;
    color: transparent;
`

const Caraio = styled.div`
    display: flex;
    align-items: center;
`

const GreenColor = styled.span`
    color: #5CFF72;
`

const RedColor = styled.span` 
    color: #d14141;
`

const Server = styled.span`
    color: #e76fff;
`

function getDate() {
    let date = new Date()
    date.setHours(date.getHours())
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`
}

export default function Chat() {
    const [users, setUsers] = useState([])
    const [msgs, setMsgs] = useState([])
    const [useSocket, setUseSocket] = useState(null)
    const refContainer = useRef(null)
    function scrollBottom() {
        refContainer.current.scrollIntoView({ behavior: 'smooth' })
    }
    function PlayReceive() {
        const audio = new Audio(ReceiveSound)
        audio.play()
    }
    useEffect(() => {
        const socket = io('https://chatinhoserver.onrender.com', { transports: ['websocket'] })
        //const socket = io('http://192.168.3.13:3000/', { transports: ['websocket'] })
        setUseSocket(socket)
        scrollBottom()
        socket.emit('clientConnection', { user: localStorage.getItem('user') })
        socket.on('messagesUpdate', (data) => {
            scrollBottom()
            setMsgs(data)
            console.log(data)
        })
        socket.on('msgSound', (data) => {
            if (data.name === localStorage.getItem('user')) {return}
            else {PlayReceive()}
        })
        socket.on('usersUpdate', (data) => {
            scrollBottom()
            setUsers(data)
        })
        return () => {
            socket.disconnect()
        }
    }, [])
    return (
        <>
            <MessagesContainer>
                {
                    msgs.map((msg) => {
                        if (msg.type === 'joined') {
                            return <JL style={{background: 'transparent'}}><p><GreenColor>{msg.user} entrou!</GreenColor> ({msg.date})</p></JL>
                        }
                        else if (msg.type === 'left') {
                            return <JL style={{background: 'transparent'}}><p><RedColor>{msg.user} saiu!</RedColor> ({msg.date})</p></JL>
                        }
                        else if (msg.type === 'serverUpdate') {
                            return <JL style={{background: 'transparent'}}><p><Server>servidor reiniciado:</Server> {getDate()}</p></JL>
                        }
                        else {
                            if (msg.user === localStorage.getItem('user')) {
                                return <MyMsg>{msg.text}</MyMsg>
                            }
                            else if (msg.type === 'msg') {
                                return <TheirMsg><p><UserColor>{msg.user}:</UserColor> {msg.text}</p></TheirMsg>
                            }
                        }
                    })
                }
            </MessagesContainer>
            <div ref={refContainer} />
            <ChatContainer socket={useSocket} />
            <Footer usersOnline={users} />
        </>
    )
}