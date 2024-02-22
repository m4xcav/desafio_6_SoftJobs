const prepararHATEOAS = async (joyas) => {
    console.log('Contenido de joyas.rows:', joyas);

    const results = joyas.map((j) => {
        return {
            name: j.nombre,
            href: `/joyas/joya/${j.id}`,
        };
    });

    const totalJoyas = results.length;
    const stockTotal = joyas.reduce((total, j) => total + j.stock, 0);

    const HATEOAS = {
        totalJoyas,
        stockTotal,
        results,
    };

    return HATEOAS;
};
module.exports = {
	prepararHATEOAS,
};