function PersonViewModel() {

    self = this;
    self.doneGettingPeople = false;
    self.doneStoringPeople = false;
    self.doneGettingProvinces = false;

    self.model = {};
    self.model.Name = ko.observable("").extend({ required: true });
    self.model.Email = ko.observable("").extend({
        required: true,
        pattern: {
            message: 'Please enter a valid email',
            params: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
        }
    });

    self.model.PhoneNumber = ko.observable("").extend({
        required: true
    });

    self.model.Province = ko.observable("").extend({ required: true });

    var PersonData = {
        Name: self.model.Name,
        Email: self.model.Email,
        PhoneNumber: self.model.PhoneNumber,
        Province: self.model.Province
    };
    self.PersonData = ko.observable();
    self.people = ko.observableArray([]);
    self.provinces = ko.observableArray([]);
    GetPeople();
    GetProvinces();

    //Add New Item
    self.create = function () {
        self.save(self.model);
        //if (self.model.Name() != "" && self.model.Email() != "" && self.model.PhoneNumber() != "" && self.model.Province() != null) {
        //    self.save(self.model);
        //}
        //else {
        //    alert("Please fill out all the information");
        //}
    };

    self.save = function (newData) {
        $.ajax({
            url: 'http://localhost:1768/api/person',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(newData),
            success: function (data) {
                if (data != null) {
                    self.doneStoringPeople = true;
                    self.people.push(data);
                    self.model.Name("");
                    self.model.Email("");
                    self.model.PhoneNumber("");
                    self.model.Province(null);
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    };

    self.reset = function () {
        self.model.Name("");
        self.model.Email("");
        self.model.PhoneNumber("");
        self.model.Province(null);
    };

    self.getP = function () {
        GetPeople();
    }

    function GetPeople() {
        $.ajax({
            url: 'http://localhost:1768/api/person',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.people(data);
                self.doneGettingPeople = true;
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
                self.provinces(data);
                self.doneGettingProvinces = true;
            }
        });
    }
};