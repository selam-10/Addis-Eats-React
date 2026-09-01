export async function loadDishes(signal) {
  const response = await fetch("/dishes.json", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to load dishes.");
  }

  return response.json();
}