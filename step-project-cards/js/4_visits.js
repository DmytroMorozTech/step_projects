import Request from "./1_ajax-requests.js";
import Modal from "./2_modal.js";
import DnD from "./5_Drag_n_Drop.js";

export default class Visit {
    constructor(visit) {
        // достаем из объекта visit, который зашел в этот класс в качестве аргумента, составляющие части и присваиваем их в переменные.
        let {id,fullName,purposeOfVisit,shortDescription, urgency,doctor} =visit;

        this._data = visit;
        this._id = id;
        this._fullName = fullName;
        this._purposeOfVisit = purposeOfVisit;
        this._shortDescription = shortDescription;
        this._urgency = urgency;
        this._doctor = doctor;
    }

    // это статическое свойство содержит информацию только о тех полях, которые присутствуют у всех докторов, то есть являются унифицированными.
    static params = [
        {
            nameOfInput:"fullName",
            typeOfInput:"input",
            typeOfInputData:"text",
            className: "one-line-input",
            requiredValue: "required",
            placeholder: "Full name:"
        },
        {
            nameOfInput:"purposeOfVisit",
            typeOfInput:"input",
            typeOfInputData:"text",
            className: "one-line-input",
            requiredValue: "required",
            placeholder: "Purpose of visit"
        },
        {
            nameOfInput: "shortDescription",
            typeOfInput:"textarea",
            typeOfInputData:"text",
            className: "textarea",
            requiredValue: "required",
            placeholder: "Short description of visit"
        }
    ];

    render (visit) {
        this._container = document.querySelector(".visits");
        this._visit = document.createElement("div");
        this._visit.classList.add("visit-card");
        this._visit.draggable = "true";
        // -------------------------
        this._visitIdContainer = document.createElement("p");
        this._visitIdContainer.classList.add('visit-id-container');
        this._visitIdContainer.innerText = `Visit ID: ${this._id}`
        // -------------------------
        this._fullNameContainer = document.createElement("p");
        this._fullNameContainer.classList.add("full-name-container");
        this._fullNameContainer.innerHTML = `Full name: <span class="full-name">${this._fullName}</span>`;
        // -------------------------
        this._doctorContainer = document.createElement("p");
        this._doctorContainer.classList.add("doctor");
        this._doctorContainer.innerText = `Doctor: ${this._doctor}`;
        // -------------------------
        this._showMoreBtn = document.createElement("button");
        this._showMoreBtn.classList.add("show-more-btn");
        this._showMoreBtn.setAttribute("vertical-align", "middle");
        this._showMoreBtn.insertAdjacentHTML("afterbegin", "<span>Show more </span>");

        this.showMoreBound = this.showMore.bind(this);
        this._showMoreBtn.addEventListener('click',this.showMoreBound);
        // -------------------------
        this._visit.append(this._visitIdContainer);
        this._visit.append(this._fullNameContainer);
        this._visit.append(this._doctorContainer);
        this._visit.append(this._showMoreBtn);
        // -------------------------
        this._showLessBtn = document.createElement("button");
        this._showLessBtn.classList.add("show-less-btn");
        this._showLessBtn.setAttribute("vertical-align", "middle");
        this._showLessBtn.insertAdjacentHTML("afterbegin", "<span>Show less </span>");
        this._showLessBtn.classList.add("hidden");

        this._showLessBound = this.showLess.bind(this);
        this._showLessBtn.addEventListener("click", this._showLessBound);
        // ------------------------------------------
        // Создаем editPanel и внутри две иконки edit & delete, которые будут выполнять функции кнопок.
        this._editPanel = document.createElement("div");
        this._editPanel.classList.add('edit-panel');
        this._editPanel.classList.add('hidden');
        // ---------------------------------------------------------
        this._editVisitIcon = document.createElement("img");
        this._editVisitIcon.src = "./img/visits/pencil.svg";
        this._editVisitIcon.setAttribute("alt", "edit visit btn");
        this._editVisitIcon.classList.add("edit-visit-icon");

        this._enableEditModeBound = this.enableEditMode.bind(this);
        this._editVisitIcon.addEventListener("click", this._enableEditModeBound);
        // ---------------------------------------------------------
        this._removeVisitIcon = document.createElement("img");
        this._removeVisitIcon.src = "./img/visits/delete.svg";
        this._removeVisitIcon.setAttribute("alt", "remove visit btn");
        this._removeVisitIcon.classList.add("remove-visit-icon");

        this.removeVisitBound = this.removeVisit.bind(this);
        this._removeVisitIcon.addEventListener("click", this.removeVisitBound);
        // ---------------------------------------------------------
        this._editPanel.append(this._editVisitIcon);
        this._editPanel.append(this._removeVisitIcon);

        this._visit.append(this._editPanel);
        this._visit.append(this._showLessBtn);

        this._container.append(this._visit);
    }

