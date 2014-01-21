using KnockOut.Controllers;
using KnockOut.Models;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using TechTalk.SpecFlow;


namespace Lab.Test.Test
{
    [Binding]
    public class PersonSteps
    {
        [BeforeScenario()]
        public static void BeforeEach()
        {
            var newPerson = new Mock<Person>();
            ScenarioContext.Current.Set(newPerson);
        }

        #region Givens
        [Given(@"I have entered a valid user Name")]
        public void GivenIHaveEnteredAValidUserName()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.Name).Returns("Gerardo");
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have entered a valid email address")]
        public void GivenIHaveEnteredAValidEmailAddress()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.Email).Returns("gerardo@email.com");
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have entered a valid phone number")]
        public void GivenIHaveEnteredAValidPhoneNumber()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.PhoneNumber).Returns("88888888");
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have selected a valid province")]
        public void GivenIHaveSelectedAValidProvince()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.Province).Returns(new Province { Id = 2, Name = "Heredia" });
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have entered an invalid email address")]
        public void GivenIHaveEnteredAnInvalidEmailAddress()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.Email).Returns("wrongemailformat");
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have entered an invalid user Name")]
        public void GivenIHaveEnteredAnInvalidUserName()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.Name).Returns(String.Empty);
            ScenarioContext.Current.Set(person);
        }

        [Given(@"I have entered an invalid phone number")]
        public void GivenIHaveEnteredAnInvalidPhoneNumber()
        {
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            person.SetupGet(e => e.PhoneNumber).Returns(String.Empty);
            ScenarioContext.Current.Set(person);
        }
        #endregion

        #region Whens
        [When(@"I press Create User")]
        public void WhenIPressCreateUser()
        {
            var controller = new PersonController();
            var person = ScenarioContext.Current.Get<Mock<Person>>();
            var result = controller.Post(person.Object);
            ScenarioContext.Current.Set(result, "result");
        }

        [When(@"I ask for person data")]
        public void WhenIAskForPersonData()
        {
            var controller = new PersonController();
            var people = new List<Person>();
            people = controller.Get().ToList<Person>();
            ScenarioContext.Current.Set(people, "personList");
        }
        #endregion

        #region Thens
        [Then(@"the user information should be stored")]
        public void ThenTheUserInformationShouldBeStored()
        {
            var acceptResult = ScenarioContext.Current.Get<Person>("result");
            Assert.IsNotNull(acceptResult);
        }

        [Then(@"the user cannot be stored")]
        public void ThenTheUserCannotBeStored()
        {
            var invalidResult = ScenarioContext.Current.Values.Last();
            Assert.IsNull(invalidResult);
        }

        [Then(@"the data should be retrieved")]
        public void ThenTheDataShouldBeRetrieved()
        {
            Object personList;
            ScenarioContext.Current.TryGetValue("personList", out personList);
            Assert.Greater(((List<Person>)personList).Count, 0);
        }
        #endregion
    }
}