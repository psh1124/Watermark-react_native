import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  SafeAreaView, StatusBar, Alert,
  Dimensions, StyleSheet, ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
<<<<<<< HEAD
=======
import { API_BASE } from '../config/api.ts';
>>>>>>> b57a04d (cmd오류 해결중, 로그인 api)

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation, route }: Props) {
  const { friend } = route.params;

  const [profileImage, setProfileImage] = useState<string | object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      setLoading(true);
      /*
      // 백엔드 연동 시 주석 해제
      const response = await fetch(`프로필 사진 받아오기 api`);
      const data = await response.json();
      setProfileImage(data.imageUrl);
      */
      setProfileImage(friend.avatar);
    } catch (error) {
      console.error('프로필 이미지 로드 실패:', error);
      setProfileImage(friend.avatar);
    } finally {
      setLoading(false);
    }
  };

=======
    setProfileImage(friend.avatar);
  }, []);

>>>>>>> b57a04d (cmd오류 해결중, 로그인 api)
  const getImageSource = (): ImageSourcePropType => {
    if (!profileImage) {
      return require('../assets/launch_screen.png');
    }
    if (typeof profileImage === 'string') {
      return { uri: profileImage };
    }
    if (typeof profileImage === 'object' && 'uri' in profileImage) {
      if (typeof (profileImage as any).uri === 'string') {
        return profileImage as ImageSourcePropType;
      }
    }
    return require('../assets/launch_screen.png');
  };

<<<<<<< HEAD
  const handleDownload = () => {
    Alert.alert(
      '다운로드',
      `${friend.name}의 프로필 사진에 워터마크를 삽입하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              setLoading(true);
              await new Promise(resolve => setTimeout(resolve, 3000));
              /*
              const response = await fetch('워터마크 삽입 api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: friend.id,
                  imageUrl: profileImage,
                }),
              });
              const result = await response.json();

              if (result.success && result.watermarkedImageUrl) {
                setProfileImage(result.watermarkedImageUrl);
                Alert.alert('완료', '워터마크가 삽입된 프로필 사진으로 변경되었습니다.');
              } else {
                Alert.alert('실패', '워터마크 삽입에 실패했습니다.');
              }
              */
              Alert.alert('완료', '워터마크 삽입 완료 (임시)');
            } catch (error) {
              console.error('워터마크 API 호출 실패:', error);
              Alert.alert('오류', '워터마크 삽입 중 오류가 발생했습니다.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };
=======


  const handleDownload = () => {
  Alert.alert(
    '다운로드',
    `${friend.name}의 프로필 사진에 워터마크를 삽입하시겠습니까?`,
    [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            setLoading(true);

            const formData = new FormData();
            formData.append('watermarkData', friend.name);
            // @ts-ignore
            formData.append('imgfile', {
              uri: typeof profileImage === 'string' ? profileImage : (profileImage as any).uri,
              type: 'image/jpeg',
              name: 'profile.jpg',
            });

            const response = await fetch(`${API_BASE}/4768b05aa6df12a2ddad4c3a58ad2da2/EmbedWaterMark`, {
              method: 'POST',
              body: formData,
            });

            const result = await response.json();

            if (result.success && result.watermarkedImageUrl) {
              setProfileImage(result.watermarkedImageUrl);
              Alert.alert('완료', '워터마크가 삽입된 프로필 사진으로 변경되었습니다.');
            } else {
              Alert.alert('실패', '워터마크 삽입에 실패했습니다.');
            }
          } catch (error) {
            console.error('워터마크 API 호출 실패:', error);
            Alert.alert('오류', '워터마크 삽입 중 오류가 발생했습니다.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]
  );
};

>>>>>>> b57a04d (cmd오류 해결중, 로그인 api)

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
          <Text style={styles.headerTitle}>{friend.name}</Text>
          <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
            <Text style={styles.downloadIcon}>💾</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Image
              source={getImageSource()}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.friendName}>{friend.name}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.downloadButtonLarge} onPress={handleDownload}>
            <Text style={styles.downloadButtonIcon}>⬇</Text>
            <Text style={styles.downloadButtonText}>워터마크 삽입 및 다운로드</Text>
          </TouchableOpacity>
        </View>
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
  backButton: { padding: 10 },
  downloadButton: { padding: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#191919' },
  imageContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f0f0f0',
    borderRadius: 20, margin: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 5,
  },
  profileImage: { width: width * 0.8, height: width * 0.8, borderRadius: 15 },
  nameContainer: { paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
  friendName: { fontSize: 24, fontWeight: 'bold', color: '#191919' },
  buttonContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  downloadButtonLarge: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#007AFF', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12,
  },
  downloadButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
  backIcon: { fontSize: 30, color: '#191919', fontWeight: 'bold' },
  downloadIcon: { fontSize: 20, color: '#191919' },
  downloadButtonIcon: { fontSize: 20, color: '#fff' },
});
