using KnockOut.App_Start;
using KnockOut.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KnockOut.Controllers
{
    public class PersonController : ApiController
    {
        // GET api/Person
        public IEnumerable<Person> Get()
        {
            Initialize();
            Person newMockPerson = new Person { Name = "Jose", Email = "jose@email.com", PhoneNumber = "88888888", Province = new Province { Id = 1, Name = "San Jose" } };
            if (!Mocking.People.Any(person=> person.Name.CompareTo(newMockPerson.Name) == 0))
            {
                Mocking.People.Add(newMockPerson);
            }
            return Mocking.People;
        }

        // POST api/Person
        public Person Post([FromBody]Person value)
        {
            Initialize();
            if (ModelState.IsValid && ValidatePerson(value))
            {
                Mocking.People.Add(value);
                return value;
            }
            return null;
        }

        private void Initialize()
        {
            if (Mocking.People == null)
            {
                Mocking.Initialize();
            }
        }

        private bool ValidatePerson(Person value)
        {
            var context = new ValidationContext(value, serviceProvider: null, items: null);
            var results = new List<ValidationResult>();
            return Validator.TryValidateObject(value, context, results, true);
        }

        // DELETE api/Person/5
        public void Delete(int id)
        {

        }
    }
}