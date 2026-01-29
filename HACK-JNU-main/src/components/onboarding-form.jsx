import { useState } from "react";

export function OnboardingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Onboarding Data:", formData);

    // ✅ Only pass data to parent
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-lg font-semibold text-center">
        Business Onboarding
      </h2>

      {["ownerName", "businessName", "city", "state"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      ))}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md"
      >
        Continue
      </button>

    </form>
  );
}
