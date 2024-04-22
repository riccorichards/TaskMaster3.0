# TaskMaster3.0

## Introduction

TaskMaster3.0 is an interactive learning management tool designed to assist users in creating personalized learning plans and tracking their progress. This application features a dynamic, tree-structured interface that allows users to plan and track their learning activities effectively, enhancing the educational experience with modern web technologies.

## Features

- **Custom Learning Plans:** Users can construct and visualize personalized learning journeys using a dynamic, tree-structured interface.
- **Performance Dashboards:** Dashboards display daily achievements, top learning topics, and a historical overview of user activities, allowing users to monitor their progress comprehensively.
- **High-Performance Timer:** Implements a high-performance timer using `requestAnimationFrame` for minimal CPU impact, enhancing the functionality of time management within the platform.
- **AI Integration:** Incorporates ChatGPT-3.5-turbo to provide interactive and conversational AI support, aiding in learning and self-assessment.
- **Security and Data Handling:** Ensures robust data security using JWT for authentication, bcrypt for hashing, and Zod for error handling, maintaining high standards of data integrity and security.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Express.js on Node.js
- **Database:** MongoDB
- **State Management:** Redux
- **Additional Tools:** JWT, bcrypt, Zod, ChatGPT-3.5-turbo

## Installation

1. **Clone the repository:**
   git clone https://github.com/riccorichards/taskmaster3.0.git

markdown
Copy code 2. **Navigate to the project directory:**
cd taskmaster3.0

markdown
Copy code 3. **Install dependencies:**
npm install

markdown
Copy code 4. **Start the server:**
npm start

csharp
Copy code

## Usage

After starting the application, navigate to `http://localhost:3000` to access TaskMaster3.0. Begin by setting up your user account and creating your first learning plan. Use the interface to add new learning goals, set timelines, and track your daily activities.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes. Ensure to adhere to the existing coding standards and include tests for new functionality.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Support

For support, email `tr.riccorichards@gmail.com` or visit our [GitHub issues page](https://github.com/riccorichards/taskmaster3.0/issues) to report bugs.
