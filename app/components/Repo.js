var React = require('react');
var Api = require('./Api');

var RepoGrid = (props)=> {
    
    const addDefaultSrc = (ev)=> {
        ev.target.src = 'https://vignette.wikia.nocookie.net/hunterxhunter/images/6/6d/No_image.png/revision/latest?cb=20120417110152';
    };
    
    return (
        <ul className="repoList">
            {props.repos.map((repo, index)=> {
                return (
                    <li key={index}>
                        <a className="action" href={repo.homepage}></a>
                        <figure>
                            <img src={repo.image} onError={addDefaultSrc} />
                            <img className="hoverGif" src={repo.gif} />
                        </figure>
                        <div>
                            <h2>{repo.name}</h2>
                            <p>
                                <strong>TAGS: </strong>{repo.tags}
                            </p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

class Repo extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            repos: null
        }
    } 

    componentDidMount() {
        Api.fetchRepoInfo()
            .then((repo)=> {
                this.setState(()=> {
                    return {
                        repos: repo
                    }
                })
            })
    }

    render() {
        return (
            <div className="contentArea">
                {(!this.state.repos) ?
                    <p className="loader">Loading</p> :
                    <RepoGrid repos={this.state.repos} />
                }
            </div>
        )
    }
}

module.exports = Repo;


// var encodedURI = window.encodeURI('https://raw.githubusercontent.com/krdsbox/animated-line-menu/master/box.json');
        // var encodedURI = window.encodeURI('https://api.github.com/orgs/krdsbox/repos');