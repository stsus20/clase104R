import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { useRouter } from "expo-router";

export default function SettingsScreen() {

    const router = useRouter();

    const handleLogout = () => {
        router.replace("/");
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.back}>
                        ←
                    </Text>
                </TouchableOpacity>

                <View style={styles.headerCopy}>
                    <Text style={styles.headerEyebrow}>TU CUENTA</Text>
                    <Text style={styles.headerTitle}>Configuración</Text>
                </View>
                <View style={styles.headerBalance} />

            </View>

            <Text style={styles.sectionLabel}>Preferencias</Text>
            <View style={styles.options}>
                <View style={styles.option}><Text style={styles.optionIcon}>ⓘ</Text><Text style={styles.optionText}>Información de la app</Text><Text style={styles.optionArrow}>›</Text></View>
                <View style={styles.option}><Text style={styles.optionIcon}>⚙</Text><Text style={styles.optionText}>Preferencias</Text><Text style={styles.optionArrow}>›</Text></View>
                <View style={styles.option}><Text style={styles.optionIcon}>♧</Text><Text style={styles.optionText}>Notificaciones</Text><Text style={styles.optionArrow}>›</Text></View>
                <View style={styles.option}><Text style={styles.optionIcon}>▣</Text><Text style={styles.optionText}>Privacidad</Text><Text style={styles.optionArrow}>›</Text></View>
                <View style={[styles.option, styles.lastOption]}><Text style={styles.optionIcon}>?</Text><Text style={styles.optionText}>Ayuda y soporte</Text><Text style={styles.optionArrow}>›</Text></View>
            </View>

            <TouchableOpacity
                style={styles.logout}
                onPress={handleLogout}
            >
                <Text style={styles.logoutIcon}>↪</Text>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 43,
        paddingBottom: 20,
        gap: 14,
    },
    backButton: { width: 42, height: 42, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.9)", borderWidth: 1, borderColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
    back: {
        fontSize: 22,
        color: "#344054",
    },
    headerCopy: { flex: 1 },
    headerEyebrow: { color: "#8A96A6", fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 3 },
    headerBalance: { width: 42 },
    headerTitle: {
        fontSize: 23,
        fontWeight: "700",
        color: "#1D2939",
    },
    sectionLabel: { marginTop: 24, marginBottom: 10, marginHorizontal: 23, color: "#7E8B9B", fontSize: 12, fontWeight: "600", letterSpacing: 0.5 },
    options: {
        marginHorizontal: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.82)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },
    option: {
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F2F5",
    },
    lastOption: { borderBottomWidth: 0 },
    optionIcon: { width: 32, height: 32, textAlign: "center", textAlignVertical: "center", overflow: "hidden", borderRadius: 11, backgroundColor: "#F0F4F8", color: "#617895", fontSize: 16, fontWeight: "600", paddingTop: 5 },
    optionText: { flex: 1, color: "#344054", fontSize: 14, fontWeight: "500" },
    optionArrow: { color: "#A1ACBA", fontSize: 23, paddingRight: 4 },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        backgroundColor: "rgba(255,255,255,0.82)",
        padding: 16,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },
    logoutIcon: { color: "#B54745", fontSize: 19, fontWeight: "600" },
    logoutText: { color: "#B54745", fontSize: 14, fontWeight: "600" },
});
