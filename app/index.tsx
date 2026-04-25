import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRole } from '@/RoleContext';

export default function LoginScreen() {
  const router = useRouter();
  const { role, loginAs } = useRole();

  useEffect(() => {
    if (role === 'farmer') {
      router.replace('/(tabs)/farmer' as any);
    }
    if (role === 'distributor') {
      router.replace('/(tabs)/distributor' as any);
    }
  }, [role, router]);

  const handleLogin = (selectedRole: 'farmer' | 'distributor') => {
    loginAs(selectedRole);
    router.replace((selectedRole === 'farmer' ? '/(tabs)/farmer' : '/(tabs)/distributor') as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText type="title">Select a role</ThemedText>
        <ThemedText style={styles.subtitle}>
          Login as a farmer or distributor to continue.
        </ThemedText>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin('farmer')}>
          <ThemedText type="defaultSemiBold">Login as Farmer</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => handleLogin('distributor')}>
          <ThemedText type="defaultSemiBold">Login as Distributor</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#E8F4F9',
    gap: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  button: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#0A7EA4',
    alignItems: 'center',
  },
  buttonSecondary: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#D3EAF5',
    alignItems: 'center',
  },
});
