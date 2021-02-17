using System;
using System.Collections.Generic;
using management_system.Models;
using System.IO;

namespace management_system
{
    public class BookingData
    {
        private static List<Booking> bookings = new List<Booking>(); // list of all bookings from bookings.csv

        public static void Initialize()
        {
            string[] bookingsFile = File.ReadAllText("bookings.csv").Split('\n');

            foreach(string line in bookingsFile)
            {
                if (line != "") {
                    string[] entries = line.Split(',');
                Booking booking = new Booking();

                booking.Id = Convert.ToInt32(entries[0]);
                booking.Name = entries[1];
                booking.Seats = entries[2];
                booking.Phone = entries[3];
                booking.Date = entries[4];
                booking.Time = entries[5].Replace("\r", "");

                Console.WriteLine(booking);

                bookings.Add(booking);
                }
                
            }
        }

        public static List<Booking> GetBookings()
        {
            return bookings;
        }

        public static int GetNextBookingId()
        {
            int largest = 0;
            for (int i = 0; i < bookings.Count; i++)
            {
                int id = bookings[i].Id;

                if (id > largest) 
                {
                    largest = id;
                }
            }

            return largest + 1;
        }

        public static void AddBooking(Booking booking)
        {
            bookings.Add(booking);
        }

        public static void AddBookingToCsv(Booking newBooking) 
        {
            newBooking.Id = GetNextBookingId();
            bookings.Add(newBooking);
            WriteBookings();
        }

        public static void UpdateBooking(int bookingID, Booking bookingToEdit)
        {
            Booking booking = null; 
            int index = 0;       
            foreach (Booking entry in bookings)
            {
                if (entry.Id == bookingID)
                {
                    index = bookings.IndexOf(entry);
                    booking = bookingToEdit;                   
                }
            }

            if (booking != null)
            {
                bookings.RemoveAt(index);
                bookings.Insert(index, booking);
                
                WriteBookings();
            }
        }

        public static void WriteBookings() {
            StreamWriter writeToFile = new StreamWriter("bookings.csv");

            for (int i = 0; i < bookings.Count; i++)
            {                
                writeToFile.WriteLine($"{bookings[i].Id},{bookings[i].Name},{bookings[i].Seats},{bookings[i].Phone},{bookings[i].Date},{bookings[i].Time}");                              
            }

            writeToFile.Close();
            writeToFile.Dispose();
            
        }

        public static void DeleteBooking(int idToDelete)
        {
            Booking bookingToDelete = null;

            foreach (Booking entry in bookings)
            {
                if (entry.Id == idToDelete)
                {
                    bookingToDelete = entry;
                }
            }

            bookings.Remove(bookingToDelete);
            WriteBookings();
        }

    }
}
