// config.js
const CONFIG = {
  // For emulator (Android Studio, same PC as server)
  EMULATOR: "http://10.0.2.2:5000",

  // For same Wi-Fi LAN (real device + PC on same network)
  // LAN: "http://192.168.0.101:5000", // replace with your PC's IP

  // For ngrok (public URL)
  NGROK: "https://abcd-1234.ngrok-free.app",

  LAN : 'http://localhost:5000'
  // LAN :"http://192.168.137.1:5000"
  // LAN:" http://192.168.100.144:5000"

  // LAN :'http://192.168.0.103:5000',

};

// 👇 choose which one you want active


export default CONFIG;
