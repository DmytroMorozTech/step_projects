export default class Request {
    constructor(typeOfRequest,data,id) {
        if (typeOfRequest === 'login') {
            return this._login(data);
        }

        if (typeOfRequest === 'post') {
            return this._post(data);
        }

        if (typeOfRequest === 'put') {
            return this._put(data,id);
        }

        if (typeOfRequest === 'delete') {
            return this._delete(data,id);
        }

        if (typeOfRequest === 'getAllVisits') {
            return this._getAllVisits();
        }
    }

    _login(data) {
        return fetch('http://cards.danit.com.ua/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            // тип данных, передаваемых в body, должен соответствовать типу данных, указанных в headers.
        })
    }

    _post(data) {
        // добавляем инфо о новом визите на сервер.
        return fetch('http://cards.danit.com.ua/cards', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
    }

    _put(data,id) {
        // редактируем на сервере информацию о существующем визите.
        return fetch('http://cards.danit.com.ua/cards/'+ id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
    }

    _delete(data,id) {
        // удаляем на сервере информацию о существующем визите.
        return fetch('http://cards.danit.com.ua/cards/'+ id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    _getAllVisits(){
        // получаем инфо с сервера обо всех визитах.
        return fetch('http://cards.danit.com.ua/cards', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.json();
        })
    }
}
