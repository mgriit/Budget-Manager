using System.Configuration;


namespace Budget_Manager.Helpers
{
    public static class DbConnection
    {
        public static string GetConnectionString(string name = "DbString")
        {
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }
    }
}