using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using management_system.Models;

namespace management_system.Controllers
{
    
    [Route("api/bookings")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        // GET method - retrieve bookings from .csv
        [HttpGet]
        public ActionResult<IEnumerable<Booking>> GetBookings()
        {
            return Ok(BookingData.GetBookings().ToArray());
        }

        // POST method - write bookings to .csv
        [HttpPost]
        public ActionResult PostBookings([FromBody] Booking booking)
        {
            BookingData.AddBookingToCsv(booking);
            return Ok();
        }

        // DELETE method - remove bookings from .csv
        [HttpDelete("{id}")]
        public ActionResult DeleteBooking(int id)
        {
            BookingData.DeleteBooking(id);
            return Ok();
        }

        // PUT method - update existing bookings in .csv
        [HttpPut("{id}")]
        public ActionResult EditBooking([FromBody] Booking booking)
        {
            int id = booking.Id;
            BookingData.UpdateBooking(id, booking);
            return Ok();
        }
    }
}