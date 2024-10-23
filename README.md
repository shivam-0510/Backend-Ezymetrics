## API USAGE

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Nodemailer
- MailTrap SMTP

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- MongoDB (locally installed)
- Postman (for API testing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shivam-0510/Backend-Ezymetrics.git
   cd .\Backend-Ezymetrics\

2. Install Dependencies:

   ```bash
   npm install

3. Create a .env file and add the following variables:

   ```bash
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/backend-ezymetrics

4. Go to Mailtrap.io and create an account for a fake SMTP server. In .env file add two variables:

   ```bash
   EMAIL_USER=your_username
   EMAIL_PASSWORD=your_password
   ```
   
   Copy the username and password from your account.

   Also add the receiver email in the /services/etlService.js file under:

   ```bash
   const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "reciever-email",
    subject,
    text: message,
   });
   ```


4. Start the application:

   ```bash
   nodemon .\server.js

### Usage

1. For fetching fake CRM data. Go to Postman, select the GET option, and Send a request to this URL.

   ```bash
   http://localhost:8080/api/v1/lead/data

2. For fetching fake marketing data. Go to Postman, select the GET option, and Send a request to this URL.

   ```bash
   http://localhost:8080/api/v1/campaign/data

3. To fetch the and save it in the database. Go to Postman, select the GET option, and Send a request to this URL.

   ```bash
   http://localhost:8080/api/v1/data/fetch

4. For the ETL process. Go to Postman, select the GET option, and Send a request to this URL.

   ```bash
   http://localhost:8080/api/v1/etl

5. For generating a PDF report. Go to Postman, select the GET option, and Send a request to this URL.

   ```bash
   http://localhost:8080/api/v1/report/generate-pdf-report

6. PDF report will be generated in the reports folder.


















