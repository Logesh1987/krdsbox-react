var axios = require('axios');

var id = "49434dee742fab1e9b59",
    sec = "f298f79be131b5e96fd0e573fed93f178fe28a33",
    params = "?client_id=" + id + "&client_secret=" + sec,
    org = "krdsbox",
    repoName = [],
    homePage = [];

var fetchRepo = ()=> {
    var URI = window.encodeURI(`https://api.github.com/orgs/${org}/repos`);

    return axios.get(URI)
        .then(function (response) {
            Object.keys(response.data).forEach((key) => {
                repoName.push(response.data[key].name);
                homePage.push(response.data[key].homepage);
            })
            return repoName;
        });
}
var checkURL = (url)=> {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


module.exports = {
    fetchRepoInfo: ()=> {
        var box = [];

        return fetchRepo().then(function(data) {
            var promises = [];
            console.log()
            data.forEach((e)=> {
                promises.push(axios.get(`https://raw.githubusercontent.com/${org}/${e}/master/box.json`))
            })

            return axios.all(promises)
                .then((response)=> {                    
                    response.forEach((e, i)=> {
                        e.data.homepage = homePage[i];
                        if (checkURL(e.data.image)) {
                            var img = e.data.image,
                                gify = e.data.gif;
                            e.data.image = `https://raw.githubusercontent.com/${org}/${repoName[i]}/master/${img}`
                            e.data.gif = `https://raw.githubusercontent.com/${org}/${repoName[i]}/master/${gify}`
                        }
                        else {
                            e.data.image = `https://vignette.wikia.nocookie.net/hunterxhunter/images/6/6d/No_image.png/revision/latest?cb=20120417110152`
                            e.data.gif = `https://vignette.wikia.nocookie.net/hunterxhunter/images/6/6d/No_image.png/revision/latest?cb=20120417110152`
                        }
                        box.push(e.data)
                    })
                    
                    return box;                    
                })

        })
    }
}