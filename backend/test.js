const apicall=async (url)=>{
      console.log('inside apicall');
      try {
         const response = await fetch(url);
            if (!response.ok) {
         console.error("API Error:", response.status, response.statusText);
            return; // stop here if server returned 502, 403, etc.
         }
         const data = await response.json();
            return data;
      } catch (error) {
         console.log("error",error);
         throw new Error('Failed to fetch data');
      }
}
const key1='579b464db66ec23bdd00000167b7ff98f2624d347940907b1ec08283';
const url='https://api.data.gov.in/resource/3c2187bf-3f96-4f0c-9639-0aae9f5ac238?api-key=579b464db66ec23bdd00000167b7ff98f2624d347940907b1ec08283&format=json&limit=10';
apicall(url).then(data=>console.log(data)).catch(err=>console.log(err));