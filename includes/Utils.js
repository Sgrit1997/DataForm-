/**
 * Ritorna la data di N giorni fa in formato YYYYMMDD senza usare dipendenze esterne.
 * @param {number} daysAgo
 * @returns {string}
 */
function dateNDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
 
  // YYYY-MM-DD → YYYYMMDD
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
 
function getTargetDate(vars) {
  // tenta lettura da vars Dataform
  if (globalThis.dataform &&
      dataform.projectConfig &&
      dataform.projectConfig.vars &&
      dataform.projectConfig.vars.target_date) {  
    return dataform.projectConfig.vars.target_date;
  }
 
  if(globalThis.dataform &&
     dataform.projectConfig &&
     dataform.projectConfig.vars &&
     dataform.projectConfig.vars.n_days_ago) {
    return dateNDaysAgo(parseInt(dataform.projectConfig.vars.n_days_ago, 10));
  }
 
  // default
  return dateNDaysAgo(2);
}
 
function getDataplexDaySuffix(targetDate) {
  if (targetDate === dateNDaysAgo(1)) {
    return "1_days_before";
  }
  if (targetDate === dateNDaysAgo(2)) {
    return "2_days_before";
  }
  return null;
}
 
function getDBName() {
  const env = dataform.projectConfig.vars.env;
  const isProd = env === "prod";
  return isProd ? 'sl-dataanalytics-ga4-prod' : 'sl-dataanalytics-ga4-coll';
}
 
function getDataformSchema() {
  //questo è stato tenuto uguale per collaudo e produzione
  return "ga4_cleansed_ecom35";
}
 
function getGA4Schema() {
  const env = dataform.projectConfig.vars.env;
  const isProd = env === "prod";
  return isProd ? "analytics_432611887" : "analytics_431813111";
}
 
 
module.exports = {
  dateNDaysAgo,
  getTargetDate,
  getDataplexDaySuffix,
  getDBName,
  getGA4Schema,
  getDataformSchema
};