import axios from "axios";

export const getAllCribrooms = () => {
  return axios.get("/api/cribroom/");
};

export const getAllCribroomsWithoutDepth = () => {
  return axios.get("/api/cribroom/?no_depth");
};

export const getAllZones = () => {
  return axios.get("/api/zone/");
};

export const getAllLocalities = () => {
  return axios.get("/api/LocalityListView/") ;
};

export const getAllShifts = async () => {
  return axios.get("/api/ShiftListView/");
};

export const getAllUsers = async () => {
  return axios.get("/api/user/");
};

export const getAllGroup = async () => {
  return axios.get("/api/GroupViewSet/");
}

export const getAllDepartments = async () => {
  return axios.get("/api/department/")
}

export const handlePermissions = async (status) => {
  if (status === 403) {
    alert("Acceso restringido: No tienes permisos para acceder a esta pagina");
    window.location.assign("/");
  }
}