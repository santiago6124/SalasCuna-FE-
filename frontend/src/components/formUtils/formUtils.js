// Agrega la importación de Form al comienzo del archivo
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";

// formUtils.js
export function renderformFieldsLocal(
  fields,
  prefix,
  formData,
  setFormData,
  handleInputChange
) {
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
            onChange={(e) =>
              setFormData({
                ...formData,
                [`${prefix}_${field.name}`]: e.target.checked,
              })
            }
            required={field.required}
          />
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            name={`${prefix}_${field.name}`}
            value={formData[`${prefix}_${field.name}`]}
            onChange={handleInputChange}
            required={field.required}
          />
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
    const [prefix, ...rest] = key.split("_");
    const fieldName = rest.join("_"); // Reconstruir el nombre del campo

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
    if (fieldName === "is_active" && typeof formData[key] !== "boolean") {
      payload[prefix][fieldName] =
        formData[key] === "Activo" || formData[key] === "Inactivo"
          ? true
          : false;
    }
  });

  return payload;
}

export function renderFormPoll(answer, handlePollInputChange, userAnswers) {
  return (
    <div key={answer.id}>
      <Form.Group className="mb-1">
        <Form.Label className="mb-1">{answer.description}</Form.Label>
        {answer.answerType === "String" ? (
          <Form.Control
            type="text"
            placeholder={`Ingrese ${answer.description}`}
            name={`${answer.id}`}
            value={userAnswers[answer.id] || ""}
            onChange={(e) => handlePollInputChange(answer.id, e)}
          />
        ) : answer.answerType === "Boolean" ? (
          <Form.Check
            type="checkbox"
            name={`${answer.id}`}
            checked={userAnswers[answer.id] || false}
            onChange={(e) => handlePollInputChange(answer.id, e)}
          />
        ) : (
          <Form.Control
            type="number"
            placeholder={`Ingrese ${answer.description}`}
            name={`${answer.id}`}
            value={userAnswers[answer.id] || ""}
            onChange={(e) => handlePollInputChange(answer.id, e)}
          />
        )}
      </Form.Group>
    </div>
  );
}

export function renderLabelsl(fields, prefix, labelData, setLabelData) {
  return Object.keys(fields).map((fieldName) => {
    const field = fields[fieldName];

    return (
      <Form.Group
        className="mb-1"
        key={`${prefix}_${field.name}`}
      >
        <Row>
          <Form.Label className="mb-1">{field.label}</Form.Label>
        </Row>
        <Row>
          {field.type === "select" ? (
            <select
              disabled
              name={`${prefix}_${field.name}`}
              value={labelData[field.name]} // Cambiado aquí
              className="border border-black rounded p-2 form-control"
              required={field.required}
            >
              {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option[Object.keys(option)[1]]}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <Form.Label
              type="checkbox"
              disabled
              label={`${prefix}_${field.label}`}
              name={`${prefix}_${field.name}`}
              checked={labelData[`${prefix}_${field.name}`]}
              onChange={(e) =>
                setLabelData({
                  ...labelData,
                  [`${prefix}_${field.name}`]: e.target.checked,
                })
              }
              required={field.required}
            />
          ) : (
            <Form.Label
              className="border border-black rounded p-2"
              type={field.type}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
              name={`${prefix}_${field.name}`}
              value={labelData[`${prefix}_${field.name}`]}
              required={field.required}
            >
              {labelData[`${prefix}_${field.name}`]}
            </Form.Label>
          )}
        </Row>
      </Form.Group>
    );
  });
}
