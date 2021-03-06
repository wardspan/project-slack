var React = require('react');
var ReactDOM = require('react-dom');

var Modal = require('react-modal');
const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var Channels = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  joinNewChannel: function() {
    var new_channel = $('#new-channel-name').val(); 
    if (new_channel.trim() != "") {
      this.props.createChannel(new_channel);
      this.closeModal();
    }
  },

  onEnter: function(e){
    if (e.nativeEvent.keyCode != 13) return;
    this.joinNewChannel();
  },

  switchChannel: function(channelName) {
    this.props.joinChannel(channelName);
  },

  render: function() {
    var currentChannel = this.props.currentChannel;
    var channelList = [];
    for (i=0; i < this.props.channels.length; i++ ) {
      var channel = this.props.channels[i];
      channelList.push(
        <li key={channel} className={channel===  currentChannel ? 'channel active' : 'channel'} onClick={this.switchChannel.bind(this, channel)}>
            <a className="channel_name">
                <span className="unread">0</span>
                <span><span className="prefix">#</span>{channel}</span>
            </a>
        </li>
      )
    }

    return (
        <div className="listings_channels">
            <span className="add_icon" onClick={this.openModal}>+</span> <h2 className="listings_header">Channels </h2>
            <ul className="channel_list">
                {channelList}
            </ul>

            <Modal 
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyle}>
              <h2 className="text-center">Enter a channel to join</h2>
                <div>
                  # <input id="new-channel-name" type="text" onKeyPress={this.onEnter}/>
                  <button className="btn" onClick={this.joinNewChannel}>Join</button>
                </div>
            </Modal>
        </div>
    )
  }
});

module.exports = Channels;
