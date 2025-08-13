import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
  Image, Alert, ScrollView
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WatermarkEmbeding'>;

export default function WatermarkEmbedingScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [embeddingResult, setEmbeddingResult] = useState<string>('');

  const handleImageSelect = () => {
    Alert.alert(
      '이미지 선택',
      '갤러리에서 이미지를 선택하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '선택',
          onPress: () => {
            setSelectedImage(require('../assets/launch_screen.png'));
            setEmbeddingResult('');
          },
        },
      ]
    );
  };

  const handleWatermarkEmbedding = () => {
    if (!selectedImage) {
      Alert.alert('알림', '먼저 이미지를 선택해주세요.');
      return;
    }

    Alert.alert(
      '워터마크 삽입',
      '선택한 이미지에 워터마크를 삽입하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삽입',
          onPress: () => {
            setTimeout(() => {
              setEmbeddingResult('워터마크가 성공적으로 삽입되었습니다.');
            }, 2000);
          },
        },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>워터마크 삽입</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>이미지 선택</Text>
            <TouchableOpacity style={styles.imageSelectButton} onPress={handleImageSelect}>
              <Text style={styles.imageIcon}>🖼️</Text>
              <Text style={styles.imageSelectText}>이미지 선택하기</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>선택된 이미지</Text>
              <View style={styles.imageContainer}>
                <Image source={selectedImage} style={styles.selectedImage} resizeMode="contain" />
              </View>
            </View>
          )}

          {selectedImage && (
            <View style={styles.section}>
              <TouchableOpacity style={styles.embedButton} onPress={handleWatermarkEmbedding}>
                <Text style={styles.searchIcon}>💧</Text>
                <Text style={styles.embedButtonText}>워터마크 삽입하기</Text>
              </TouchableOpacity>
            </View>
          )}

          {embeddingResult && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>삽입 결과</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{embeddingResult}</Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>백엔드 연동 정보</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                • 이미지 업로드: POST /api/upload-image{'\n'}
                • 워터마크 삽입: POST /api/embed-watermark{'\n'}
                • 현재 상태: 시뮬레이션 모드
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191919' },
  placeholder: { width: 40 },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#191919', marginBottom: 15 },
  imageSelectButton: {
    borderWidth: 2, borderColor: '#007AFF', borderStyle: 'dashed',
    borderRadius: 12, padding: 40, alignItems: 'center', justifyContent: 'center',
  },
  imageSelectText: { fontSize: 16, color: '#007AFF', marginTop: 10, fontWeight: '600' },
  imageContainer: { alignItems: 'center' },
  selectedImage: {
    width: 300, height: 300, borderRadius: 12,
    borderWidth: 1, borderColor: '#eee',
  },
  embedButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#28a745', paddingVertical: 16,
    paddingHorizontal: 24, borderRadius: 12,
  },
  embedButtonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8,
  },
  resultContainer: {
    backgroundColor: '#f8f9fa', padding: 20,
    borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#28a745',
  },
  resultText: { fontSize: 14, color: '#191919', lineHeight: 20 },
  infoContainer: {
    backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12,
  },
  infoText: { fontSize: 14, color: '#666', lineHeight: 20 },
  backIcon: { fontSize: 24, color: '#191919', fontWeight: 'bold' },
  imageIcon: { fontSize: 32, color: '#007AFF' },
  searchIcon: { fontSize: 20, color: '#fff' },
});
