'use client';

import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// 1. Register Fonts (Ensure these files exist in your public/fonts folder!)
// We register a standard font for the PDF text itself
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf'
});

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Inter' },
  header: { marginBottom: 40, borderBottom: '1px solid #E5E5E5', paddingBottom: 20 },
  brandName: { fontSize: 32, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  subHeader: { fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase' },
  
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase' },
  
  logoContainer: { alignItems: 'center', justifyContent: 'center', height: 200, backgroundColor: '#F9F9F9', marginBottom: 20, borderRadius: 4 },
  logoImage: { width: 150, height: 150, objectFit: 'contain' },
  
  paletteRow: { flexDirection: 'row', gap: 0, borderRadius: 4, overflow: 'hidden' },
  colorSwatch: { width: 60, height: 80, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8 },
  colorText: { fontSize: 8, color: '#000', backgroundColor: 'rgba(255,255,255,0.8)', padding: 2, borderRadius: 2 },
  
  fontSection: { padding: 20, border: '1px solid #E5E5E5', borderRadius: 4 },
  fontName: { fontSize: 24, marginBottom: 4 },
  fontMeta: { fontSize: 10, color: '#666' }
});

// The Component
export const BrandPDF = ({ brand }: { brand: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subHeader}>Brand Identity System</Text>
        <Text style={styles.brandName}>{brand.brandName}</Text>
      </View>

      {/* Logo Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Primary Logomark</Text>
        <View style={styles.logoContainer}>
          {/* React-PDF can load images directly from URLs (UploadThing) */}
          <Image src={brand.logoUrl} style={styles.logoImage} />
        </View>
      </View>

      {/* Color Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Palette</Text>
        <View style={styles.paletteRow}>
          {brand.colors.palette.map((hex: string, i: number) => (
            <View key={i} style={[styles.colorSwatch, { backgroundColor: hex }]}>
              <Text style={styles.colorText}>{hex}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <View style={styles.fontSection}>
          <Text style={styles.fontName}>{brand.fonts.selected}</Text>
          <Text style={styles.fontMeta}>{brand.fonts.category.toUpperCase()} Style</Text>
          <Text style={{ fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ{'\n'}
            abcdefghijklmnopqrstuvwxyz{'\n'}
            0123456789
          </Text>
        </View>
      </View>

    </Page>
  </Document>
);