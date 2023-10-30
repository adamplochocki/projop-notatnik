const params = new window.URLSearchParams(window.location.search);
const id = params.get('id');
let n_index;

if (id == null || id == '') {
    document.body.innerHTML = `
        <h1 class="wrong-id">This note doesn't exist</h1>
        <p class="wrong-id">Go <a href="../../index.html">back</a>
    `
}
else {
    document.querySelector('#back').onclick = () => { window.location.href = '../../index.html' }
    const notes = window.sessionStorage.getItem("notes");
    const n_arr = JSON.parse(notes);
    for (let i = 0; i < n_arr.length; i++) {
        if (n_arr[i].id == id) {
            n_index = i;
            fillNote(n_arr[i].name, n_arr[i].content);
        }
    }
}

function fillNote(name, content) {
    document.title = name;

    document.querySelector('#title').value = name;
    document.querySelector('#content').value = content;

    document.querySelector('#save').onclick = save;
}

function save() {
    const notes = window.sessionStorage.getItem("notes");
    const n_arr = JSON.parse(notes);

    n_arr[n_index].name = document.querySelector('#title').value;
    n_arr[n_index].content = document.querySelector('#content').value;

    window.sessionStorage.setItem('notes', JSON.stringify(n_arr));

    window.location.href = '../../index.html';
}