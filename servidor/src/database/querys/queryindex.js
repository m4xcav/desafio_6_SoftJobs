const selectJoyas = `SELECT * FROM inventario order by
%s %s LIMIT %s OFFSET %s`;
const joyaid = `SELECT * FROM inventario WHERE id = $1`;
//aqui crear la querry con filtros llamas la const selectFiltros
const selectFiltros = `SELECT * FROM inventario`;
module.exports = {
	selectJoyas,
	selectFiltros,
	joyaid,
};