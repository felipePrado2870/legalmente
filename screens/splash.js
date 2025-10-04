import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export default function SplashScreen({ navigation }) {
  const iconScale = useRef(new Animated.Value(0.8)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current; // Animação de escala para o título
  const iconTranslateY = useRef(new Animated.Value(0)).current; // Animação de movimento da imagem
  const glowScale = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 3500); // 3,5 segundos

      return () => clearTimeout(timer); // limpa o timer ao sair da tela
    }, [navigation])
  );

  useEffect(() => {
    // Animação do ícone (opacidade e escala)
    Animated.timing(iconOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(iconScale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Animação de movimento da imagem para cima e para baixo
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconTranslateY, {
          toValue: 20, // Mover 20 unidades para baixo
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconTranslateY, {
          toValue: -20, // Mover 20 unidades para cima
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação do título (opacidade, translação e escala)
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

    // Animação de brilho contínuo
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

    // Finalizar splash após 3.5s
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3500);

    return () => glowAnimation.stop();
  }, [navigation]);

  return (
    <LinearGradient colors={['#A67C7C', '#8B4A52', '#5D252A']} style={styles.container}>
      {/* Efeito de brilho */}
      <Animated.View
        style={[
          styles.glowEffect,
          {
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {/* Ícone com animação de movimento para cima e para baixo */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: iconOpacity,
            transform: [
              { scale: iconScale },
              { translateY: iconTranslateY }, // Movimento vertical da imagem
            ],
          },
        ]}
      >
        <View style={styles.circleBackgroundInner}>
          <Image source={require('../assets/splash1.png')} style={styles.icon} resizeMode="cover" />
        </View>
      </Animated.View>

      {/* Título com animações de opacidade, translação e aumento de escala */}
      <Animated.Text
        style={[
          styles.titulo,
          {
            opacity: titleOpacity,
            transform: [
              { translateY: titleTranslateY },
              { scale: titleScale }, // Aumento do tamanho do texto
            ],
          },
        ]}
      >
        DIREITO DA FAMÍLIA
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  glowEffect: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  circleBackgroundInner: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  titulo: {
    fontSize: 30,
    color: '#ffffffff',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

