import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="upload" options={{ title: 'Upload' }} />
      <Tabs.Screen name="camera" options={{ title: 'Camera' }} />
      <Tabs.Screen name="info" options={{ title: 'Info' }} />
      <Tabs.Screen name="sources" options={{ title: 'Sources' }} />
    </Tabs>
  );
}
