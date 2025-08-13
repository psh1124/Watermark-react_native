import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const photos = [
  { id: '1', source: require('../assets/asian.jpg') },
  { id: '2', source: require('../assets/asian2.jpg') },
];

export default function GalleryTemporary() {
  const renderItem = ({ item }: any) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>갤러리</Text>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  list: { paddingHorizontal: 20 },
  imageContainer: {
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#f0f0f0',
  },
  image: { width: '100%', height: '100%' },
});
