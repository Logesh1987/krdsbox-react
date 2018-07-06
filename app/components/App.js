var React = require('react'),
    logo = require('../assets/img/logo.png'),
    Repo = require('./Repo');

var Header = (props)=> {
    return (
        <header>
            <div className="contentArea">
                <img className="logo" src={logo} />
            </div>
        </header>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mainContainer">
                    <div className="contentArea">
                        <div className="head">
                            <h1>Welcome to Box</h1>
                            <p>Box is a showcase of the UI components/widgets done internally by KRDS fellowmen. It can be useful for PMs, Designers, Integrators, Developers. One can using the components listed as a prototype reference for a projects. You may subscribe to receive periodic updates about new components from Box.</p>
                        </div>
                        <Repo />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = App;