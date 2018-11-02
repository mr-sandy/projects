using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Linn.Projects.Persistence.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ActivityDate = table.Column<DateTime>(nullable: false),
                    EmployeeUrl = table.Column<string>(nullable: true),
                    ActivityType = table.Column<string>(nullable: false),
                    ProjectId = table.Column<int>(nullable: true),
                    Status = table.Column<int>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    PhaseNumber = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    Phases = table.Column<int>(nullable: true),
                    RemovePhaseActivity_PhaseNumber = table.Column<int>(nullable: true),
                    UpdateActivity_Name = table.Column<string>(nullable: true),
                    UpdateActivity_StartDate = table.Column<DateTime>(nullable: true),
                    PreviousName = table.Column<string>(nullable: true),
                    PreviousStartDate = table.Column<DateTime>(nullable: true),
                    UpdatePhaseActivity_PhaseNumber = table.Column<int>(nullable: true),
                    UpdatePhaseActivity_Status = table.Column<int>(nullable: true),
                    UpdatePhaseActivity_EndDate = table.Column<DateTime>(nullable: true),
                    PreviousStatus = table.Column<int>(nullable: true),
                    PreviousEndDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activity_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Phase",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ProjectId = table.Column<int>(nullable: true),
                    PhaseNumber = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Phase_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ProjectId",
                table: "Activity",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Phase_ProjectId",
                table: "Phase",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "Phase");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
