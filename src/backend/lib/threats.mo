import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func toPublic(alert : Types.ThreatAlert) : Types.ThreatAlertPublic {
    {
      id = alert.id;
      threatName = alert.threatName;
      url = alert.url;
      riskScore = alert.riskScore;
      threatType = alert.threatType;
      source = alert.source;
      timestamp = alert.timestamp;
      isRead = alert.isRead;
    };
  };

  public func getAll(alerts : List.List<Types.ThreatAlert>) : [Types.ThreatAlertPublic] {
    let sorted = alerts.sort(func(a, b) { if (a.timestamp > b.timestamp) #less else if (a.timestamp < b.timestamp) #greater else #equal });
    sorted.map<Types.ThreatAlert, Types.ThreatAlertPublic>(toPublic).toArray();
  };

  public func getUnreadCount(alerts : List.List<Types.ThreatAlert>) : Nat {
    alerts.foldLeft<Nat, Types.ThreatAlert>(0, func(acc, a) { if (not a.isRead) acc + 1 else acc });
  };

  public func markRead(alerts : List.List<Types.ThreatAlert>, id : Nat) {
    alerts.mapInPlace(func(a) {
      if (a.id == id) { a.isRead := true; a } else a
    });
  };

  public func addAlert(
    alerts : List.List<Types.ThreatAlert>,
    nextId : Nat,
    threatName : Text,
    url : Text,
    riskScore : Nat,
    threatType : Types.ThreatType,
    source : Types.ThreatSource,
  ) : Types.ThreatAlert {
    let alert : Types.ThreatAlert = {
      id = nextId;
      threatName;
      url;
      riskScore;
      threatType;
      source;
      timestamp = Time.now();
      var isRead = false;
    };
    alerts.add(alert);
    alert;
  };

  public func seedAlerts(alerts : List.List<Types.ThreatAlert>, startId : Nat) : Nat {
    let base : Int = Time.now();
    let t1 : Types.ThreatAlert = {
      id = startId;
      threatName = "Crime.com Phishing Email";
      url = "https://crime.com";
      riskScore = 97;
      threatType = #phishing;
      source = #email;
      timestamp = base;
      var isRead = false;
    };
    let t2 : Types.ThreatAlert = {
      id = startId + 1;
      threatName = "SBI NetBanking Clone";
      url = "http://sbi-secure-login.net/verify";
      riskScore = 92;
      threatType = #phishing;
      source = #email;
      timestamp = base - 3_600_000_000_000;
      var isRead = true;
    };
    let t3 : Types.ThreatAlert = {
      id = startId + 2;
      threatName = "Amazon Prize Scam";
      url = "http://amaz0n-rewards.tk/claim";
      riskScore = 88;
      threatType = #phishing;
      source = #sms;
      timestamp = base - 7_200_000_000_000;
      var isRead = true;
    };
    let t4 : Types.ThreatAlert = {
      id = startId + 3;
      threatName = "Microsoft Support Malware";
      url = "http://ms-support-fix.ru/download";
      riskScore = 95;
      threatType = #malware;
      source = #url;
      timestamp = base - 10_800_000_000_000;
      var isRead = true;
    };
    let t5 : Types.ThreatAlert = {
      id = startId + 4;
      threatName = "Suspicious Spam Campaign";
      url = "http://bulk-offers-now.biz/unsubscribe";
      riskScore = 60;
      threatType = #spam;
      source = #email;
      timestamp = base - 14_400_000_000_000;
      var isRead = true;
    };
    alerts.add(t1);
    alerts.add(t2);
    alerts.add(t3);
    alerts.add(t4);
    alerts.add(t5);
    startId + 5;
  };
};
