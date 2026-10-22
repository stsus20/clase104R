import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSelector } from "react-redux";

import { SideMenuProps } from "../interfaces/menu.interface";
import { RootState } from "../store/store";
import MenuItem from "./MenuItem";

export default function SideMenu({
    visible,
    onClose,
    onProfile,
    onSettings,
    onLogout
}: SideMenuProps) {

    // Obtener usuario del estado global de Redux
    const user = useSelector((state: RootState) => state.auth.user);

    if (!visible) {
        return null;
    }

    // Calcular el nombre completo o email por defecto
    const displayName = user?.nombre
        ? `${user.nombre} ${user.apellido}`.trim()
        : user?.email ? user.email.split("@")[0] : "Alumno";

    const initial = displayName.charAt(0).toUpperCase();

    return (
        <View style={styles.overlay}>

            {/* MENÚ LATERAL */}
            <View style={styles.menu}>

                {/* INFORMACIÓN DEL USUARIO */}
                <View style={styles.userContainer}>

                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {initial}
                        </Text>
                    </View>

                    <Text style={styles.name}>
                        {displayName}
                    </Text>

                    <Text style={styles.email}>
                        {user?.email || "Sin correo"}
                    </Text>

                </View>

                {/* OPCIÓN INICIO */}
                <Text style={styles.menuSection}>MENÚ</Text>
                <MenuItem
                    title="Inicio"
                    icon="🏠"
                    onPress={onClose}
                />

                {/* OPCIÓN PERFIL */}
                <MenuItem
                    title="Mi Perfil"
                    icon="👤"
                    onPress={onProfile}
                />

                {/* OPCIÓN CONFIGURACIÓN */}
                <MenuItem
                    title="Configuración"
                    icon="⚙️"
                    onPress={onSettings}
                />

                {/* ESPACIO */}
                <View style={styles.spacer} />

                {/* CERRAR SESIÓN */}
                <TouchableOpacity
                    style={styles.logout}
                    onPress={onLogout}
                >

                    <Text style={styles.logoutIcon}>
                        🚪
                    </Text>

                    <Text style={styles.logoutText}>
                        Cerrar sesión
                    </Text>

                </TouchableOpacity>

            </View>

            <TouchableOpacity
                style={styles.background}
                onPress={onClose}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        zIndex: 1000,
    },
    menu: {
        width: "82%",
        height: "100%",
        backgroundColor: "rgba(250,252,254,0.98)",
        paddingTop: 58,
        paddingBottom: 22,
        paddingHorizontal: 12,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderRightWidth: 1,
        borderColor: "rgba(255,255,255,0.9)",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    userContainer: {
        paddingHorizontal: 10,
        paddingBottom: 24,
        marginBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#E9EDF2",
        alignItems: "center",
    },
    avatar: {
        width: 78,
        height: 78,
        borderRadius: 25,
        backgroundColor: "#E8EEF8",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 4,
        borderColor: "#FFFFFF",
    },
    avatarText: {
        color: "#42618F",
        fontSize: 30,
        fontWeight: "bold",
    },
    name: {
        fontSize: 19,
        fontWeight: "700",
        color: "#1D2939",
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: "#7A8798",
    },
    menuSection: {
        color: "#9AA5B3",
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.4,
        marginHorizontal: 12,
        marginBottom: 8,
    },
    spacer: {
        flex: 1,
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 17,
        marginTop: 10,
        borderRadius: 17,
        backgroundColor: "#F3F5F8",
        borderTopWidth: 1,
        borderTopColor: "#E9EDF2",
    },
    logoutIcon: {
        fontSize: 22,
        width: 40,
    },
    logoutText: {
        fontSize: 16,
        color: "#B54745",
        fontWeight: "600",
    },
    background: {
        flex: 1,
        backgroundColor: "rgba(31, 43, 59, 0.24)",
    },
});
