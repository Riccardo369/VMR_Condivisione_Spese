drop database if exists SEP;
create database SEP;
use SEP;

create table if not exists Account(

FirstName varchar(100),
LastName varchar(100),
Nickname varchar(100) primary key,
TelephoneNumber int(10),
Email varchar(100),
Password varchar(100),
MoneyStack float,
ActualCreditCard varchar(100)

);

create table if not exists CreditCards(

Account varchar(100),
IdNumber int(100),
NameCreditCard int(16),
ExpiredDate Date,
CVC int(4),
Society varchar(100),

primary key (Account, IdNumber)

);


create table if not exists TransactionDone(

OriginAccount varchar(100),
DestinationAccount varchar(100),
Causal varchar(100),
Quantity float,
GroupTransiction boolean,
Data Date not null

);

create table if not exists TransictionSuspensed(

OriginAccount varchar(100),
DestinationAccount varchar(100),
IdTransaction int,
Causal varchar(100),
Quantity float,
GroupTransiction boolean,
OriginPermission boolean,

primary key (OriginAccount, DestinationAccount, IdTransaction)

);

create table if not exists SinglePayment(

OriginAccount varchar(100),
DestinationAccount varchar(100),
Quantity float,
Causal varchar(100),
TemporalFrequency int

);

create table if not exists GroupPayment(

GroupName varchar(100),
BenefictAccount varchar(100),
IdNumber int primary key,
Quantity float,
Causal varchar(100),
TemporalFrequency int

);

create table if not exists GroupPaymentAccounts(

IdNumber int,
Account varchar(100)

);

create table if not exists InvitesGroupSuspended(

IdNumber int,
Account varchar(100),

primary key (IdNumber, Account)

);