using System;
using System.Collections.Generic;
using management_system.Models;
using System.IO;

namespace management_system
{
    public class BookingData
    {
        private static List<Booking> bookings = new List<Booking>(); // list of all bookings from bookings.csv

        public static void InitializeBookings() // Reads in CSV data on site startup to display bookings
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
                    booking.Time = entries[5];//.Replace("\r", ""); // Removes trailing return character
                    booking.Table = entries[6].Replace("\r", "");

                    bookings.Add(booking);
                }
                
            }
        }

        public static List<Booking> GetBookings() // Returns list of all bookings in bookings.csv
        {
            return bookings;
        }

        public static int GetNextBookingId() // Calculates next unique consecutive booking ID to be used
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

        public static void AddBooking(Booking booking) // Adds a booking to the list to be written to the .csv
        {
            bookings.Add(booking);
        }

        public static void AddBookingToCsv(Booking newBooking) // Gets booking data of new booking and calls file writing function
        {
            newBooking.Id = GetNextBookingId();
            bookings.Add(newBooking);
            WriteBookings();           
        }

        public static void UpdateBooking(int bookingID, Booking bookingToEdit) // Updates an existing booking's details and updates the file
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

        public static void WriteBookings() { // Writes all current bookings to bookings.csv
            StreamWriter writeToFile = new StreamWriter("bookings.csv");

            for (int i = 0; i < bookings.Count; i++)
            {                
                writeToFile.WriteLine($"{bookings[i].Id},{bookings[i].Name},{bookings[i].Seats},{bookings[i].Phone},{bookings[i].Date},{bookings[i].Time},{bookings[i].Table}");                              
            }

            writeToFile.Close();
            writeToFile.Dispose();
            
        }

        public static void DeleteBooking(int idToDelete) // Removes a booking from the list and updates the file
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
