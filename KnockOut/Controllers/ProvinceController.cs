using KnockOut.App_Start;
using KnockOut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KnockOut.Controllers
{
    public class ProvinceController : ApiController
    {
        // GET api/province
        public IEnumerable<Province> Get()
        {
            return Mocking.Provinces;
        }

        // GET api/province/5
        public string Get(int id)
        {
            return "value";
        }
    }
}
