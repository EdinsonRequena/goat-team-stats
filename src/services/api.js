const API_BASE_URL = "http://localhost:3000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const get = async (url) => {
  const response = await fetch(`${API_BASE_URL}/${url}`);
  return handleResponse(response);
};

export const post = async (url, body) => {
  const response = await fetch(`${API_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};
