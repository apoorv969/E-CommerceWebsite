// A mock function to mimic making an async request for data
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(process.env.REACT_APP_BACKEND + "/products/"+id)
    const data = await response.json()
    resolve({data})
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch(process.env.REACT_APP_BACKEND + "/products/",{
      method: "POST",
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_BACKEND + "/products/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductsByFilter(filter,sort,pagination,admin) {

  let queryString = '';
   for(let key in filter){
        const cateogryValues = filter[key];
        if(cateogryValues.length){
        const lastCateogryValue = cateogryValues[cateogryValues.length-1]
        queryString += `${key}=${lastCateogryValue}&`;
        }
   }
   for(let key in sort){
    queryString += `${key}=${sort[key]}&`;

   }
console.log(pagination);
   for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
   }

   if(admin){
    queryString += `admin=true`;
         
   }
  return new Promise(async (resolve) =>{
    const response = await fetch(process.env.REACT_APP_BACKEND + "/products?" + queryString)
    const data = await response.json()
    // const totalItems = await response.headers.get('X-Total-Count')

    // resolve({data:{products:data,totalItems:+totalItems}})
    resolve({data:{products:data}})
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch(process.env.REACT_APP_BACKEND + "/categories")
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch(process.env.REACT_APP_BACKEND + "/brands")
    const data = await response.json()
    resolve({data})
  }
  );
}