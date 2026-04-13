import Types "types";
import SettingsLib "lib/settings";
import ThreatLib "lib/threats";
import ScannerLib "lib/scanner";
import ThreatsMixin "mixins/threats-api";
import ScannerMixin "mixins/scanner-api";
import ProfileMixin "mixins/profile-api";
import List "mo:core/List";

actor {
  // --- Counters (boxed so mixins can mutate via reference) ---
  let _nextAlertId : { var val : Nat } = { var val = 0 };
  let _nextScanId  : { var val : Nat } = { var val = 0 };
  let _totalScanned  : { var val : Nat } = { var val = 0 };
  let _totalWarnings : { var val : Nat } = { var val = 0 };
  let _totalBlocked  : { var val : Nat } = { var val = 0 };

  // --- Collections ---
  let _alerts      : List.List<Types.ThreatAlert>  = List.empty();
  let _scanHistory : List.List<Types.ScanEntry>    = List.empty();

  // --- Settings & profile state ---
  let _settings    : Types.ProtectionSettings = SettingsLib.defaultSettings();
  let _linkedEmail : Types.LinkedEmail = { var provider = ""; var emailAddress = ""; var isLinked = false };
  let _linkedPhone : Types.LinkedPhone = { var phoneNumber = ""; var isLinked = false };

  // --- Seed demo data ---
  let _alertSeedEnd = ThreatLib.seedAlerts(_alerts, _nextAlertId.val);
  _nextAlertId.val := _alertSeedEnd;
  let _scanSeedEnd  = ScannerLib.seedHistory(_scanHistory, _nextScanId.val);
  _nextScanId.val  := _scanSeedEnd;
  _totalScanned.val  := 6;
  _totalWarnings.val := 2;
  _totalBlocked.val  := 2;

  // --- Mixin composition ---
  include ThreatsMixin(_alerts, _nextAlertId, _totalWarnings, _totalBlocked);
  include ScannerMixin(_scanHistory, _nextScanId, _totalScanned, _totalWarnings, _totalBlocked);
  include ProfileMixin(_settings, _linkedEmail, _linkedPhone, _totalWarnings, _totalScanned);
};
