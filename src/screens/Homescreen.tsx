import React, { useState, useEffect } from 'react';

import { StatusBar, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { API_BASE } from '../config/api.ts';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useNavigation } from '@react-navigation/native';
const localAvatar = require('../assets/launch_screen.png');

const updateFriends = [
  { id: '1', name: '김철수', avatar: require('../../android/app/src/main/res/drawable/img1.jpg') },
  { id: '2', name: '이영희', avatar: require('../../android/app/src/main/res/drawable/img2.jpg') },
];

const friends = [
  { id: '4', name: '최수진', status: '맛있는 점심 먹었어요!', avatar: require('../../android/app/src/main/res/drawable/img4.jpg') },
  { id: '5', name: '정우성', status: '운동 중입니다.', avatar: require('../../android/app/src/main/res/drawable/img5.jpg') },
  { id: '6', name: '한지민', status: '책 읽는 중이에요.', avatar: require('../../android/app/src/main/res/drawable/img6.jpg') },
  { id: '7', name: '오세훈', status: '주말 계획 세우기', avatar: require('../../android/app/src/main/res/drawable/img7.jpg') },
  { id: '8', name: '신예은', status: '잘 자요~', avatar: require('../../android/app/src/main/res/drawable/img8.jpg') },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  /*
  const [userProfileImageUrl, setUserProfileImageUrl] = useState('');
  const [userName, setUserName] = useState('박성훈'); // 기본값 임시 설정
  const [userStatus, setUserStatus] = useState('워터마크'); // 기본값 임시 설정

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('프로필 사진 백엔드 주소');
        const data = await res.json();
        setUserProfileImageUrl(data.profileImageUrl);
        setUserName(data.name);
        setUserStatus(data.status);
      } catch (err) {
        console.error('프로필 데이터 불러오기 실패:', err);
      }
    };

    fetchProfile();
  }, []);
  */
  const [loading, setLoading] = useState(false);

  const handleFriendPress = (friend: any) => {
    navigation.navigate('Profile', { friend });
  };

  const handleMyProfilePress = async () => {

    try {
      const response = await fetch(`${API_BASE}/4768b05aa6df12a2ddad4c3a58ad2da2/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'seonghun8368',
          password: 'qwer1234@!',
          fingerprint: '1111'
        }),
      });

      if (response.ok) {
        const textResponse = await response.text();
        if (textResponse === "Login successful") {
          // AsyncStorage.setItem("username", 'seonghun8368');
        }
        console.log("?")
      }

      const myProfile = {
        id: String('my'),
        name: String('박성훈'),
        status: String('워터마크'),
        avatar: null,
      };



      navigation.navigate('Profile', { friend: myProfile });
    } catch (err) {
      Alert.alert('로그인 실패', '아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* 상단 바 */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>친구</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.headerIconText}>🔍</Text>
            <Text style={styles.headerIconText}>👤+</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* 내 프로필 */}
          <TouchableOpacity style={styles.myProfile} onPress={handleMyProfilePress}>
            <Image
              style={styles.myAvatar}
              source={localAvatar}
            // source={userProfileImageUrl ? { uri: userProfileImageUrl } : localAvatar} // 백엔드 연동 시 사용
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.myName}>박성훈</Text>
              <Text style={styles.myStatus}>워터마크</Text>
              {/* <Text style={styles.myName}>{userName}</Text> 백엔드 연동 시 사용 */}
              {/* <Text style={styles.myStatus}>{userStatus}</Text> 백엔드 연동 시 사용 */}

            </View>
            <Text style={styles.chevronText}>›</Text>
          </TouchableOpacity>

          {/* 업데이트한 친구 */}
          <View style={styles.sectionBox}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>업데이트한 프로필 2</Text>
            </View>
            <FlatList
              data={updateFriends}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.updateFriendItem} onPress={() => handleFriendPress(item)}>
                  <Image style={styles.updateFriendAvatar} source={item.avatar} />
                  <Text style={styles.updateFriendName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* 생일인 친구 */}
          <View style={styles.sectionBox}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>생일인 친구</Text>
              <Text style={styles.smallChevronText}>›</Text>
            </View>
            <View style={styles.sectionContentRow}>
              <Text style={styles.sectionDesc}>친구의 생일을 확인해보세요!</Text>
              <Text style={styles.sectionCount}>999</Text>
            </View>
          </View>

          {/* 추천친구 */}
          <View style={styles.sectionBox}>
            <View style={styles.sectionContentRow}>
              <View style={styles.recommendAvatar} />
              <Text style={styles.sectionDesc}>새로운 친구를 만나보세요!</Text>
              <Text style={styles.sectionCount}>999</Text>
            </View>
          </View>

          {/* 친구 n명 */}
          <View style={styles.sectionBox}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>친구 999</Text>
            </View>
            {friends.map(friend => (
              <TouchableOpacity key={friend.id} style={styles.friendItem} onPress={() => handleFriendPress(friend)}>
                <Image style={styles.friendAvatar} source={friend.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendStatus}>{friend.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 하단 탭바 */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIcon}>👥</Text>
            <Text style={styles.tabLabel}>친구</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('WatermarkEmbeding')}>
            <Text style={styles.tabIconInactive}>➕</Text>
            <Text style={styles.tabLabelInactive}>삽입</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('WatermarkDetection')}>
            <Text style={styles.tabIconInactive}>🔍</Text>
            <Text style={styles.tabLabelInactive}>검출</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Gallery')}>
            <Text style={styles.tabIconInactive}>🖼️</Text>
            <Text style={styles.tabLabelInactive}>갤러리</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabIconInactive}>⋯</Text>
            <Text style={styles.tabLabelInactive}>더보기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 56,
    marginTop: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191919',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIconBtn: {
    marginLeft: 18,
  },
  headerIconText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#191919',
  },
  chevronText: {
    fontSize: 18,
    color: '#bbb',
    fontWeight: 'bold',
  },
  smallChevronText: {
    fontSize: 14,
    color: '#bbb',
    fontWeight: 'bold',
  },
  myProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#F6F6F6',
  },
  myAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#ccc',
  },
  myName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#191919',
  },
  myStatus: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  sectionBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#191919',
  },
  sectionContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionDesc: {
    fontSize: 10,
    color: '#888',
    flex: 1,
  },
  sectionCount: {
    fontSize: 13,
    color: '#bbb',
    marginLeft: 8,
  },
  updateFriendItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  updateFriendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  updateFriendName: {
    fontSize: 12,
    color: '#191919',
  },
  recommendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#b9a6f8',
    marginRight: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  friendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  friendName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#191919',
  },
  friendStatus: {
    fontSize: 12,
    color: '#888',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: '#191919',
    marginTop: 2,
    fontWeight: 'bold',
  },
  tabLabelInactive: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 20,
    color: '#191919',
  },
  tabIconInactive: {
    fontSize: 20,
    color: '#888',
  },
});