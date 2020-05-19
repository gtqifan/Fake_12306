const trainForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const cardlist = document.querySelector('.cardlist');
var patt = /([GCDSZTK]\d{1,3})|\d{4}/is;

const updateTrain = async (trainID) => {
    await getTrain(trainID).then(data => {
        if (data.length != 0) {
            const overnight = (data[data.length - 1].火车列车是否过夜 === '0') ? '' : ('+' + data[data.length - 1].火车列车是否过夜);
            const type = data[0].火车列车类型名称;
            details.innerHTML = `
                <div class="row my-2 mx-auto location">
                    <h2 class="col-4">${data[0].出发站点名称}</h2>
                    <i class="fa fa-angle-right fa-3x col my-auto"></i>
                    <h2 class="col-4">${data[0].终点站点名称}</h2>
                </div>
                <div class="row my-1 mx-auto time">
                    <h2 class="col">${data[0].火车列车出发时间}</h2>
                    <h4 class="col font-weight-bold">${type} ${data[0].火车列车车次}</h2>
                    <h2 class="col">${data[data.length - 1].火车列车出发时间} ${overnight}</h2>
                </div>
            `;
            cardlist.innerHTML= ` `;
            for (var i = 1; i < data.length - 1; i++) {
                cardlist.innerHTML += `
                    <div class="card shadow-lg rounded bg-primary">
                        <div class="text-uppercase text-center">
                            <div class="row my-2 mx-auto">
                                <h2 class="col-5">${data[i].出发站点名称}</h2>
                                <h2 class="col"></h2>
                                <h2 class="col-5">${data[i + 1].出发站点名称}</h2>
                            </div>
                            <div class="row my-1 mx-auto">
                                <h2 class="col">${data[i].火车列车出发时间}</h2>
                                <h2 class="col">${data[i + 1].火车列车出发时间}</h2>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            details.innerHTML = `
                <div class="row my-2 mx-auto">
                    <h1 class="col text-center text-warning">Train Not Found</h1>
                </div>
            `;
            cardlist.innerHTML= ` `;
        }

        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
    });
};

trainForm.addEventListener('submit', e => {
    e.preventDefault();

    const str = trainForm.trainID.value.trim().toUpperCase();
    trainForm.reset();

    if (str.match(patt) && str.length <= 4) {
        updateTrain(str);
    } else {
        details.innerHTML = `
                <div class="row my-2 mx-auto">
                    <h1 class="col text-center text-danger">Wrong Pattern</h1>
                </div>
        `;
        cardlist.innerHTML= ` `;
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
    }
});

