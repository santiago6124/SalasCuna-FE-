import axios from "axios";

export function getAllCribrooms(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/cribroom/", {headers: headers});
}

export function getAllGenders(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/GenderListView/", {headers: headers});
}

export function getAllGuardianTypes(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/GuardianTypeListView/", {headers: headers});
}

export function getAllPhoneFeatures(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/PhoneFeatureListView/", {headers: headers});
}

export function getAllCribroomsWithoutDepth(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/cribroom/?no_depth", {headers: headers});
}

export function getAllZones(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/zone/", {headers: headers});
}

export function getTechnicalReportTableListCreateView(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/TechnicalReportTableListCreateView/", {headers: headers});
}

export function getAllNeighborhood(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/NeighborhoodListView/", {headers: headers});
}

export function getAllLocalities(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/LocalityListView/", {headers: headers});
}

export function getAllShifts(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/ShiftListView/", {headers: headers});
}

export function getAllUsers(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/user/", {headers: headers});
}

export function getAllGroup(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/GroupViewSet/?exclude_directora", {headers: headers});
}

export function getAllDepartments(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/department/", {headers: headers});
}
export function getUserHistory(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/logEntry/", {headers: headers});
}
export function getAllChildren(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/child/", {headers: headers});
}

export async function handlePermissions(status) {
  if (status === 403) {
    alert("Acceso restringido: No tienes permisos para acceder a esta pagina");
    window.location.assign("/home-page");
  }
}
