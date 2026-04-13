var ScanResult = /* @__PURE__ */ ((ScanResult2) => {
  ScanResult2["safe"] = "safe";
  ScanResult2["spam"] = "spam";
  ScanResult2["phishing"] = "phishing";
  ScanResult2["malware"] = "malware";
  return ScanResult2;
})(ScanResult || {});
var ScanType = /* @__PURE__ */ ((ScanType2) => {
  ScanType2["qr"] = "qr";
  ScanType2["url"] = "url";
  ScanType2["email"] = "email";
  return ScanType2;
})(ScanType || {});
var ThreatSource = /* @__PURE__ */ ((ThreatSource2) => {
  ThreatSource2["qr"] = "qr";
  ThreatSource2["sms"] = "sms";
  ThreatSource2["url"] = "url";
  ThreatSource2["email"] = "email";
  return ThreatSource2;
})(ThreatSource || {});
var ThreatType = /* @__PURE__ */ ((ThreatType2) => {
  ThreatType2["spam"] = "spam";
  ThreatType2["phishing"] = "phishing";
  ThreatType2["malware"] = "malware";
  return ThreatType2;
})(ThreatType || {});
function normalizeAlert(alert) {
  return {
    id: alert.id.toString(),
    url: alert.url,
    source: alert.source,
    isRead: alert.isRead,
    threatName: alert.threatName,
    threatType: alert.threatType,
    timestamp: Number(alert.timestamp) / 1e6,
    // ns → ms
    riskScore: Number(alert.riskScore)
  };
}
function normalizeScan(entry) {
  return {
    id: entry.id.toString(),
    url: entry.url,
    result: entry.result,
    scanType: entry.scanType,
    timestamp: Number(entry.timestamp) / 1e6,
    confidence: Number(entry.confidence)
  };
}
export {
  ScanResult as S,
  ThreatType as T,
  ThreatSource as a,
  normalizeScan as b,
  ScanType as c,
  normalizeAlert as n
};