    static renderAllVisits(data) {
        let visitsContainer = document.querySelector(".visits");
        visitsContainer.innerHTML = "";
        data.forEach(visit => {
            switch (visit.doctor) {
                case "Cardiologist":
                    new VisitCardiologist(visit);
                    break;
                case "Dentist":
                    new VisitDentist(visit);
                    break;
                case "Therapist":
                    new VisitTherapist(visit);
                    break;
                default:
                    new Request("delete",null, visit.id);
            }
        });
        new DnD;
    }

    showMore() {
        this._showMoreBtn.classList.add('hidden');
        this._showLessBtn.classList.remove("hidden");
        this._visit.querySelector(".extra-info").classList.remove("hidden");
        this._visit.querySelector(".edit-panel").classList.remove("hidden");

        this._visit.style.height = "500px";
    }

    showLess() {
        this._showLessBtn.classList.add("hidden");
        this._showMoreBtn.classList.remove("hidden");
        this._visit.style.height = "200px";

        this._visit.querySelector(".extra-info").classList.add("hidden");
        this._visit.querySelector(".edit-panel").classList.add("hidden");
    }

    enableEditMode() {
        new Modal("editVisit", this, this._id, this._data);
    }

    updateValue(data,visit) {
        this._data = data;
        // после получения с сервера объекта data (уже отредактированная информация), сохраняем его в свойство объекта this._data. При редактировании карточки визита в дальнейшем, информация для модального окна onEdit будет получена именно отсюда.

        visit._visit.querySelector(".full-name").innerHTML = data.fullName;
        visit._visit.querySelector(".purpose-of-visit").innerHTML = data.purposeOfVisit;
        visit._visit.querySelector(".short-description").innerHTML = data.shortDescription;

        if (data.doctor==="Cardiologist") {
            visit._visit.querySelector(".age").innerHTML = data.age;
            visit._visit.querySelector(".blood-pressure").innerHTML = data.bloodPressure;
            visit._visit.querySelector(".body-mass-index").innerHTML = data.bodyMassIndex;
            visit._visit.querySelector(".past-diseases").innerHTML = data.pastIllnesses;
        }

        if (data.doctor==="Dentist") {
            visit._visit.querySelector(".purpose-of-visit").innerHTML = data.purposeOfVisit;
            visit._visit.querySelector(".date-of-previous-visit").innerHTML = data.dateOfPreviousVisit;
        }

        if (data.doctor==="Therapist") {
            visit._visit.querySelector(".age").innerHTML = data.age;
        }
    }

    removeVisit() {
        new Request("delete",null, this._id)
            .then((response) => {
                return response.json();
            })
            .then(() => { this.destroy() })
            .catch(error => console.error(error));
    }

    destroy() {
        this._visit.remove();
        // этот метод удаляет карточку визита из DOM-дерева.
        if (this._container.children.length===0) {
            this._noVisitsNotice = document.createElement("div");
            this._noVisitsNotice.classList.add("no-visits-notice");
            this._noVisitsNotice.innerText = "No items have been added yet.";
            this._container.append(this._noVisitsNotice);
        }
        // если после удаления очередного визита в контейнере с визитами не остается больше ни одного визита, то об этом в контейнер выводится соответствующее сообщение.
    }
}

export class VisitCardiologist extends Visit {
    constructor(visit) {
        super(visit);
        let {bloodPressure,bodyMassIndex, pastIllnesses, age} = visit;
        this._age = age;
        this._bloodPressure = bloodPressure;
        this._bodyMassIndex = bodyMassIndex;
        this._pastIllnesses = pastIllnesses;
        this.render();
    }

