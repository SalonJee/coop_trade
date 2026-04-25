import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRole } from '@/RoleContext';

const farmerTasks = [
  { title: 'Harvest ready', value: '24 crates', subtitle: 'Vegetables, fruits, and grains' },
  { title: 'Pickup schedule', value: 'Tomorrow 08:00', subtitle: 'Awaiting distributor confirmation' },
  { title: 'Field status', value: 'Healthy', subtitle: 'Moisture 62% · Quality A' },
];

const produceList = [
  { name: 'Tomatoes', quantity: '12 crates', eta: '24 hours' },
  { name: 'Maize', quantity: '8 sacks', eta: '48 hours' },
  { name: 'Mangoes', quantity: '5 boxes', eta: '72 hours' },
];

export default function FarmerScreen() {
  const router = useRouter();
  const { role, logout } = useRole();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [cropName, setCropName] = useState('');
  const [weight, setWeight] = useState('');
  const [sent, setSent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (role === 'distributor') {
      router.replace('/distributor');
      return;
    }
    if (role === null) {
      router.replace('/');
      return;
    }
  }, [role, router, isMounted]);

  const openCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert('Camera permission required', 'Please allow camera access to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.6,
    });

    if (result.canceled || result.assets.length === 0) {
      return;
    }

    setImageUri(result.assets[0].uri);
    setSent(false);
  };

  const handleSend = () => {
    if (!cropName.trim() || !weight.trim() || !imageUri) {
      Alert.alert('Complete the form', 'Please enter crop name, weight, and take a photo of the produce.');
      return;
    }

    setSent(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.headerCard}>
        <View style={styles.headerRow}>
          <ThemedText type="title">Farmer dashboard</ThemedText>
          <TouchableOpacity style={styles.logoutButton} onPress={() => { logout(); router.replace('/'); }}>
            <ThemedText type="defaultSemiBold">Logout</ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.headerText}>
          Enter the crop details, capture a photo of the harvest, and send the product data to the supply chain.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Quick summary</ThemedText>
        <View style={styles.row}>
          {farmerTasks.map((item) => (
            <ThemedView key={item.title} style={styles.statCard}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={styles.statValue}>{item.value}</ThemedText>
              <ThemedText>{item.subtitle}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Producer input</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Crop name (e.g. Tomatoes)"
          value={cropName}
          onChangeText={setCropName}
          placeholderTextColor="#6D7A88"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight in kg"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor="#6D7A88"
        />
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <ThemedText type="defaultSemiBold">Open camera</ThemedText>
        </TouchableOpacity>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <ThemedView style={styles.previewPlaceholder}>
            <ThemedText>Photo preview will appear here after capture.</ThemedText>
          </ThemedView>
        )}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <ThemedText type="defaultSemiBold">Send product data</ThemedText>
        </TouchableOpacity>
        {sent && <ThemedText style={styles.sentText}>Product data sent successfully.</ThemedText>}
        <ThemedText style={styles.noteText}>
          Your producer entry is complete when the crop name, weight, and photo are submitted.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Current produce</ThemedText>
        {produceList.map((item) => (
          <ThemedView key={item.name} style={styles.produceCard}>
            <View style={styles.produceHeader}>
              <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              <ThemedText>{item.quantity}</ThemedText>
            </View>
            <ThemedText style={styles.produceSubtitle}>Ready in {item.eta}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  headerCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#D8EEF6',
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#5E8CA8',
  },
  headerText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F3F8FB',
  },
  statValue: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  cameraButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#0A7EA4',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 18,
  },
  previewPlaceholder: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#F3F8FB',
    alignItems: 'center',
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FBFD',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#11181C',
  },
  sendButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#22A699',
    alignItems: 'center',
  },
  sentText: {
    color: '#1F6F61',
    marginTop: 8,
  },
  noteText: {
    color: '#5B6A73',
    fontSize: 14,
    lineHeight: 20,
  },
  produceCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F9F4E9',
    gap: 8,
  },
  produceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  produceSubtitle: {
    marginTop: 4,
    color: '#4C5568',
  },
});
