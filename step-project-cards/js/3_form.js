import Request from "./1_ajax-requests.js";
import Visit, {VisitCardiologist, VisitDentist, VisitTherapist} from "./4_visits.js";
import LiveSearch from "./6_live-search.js";

export default class Form {
    constructor(visit, id, data) {
        // visit - это непосредственно сам объект visit.

        this._visit = visit;
        this._id = id;
        this._data = data;

        this._createVisitBtnParams = {
            nameOfInput: "createVisitModalBtn",
            typeOfInput:"button",
            typeOfInputData:"submit",
            className: "create-visit-modal-btn",
            requiredValue: null,
            placeholder: null,
            innerText: "CREATE"
        }
    }

    static onLoginAnimation() {
        let popUpContainer = document.querySelector(".popup");
        popUpContainer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        setTimeout(() => {
            let signInBtn = document.querySelector('.sign-in-btn');
            signInBtn.style.display = "none";
            let createVisitBtn = document.querySelector(".create-visit-btn");
            createVisitBtn.style.display = "inline-block";
            popUpContainer.remove();
        }, 1200);
    }

    static onAnyVisitActionAnimation() {
        let popUpContainer = document.querySelector(".popup");
        popUpContainer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        setTimeout(() => {
            popUpContainer.remove();
        }, 1200);
    }

    onCreateVisitClick(e) {
        e.preventDefault();
        if (!Input.checkDateOfPrevVisit(e)) {return false}
        if (!Input.checkAgeInput(e)) {return false}
        if (!Input.checkBmiInput(e)) {return false}
        // перед тем, как отправлять запрос на сервер, делаем проверку введенных данных по некоторым полям ввода.

        let selectedDoctor = document.querySelector(".doctor-select").value;
        let selectedUrgency = document.querySelector(".urgency-select").value;

        let formData = new FormData(this._el);
        formData = Object.fromEntries(formData);
        formData["doctor"] = selectedDoctor;
        formData["urgency"] = selectedUrgency;
        // console.log(formData);

        new Request("post", formData, null)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Form.onAnyVisitActionAnimation();
                // spinner animation на время создания визита.
                let noVisitsNotice = document.querySelector(".no-visits-notice");
                if (noVisitsNotice) {
                    noVisitsNotice.remove()
                }

                switch (data.doctor) {
                    case "Cardiologist":
                        new VisitCardiologist(data);
                        break;
                    case "Dentist":
                        new VisitDentist(data);
                        break;
                    case "Therapist":
                        new VisitTherapist(data);
                        break;
                }
            })
            .catch(error => console.error(error));

        this._el.reset();
    }

    onEditVisitClick(e) {
        e.preventDefault();
        if (!Input.checkDateOfPrevVisit(e)) {return false}
        if (!Input.checkAgeInput(e)) {return false}
        if (!Input.checkBmiInput(e)) {return false}
        // перед тем, как отправлять запрос на сервер, делаем проверку введенных данных по некоторым полям ввода.

        let formData = new FormData(this._el);
        formData = Object.fromEntries(formData);
        formData["doctor"] = this._data.doctor;
        formData["urgency"] = this._data.urgency;

        new Request("put", formData, this._id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this._visit.updateValue(data, this._visit);
                Form.onAnyVisitActionAnimation();
            })
            .catch(error => console.error(error));
    }
}

export class LoginForm extends Form {
    constructor() {
        super();
        return this.render();
    }

