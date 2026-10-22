
import { useState } from "react";

import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { LoginFormProps } from "../interfaces/auth.interface";

export default function LoginForm({
    onLogin,
    loading,
    error
}: LoginFormProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Errores individuales del formulario
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Mostrar u ocultar contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Limpiar error del correo al escribir
    const handleEmailChange = (text: string) => {
        setEmail(text);

        if (text.trim() !== "") {
            setEmailError("");
        }
    };

    // Limpiar error de contraseña al escribir
    const handlePasswordChange = (text: string) => {
        setPassword(text);

        if (text.trim() !== "") {
            setPasswordError("");
        }
    };

    const handleLogin = () => {

        let valid = true;

        // Limpiar errores anteriores
        setEmailError("");
        setPasswordError("");

        // Validar correo vacío
        if (email.trim() === "") {
            setEmailError("El correo electrónico es obligatorio");
            valid = false;
        }

        // Validar contraseña vacía
        if (password.trim() === "") {
            setPasswordError("La contraseña es obligatoria");
            valid = false;
        }

        // Si hay errores, no continuar
        if (!valid) {
            return;
        }

        // Enviar datos al hook
        onLogin(email.trim(), password);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.eyebrow}>PORTAL DEL ALUMNO</Text>

            <Text style={styles.title}>
                Iniciar sesión
            </Text>

            {/* CORREO ELECTRÓNICO */}

            <Text style={styles.label}>
                Correo Electrónico
            </Text>

            <TextInput
                style={[
                    styles.input,
                    emailError !== ""
                        ? styles.inputError
                        : null
                ]}
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!loading}
            />

            {emailError !== "" && (
                <Text style={styles.error}>
                    {emailError}
                </Text>
            )}

            {/* CONTRASEÑA */}

            <Text style={styles.label}>
                Contraseña
            </Text>

            <View style={styles.passwordContainer}>

                <TextInput
                    style={[
                        styles.passwordInput,
                        passwordError !== ""
                            ? styles.inputError
                            : null
                    ]}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Pressable
                    onPress={() =>
                        setShowPassword(!showPassword)
                    }
                    style={styles.showButton}
                    disabled={loading}
                >
                <Text style={styles.showText}>
                        {showPassword
                            ? "Ocultar"
                            : "Mostrar"}
                    </Text>
                </Pressable>

            </View>

            {passwordError !== "" && (
                <Text style={styles.error}>
                    {passwordError}
                </Text>
            )}

            {/* ERROR DE AUTENTICACIÓN */}

            {error !== "" && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}

            {/* BOTÓN */}

            <Pressable
                style={({ pressed }) => [styles.submit, pressed && styles.submitPressed, loading && styles.submitDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.submitText}>{loading ? "Validando..." : "Iniciar sesión"}</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        maxWidth: 440,
        padding: 26,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.86)",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        shadowColor: "#667085",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.09,
        shadowRadius: 24,
        elevation: 4,
    },
    eyebrow: {
        color: "#718096",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        textAlign: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 28,
        color: "#1D2939",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        color: "#475467",
    },

    input: {
        borderWidth: 1,
        borderColor: "#E4E9F0",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 14,
        marginBottom: 19,
        backgroundColor: "rgba(248,250,252,0.85)",
        color: "#1D2939",
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E4E9F0",
        borderRadius: 15,
        marginBottom: 22,
        backgroundColor: "rgba(248,250,252,0.85)",
    },

    passwordInput: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 14,
        color: "#1D2939",
    },

    showButton: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    showText: {
        color: "#63748A",
        fontSize: 13,
        fontWeight: "600",
    },

    inputError: {
        borderColor: "#D92D20",
    },

    error: {
        color: "#B42318",
        marginBottom: 15,
    },
    submit: {
        backgroundColor: "#344F77",
        paddingVertical: 16,
        alignItems: "center",
        borderRadius: 16,
        marginTop: 3,
    },
    submitPressed: {
        opacity: 0.88,
    },
    submitDisabled: {
        opacity: 0.65,
    },
    submitText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
