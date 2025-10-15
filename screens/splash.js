import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export default function SplashScreen({ navigation }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    require('../assets/IconUGV.png'),
    require('../assets/IconSoftware.png'),
    require('../assets/IconDireito.png'),
    require('../assets/IconLegalmete.png'),
  ];

  // 🎬 Animações
  const iconScale = useRef(new Animated.Value(0.8)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current; // NOVO
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      setCurrentImage(0);

      iconScale.setValue(0.8);
      iconOpacity.setValue(0);
      titleOpacity.setValue(0);
      titleTranslateY.setValue(20);
      titleScale.setValue(0.8);
      glowScale.setValue(1);

      // Animação de entrada
      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]).start();

      // Movimento flutuante do ícone
      Animated.loop(
        Animated.sequence([
          Animated.timing(iconTranslateY, {
            toValue: 20,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(iconTranslateY, {
            toValue: -20,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Texto aparecendo
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(titleTranslateY, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(titleScale, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start();
      }, 500);

      // Brilho contínuo
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowScale, {
            toValue: 1.1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(glowScale, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      );
      glowAnimation.start();

      // Rotação contínua
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();

      // 🔄 Transição fluida entre imagens
      const interval = setInterval(() => {
       Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // troca a imagem depois que o fadeOut termina
        setCurrentImage((prev) => (prev + 1) % images.length);

        // agora faz o fadeIn
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
      }, 1200);

      // ⏩ Navega pra Home no final
      const endTimer = setTimeout(() => {
        clearInterval(interval);
        navigation.navigate('Home');
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(endTimer);
        glowAnimation.stop();
      };
    }, [navigation])
  );

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={['#A67C7C', '#8B4A52', '#5D252A']} style={styles.container}>
      {/* Brilho */}
      <Animated.View style={[styles.glowEffect, { transform: [{ scale: glowScale }] }]} />

      {/* Ícone principal */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: iconOpacity,
            transform: [{ scale: iconScale }, { translateY: iconTranslateY }],
          },
        ]}
      >
        <Animated.Image
          source={images[currentImage]}
          style={[styles.icon, { opacity: imageOpacity }]}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Loading girando */}
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.loaderCircle, { transform: [{ rotate: rotateInterpolate }] }]}
        />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>

      {/* Título */}
      <Animated.Text
        style={[
          styles.titulo,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }, { scale: titleScale }],
          },
        ]}
      >
        DIREITO DA FAMÍLIA
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  glowEffect: { position: 'absolute', width: 140, height: 140, borderRadius: 70 },
  iconWrapper: { alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  icon: { width: 250, height: 250, borderRadius: 20 },
  loadingContainer: { alignItems: 'center', marginBottom: 10 },
  loaderCircle: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    borderRadius: 20,
    marginBottom: 8,
  },
  loadingText: { color: '#fff', fontSize: 16 },
  titulo: { fontSize: 30, color: '#fff', marginTop: 10, fontWeight: 'bold' },
});
