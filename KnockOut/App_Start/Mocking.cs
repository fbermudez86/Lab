using KnockOut.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KnockOut.App_Start
{
    public static class Mocking
    {
        public static List<Province> Provinces;
        public static List<Person> People;
        internal static void Initialize()
        {
            People = new List<Person>();
            Provinces = new List<Province>();
            string[] ProvincesNames = {"San Jose","Alajuela","Heredia","Cartago","Puntarenas","Limon","Guanacaste"};
            for (int i = 0; i < ProvincesNames.Length; i++)
            {
                Province tmp = new Province { Id = i, Name = ProvincesNames[i] };
                Provinces.Add(tmp);
            }
        }
    }
}