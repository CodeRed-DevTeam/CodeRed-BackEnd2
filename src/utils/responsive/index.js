// src/utils/responsive.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Function to adjust font sizes based on screen width
export const scaleFont = (size) => size * (SCREEN_WIDTH / 375);

// Responsive width & height
export const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;
