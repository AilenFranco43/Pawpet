import { useState } from "react";
import { neighborhoods } from "../../data/neighborhood";
import ErrorMessage from "../ui/ErrorMessage";
import api from "../../lib/axios";
import { isAxiosError } from "axios";
import { useParams } from "react-router";
import { PhoneInput } from "../ui/PhoneInput";


export default function OwnerForm2({ prevForm, nextForm }) {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (selectedCode, phoneNumber) => {
    setData({ ...data, phone: `${selectedCode}${phoneNumber}` });
    setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.about) newErrors.about = "La descripción es obligatoria";
    if (!data.nationality) newErrors.nationality = "La nacionalidad es obligatoria";
    if (!data.neighborhood) newErrors.neighborhood = "El barrio es obligatorio";
    if (!data.phone || data.phone.length <= 8) newErrors.phone = "El teléfono es obligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    try {
      const request = await api.put(`/users/${id}`, data);
      console.log(request);
      nextForm();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <main className="formuaaa">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>INFORMACIÓN ADICIONAL</h2>

          <label htmlFor="nationality">Nacionalidad:</label>
          <input
            onChange={handleChange}
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Escribe tu nacionalidad"
            value={data.nationality}
          />
          {errors.nationality && <ErrorMessage>{errors.nationality}</ErrorMessage>}

          <label htmlFor="neighborhood">Barrio:</label>
          <select onChange={handleChange} value={data.neighborhood} name="neighborhood" id="neighborhood">
            <option value="">--Selecciona tu barrio--</option>
            {neighborhoods.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}

          <PhoneInput handlePhoneChange={handlePhoneChange} errors={errors} />

          <label htmlFor="about">Breve descripción sobre vos:</label>
          <textarea
            onChange={handleChange}
            className="sss"
            id="about"
            name="about"
            rows="4"
            placeholder="Escribe una breve descripción sobre ti"
          ></textarea>
          {errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}

          <input className="btn-input" type="submit" value="Guardar y continuar" />
        </form>
      </div>
    </main>
  );
}


