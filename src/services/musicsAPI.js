const getMusics = async (id) => {
  let request = null

    try {
      request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, {
        headers: {
          'Origin': 'https://onoue9.github.io'
        }
      });
    } catch (error) {
      console.log(error);
    }

  const requestJson = await request.json();

  return requestJson.results;
};

export default getMusics;
