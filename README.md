# Gallery-App

Gallery App is built to show images like a photo gallery. It's an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## The technologies used to create this project are

- **React Native**
- **Expo**
- **TailwindCSS** for styling
- **gluestack-ui** for UI components
- **expo-router** for navigation
- **reduxjs/toolkit** for state management
- **react-native-toast-message** for toast showing
- **axios** for data fetching
- **Typescript** for type safety

## Requirements Fulfilled

Requirements for this project

- [x] Setup React Native project using expo
- [x] Add Typescript, Tailwind CSS, Gluestack UI and other dependencies
- [x] Implement a search bar for searching titles, albums
- [x] Use the Redux Toolkit to manage the app's state 
- [x] Fetch data from the given API using axios get function
- [x] Handle actions to fetch, display, and potentially cache images for offline viewing
- [x] Display a list of images using the thumbnail URL for the Gallery Screen and the full image URL for the Detail Screen
- [x] Tapping on a thumbnail navigates to the Image Detail Screen.
- [x] Show a larger version of the image and display the image title and any other relevant metadata
- [x] Include a back button to return to the Gallery Screen
- [x] Implement lazy loading of images as the user scrolls
- [x] Use caching strategies to store images for offline access
- [x] Add delete functions to delete albums and images 
- [x] Add error handling by using toast
- [x] Add overall responsiveness

## ScreenShots
Gallery Screen 

<p>
   <img src="assets/images/screenshot1.jpg" alt="Project Screenshot" width="300">
</p>

Image Details Screen

<p>
   <img src="assets/images/screenshot2.jpg" alt="Project Screenshot" width="300">
   <img src="assets/images/screenshot3.jpg" alt="Project Screenshot" width="300">
</p>

After Search

<p>
   <img src="assets/images/screenshot4.jpg" alt="Project Screenshot" width="300">
   <img src="assets/images/screenshot5.jpg" alt="Project Screenshot" width="300">
</p>
