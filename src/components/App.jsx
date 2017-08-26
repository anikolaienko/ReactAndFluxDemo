import React from 'react';

class App extends React.Component {
    constructor(){
        super(); 

        this.state = {
            messages: [
                {id: 1, name:'hi there how are you?'},
                {id: 2, name:'I am fine, and you?'}
            ]
        };
    }
  
    render() {
        var messageNodes = this.state.messages.map((message) => {
            return (
                <div key={message.id}>{message.name}</div>
            );
        });

        return (
            <div>{messageNodes}</div>
        );
    }
}

export default App;