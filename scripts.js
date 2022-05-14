const $btnExportar = document.querySelector("#btnExportar");

function ExportToExcel(table){
    var link = document.getElementById('link');
    var nombre = document.getElementById('nombre');
    link.href = 'data:application/vnd.ms-Excel,' + encodeURIComponent(table);
    link.download = `${nombre.value}.xlsx`;
    link.click();
}

function findString(word,chartInit,charEnd,type){
    let init;
    let end;
    let result = "";
    let longConcidence = (chartInit.length + 2);

    switch(type) {
        case 1:
            init = (word.indexOf(chartInit)) + longConcidence;
            end = word.indexOf(charEnd);
            break;
        case 2:
            init = (word.indexOf(chartInit)) + longConcidence;
            end = word.lastIndexOf(charEnd);
            break;
        case 3:
            init = (word.lastIndexOf(chartInit)) + longConcidence;
            end = word.lastIndexOf(charEnd);
            break;
    }
    let long = (end-init);
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

            boxContent += `<tr>
                            <td>${data.id}</td>
                            <td>${html[21]}</td>
                            ${findString(html[24],"Ciudad","<br>",1)}
                            ${findString(html[24],"Dirección","<br>",2)}
                            <td>${data.lat}</td>
                            <td>${data.lng}</td>
                            <td>${html[19]}</td>
                            ${findString(html[26],"&nbs","<br>",1)}
                            ${findString(html[26],"&nbs","<br>",3)}
                        </tr>`;
        });
        boxContent += `</tbody>
                    </table>`;
        $btnExportar.addEventListener("click", function(){ExportToExcel(boxContent)});
    });
