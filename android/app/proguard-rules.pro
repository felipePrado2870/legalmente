# --- React Native ---
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.proguard.annotations.** { *; }

# Keep MainActivity
-keep class com.legalmente.MainActivity { *; }

# Keep ReactPackage classes
-keep class * implements com.facebook.react.ReactPackage { *; }

# Keep Parcelable classes
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep annotations
-keepattributes *Annotation*

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep enums
-keepclassmembers enum * { *; }

# Optional: if you use OkHttp or other libraries
-dontwarn okhttp3.**
-keep class okhttp3.** { *; }
