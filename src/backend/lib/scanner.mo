import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func toPublic(entry : Types.ScanEntry) : Types.ScanEntry {
    entry;
  };

  public func getAll(history : List.List<Types.ScanEntry>) : [Types.ScanEntry] {
    let sorted = history.sort(func(a, b) { if (a.timestamp > b.timestamp) #less else if (a.timestamp < b.timestamp) #greater else #equal });
    sorted.toArray();
  };

  public func addEntry(
    history : List.List<Types.ScanEntry>,
    nextId : Nat,
    url : Text,
    scanType : Types.ScanType,
    result : Types.ScanResult,
    confidence : Nat,
  ) : Types.ScanEntry {
    let entry : Types.ScanEntry = {
      id = nextId;
      url;
      scanType;
      result;
      confidence;
      timestamp = Time.now();
    };
    history.add(entry);
    entry;
  };

  public func seedHistory(history : List.List<Types.ScanEntry>, startId : Nat) : Nat {
    let base : Int = Time.now();
    history.add({ id = startId;     url = "https://google.com";              scanType = #url;   result = #safe;      confidence = 99; timestamp = base - 1_800_000_000_000 });
    history.add({ id = startId + 1; url = "https://crime.com";               scanType = #email; result = #phishing;  confidence = 97; timestamp = base - 3_600_000_000_000 });
    history.add({ id = startId + 2; url = "https://github.com";              scanType = #url;   result = #safe;      confidence = 99; timestamp = base - 5_400_000_000_000 });
    history.add({ id = startId + 3; url = "http://amaz0n-rewards.tk/claim";  scanType = #qr;    result = #phishing;  confidence = 88; timestamp = base - 7_200_000_000_000 });
    history.add({ id = startId + 4; url = "https://stackoverflow.com";      scanType = #url;   result = #safe;      confidence = 99; timestamp = base - 9_000_000_000_000 });
    history.add({ id = startId + 5; url = "http://ms-support-fix.ru/dl";    scanType = #url;   result = #malware;   confidence = 95; timestamp = base - 10_800_000_000_000 });
    startId + 6;
  };

  // Simulate scanning a URL — returns a result based on simple heuristic
  public func simulateScan(url : Text) : (Types.ScanResult, Nat) {
    let lower = url.toLower();
    if (
      lower.contains(#text "crime.com") or
      lower.contains(#text "phish") or
      lower.contains(#text "verify-account") or
      lower.contains(#text "sbi-secure") or
      lower.contains(#text "amaz0n") or
      lower.contains(#text "paypa1")
    ) {
      (#phishing, 96)
    } else if (
      lower.contains(#text "malware") or
      lower.contains(#text "download.ru") or
      lower.contains(#text "ms-support-fix")
    ) {
      (#malware, 93)
    } else if (
      lower.contains(#text "bulk-offers") or
      lower.contains(#text "unsubscribe") or
      lower.contains(#text ".biz/")
    ) {
      (#spam, 70)
    } else {
      (#safe, 98)
    };
  };
};
