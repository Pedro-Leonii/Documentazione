const owner = 'ALT-F4-eng';
const repo = 'Documentazione';

async function getFromRepo(owner, repo, path='') {
    try {
        const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        if(!resp.ok) {
            throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        }

        const respJson = await resp.json();
        return respJson;
    }
    catch(error) {
        console.error(error.message);
    }
}

async function createSubTrees(path='') {
    const content = await getFromRepo(owner, repo, path);

    var res = document.createElement('ol')

    for (const e of content) {
        if(e.type === 'dir') {
            var li = document.createElement('li');
            li.textContent = e.name.replace(/([A-Z])/g, " $1"); 
            li.setAttribute('class', 'dir');

            res.appendChild(li);

            res.appendChild(await createSubTrees(e.path));
        }
        if(e.type === 'file') {
            var li = document.createElement('li');
            var link = document.createElement('a');

            link.setAttribute('href', e.download_url);
            link.textContent = e.name;

            li.appendChild(link)
            res.appendChild(li);
        }

    }

    return res;
    
}

async function cerateRepoTree() {
    const milestones = await getFromRepo(owner, repo);
    var milestonesList = [];

    for(const m of milestones){
        if(m.type === 'dir') {
            var sec = document.createElement('section');
            var h2 = document.createElement('h2');

            sec.setAttribute('class', 'milestone');
            sec.setAttribute('id', m.name);
            h2.textContent = m.name.replace(/([A-Z])/g, " $1");

            sec.appendChild(h2);
            sec.appendChild(await createSubTrees(m.name));
            milestonesList.push(sec);
        }

    }

    return milestonesList;
}


cerateRepoTree().then(res=>{
    var base = ''
    var main = document.querySelector('main');
    var navbar = document.querySelector('#milestones-links ul');
    

    res.forEach(e => {
        main.appendChild(e);
        var link = document.createElement('a');
        link.setAttribute('href', `#${e.id}`);
        link.setAttribute('onClick', 'closeMobileMenu();')
        link.textContent = e.id.replace(/([A-Z])/g, " $1");
        navbar.appendChild(document.createElement('li').appendChild(link));
    });
    setTimeout(()=>{
        document.getElementById('loading').remove();

        document.querySelectorAll('.hide').forEach(e=>{
            e.classList.remove('hide');
        })
    }, 100);
    
})