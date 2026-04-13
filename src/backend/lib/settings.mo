import Types "../types";
import List "mo:core/List";

module {
  public func calcSecurityScore(
    settings : Types.ProtectionSettings,
    totalWarnings : Nat,
    totalScanned : Nat,
  ) : Nat {
    var score : Nat = 50;
    if (settings.emailProtection)   { score += 10 };
    if (settings.smsProtection)     { score += 10 };
    if (settings.browserProtection) { score += 10 };
    if (settings.silentScan)        { score += 5 };
    if (settings.aiIntel)           { score += 5 };
    // Reduce score based on threat ratio
    if (totalScanned > 0) {
      let ratio = (totalWarnings * 100) / totalScanned;
      if (ratio > 20) { score := if (score >= 10) score - 10 else 0 };
    };
    if (score > 100) 100 else score;
  };

  public func defaultSettings() : Types.ProtectionSettings {
    {
      var emailProtection   = true;
      var smsProtection     = true;
      var browserProtection = true;
      var silentScan        = false;
      var aiIntel           = true;
    };
  };

  public func settingsToPublic(s : Types.ProtectionSettings) : Types.ProtectionSettingsPublic {
    {
      emailProtection   = s.emailProtection;
      smsProtection     = s.smsProtection;
      browserProtection = s.browserProtection;
      silentScan        = s.silentScan;
      aiIntel           = s.aiIntel;
    };
  };
};
