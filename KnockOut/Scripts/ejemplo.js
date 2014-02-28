var app = app || {};

app.personVm = (function () {
    var doneGettingPeople = false;
    var doneStoringPeople = false;
    var doneGettingProvinces = false;

    var people = ko.observableArray([]);
    var provinces = ko.observableArray([]);

    var name = ko.observable("");
    var email = ko.observable("");
    var phoneNumber = ko.observable("");
    var province = ko.observable("");

    var person =  {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        province: province
    };

    GetPeople();
    GetProvinces();

    //Add New Item
    var create = function () {
        save(person);
        //if (Name() != "" && Email() != "" && PhoneNumber() != "" && Province() != null) {
        //    save(person);
        //}
        //else {
        //    alert("Please fill out all the information");
        //}
    };

    var save = function (newData) {
        $.ajax({
            url: 'http://localhost:1768/api/person',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(newData),
            success: function (data) {
                if (data != null) {
                    doneStoringPeople = true;
                    people.push(data);
                    person.name("");
                    person.email("");
                    person.phoneNumber("");
                    person.province(null);
                }
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    };

    var reset = function () {
        person.name("");
        person.email("");
        person.phoneNumber("");
        person.province(null);
    };

    getP = function() {
        GetPeople();
    };

    function GetPeople() {
        $.ajax({
            url: 'http://localhost:1768/api/person',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                people(data);
                doneGettingPeople = true;
            }
        });
    };

    function GetProvinces() {
        $.ajax({
            url: 'http://localhost:1768/api/province',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                provinces(data);
                doneGettingProvinces = true;
            }
        });
    }

    var personVm = {
        person: person,
        people: people,
        provinces: provinces,
        save: save,
        reset: reset,
        create: create
    };
    return personVm;
})();
$(function() {
    ko.applyBindings(app.personVm); //, document.getElementById('mainContainer'));
});