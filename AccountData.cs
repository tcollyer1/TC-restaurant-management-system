using System;
using System.Collections.Generic;
using management_system.Models;
using System.IO;

namespace management_system
{
    public class AccountData
    {
        private static List<Account> userAccounts = new List<Account>(); // list of all accounts from accounts.csv

        public static void InitializeUsers() // Reads in CSV data on site startup
        {
            string[] usersFile = File.ReadAllText("accounts.csv").Split('\n');

            foreach(string line in usersFile)
            {
                if (line != "") {
                    string[] entries = line.Split(',');
                    Account user = new Account();

                    user.Username = entries[0];
                    user.Password = entries[1]; 
                    user.AccountType = entries[2].Replace("\r", ""); // Removes trailing return character

                    userAccounts.Add(user);
                }
                
            }
        }

        public static List<Account> GetUsers() // Returns list of all user accounts from accounts.csv
        {
            return userAccounts;
        }

        public static void AddAccountToCsv(Account newUser) // Gets account data of new user and calls file writing function
        {
            userAccounts.Add(newUser);
            WriteAccounts();           
        }

        public static void WriteAccounts() { // Writes all current user accounts to accounts.csv
            StreamWriter writeToFile = new StreamWriter("accounts.csv");

            for (int i = 0; i < userAccounts.Count; i++)
            {                
                writeToFile.WriteLine($"{userAccounts[i].Username},{userAccounts[i].Password},{userAccounts[i].AccountType}");                              
            }

            writeToFile.Close();
            writeToFile.Dispose();
            
        }
    }
}