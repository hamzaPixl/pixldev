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
    padding: 48,
    fontFamily: FONT_FAMILY,
    color: c.white,
  },
  topBar: { height: 3, backgroundColor: c.green, marginBottom: 28 },
  topBarGold: { height: 3, backgroundColor: c.gold, marginBottom: 28 },
  label: { fontSize: 10, color: c.green, letterSpacing: 3, marginBottom: 10 },
  labelGold: { fontSize: 10, color: c.gold, letterSpacing: 3, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 700, color: c.white, marginBottom: 20 },
  titleLg: { fontSize: 32, fontWeight: 700, color: c.white, marginBottom: 20 },
  body: { fontSize: 14, color: c.gray, lineHeight: 1.7 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  cardBox: { border: `1.5pt solid ${c.border}`, padding: 16 },
  cardName: { fontSize: 12, fontWeight: 700, color: c.green, marginBottom: 6 },
  cardNameGold: { fontSize: 12, fontWeight: 700, color: c.gold, marginBottom: 6 },
  cardDesc: { fontSize: 10, color: c.gray, lineHeight: 1.6 },
  statValue: { fontSize: 32, fontWeight: 700, color: c.green, textAlign: "center" as const },
  statValueGold: { fontSize: 32, fontWeight: 700, color: c.gold, textAlign: "center" as const },
  statLabel: { fontSize: 10, color: c.gray, textAlign: "center" as const, marginTop: 4 },
  bullet: { fontSize: 10, color: c.gray, marginBottom: 4 },
  bulletMarker: { fontSize: 10, color: c.green, marginRight: 8 },
  bulletMarkerGold: { fontSize: 10, color: c.gold, marginRight: 8 },
  tableRow: { flexDirection: "row", borderBottom: `1pt solid ${c.border}` },
  tableHeader: { backgroundColor: c.green, padding: 10 },
  tableHeaderText: { fontSize: 11, fontWeight: 700, color: c.bg },
  tableCell: { padding: 10, backgroundColor: c.card },
  tableCellText: { fontSize: 10, color: c.gray },
  centerText: { textAlign: "center" as const },
  ctaText: { fontSize: 20, fontWeight: 700, color: c.gold, textAlign: "center" as const, marginBottom: 8 },
  emailText: { fontSize: 12, color: c.gray, textAlign: "center" as const },
});

export interface InvestPdfProps {
  stageLabel: string;
  stageTitle: string;
  stageBody: string;
  stageStats: { value: string; label: string }[];
  fundsLabel: string;
  fundsTitle: string;
  fundsBody: string;
  fundsBlocks: { title: string; subtitle: string; accent?: string; metrics: string[] }[];
  revenueLabel: string;
  revenueTitle: string;
  revenueBody: string;
  revenueTimeline: { year: string; name: string; desc: string }[];
  whyPixlLabel: string;
  whyPixlTitle: string;
  whyPixlCards: { name: string; desc: string }[];
  milestoneLabel: string;
  milestoneTitle: string;
  milestoneTimeline: { year: string; name: string; desc: string }[];
  northStarLabel: string;
  northStarTitle: string;
  northStarBody: string;
  northStarStat: { value: string; label: string };
  investorLabel: string;
  investorTitle: string;
  investorTypes: { name: string; desc: string }[];
  pathLabel: string;
  pathTitle: string;
  fundingStages: { stage: string; raise: string; valuation: string }[];
  pathCta: string;
  pathEmail: string;
  colStage: string;
  colRaise: string;
  colValuation: string;
}

