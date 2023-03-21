const getMusics = async (id) => {
  const request = async () => {
    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
