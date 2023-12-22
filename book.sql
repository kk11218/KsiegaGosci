-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2023 at 03:14 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `basket_product`
--

CREATE TABLE `basket_product` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_guestbooks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `guestbooks`
--

CREATE TABLE `guestbooks` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_persons` int(11) DEFAULT NULL,
  `id_template` int(11) DEFAULT NULL,
  `kod_qr` varchar(255) NOT NULL,
  `pin` int(4) NOT NULL,
  `date_of_purchase` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `guest_entries`
--

CREATE TABLE `guest_entries` (
  `id` int(11) NOT NULL,
  `id_guestbooks` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `photos` varchar(300) DEFAULT NULL,
  `wishes` text DEFAULT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_basket_product` int(11) DEFAULT NULL,
  `sum_product` decimal(10,2) NOT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `nip` char(10) DEFAULT NULL,
  `date_buy` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `last_namej_bride` varchar(100) NOT NULL,
  `bride_name` varchar(100) NOT NULL,
  `last_namej_groomo` varchar(100) NOT NULL,
  `groom_name` varchar(100) NOT NULL,
  `wedding_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `setting_name` varchar(100) NOT NULL,
  `valu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `template`
--

CREATE TABLE `template` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `photo` varchar(300) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `video` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `passwords` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `basket_product`
--
ALTER TABLE `basket_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_guestbooks` (`id_guestbooks`);

--
-- Indeksy dla tabeli `guestbooks`
--
ALTER TABLE `guestbooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_persons` (`id_persons`),
  ADD KEY `id_template` (`id_template`);

--
-- Indeksy dla tabeli `guest_entries`
--
ALTER TABLE `guest_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_guestbooks` (`id_guestbooks`);

--
-- Indeksy dla tabeli `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `id_basket_product` (`id_basket_product`);

--
-- Indeksy dla tabeli `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_users` (`id_users`);

--
-- Indeksy dla tabeli `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basket_product`
--
ALTER TABLE `basket_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guestbooks`
--
ALTER TABLE `guestbooks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guest_entries`
--
ALTER TABLE `guest_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket_product`
--
ALTER TABLE `basket_product`
  ADD CONSTRAINT `basket_product_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `basket_product_ibfk_2` FOREIGN KEY (`id_guestbooks`) REFERENCES `guestbooks` (`id`);

--
-- Constraints for table `guestbooks`
--
ALTER TABLE `guestbooks`
  ADD CONSTRAINT `guestbooks_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `guestbooks_ibfk_2` FOREIGN KEY (`id_persons`) REFERENCES `persons` (`id`),
  ADD CONSTRAINT `guestbooks_ibfk_3` FOREIGN KEY (`id_template`) REFERENCES `template` (`id`);

--
-- Constraints for table `guest_entries`
--
ALTER TABLE `guest_entries`
  ADD CONSTRAINT `guest_entries_ibfk_1` FOREIGN KEY (`id_guestbooks`) REFERENCES `guestbooks` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`id_basket_product`) REFERENCES `basket_product` (`id`);

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