    render(){
        this._el = document.createElement('form');
        this._el.classList.add("login-form");
        this._loginIcon = document.createElement("img");
        this._loginIcon.src = "./img/modal/login-icon.svg";
        this._loginIcon.classList.add('login-icon');
        this._loginIcon.setAttribute("alt", "login icon");
        this._el.append(this._loginIcon);
        // -----------------------------
        this._notification = document.createElement("p");
        this._notification.classList.add('notification');
        this._notification.innerText = "Wrong e-mail or password was entered! Please try again.";
        this._notification.style.visibility = 'hidden';
        this._notification.style.opacity = "0";
        this._el.append(this._notification);
        // -----------------------------
        let emailInputParams ={
            nameOfInput:"email",
            typeOfInput:"input",
            typeOfInputData:"text",
            value: null,
            className: "email-input",
            requiredValue: "required",
            placeholder: "E-mail"
        };
        let emailInput = new Input(emailInputParams);

        // -----------------------------
        let passwordInputParams = {
            nameOfInput:"password",
            typeOfInput:"input",
            typeOfInputData:"password",
            value: null,
            className: "password-input",
            requiredValue: "required",
            placeholder: "Password"
        };
        let passwordInput = new Input(passwordInputParams)

        // -----------------------------
        let loginBtnParams = {
            nameOfInput:"loginBtn",
            typeOfInput:"button",
            typeOfInputData:"submit",
            value: null,
            className: "login-btn",
            requiredValue: "required",
            placeholder: "Password",
            innerText: "LOGIN"
        }
        let loginBtn = new Input(loginBtnParams);

        setTimeout(()=>{
            this._el.append(emailInput);
            this._el.append(passwordInput);
            this._el.append(loginBtn);
        }, 300);


        // Event handler for login form goes below.
        this._el.addEventListener('submit', function (e) {
            e.preventDefault();

            let formData = new FormData(this);
            formData = Object.fromEntries(formData);

            new Request("login", formData, null)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    if (data.status === "Success") {
                        sessionStorage.setItem('token', data.token);
                        // сохраняем полученный токен в sessionStorage. Это нужно нам для того, чтобы в дальнейшем при каждом запросе на сервер (вид запроса не важен) в секцию headers добавлять этот токен, чтобы сервер мог аутентифицировать пользователя.
                        Form.onLoginAnimation();
                        // анимация (спиннер) после успешного входа в систему.

                        new Promise((resolve, reject) => {
                            resolve(new Request("getAllVisits"));
                        }).then((data) => {
                            // console.log(data);
                            if (data.length !== 0) {
                                Visit.renderAllVisits(data);
                            }
                        })
                        LiveSearch.filterShow();
                    } else if (data.status === "Error") {
                        let notification = document.querySelector(".notification");
                        notification.style.visibility = 'visible';
                        notification.style.opacity = "1";
                    }
                    return data;
                })
                .catch(error => console.error(error));

            // this.reset();
        })

        return this._el;
    }
}

export class EditForm extends Form{
    constructor(visit, id, data) {
        super(visit, id, data);
        return this.render();
    }

    render(){
        this._el = document.createElement('form');
        this._el.classList.add('edit-visit-form');

        this._heading = document.createElement('h2');
        this._heading.classList.add("h2");
        this._heading.innerText = "Please edit information about this visit:";
        this._el.append(this._heading);
        // ------------------------------------------
        this._doctor = new InputFieldTitle("Doctor: ");
        this._doctor.insertAdjacentHTML("beforeend", `${this._data.doctor}`);
        this._urgency = new InputFieldTitle("Urgency: ");
        this._urgency.insertAdjacentHTML("beforeend", `${this._data.urgency}`);
        this._el.append(this._doctor);
        this._el.append(this._urgency);

        this._editBtnParams =  {
            nameOfInput: "editVisitModalBtn",
            typeOfInput:"button",
            typeOfInputData:"text",
            value:null,
            className: "edit-visit-modal-btn",
            requiredValue: null,
            placeholder: null,
            innerText: "EDIT"
        };

        Visit.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"edit",this._data);
            this._el.append(createdInput);
        })

        if (this._data.doctor === "Cardiologist") {
            VisitCardiologist.params.forEach(param => {
                let inputTitle = new InputFieldTitle(param.placeholder);
                this._el.append(inputTitle);
                let createdInput = new Input(param,"edit",this._data);
                this._el.append(createdInput);
            })
        }
        if (this._data.doctor === "Dentist") {
            VisitDentist.params.forEach(param => {
                let inputTitle = new InputFieldTitle(param.placeholder);
                this._el.append(inputTitle);
                let createdInput = new Input(param,"edit",this._data);
                this._el.append(createdInput);
            })
        }

        if (this._data.doctor === "Therapist") {
            VisitTherapist.params.forEach(param => {
                let inputTitle = new InputFieldTitle(param.placeholder);
                this._el.append(inputTitle);
                let createdInput = new Input(param,"edit",this._data);
                this._el.append(createdInput);
            })
        }

        this._el.append(new Input(this._editBtnParams));

        this._onEditVisitClickBound = this.onEditVisitClick.bind(this);
        this._el.addEventListener('submit', this._onEditVisitClickBound);
        return this._el;
    }
}

export class CreateForm extends Form{
    constructor() {
        super();
        return this.render();
    }

    render() {
        this._el = document.createElement('form');
        this._el.classList.add('create-visit-form');
        this._heading = document.createElement('h2');
        this._heading.classList.add("h2");
        this._heading.innerText = "Please fill in data about new visit";
        this._el.append(this._heading);
        this._mainSelect = new Select("doctorSelect");
        this._el.append(this._mainSelect);

        return this._el;
    }

}

export class ExtraInpCardioForm extends Form {
    constructor() {
        super();
        return this.render();
    }

