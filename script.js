const superherotoken = 'de2c901efd654b07919feee01854cee2';
const baseurl = `https://superheroapi.com/api.php/${superherotoken}`;

const newherobtn = document.getElementById('newherobtn');
const heroimage = document.getElementById('heroimage');
const searchbtn = document.getElementById('searchbtn');
const searchinput = document.getElementById('searchinput');

const getrandomsuperhero = (id) => {
  fetch(`${baseurl}/${id}`)
    .then(response => response.json())
    .then(data => {
      const name = `<h2>${data.name}</h2>`;
      const intelligence = `<p>Intelligence: ${data.powerstats.intelligence}</p>`;
      const strength = `<p>Strength: ${data.powerstats.strength}</p>`;
      heroimage.innerHTML = `${name}<img src="${data.image.url}" height="200" width="200"/>${intelligence}${strength}`;
    })
    .catch(error => {
      console.error('Error fetching superhero:', error); // Handle any errors
    });
}

const getsearchsuperhero = (name) => {
  if (!name) {
    alert('Please enter a superhero name.'); // Alert for empty input
    return;
  }

  fetch(`${baseurl}/search/${name}`)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const hero = data.results[0];
        heroimage.innerHTML = `<h2>${hero.name}</h2><img src="${hero.image.url}" height="200" width="200"/>`;
      } else {
        alert('No superhero found with that name. Please try again.'); // Alert for no results
      }
    })
    .catch(error => {
      console.error('Error fetching superhero:', error); // Handle any errors
    });
}

const randomhero = () => {
  const numberofheros = 731;
  return Math.floor(Math.random() * numberofheros) + 1;
}

newherobtn.onclick = () => getrandomsuperhero(randomhero());
searchbtn.onclick = () => getsearchsuperhero(searchinput.value);
