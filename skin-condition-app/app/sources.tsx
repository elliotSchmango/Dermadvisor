import { ScrollView, View, Text, StyleSheet, Linking } from 'react-native';

export default function SourcesPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Sources & Credits</Text>

      {/* 1. Information Citations */}
      <Text style={styles.header}>1. Citations for Condition Information</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.who.int')}>
        WHO (2023) – Eczema and Atopic Dermatitis
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.aad.org')}>
        AAD (2023) – Acne: Diagnosis and Treatment
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.cdc.gov/fungal/index.html')}>
        CDC (2022) – Fungal Diseases
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.mayoclinic.org')}>
        Mayo Clinic (2023) – Cellulitis
      </Text>

      {/* 2. Image Sources */}
      <Text style={styles.header}>2. Citations for Example Skin Condition Photos</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://dermnetnz.org/topics/atopic-dermatitis')}>
        DermNet NZ – Eczema Images
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.aad.org/public/diseases/acne/skin-photos')}>
        AAD – Acne Photo Gallery
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.cdc.gov/fungal/diseases/ringworm/images.html')}>
        CDC – Fungal Infection Images
      </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://medlineplus.gov/ency/article/000857.htm')}>
        MedlinePlus – Cellulitis
      </Text>

      {/* 3. Creator Info */}
      <Text style={styles.header}>3. About the Creator</Text>
      <Text style={styles.body}>
        This project was designed and developed solely by David Elliot Hong, a computer science undergraduate at the University of Virginia.
        With a personal investment in skin care and health, he created this tool in hopes that a minor concern doesn't need to justify an expensive hospital visit!
      </Text>
      <Text style={styles.body}>
        This app was built using React Native, Expo, AWS (S3, SageMaker, DynamoDB), and fine-tuned image classification ML models to classify skin conditions whilst
        emphasizing diversity across skin tones.
      </Text>
      <Text style={styles.body}>
        GitHub: @elliotSchmango
      </Text>
      <Text style={styles.body}>
        Email: kyk4ge@virginia.edu
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  body: { fontSize: 16, lineHeight: 22, marginBottom: 12 },
  link: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
});
