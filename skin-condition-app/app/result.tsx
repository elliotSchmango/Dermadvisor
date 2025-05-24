import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

//for dynamic descriptions
const classDescriptions: Record<string, string> = {
  Acne: "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells.",
  Cellulitis: "Cellulitis is a bacterial skin infection that causes redness, swelling, and tenderness, often with fever.",
  Eczema: "Eczema is a condition that causes the skin to become inflamed, itchy, red, cracked, and rough.",
  Fungal: "Fungal infections are caused by fungi and can affect the skin, nails, and other body parts, often appearing as red, itchy patches.",
};

async function uriToBase64(uri: string): Promise<string> {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}

export default function Result() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await fetch("http://192.168.1.89:3000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: await uriToBase64(uri.toString()) }),
        });
  
        const data = await res.json();
        const classNames = ["Acne", "Cellulitis", "Eczema", "Fungal"];
        setDiagnosis(classNames[data.prediction]);
      } catch (err) {
        console.error("Prediction failed", err);
        setDiagnosis("Error");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPrediction();
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
          {diagnosis && (
            <Text style={styles.explanationText}>
              {classDescriptions[diagnosis]}
            </Text>
          )}

          <TouchableOpacity onPress={() => 
            router.push({
                pathname: '/info',
                params: { scrollTo: diagnosis?.toLowerCase() }, //dynamic now
              })         
          }>
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
