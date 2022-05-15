const $btnExportar = document.querySelector("#btnExportar");

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
                            </tr>
                        </thead>
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
