import {LoginForm, EditForm, CreateForm} from "./3_form.js";

export default class Modal{
    constructor(typeOfModal,visit,id,data) {
        // console.log(`typeOfModal: ${typeOfModal}`);

        this._popUpContainer = document.createElement('div');
        this._popUpContainer.classList.add('popup');
        // ------------------------------------

        this._popUpBody = document.createElement('div');
        this._popUpBody.classList.add('popup__body');
        this._popUpContainer.append(this._popUpBody);

        // ---------------------------------------
        this._popUpContent = document.createElement('div')
        this._popUpContent.classList.add('popup__content');
        this._popUpBody.append(this._popUpContent);
        // ---------------------------------------
        this._closePopUpBtn = document.createElement('img');
        this._closePopUpBtn.src="./img/modal/times-solid.svg";
        this._closePopUpBtn.classList.add('popup__close');
        this._popUpContent.append(this._closePopUpBtn);

        // ------------------------------------
        // на крестик в правом верхнем углу в модальном окне "вешаем" обработчик событий, который будет отслеживать click по этому крестику.
        this._removeModalBound = this.removeModal.bind(this);
        this._closePopUpBtn.addEventListener("click", this._removeModalBound);
        // ------------------------------------
        // Отслеживаем клики вне зоны контента модального окна. При появлении такого клика - модальное окно закрывается.
        this._onBackgroundClickBound = this.onBackgroundClick.bind(this);
        this._popUpContainer.addEventListener('mousedown',this._onBackgroundClickBound);
        // ------------------------------------

        // Код выше является универсальным для всех модальных окон.
        // ------------------------------------------------

        if (typeOfModal==="login") {
            this._loginForm = new LoginForm();
            this._popUpContent.append(this._loginForm);
        }

        if (typeOfModal==="createVisit") {
            this._createVisitForm = new CreateForm();
            this._popUpContent.append(this._createVisitForm);
        }

        if (typeOfModal==="editVisit") {
            this._editVisitForm = new EditForm(visit,id,data);
            this._popUpContent.append(this._editVisitForm);
        }
        // ---------------------------------------
        document.body.prepend(this._popUpContainer);
        this._popUpContainer.classList.add('activated');
    }

    onBackgroundClick(evt) {
        let clickedItem = evt.target;
        if (clickedItem===this._popUpBody) {
            this.removeModal();
            this._popUpContainer.removeEventListener('click',this._onBackgroundClickBound);
        }
    }

    removeModal() {
        this._popUpContainer.remove();
        this._closePopUpBtn.removeEventListener("click", this._removeModalBound);
    }
}