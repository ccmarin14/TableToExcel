function ExportToExcel(table){
    var link = document.getElementById('link');
    var nombre = document.getElementById('nombre');
    link.href = 'data:application/vnd.ms-Excel;charset=utf-8,' + encodeURIComponent(table);
    link.download = `${nombre.value}.xls`;
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