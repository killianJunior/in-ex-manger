using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BusinessManagerWeb.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyIncomes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AmountMade = table.Column<int>(nullable: false),
                    Profit = table.Column<int>(nullable: false),
                    PercentageProfit = table.Column<int>(nullable: false),
                    CompulsorySavings = table.Column<int>(nullable: false),
                    DaillyAllowance = table.Column<int>(nullable: false),
                    Expenses = table.Column<int>(nullable: false),
                    Balance = table.Column<int>(nullable: false),
                    EntryDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyIncomes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    Details = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyIncomes");

            migrationBuilder.DropTable(
                name: "Expenses");
        }
    }
}
