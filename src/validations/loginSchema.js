import { object, string } from 'yup'

export const loginSchema = object({
    password: string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("Contraseña requerida")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "La contraseña debe tener al menos un número, una minuscula y una mayuscula"),
    email: string()
        .email("El email no es valido")
        .required("Email requerido"),
})