export function InvestPdfDocument(p: InvestPdfProps) {
  return (
    <Document>
      {/* Slide 1: Current Stage */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.stageLabel}</Text>
        <Text style={s.title}>{p.stageTitle}</Text>
        <View style={[s.row, { marginBottom: 16 }]}>
          {p.stageStats.map((stat, i) => (
            <View key={i} style={[s.cardBox, { width: "31%" }]}>
              <Text style={i === 1 ? s.statValueGold : s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <Text style={s.body}>{p.stageBody}</Text>
      </Page>

      {/* Slide 2: Use of Funds */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.fundsLabel}</Text>
        <Text style={s.title}>{p.fundsTitle}</Text>
        <Text style={[s.body, { marginBottom: 16 }]}>{p.fundsBody}</Text>
        <View style={[s.row, { marginBottom: 12 }]}>
          {p.fundsBlocks.map((block, idx) => {
            const isGold = block.accent === "gold";
            return (
              <View key={idx} style={[s.cardBox, { width: "48%", borderTopColor: isGold ? c.gold : c.green, borderTopWidth: 2.5 }]}>
                <Text style={isGold ? s.cardNameGold : s.cardName}>{block.title}</Text>
                <Text style={[s.cardDesc, { marginBottom: 6 }]}>{block.subtitle}</Text>
                {block.metrics.map((m, i) => (
                  <View key={i} style={{ flexDirection: "row", marginBottom: 2 }}>
                    <Text style={isGold ? s.bulletMarkerGold : s.bulletMarker}>{"\u25B8"}</Text>
                    <Text style={s.bullet}>{m}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </Page>

      {/* Slide 3: Revenue Projections */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.revenueLabel}</Text>
        <Text style={s.title}>{p.revenueTitle}</Text>
        <View style={{ marginBottom: 20 }}>
          {p.revenueTimeline.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: i === p.revenueTimeline.length - 1 ? c.green : c.gray, width: 60 }}>
                {item.year}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 700, color: i === p.revenueTimeline.length - 1 ? c.green : c.white, width: 100 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: c.gray }}>{item.desc}</Text>
            </View>
          ))}
        </View>
        <Text style={[s.body, s.centerText]}>{p.revenueBody}</Text>
      </Page>

      {/* Slide 4: Why Pixl */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.whyPixlLabel}</Text>
        <Text style={s.title}>{p.whyPixlTitle}</Text>
        <View style={[s.row, { marginBottom: 10 }]}>
          {p.whyPixlCards.map((cap, i) => (
            <View key={i} style={[s.cardBox, { width: "31%", borderLeftColor: i >= 3 ? c.gold : c.green, borderLeftWidth: 2.5 }]}>
              <Text style={i >= 3 ? s.cardNameGold : s.cardName}>{cap.name}</Text>
              <Text style={s.cardDesc}>{cap.desc}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Slide 5: Milestones */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBarGold} />
        <Text style={s.labelGold}>{p.milestoneLabel}</Text>
        <Text style={s.title}>{p.milestoneTitle}</Text>
        <View style={{ marginBottom: 20 }}>
          {p.milestoneTimeline.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: i === p.milestoneTimeline.length - 1 ? c.gold : c.gray, width: 60 }}>
                {item.year}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 700, color: i === p.milestoneTimeline.length - 1 ? c.gold : c.white, width: 180 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: c.gray }}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Slide 6: North Star */}
      <Page size="A4" orientation="landscape" style={[s.page, { justifyContent: "center", alignItems: "center" }]}>
        <View style={s.topBar} />
        <Text style={s.label}>{p.northStarLabel}</Text>
        <Text style={[s.title, s.centerText]}>{p.northStarTitle}</Text>
        <Text style={[s.body, s.centerText, { marginBottom: 24 }]}>{p.northStarBody}</Text>
        <View style={[s.cardBox, { borderColor: c.green, padding: 24 }]}>
          <Text style={{ fontSize: 40, fontWeight: 700, color: c.green, textAlign: "center" as const }}>{p.northStarStat.value}</Text>
          <Text style={[s.statLabel, { marginTop: 8 }]}>{p.northStarStat.label}</Text>
        </View>
      </Page>

      {/* Slide 7: Ideal Investors */}
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.topBarGold} />
        <Text style={s.labelGold}>{p.investorLabel}</Text>
        <Text style={s.title}>{p.investorTitle}</Text>
        <View style={[s.row, { marginBottom: 10 }]}>
          {p.investorTypes.map((type, i) => (
            <View key={i} style={[s.cardBox, { width: "31%", borderTopColor: c.gold, borderTopWidth: 2.5 }]}>
              <Text style={s.cardNameGold}>{type.name}</Text>
              <Text style={s.cardDesc}>{type.desc}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Slide 8: The Path + CTA */}
      <Page size="A4" orientation="landscape" style={[s.page, { justifyContent: "center" }]}>
        <View style={s.topBarGold} />
        <Text style={s.label}>{p.pathLabel}</Text>
        <Text style={s.title}>{p.pathTitle}</Text>
        {/* Table header */}
        <View style={s.tableRow}>
          <View style={[s.tableHeader, { flex: 2 }]}><Text style={s.tableHeaderText}>{p.colStage}</Text></View>
          <View style={[s.tableHeader, { flex: 2 }]}><Text style={s.tableHeaderText}>{p.colRaise}</Text></View>
          <View style={[s.tableHeader, { flex: 3 }]}><Text style={s.tableHeaderText}>{p.colValuation}</Text></View>
        </View>
        {p.fundingStages.map((row, i) => (
          <View key={i} style={s.tableRow}>
            <View style={[s.tableCell, { flex: 2 }]}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: c.green }}>{row.stage}</Text>
            </View>
            <View style={[s.tableCell, { flex: 2 }]}>
              <Text style={s.tableCellText}>{row.raise}</Text>
            </View>
            <View style={[s.tableCell, { flex: 3 }]}>
              <Text style={{ fontSize: 11, color: c.gold }}>{row.valuation}</Text>
            </View>
          </View>
        ))}
        <Text style={[s.ctaText, { marginTop: 28 }]}>{p.pathCta}</Text>
        <Text style={s.emailText}>{p.pathEmail}</Text>
      </Page>
    </Document>
  );
}
