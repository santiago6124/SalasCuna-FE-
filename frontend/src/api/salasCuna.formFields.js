export const formFields = {
    User: {
        email: { name: "email", label: "E-mail", type: "email", placeholder: "Ingresar E-mail", required: true }, // defaultValue: user ? user.email : "",
        first_name: { name: "first_name", label: "Nombre", type: "text", placeholder: "Ingresar nombre", required: true },    // defaultValue: user ? user.first_name : "",
        last_name: { name: "last_name",label: "Apellido",type: "text",placeholder: "Ingresar Apellido",required: true }, // defaultValue: user ? user.last_name : ""
        dni: { name: "dni",label: "DNI",type: "number",placeholder: "Ingresar DNI",required: true },
        group: { name: "group",label: "Rol",type: "select",options: [],required: true },
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
        year: { name: "year", label: "Year", type: "select", options: [
            {id: '2010', name: '2010'},
            {id: '2011', name: '2011'},
            {id: '2012', name: '2012'},
            {id: '2013', name: '2013'},
            {id: '2014', name: '2014'},
            {id: '2015', name: '2015'},
            {id: '2016', name: '2016'},
            {id: '2017', name: '2017'},
            {id: '2018', name: '2018'},
            {id: '2019', name: '2019'},
            {id: '2020', name: '2020'},
            {id: '2021', name: '2021'},
            {id: '2022', name: '2022'},
            {id: '2023', name: '2023'},
            {id: '2024', name: '2024'},
            {id: '2025', name: '2025'},
            {id: '2026', name: '2026'},
            {id: '2027', name: '2027'},
            {id: '2028', name: '2028'},
            {id: '2029', name: '2029'},
            {id: '2030', name: '2030'},
            {id: '2031', name: '2031'},
            {id: '2032', name: '2032'},
            {id: '2033', name: '2033'},
            {id: '2034', name: '2034'},
            {id: '2035', name: '2035'},
            {id: '2036', name: '2036'},
            {id: '2037', name: '2037'},
            {id: '2038', name: '2038'},
            {id: '2039', name: '2039'},
        ], required: true },
        month: { name: "month", label: "Month", type: "select", options: [
            {id: '01', name: '01'},
            {id: '02', name: '02'},
            {id: '03', name: '03'},
            {id: '04', name: '04'},
            {id: '05', name: '05'},
            {id: '06', name: '06'},
            {id: '07', name: '07'},
            {id: '08', name: '08'},
            {id: '09', name: '09'},
            {id: '10', name: '10'},
            {id: '11', name: '11'},
            {id: '12', name: '12'},
        ], required: true },
        zone: { name: "zone", label: "Zone", type: "select", options: [], required: true }, // Add options dynamically
    },
    Shift: ["id", "name"],
    Zone: ["id", "name"],
};
