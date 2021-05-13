import Visit from "./4_visits.js";
import Request from "./1_ajax-requests.js";

export default class LiveSearch {
    constructor() {
        this._visitsContainer = document.querySelector(".visits");
        this.searchContainer = document.querySelector('.filter__container');
        this._createSearchInput();
        this._createUrgencySelect();

        this._onNewInputBound = this._onNewInput.bind(this);
        this._input.addEventListener('input', this._onNewInputBound);
        this._urgencySelect.addEventListener('change', this._onNewInputBound);
    }

    static filterHide() {
        let filter = document.querySelector('.filter');
        filter.classList.add('hide');
    }

    static filterShow() {
        let filter = document.querySelector('.filter');
        filter.classList.remove('hide');
        new LiveSearch();
    }

    _createSearchInput() {
        this._input = document.createElement('input');
        this._input.classList.add('filter__live-search');
        this._input.type = 'text';
        this._input.placeholder = 'search by (id, full name, doctor)';
        this.searchContainer.append(this._input);
    }

    _createUrgencySelect() {
        const urgency = ['All', 'Regular', 'Priority', 'Urgent'];
        this._urgencySelect = document.createElement('select');
        const urgencyTitle = document.createElement('span');
        urgencyTitle.classList.add('filter__urgency-title');
        urgencyTitle.innerText = 'Select visit urgency:';
        this._urgencySelect.classList.add('filter__select-urgency');
        urgency.forEach(el => {
            this._selectOption = document.createElement('option');
            this._selectOption.text = el;
            this._urgencySelect.options.add(this._selectOption);
        });
        this.searchContainer.append(urgencyTitle);
        this.searchContainer.append(this._urgencySelect);
    }

    _onLiveSearchAnimation() {
        let popUpContainer = document.createElement('div');
        popUpContainer.classList.add('popup');
        document.body.prepend(popUpContainer);

        popUpContainer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        popUpContainer.style.opacity="1";
        popUpContainer.style.visibility="visible";
        this._input.setAttribute("disabled","true");
        this._urgencySelect.setAttribute("disabled","true");

        setTimeout(() => {
            popUpContainer.style.visibility="hidden";
            popUpContainer.style.opacity="0";
            this._input.removeAttribute("disabled");
            this._urgencySelect.removeAttribute("disabled");
            this._input.focus();
            popUpContainer.remove();
        }, 350);
    }

    _onNewInput() {
        this._onLiveSearchAnimation();
        this._visitsContainer.innerHTML = "";
        let inputData = this._input.value;
        let selectData = this._urgencySelect.value;
        new Request('getAllVisits').then(newServerData =>{
            this._filter(newServerData, inputData, selectData);
        })
    }

    _filter(newServerData, inputData, selectData) {
        let stage1FiltrationArr = [];
        let stage2FiltrationArr = [];

        if (inputData !== '') {
        stage1FiltrationArr = newServerData.filter(({id,fullName,doctor}) => {
            let inputRegEx =  new RegExp(inputData, 'i');
            let currentId = id.search(inputRegEx);
            let currentDoctor = doctor.search(inputRegEx);
            let currentName = fullName.search(inputRegEx);
            return (currentId !== -1 || currentName !== -1 || currentDoctor !== -1)
        })
        } else {
            stage1FiltrationArr = newServerData;
        }

        stage2FiltrationArr = selectData==="All" ? stage1FiltrationArr :
        stage1FiltrationArr.filter((el)=>{ return el.urgency.includes(selectData) });

        if (stage2FiltrationArr.length===0) {
            this._visitsContainer.innerHTML = "";
            let noVisitsFoundNotice = document.createElement("div");
            noVisitsFoundNotice.classList.add('no-visits-notice');
            noVisitsFoundNotice.innerHTML = "No data was found on your request";
            this._visitsContainer.append(noVisitsFoundNotice);
        } else {
            Visit.renderAllVisits(stage2FiltrationArr);
        }
    }
}


