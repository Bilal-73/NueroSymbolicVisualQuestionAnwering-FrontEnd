# NeuroSymbolic Visual Question Answering - Frontend

## 📱 Application Overview

This is the **Frontend application** for the NeuroSymbolic Visual Question Answering (NSQA) system - a cutting-edge AI-powered assistant designed specifically for **blind and visually impaired individuals**.

The application uses **voice-based interaction** to provide audio and text information about the user's surroundings. It combines computer vision, natural language processing, and text-to-speech technologies to create an interactive experience.

### 🔗 Backend Repository
The backend code is available in a separate repository: **[NueroSymbolicVisualQuestionAnswering-Backend](https://github.com/Bilal-73/NueroSymbolicVisualQuestuonAnswering-Backend)**

---

## 🎯 Key Features

### 1. **Voice-Based Interface**
- **Wake Word Detection**: The app listens for voice commands (customizable in backend)
- **Text-to-Speech (TTS)**: All responses are spoken to the user
- **Audio Recording**: Users ask questions through natural speech

### 2. **Main Screen (Blind Assistant)** 
- **Every 5 seconds**: The application captures an image and processes user queries
- **Image Capture**: Automatically captures images using the device camera
- **Audio Processing**: Records user questions and transcribes them to text
- **Smart Reasoning**: Sends the image + transcribed question to the backend for analysis
- **Voice Response**: Receives and speaks out the AI-generated answer

**Commands Available:**
- **"Ask"**: Capture an image and ask a question about it
- **"Continue"**: Ask another question about the previously captured image
- **"Temporal"**: Switch to Temporal Mode
- **"Back"**: Return to the home screen

### 3. **Temporal Reasoning Screen** (`Temporal.jsx`)
- **Fixed Camera Mode**: The camera remains fixed and monitors the same area
- **5-Second Iterations**: Every 5 seconds, the system captures a new frame
- **Presence Detection**: Detects when people or objects enter/exit the frame
- **Temporal Analysis**: Tracks changes across multiple frames for contextual understanding
- **Use Case**: Ideal for monitoring changes in the environment over time

### 4. **Authentication & User Management**
- **Login Screen**: For assistants and blind users
- **User Registration**: 
  - Blind users can sign up
  - Assistants can register and manage contacts
- **Role-Based Access**: Admin, Assistant, and Blind user modes

### 5. **Admin Panel**
- Manage vocabulary and linguistic rules
- Configure NLP/CFG (Context-Free Grammar) settings
- Validate language configurations
- Manage users (view all blind users and assistants)

### 6. **Assistant Panel**
- Add and manage person contacts
- Track interaction history
- View communication logs with blind users

---

## 🏗️ Project Structure

```
├── App.jsx                          # Main navigation and routing
├── MainScreen.jsx                   # Home/Start screen with wake word detection
├── Screens/
│   ├── Blind/
│   │   ├── BlindStartScreen.jsx    # Main blind assistant interface (5-sec loop)
│   │   └── Temporal.jsx             # Temporal reasoning mode (fixed camera)
│   ├── Auth/
│   │   ├── loginscreen.jsx          # Login page
│   │   ├── BlindSignUp.jsx          # Blind user registration
│   │   └── AssistantSignup.jsx      # Assistant user registration
│   ├── Admin/
│   │   ├── MainScreen.jsx           # Admin dashboard
│   │   ├── addrule.jsx              # Add NLP rules
│   │   ├── addpostag.jsx            # Add part-of-speech tags
│   │   ├── addvoc.jsx               # Add vocabulary
│   │   ├── ValidateScreen.jsx       # Validate NLP configurations
│   │   ├── SettingsAdmin.jsx        # Admin settings
│   │   ├── SeeAllBlinds.jsx         # View all blind users
│   │   └── SeeAllAssistants.jsx     # View all assistants
│   ├── Assistant/
│   │   ├── MainScreen.jsx           # Assistant dashboard
│   │   ├── addperson.jsx            # Add contact person
│   │   └── interactionlog.jsx       # View interaction logs
│   ├── Services/
│   │   ├── WakeWordDetection.js     # Wake word listening (sends audio to backend)
│   │   ├── TextToSpeech.js          # TTS functionality
│   │   ├── AudioRecording.js        # Audio recording with silence detection
│   │   ├── ImagePicker.js           # Camera and gallery image selection
│   │   ├── AutoCamera.js            # Automatic camera capture component
│   │   └── Permissions.js           # Handle app permissions
│   └── Apis.jsx                     # API endpoints and Axios instance
├── porcupineservice.js              # Wake word detection service (Picovoice)
├── ttsService.js                    # Text-to-speech service
└── package.json                     # Dependencies and scripts
```

---

## 🛠️ Technology Stack

### Core Framework
- **React Native** (v0.82.1) - Mobile app development
- **React** (v19.1.1) - UI framework
- **React Navigation** (v7.x) - Navigation between screens

### Voice & Audio
- **@picovoice/porcupine-react-native** (v4.0.0) - Wake word detection
- **react-native-tts** - Text-to-speech
- **react-native-audio-record** - Audio recording
- **@react-native-speech** - Speech processing

### Vision & Media
- **react-native-vision-camera** (v4.7.3) - Camera access
- **react-native-image-picker** (v8.2.1) - Image selection

### Backend Communication
- **Axios** (v1.13.2) - HTTP requests

### Build Tools
- **Babel** - JavaScript transpiler
- **Jest** - Testing framework
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📋 Service Documentation

### Wake Word Detection (`WakeWordDetection.js`)
```javascript
listenForWakeWord(duration = 4000) // Records audio and sends to backend
// Returns: Command string (e.g., "ask", "continue", "temporal", "back")
```
- Records audio for a specified duration
- Sends to backend endpoint `/audio/voice/command`
- Backend identifies wake words/commands
- **Customizable**: Backend controls which words are recognized

### Text-to-Speech (`TextToSpeech.js`)
```javascript
speakText(text, onFinish = null) // Speaks text using TTS
removeTtsListener()               // Cleanup TTS listeners
```

### Audio Recording (`AudioRecording.js`)
- Records audio in WAV format (16kHz, mono, 16-bit)
- `recordAudio(duration)` - Records for specified duration
- `recordAudioUntilSilence()` - Records until silence is detected

### Camera (`AutoCamera.js` & `ImagePicker.js`)
- Auto-capture: Continuously captures images for temporal analysis
- Manual capture: User selects images from camera or gallery

### Permissions (`Permissions.js`)
- Requests microphone access
- Requests camera access
- Requests file system access

---

## 🔌 API Endpoints

All APIs are defined in `Screens/Apis.jsx` and configured to hit the backend server.

### Audio APIs
- `POST /audio/voice/command` - Wake word/command detection
- `POST /audio/transcribe` - Convert speech to text

### Answer Generation
- `POST /answers/getanswer/{blindId}` - Get AI answer for image + question

### NLP/CFG APIs (Admin)
- `POST /nlp/add-rule` - Add grammar rule
- `POST /nlp/get-pos-tags` - Get parts of speech
- `POST /nlp/add-vocabulary` - Add vocabulary word
- `GET /nlp/get-rules` - Retrieve rules
- `POST /nlp/validate` - Validate NLP configuration

### User Management
- `POST /users/login` - User login
- `POST /users/check-username` - Validate username
- `GET /users/assis` - Get all assistants
- `GET /users/blind-with-assistant` - Get blind users with assistants
- `POST /users/assis/create` - Register assistant
- `POST /users/blinds/create` - Register blind user

### Contact & History
- `POST /contacts/create-with-pics` - Add contact with photos
- `GET /contacts/user/{blindId}` - Get contacts
- `GET /history/getHistory/{assistantId}` - Get interaction history

---

## 🎬 Workflow: How It Works

### 1. **App Launch**
```
Home Screen (MainScreen.jsx)
  ↓ (Speaks: "Welcome to See For Me. Say start to continue")
  ↓ (Listens for wake word: "start")
  ↓
Main Blind Screen (BlindStartScreen.jsx)
```

### 2. **Main Blind Screen - 5-Second Loop**
```
1. Speaks: "Welcome to Main screen"
2. Listens for commands ("Ask", "Continue", "Temporal", "Back")
3. If user says "Ask":
   a. Captures image
   b. Records question (audio)
   c. Transcribes audio → text
   d. Sends image + question to backend
   e. Backend generates answer using NeuroSymbolic reasoning
   f. Speaks answer
   g. Returns to listening
```

### 3. **Temporal Mode - Fixed Camera**
```
1. Camera is fixed on one location
2. Every 5 seconds:
   a. Captures frame
   b. Sends frame to backend
   c. Backend analyzes for person presence/changes
   d. Speaks findings
3. Useful for monitoring doorways, desks, etc.
```

### 4. **Wake Words & Commands**
Wake words are **customizable in the backend**. Current examples:
- `"start"` - Begin the application
- `"ask"` - Capture image and ask a question
- `"continue"` - Ask another question about current image
- `"temporal"` - Switch to temporal mode
- `"back"` - Return to home

To change wake words: Modify the backend's wake word model/configuration.

---

## 📱 Installation & Setup

### Prerequisites
- Node.js >= 20
- React Native CLI
- Android SDK (for Android development)
- Xcode (for iOS development)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Bilal-73/NueroSymbolicVisualQuestionAnwering-FrontEnd.git
   cd NueroSymbolicVisualQuestionAnwering-FrontEnd
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend URL**
   Edit `ipconfig.js` and set your backend server URL:
   ```javascript
   const CONFIG = {
     LAN: "http://your-backend-url:port" // e.g., http://192.168.1.100:5000
   };
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   ```

6. **Start Metro Bundler**
   ```bash
   npm start
   ```

---

## 🔐 Configuration

### `ipconfig.js`
Contains the backend server URL:
```javascript
export default {
  LAN: "http://localhost:5000" // Change to your backend address
};
```

### Permissions (Android)
The app requires:
- `RECORD_AUDIO` - Microphone access
- `CAMERA` - Camera access
- `READ_EXTERNAL_STORAGE` - Access to photos
- `WRITE_EXTERNAL_STORAGE` - Save recordings

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Lint code
npm run lint
```

---

## 🚀 Key Components Deep Dive

### BlindStartScreen.jsx - Main Interface
**Core Functionality:**
- Initializes permissions on mount
- Starts wake word listening
- Handles "ask", "continue", "temporal", "back" commands
- Manages image capture (manual or automatic)
- Records questions and sends to backend
- Displays images, transcriptions, and AI answers

**5-Second Processing:**
The backend processes image + question pairs every 5 seconds for optimal temporal reasoning.

### Temporal.jsx - Environment Monitoring
**Core Functionality:**
- Fixes camera to a single location
- Captures frames at regular intervals
- Monitors for person/object presence
- Tracks changes across frames
- Useful for accessibility in workspaces, home security, etc.

---

## 🔄 Data Flow

```
User (Blind Person)
    ↓ (speaks: "Ask what's in front of me")
    ↓
WakeWordDetection → Backend identifies command
    ↓ ("ask" command detected)
    ↓
AutoCamera → Captures image
    ↓
AudioRecording → Records question
    ↓
TextToSpeech → (optional) Confirms recording
    ↓
transcribeAudioAPI → Backend transcribes audio
    ↓
getAnswerAPI → Backend:
    • Analyzes image (vision)
    • Parses question (NLP/CFG)
    • Applies neuro-symbolic reasoning
    • Generates answer
    ↓
TextToSpeech → Speaks answer to user
    ↓
Back to wake word listening
```

---

## 📊 Application Modes

| Mode | Purpose | Duration | Use Case |
|------|---------|----------|----------|
| **Main Blind Screen** | Answer questions about current view | On-demand | General assistance |
| **Temporal Mode** | Monitor environment changes | Every 5 seconds | Security, presence detection |
| **Admin Mode** | Configure NLP/CFG rules | Configuration time | System setup |
| **Assistant Mode** | Manage contacts & interactions | Administration | Support staff |

---

## 🎓 How Blind Users Interact

1. **Open App** → App says "Welcome to See For Me"
2. **Say "Start"** → App initializes blind mode
3. **Say "Ask"** → App captures image and waits for question
4. **Ask Question** (e.g., "What color is my shirt?") → App processes and responds
5. **Say "Continue"** → Ask another question about same image
6. **Say "Temporal"** → Switch to environment monitoring mode
7. **Say "Back"** → Return to home screen

All communication is **hands-free and voice-based** for complete accessibility.

---

## 📝 Customization

### Wake Words
To add/change wake words, configure them in the backend repository:
- Modify the Porcupine wake word model
- Update the voice command recognition service
- Restart the backend

### Temporal Analysis Interval
Edit the 5-second timing in `BlindStartScreen.jsx` or `Temporal.jsx` if needed.

### TTS Voice & Language
Configure in the backend's text-to-speech service.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Microphone not working | Check permissions, restart app |
| Can't connect to backend | Verify backend URL in `ipconfig.js`, ensure backend is running |
| Wake words not detected | Speak clearly, check backend wake word configuration |
| Image capture fails | Grant camera permission, check device storage |
| TTS not working | Ensure language pack is installed on device |

---

## 📄 License

[Add your license information here]

---

## 👥 Contributing

Contributions are welcome! Please follow the existing code style and submit pull requests to the main repository.

---

## 📞 Support

For issues, questions, or feature requests:
- **Frontend Issues**: Open an issue on this repository
- **Backend Issues**: Visit [NueroSymbolicVisualQuestionAnswering-Backend](https://github.com/Bilal-73/NueroSymbolicVisualQuestuonAnswering-Backend)

---

## 🎯 Future Enhancements

- [ ] Offline mode with local models
- [ ] Multi-language support
- [ ] Advanced gesture recognition
- [ ] Emotion detection from voice
- [ ] AR-based navigation
- [ ] Integration with wearable devices

---

**Built with ❤️ for accessibility and inclusion**

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
