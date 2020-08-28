let form = document.getElementById('filter');
let spa = document.getElementById('spa_table');
let pagPlace = document.getElementById('pag_place');
let spaTh = document.createElement('th');
let spaTh2 = document.createElement('th');
let spaTh3 = document.createElement('th');
let spaTh4 = document.createElement('th');
let spaTrTh = document.createElement('tr');

spaTh.innerHTML = 'Дата';
spaTh2.innerHTML = 'Название';
spaTh3.innerHTML = 'Количество';
spaTh4.innerHTML = 'Расстояние';
spaTrTh.appendChild(spaTh);
spaTrTh.appendChild(spaTh2);
spaTrTh.appendChild(spaTh3);
spaTrTh.appendChild(spaTh4);
//let trs = document.getElementsByClassName('sql-str');
let pagLimit = 30;
let paginationNums = document.getElementsByClassName('pagination-num');
let pagesNum = paginationNums.length;

for (let i = 0; i < pagesNum; i++) {
    paginationNums[i].addEventListener('click', function(){
        for (let j = 0; j < pagesNum; j++) {
            paginationNums[j].classList.remove('black');
        }
        this.classList.add('black');
        let num = this.innerHTML;
        
        let seachParams = new URLSearchParams();
        seachParams.set('num', num);
        seachParams.set('pages_num', pagesNum);
        seachParams.set('pag_limit', pagLimit);
        
        let promise = fetch('elems/ajax.php', {
            method: 'POST',
            body: seachParams,
        });
        promise.then(
            response => {
                return response.text();
            }
        ).then(
            text => {
                let json = JSON.parse(text);
                let countTr = json.length;
                spa.innerHTML = '';
                spa.appendChild(spaTrTh);
                for (let i = 0; i < countTr; i++) {
                    let tr = document.createElement('tr');
                    if (i == 0 || i % 2 == 0) {
                        tr.setAttribute('class', 'gray');
                    } else {
                        tr.setAttribute('class', 'white');
                    }
                    let td = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    td.innerHTML = json[i].date;
                    td2.innerHTML = json[i].name;
                    td3.innerHTML = json[i].count;
                    td4.innerHTML = json[i].distance;
                    tr.appendChild(td);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    spa.appendChild(tr);
                }
            }
        )
    });
}


form.addEventListener('submit', function(event) {
	let col = this.querySelector('#col').value;
	let cond = this.querySelector('#cond').selectedIndex;
	let val = this.querySelector('#val').value;
    
	let searchParams = new URLSearchParams();
	searchParams.set('col', col);
	searchParams.set('cond', cond);
	searchParams.set('val', val);
	
	let promise = fetch('elems/ajax.php', {
		method: 'POST',
		body: searchParams,
	});
	
	promise.then(
		response => {
			return response.text();
		}
	).then(
		text => {
			let json = JSON.parse(text);
            let countTr = json.length;
            spa.innerHTML = '';
            spa.appendChild(spaTrTh);
            pagPlace.innerHTML = '';
            if (countTr > pagLimit) {
                var iterNum = pagLimit;
                let pagNums = Math.ceil(countTr / pagLimit) + 1;
                for (let i = 1; i < pagNums; i++) {
                    let pagDiv = document.createElement('div');
                    pagDiv.setAttribute('class', 'pagination-num');
                    pagDiv.innerHTML = i;
                    pagDiv.addEventListener('click', function(){
                        spa.innerHTML = '';
                        spa.appendChild(spaTrTh);
                        let from = (parseInt(this.innerHTML) - 1) * pagLimit + 1;
                        if (parseInt(this.innerHTML) != pagNums){
                            var to = from + pagLimit;
                        } else {
                            var to = pagLimit * pagNums - countTr;
                        }
                        
                        for (let j = from; j < to; j++) {
                            let tr = document.createElement('tr');
                            if (j == 0 || j % 2 == 0) {
                                tr.setAttribute('class', 'gray');
                            } else {
                                tr.setAttribute('class', 'white');
                            }
                            let td = document.createElement('td');
                            let td2 = document.createElement('td');
                            let td3 = document.createElement('td');
                            let td4 = document.createElement('td');
                            td.innerHTML = json[j].date;
                            td2.innerHTML = json[j].name;
                            td3.innerHTML = json[j].count;
                            td4.innerHTML = json[j].distance;
                            tr.appendChild(td);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            spa.appendChild(tr);
                        }
                    });
                    
                    pagPlace.appendChild(pagDiv);
                }
            } else {
                var iterNum = countTr;
            }
            for (let i = 0; i < iterNum; i++) {
                let tr = document.createElement('tr');
                if (i == 0 || i % 2 == 0) {
                    tr.setAttribute('class', 'gray');
                } else {
                    tr.setAttribute('class', 'white');
                }
                let td = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                td.innerHTML = json[i].date;
                td2.innerHTML = json[i].name;
                td3.innerHTML = json[i].count;
                td4.innerHTML = json[i].distance;
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                spa.appendChild(tr);
            }
            
//            console.log(text);
		}
	);
	
	event.preventDefault();
});