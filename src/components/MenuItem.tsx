import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    MenuItemProps
} from "../interfaces/menu.interface";

export default function MenuItem({
    title,
    icon,
    onPress
}: MenuItemProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.iconWrap}><Text style={styles.icon}>{icon}</Text></View>

            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.arrow}>
                ›
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginBottom: 4,
    },
    iconWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#EEF2F7", alignItems: "center", justifyContent: "center", marginRight: 11 },
    icon: {
        fontSize: 18,
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: "#344054",
    },
    arrow: {
        fontSize: 23,
        color: "#A1ACBA",
    },
});
