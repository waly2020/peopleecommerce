/**
 * recupere l'heur actuel.
 * @return {string}
 */
function getHour() {
    const d = new Date();
    return `${d.getHours()}H : ${d.getMinutes()}M : ${d.getSeconds()}S.`;
}
module.exports = {
    getHour,
}