    static params = [
        // это статическое свойство содержит информацию только о тех полях, которые присущи доктору Кардиологу.
        {
            nameOfInput:"age",
            typeOfInput:"input",
            typeOfInputData:"number",
            className: "one-line-input age-input",
            requiredValue: "required",
            placeholder: "Age"
        },
        {
            nameOfInput:"bloodPressure",
            typeOfInput:"input",
            typeOfInputData:"text",
            className: "one-line-input",
            requiredValue: "required",
            placeholder: "Usual blood pressure"
        },
        {
            nameOfInput: "bodyMassIndex",
            typeOfInput:"input",
            typeOfInputData:"number",
            className: "one-line-input bmi-input",
            requiredValue: "required",
            placeholder: "Body mass index"
        },
        {
            nameOfInput: "pastIllnesses",
            typeOfInput:"textarea",
            typeOfInputData:"text",
            className: "textarea",
            requiredValue: "required",
            placeholder: "Past diseases of the cardiovascular system"
        }
        ];

    render () {
        super.render();
        const extraInfo = document.createElement("div");
        extraInfo.classList.add('extra-info');
        extraInfo.innerHTML = `
        <p class="line-in-visit">Age: <span class="regular-text age">${this._age}</span></p>
        <p class="line-in-visit">Purpose of visit: <span class="regular-text purpose-of-visit">${this._purposeOfVisit}</span></p>
        <p class="line-in-visit">Usual blood pressure: <span class="regular-text blood-pressure">${this._bloodPressure}</span></p>
        <p class="line-in-visit">Body mass index: <span class="regular-text body-mass-index">${this._bodyMassIndex}</span></p>
        <p class="line-in-visit">Past diseases of the cardiovascular system: <span class="regular-text past-diseases">${this._pastIllnesses}</span></p>
        <p class="line-in-visit">Short description: <span class="regular-text short-description">${this._shortDescription}</span></p>
        <p class="line-in-visit">Urgency: <span class="regular-text urgency">${this._urgency}</span></p>
        `;

        extraInfo.classList.add("hidden");
        this._visit.querySelector(".edit-panel").before(extraInfo);
    }
}

export class VisitDentist extends Visit {
    constructor(visit) {
        super(visit);
        this._dateOfPreviousVisit = visit.dateOfPreviousVisit;
        this.render();
    }

    static params = [
        {
            nameOfInput:"dateOfPreviousVisit",
            typeOfInput:"input",
            typeOfInputData:"text",
            className: "date-of-previous-visit one-line-input",
            requiredValue: "required",
            placeholder: "Date of previous visit"
        }
    ];

    render(){
        super.render();
        const extraInfo = document.createElement("div");
        extraInfo.classList.add('extra-info');
        extraInfo.innerHTML = `
        <p class="line-in-visit">Purpose of visit: <span class="regular-text purpose-of-visit">${this._purposeOfVisit}</span></p>
        <p class="line-in-visit">Date of previous visit: <span class="regular-text date-of-previous-visit">${this._dateOfPreviousVisit}</span></p>
        <p class="line-in-visit">Short description: <span class="regular-text short-description">${this._shortDescription}</span></p>
        <p class="line-in-visit">Urgency: <span class="regular-text urgency">${this._urgency}</span></p>
        `;

        extraInfo.classList.add("hidden");
        this._visit.querySelector(".edit-panel").before(extraInfo);
    }
}

export class VisitTherapist extends Visit {
    constructor(visit) {
        super(visit);
        this._age = visit.age;
        this.render();
    }

    static params = [
        {
            nameOfInput:"age",
            typeOfInput:"input",
            typeOfInputData:"number",
            className: "one-line-input age-input",
            requiredValue: "required",
            placeholder: "Age"
        }
    ];

    render(){
        super.render();
        const extraInfo = document.createElement("div");
        extraInfo.classList.add('extra-info');
        extraInfo.innerHTML = `
        <p class="line-in-visit">Age: <span class="regular-text age">${this._age}</span></p>
        <p class="line-in-visit">Purpose of visit: <span class="regular-text purpose-of-visit">${this._purposeOfVisit}</span></p>
        <p class="line-in-visit">Short description: <span class="regular-text short-description">${this._shortDescription}</span></p>
        <p class="line-in-visit">Urgency: <span class="regular-text urgency">${this._urgency}</span></p>
        `;

        extraInfo.classList.add("hidden");
        this._visit.querySelector(".edit-panel").before(extraInfo);
    }
}
