using Microsoft.AspNetCore.Mvc;

namespace DevCalendar.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
