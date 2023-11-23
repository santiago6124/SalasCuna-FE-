
import Form from "react-bootstrap/Form/";

export function renderFormFields(fields, formData, handleInputChange) {

    return fields.map((field) => (
      <Form.Group className="mb-3" key={field.name}>
        <Form.Label className="mb-1">{field.label}</Form.Label>
        {field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="form-control"
            required={field.required}
          >
            {field.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option[Object.keys(option)[1]]} {/* Adjust this based on your option structure */}
              </option>
            ))}
          </select>
        ) : (
          <Form.Control
            type={field.type}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            required={field.required}
          />
        )}
      </Form.Group>
    ));
}