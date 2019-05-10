window.addEventListener('DOMContentLoaded', (e) => {
  // Retrieve data
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = () => {
    console.log(xhr.responseText);
  };

  xhr.send();
});
