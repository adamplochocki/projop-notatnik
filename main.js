const notes = window.sessionStorage.getItem("notes");
if (notes) {
    const n_arr = JSON.parse(notes);
    n_arr.forEach(n => {
        makeNote(n.name, n.content, n.id);
    });
}


document.querySelector('#search').addEventListener('input', (e) => {
    e.target.style.backgroundColor = '#d9d9d9'
    setTimeout(() => {
        if (e.target.style.backgroundColor != '') e.target.style.backgroundColor = ''
    }, 100)
});
document.querySelector('#search').addEventListener('input', search);
document.querySelector('#add').onclick = () => { window.location.href = './static/html/new.html' };


function search(e) {
    const query = e.target.value.toLowerCase();
    const n_json = JSON.parse(notes);

    for (let i = 0; i < n_json.length; i++) {
        if (!n_json[i].name.toLowerCase().includes(query)) {
            document.querySelector(`#notes`).children[i].style.display = 'none';
        }
        else {
            document.querySelector(`#notes`).children[i].style.display = 'inherit';
        }
    }
}

function makeNote(title, start, nid) {
    const note = document.createElement('div');
    let content = start;

    if (start.length > 75) content = start.substring(0, 75) + ' ...';

    note.dataset.noteid = nid;
    note.className = 'note';
    note.innerHTML = `
    <h2>${title}</h2>
    <p>${content}</p>
    <button>X</button>
    `;

    note.querySelector('button').onclick = delNote;
    note.onclick = (e) => {
        if (e.target.nodeName == "BUTTON") return;

        window.location.href = "./static/html/note.html?id=" + nid
    }

    document.querySelector('#notes').appendChild(note);
}

function delNote(e) {
    const todel = e.target.parentNode;
    const n_json = JSON.parse(notes);

    // bardzo wydajne !?!?!!??!?!?
    for (let i = 0; i < n_json.length; i++) {
        if (n_json[i].id == todel.dataset.noteid) {
            n_json.splice(i, 1);

            window.sessionStorage.setItem('notes', JSON.stringify(n_json))
        }
    }

    todel.remove();
}