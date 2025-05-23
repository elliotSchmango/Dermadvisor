import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Result() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  

  useEffect(() => {
    const simulateAnalysis = setTimeout(() => {
      setDiagnosis('Eczema');
      setLoading(false);
    }, 3000); //placeholder time wait for now

    return () => clearTimeout(simulateAnalysis);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </>
      ) : (
        <>
          {uri && (
            <Image source={{ uri: uri.toString() }} style={styles.image} />
          )}
          <Text style={styles.resultText}>Diagnosis: {diagnosis}</Text>
          <Text style={styles.explanationText}>Eczema is a condition that causes the skin to become inflamed or irritated.</Text>

          <TouchableOpacity onPress={() => router.push('/info')}>
            <Text style={styles.link}>Take me to description</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.exit}>
            <Text style={styles.exitText}>X</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
  resultText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  explanationText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  link: { color: '#007AFF', textDecorationLine: 'underline', fontSize: 16 },
  loadingText: { marginTop: 10, fontSize: 16 },
  exit: { position: 'absolute', top: 40, right: 20 },
  exitText: { fontSize: 22, fontWeight: 'bold' }
});
