import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "../components/MenuItem"; // Reutilizamos tu componente MenuItem
import { RootState, logout } from "../store/store";
import { removeStorage } from "../utils/authStorage";

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const displayName = user?.nombre
        ? `${user.nombre} ${user.apellido}`.trim()
        : user?.email ? user.email.split("@")[0] : "Alumno";

    const initial = displayName.charAt(0).toUpperCase();

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/home");
        }
    };

    const handleLogout = async () => {
        await removeStorage("user_token");
        await removeStorage("user_info");
        dispatch(logout());
        router.replace("/");
    };

    return (
        <View style={styles.container}>
            {/* Header con botón regresar */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.back}>←</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerEyebrow}>CUENTA</Text>
                    <Text style={styles.headerTitle}>Mi perfil</Text>
                </View>
            </View>

            {/* Datos del Alumno */}
            <View style={styles.profile}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initial}</Text>
                </View>
                <Text style={styles.name}>{displayName}</Text>
                <View style={styles.studentBadge}><Text style={styles.studentBadgeText}>Alumno</Text></View>
                <Text style={styles.email}>{user?.email || "Sin correo"}</Text>
                {user?.matricula ? (
                    <Text style={styles.matricula}>Matrícula: {user.matricula}</Text>
                ) : null}
            </View>

            {/* Opciones con MenuItem */}
            <Text style={styles.sectionLabel}>Tu espacio</Text>
            <View style={styles.options}>
                <MenuItem
                    title="Inicio"
                    icon="🏠"
                    onPress={() => router.replace("/home")}
                />

                <MenuItem
                    title="Mi Perfil"
                    icon="👤"
                    onPress={() => {}} // Ya estamos en Perfil
                />

                <MenuItem
                    title="Configuración"
                    icon="⚙️"
                    onPress={() => router.push("/settings")}
                />
            </View>

            <View style={styles.spacer} />

            {/* Cerrar sesión */}
            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                <Text style={styles.logoutIcon}>🚪</Text>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F7FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 38,
        marginBottom: 22,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 15,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        fontSize: 22,
        color: "#344054",
    },
    headerEyebrow: { color: "#8A96A6", fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 3 },
    headerTitle: {
        fontSize: 23,
        fontWeight: "700",
        color: "#1D2939",
    },
    profile: {
        alignItems: "center",
        marginBottom: 25,
        paddingTop: 27,
        paddingBottom: 23,
        paddingHorizontal: 18,
        borderRadius: 26,
        backgroundColor: "rgba(255,255,255,0.84)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        shadowColor: "#708198",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
        elevation: 2,
        overflow: "hidden",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#E8EEF8",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.92)",
    },
    avatarText: {
        fontSize: 40,
        fontWeight: "700",
        color: "#42618F",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1D2939",
        marginBottom: 4,
    },
    studentBadge: {
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: "#F0F4F8",
        marginBottom: 11,
    },
    studentBadgeText: { fontSize: 11, fontWeight: "600", color: "#657B97" },
    email: {
        fontSize: 15,
        color: "#667085",
    },
    matricula: {
        fontSize: 14,
        color: "#8490A0",
        marginTop: 4,
    },
    options: {
        marginTop: 0,
        paddingVertical: 5,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.76)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },
    sectionLabel: { color: "#7E8B9B", fontSize: 12, fontWeight: "600", letterSpacing: 0.5, marginBottom: 10, marginLeft: 3 },
    spacer: {
        flex: 1,
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 15,
        marginTop: 15,
        borderRadius: 17,
        backgroundColor: "rgba(255,255,255,0.72)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },
    logoutIcon: {
        fontSize: 22,
        width: 24,
    },
    logoutText: {
        fontSize: 16,
        color: "#B54745",
        fontWeight: "600",
    },
});
