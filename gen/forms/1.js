(() => {
    let gradeScale = document.getElementById("grading_scale");
    gradeScale.onchange = () => {
        let preview = document.getElementById("grade_scale_preview");
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        let idx = parseInt(gradeScale.selectedIndex);
        let measure = document.createElement("h4");
        measure.innerText = gradingScales[idx].primaryMeasure;
        preview.appendChild(measure);
        preview.innerHTML += gradingScales[idx].table;
    }
    for (let i = 0; i < gradingScales.length; i++) {
        let scale = gradingScales[i];
        let o = document.createElement("option");
        o.value = i.toString();
        o.innerText = scale.name;
        gradeScale.appendChild(o);
    }
})()
