const combos = [
    {
      "nombre": "Box London",
      "precio": 4700,
      "descripcion": "8 frutillas decoradas a tu gusto acompañado por 1 botella de Chamdon 187ml, 12 Ferrero Rocher y flores de temporada.",
      "img": "/img/box-london.jpg"
    },
    {
      "nombre": "Box Grecia",
      "precio": 8800,
      "descripcion": "8 frutillas decoradas a tu gusto acompañado por 1 botella de Chamdon 187ml y 1 chocolate.",
      "img": "/img/box-grecia.jpg"
    },
    {
      "nombre": "Box Venecia",
      "precio": 13700,
      "descripcion": "8 frutillas decoradas a tu gusto acompañado por 6 rosas y 12 ferrero rocher.",
      "img": "/img/box-venecia.jpg"
    }
]

// traer los items del array que devuelve una promesa
export const traerCombo = () => {
    return new Promise((resolve, reject)=>{
        if(items.length > 0){
            setTimeout(()=> {
                resolve(items);
            },1500)
        } else {
            reject (new Error("No hay combos para mostrar"))
        }
    })
}

// traer produtos de json con func asincronica
const API = "../combos.json"
export const traerCatalogo = async () => {
    const response = await fetch(API);
    const data = await response.json();
    return data;
}
