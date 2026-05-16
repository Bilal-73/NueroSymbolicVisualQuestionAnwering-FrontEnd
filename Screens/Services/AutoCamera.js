// import React, { useEffect, useRef } from "react";
// import { View } from "react-native";
// import { Camera, useCameraDevices } from "react-native-vision-camera";

// export default function AutoCamera({ onCaptured }) {
//   const cameraRef = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     if (!device || !cameraRef.current) return;

//     const timer = setTimeout(async () => {
//       try {
//         const photo = await cameraRef.current.takePhoto({ flash: "off" });

//         onCaptured({
//           uri: "file://" + photo.path,
//           type: "image/jpeg",
//           fileName: "auto.jpg",
//         });
//       } catch (e) {
//         console.log("Auto capture error:", e);
//         onCaptured(null);
//       }
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [device]);

//   if (!device) return <View style={{ height: 400, justifyContent: "center", alignItems: "center" }} />;

//   return (
//     <Camera
//       ref={cameraRef}
//       style={{ flex: 1, width: "100%", height: "100%" }}
//       device={device}
//       isActive={true}
//       photo={true}
//     />
//   );
// }


//calude 

// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, ActivityIndicator } from "react-native";
// import { Camera, useCameraDevices } from "react-native-vision-camera";

// export default function AutoCamera({ onCaptured }) {
//   const cameraRef = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;
//   const [hasPermission, setHasPermission] = useState(false);

//   // Check camera permission
//   useEffect(() => {
//     const checkPermission = async () => {
//       console.log("[AutoCamera] Checking camera permission...");
//       const status = await Camera.getCameraPermissionStatus();
//       console.log("[AutoCamera] Permission status:", status);
      
//       // ✅ FIX: Don't request if already granted
//       if (status === "granted" || status === "authorized") {
//         console.log("[AutoCamera] Permission already granted");
//         setHasPermission(true);
//       } else {
//         console.log("[AutoCamera] Permission not granted, requesting...");
//         try {
//           const newStatus = await Camera.requestCameraPermission();
//           console.log("[AutoCamera] New permission status:", newStatus);
//           setHasPermission(newStatus === "granted" || newStatus === "authorized");
//         } catch (e) {
//           console.log("[AutoCamera] Permission request error:", e);
//           setHasPermission(false);
//         }
//       }
//     };

//     checkPermission();
//   }, []);

//   // Auto capture after delay
//   useEffect(() => {
//     if (!device || !cameraRef.current || !hasPermission) {
//       console.log("[AutoCamera] Not ready - device:", !!device, "ref:", !!cameraRef.current, "permission:", hasPermission);
//       return;
//     }

//     console.log("[AutoCamera] Starting 1.5s timer for auto capture...");
    
//     const timer = setTimeout(async () => {
//       try {
//         console.log("[AutoCamera] Taking photo...");
//         const photo = await cameraRef.current.takePhoto({ flash: "off" });
//         console.log("[AutoCamera] Photo captured:", photo.path);

//         onCaptured({
//           uri: "file://" + photo.path,
//           type: "image/jpeg",
//           fileName: "auto.jpg",
//         });
//       } catch (e) {
//         console.log("[AutoCamera] Capture error:", e);
//         onCaptured(null);
//       }
//     }, 1500);

//     return () => {
//       console.log("[AutoCamera] Cleaning up timer");
//       clearTimeout(timer);
//     };
//   }, [device, hasPermission]);

//   console.log("[AutoCamera] Render - device:", !!device, "permission:", hasPermission);

//   if (!hasPermission) {
//     return (
//       <View style={{ height: 400, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
//         <Text style={{ color: "#FFF" }}>Checking camera permission...</Text>
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View style={{ height: 400, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
//         <ActivityIndicator size="large" color="#FFF" />
//         <Text style={{ color: "#FFF", marginTop: 10 }}>Loading camera...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ width: "100%", height: 400 }}>
//       <Camera
//         ref={cameraRef}
//         style={{ flex: 1, width: "100%", height: "100%" }}
//         device={device}
//         isActive={true}
//         photo={true}
//       />
//     </View>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

export default function AutoCamera({ onCaptured }) {
  const cameraRef = useRef(null);
  
  // ✅ Use useCameraDevice instead of useCameraDevices
  const device = useCameraDevice('back');
  
  const [hasPermission, setHasPermission] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check camera permission
  useEffect(() => {
    const checkPermission = async () => {
      console.log("[AutoCamera] Checking camera permission...");
      const status = await Camera.getCameraPermissionStatus();
      console.log("[AutoCamera] Permission status:", status);
      
      if (status === "granted" || status === "authorized") {
        console.log("[AutoCamera] Permission already granted");
        setHasPermission(true);
      } else {
        console.log("[AutoCamera] Permission not granted, requesting...");
        try {
          const newStatus = await Camera.requestCameraPermission();
          console.log("[AutoCamera] New permission status:", newStatus);
          setHasPermission(newStatus === "granted" || newStatus === "authorized");
        } catch (e) {
          console.log("[AutoCamera] Permission request error:", e);
          setHasPermission(false);
        }
      }
    };

    checkPermission();
  }, []);

  // Wait for device to be ready
  useEffect(() => {
    if (device && hasPermission) {
      console.log("[AutoCamera] Device and permission ready, waiting 300ms...");
      const readyTimer = setTimeout(() => {
        console.log("[AutoCamera] Marking as ready");
        setIsReady(true);
      }, 300);
      
      return () => clearTimeout(readyTimer);
    }
  }, [device, hasPermission]);

  // Auto capture after everything is ready
  useEffect(() => {
    if (!isReady || !cameraRef.current) {
      console.log("[AutoCamera] Not ready for capture - isReady:", isReady, "ref:", !!cameraRef.current);
      return;
    }

    console.log("[AutoCamera] Starting 1.5s timer for auto capture...");
    
    const timer = setTimeout(async () => {
      try {
        console.log("[AutoCamera] Taking photo...");
        const photo = await cameraRef.current.takePhoto({ flash: "off" });
        console.log("[AutoCamera] Photo captured:", photo.path);

        onCaptured({
          uri: "file://" + photo.path,
          type: "image/jpeg",
          fileName: "auto.jpg",
        });
      } catch (e) {
        console.log("[AutoCamera] Capture error:", e);
        onCaptured(null);
      }
    }, 700);

    return () => {
      console.log("[AutoCamera] Cleaning up capture timer");
      clearTimeout(timer);
    };
  }, [isReady]);

  console.log("[AutoCamera] Render - device:", !!device, "permission:", hasPermission, "ready:", isReady);

  if (!hasPermission) {
    return (
      <View style={{ height: 400, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <Text style={{ color: "#FFF" }}>Checking camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={{ height: 400, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={{ color: "#FFF", marginTop: 10 }}>Loading camera device...</Text>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: 400, backgroundColor: "#000" }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1, width: "100%", height: "100%" }}
        device={device}
        isActive={true}
        photo={true}
      />
    </View>
  );
}