import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
  Image, Alert, ScrollView, ActivityIndicator
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WatermarkDetection'>;

export default function WatermarkDetectionScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [detectionResult, setDetectionResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageSelect = () => {
    Alert.alert(
      '이미지 선택',
      '워터마크가 삽입된 이미지를 서버에서 불러오시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '불러오기',
          onPress: async () => {
            setLoading(true);

            // 🔧 실제 백엔드에서 이미지 가져오는 부분 (주석 처리)
            /*
            try {
              const response = await fetch('프로필 페이지에서 워터마크 삽입했던 사진 불러오는 api');
              const imageBlob = await response.blob();
              const imageUri = URL.createObjectURL(imageBlob);
              setSelectedImage({ uri: imageUri });
            } catch (error) {
              Alert.alert('에러', '이미지를 불러오지 못했습니다.');
            }
            */

            // 시뮬레이션용 로컬 이미지 사용
            setTimeout(() => {
              setSelectedImage(require('../assets/launch_screen.png'));
              setDetectionResult('');
              setLoading(false);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleWatermarkDetection = () => {
    if (!selectedImage) {
      Alert.alert('알림', '먼저 이미지를 선택해주세요.');
      return;
    }

    Alert.alert(
      '워터마크 검출',
      '워터마크를 검출하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '검출',
          onPress: () => {
            setLoading(true);
            /*
            fetch('워터마크 검출 api', {
              method: 'POST',
              body: JSON.stringify({ imageUri: selectedImage.uri }),
              headers: { 'Content-Type': 'application/json' },
            })
              .then(res => res.json())
              .then(data => {
              // 일부러 로딩 3초 추가
                setTimeout(() => {
                  setDetectionResult(data.result);
                  setLoading(false);
                }, 3000);
              })
              .catch(() => {
                Alert.alert('에러', '검출 실패');
              })
              .finally(() => setLoading(false));
            */

            // 시뮬레이션 결과 임시 ㅇㅇㅇㅇㅇㅇㅇ 위에 연동하면 뺄거거
            setTimeout(() => {
              const result = [
                '워터마크가 검출되었습니다.',
                '검출된 워터마크: "HACKERTON 2024"',
                '신뢰도: 95%',
                '위치: 이미지 우상단'
              ];
              setDetectionResult(result.join('\n'));
              setLoading(false);
            }, 4000);
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
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>워터마크 검출</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* 이미지 선택 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>이미지 선택</Text>
            <TouchableOpacity style={styles.imageSelectButton} onPress={handleImageSelect}>
              <Text style={styles.imageIcon}>🖼️</Text>
              <Text style={styles.imageSelectText}>사진 불러오기</Text>
            </TouchableOpacity>
          </View>

          {/* 로딩 스피너 */}
          {loading && (
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={{ marginTop: 10 }}>처리 중입니다...</Text>
            </View>
          )}

          {/* 이미지 표시 */}
          {selectedImage && !loading && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>선택된 이미지</Text>
              <View style={styles.imageContainer}>
                <Image source={selectedImage} style={styles.selectedImage} resizeMode="contain" />
              </View>
            </View>
          )}

          {/* 검출 버튼 */}
          {selectedImage && !loading && (
            <View style={styles.section}>
              <TouchableOpacity style={styles.detectionButton} onPress={handleWatermarkDetection}>
                <Text style={styles.searchIcon}>🔍</Text>
                <Text style={styles.detectionButtonText}>워터마크 검출하기</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 결과 표시 */}
          {detectionResult && !loading && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>검출 결과</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{detectionResult}</Text>
              </View>
            </View>
          )}

          {/* 정보 표시 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>백엔드 연동 정보</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                • 이미지 다운로드: GET /api/watermarked-image{'\n'}
                • 워터마크 검출: POST /api/detect-watermark{'\n'}
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
    width: 300, height: 300, borderRadius: 12, borderWidth: 1, borderColor: '#eee',
  },
  detectionButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#007AFF', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12,
  },
  detectionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  resultContainer: {
    backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12,
    borderLeftWidth: 4, borderLeftColor: '#28a745',
  },
  resultText: { fontSize: 14, color: '#191919', lineHeight: 20 },
  infoContainer: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12 },
  infoText: { fontSize: 14, color: '#666', lineHeight: 20 },
  backIcon: { fontSize: 24, color: '#191919', fontWeight: 'bold' },
  imageIcon: { fontSize: 32, color: '#007AFF' },
  searchIcon: { fontSize: 20, color: '#fff' },
});