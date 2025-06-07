import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Circle, Rect, G, Ellipse } from 'react-native-svg';

export const WelcomeIllustration = () => {
  return (
    <View style={styles.container}>
      <Svg width="300" height="300" viewBox="0 0 300 300">
        <Circle cx="150" cy="150" r="120" fill="#E6F7E8" />
        
        <G transform="translate(60, 140)">
          <Rect x="40" y="30" width="120" height="40" rx="10" fill="#41B54A" />
          <Circle cx="60" cy="70" r="20" fill="#333" />
          <Circle cx="60" cy="70" r="8" fill="#666" />
          <Circle cx="140" cy="70" r="20" fill="#333" />
          <Circle cx="140" cy="70" r="8" fill="#666" />
          <Rect x="150" y="20" width="30" height="20" rx="5" fill="#41B54A" />
          <Rect x="130" y="10" width="20" height="5" rx="2" fill="#333" />
          <Path d="M40,50 C40,40 60,40 70,50" stroke="#333" strokeWidth="3" fill="none" />
        </G>
        
        <G transform="translate(100, 100)">
          <Circle cx="50" cy="30" r="20" fill="#FF9F43" />
          <Rect x="30" y="50" width="40" height="50" rx="10" fill="#41B54A" />
          <Rect x="30" y="100" width="15" height="25" fill="#4267B2" />
          <Rect x="55" y="100" width="15" height="25" fill="#4267B2" />
          <Circle cx="43" cy="25" r="3" fill="#333" />
          <Circle cx="57" cy="25" r="3" fill="#333" />
          <Path d="M43,35 C45,38 55,38 57,35" stroke="#333" strokeWidth="2" fill="none" />
        </G>
        
        <G transform="translate(170, 110)">
          <Path d="M0,20 C0,10 40,10 40,20 L35,50 L5,50 Z" fill="#FF6B6B" />
          <Circle cx="10" cy="25" r="5" fill="#FFCC5C" />
          <Circle cx="20" cy="18" r="6" fill="#41B54A" />
          <Circle cx="30" cy="25" r="5" fill="#FF9F43" />
        </G>
      </Svg>
    </View>
  );
};

export const DeliveryOnDemandIllustration = () => {
  return (
    <View style={styles.container}>
      <Svg width="300" height="300" viewBox="0 0 300 300">
        <Circle cx="150" cy="150" r="120" fill="#E6F7E8" />
        
        <G transform="translate(90, 90)">
          <Circle cx="60" cy="60" r="60" fill="white" />
          <Circle cx="60" cy="60" r="55" fill="#41B54A" />
          <Circle cx="60" cy="60" r="50" fill="white" />
          
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = 60 + 45 * Math.sin(angle);
            const y1 = 60 - 45 * Math.cos(angle);
            const x2 = 60 + 50 * Math.sin(angle);
            const y2 = 60 - 50 * Math.cos(angle);
            return (
              <Path 
                key={i.toString()}
                d={`M${x1},${y1} L${x2},${y2}`} 
                stroke="#41B54A" 
                strokeWidth="2" 
              />
            );
          })}
          
          <Path d="M60,60 L60,30" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <Path d="M60,60 L90,60" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <Circle cx="60" cy="60" r="5" fill="#333" />
        </G>
        
        <G transform="translate(160, 140)">
          <Circle cx="30" cy="20" r="15" fill="#FF9F43" />
          <Rect x="15" y="35" width="30" height="35" rx="8" fill="#41B54A" />
          <Path d="M15,70 L25,100 M45,70 L35,100" stroke="#4267B2" strokeWidth="10" strokeLinecap="round" />
          <Circle cx="25" cy="18" r="2" fill="#333" />
          <Circle cx="35" cy="18" r="2" fill="#333" />
          <Path d="M25,24 C26,26 34,26 35,24" stroke="#333" strokeWidth="1" fill="none" />
        </G>
      </Svg>
    </View>
  );
};

export const FastPaymentIllustration = () => {
  return (
    <View style={styles.container}>
      <Svg width="300" height="300" viewBox="0 0 300 300">
        <Circle cx="150" cy="150" r="120" fill="#E6F7E8" />
        
        <G transform="translate(75, 100)">
          <Rect x="0" y="0" width="150" height="100" rx="10" fill="#41B54A" />
          <Rect x="10" y="20" width="130" height="60" rx="5" fill="#E6F7E8" />
          <Rect x="120" y="30" width="30" height="40" rx="5" fill="#41B54A" />
        </G>
        
        <G transform="translate(95, 80)">
          <Rect x="0" y="0" width="80" height="40" rx="5" fill="#43A047" />
          <Rect x="10" y="10" width="60" height="20" rx="5" fill="#FFFFFF" opacity="0.5" />
          <Circle cx="65" cy="20" r="12" fill="#FFFFFF" opacity="0.7" />
        </G>
        
        <G transform="translate(110, 90)">
          <Rect x="0" y="0" width="80" height="40" rx="5" fill="#388E3C" />
          <Rect x="10" y="10" width="60" height="20" rx="5" fill="#FFFFFF" opacity="0.5" />
          <Circle cx="65" cy="20" r="12" fill="#FFFFFF" opacity="0.7" />
        </G>
        
        <G transform="translate(140, 140)">
          <Circle cx="0" cy="0" r="15" fill="#FFC107" />
          <Circle cx="0" cy="0" r="10" fill="#FFA000" />
          <Circle cx="0" cy="0" r="5" fill="#FFC107" />
        </G>
        
        <G transform="translate(170, 155)">
          <Circle cx="0" cy="0" r="12" fill="#FFC107" />
          <Circle cx="0" cy="0" r="8" fill="#FFA000" />
          <Circle cx="0" cy="0" r="4" fill="#FFC107" />
        </G>
        
        <G transform="translate(140, 135)">
          <Path d="M0,10 L0,-10 M-5,5 L5,5 M-5,-5 L5,-5" stroke="#333" strokeWidth="2" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}); 