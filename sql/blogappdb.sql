-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2025 at 12:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogappdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `b_id` int(11) NOT NULL,
  `b_title` varchar(500) NOT NULL,
  `b_description` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`b_id`, `b_title`, `b_description`, `user_id`) VALUES
(4, 'tiuty6576', 'klhlkj', 7),
(11, 'xvccvvcx', 'errere', 8),
(12, 'iooioi', 'qwas', 5),
(13, 'First Blog', 'This is the first post.', 7),
(14, 'Second Blog', 'This is the second post.', 8),
(15, 'Third Blog', 'This is the third post.', 5);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `createdAt`) VALUES
(1, 4, 7, 'updated content111', '2025-07-03 21:59:40'),
(2, 4, 6, 'Thanks for sharing!', '2025-07-03 21:59:40'),
(3, 4, 5, 'Great insights in this post.', '2025-07-03 21:59:40'),
(19, 4, 7, 'This is the first comment.', '2025-07-03 22:25:15'),
(20, 11, 8, 'Amazing post!', '2025-07-03 22:25:15'),
(21, 12, 5, 'I totally agree with this post.', '2025-07-03 22:25:15'),
(22, 13, 7, 'Thanks for sharing your thoughts.', '2025-07-03 22:25:15'),
(23, 14, 8, 'Looking forward to more posts like this!', '2025-07-03 22:25:15'),
(24, 4, 7, 'This is the first comment.', '2025-07-03 22:27:56'),
(25, 11, 8, 'Amazing post!', '2025-07-03 22:27:56'),
(26, 12, 5, 'I totally agree with this post.', '2025-07-03 22:27:56'),
(27, 13, 7, 'Thanks for sharing your thoughts.', '2025-07-03 22:27:56'),
(28, 14, 8, 'Looking forward to more posts like this!', '2025-07-03 22:27:56'),
(30, 4, 7, 'This is a sample comment', '2025-07-03 22:31:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_fName` varchar(500) NOT NULL,
  `u_lName` varchar(500) NOT NULL,
  `u_email` varchar(500) NOT NULL,
  `u_password` varchar(500) NOT NULL,
  `u_DOB` date DEFAULT NULL,
  `u_gender` enum('male','female') NOT NULL DEFAULT 'male',
  `u_createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `u_updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_fName`, `u_lName`, `u_email`, `u_password`, `u_DOB`, `u_gender`, `u_createdAt`, `u_updatedAt`) VALUES
(5, 'ahmed', 'ali', 'ahmedali@gmail.com', '123456', '0000-00-00', 'male', '2025-07-03 16:36:37', '2025-07-03 16:36:37'),
(6, 'salssaaah', 'ahssmed', 'salah@gmail.com', 'salah@123', '1999-09-09', 'male', '2025-07-03 17:18:55', '2025-07-03 17:18:55'),
(7, 'Mohammed', 'abdallah', 'mohammed@gmail.com', 'salah@123', '1999-09-09', 'male', '2025-07-03 17:19:38', '2025-07-03 17:19:38'),
(8, 'hussain', 'jfhfhmed', 'hussain@gmail.com', 'salah@123', '1999-09-09', 'male', '2025-07-03 17:19:48', '2025-07-03 17:19:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`b_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `email` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`u_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blogs` (`b_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
