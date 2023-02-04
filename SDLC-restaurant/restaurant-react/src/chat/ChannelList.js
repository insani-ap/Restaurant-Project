import React from 'react';
import { Channel } from './Channel';
// import { loadChannels } from './ChatAdmin'
export class ChannelList extends React.Component {

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    loadChannels = async () => {
        fetch('http://localhost:8081/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }
    render() {

        let list = <div className="no-content-message">There is no channels to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />);
        }
        return (
            <div className='channel-list'>
                {list}
            </div>);
    }

}