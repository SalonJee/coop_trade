import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRole } from '@/RoleContext';

const orderRequests = [
  { title: 'Tomatoes', quantity: '12 crates', status: 'Awaiting pickup' },
  { title: 'Maize', quantity: '8 sacks', status: 'Ready for dispatch' },
  { title: 'Mangoes', quantity: '5 boxes', status: 'Quality check' },
];

const distributorStats = [
  { title: 'Pending orders', value: '3', subtitle: 'Awaiting farmer confirmation' },
  { title: 'Inventory', value: '29 items', subtitle: 'Fresh produce in warehouse' },
  { title: 'Next delivery', value: 'Today 15:00', subtitle: 'Local market route' },
];

export default function DistributorScreen() {
  const router = useRouter();
  const { role, logout } = useRole();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (role === 'farmer') {
      router.replace('/farmer');
      return;
    }
    if (role === null) {
      router.replace('/');
    }
  }, [role, router, isMounted]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.headerCard}>
        <ThemedText type="title">Distributor dashboard</ThemedText>
        <TouchableOpacity style={styles.logoutButton} onPress={() => { logout(); router.replace('/'); }}>
          <ThemedText type="defaultSemiBold">Logout</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Current status</ThemedText>
        {distributorStats.map((item) => (
          <ThemedView key={item.title} style={styles.statCard}>
            <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
            <ThemedText style={styles.statValue}>{item.value}</ThemedText>
            <ThemedText>{item.subtitle}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Order requests</ThemedText>
        {orderRequests.map((order) => (
          <ThemedView key={order.title} style={styles.orderCard}>
            <ThemedText type="defaultSemiBold">{order.title}</ThemedText>
            <ThemedText>{order.quantity}</ThemedText>
            <ThemedText style={styles.orderStatus}>{order.status}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Next steps</ThemedText>
        <ThemedView style={styles.actionCard}>
          <ThemedText type="defaultSemiBold">Confirm pickup slot</ThemedText>
          <ThemedText>Approve the farmer's requested collection time and route.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.actionCard}>
          <ThemedText type="defaultSemiBold">Prepare invoices</ThemedText>
          <ThemedText>Generate shipment invoices for the next delivery batch.</ThemedText>
        </ThemedView>
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
    backgroundColor: '#E8F4EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#5E8CA8',
  },
  section: {
    gap: 12,
  },
  statCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F3F6F4',
    gap: 8,
  },
  statValue: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  orderCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFF7E6',
    gap: 8,
  },
  orderStatus: {
    marginTop: 6,
    color: '#5B6A73',
  },
  actionCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#E9F0FB',
    gap: 6,
  },
});
