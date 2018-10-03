class wrapper extends React.Component {
    render() {
        return (
            <div>
                SDFSDFFDSFSFDSFSFSF

            </div>
        );
    }
}

class itemsWrapper extends React.Component {
    render() {
        return (
            <div id="itemsWrapper">


            </div>
        );
    }
}

class buttonsWrapper extends React.Component {
    render() {
        return (
            <div id="buttonsWrapper">


            </div>
        );
    }
}

class messageBox extends React.Component {
    render() {
        return (
            <div id="messageBox">


            </div>
        );
    }
}

class btnReject extends React.Component {
    render() {
        return (
            <div className="button droppable" id="btnReject">
                Not made
                <span style="color:#C50706;"></span>
            </div>
        );
    }
}

class btnSend extends React.Component {
    render() {
        return (
            <div className="button droppable" id="btnSend">
                Dishes
                <span style="color:#028EE8;"></span>
            </div>
        );
    }
}

class btnSuspend extends React.Component {
    render() {
        return (
            <div className="button droppable" id="btnSuspend">
                Suspend menu
                <span style="color:orange;"></span>
            </div>
        );
    }
}

class btnList extends React.Component {
    render() {
        return (
            <div className="button" id="btnList">
                Line up for food
                <span style="color:#41BF4A;"></span>
            </div>
        );
    }
}

class btnHistory extends React.Component {
    render() {
        return (
            <div className="button" id="btnHistory">
                History
                <span style="color:#028EE8;"></span>
            </div>
        );
    }
}

class btnSettings extends React.Component {
    render() {
        return (
            <div className="button" id="btnSettings">
                Settings
                <span style="font-family:jdIonicons;vertical-align:top;background-color:white;color:#028EE8;font-size:15px;display:none;"></span>
            </div>
        );
    }
}

class btnTop extends React.Component {
    render() {
        return (
            <div className="button" id="btnTop">
                Scroll top
                <span style="font-family:jdIonicons;vertical-align:top;background-color:white;color:#028EE8;font-size:15px;"></span>
            </div>
        );
    }
}




























ReactDOM.render(<wrapper></wrapper>,document.getElementById("root"));
