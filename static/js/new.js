document.querySelector('#make').onclick = addNote;

function addNote(e) {
    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value

    if (title.replaceAll(" ", '') == '' || content == '') {
        e.target.classList.add("error");
        e.target.textContent = 'Title or content empty'

        setTimeout(() => {
            e.target.classList.remove("error");
            e.target.textContent = 'Make note'
        }, 1500)

        return;
    }

    const notes = window.sessionStorage.getItem("notes");
    if (notes) {
        const n_arr = JSON.parse(notes);
        n_arr.push({
            "id": Math.round(Math.random() * 10000000).toString(),
            "name": title,
            "content": content
        });

        window.sessionStorage.setItem("notes", JSON.stringify(n_arr));
    }
    else {
        window.sessionStorage.setItem("notes", JSON.stringify([{
            "id": Math.round(Math.random() * 10000000).toString(),
            "name": title,
            "content": content
        }]));
    }

    window.location.href = "../../index.html";
}