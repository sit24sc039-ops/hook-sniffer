import Types "../types";
import ScannerLib "../lib/scanner";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  scanHistory : List.List<Types.ScanEntry>,
  nextScanId : { var val : Nat },
  totalScanned : { var val : Nat },
  totalWarnings : { var val : Nat },
  totalBlocked : { var val : Nat },
) {
  /// Get full scan history sorted by newest first
  public query func getScanHistory() : async [Types.ScanEntry] {
    ScannerLib.getAll(scanHistory);
  };

  /// Scan a URL and record the result
  public func scanUrl(url : Text) : async Types.ScanEntry {
    let (result, confidence) = ScannerLib.simulateScan(url);
    let entry = ScannerLib.addEntry(scanHistory, nextScanId.val, url, #url, result, confidence);
    nextScanId.val += 1;
    totalScanned.val += 1;
    switch (result) {
      case (#phishing or #malware) { totalWarnings.val += 1; totalBlocked.val += 1 };
      case (#spam) { totalWarnings.val += 1 };
      case (#safe) {};
    };
    entry;
  };

  /// Scan a QR code URL and record the result
  public func scanQr(url : Text) : async Types.ScanEntry {
    let (result, confidence) = ScannerLib.simulateScan(url);
    let entry = ScannerLib.addEntry(scanHistory, nextScanId.val, url, #qr, result, confidence);
    nextScanId.val += 1;
    totalScanned.val += 1;
    switch (result) {
      case (#phishing or #malware) { totalWarnings.val += 1; totalBlocked.val += 1 };
      case (#spam) { totalWarnings.val += 1 };
      case (#safe) {};
    };
    entry;
  };

  /// Scan email content / sender URL and record the result
  public func scanEmail(url : Text) : async Types.ScanEntry {
    let (result, confidence) = ScannerLib.simulateScan(url);
    let entry = ScannerLib.addEntry(scanHistory, nextScanId.val, url, #email, result, confidence);
    nextScanId.val += 1;
    totalScanned.val += 1;
    switch (result) {
      case (#phishing or #malware) { totalWarnings.val += 1; totalBlocked.val += 1 };
      case (#spam) { totalWarnings.val += 1 };
      case (#safe) {};
    };
    entry;
  };

  /// Get aggregate scan stats
  public query func getStats() : async Types.Stats {
    {
      totalScanned = totalScanned.val;
      totalWarnings = totalWarnings.val;
      totalBlocked = totalBlocked.val;
    };
  };
};
