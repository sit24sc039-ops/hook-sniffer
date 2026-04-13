module {
  public type ThreatType = { #phishing; #malware; #spam };
  public type ThreatSource = { #email; #url; #qr; #sms };
  public type ScanType = { #url; #qr; #email };
  public type ScanResult = { #safe; #phishing; #malware; #spam };

  public type ThreatAlert = {
    id : Nat;
    threatName : Text;
    url : Text;
    riskScore : Nat; // 0-100
    threatType : ThreatType;
    source : ThreatSource;
    timestamp : Int;
    var isRead : Bool;
  };

  public type ThreatAlertPublic = {
    id : Nat;
    threatName : Text;
    url : Text;
    riskScore : Nat;
    threatType : ThreatType;
    source : ThreatSource;
    timestamp : Int;
    isRead : Bool;
  };

  public type ScanEntry = {
    id : Nat;
    url : Text;
    scanType : ScanType;
    result : ScanResult;
    confidence : Nat; // 0-100
    timestamp : Int;
  };

  public type ProtectionSettings = {
    var emailProtection : Bool;
    var smsProtection : Bool;
    var browserProtection : Bool;
    var silentScan : Bool;
    var aiIntel : Bool;
  };

  public type ProtectionSettingsPublic = {
    emailProtection : Bool;
    smsProtection : Bool;
    browserProtection : Bool;
    silentScan : Bool;
    aiIntel : Bool;
  };

  public type LinkedEmail = {
    var provider : Text;
    var emailAddress : Text;
    var isLinked : Bool;
  };

  public type LinkedEmailPublic = {
    provider : Text;
    emailAddress : Text;
    isLinked : Bool;
  };

  public type LinkedPhone = {
    var phoneNumber : Text;
    var isLinked : Bool;
  };

  public type LinkedPhonePublic = {
    phoneNumber : Text;
    isLinked : Bool;
  };

  public type Stats = {
    totalScanned : Nat;
    totalWarnings : Nat;
    totalBlocked : Nat;
  };
};
