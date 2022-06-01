let colors = ["violet", "lightblue", "lightyellow", "red", "pink", "lightgreen"];

function expandedLog(item, name = "", maxDepth = 20, depth = 0) {
    if (depth > maxDepth) {
        console.log(item);
        return;
    }
    if (typeof item === 'object' && item !== null) {
        depth === 0 && console.group("%c" + name + ": " + (Array.isArray(item) ? "array" : (typeof item)), `color: orange;`);
        Object.entries(item).forEach(([key, value]) => {
            console.group("%c" + key + ": " + (Array.isArray(value) ? "array" : (typeof value)), `color: ${colors[depth % colors.length]};`);
            expandedLog(value, "", maxDepth, depth + 1);
            console.groupEnd();
        });
        depth === 0 && console.groupEnd();
    } else {
        console.log(item);
    }
}

!localStorage.getItem("step") && localStorage.setItem("step", "0");
!localStorage.getItem("data") && localStorage.setItem("data", JSON.stringify([]));

const steps = ["School Information", "Student Information", "Content Options", "Courses"];
const maxStep = steps.length - 1;

var bar, f, dat = {}, step, els;

function init() {
    bar = document.getElementById("bar");
    f = document.getElementById("form");
    for (let i = 0; i <= maxStep; i++) {
        let s = document.createElement("span");
        let b = document.createElement("button");
        let p = document.createElement("p");
        b.onclick = () => { changeStep(i) };
        b.onmouseover = () => { p.style.display = "inline" };
        b.onmouseout = () => { p.style.display = "none" };
        b.innerText = i.toString();
        p.innerText = steps[i] || "";
        p.style.display = "none";
        s.appendChild(b);
        s.appendChild(p);
        bar.appendChild(s);
    }
    let b = document.createElement("button");
    b.id = "reset";
    b.onclick = () => {
        changeStep(0);
        localStorage.clear();
        f.reset();
    }
    b.innerText = "Reset";
    bar.appendChild(b);
    changeStep(0);
    f.onkeydown = (e) => {
        if (e.key == "Enter" && document.activeElement != document.getElementById("submit") && document.activeElement.type != "textarea") {
            e.preventDefault();
        }
    };
    f.onsubmit = (e) => {
        addData();
        changeStep(step == maxStep ? (step = 0) : step + 1);
        e.preventDefault();
    };

    setInterval(addData, 2000);
}

function addData() {
    !localStorage.getItem("step") && localStorage.setItem("step", "0");
    !localStorage.getItem("data") && localStorage.setItem("data", JSON.stringify([]));
    let fd = new FormData(f);
    fd.forEach((val, key) => val ? (dat[key] = val) : (dat[key] && delete dat[key]));
    Object.keys(dat).forEach((key) => !fd.has(key) && delete dat[key]);
    step = parseInt(localStorage.getItem("step"));
    let d = JSON.parse(localStorage.getItem("data"));
    d[step] = dat;
    // d.forEach((val, idx) => Object.keys(val).length === 0 && d.splice(idx, 1));
    expandedLog(d, "d");
    localStorage.setItem("data", JSON.stringify(d));
}

// Returns whether this is new or already filled
function changeStep(to) {
    let d = JSON.parse(localStorage.getItem("data"));
    f.reset();
    buildInputs(to);
    for (let el of f.elements) {
        el.type == "checkbox"
            ? d[to]?.[el.name] && (el.checked = d[to][el.name] == "on")
            : d[to]?.[el.name] && (el.value = d[to][el.name]);
    }
    dat = d[to] || {};
    localStorage.setItem("step", to.toString());
}

function buildInputs(s) {
    let form;
    fetch("./forms/" + s.toString() + ".html")
        .then(res => {console.log(res), res.text()})
        .then(text => {console.log(text), form = text});
    f.innerHTML = form;
}
