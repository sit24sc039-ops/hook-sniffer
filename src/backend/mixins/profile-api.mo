import Types "../types";
import SettingsLib "../lib/settings";

mixin (
  settings : Types.ProtectionSettings,
  linkedEmail : Types.LinkedEmail,
  linkedPhone : Types.LinkedPhone,
  totalWarnings : { var val : Nat },
  totalScanned : { var val : Nat },
) {
  /// Get protection settings
  public query func getProtectionSettings() : async Types.ProtectionSettingsPublic {
    SettingsLib.settingsToPublic(settings);
  };

  /// Update protection settings
  public func updateProtectionSettings(updated : Types.ProtectionSettingsPublic) : async () {
    settings.emailProtection   := updated.emailProtection;
    settings.smsProtection     := updated.smsProtection;
    settings.browserProtection := updated.browserProtection;
    settings.silentScan        := updated.silentScan;
    settings.aiIntel           := updated.aiIntel;
  };

  /// Get linked email account info
  public query func getLinkedEmail() : async Types.LinkedEmailPublic {
    { provider = linkedEmail.provider; emailAddress = linkedEmail.emailAddress; isLinked = linkedEmail.isLinked };
  };

  /// Link an email account
  public func linkEmail(provider : Text, emailAddress : Text) : async () {
    linkedEmail.provider      := provider;
    linkedEmail.emailAddress  := emailAddress;
    linkedEmail.isLinked      := true;
  };

  /// Unlink the email account
  public func unlinkEmail() : async () {
    linkedEmail.provider      := "";
    linkedEmail.emailAddress  := "";
    linkedEmail.isLinked      := false;
  };

  /// Get linked phone info
  public query func getLinkedPhone() : async Types.LinkedPhonePublic {
    { phoneNumber = linkedPhone.phoneNumber; isLinked = linkedPhone.isLinked };
  };

  /// Link a phone number
  public func linkPhone(phoneNumber : Text) : async () {
    linkedPhone.phoneNumber := phoneNumber;
    linkedPhone.isLinked    := true;
  };

  /// Unlink the phone number
  public func unlinkPhone() : async () {
    linkedPhone.phoneNumber := "";
    linkedPhone.isLinked    := false;
  };

  /// Get the current security score (0-100)
  public query func getSecurityScore() : async Nat {
    SettingsLib.calcSecurityScore(settings, totalWarnings.val, totalScanned.val);
  };
};
