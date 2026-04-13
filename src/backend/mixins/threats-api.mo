import Types "../types";
import ThreatLib "../lib/threats";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  alerts : List.List<Types.ThreatAlert>,
  nextAlertId : { var val : Nat },
  totalWarnings : { var val : Nat },
  totalBlocked : { var val : Nat },
) {
  /// Get all threat alerts sorted by newest first
  public query func getAlerts() : async [Types.ThreatAlertPublic] {
    ThreatLib.getAll(alerts);
  };

  /// Get count of unread threat alerts (frontend uses this to trigger modal)
  public query func getUnreadAlertsCount() : async Nat {
    ThreatLib.getUnreadCount(alerts);
  };

  /// Mark a specific alert as read by its id
  public func markAlertRead(id : Nat) : async () {
    ThreatLib.markRead(alerts, id);
  };

  /// Mark all alerts as read
  public func markAllAlertsRead() : async () {
    alerts.mapInPlace(func(a) { a.isRead := true; a });
  };

  /// Simulate background email scanning — adds a new phishing alert to the store
  public func simulateEmailThreat(url : Text, threatName : Text) : async Types.ThreatAlertPublic {
    let alert = ThreatLib.addAlert(
      alerts,
      nextAlertId.val,
      threatName,
      url,
      95,
      #phishing,
      #email,
    );
    nextAlertId.val += 1;
    totalWarnings.val += 1;
    totalBlocked.val += 1;
    ThreatLib.toPublic(alert);
  };
};
