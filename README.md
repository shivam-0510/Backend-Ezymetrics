# EzyMetrics Backend

EzyMetrics is a powerful backend application designed to manage data integrations and reporting for marketing metrics. Built with Node.js, Express.js, and MongoDB, this project provides a robust API for handling leads, campaigns, and metrics.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Leads](#leads)
  - [Campaigns](#campaigns)
  - [Metrics](#metrics)
- [ETL Process](#etl-process)
- [Email Notifications](#email-notifications)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **CRUD Operations**: Create, read, update, and delete leads, campaigns, and metrics.
- **Data Integration**: Fetch and aggregate data from various sources.
- **Reporting**: Generate comprehensive reports on marketing performance.
- **Email Alerts**: Notify users of critical metrics and performance issues.
- **ETL Process**: Extract, transform, and load marketing data efficiently.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- dotenv
- MailTrap SMTP

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- MongoDB (local or hosted, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ezy-metrics-backend.git
   cd ezy-metrics-backend
