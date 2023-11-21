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
    },
    Department: ["id", "department", "zone"],
    Locality: ["id", "locality", "department"],
    Neighborhood: ["id", "neighborhood"],
    Sectional: ["id", "sectional"],
    Co_management: ["id", "co_management"],
    IdentType: ["id", "type"],
    Child: {
        first_name: { name: "first_name", label: "First Name", type: "text", required: true },
        last_name: { name: "last_name", label: "Last Name", type: "text", required: true },
        identification: { name: "identification", label: "Identification", type: "text", required: true },
        ident_type: { name: "ident_type", label: "Identification Type", type: "select", options: [], required: true },
        birthdate: { name: "birthdate", label: "Birthdate", type: "date", required: true },
        street: { name: "street", label: "Street", type: "text", required: true },
        house_number: { name: "house_number", label: "House Number", type: "number", required: true },
        geolocation: { name: "geolocation", label: "Geolocation", type: "text", required: true },
        neighborhood: { name: "neighborhood", label: "Neighborhood", type: "select", options: [], required: true },
        locality: { name: "locality", label: "Locality", type: "select", options: [], required: true },
        gender: { name: "gender", label: "Gender", type: "select", options: [], required: true },
        cribroom: { name: "cribroom", label: "Cribroom", type: "select", options: [], required: true },
        shift: { name: "shift", label: "Shift", type: "select", options: [], required: false },
        disenroll_date: { name: "disenroll_date", label: "Disenrollment Date", type: "date", required: false },
        registration_date: { name: "registration_date", label: "Registration Date", type: "date", required: true },
        is_active: { name: "is_active", label: "is_active", type: "checkbox", required: true },
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


// const departmentFormField = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "department", label: "Department", type: "text", required: true },
// { name: "zone", label: "Zone", type: "text", required: true },
// ];

// const localityFormField = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "locality", label: "Locality", type: "text", required: true },
// { name: "department", label: "Department", type: "text", required: true },
// ];

// const neighborhoodFormField = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "neighborhood", label: "Neighborhood", type: "text", required: true },
// ];

// // Sectional
// const sectionalFormField = [
// { name: "sectional", label: "Sectional", type: "text", required: true },
// ];

// // Co_management
// const coManagementFormField = [
// { name: "co_management", label: "Co Management", type: "text", required: true },
// ];

// // IdentType
// const identTypeFormField = [
// { name: "type", label: "Identification Type", type: "text", required: true },
// ];

// // Child
// const childFormField = [
// { name: "first_name", label: "First Name", type: "text", required: true },
// { name: "last_name", label: "Last Name", type: "text", required: true },
// { name: "identification", label: "Identification", type: "number", required: true },
// { name: "birthdate", label: "Birthdate", type: "date", required: true },
// { name: "gender", label: "Gender", type: "select", options: [], required: true },
// { name: "cribroom", label: "Cribroom", type: "select", options: [], required: true },
// { name: "shift", label: "Shift", type: "select", options: [], required: false },
// { name: "disenroll_date", label: "Disenrollment Date", type: "date", required: false },
// { name: "registration_date", label: "Registration Date", type: "date", required: true },
// ];

// // Company
// const companyFormField = [
// { name: "title", label: "Title", type: "text", required: true },
// { name: "phone", label: "Phone", type: "number", required: true },
// ];

// // Cribroom
// const cribroomFields = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "name", label: "Nombre", type: "text", required: true },
// { name: "entity", label: "Entidad", type: "text", required: true },
// { name: "CUIT", label: "CUIT", type: "number", required: true },
// { name: "code", label: "Código", type: "text", required: true },
// { name: "max_capacity", label: "Capacidad Máxima", type: "number", required: true },
// { name: "is_active", label: "Activo", type: "checkbox", required: true },
// { name: "street", label: "Calle", type: "text", required: true },
// { name: "house_number", label: "Número", type: "number", required: true },
// { name: "geolocation", label: "Geolocalización", type: "text", required: false },
// { name: "locality", label: "Localidad", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// { name: "shift", label: "Turno", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// { name: "co_management", label: "Co-Gestión", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// { name: "neighborhood", label: "Barrio", type: "select", options: [], required: false }, // Agrega opciones dinámicamente
// { name: "sectional", label: "Seccional", type: "select", options: [], required: false }, // Agrega opciones dinámicamente
// ];

// // CribroomUser
// const cribroomUserFields = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "cribroom", label: "Sala Cuna", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// { name: "user", label: "Usuario", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// ];

// // Desinfection
// const desinfectionFields = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "date", label: "Fecha", type: "datetime", required: true },
// { name: "description", label: "Descripción", type: "text", required: false },
// { name: "cribroom", label: "Sala Cuna", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// { name: "company", label: "Compañía", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// ];

// // Form
// const formFormFields = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "generation_date", label: "Fecha de Generación", type: "date", required: true },
// { name: "cribroom_user", label: "Sala Cuna Usuario", type: "select", options: [], required: true }, // Agrega opciones dinámicamente
// ];

// // Gender
// const genderFields = [
// { name: "id", label: "ID", type: "number", required: false },
// { name: "gender", label: "Género", type: "text", required: true },
// ];

// const phoneFeatureFormField = [
// { name: "id", label: "ID", type: "number", required: true },
// { name: "feature", label: "Feature", type: "number", required: true },
// ];

// const guardianTypeFormField = [
// { name: "id", label: "ID", type: "number", required: true },
// { name: "type", label: "Type", type: "text", required: true },
// ];

// const payoutFormField = [
// { name: "id", label: "ID", type: "number", required: true },
// { name: "amount", label: "Amount", type: "number", required: true },
// { name: "date", label: "Date", type: "date", required: true },
// { name: "zone", label: "Zone", type: "select", options: [], required: true }, // Add options dynamically
// ];

// const shiftFormField = [
// { name: "id", label: "ID", type: "number", required: true },
// { name: "name", label: "Name", type: "text", required: true },
// ];

// const zoneFormField = [
// { name: "id", label: "ID", type: "number", required: true },
// { name: "name", label: "Name", type: "text", required: true },
// ];
  




// var child_formField = [
//     { name: "nombreChild", label: "Nombre", type: "text", required: true },
//     { name: "apellidoChild", label: "Apellido", type: "text", required: true },
//     { name: "dniChild", label: "DNI", type: "number", required: true },
//     { name: "fechaNacimientoChild", label: "Fecha De Nacimiento", type: "date", required: true },
//     { name: "generoChild",label: "Genero",type: "select",options: childGenders, required: true,}, // Add options dynamically
//     { name: "salacuna", label: "Sala Cuna", type: "select", options: salas, required: true }, // Add options dynamically
//     { name: "turno", label: "Turno", type: "select", options: shifts, required: false }, // Add options dynamically
//     { name: "fechaBaja", label: "Fecha de baja", type: "date", required: false },
//     { name: "fechaAlta", label: "Fecha de alta", type: "date", required: true },
// ]

// var guardian_formField = [
//     { name: "nombreGuardian", label: "Nombre", type: "text", required: true },
//     { name: "apellidoGuardian", label: "Apellido", type: "text", required: true },
//     { name: "dniGuardian", label: "DNI", type: "number", required: true },
//     { name: "generoGuardian", label: "Genero", type: "select", options: guardianGenders, required: true }, // Add options dynamically
//     { name: "phoneFeature", label: "Caracterisitca Telefonica", type: "select", options: phoneFeatures, required: true }, // Add options dynamically
//     { name: "telefono", label: "Telefono", type: "number", required: true },
//     { name: "guardianType", label: "Madre/padre o Tutor?", type: "select", options: guardianTypes, required: true }, // Add options dynamically
// ]

// var address_FormField = [
//     { name: "calle", label: "Calle", type: "text", required: true },
//     { name: "numero_casa", label: "Numero", type: "number", required: false },
//     { name: "neighborhood", label: "Barrio", type: "select", options: neighborhoods, required: true }, // Add options dynamically
//     { name: "locality", label: "Localidad", type: "select", options: localities, required: true }, // Add options dynamically
// ]

