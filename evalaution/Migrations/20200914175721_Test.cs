using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace evalaution.Migrations
{
    public partial class Test : Migration
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
                    Balance = table.Column<int>(nullable: false)
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
                    Date = table.Column<DateTime>(nullable: false),
                    DailyIncomeId = table.Column<Guid>(nullable: false),
                    DailyIncomeId1 = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_DailyIncomes_DailyIncomeId",
                        column: x => x.DailyIncomeId,
                        principalTable: "DailyIncomes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Expenses_DailyIncomes_DailyIncomeId1",
                        column: x => x.DailyIncomeId1,
                        principalTable: "DailyIncomes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_DailyIncomeId",
                table: "Expenses",
                column: "DailyIncomeId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_DailyIncomeId1",
                table: "Expenses",
                column: "DailyIncomeId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "DailyIncomes");
        }
    }
}
