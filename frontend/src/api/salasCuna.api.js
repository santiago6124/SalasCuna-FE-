import axios from "axios";

export function getAllCribrooms() {
  return axios.get("/api/cribroom/");
}

export function getAllGenders() {
  return axios.get("/api/GenderListView/");
}

export function getAllGuardianTypes() {
  return axios.get("/api/GuardianTypeListView/");
}

export function getAllPhoneFeatures() {
  return axios.get("/api/PhoneFeatureListView/");
}

export function getAllCribroomsWithoutDepth() {
  return axios.get("/api/cribroom/?no_depth");
}

export function getAllZones() {
  return axios.get("/api/zone/");
}

export function getAllNeighborhood() {
  return axios.get("/api/NeighborhoodListView/");
}

export function getAllLocalities() {
  return axios.get("/api/LocalityListView/");
}

export function getAllShifts() {
  return axios.get("/api/ShiftListView/");
}

export function getAllUsers() {
  return axios.get("/api/user/");
}

export function getAllGroup() {
  return axios.get("/api/GroupViewSet/?exclude_directora");
}

export function getAllDepartments() {
  return axios.get("/api/department/");
}
export function getUserHistory(){
  return axios.get("/api/logEntry/");
}

export async function handlePermissions(status) {
  if (status === 403) {
    alert("Acceso restringido: No tienes permisos para acceder a esta pagina");
    window.location.assign("/home-page");
  }
}

