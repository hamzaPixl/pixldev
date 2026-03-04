import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Space Grotesk font
Font.register({
  family: "Space Grotesk",
  fonts: [
    { src: "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsj.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf", fontWeight: 700 },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// react-pdf requires a single font name (no comma-separated fallbacks)
const FONT_FAMILY = "Space Grotesk";

const c = {
  bg: "#0a0a0a",
  card: "#111111",
  green: "#00ff00",
  gold: "#ffc800",
  white: "#ffffff",
  gray: "#888888",
  dimGray: "#555555",
  border: "#333333",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: c.bg,
    padding: 40,
    fontFamily: FONT_FAMILY,
    color: c.white,
  },
  topBar: { height: 3, backgroundColor: c.green, marginBottom: 24 },
  topBarGold: { height: 3, backgroundColor: c.gold, marginBottom: 24 },
  label: { fontSize: 8, color: c.green, letterSpacing: 3, marginBottom: 8 },
  labelGold: { fontSize: 8, color: c.gold, letterSpacing: 3, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 700, color: c.white, marginBottom: 16 },
  titleLg: { fontSize: 28, fontWeight: 700, color: c.white, marginBottom: 16 },
  body: { fontSize: 10, color: c.gray, lineHeight: 1.6 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  cardBox: { border: `1.5pt solid ${c.border}`, padding: 14 },
  cardName: { fontSize: 10, fontWeight: 700, color: c.green, marginBottom: 4 },
  cardNameGold: { fontSize: 10, fontWeight: 700, color: c.gold, marginBottom: 4 },
  cardDesc: { fontSize: 8, color: c.gray, lineHeight: 1.5 },
  statValue: { fontSize: 28, fontWeight: 700, color: c.green, textAlign: "center" as const },
  statValueGold: { fontSize: 28, fontWeight: 700, color: c.gold, textAlign: "center" as const },
  statLabel: { fontSize: 8, color: c.gray, textAlign: "center" as const, marginTop: 4 },
  flowStep: { flex: 1, border: `1.5pt solid ${c.border}`, padding: 10, alignItems: "center" as const },
  flowNum: { fontSize: 8, fontWeight: 700, color: c.green, marginBottom: 2 },
  flowText: { fontSize: 8, color: c.white },
  arrow: { fontSize: 12, color: c.green, alignSelf: "center" as const, marginHorizontal: 4 },
  bullet: { fontSize: 8, color: c.gray, marginBottom: 3 },
  bulletMarker: { fontSize: 8, color: c.green, marginRight: 6 },
  bulletMarkerGold: { fontSize: 8, color: c.gold, marginRight: 6 },
  tableRow: { flexDirection: "row", borderBottom: `1pt solid ${c.border}` },
  tableHeader: { backgroundColor: c.green, padding: 8 },
  tableHeaderText: { fontSize: 9, fontWeight: 700, color: c.bg },
  tableCell: { padding: 8, backgroundColor: c.card },
  tableCellText: { fontSize: 8, color: c.gray },
  centerText: { textAlign: "center" as const },
  quote: { fontSize: 10, color: c.gold, textAlign: "center" as const, marginTop: 12 },
  visionStatement: { fontSize: 12, color: c.green, textAlign: "center" as const, marginBottom: 24, lineHeight: 1.6 },
  ctaText: { fontSize: 16, fontWeight: 700, color: c.gold, textAlign: "center" as const, marginBottom: 6 },
  emailText: { fontSize: 10, color: c.gray, textAlign: "center" as const },
});

// We accept translated content as props to keep this component pure
export interface PitchPdfProps {
  contextLabel: string;
  contextTitle: string;
  contextBody: string;
  contextStats: { value: string; label: string }[];
  storyLabel: string;
  storyTitle: string;
  storyBody: string;
  insightLabel: string;
  insightTitle: string;
  insightBody: string;
  insightPillars: { name: string; desc: string }[];
  solutionLabel: string;
  solutionTitle: string;
  solutionBody: string;
  solutionSteps: string[];
  productLabel: string;
  productTitle: string;
  productCapabilities: { name: string; desc: string }[];
  tractionLabel: string;
  tractionTitle: string;
  tractionQuote: string;
  tractionBlocks: { title: string; subtitle: string; accent?: string; metrics: string[] }[];
  marketLabel: string;
  marketTitle: string;
  marketBody: string;
  marketTimeline: { year: string; name: string; desc: string }[];
  modelLabel: string;
  modelTitle: string;
  modelStreams: { name: string; model: string; price: string }[];
  modelColStream: string;
  modelColModel: string;
  modelColPricing: string;
  visionLabel: string;
  visionTitle: string;
  visionStatement: string;
  visionCta: string;
  visionEmail: string;
}

export function PitchPdfDocument(p: PitchPdfProps) {
  return (
    <Document>
      {/* Slide 1: Context */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.contextLabel}</Text>
        <Text style={s.title}>{p.contextTitle}</Text>
        <View style={[s.row, { marginBottom: 16 }]}>
          {p.contextStats.map((stat, i) => (
            <View key={i} style={[s.cardBox, { width: "31%" }]}>
              <Text style={i === 1 ? s.statValueGold : s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <Text style={s.body}>{p.contextBody}</Text>
      </Page>

      {/* Slide 1b: Story */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBarGold} />
        <Text style={s.labelGold}>{p.storyLabel}</Text>
        <Text style={s.title}>{p.storyTitle}</Text>
        <Text style={s.body}>{p.storyBody}</Text>
      </Page>

      {/* Slide 2: Insight */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.insightLabel}</Text>
        <Text style={s.title}>{p.insightTitle}</Text>
        <View style={[s.row, { marginBottom: 16 }]}>
          {p.insightPillars.map((pillar, i) => (
            <View key={i} style={[s.cardBox, { width: "18%", borderTopColor: c.green, borderTopWidth: 2.5 }]}>
              <Text style={[s.cardName, s.centerText]}>{pillar.name}</Text>
              <Text style={[s.cardDesc, s.centerText]}>{pillar.desc}</Text>
            </View>
          ))}
        </View>
        <Text style={s.body}>{p.insightBody}</Text>
      </Page>

      {/* Slide 3: Solution */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.solutionLabel}</Text>
        <Text style={s.title}>{p.solutionTitle}</Text>
        <Text style={{ fontSize: 10, color: c.green, marginBottom: 20, lineHeight: 1.8 }}>
          {p.solutionSteps.map((step, i) =>
            i < p.solutionSteps.length - 1 ? `${step}  →  ` : step
          ).join("")}
        </Text>
        <Text style={s.body}>{p.solutionBody}</Text>
      </Page>

      {/* Slide 4: Product */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.productLabel}</Text>
        <Text style={s.title}>{p.productTitle}</Text>
        <View style={[s.row, { marginBottom: 10 }]}>
          {p.productCapabilities.map((cap, i) => (
            <View key={i} style={[s.cardBox, { width: "31%", borderLeftColor: i >= 3 ? c.gold : c.green, borderLeftWidth: 2.5 }]}>
              <Text style={i >= 3 ? s.cardNameGold : s.cardName}>{cap.name}</Text>
              <Text style={s.cardDesc}>{cap.desc}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Slide 5: Traction */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.tractionLabel}</Text>
        <Text style={s.title}>{p.tractionTitle}</Text>
        <View style={[s.row, { marginBottom: 12 }]}>
          {p.tractionBlocks.map((block, idx) => {
            const isGold = block.accent === "gold";
            return (
              <View key={idx} style={[s.cardBox, { width: "48%", borderTopColor: isGold ? c.gold : c.green, borderTopWidth: 2.5 }]}>
                <Text style={isGold ? s.cardNameGold : s.cardName}>{block.title}</Text>
                <Text style={[s.cardDesc, { marginBottom: 6 }]}>{block.subtitle}</Text>
                {block.metrics.map((m, i) => (
                  <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
                    <Text style={isGold ? s.bulletMarkerGold : s.bulletMarker}>▸</Text>
                    <Text style={s.bullet}>{m}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
        <Text style={s.quote}>{"\u201C"}{p.tractionQuote}{"\u201D"}</Text>
      </Page>

      {/* Slide 6: Market */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.marketLabel}</Text>
        <Text style={s.title}>{p.marketTitle}</Text>
        <View style={{ marginBottom: 20 }}>
          {p.marketTimeline.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Text style={{ fontSize: 9, color: i === p.marketTimeline.length - 1 ? c.green : c.gray, width: 40 }}>
                {item.year}
              </Text>
              <Text style={{ fontSize: 11, fontWeight: 700, color: i === p.marketTimeline.length - 1 ? c.green : c.white, width: 60 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 9, color: c.gray }}>{item.desc}</Text>
            </View>
          ))}
        </View>
        <Text style={[s.body, s.centerText]}>{p.marketBody}</Text>
      </Page>

      {/* Slide 7: Business Model */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.modelLabel}</Text>
        <Text style={s.title}>{p.modelTitle}</Text>
        {/* Table header */}
        <View style={s.tableRow}>
          <View style={[s.tableHeader, { flex: 2 }]}><Text style={s.tableHeaderText}>{p.modelColStream}</Text></View>
          <View style={[s.tableHeader, { flex: 3 }]}><Text style={s.tableHeaderText}>{p.modelColModel}</Text></View>
          <View style={[s.tableHeader, { flex: 2 }]}><Text style={s.tableHeaderText}>{p.modelColPricing}</Text></View>
        </View>
        {p.modelStreams.map((stream, i) => (
          <View key={i} style={s.tableRow}>
            <View style={[s.tableCell, { flex: 2 }]}>
              <Text style={{ fontSize: 9, fontWeight: 700, color: c.green }}>{stream.name}</Text>
            </View>
            <View style={[s.tableCell, { flex: 3 }]}>
              <Text style={s.tableCellText}>{stream.model}</Text>
            </View>
            <View style={[s.tableCell, { flex: 2 }]}>
              <Text style={{ fontSize: 9, color: c.gold }}>{stream.price}</Text>
            </View>
          </View>
        ))}
      </Page>

      {/* Slide 8: Vision */}
      <Page size="A4" orientation="landscape" style={[s.page, { justifyContent: "center", alignItems: "center" }]}>
        <View style={s.topBarGold} />
        <Text style={s.labelGold}>{p.visionLabel}</Text>
        <Text style={[s.titleLg, s.centerText]}>{p.visionTitle}</Text>
        <Text style={s.visionStatement}>{"\u201C"}{p.visionStatement}{"\u201D"}</Text>
        <Text style={s.ctaText}>{p.visionCta}</Text>
        <Text style={s.emailText}>{p.visionEmail}</Text>
      </Page>
    </Document>
  );
}
