const $btnExportar = document.querySelector("#btnExportar");

function ExportToExcel(table){
    var link = document.getElementById('link');
    var nombre = document.getElementById('nombre');
    link.href = 'data:application/vnd.ms-Excel,' + encodeURIComponent(table);
    link.download = nombre.value;
    link.click();
}

function findString(word,chartInit,charEnd){
    let init = (word.indexOf(chartInit)) + (chartInit.length + 2);
    let end = word.indexOf(charEnd);
    let long = (end-init) -1;
    let result = "";
    result = `<td>${word.substr(init,long)}</td>`
    return result;
}

fetch ('data.json')
    .then(res => res.json())
    .then((data) => {
        DATA = data.items;
        boxContent = `<table>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>nombre</td>
                                <td>ciudad</td>
                                <td>direccion</td>
                                <td>lat</td>
                                <td>lng</td>
                                <td>link</td>
                                <td>horarioWeek</td>
                                <td>horarioWeekend</td>
                            <tr>
                        <thead>
                        <tbody>`;
        DATA.map((data) => {
            let html = data.popup_html.split("\"");

            let cI = (html[24].indexOf("Ciudad")) + 8;
            let cE = html[24].indexOf("<br>");
            let dI = (html[24].indexOf("Dirección")) + 11;
            let dE = html[24].lastIndexOf("<br>");
            let wI = (html[26].indexOf("&nbsp")) + 6;
            let wE = html[26].indexOf("<br>");
            let weI = (html[26].lastIndexOf("&nbsp")) + 6;
            let weE = html[26].lastIndexOf("<br>");
            let longC = (cE-cI) -1;
            let longD = (dE-dI) -1;
            let longW = (wE-wI);
            let longWE = (weE-weI);

            boxContent += `<tr>
                            <td>${data.id}</td>
                            <td>${html[21]}</td>
                            ${findString(html[24],"Ciudad","<br>")}
                            <td>${html[24].substr(dI,longD)}</td>
                            <td>${data.lat}</td>
                            <td>${data.lng}</td>
                            <td>${html[19]}</td>
                            <td>${html[26].substr(wI,longW)}</td>
                            <td>${html[26].substr(weI,longWE)}</td>
                           </tr>`;
        });
        boxContent += `</body>
                    </table>`;
        console.log(boxContent);
        $btnExportar.addEventListener("click", function(){ExportToExcel(boxContent)});
    });
