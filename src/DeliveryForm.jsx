
import { useEffect, useRef, useState } from "react";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!/^09\d{8}$/.test(form.phone.trim())) {
    errors.phone =
      "Enter a valid TeleBirr number, for example 0912345678.";
  }

  if (!form.area.trim()) {
    errors.area = "Please enter your delivery area.";
  }

  return errors;
}

function DeliveryForm({ total = 0 }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const notesRef = useRef(null);

  // Derive errors on every render.
  const errors = validate(form);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setSubmitError("");
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  };

  const focusFirstBadField = (currentErrors) => {
    if (currentErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (currentErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (currentErrors.area) {
      areaRef.current?.focus();
      return;
    }

    if (currentErrors.notes) {
      notesRef.current?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    // Mark all fields as touched when submitting.
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    const currentErrors = validate(form);

    // Stop submission if validation fails.
    if (Object.keys(currentErrors).length > 0) {
      focusFirstBadField(currentErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // Simulate sending the order request.
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      alert(
        `Order for ${form.name} will be delivered to ${
          form.area
        }. Total: ${Number(total).toFixed(2)} ETB`
      );
    } catch (error) {
      setSubmitError(
        "We couldn't submit your order. Please check your connection and try again."
      );

      // Keep all form values and focus the first bad field.
      focusFirstBadField(validate(form));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitError) {
      focusFirstBadField(errors);
    }
  }, [submitError]);

  return (
    <form
      onSubmit={handleSubmit}
      className="delivery-form"
      noValidate
    >
      <h2>TeleBirr Delivery</h2>

      {submitError && (
        <div role="alert" className="form-submit-error">
          {submitError}
        </div>
      )}

      {/* Name */}
      <div className="form-field">
        <label htmlFor="delivery-name">
          Name
        </label>

        <input
          ref={nameRef}
          id="delivery-name"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={
            touched.name && errors.name
              ? "name-error"
              : undefined
          }
        />

        {touched.name && errors.name && (
          <div id="name-error" role="alert">
            {errors.name}
          </div>
        )}
      </div>

      {/* TeleBirr phone */}
      <div className="form-field">
        <label htmlFor="delivery-phone">
          TeleBirr phone
        </label>

        <input
          ref={phoneRef}
          id="delivery-phone"
          type="tel"
          name="phone"
          placeholder="0912345678"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.phone && !!errors.phone}
          aria-describedby={
            touched.phone && errors.phone
              ? "phone-error"
              : undefined
          }
        />

        {touched.phone && errors.phone && (
          <div id="phone-error" role="alert">
            {errors.phone}
          </div>
        )}
      </div>

      {/* Delivery area */}
      <div className="form-field">
        <label htmlFor="delivery-area">
          Delivery area
        </label>

        <input
          ref={areaRef}
          id="delivery-area"
          type="text"
          name="area"
          placeholder="Your delivery area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.area && !!errors.area}
          aria-describedby={
            touched.area && errors.area
              ? "area-error"
              : undefined
          }
        />

        {touched.area && errors.area && (
          <div id="area-error" role="alert">
            {errors.area}
          </div>
        )}
      </div>

      {/* Optional notes */}
      <div className="form-field">
        <label htmlFor="delivery-notes">
          Notes (optional)
        </label>

        <textarea
          ref={notesRef}
          id="delivery-notes"
          name="notes"
          placeholder="Any delivery instructions?"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={submitting}>
        {submitting
          ? "Submitting..."
          : `Confirm Delivery — ${Number(total).toFixed(
              2
            )} ETB`}
      </button>
    </form>
  );
}

export default DeliveryForm;

