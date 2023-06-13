-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 13, 2023 alle 11:47
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sep`
--

CREATE DATABASE IF NOT EXISTS sep;
USE sep;

CREATE USER IF NOT EXISTS 'UserSEP'@'127.0.0.1' IDENTIFIED BY 'PasswordSpeseCondiviseDB';
GRANT ALL PRIVILEGES ON sep.* TO 'UserSEP'@'127.0.0.1';
FLUSH PRIVILEGES;

-- --------------------------------------------------------

--
-- Struttura della tabella `account`
--

CREATE TABLE `account` (
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Nickname` varchar(100) NOT NULL,
  `TelephoneNumber` int(10) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `MoneyStack` float DEFAULT NULL,
  `ActualCreditCard` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `creditcards`
--

CREATE TABLE `creditcards` (
  `Account` varchar(100) NOT NULL,
  `IdNumber` int(100) NOT NULL,
  `NameCreditCard` int(16) DEFAULT NULL,
  `ExpiredDate` date DEFAULT NULL,
  `CVC` int(4) DEFAULT NULL,
  `Society` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `grouppayment`
--

CREATE TABLE `grouppayment` (
  `GroupName` varchar(100) DEFAULT NULL,
  `BenefictAccount` varchar(100) DEFAULT NULL,
  `IdNumber` int(11) NOT NULL,
  `Quantity` float DEFAULT NULL,
  `Causal` varchar(100) DEFAULT NULL,
  `TemporalFrequency` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `grouppaymentaccounts`
--

CREATE TABLE `grouppaymentaccounts` (
  `IdNumber` int(11) DEFAULT NULL,
  `Account` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `invitesgroupsuspended`
--

CREATE TABLE `invitesgroupsuspended` (
  `IdNumber` int(11) NOT NULL,
  `Account` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `singlepayment`
--

CREATE TABLE `singlepayment` (
  `OriginAccount` varchar(100) DEFAULT NULL,
  `DestinationAccount` varchar(100) DEFAULT NULL,
  `Quantity` float DEFAULT NULL,
  `Causal` varchar(100) DEFAULT NULL,
  `TemporalFrequency` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `transactiondone`
--

CREATE TABLE `transactiondone` (
  `OriginAccount` varchar(100) DEFAULT NULL,
  `DestinationAccount` varchar(100) DEFAULT NULL,
  `Causal` varchar(100) DEFAULT NULL,
  `Quantity` float DEFAULT NULL,
  `GroupTransiction` tinyint(1) DEFAULT NULL,
  `Data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `transictionsuspensed`
--

CREATE TABLE `transictionsuspensed` (
  `OriginAccount` varchar(100) NOT NULL,
  `DestinationAccount` varchar(100) NOT NULL,
  `IdTransaction` int(11) NOT NULL,
  `Causal` varchar(100) DEFAULT NULL,
  `Quantity` float DEFAULT NULL,
  `GroupTransiction` tinyint(1) DEFAULT NULL,
  `OriginPermission` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Nickname`);

--
-- Indici per le tabelle `creditcards`
--
ALTER TABLE `creditcards`
  ADD PRIMARY KEY (`Account`,`IdNumber`);

--
-- Indici per le tabelle `grouppayment`
--
ALTER TABLE `grouppayment`
  ADD PRIMARY KEY (`IdNumber`);

--
-- Indici per le tabelle `invitesgroupsuspended`
--
ALTER TABLE `invitesgroupsuspended`
  ADD PRIMARY KEY (`IdNumber`,`Account`);

--
-- Indici per le tabelle `transictionsuspensed`
--
ALTER TABLE `transictionsuspensed`
  ADD PRIMARY KEY (`OriginAccount`,`DestinationAccount`,`IdTransaction`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
