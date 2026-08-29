import { useState } from "react";

function DeliveryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const isTeleBirrValid = /^09\d{8}$/.test(form.phone);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isTeleBirrValid) {
      return;
    }

    alert(`Order for ${form.name} will be delivered to ${form.area}.`);
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <h2>TeleBirr Delivery</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="TeleBirr number (09XXXXXXXX)"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="area"
        placeholder="Delivery area"
        value={form.area}
        onChange={handleChange}
      />

      <button type="submit" disabled={!isTeleBirrValid}>
        Confirm Delivery
      </button>
    </form>
  );
}

export default DeliveryForm;

