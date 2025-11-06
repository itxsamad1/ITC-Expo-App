# International Talent Connect (ITC) Expo App

A modern, cross-platform mobile application built with Expo and React Native for connecting international talent with job opportunities, visa guidance, and professional resources.

![Expo](https://img.shields.io/badge/Expo-54.0.0-black?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)
![NativeWind](https://img.shields.io/badge/NativeWind-Latest-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 📱 **Cross-Platform** - Works on both iOS and Android
- 🔐 **Authentication** - Secure sign-in and sign-up flows
- 💼 **Job Listings** - Browse and filter jobs by category (Tech, Finance, Education, Health, Marketing)
- 📅 **Events** - Discover and register for professional networking events
- 📚 **Resources & Guidance** - Access visa information and career resources
- 🔔 **Notifications** - Stay updated with important alerts
- 👤 **User Profile** - Manage your profile and application settings

## 🚀 Tech Stack

- **Framework:** Expo SDK 54
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** React Context API
- **Icons:** @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- **Storage:** AsyncStorage for local data persistence
- **Gradients:** expo-linear-gradient

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Expo Go** app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **EAS CLI** (optional, for building) (`npm install -g eas-cli`)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itxsamad1/ITC-Expo-App.git
   cd ITC-Expo-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prebuild` - Prebuild native projects

## 📂 Project Structure

```
ITC-Expo-App/
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home screen
│   │   ├── jobs.tsx         # Jobs/Explore screen
│   │   ├── notifications.tsx # Notifications
│   │   ├── visa.tsx         # Resources/Visa
│   │   └── profile.tsx      # User profile
│   ├── index.tsx            # Root/Entry screen
│   ├── events.tsx           # Events screen
│   ├── resources.tsx        # Resources screen
│   ├── settings.tsx         # Settings screen
│   ├── sign-up.tsx          # Sign up screen
│   └── job-details/[id].tsx # Job details (dynamic)
├── screens/                  # Screen components
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── SignInScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ExploreJobsScreen.tsx
│   ├── JobDetailsScreen.tsx
│   ├── EventsScreen.tsx
│   ├── ResourcesScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── NotificationsScreen.tsx
│   └── SettingsScreen.tsx
├── src/
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme management
│   └── navigation/
│       └── AppNavigator.tsx # Legacy navigation (not used)
├── components/              # Reusable components
├── assets/                  # Images, fonts, etc.
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
├── tailwind.config.js       # Tailwind/NativeWind config
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Theme System

The app supports both light and dark themes with automatic system preference detection:

- **Light Mode:** Clean, professional white theme
- **Dark Mode:** Modern dark navy theme (#052639)
- **Primary Color:** Teal (#00C6A1)
- Theme can be toggled manually in Settings or follows system preference

## 🔐 Authentication

Default test credentials:
- **Email:** `user@gmail.com`
- **Password:** `12345678`

> ⚠️ **Note:** This is for development/testing only. Implement proper authentication for production.

## 📦 Building for Production

### Using EAS Build

1. **Login to Expo**
   ```bash
   eas login
   ```

2. **Configure EAS Build**
   ```bash
   eas build:configure
   ```

3. **Build for Android**
   ```bash
   eas build --platform android --profile production
   ```

4. **Build for iOS**
   ```bash
   eas build --platform ios --profile production
   ```

### Publishing Updates

To share your app with friends via Expo Go (without building):

```bash
eas update --branch production --message "Your update message"
```

This publishes your app to Expo's servers, making it accessible via Expo Go even when your development server is offline.

## 🌐 Deployment

### Sharing via Expo Go

1. **Publish your app**
   ```bash
   eas update --branch production --message "Sharing with friends"
   ```

2. **Share the link**
   - Visit [expo.dev](https://expo.dev)
   - Navigate to your project
   - Share the QR code or project URL with your friends
   - They can open it directly in Expo Go app

### App Store / Play Store

1. **Build your app** (see Building for Production)
2. **Submit to stores**
   ```bash
   eas submit --platform android  # For Google Play
   eas submit --platform ios      # For App Store
   ```

## 🎯 Key Features Explained

### Job Filtering
- Browse jobs by category (All, Tech, Finance, Education, Health, Marketing)
- Filter functionality with visual category chips
- Detailed job information with company logos and locations

### Events
- View upcoming professional events
- Calendar view for event dates
- Event details with location and timing

### Resources & Visa Guidance
- Comprehensive visa information
- Career resources and guides
- Professional development tools

### Profile Management
- View and edit profile
- Manage applications
- Access saved jobs
- Theme preferences

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

## 👤 Author

**Abdul Samad**
- GitHub: [@itxsamad1](https://github.com/itxsamad1)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- NativeWind for Tailwind CSS support in React Native
- React Native community for excellent libraries
- All contributors and supporters

## 📞 Support

For support, email [itxsamad@icloud.com] or open an issue on GitHub.

---

Made with ❤️ using Expo and React Native

