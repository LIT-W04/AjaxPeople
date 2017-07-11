using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxPeople.Web.Controllers
{
    public class DemoController : Controller
    {
        private static int Count = 0;

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void UpdateCount()
        {
            Count++;
        }

        public ActionResult GetCount()
        {
            return Json(new { count = Count }, JsonRequestBehavior.AllowGet);
        }
    }
}