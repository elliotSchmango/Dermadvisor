import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, findNodeHandle, Linking, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function InfoScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const eczemaRef = useRef<View>(null);
  const acneRef = useRef<View>(null);
  const antifungalRef = useRef<View>(null);
  const cellulitisRef = useRef<View>(null);

  const { scrollTo } = useLocalSearchParams();

  //scroll to correct section on load (like bookmark links)
  React.useEffect(() => {
    const scrollTargetMap: Record<string, React.RefObject<View>> = {
      eczema: eczemaRef,
      acne: acneRef,
      antifungal: antifungalRef,
      cellulitis: cellulitisRef,
    };

    const ref = scrollTargetMap[scrollTo?.toString() || ''];

    if (ref?.current && scrollViewRef.current) {
      const handle = findNodeHandle(scrollViewRef.current);
      if (handle) {
        ref.current.measureLayout(
          handle,
          (x, y) => scrollViewRef.current?.scrollTo({ y, animated: true }),
          () => console.warn('measureLayout failed')
        );
      }
    }    
  }, [scrollTo]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Skin Condition Info</Text>
  
      <View ref={eczemaRef} style={styles.section}>
        <Text style={styles.header}>Eczema</Text>
        <Text style={styles.body}>
          Eczema, or atopic dermatitis, is a chronic inflammatory skin condition that often starts in childhood.{"\n\n"}
          • Itchy, red, dry, and inflamed skin{"\n"}
          • Triggered by allergens, irritants, or stress{"\n"}
          • Treated with moisturizers and topical corticosteroids{"\n"}
          • Affects ~10.8% of children in the U.S. (CDC, 2021){"\n"}
        </Text>

        <Pressable onPress={() => Linking.openURL("https://your-s3-bucket.amazonaws.com/eczema1.jpg")}>
          <Text style={styles.warningLink}>
            Eczema example photos (warning: contains medical content)
          </Text>
        </Pressable>

      </View>
  
      <View ref={acneRef} style={styles.section}>
        <Text style={styles.header}>Acne</Text>
        <Text style={styles.body}>
          Acne vulgaris occurs when hair follicles become clogged with oil and dead skin.{"\n\n"}
          • Common in teens but can persist into adulthood{"\n"}
          • Symptoms include blackheads, whiteheads, papules, and cysts{"\n"}
          • Triggers: hormones, stress, medications{"\n"}
          • Treatments: benzoyl peroxide, retinoids, hormonal therapy (Mayo Clinic, 2024){"\n"}{"\n"}
        </Text>

        <Pressable onPress={() => Linking.openURL("https://your-s3-bucket.amazonaws.com/eczema1.jpg")}>
          <Text style={styles.warningLink}>
            Acne example photos (warning: contains medical content)
          </Text>
        </Pressable>
      </View>
  
      <View ref={antifungalRef} style={styles.section}>
        <Text style={styles.header}>Fungal Skin Infections</Text>
        <Text style={styles.body}>
          Caused by dermatophytes, these infections thrive in moist environments.{"\n\n"}
          • Includes ringworm, athlete's foot, jock itch{"\n"}
          • Spread by skin contact or shared items{"\n"}
          • Symptoms: red, itchy, ring-shaped rashes{"\n"}
          • Treated with topical or oral antifungals (CDC, 2023){"\n"}
        </Text>

        <Pressable onPress={() => Linking.openURL("https://your-s3-bucket.amazonaws.com/eczema1.jpg")}>
          <Text style={styles.warningLink}>
            Fungal example photos (warning: contains medical content)
          </Text>
        </Pressable>
      </View>
  
      <View ref={cellulitisRef} style={styles.section}>
        <Text style={styles.header}>Cellulitis</Text>
        <Text style={styles.body}>
          Cellulitis is a bacterial infection of the skin and soft tissues.{"\n\n"}
          • Symptoms: redness, warmth, swelling, tenderness{"\n"}
          • Can spread rapidly and become life-threatening{"\n"}
          • Requires prompt antibiotic treatment{"\n"}
          • Commonly caused by Strep or Staph bacteria (CDC, 2023){"\n"}
        </Text>

        <Pressable onPress={() => Linking.openURL("https://your-s3-bucket.amazonaws.com/eczema1.jpg")}>
          <Text style={styles.warningLink}>
            Cellulitis example photos (warning: contains medical content)
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 30 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  body: { fontSize: 16, lineHeight: 22 },
  warningLink: {
    color: '#D9534F',
    fontStyle: 'italic',
    marginTop: 8,
    textDecorationLine: 'underline'
  }
});