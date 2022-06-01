const major = 0;
const minor = 1;
const patch = 0;

(() => {
    let t = document.getElementById("title");
    if (t) {
        t.innerText += ` v${major.toString()}.${minor.toString()}.${patch.toString()}`;
    }
})();