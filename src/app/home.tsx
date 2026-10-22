import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import SideMenu from "../components/SideMenu";
import { RootState, logout } from "../store/store";
import { removeStorage } from "../utils/authStorage";

export default function HomeScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    // Leer usuario dinámico desde Redux
    const user = useSelector((state: RootState) => state.auth.user);

    // Nombre para mostrar en el saludo
    const firstName = user?.nombre
        ? user.nombre
        
        : user?.email ? user.email.split("@")[0] : "Usuario";

    const handleLogout = async () => {
        setMenuOpen(false);
        await removeStorage("user_token");
        await removeStorage("user_info");
        dispatch(logout());
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => setMenuOpen(true)}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>

                {/* Saludo dinámico con el nombre del estado global */}
                <Text style={styles.greeting}>
                    Hola, {firstName} 👋
                </Text>

                <TouchableOpacity style={styles.headerButton} onPress={() => router.push("/profile")}>
                    <Text style={styles.profile}>👤</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeCard}>
                    <View style={styles.heroTop}>
                        <View style={styles.heroMark}><Text style={styles.heroMarkText}>A</Text></View>
                        <Text style={styles.eyebrow}>PORTAL DEL ALUMNO</Text>
                    </View>
                    <Text style={styles.title}>Qué gusto verte, {firstName}</Text>
                    <Text style={styles.subtitle}>Tu vida escolar, en un solo lugar.</Text>
                    <View style={styles.heroAccent} />
                </View>

                <Text style={styles.sectionTitle}>Accesos rápidos</Text>
                <View style={styles.quickLinks}>
                    <TouchableOpacity style={styles.quickCard} onPress={() => router.push("/profile")}>
                        <View style={[styles.quickIcon, styles.profileIcon]}><Text style={styles.quickIconText}>◉</Text></View>
                        <Text style={styles.quickTitle}>Mi perfil</Text>
                        <Text style={styles.quickDescription}>Consulta tus datos</Text>
                        <Text style={styles.quickArrow}>↗</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCard} onPress={() => router.push("/settings")}>
                        <View style={[styles.quickIcon, styles.settingsIcon]}><Text style={styles.quickIconText}>⚙</Text></View>
                        <Text style={styles.quickTitle}>Ajustes</Text>
                        <Text style={styles.quickDescription}>Personaliza tu espacio</Text>
                        <Text style={styles.quickArrow}>↗</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.noteCard}>
                    <View style={styles.noteDot} />
                    <View style={styles.noteTextWrap}>
                        <Text style={styles.noteTitle}>Todo listo para comenzar</Text>
                        <Text style={styles.noteDescription}>Explora tus opciones desde el menú y mantén tu información al día.</Text>
                    </View>
                </View>
            </ScrollView>

            <SideMenu
                visible={menuOpen}
                onClose={() => setMenuOpen(false)}
                onProfile={() => {
                    setMenuOpen(false);
                    router.push("/profile");
                }}
                onSettings={() => {
                    setMenuOpen(false);
                    router.push("/settings");
                }}
                onLogout={handleLogout}
            />
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
        justifyContent: "space-between",
        paddingHorizontal: 22,
        paddingTop: 52,
        paddingBottom: 18,
        backgroundColor: "transparent",
    },
    menuIcon: {
        fontSize: 20,
        color: "#334155",
    },
    headerButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderWidth: 1,
        borderColor: "#E7ECF2",
    },
    greeting: {
        fontSize: 16,
        fontWeight: "600",
        color: "#182230",
    },
    profile: {
        fontSize: 24,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 23,
        paddingBottom: 38,
    },
    welcomeCard: {
        backgroundColor: "rgba(255,255,255,0.82)",
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.95)",
        padding: 25,
        minHeight: 246,
        justifyContent: "flex-end",
        overflow: "hidden",
        shadowColor: "#708198",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 3,
    },
    heroTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 27,
    },
    heroMark: {
        width: 32,
        height: 32,
        borderRadius: 11,
        backgroundColor: "#EAF0F7",
        alignItems: "center",
        justifyContent: "center",
    },
    heroMarkText: {
        color: "#425E82",
        fontSize: 16,
        fontWeight: "700",
    },
    eyebrow: {
        color: "#718096",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.4,
        marginBottom: 0,
    },
    title: {
        fontSize: 29,
        fontWeight: "700",
        marginBottom: 9,
        color: "#1D2939",
    },
    subtitle: {
        fontSize: 16,
        color: "#667085",
    },
    heroAccent: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 85,
        right: -76,
        top: -72,
        backgroundColor: "rgba(224,233,244,0.58)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.8)",
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#344054",
        marginTop: 28,
        marginBottom: 14,
    },
    quickLinks: {
        flexDirection: "row",
        gap: 12,
    },
    quickCard: {
        flex: 1,
        minHeight: 154,
        padding: 16,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.86)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        shadowColor: "#708198",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 14,
        elevation: 2,
    },
    quickIcon: {
        width: 36,
        height: 36,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    profileIcon: { backgroundColor: "#EAF0F7" },
    settingsIcon: { backgroundColor: "#F0EEF8" },
    quickIconText: { color: "#526B8C", fontSize: 18, fontWeight: "600" },
    quickTitle: { fontSize: 15, fontWeight: "700", color: "#344054" },
    quickDescription: { fontSize: 12, lineHeight: 17, color: "#7A8798", marginTop: 5, paddingRight: 4 },
    quickArrow: { position: "absolute", top: 18, right: 17, color: "#98A5B5", fontSize: 16 },
    noteCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        padding: 18,
        marginTop: 16,
        borderRadius: 20,
        backgroundColor: "rgba(235,241,248,0.72)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.8)",
    },
    noteDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#7A93B3", marginTop: 5 },
    noteTextWrap: { flex: 1 },
    noteTitle: { color: "#42536A", fontSize: 13, fontWeight: "700", marginBottom: 4 },
    noteDescription: { color: "#718096", fontSize: 12, lineHeight: 18 },
});
