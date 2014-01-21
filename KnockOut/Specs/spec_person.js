/// <reference path="../Scripts/_references.js" />

function loadHTML() {
    jasmine.getFixtures().fixturesPath = 'http://localhost:1768/spec/javascripts/fixtures/';
    jasmine.getFixtures().containerId = 'jasmine-fixtures';
}

function clearMyFixtures() {
    jasmine.getFixtures().set(null);
    var element = $('jasmine-fixtures');
    ko.cleanNode(element);
}

describe("Person", function () {
    var vm;
    var userInformation = {
        Name: 'Juan',
        Email: 'juan@gmail.com',
        PhoneNumber: '23123123',
        Province: null
    };
    loadHTML();
    beforeEach(function () {
        vm = new PersonViewModel();
    });

    afterEach(function () {
        vm = null;
    });

    it("should be added", function () {
        spyOn($, "ajax");
        vm.save(userInformation);
        expect($.ajax)
        .toHaveBeenCalledWith(
        {
            url: 'http://localhost:1768/api/person',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(userInformation),
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it("GET should have been called", function () {
        spyOn($, "ajax");
        vm.getP();
        expect($.ajax).toHaveBeenCalled();
    })

    xit("should not have retrieved data", function () {
        expect(vm.people().length).toEqual(0);
    });

    it("should have retrieved some data", function () {
        runs(function () {
            vm.getP();
        });

        waitsFor(function () {
            return vm.doneGettingPeople == true;
        });

        runs(function () {
            expect(vm.people().length).toBeGreaterThan(0);
        });
    });

    it("should have retrieved Jose as first element", function () {
        runs(function () {
            vm.getP();
        });

        waitsFor(function () {
            return vm.doneGettingPeople == true;
        });

        runs(function () {
            expect(vm.people()[0].Name).toEqual("Jose");
        });
    });

    it("should have a form called personForm", function () {
        runs(function () {
            loadFixtures('PersonFixture.html');
            ko.applyBindings(vm, document.getElementById('jasmine-fixtures'));
        });

        waitsFor(function () {
            return vm.doneGettingPeople == true;
        }, 'Waiting for data to be retrieved', 10000);

        runs(function () {
            var form = $('#personForm');
            expect(form).toBeInDOM();
        });
        clearMyFixtures();
    });

    it("should have a div called noUsers and it must be hidden", function () {
        runs(function () {
            loadFixtures('PersonFixture.html');
            ko.applyBindings(vm, document.getElementById('jasmine-fixtures'));
        });

        waitsFor(function () {
            return vm.doneGettingPeople == true;
        }, 'Waiting for data to be retrieved', 10000);

        runs(function () {
            var div = $('#noUsers');
            expect(div).toBeHidden();
        });
        clearMyFixtures();
    });

    it("should have a div called usersDiv and it must be visible", function () {
        runs(function () {
            loadFixtures('PersonFixture.html');
            ko.applyBindings(vm, document.getElementById('jasmine-fixtures'));
        });

        waitsFor(function () {
            return vm.doneGettingPeople == true;
        }, 'Waiting for data to be retrieved', 10000);

        runs(function () {
            var div = $('#usersDiv');
            expect(div).toBeVisible();
        });
        clearMyFixtures();
    });

    it("should simulate data entry via DOM Manipulation", function () {
        
        var nameTxt;
        var emailTxt;
        var phoneTxt;
        var createBtn;
        var initialRowsCount = 0;
        var finalRowsCount = 0;
        runs(function () {
            loadFixtures('PersonFixture.html');
            ko.applyBindings(vm, document.getElementById('mainContainer'));
            nameTxt = $('#nameTxt');
            emailTxt = $('#emailTxt');
            phoneTxt = $('#phoneTxt');
            createBtn = $('#createBtn');
            nameTxt.val('Andrea').change();
            emailTxt.val('andrea@email.com').change();
            phoneTxt.val('88456456').change();
        });

        waitsFor(function () {
            return vm.doneGettingProvinces == true;
        }, 'Waiting for provinces to be loaded', 10000);

        runs(function () {
            $('#provinceDdl option')[3].selected = true;
            $('#provinceDdl').change();
            
            initialRowsCount = $('tbody#usersRows').children().length;
            $('#createBtn').trigger('click');
            //ko.utils.triggerEvent(document.getElementById('createBtn'), 'click');
        });

        waitsFor(function () {
            return vm.doneStoringPeople == true;
        }, 'Waiting for data to be saved', 10000);

        runs(function () {
            var newTestUser = {
                Name: 'Andrea',
                Email: 'andrea@email.com',
                PhoneNumber: '88456456',
                Province: {Id:'2', Name:'Heredia'}
            };
            //expect($.ajax).toHaveBeenCalledWith(
            //{
            //    url: 'http://localhost:1768/api/person',
            //    cache: false,
            //    type: 'POST',
            //    contentType: 'application/json; charset=utf-8',
            //    data: ko.toJSON(newTestUser),
            //    success: jasmine.any(Function),
            //    error: jasmine.any(Function)
            //});
            finalRowsCount = $('tbody#usersRows').children().length;
            expect(finalRowsCount).toBeGreaterThan(initialRowsCount);
        });
        clearMyFixtures();
    });
});

