const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
  'https://jsonplaceholder.typicode.com/todos/6',
  'https://jsonplaceholder.typicode.com/todos/7',
  'https://jsonplaceholder.typicode.com/todos/8',
]
let index = 0;

const customFetch = async (url, key, output) => {
	index += 1;
	const fetchResponse = await fetch(url);
  const fetchData = await fetchResponse.json();
  // console.log('fetchData', fetchData)
  
  console.log('3')

  output[key] = fetchData;
  index -= 1;
};

const rec = (urls, key, limit, output, callback) => {
	// console.log('output', output)
	if (key < urls.length - 1) {
  	console.log('1')
  
    customFetch(urls[key], key, output);
  	console.log('2')


    if (index < limit) {
    	console.log('index', index);
      rec(urls, ++key, limit, output, callback);
      
    }
  }
  else {
  	callback(output);
  }
};

const getData = async (urls, limit, callback = () => {}) => {
	const output = [];
  let i = 0;
  
  rec(urls, 0, limit, output, callback);
};
getData(urls, 3, (data) => console.log('data', data));