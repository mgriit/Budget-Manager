﻿using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static Budget_Manager.Helpers.DbConnection;

namespace Budget_Manager.DLL.Implementations
{
    public class TransactionRepo : ITransactionRepo
    {
        public bool DeleteTransaction(long transactionId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@TransactionId", transactionId);
                string sql = "dbo.spTransaction_Delete";
                rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public IList<TransactionFull> GetAllTransaction(int page, int itemsPerPage, string search, string sortBy, bool reverse, Int64 codeID, Int64 fiscalYearId, int transactionTypeId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@CodeID", codeID);
                p.Add("@FiscalYearId", fiscalYearId);
                p.Add("@TransactionTypeId", transactionTypeId);
                p.Add("@page", page);
                p.Add("@search", search);
                p.Add("@sortBy", sortBy);
                p.Add("@itemsPerPage", itemsPerPage);
                p.Add("@sortOrder", reverse ? "DESC" : "ASC");
                string sql = "dbo.spTransaction_GetAll";
                var trans = cnn.Query<TransactionFull>(sql,p, commandType: CommandType.StoredProcedure).ToList();
                return trans;
            }
        }

        public TransactionFull GetTransaction(long transactionId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@TransactionId", transactionId);
                string sql = "dbo.spTransaction_Get";
                var tran = cnn.Query<TransactionFull>(sql, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return tran;
            }
        }

        public bool SaveTransaction(Transaction transaction)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@CodeID", transaction.CodeId);
                p.Add("@FiscalYearId", transaction.FiscalYearId);
                p.Add("@TransactionTypeId", transaction.TransactionTypeId);              
                p.Add("@TransactionAmount", transaction.TransactionTypeId>1 && transaction.TransactionTypeId <5 ? -(transaction.TransactionAmount) : transaction.TransactionAmount);
                p.Add("@TransactionNote", transaction.TransactionNote);
 


                if (transaction.TransactionId == 0)
                {
                    p.Add("@TransactionDate", DateTime.Now);
                    p.Add("@DateCreated", DateTime.Now);
                    p.Add("@Creator", 1233345557);
                    string sql = "dbo.spTransaction_AddNew";
                    rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                }
                else
                {
                    p.Add("@TransactionId", transaction.TransactionId);
                    p.Add("@DateModified", DateTime.Now);
                    p.Add("@Modifier", 1233345557);
                    string sql = "dbo.spTransaction_Update";
                    rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                }

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
    }
}