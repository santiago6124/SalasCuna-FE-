export const formFields = {
    User: {
        email: { name: "email", label: "E-mail", type: "email", placeholder: "Ingresar E-mail", required: true }, // defaultValue: user ? user.email : "",
        first_name: { name: "first_name", label: "Nombre", type: "text", placeholder: "Ingresar nombre", required: true },    // defaultValue: user ? user.first_name : "",
        last_name: { name: "last_name",label: "Apellido",type: "text",placeholder: "Ingresar Apellido",required: true }, // defaultValue: user ? user.last_name : ""
        dni: { name: "dni",label: "DNI",type: "number",placeholder: "Ingresar DNI",required: true },
        groups: { name: "groups",label: "Rol",type: "select",options: [],required: true },
        phone_number: { name: "phone_number",label: "Número De Teléfono",type: "tel",placeholder: "Ingresar Número De Teléfono",required: true },
        city: { name: "city",label: "Ciudad",type: "text",placeholder: "Ingresar Ciudad",required: true },
        department: { name: "department",label: "Departamento",type: "select",options: [],required: true },
        address: { name: "address",label: "Dirección",type: "text",placeholder: "Ingresar Dirección",required: true },
        birthdate: { name: "birthdate",label: "Fecha de Nacimiento",type: "date",required: true },
        password: { name: "password",label: "Password",type: "password",placeholder: "Ingresar Password",required: true }, // defaultValue: user ? user.last_name : ""
        is_active: { name: "is_active", label: "is_active", type: "checkbox", required: true },
    },
    Department: ["id", "department", "zone"],
    Locality: ["id", "locality", "department"],
    Neighborhood: ["id", "neighborhood"],
    Sectional: ["id", "sectional"],
    Co_management: ["id", "co_management"],
    IdentType: ["id", "type"],
    Child: {
        step_1:{
            first_name: { name: "first_name", label: "First Name", type: "text", required: true },
            last_name: { name: "last_name", label: "Last Name", type: "text", required: true },
            identification: { name: "identification", label: "Identification", type: "text", required: true },
            ident_type: { name: "ident_type", label: "Identification Type", type: "select", options: [], required: true },
            birthdate: { name: "birthdate", label: "Birthdate", type: "date", required: true },
            gender: { name: "gender", label: "Gender", type: "select", options: [], required: true },
        },
        step_2:{
            street: { name: "street", label: "Street", type: "text", required: true },
            house_number: { name: "house_number", label: "House Number", type: "number", required: true },
            geolocation: { name: "geolocation", label: "Geolocation", type: "text", required: true },
            neighborhood: { name: "neighborhood", label: "Neighborhood", type: "select", options: [], required: true },
            locality: { name: "locality", label: "Locality", type: "select", options: [], required: true },
        },
        step_3:{
            cribroom: { name: "cribroom", label: "Cribroom", type: "select", options: [], required: true },
            shift: { name: "shift", label: "Shift", type: "select", options: [], required: false },
            disenroll_date: { name: "disenroll_date", label: "Disenrollment Date", type: "date", required: false },
            registration_date: { name: "registration_date", label: "Registration Date", type: "date", required: true },
            is_active: { name: "is_active", label: "is_active", type: "checkbox", required: true },
        },
    },
    Company: ["id", "title", "phone"],
    Cribroom:{
        name: { name: "name", label: "Nombre", type: "text", required: true },
        entity: { name: "entity", label: "Entidad", type: "text", required: true },
        CUIT: { name: "CUIT", label: "CUIT", type: "number", required: true },
        code: { name: "code", label: "Código", type: "text", required: true },
        max_capacity: { name: "max_capacity", label: "Capacidad Máxima", type: "number", required: true },
        is_active: { name: "is_active", label: "Activo", type: "checkbox", required: true },
        street: { name: "street", label: "Calle", type: "text", required: true },
        house_number: { name: "house_number", label: "Número", type: "number", required: true },
        geolocation: { name: "geolocation", label: "Geolocalización", type: "text", required: false },
        locality: { name: "locality", label: "Localidad", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
        shift: { name: "shift", label: "Turno", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
        co_management: { name: "co_management", label: "Co-Gestión", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
        neighborhood: { name: "neighborhood", label: "Barrio", type: "select", options: [], required: false }, // Agrega opciones dinámicamente
        sectional: { name: "sectional", label: "Seccional", type: "select", options: [], required: false }, // Agrega opciones dinámicamente
    },
    CribroomUser: {
        cribroom: { name: "cribroom", label: "Sala Cuna", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
        user: { name: "user", label: "Usuario", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
    },
    Desinfection: ["id", "date", "description", "cribroom", "company"],
    Form: ["id", "generation_date", "cribroom_user"],
    Gender: ["id", "gender"],
    PhoneFeature: ["id", "feature"],
    GuardianType: ["id", "type"],
    Guardian: {
        first_name: { name: "first_name", label: "First Name", type: "text", required: true },
        last_name: { name: "last_name", label: "Last Name", type: "text", required: true },
        identification: { name: "identification", label: "Identification", type: "text", required: false },
        guardian_Type: { name: "guardian_Type", label: "Guardian Type", type: "select", options: [], required: true }, // Add options dynamically
        ident_type: { name: "ident_type", label: "Ident Type", type: "select", options: [], required: true }, // Add options dynamically
    },
    Phone: {
        phone_name: { name: "phone_name", label: "Phone Name", type: "text", required: true },
        phone_number: { name: "phone_number", label: "Phone Number", type: "number", required: true },
        phone_Feature: { name: "phone_Feature", label: "Phone Feature", type: "select", options: [], required: true }, // Add options dynamically
    },
    Payout: {
        amount: { name: "amount", label: "Amount", type: "number", required: true },
        date: { name: "date", label: "Date", type: "date", required: true },
        zone: { name: "zone", label: "Zone", type: "select", options: [], required: true }, // Add options dynamically
    },
    Shift: ["id", "name"],
    Zone: ["id", "name"],
};
