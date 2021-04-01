using System;
using System.Collections.Generic;
using management_system.Models;
using System.IO;

namespace management_system
{
    public class TableData
    {
        private static List<Table> tables = new List<Table>(); // list of all tables from tables.csv

        public static void InitializeTables() // Reads in CSV data on site startup to display tables in tables.html
        {
            string[] tablesFile = File.ReadAllText("tables.csv").Split('\n');

            foreach(string line in tablesFile)
            {
                if (line != "") {
                    string[] entries = line.Split(',');
                    Table table = new Table();

                    table.TableNo = Convert.ToInt32(entries[0]);
                    table.Seats = Convert.ToInt32(entries[1].Replace("\r", "")); // Removes trailing return character

                    tables.Add(table);
                }
                
            }
        }

        public static List<Table> GetTables() // Returns list of all tables from tables.csv
        {
            return tables;
        }

        public static int GetNextTableNo() // Calculates next unique table number available to be used
        {
            int largest = 0;
            for (int i = 0; i < tables.Count; i++)
            {
                int tableNo = tables[i].TableNo;

                if (tableNo > largest) 
                {
                    largest = tableNo;
                }
            }

            return largest + 1;
        }

        // public static void AddTable(Table table) // Adds a table to the list to be written to the .csv
        // {
        //     tables.Add(table);
        // }

        public static void AddTableToCsv(Table newTable) // Gets table data of new table and calls file writing function
        {
            newTable.TableNo = GetNextTableNo();
            tables.Add(newTable);
            WriteTables();           
        }

        public static void UpdateTable(int tableNum, Table tableToEdit) // Updates an existing table's seats and updates the file
        {
            Table table = null; 
            int index = 0;       
            foreach (Table entry in tables)
            {
                if (entry.TableNo == tableNum)
                {
                    index = tables.IndexOf(entry);
                    table = tableToEdit;                   
                }
            }

            if (table != null)
            {
                tables.RemoveAt(index);
                tables.Insert(index, table);
                
                WriteTables();
            }
        }

        public static void WriteTables() { // Writes all current tables to tables.csv
            StreamWriter writeToFile = new StreamWriter("tables.csv");

            for (int i = 0; i < tables.Count; i++)
            {                
                writeToFile.WriteLine($"{tables[i].TableNo},{tables[i].Seats}");                              
            }

            writeToFile.Close();
            writeToFile.Dispose();
            
        }

        public static void DeleteTable(int tableNumToDelete) // Removes a table from the list and updates the file
        {
            Table tableToDelete = null;

            foreach (Table entry in tables)
            {
                if (entry.TableNo == tableNumToDelete)
                {
                    tableToDelete = entry;
                }
            }

            tables.Remove(tableToDelete);
            WriteTables();
        }

    }
}