CREATE DATABASE IF NOT EXISTS feature_request_tracker;
USE feature_request_tracker;

DROP TABLE IF EXISTS feature_requests;

CREATE TABLE feature_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
  status ENUM('Open', 'In Progress', 'Completed') NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO feature_requests (title, description, priority, status) VALUES
('Add dark mode', 'Users should be able to switch between light and dark themes.', 'High', 'Open'),
('Export requests to CSV', 'Allow admins to download feature requests as CSV files.', 'Medium', 'In Progress'),
('Email notifications', 'Notify users when a feature request status changes.', 'Low', 'Completed');
