# Umoja Admin

Umoja Admin is a mobile application developed using React Native and Expo, designed to provide administrative functionalities for the UmojaTickets platform.

## Features

- **User Management**: Manage user accounts and profiles.
- **Content Management**: Create, edit, and delete content within the app.
- **Notifications**: Send and manage notifications to users.
- **Analytics**: View and analyze app usage statistics.

## Technologies Used

- [React Native](https://reactnative.dev/): A framework for building native apps using React.
- [Expo](https://expo.dev/): A platform for making React Native development easier.
- [Convex](https://convex.dev/): A backend platform for data storage and real-time updates.
- [Nativewind](https://nativewind.com/): A utility-first CSS framework for styling.(Tailwind CSS).

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Ochiengmorris/umoja-admin.git
   cd umoja-admin
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Set Up Convex**:

   - Install the Convex CLI:

     ```bash
     npm install -g convex
     ```

   - Log in to Convex:

     ```bash
     convex login
     ```

   - Initialize Convex:

     ```bash
     convex init
     ```

4. **Set Up Clerk**:

   - Sign up for a Clerk account at [Clerk.dev](https://clerk.dev/).
   - Obtain your Clerk API keys and configure them in your environment variables.

5. **Start the Application**:

   ```bash
   expo start
   ```

   This will start the Expo development server. You can then run the app on an emulator or a physical device using the Expo Go app.

## Project Structure

- **`/app`**: Contains the main application components.
- **`/assets`**: Contains images, fonts, and other static assets.
- **`/components`**: Reusable components used throughout the app.
- **`/constants`**: Application constants and configurations.
- **`/convex`**: Convex backend functions and configuration.
- **`/utils`**: Utility functions and helpers.

## Contributing

We welcome contributions to enhance the Umoja Admin app. To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Description of feature"
   ```

4. Push to your forked repository:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or support, please contact [Ochieng Morris](mailto:oduyajohn66@gmail.com).
