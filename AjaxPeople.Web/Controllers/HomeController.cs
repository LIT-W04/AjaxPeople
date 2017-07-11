using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AjaxPeople.Data;
using System.Threading;

namespace AjaxPeople.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPeople()
        {
            PersonDb db = new PersonDb(Properties.Settings.Default.ConStr);
            return Json(db.GetPeople(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Add(Person person)
        {
            PersonDb db = new PersonDb(Properties.Settings.Default.ConStr);
            db.AddPerson(person);
            return Json(person);
        }

        [HttpPost]
        public ActionResult Update(Person person)
        {
            PersonDb db = new PersonDb(Properties.Settings.Default.ConStr);
            db.Update(person);
            return Json(person);
        }

        [HttpPost]
        public void Delete(int personId)
        {
            PersonDb db = new PersonDb(Properties.Settings.Default.ConStr);
            db.Delete(personId);
        }
    }
}