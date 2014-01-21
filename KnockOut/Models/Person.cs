using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KnockOut.Models
{
    public class Person
    {
        [Required]
        public virtual string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public virtual string Email { get; set; }
        
        [Required]
        [MaxLength(9)]
        [Phone]
        public virtual string PhoneNumber { get; set; }
        
        public virtual Province Province { get; set; }
    }
}