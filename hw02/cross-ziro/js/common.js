window.onload = main;

function main() {
    var table = drawTable('cross_ziro', 3, 3);

    document.getElementsByClassName('container')[0].appendChild(table);
    document.getElementById('tbl').addEventListener('click', cellClick);

}

function cellClick(event) {
    var img = document.createElement('img');

    console.log(event.target);

    if(event.target.classList.contains('cell')) {

        if(event.target.getAttribute('active') === '0') {

            img.classList.add('cross');
            img.src = 'img/cross.png';

            event.target.appendChild(img.cloneNode(true));
            event.target.setAttribute('active', '1');

        }
    } else if(event.target.classList.contains('cross')) {

        event.target.src = 'img/ziro.png';
        event.target.classList.remove('cross');
        event.target.classList.add('ziro');

    } else if(event.target.classList.contains('ziro')) {

        event.target.src = 'img/cross.png';
        event.target.classList.remove('ziro');
        event.target.classList.add('cross');

    }
}

function drawTable(cls, numRows, numCells) {
    var table = document.createElement('div');
    var row = document.createElement('div');
    var cell = document.createElement('div');

    table.classList.add(cls);
    table.setAttribute('id', 'tbl');
    row.classList.add('row');
    cell.classList.add('cell');

    for(var i = 0; i < numRows; i++) {

        for(var j = 0; j < numCells; j++) {

            cell.setAttribute('pos', 'r' + (i + 1) +'c' + (j + 1));
            cell.setAttribute('active', '0');
            row.appendChild(cell.cloneNode(true));

        }

        row.setAttribute('pos', 'r' + (i + 1));
        table.appendChild(row.cloneNode(true));
        row.innerHTML = '';
    }

    return table;
}