import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.scss';
import { MessagesPanel } from './MessagesPanel';
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8081";
export default class Chat extends React.Component {

    state = {
        channels: null,
        socket: null,
        channel: null
    }
    socket;
    componentDidMount() {

        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('channel', channel => {

            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {

            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        fetch('http://localhost:8081/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
            let channel = this.state.channels[this.state.channels.length - 1]
            this.setState({ channel });
            this.socket.emit('channel-join', data.id, ack => {
            });
        })
    }


    handleSendMessage = (channel_id, text) => {
        let name = JSON.parse(localStorage.getItem("currentUser"))
        this.socket.emit('send-message', { channel_id, text, senderName: name.name, id: Date.now() });
    }

    render() {
        return (
            <div className='chat-app'>
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} align="right" align2="left" />
            </div>
        );
    }
}