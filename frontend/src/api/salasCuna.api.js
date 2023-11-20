import axios from "axios";

export function cribroom_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/cribroomDir/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`,
    'method': method,
    'headers': headers,
    'data': data,
  });
}

export function child_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/child/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function payout_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/payout/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function user_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/user/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function guardian_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/GuardianListCreateView/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function phone_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/phone/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function cribroomUser_request(tokens, method='get', depth=0, data={}, pk=undefined, filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/cribroomUser/${pk ? (pk+'/') : '' }?depth=${depth}${filters}`, 
    'method': method, 
    'headers': headers, 
    'data': data,
  });
}

export function technicalReport_request(tokens, method='get', pk, initial_date, end_date) {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/technical-report/${pk}/${initial_date}/${end_date}/`, 
    'method': method, 
    'headers': headers,
  });
}

export function guardianType_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/GuardianTypeListView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function groupViewSet_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/GroupViewSet/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function locality_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/LocalityListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function phoneFeature_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/PhoneFeatureListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function neighborhood_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/NeighborhoodListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function gender_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/GenderListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function idenType_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/IdentTypeListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function sectional_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/SectionalListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function coManagement_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/Co_managementListCreateView/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function shift_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/shift/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function department_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/department/${filters}`, 
    'method': method, 
    'headers': headers
  });
}

export function zone_request(tokens, method='get', filters='') {
  const headers = { "Content-Type": "application/json", "Authorization": "JWT " + tokens, "Accept": "application/json"}

  return axios.request({
    'url': `/api/zone/${filters}`, 
    'method': method, 
    'headers': headers
  });
}






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
  return axios.get("/api/GenderListCreateView/", {headers: headers});
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
  return axios.get("/api/PhoneFeatureListCreateView/", {headers: headers});
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

export function getAllNeighborhood(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/NeighborhoodListCreateView/", {headers: headers});
}

export function getAllLocalities(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/LocalityListCreateView/", {headers: headers});
}

export function getAllShifts(tokens) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + tokens,
    "Accept": "application/json"
  }
  return axios.get("/api/shift/", {headers: headers});
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
