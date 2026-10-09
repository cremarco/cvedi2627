// Generated artwork changes presentation only; source weather codes stay intact.
export const weatherIconCells = {
  '1': {column:0,row:0,label:'Sereno, giorno'},
  '3': {column:1,row:0,label:'Poco nuvoloso, giorno'},
  '4': {column:2,row:0,label:'Nubi sparse, giorno'},
  '103': {column:0,row:1,label:'Poco nuvoloso, notte'},
  '104': {column:1,row:1,label:'Nubi sparse, notte'},
  '109': {column:2,row:1,label:'Pioggia debole'},
};
export function weatherIcon(id) {
  const cell=weatherIconCells[String(id)];
  return cell ? `<span class="weather-symbol weather-symbol-generated" data-weather-symbol="${id}" aria-hidden="true" style="background-position:${cell.column*50}% ${cell.row*100}%"></span>` : '';
}
export const searchIcon = '<span class="ui-icon ui-icon-search" aria-hidden="true"></span>';
export const switchIcon = '<span class="ui-icon ui-icon-switch" aria-hidden="true"></span>';