    render() {
        this._el = document.querySelector(".create-visit-form");

        this.urgencySelect = new Select("urgency");
        this._el.append(this.urgencySelect);
        // ------------------------------
        Visit.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })
        // отрисовали сначала поля, которые есть у всех докторов.

        VisitCardiologist.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })
        // а потом отрисовали те поля, которые являются индивидуальными для каждого отдельного доктора.
        // ------------------------------

        this._createVisitModalBtn = new Input(this._createVisitBtnParams);
        this._el.append(this._createVisitModalBtn);

        this._onCreateVisitClickBound = this.onCreateVisitClick.bind(this);
        this._el.addEventListener('submit', this._onCreateVisitClickBound);
    }
}

export class ExtraInpDentistForm extends Form {
    constructor() {
        super();
        return this.render();
    }

    render() {
        this._el = document.querySelector(".create-visit-form");

        this.urgencySelect = new Select("urgency");
        this._el.append(this.urgencySelect);
        // ------------------------------
        Visit.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })

        VisitDentist.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })

        this._createVisitModalBtn = new Input(this._createVisitBtnParams);
        this._el.append(this._createVisitModalBtn);

        this._onCreateVisitClickBound = this.onCreateVisitClick.bind(this);
        this._el.addEventListener('submit', this._onCreateVisitClickBound);
    }
}

export class ExtraInpTherapistForm extends Form {
    constructor() {
        super();
        return this.render();
    }

    render() {
        this._el = document.querySelector(".create-visit-form");

        this.urgencySelect = new Select("urgency");
        this._el.append(this.urgencySelect);
        // ------------------------------
        Visit.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })

        VisitTherapist.params.forEach(param => {
            let inputTitle = new InputFieldTitle(param.placeholder);
            this._el.append(inputTitle);
            let createdInput = new Input(param,"create",this._data);
            this._el.append(createdInput);
        })

        this._createVisitModalBtn = new Input(this._createVisitBtnParams);
        this._el.append(this._createVisitModalBtn);

        this._onCreateVisitClickBound = this.onCreateVisitClick.bind(this);
        this._el.addEventListener('submit', this._onCreateVisitClickBound);
    }
}

export class Input {
    constructor(param, mode, data) {
        let {nameOfInput,typeOfInput,typeOfInputData,requiredValue, className, placeholder, innerText} = param;

        this._el = document.createElement(typeOfInput);
        this._el.setAttribute('name', nameOfInput);
        this._el.setAttribute('type', typeOfInputData);
        this._el.className = className;
        this._el.setAttribute("required", requiredValue);
        this._el.setAttribute('placeholder', placeholder);

        if (mode==="edit" && typeOfInput!=="button") {
            this._el.value = data[`${nameOfInput}`];
        }
        // если мы находимся в режиме редактирования, то нужно заполнить поля ввода текущими значениями по визиту.

        if (innerText) {
            this._el.innerText = innerText;
            // это для для типа инпута "button"
        }

        // При необходимости, добавляем обработчики событий на инпуты с целью их последующей валидации.
        if (nameOfInput === "age") {
            this._el.addEventListener("blur", Input.checkAgeInput);
            tippy(this._el, {
                content: "Please enter age from 5 to 100 years.",
                animation: "scale",
                arrow: true,
                placement: "top",
                trigger:"focus"
            })
        }

        if (nameOfInput === "bodyMassIndex") {
            this._el.addEventListener("blur", Input.checkBmiInput);
            tippy(this._el, {
                content: "Please enter body mass index. Range: from 10 to 50.",
                animation: "perspective",
                arrow: true,
                placement: "top",
                trigger: "focus"
            })
        }

        if (nameOfInput === "dateOfPreviousVisit") {
            this._el.addEventListener("blur", Input.checkDateOfPrevVisit);
            tippy(this._el, {
                content: "Please enter date in format dd/mm/yyyy. Date of previous visit should be in the past.",
                animation: "perspective",
                arrow: true,
                placement: "top",
                trigger:"focus"
            })
        }

        if (nameOfInput === "email") {
            this._inputLabel = document.createElement("label");
            this._inputLabel.classList.add("input-label");
            this._inputLabel.innerText = "E-mail";
            this._inputLabel.append(this._el);
            return this._inputLabel;
        }

        if (typeOfInput === "password") {

            this._inputLabel = document.createElement("label");
            this._inputLabel.classList.add("input-label");
            this._inputLabel.innerText = "Password";
            this._inputLabel.append(this._el);
            return this._inputLabel;
        }

        return this._el;
    }

