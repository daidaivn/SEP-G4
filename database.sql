USE [master]
GO
/****** Object:  Database [SEP-G4-CCMS]    Script Date: 10/6/2023 11:16:32 PM ******/
CREATE DATABASE [SEP-G4-CCMS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SEP-G4-CCMS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SEP-G4-CCMS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SEP-G4-CCMS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SEP-G4-CCMS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
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
/****** Object:  Table [dbo].[Contracts]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[ContractsStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[ContractType]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[ContractTypeStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Countries]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Degrees]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[DegreesStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Departments]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[DepartmentsStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Dependents]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[DependentsStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[EmployeeDegrees]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Employees]    Script Date: 10/6/2023 11:16:32 PM ******/
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
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeesStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Pages]    Script Date: 10/6/2023 11:16:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pages](
	[PageID] [int] NOT NULL,
	[PageName] [nvarchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Pages] PRIMARY KEY CLUSTERED 
(
	[PageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PageStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PageStatusHistory](
	[HistoryID] [int] NOT NULL,
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
/****** Object:  Table [dbo].[RolePages]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 10/6/2023 11:16:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](20) NULL,
	[Status] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesEmployees]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[RolesStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[UserAccounts]    Script Date: 10/6/2023 11:16:32 PM ******/
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
/****** Object:  Table [dbo].[UserAccountsStatusHistory]    Script Date: 10/6/2023 11:16:32 PM ******/
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

INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (1, NULL, N'Nguyễn Văn', N'An', CAST(N'1990-03-04T00:00:00.000' AS DateTime), 1, N'Hà Nội', N'0123456789', 123456789, N'annv@gmail.com', 1, 1, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (2, NULL, N'Lê Thị', N'Lan', CAST(N'1992-05-12T00:00:00.000' AS DateTime), 0, N'Hải Phòng', N'0987654321', 987654321, N'lanlt@gmail.com', 1, 1, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (3, NULL, N'Trần Thị', N'Mai', CAST(N'1995-07-08T00:00:00.000' AS DateTime), 0, N'TP Hồ Chí Minh', N'0246810121', 246810121, N'maitt@gmail.com', 1, 1, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (4, NULL, N'Phạm Văn', N'Nam', CAST(N'1994-01-25T00:00:00.000' AS DateTime), 1, N'Đà Nẵng', N'0246810122', 357911012, N'namdv@gmail.com', 1, 1, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (5, NULL, N'Nguyễn Thị', N'Hằng', CAST(N'1993-11-30T00:00:00.000' AS DateTime), 0, N'Bình Dương', N'1357911013', 246810123, N'hangnt@gmail.com', 1, 1, NULL)
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (6, N'string', N'Nghiêm Đức', N'Độ', CAST(N'2023-09-29T14:30:56.897' AS DateTime), 1, N'QUang Ninh', N'093231123', 23124123, N'donghiem', 1, 1, N'022213124123123')
INSERT [dbo].[Employees] ([EmployeeID], [Image], [FirstName], [LastName], [DOB], [Gender], [Address], [PhoneNumber], [TaxID], [Email], [CountryID], [Status], [CIC]) VALUES (7, N'string', N'Nghiêm Đức', N'Độ', CAST(N'2023-09-29T14:30:56.897' AS DateTime), 1, N'QUang Ninh', N'093231123', 23124123, N'donghiem', 1, 1, N'022213124123123')
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleID], [RoleName], [Status]) VALUES (1, N'Nhân viên', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleName], [Status]) VALUES (2, N'Quản lý', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleName], [Status]) VALUES (3, N'Giám đốc', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleName], [Status]) VALUES (4, N'Kế toán trưởng', 1)
INSERT [dbo].[Roles] ([RoleID], [RoleName], [Status]) VALUES (5, N'Nhân viên bán hàng', 1)
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[RolesEmployees] ON 

INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (1, 1, 2, 1, CAST(N'2020-01-01T00:00:00.000' AS DateTime), CAST(N'2023-01-01T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (2, 2, 1, 2, CAST(N'2021-04-15T00:00:00.000' AS DateTime), CAST(N'2024-04-15T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (3, 3, 3, 3, CAST(N'2022-07-01T00:00:00.000' AS DateTime), CAST(N'2025-07-01T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (4, 4, 4, 1, CAST(N'2023-10-20T00:00:00.000' AS DateTime), CAST(N'2026-10-20T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (5, 5, 5, 4, CAST(N'2019-02-01T00:00:00.000' AS DateTime), CAST(N'2022-02-01T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (6, 1, 3, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (7, 1, 4, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (8, 1, 1, 1, NULL, NULL, 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (9, 6, 1, 1, CAST(N'2023-09-29T00:00:00.000' AS DateTime), CAST(N'2023-09-29T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[RolesEmployees] ([RoleEmployeeID], [EmployeeID], [RoleID], [DepartmentID], [StartDate], [EndDate], [Status]) VALUES (10, 7, 1, 1, CAST(N'2023-09-29T21:36:09.470' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[RolesEmployees] OFF
GO
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (1, N'annv', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (2, N'lanlt', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (3, N'maitt', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (4, N'namdv', N'123456', 1)
INSERT [dbo].[UserAccounts] ([EmployeeID], [UserName], [Password], [Status]) VALUES (5, N'hangnt', N'123456', 1)
GO
ALTER TABLE [dbo].[Contracts]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
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
ALTER TABLE [dbo].[ContractsStatusHistory]  WITH CHECK ADD FOREIGN KEY([ContractID])
REFERENCES [dbo].[Contracts] ([ContractID])
GO
ALTER TABLE [dbo].[ContractTypeStatusHistory]  WITH CHECK ADD FOREIGN KEY([ContractTypeID])
REFERENCES [dbo].[ContractType] ([ContractTypeID])
GO
ALTER TABLE [dbo].[ContractTypeStatusHistory]  WITH CHECK ADD FOREIGN KEY([ContractTypeID])
REFERENCES [dbo].[ContractType] ([ContractTypeID])
GO
ALTER TABLE [dbo].[DegreesStatusHistory]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[DegreesStatusHistory]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[DepartmentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[DepartmentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[Dependents]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Dependents]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[DependentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DependentID])
REFERENCES [dbo].[Dependents] ([DependentID])
GO
ALTER TABLE [dbo].[DependentsStatusHistory]  WITH CHECK ADD FOREIGN KEY([DependentID])
REFERENCES [dbo].[Dependents] ([DependentID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([DegreeID])
REFERENCES [dbo].[Degrees] ([DegreeID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeeDegrees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([CountryID])
REFERENCES [dbo].[Countries] ([CountryID])
GO
ALTER TABLE [dbo].[EmployeesStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[EmployeesStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
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
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolesEmployees]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolesStatusHistory]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[RolesStatusHistory]  WITH CHECK ADD FOREIGN KEY([RoleID])
REFERENCES [dbo].[Roles] ([RoleID])
GO
ALTER TABLE [dbo].[UserAccounts]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[UserAccounts]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[UserAccountsStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[UserAccounts] ([EmployeeID])
GO
ALTER TABLE [dbo].[UserAccountsStatusHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[UserAccounts] ([EmployeeID])
GO
USE [master]
GO
ALTER DATABASE [SEP-G4-CCMS] SET  READ_WRITE 
GO
