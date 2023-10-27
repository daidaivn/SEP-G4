USE [master]
GO
/****** Object:  Database [SEP-G4-CCMS]    Script Date: 10/27/2023 10:52:24 PM ******/
CREATE DATABASE [SEP-G4-CCMS]
GO
ALTER DATABASE [SEP-G4-CCMS] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SEP-G4-CCMS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SEP-G4-CCMS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ARITHABORT OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SEP-G4-CCMS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SEP-G4-CCMS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SEP-G4-CCMS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SEP-G4-CCMS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SEP-G4-CCMS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SEP-G4-CCMS] SET  MULTI_USER 
GO
ALTER DATABASE [SEP-G4-CCMS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SEP-G4-CCMS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SEP-G4-CCMS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SEP-G4-CCMS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SEP-G4-CCMS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SEP-G4-CCMS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SEP-G4-CCMS', N'ON'
GO
ALTER DATABASE [SEP-G4-CCMS] SET QUERY_STORE = ON
GO
ALTER DATABASE [SEP-G4-CCMS] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SEP-G4-CCMS]
GO
/****** Object:  Table [dbo].[CheckInOut]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckInOut](
	[CheckInOutId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[TimeCheckIn] [time](7) NULL,
	[TimeCheckOut] [time](7) NULL,
	[Note] [nvarchar](max) NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_CheckInOut] PRIMARY KEY CLUSTERED 
(
	[CheckInOutId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contracts]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contracts](
	[ContractID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[LinkDoc] [nvarchar](max) NULL,
	[Status] [bit] NULL,
	[ContractTypeID] [int] NULL,
	[ContractCode] [nvarchar](20) NULL,
	[Image] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContractID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContractsStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContractsStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[ContractID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContractType]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContractType](
	[ContractTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ContractName] [nvarchar](100) NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ContractTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContractTypeStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContractTypeStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[ContractTypeID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[CountryID] [int] IDENTITY(1,1) NOT NULL,
	[CountryCode] [nvarchar](20) NULL,
	[CountryName] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Degrees]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Degrees](
	[DegreeID] [int] IDENTITY(1,1) NOT NULL,
	[DegreeName] [nvarchar](50) NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DegreeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DegreesStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DegreesStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[DegreeID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](20) NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DepartmentsStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DepartmentsStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Dependents]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dependents](
	[DependentID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[FullName] [nvarchar](20) NULL,
	[IdentifierCode] [nvarchar](50) NULL,
	[Gender] [bit] NULL,
	[Relationship] [nvarchar](50) NULL,
	[DOB] [date] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[IdentifierName] [nvarchar](50) NULL,
	[Status] [bit] NULL,
	[NoteReason] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[DependentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DependentsStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DependentsStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[DependentID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeDegrees]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeDegrees](
	[DegreeID] [int] NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[GraduateDate] [datetime] NULL,
	[Major] [nvarchar](100) NULL,
	[School] [nvarchar](100) NULL,
	[LinkDoc] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[DegreeID] ASC,
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[Image] [nvarchar](max) NULL,
	[FirstName] [nvarchar](20) NULL,
	[LastName] [nvarchar](20) NULL,
	[DOB] [datetime] NULL,
	[Gender] [bit] NULL,
	[Address] [nvarchar](max) NULL,
	[PhoneNumber] [varchar](20) NULL,
	[TaxID] [int] NULL,
	[Email] [varchar](max) NULL,
	[CountryID] [int] NULL,
	[Status] [bit] NULL,
	[CIC] [nvarchar](20) NULL,
	[WageID] [int] NULL,
	[SalaryCoefficient] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeesStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeesStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeTeams]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeTeams](
	[EmployeeTeamID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[TeamID] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_EmployeeTeams_1] PRIMARY KEY CLUSTERED 
(
	[EmployeeTeamID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistoryChangeCheckInOut]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoryChangeCheckInOut](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[CheckInOutId] [int] NULL,
	[Action] [nvarchar](100) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
 CONSTRAINT [PK_HistoryChangeTimeTracking] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistoryChangeShiftType]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoryChangeShiftType](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[Action] [nvarchar](100) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
	[ShiftTypeID] [int] NULL,
 CONSTRAINT [PK_HistoryChangeShiftType] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistoryChangeTeams]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoryChangeTeams](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[TeamID] [int] NULL,
	[Action] [nvarchar](100) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
 CONSTRAINT [PK_HistoryChangeTeams] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pages]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pages](
	[PageID] [int] IDENTITY(1,1) NOT NULL,
	[PageName] [nvarchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Pages] PRIMARY KEY CLUSTERED 
(
	[PageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PageStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PageStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[PageID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[Note] [nvarchar](max) NULL,
	[CurrentEmployeeID] [int] NULL,
 CONSTRAINT [PK_PageStatusHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolePages]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolePages](
	[PageID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
 CONSTRAINT [PK_RolePages] PRIMARY KEY CLUSTERED 
(
	[PageID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleLevel] [int] NULL,
	[RoleName] [nvarchar](20) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK__Roles__8AFACE3A51C02BEC] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesEmployees]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesEmployees](
	[RoleEmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[RoleID] [int] NULL,
	[DepartmentID] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleEmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShiftType]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShiftType](
	[ShiftTypeID] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](100) NULL,
	[Status] [bit] NULL,
	[StartTime] [time](7) NULL,
	[EndTime] [time](7) NULL,
 CONSTRAINT [PK_ShiftType] PRIMARY KEY CLUSTERED 
(
	[ShiftTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teams]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[TeamID] [int] IDENTITY(1,1) NOT NULL,
	[TeamName] [nvarchar](100) NULL,
	[TeamLeaderId] [int] NULL,
	[Note] [nvarchar](max) NULL,
 CONSTRAINT [PK_Teams] PRIMARY KEY CLUSTERED 
(
	[TeamID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TeamWork]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TeamWork](
	[TeamID] [int] NOT NULL,
	[WorkId] [int] NOT NULL,
 CONSTRAINT [PK_TeamWork] PRIMARY KEY CLUSTERED 
(
	[TeamID] ASC,
	[WorkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UnitCost]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnitCost](
	[UniCostId] [int] IDENTITY(1,1) NOT NULL,
	[UnitName] [nvarchar](100) NULL,
	[Cost] [float] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_UnitCost] PRIMARY KEY CLUSTERED 
(
	[UniCostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UnitCostStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnitCostStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[UniCostId] [int] NULL,
	[Action] [nvarchar](100) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [nchar](10) NULL,
 CONSTRAINT [PK_UnitCostStatusHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccounts]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccounts](
	[EmployeeID] [int] NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccountsStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccountsStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[Action] [nvarchar](max) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wages]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Wages](
	[WageID] [int] IDENTITY(1,1) NOT NULL,
	[WageNumber] [float] NULL,
	[Relation] [nvarchar](100) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Wages] PRIMARY KEY CLUSTERED 
(
	[WageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WageStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WageStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[WageID] [int] NULL,
	[Action] [nvarchar](50) NULL,
	[ActionDate] [nvarchar](50) NULL,
	[CurrentEmployeeID] [int] NULL,
 CONSTRAINT [PK_WageStatusHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Work]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Work](
	[WorkId] [int] IDENTITY(1,1) NOT NULL,
	[WorkName] [nvarchar](100) NULL,
	[ProductPackage] [int] NULL,
	[UniCostId] [int] NULL,
	[Date] [datetime] NULL,
	[WorkAreaId] [int] NULL,
 CONSTRAINT [PK_Work] PRIMARY KEY CLUSTERED 
(
	[WorkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkAreas]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkAreas](
	[WorkAreaId] [int] IDENTITY(1,1) NOT NULL,
	[WorkAreaName] [nvarchar](100) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_WorkAreas] PRIMARY KEY CLUSTERED 
(
	[WorkAreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkSchedule]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkSchedule](
	[WorkScheduleID] [int] IDENTITY(1,1) NOT NULL,
	[ShiftTypeID] [int] NULL,
	[TeamID] [int] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_WorkSchedule] PRIMARY KEY CLUSTERED 
(
	[WorkScheduleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkScheduleStatusHistory]    Script Date: 10/27/2023 10:52:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkScheduleStatusHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[WorkScheduleID] [int] NULL,
	[Action] [nvarchar](100) NULL,
	[ActionDate] [datetime] NULL,
	[CurrentEmployeeID] [int] NULL,
 CONSTRAINT [PK_WorkScheduleStatusHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CheckInOut] ON 

INSERT [dbo].[CheckInOut] ([CheckInOutId], [EmployeeID], [TimeCheckIn], [TimeCheckOut], [Note], [Date]) VALUES (1, 1, NULL, NULL, NULL, NULL)
INSERT [dbo].[CheckInOut] ([CheckInOutId], [EmployeeID], [TimeCheckIn], [TimeCheckOut], [Note], [Date]) VALUES (2, 2, NULL, NULL, NULL, NULL)
INSERT [dbo].[CheckInOut] ([CheckInOutId], [EmployeeID], [TimeCheckIn], [TimeCheckOut], [Note], [Date]) VALUES (3, 3, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[CheckInOut] OFF
GO
SET IDENTITY_INSERT [dbo].[Contracts] ON 

INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (1, 1, CAST(N'2020-01-01' AS Date), CAST(N'2023-01-01' AS Date), N'https://drive.google.com/file123', 0, NULL, NULL, NULL)
INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (2, 2, CAST(N'2021-04-15' AS Date), CAST(N'2024-04-15' AS Date), N'https://drive.google.com/file456', NULL, NULL, NULL, NULL)
INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (3, 3, CAST(N'2022-07-01' AS Date), CAST(N'2025-07-01' AS Date), N'https://drive.google.com/file789', NULL, NULL, NULL, NULL)
INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (4, 4, CAST(N'2023-10-20' AS Date), CAST(N'2026-10-20' AS Date), N'https://drive.google.com/file147', NULL, NULL, NULL, NULL)
INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (5, 5, CAST(N'2019-02-01' AS Date), CAST(N'2022-02-01' AS Date), N'https://drive.google.com/file258', NULL, NULL, NULL, NULL)
INSERT [dbo].[Contracts] ([ContractID], [EmployeeID], [StartDate], [EndDate], [LinkDoc], [Status], [ContractTypeID], [ContractCode], [Image]) VALUES (7, 2, CAST(N'2023-10-05' AS Date), CAST(N'2023-10-05' AS Date), N'string', 0, 1, N'string', N'string')
SET IDENTITY_INSERT [dbo].[Contracts] OFF
GO
SET IDENTITY_INSERT [dbo].[ContractType] ON 

INSERT [dbo].[ContractType] ([ContractTypeID], [ContractName], [Status]) VALUES (1, N'Hợp đồng làm việc', 1)
SET IDENTITY_INSERT [dbo].[ContractType] OFF
GO
SET IDENTITY_INSERT [dbo].[Countries] ON 

INSERT [dbo].[Countries] ([CountryID], [CountryCode], [CountryName]) VALUES (1, N'VN', N'Việt Nam')
INSERT [dbo].[Countries] ([CountryID], [CountryCode], [CountryName]) VALUES (2, N'US', N'Hoa Kỳ')
INSERT [dbo].[Countries] ([CountryID], [CountryCode], [CountryName]) VALUES (3, N'JP', N'Nhật Bản')
INSERT [dbo].[Countries] ([CountryID], [CountryCode], [CountryName]) VALUES (4, N'KR', N'Hàn Quốc')
INSERT [dbo].[Countries] ([CountryID], [CountryCode], [CountryName]) VALUES (5, N'CN', N'Trung Quốc')
SET IDENTITY_INSERT [dbo].[Countries] OFF
GO
SET IDENTITY_INSERT [dbo].[Degrees] ON 

INSERT [dbo].[Degrees] ([DegreeID], [DegreeName], [Status]) VALUES (1, N'Cử nhân', NULL)
INSERT [dbo].[Degrees] ([DegreeID], [DegreeName], [Status]) VALUES (2, N'Cử nhân', NULL)
INSERT [dbo].[Degrees] ([DegreeID], [DegreeName], [Status]) VALUES (3, N'Thạc sĩ', NULL)
INSERT [dbo].[Degrees] ([DegreeID], [DegreeName], [Status]) VALUES (4, N'Cử nhân', NULL)
INSERT [dbo].[Degrees] ([DegreeID], [DegreeName], [Status]) VALUES (5, N'Cử nhân', NULL)
SET IDENTITY_INSERT [dbo].[Degrees] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [Status]) VALUES (1, N'Phòng Kế toán', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [Status]) VALUES (2, N'Phòng Nhân sự', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [Status]) VALUES (3, N'Phòng Kỹ thuật', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [Status]) VALUES (4, N'Phòng Kinh doanh', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [Status]) VALUES (5, N'Phòng Hành chính', 1)
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Dependents] ON 

INSERT [dbo].[Dependents] ([DependentID], [EmployeeID], [FullName], [IdentifierCode], [Gender], [Relationship], [DOB], [StartDate], [EndDate], [IdentifierName], [Status], [NoteReason]) VALUES (1, 1, N'Nguyễn Thu Hà', N'123456789', 0, N'Con gái', CAST(N'2017-02-14' AS Date), CAST(N'2017-02-14' AS Date), NULL, N'Chứng minh nhân dân', NULL, NULL)
INSERT [dbo].[Dependents] ([DependentID], [EmployeeID], [FullName], [IdentifierCode], [Gender], [Relationship], [DOB], [StartDate], [EndDate], [IdentifierName], [Status], [NoteReason]) VALUES (2, 2, N'Lê Văn Toàn', N'234567891', 1, N'Con trai', CAST(N'2019-03-20' AS Date), CAST(N'2019-03-20' AS Date), NULL, N'Chứng minh nhân dân', NULL, NULL)
INSERT [dbo].[Dependents] ([DependentID], [EmployeeID], [FullName], [IdentifierCode], [Gender], [Relationship], [DOB], [StartDate], [EndDate], [IdentifierName], [Status], [NoteReason]) VALUES (3, 3, N'Trần Thị Hoa', N'345678912', 0, N'Con gái', CAST(N'2016-05-30' AS Date), CAST(N'2016-05-30' AS Date), NULL, N'Chứng minh nhân dân', NULL, NULL)
INSERT [dbo].[Dependents] ([DependentID], [EmployeeID], [FullName], [IdentifierCode], [Gender], [Relationship], [DOB], [StartDate], [EndDate], [IdentifierName], [Status], [NoteReason]) VALUES (4, 4, N'Phạm Minh Đức', N'456789123', 1, N'Con trai', CAST(N'2015-07-12' AS Date), CAST(N'2015-07-12' AS Date), NULL, N'Chứng minh nhân dân', NULL, NULL)
INSERT [dbo].[Dependents] ([DependentID], [EmployeeID], [FullName], [IdentifierCode], [Gender], [Relationship], [DOB], [StartDate], [EndDate], [IdentifierName], [Status], [NoteReason]) VALUES (5, 5, N'Nguyễn Văn Cường', N'567891234', 1, N'Con trai', CAST(N'2018-09-01' AS Date), CAST(N'2018-09-01' AS Date), NULL, N'Chứng minh nhân dân', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Dependents] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 

INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (1, NULL, N'Nguyễn Văn', N'An', CAST(N'1990-03-04T00:00:00.000' AS DateTime), 1, N'Hà Nội', N'0123456789', 123456789, N'annv@gmail.com', 1, 1, NULL, NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (2, NULL, N'Lê Thị', N'Lan', CAST(N'1992-05-12T00:00:00.000' AS DateTime), 0, N'Hải Phòng', N'0987654321', 987654321, N'lanlt@gmail.com', 1, 1, NULL, NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (3, NULL, N'Trần Thị', N'Mai', CAST(N'1995-07-08T00:00:00.000' AS DateTime), 0, N'TP Hồ Chí Minh', N'0246810121', 246810121, N'maitt@gmail.com', 1, 1, NULL, NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (4, NULL, N'Phạm Văn', N'Nam', CAST(N'1994-01-25T00:00:00.000' AS DateTime), 1, N'Đà Nẵng', N'0246810122', 357911012, N'namdv@gmail.com', 1, 1, NULL, NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (5, NULL, N'Nguyễn Thị', N'Hằng', CAST(N'1993-11-30T00:00:00.000' AS DateTime), 0, N'Bình Dương', N'1357911013', 246810123, N'hangnt@gmail.com', 1, 1, NULL, NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (6, N'string', N'Nghiêm Đức', N'Độ', CAST(N'2023-09-29T14:30:56.897' AS DateTime), 1, N'QUang Ninh', N'093231123', 23124123, N'donghiem', 1, 1, N'022213124123123', NULL, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC], [WageID], [SalaryCoefficient]) VALUES (7, N'string', N'Nghiêm Đức', N'Độ', CAST(N'2023-09-29T14:30:56.897' AS DateTime), 1, N'QUang Ninh', N'093231123', 23124123, N'donghiem', 1, 1, N'022213124123123', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET IDENTITY_INSERT [dbo].[EmployeeTeams] ON 

INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (1, 1, 1, CAST(N'2012-01-01T00:00:00.000' AS DateTime), CAST(N'2023-01-01T00:00:00.000' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (2, 2, 1, CAST(N'2023-01-01T00:00:00.000' AS DateTime), CAST(N'2029-01-01T00:00:00.000' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (4, 3, 1, CAST(N'2024-01-01T00:00:00.000' AS DateTime), CAST(N'2030-01-01T00:00:00.000' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (5, 4, 1, CAST(N'2034-02-02T00:00:00.000' AS DateTime), CAST(N'2024-01-01T00:00:00.000' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (6, 1, 1, CAST(N'2023-10-27T17:54:26.610' AS DateTime), CAST(N'2023-10-27T19:08:29.330' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (7, 2, 1, CAST(N'2023-10-27T17:54:26.670' AS DateTime), CAST(N'2023-10-27T19:08:29.383' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (8, 3, 1, CAST(N'2023-10-27T17:54:26.670' AS DateTime), CAST(N'2023-10-27T19:08:29.387' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (9, 4, 1, CAST(N'2023-10-27T17:54:26.670' AS DateTime), NULL)
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (10, 1, 1, CAST(N'2023-10-27T19:08:29.340' AS DateTime), CAST(N'2023-10-27T19:24:21.907' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (11, 2, 1, CAST(N'2023-10-27T19:08:29.383' AS DateTime), CAST(N'2023-10-27T19:24:21.953' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (12, 3, 1, CAST(N'2023-10-27T19:08:29.387' AS DateTime), CAST(N'2023-10-27T19:24:21.957' AS DateTime))
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (13, 1, 1, CAST(N'2023-10-27T19:24:21.913' AS DateTime), NULL)
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (14, 2, 1, CAST(N'2023-10-27T19:24:21.953' AS DateTime), NULL)
INSERT [dbo].[EmployeeTeams] ([EmployeeTeamID], [EmployeeId], [TeamID], [StartDate], [EndDate]) VALUES (15, 3, 1, CAST(N'2023-10-27T19:24:21.957' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[EmployeeTeams] OFF
GO
SET IDENTITY_INSERT [dbo].[HistoryChangeShiftType] ON 

INSERT [dbo].[HistoryChangeShiftType] ([HistoryID], [Action], [ActionDate], [CurrentEmployeeID], [ShiftTypeID]) VALUES (1, N'Create', CAST(N'2023-10-27T15:20:02.500' AS DateTime), NULL, 2)
INSERT [dbo].[HistoryChangeShiftType] ([HistoryID], [Action], [ActionDate], [CurrentEmployeeID], [ShiftTypeID]) VALUES (2, N'Update', CAST(N'2023-10-27T16:29:04.593' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[HistoryChangeShiftType] OFF
GO
SET IDENTITY_INSERT [dbo].[HistoryChangeTeams] ON 

INSERT [dbo].[HistoryChangeTeams] ([HistoryID], [TeamID], [Action], [ActionDate], [CurrentEmployeeID]) VALUES (1, 1, N'Create', CAST(N'2023-10-22T17:59:14.513' AS DateTime), NULL)
INSERT [dbo].[HistoryChangeTeams] ([HistoryID], [TeamID], [Action], [ActionDate], [CurrentEmployeeID]) VALUES (2, 4, N'Create', CAST(N'2023-10-27T17:54:11.813' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[HistoryChangeTeams] OFF
GO
SET IDENTITY_INSERT [dbo].[Pages] ON 

INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (1, N'Home', 1)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (2, N'trang thong ke', 1)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (3, N'ListEmployee', NULL)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (4, N'ListDepartment', NULL)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (5, N'DependentPerson', NULL)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (6, N'ListGroup', NULL)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (7, N'Role', NULL)
INSERT [dbo].[Pages] ([PageID], [PageName], [Status]) VALUES (8, N'Decentralization', NULL)
SET IDENTITY_INSERT [dbo].[Pages] OFF
GO
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (1, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (2, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (3, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (4, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (5, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (6, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (7, 8)
INSERT [dbo].[RolePages] ([PageID], [RoleID]) VALUES (8, 8)
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (1, NULL, N'Nhân viên', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (2, NULL, N'Quản lý', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (3, NULL, N'Giám đốc', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (4, NULL, N'Kế toán trưởng', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (5, NULL, N'Nhân viên bán hàng', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (6, NULL, N'Trưởng ca', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (7, NULL, N'Phó ca', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleLevel], [RoleName], [Status]) VALUES (8, NULL, N'Admin', NULL)
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[RolesEmployees] ON 

INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (1, 1, 6, 1, CAST(N'2020-01-01T00:00:00.000' AS DateTime), CAST(N'2023-01-01T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (2, 2, 7, 2, CAST(N'2021-04-15T00:00:00.000' AS DateTime), CAST(N'2024-04-15T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (3, 3, 1, 3, CAST(N'2022-07-01T00:00:00.000' AS DateTime), CAST(N'2025-07-01T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (4, 4, 1, 1, CAST(N'2023-10-20T00:00:00.000' AS DateTime), CAST(N'2026-10-20T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (5, 5, 5, 4, CAST(N'2019-02-01T00:00:00.000' AS DateTime), CAST(N'2022-02-01T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (6, 1, 3, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (7, 1, 4, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (8, 1, 6, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (9, 6, 8, 1, CAST(N'2023-09-29T00:00:00.000' AS DateTime), CAST(N'2023-09-29T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (10, 7, 8, 1, CAST(N'2023-09-29T21:36:09.470' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[RolesEmployees] OFF
GO
SET IDENTITY_INSERT [dbo].[ShiftType] ON 

INSERT [dbo].[ShiftType] ([ShiftTypeID], [TypeName], [Status], [StartTime], [EndTime]) VALUES (1, N'Ca sáng', 1, CAST(N'13:45:30' AS Time), CAST(N'23:00:00' AS Time))
INSERT [dbo].[ShiftType] ([ShiftTypeID], [TypeName], [Status], [StartTime], [EndTime]) VALUES (2, N'Ca tối', 1, CAST(N'18:00:00' AS Time), CAST(N'00:00:00' AS Time))
SET IDENTITY_INSERT [dbo].[ShiftType] OFF
GO
SET IDENTITY_INSERT [dbo].[Teams] ON 

INSERT [dbo].[Teams] ([TeamID], [TeamName], [TeamLeaderId], [Note]) VALUES (1, N'Gỗ ép', 1, N'string')
INSERT [dbo].[Teams] ([TeamID], [TeamName], [TeamLeaderId], [Note]) VALUES (2, N'Gỗ ván', 2, N'string')
INSERT [dbo].[Teams] ([TeamID], [TeamName], [TeamLeaderId], [Note]) VALUES (3, N'Gỗ nén', NULL, NULL)
INSERT [dbo].[Teams] ([TeamID], [TeamName], [TeamLeaderId], [Note]) VALUES (4, N'Team 1', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Teams] OFF
GO
SET IDENTITY_INSERT [dbo].[UnitCost] ON 

INSERT [dbo].[UnitCost] ([UniCostId], [UnitName], [Cost], [Status]) VALUES (1, N'Giá gỗ ép', 100, 1)
INSERT [dbo].[UnitCost] ([UniCostId], [UnitName], [Cost], [Status]) VALUES (2, N'Giá gỗ tấm', 2000, 1)
SET IDENTITY_INSERT [dbo].[UnitCost] OFF
GO
SET IDENTITY_INSERT [dbo].[UnitCostStatusHistory] ON 

INSERT [dbo].[UnitCostStatusHistory] ([HistoryID], [UniCostId], [Action], [ActionDate], [CurrentEmployeeID]) VALUES (1, 2, N'Create', CAST(N'2023-10-27T01:11:35.053' AS DateTime), NULL)
INSERT [dbo].[UnitCostStatusHistory] ([HistoryID], [UniCostId], [Action], [ActionDate], [CurrentEmployeeID]) VALUES (2, 2, N'Update', CAST(N'2023-10-27T01:11:50.930' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[UnitCostStatusHistory] OFF
GO
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (1, N'annv', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (2, N'lanlt', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (3, N'maitt', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (4, N'annv123', N'$2a$11$PckTS2yONlESRnwQuMYuFupd0WsbT4T1wjMvuKDR7//64S4S56c0W', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (5, N'hangnt', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (6, N'admin', N'$2a$11$6GvX5KYoSIMGtfidnSVrke58UfKOs6TNauRNb8l3tq72SC99DoUpe', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (7, N'nghiemdo', N'$2a$11$mNOyKjxJw6ouWL/uswCoteoahzdvZxA9FOYEstGoKEU8Vthy3fJZK', 1)
GO
SET IDENTITY_INSERT [dbo].[Work] ON 

INSERT [dbo].[Work] ([WorkId], [WorkName], [ProductPackage], [UniCostId], [Date], [WorkAreaId]) VALUES (2, N'Làm gỗ ép', 10, 1, CAST(N'2012-01-01T00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Work] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkAreas] ON 

INSERT [dbo].[WorkAreas] ([WorkAreaId], [WorkAreaName], [Status]) VALUES (1, N'Phân Khu A', 1)
SET IDENTITY_INSERT [dbo].[WorkAreas] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkSchedule] ON 

INSERT [dbo].[WorkSchedule] ([WorkScheduleID], [ShiftTypeID], [TeamID], [Status]) VALUES (2, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[WorkSchedule] OFF
GO
SET IDENTITY_INSERT [dbo].[WorkScheduleStatusHistory] ON 

INSERT [dbo].[WorkScheduleStatusHistory] ([HistoryID], [WorkScheduleID], [Action], [ActionDate], [CurrentEmployeeID]) VALUES (1, 2, N'Create', CAST(N'2023-10-27T01:32:49.657' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[WorkScheduleStatusHistory] OFF
GO
ALTER TABLE [dbo].[CheckInOut]  WITH CHECK ADD  CONSTRAINT [FK_CheckInOut_Employees] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[CheckInOut] CHECK CONSTRAINT [FK_CheckInOut_Employees]
GO
ALTER TABLE [dbo].[Contracts]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Contracts]  WITH CHECK ADD  CONSTRAINT [FK_Contracts_ContractType] FOREIGN KEY([ContractTypeID])
REFERENCES [dbo].[ContractType] ([ContractTypeID])
GO
ALTER TABLE [dbo].[Contracts] CHECK CONSTRAINT [FK_Contracts_ContractType]
GO
ALTER TABLE [dbo].[ContractsStatusHistory]  WITH CHECK ADD FOREIGN KEY([ContractID])
REFERENCES [dbo].[Contracts] ([ContractID])
GO
ALTER TABLE [dbo].[ContractTypeStatusHistory]  WITH CHECK ADD FOREIGN KEY([ContractTypeID])
REFERENCES [dbo].[ContractType] ([ContractTypeID])
GO
ALTER TABLE [dbo].[DegreesStatusHistory]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[DepartmentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[Dependents]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[DependentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DependentID])
REFERENCES [dbo].[Dependents] ([DependentID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Wages] FOREIGN KEY([WageID])
REFERENCES [dbo].[Wages] ([WageID])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Wages]
GO
ALTER TABLE [dbo].[EmployeesStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeTeams]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeTeams_Employees] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeTeams] CHECK CONSTRAINT [FK_EmployeeTeams_Employees]
GO
ALTER TABLE [dbo].[EmployeeTeams]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeTeams_Teams] FOREIGN KEY([TeamID])
REFERENCES [dbo].[Teams] ([TeamID])
GO
ALTER TABLE [dbo].[EmployeeTeams] CHECK CONSTRAINT [FK_EmployeeTeams_Teams]
GO
ALTER TABLE [dbo].[HistoryChangeCheckInOut]  WITH CHECK ADD  CONSTRAINT [FK_HistoryChangeTimeTracking_CheckInOut] FOREIGN KEY([CheckInOutId])
REFERENCES [dbo].[CheckInOut] ([CheckInOutId])
GO
ALTER TABLE [dbo].[HistoryChangeCheckInOut] CHECK CONSTRAINT [FK_HistoryChangeTimeTracking_CheckInOut]
GO
ALTER TABLE [dbo].[HistoryChangeShiftType]  WITH CHECK ADD  CONSTRAINT [FK_HistoryChangeShiftType_ShiftType] FOREIGN KEY([ShiftTypeID])
REFERENCES [dbo].[ShiftType] ([ShiftTypeID])
GO
ALTER TABLE [dbo].[HistoryChangeShiftType] CHECK CONSTRAINT [FK_HistoryChangeShiftType_ShiftType]
GO
ALTER TABLE [dbo].[HistoryChangeTeams]  WITH CHECK ADD  CONSTRAINT [FK_HistoryChangeTeams_Teams] FOREIGN KEY([TeamID])
REFERENCES [dbo].[Teams] ([TeamID])
GO
ALTER TABLE [dbo].[HistoryChangeTeams] CHECK CONSTRAINT [FK_HistoryChangeTeams_Teams]
GO
ALTER TABLE [dbo].[PageStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_PageStatusHistory_Pages] FOREIGN KEY([PageID])
REFERENCES [dbo].[Pages] ([PageID])
GO
ALTER TABLE [dbo].[PageStatusHistory] CHECK CONSTRAINT [FK_PageStatusHistory_Pages]
GO
ALTER TABLE [dbo].[RolePages]  WITH CHECK ADD  CONSTRAINT [FK_RolePages_Pages] FOREIGN KEY([PageID])
REFERENCES [dbo].[Pages] ([PageID])
GO
ALTER TABLE [dbo].[RolePages] CHECK CONSTRAINT [FK_RolePages_Pages]
GO
ALTER TABLE [dbo].[RolePages]  WITH CHECK ADD  CONSTRAINT [FK_RolePages_Roles] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolePages] CHECK CONSTRAINT [FK_RolePages_Roles]
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD  CONSTRAINT [FK__RolesEmpl__RoleI__10566F31] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolesEmployees] CHECK CONSTRAINT [FK__RolesEmpl__RoleI__10566F31]
GO
ALTER TABLE [dbo].[RolesStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK__RolesStat__RoleI__114A936A] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolesStatusHistory] CHECK CONSTRAINT [FK__RolesStat__RoleI__114A936A]
GO
ALTER TABLE [dbo].[TeamWork]  WITH CHECK ADD  CONSTRAINT [FK_TeamWork_Teams] FOREIGN KEY([TeamID])
REFERENCES [dbo].[Teams] ([TeamID])
GO
ALTER TABLE [dbo].[TeamWork] CHECK CONSTRAINT [FK_TeamWork_Teams]
GO
ALTER TABLE [dbo].[TeamWork]  WITH CHECK ADD  CONSTRAINT [FK_TeamWork_Work] FOREIGN KEY([WorkId])
REFERENCES [dbo].[Work] ([WorkId])
GO
ALTER TABLE [dbo].[TeamWork] CHECK CONSTRAINT [FK_TeamWork_Work]
GO
ALTER TABLE [dbo].[UnitCostStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_UnitCostStatusHistory_UnitCost] FOREIGN KEY([UniCostId])
REFERENCES [dbo].[UnitCost] ([UniCostId])
GO
ALTER TABLE [dbo].[UnitCostStatusHistory] CHECK CONSTRAINT [FK_UnitCostStatusHistory_UnitCost]
GO
ALTER TABLE [dbo].[UserAccounts]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[UserAccountsStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[UserAccounts] ([EmployeeID])
GO
ALTER TABLE [dbo].[WageStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_WageStatusHistory_Wages] FOREIGN KEY([WageID])
REFERENCES [dbo].[Wages] ([WageID])
GO
ALTER TABLE [dbo].[WageStatusHistory] CHECK CONSTRAINT [FK_WageStatusHistory_Wages]
GO
ALTER TABLE [dbo].[Work]  WITH CHECK ADD  CONSTRAINT [FK_Work_UnitCost] FOREIGN KEY([UniCostId])
REFERENCES [dbo].[UnitCost] ([UniCostId])
GO
ALTER TABLE [dbo].[Work] CHECK CONSTRAINT [FK_Work_UnitCost]
GO
ALTER TABLE [dbo].[Work]  WITH CHECK ADD  CONSTRAINT [FK_Work_WorkAreas] FOREIGN KEY([WorkAreaId])
REFERENCES [dbo].[WorkAreas] ([WorkAreaId])
GO
ALTER TABLE [dbo].[Work] CHECK CONSTRAINT [FK_Work_WorkAreas]
GO
ALTER TABLE [dbo].[WorkSchedule]  WITH CHECK ADD  CONSTRAINT [FK_WorkSchedule_ShiftType] FOREIGN KEY([ShiftTypeID])
REFERENCES [dbo].[ShiftType] ([ShiftTypeID])
GO
ALTER TABLE [dbo].[WorkSchedule] CHECK CONSTRAINT [FK_WorkSchedule_ShiftType]
GO
ALTER TABLE [dbo].[WorkSchedule]  WITH CHECK ADD  CONSTRAINT [FK_WorkSchedule_Teams] FOREIGN KEY([TeamID])
REFERENCES [dbo].[Teams] ([TeamID])
GO
ALTER TABLE [dbo].[WorkSchedule] CHECK CONSTRAINT [FK_WorkSchedule_Teams]
GO
ALTER TABLE [dbo].[WorkScheduleStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_WorkScheduleStatusHistory_WorkSchedule] FOREIGN KEY([WorkScheduleID])
REFERENCES [dbo].[WorkSchedule] ([WorkScheduleID])
GO
ALTER TABLE [dbo].[WorkScheduleStatusHistory] CHECK CONSTRAINT [FK_WorkScheduleStatusHistory_WorkSchedule]
GO
USE [master]
GO
ALTER DATABASE [SEP-G4-CCMS] SET  READ_WRITE 
GO
