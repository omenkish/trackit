export const genericRequest = async (url, data, httpMethod) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  
  try {
    const response = await fetch(url, {
      method: httpMethod.toUpperCase(),
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: data ? JSON.stringify(data) : null
    }).then((response) => response.json());
    if (response.error) throw response.error;

    return response;

  } catch(error) {
    throw error;
  }
};

export const getRequest = async url => {
  try {
    const response = await fetch(url, {
      method: 'GET',
    }).then((response) => response.json());
    if (response.error) throw response.error;

    return response;
  } catch (error) {
    throw error;
  }
}
