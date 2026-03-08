/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '../../../public/assets/logo_full.png';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },

  borderedContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#111",
    padding: 25,
    position: "relative",
  },

  watermark: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 80,
  },

  centerPage: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  brandImage: {
    width: 220,
    marginBottom: 10,
  },

  tagline: {
    fontSize: 14,
    marginTop: 8,
    color: "gray",
  },

  dayTitle: {
    fontSize: 20,
    marginBottom: 20,
  },

  activityRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  left: {
    width: "60%",
    paddingRight: 12,
  },

  right: {
    width: "40%",
  },

  sessionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "capitalize",
  },

  sessionDesc: {
    fontSize: 11,
    lineHeight: 1.4,
  },

  image: {
    width: "100%",
    height: 110,
    objectFit: "cover",
  },

  thankYou: {
    fontSize: 22,
  },
});

export default function ItineraryPDF({ trip }: any) {
  const days = trip?.itinerary || [];

  const sortByTime = (activities: any[]) => {
    const order = ["morning", "afternoon", "evening"];
    return [...activities].sort(
      (a, b) => order.indexOf(a.time) - order.indexOf(b.time)
    );
  };

  return (
    <Document>

        {/* ---------------- COVER PAGE ---------------- */}
        <Page style={styles.page}>
            <View style={[styles.borderedContainer, styles.centerPage]}>
            <Image
                src={{ uri: logo.src }}
                style={styles.brandImage}
            />
            <Text style={styles.tagline}>
                Curated journeys. Crafted memories.
            </Text>
            <Image src={{ uri: logo.src }} style={styles.watermark} />
            </View>
        </Page>

        {/* ---------------- ACKNOWLEDGEMENT PAGE ---------------- */}
        <Page style={styles.page}>
        <View
            style={[
            styles.borderedContainer,
            {
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            },
            ]}
        >
            <Text
            style={{
                fontSize: 24,
                marginBottom: 25,
                fontWeight: "bold",
            }}
            >
            Acknowledgement
            </Text>

            <Text
            style={{
                fontSize: 14,
                lineHeight: 1.8,
                maxWidth: 400,
            }}
            >
            We sincerely thank you for choosing Ashventure to craft your
            journey to {trip.destination}.
            {"\n\n"}
            This itinerary has been thoughtfully curated to reflect your
            travel style, preferences, and aspirations. Each day has been
            designed to balance exploration, relaxation, and unforgettable
            experiences.
            {"\n\n"}
            May this adventure bring you joy, discovery, and memories
            that stay with you long after the journey ends.
            </Text>

            <Image src={{ uri: logo.src }} style={styles.watermark} />
        </View>
        </Page>

        {/* ---------------- DAY PAGES ---------------- */}
        {days.map((day: any) => (
            <Page key={day.id} style={styles.page}>
            <View style={styles.borderedContainer}>
                <Text style={styles.dayTitle}>
                    {day.title}
                </Text>

                {sortByTime(day.activities).map((activity: any) => (
                <View key={activity.id} style={styles.activityRow}>
                    <View style={styles.left}>
                    <Text style={styles.sessionTitle}>
                        {activity.time}
                    </Text>
                    <Text style={styles.sessionTitle}>
                        {activity.title}
                    </Text>
                    <Text style={styles.sessionDesc}>
                        {activity.description}
                    </Text>
                    </View>

                    <View style={styles.right}>
                    <Image
                        src={{ uri: activity.imageUrl }}
                        style={styles.image}
                    />
                    </View>
                </View>
                ))}

                <Image src={{ uri: logo.src }} style={styles.watermark} />
            </View>
            </Page>
        ))}

        {/* ---------------- THANK YOU PAGE ---------------- */}
        <Page style={styles.page}>
            <View style={[styles.borderedContainer, styles.centerPage]}>
            <Text style={styles.thankYou}>
                Thank You For Travelling With Ashventure
            </Text>
            <Image src={{ uri: logo.src }} style={styles.watermark} />
            </View>
        </Page>
    </Document>
  );
}