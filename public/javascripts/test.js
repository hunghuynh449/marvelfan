const API = 'https://my-json-server.typicode.com/hunghuynh449/nodejs_demo/db';


async function getAPI() {
    const resp = await fetch(API);
    const respData = await resp.json();

    console.log(respData);

    respData.products.forEach(product => {
        const p = document.createElement('p')
        p.innerText = product.id + " " + product.name;
        document.body.appendChild(p);
    })
    return respData;
}

getAPI();