    static checkAgeInput(evt) {
        let ageInput = document.querySelector(".popup__content .age-input");
         if (ageInput) {
            if ((ageInput.value<5 || ageInput.value>100) && ageInput.value!=="") {
                evt.preventDefault();
                alert(`You have entered age ${ageInput.value}. Please enter the age of patient in the range from 5 to 100 years.`);
                ageInput.value = "";
                ageInput.focus();
                return false;
            }
            return true;
        }
        return true;
        // если такого поля ввода (input) нет в конкретно данном модальном окне, то возвращаем true, чтобы не блокировались дальнейшие действия по отправке запроса на сервер и созданию/редактированию визита.
    }

    static checkBmiInput(evt) {
    // BMI - Body Mass Index
        let bmiInput = document.querySelector(".popup__content .bmi-input");
        if (bmiInput) {
            if ((bmiInput.value<10 || bmiInput.value>50) && bmiInput.value!=="") {
                evt.preventDefault();
                alert(`You have entered incorrect body mass index (BMI). Please enter the correct one in the range from 10 to 50.`);
                bmiInput.value = "";
                bmiInput.focus();
                return false;
            }
            return true;
        }
        return true;
    }

    static checkDateOfPrevVisit(evt) {
        const regexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; // dd/mm/yyyy

        let dateOfPrevVisitInput = document.querySelector(".popup__content .date-of-previous-visit");
        if (dateOfPrevVisitInput) {
            if (!dateOfPrevVisitInput.value.match(regexp) && dateOfPrevVisitInput.value!==""){
                alert(`You have entered date in a wrong format. Please enter date in format dd/mm/yyyy`);
                evt.preventDefault();
                dateOfPrevVisitInput.value = "";
                dateOfPrevVisitInput.focus();
                return false;
            }

            if (dateOfPrevVisitInput.value.match(regexp)) {
                let currentDate = new Date();
                // console.log(`Current Date: ${currentDate}`);
                let enteredDateArr = dateOfPrevVisitInput.value.split("/");
                let enteredDate = new Date(enteredDateArr[2],enteredDateArr[1] -1,enteredDateArr[0]);
                // console.log(`Entered Date: ${enteredDate}`);

                if(currentDate.getTime() < enteredDate.getTime()) {
                    evt.preventDefault();
                    alert(`You have entered a date, that is in the future: ${dateOfPrevVisitInput.value}. Please enter correct date!`);
                    dateOfPrevVisitInput.value = "";
                    dateOfPrevVisitInput.focus();
                    return false;
                }
                return true;
            }
        }
        return true;
    }
}

export class Select {
    constructor(typeOfSelect) {
        if (typeOfSelect === "doctorSelect") {
            this._el = document.createElement("select");
            this._el.classList.add("doctor-select");
            this._el.setAttribute("required", "required");
            this._el.insertAdjacentHTML("afterbegin",
                `<option selected disabled value=""> -- Select doctor -- </option>
                 <option>Cardiologist</option>
                 <option>Dentist</option>
                 <option>Therapist</option>
            `)
            this._onDoctorSelectBound = this._onDoctorSelect.bind(this);
            this._el.addEventListener("change", this._onDoctorSelectBound);

            return this._el;
        }

        if (typeOfSelect === "urgency") {
            this._select = document.createElement("select");
            this._select.classList.add("urgency-select");
            this._select.setAttribute("required", "required");
            this._select.insertAdjacentHTML("afterbegin",
                `<option selected disabled value=""> -- Select urgency -- </option>
                 <option>Regular</option>
                 <option>Priority</option>
                 <option>Urgent</option>
            `)
            return this._select;
        }
    }

    _onDoctorSelect() {
        let selectedIndex = document.querySelector(".doctor-select").selectedIndex;
        let options = document.querySelector(".doctor-select").options;
        let selectedOption = options[selectedIndex].value;
        // console.log(selectedOption);

        let createVisitForm = document.querySelector('.create-visit-form');
        while (createVisitForm.children.length > 2) {
            createVisitForm.removeChild(createVisitForm.lastChild);
        }
        // Каждый раз при выборе в форме другого врача мы очищаем всю форму, кроме select drop-down input для выбора врача.

        if (selectedOption === "Cardiologist") {
            new ExtraInpCardioForm();
        }
        if (selectedOption === "Dentist") {
            new ExtraInpDentistForm();
        }
        if (selectedOption === "Therapist") {
            new ExtraInpTherapistForm();
        }
    }
}


class InputFieldTitle {
    constructor(fieldName) {
        let inputTitle = document.createElement("span");
        inputTitle.classList.add("field-name");
        inputTitle.innerText = fieldName;
        return inputTitle;
    }
}
