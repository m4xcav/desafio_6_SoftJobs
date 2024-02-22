const db = require('../database/dbindex');
const getJoyasPorFiltros = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = [];
    if (precio_min) filtros.push(`precio >= ${precio_min}`);
    if (precio_max) filtros.push(`precio <= ${precio_max}`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);

    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`;
    }
    console.log("la consulta es:  "+consulta);
    const { rows: joyas } = await db.query(consulta);
    console.log("el resultado del query filtrado = "+joyas);
    return joyas;
};
module.exports = {
    getJoyasPorFiltros,
}