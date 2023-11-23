// Agrega la importación de Form al comienzo del archivo
import Form from 'react-bootstrap/Form';


// formUtils.js
export function renderformFieldsLocal(fields, prefix, formData, setFormData, handleInputChange) {
  return Object.keys(fields).map((fieldName) => {
    const field = fields[fieldName];

    return (
      <Form.Group className="mb-1" key={`${prefix}_${field.name}`}>
        <Form.Label className="mb-1">{field.label}</Form.Label>
        {field.type === "select" ? (
          <select
            name={`${prefix}_${field.name}`}
            value={formData[field.name]} // Cambiado aquí
            onChange={handleInputChange}
            className="form-control"
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option[Object.keys(option)[1]]}
              </option>
            ))}
          </select>
        ) : field.type === "checkbox" ? (
          <Form.Check
            type="checkbox"
            label={`${prefix}_${field.label}`}
            name={`${prefix}_${field.name}`}
            checked={formData[`${prefix}_${field.name}`]}
            onChange={(e) => setFormData({
              ...formData,
              [`${prefix}_${field.name}`]: e.target.checked,
            })}
            required={field.required} />
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            name={`${prefix}_${field.name}`}
            value={formData[`${prefix}_${field.name}`]}
            onChange={handleInputChange}
            required={field.required} />
        )}
      </Form.Group>
    );
  });
}

// formUtils.js
export function generatePayload(formData) {
  const payload = {};

  // Iterar sobre las claves de formData para construir el payload
  Object.keys(formData).forEach((key) => {
    // Dividir la clave usando '_' para obtener el prefijo y el nombre del campo
    const [prefix, ...rest] = key.split('_');
    const fieldName = rest.join('_');  // Reconstruir el nombre del campo

    // Verificar si el prefijo existe en el payload, si no, inicializarlo como un objeto vacío
    if (!payload[prefix]) {
      payload[prefix] = {};
    }

    // Asignar el valor al campo correspondiente en el payload
    if (typeof formData[key] === "object" && formData[key] !== null) {
    console.log(formData[key]);
    payload[prefix][fieldName] = formData[key].id;
    } else {
      payload[prefix][fieldName] = formData[key];
    }
    if (fieldName === 'is_active' && typeof formData[key] !== "boolean"){
      payload[prefix][fieldName] = (formData[key] === 'Activo' || formData[key] === 'Inactivo') ? true : false;
    }
  });

  return payload;
}


